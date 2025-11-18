// Prototype script: renders a simple month grid, allows adding events, toggling optional/cancelled,
// and records click count + elapsed time for a test run. All interactions are console-logged (no alerts).

const calendar = document.getElementById('calendar');
const eventsList = document.getElementById('eventsList');
const selectedDateEl = document.getElementById('selectedDate');
const eventForm = document.getElementById('eventForm');
const titleInput = document.getElementById('title');
const timeInput = document.getElementById('time');
const optionalInput = document.getElementById('optional');
const startTestBtn = document.getElementById('startTest');
const metrics = document.getElementById('metrics');

let state = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  events: {}, // key: yyyy-mm-dd -> array of events
  selected: null,
  clickCount: 0,
  testRunning: false,
  testStart: null
};

function log(...args){ console.log('[APP]', ...args) }
function incClick(){ state.clickCount++; updateMetrics(); log('clickCount', state.clickCount) }
function updateMetrics(){
  const elapsed = state.testRunning ? Math.round((Date.now()-state.testStart)/1000) : 0;
  metrics.textContent = `Clicks: ${state.clickCount} — Time: ${elapsed}s`;
}

function dateKey(y,m,d){ return `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}` }

function renderCalendar(){
  calendar.innerHTML = '';
  const daysInMonth = new Date(state.year, state.month+1, 0).getDate();
  for(let d=1; d<=daysInMonth; d++){
    const div = document.createElement('div');
    div.className = 'day';
    div.tabIndex = 0;
    div.dataset.day = d;
    div.innerHTML = `<div class="date">${d}</div><div class="events"></div>`;
    div.addEventListener('click', ()=> {
      incClick();
      selectDay(d);
    });
    calendar.appendChild(div);
  }
  // render events indicators
  for(const [k,arr] of Object.entries(state.events)){
    const [y,m,day] = k.split('-').map(Number);
    if(y===state.year && m===state.month+1){
      const slot = calendar.querySelector(`.day[data-day='${day}'] .events`);
      if(slot){
        slot.innerHTML = '';
        arr.slice(0,2).forEach(ev=>{
          const el = document.createElement('div');
          el.className = 'event';
          if(ev.optional) el.classList.add('optional');
          if(ev.cancelled) el.classList.add('cancelled');
          el.textContent = `${ev.time} ${ev.title}`;
          slot.appendChild(el);
        });
      }
    }
  }
}

function selectDay(d){
  state.selected = d;
  selectedDateEl.textContent = `${state.year}-${state.month+1}-${d}`;
  renderEventsForSelected();
}

function renderEventsForSelected(){
  eventsList.innerHTML = '';
  if(!state.selected) return;
  const key = dateKey(state.year,state.month,state.selected);
  const arr = state.events[key] || [];
  if(arr.length===0){
    eventsList.innerHTML = '<li>No events</li>';
  } else {
    arr.forEach((ev, idx)=>{
      const li = document.createElement('li');
      li.innerHTML = `<span class="event ${ev.optional? 'optional':''} ${ev.cancelled? 'cancelled':''}">${ev.time} ${ev.title}</span>
        <div class="controls"><button data-i="${idx}" class="toggleOptional">toggle optional</button>
        <button data-i="${idx}" class="toggleCancelled">toggle cancelled</button>
        <button data-i="${idx}" class="delete">delete</button></div>`;
      // attach listeners
      li.querySelector('.toggleOptional').addEventListener('click', (e)=>{
        incClick();
        const i = Number(e.target.dataset.i);
        arr[i].optional = !arr[i].optional;
        log('toggle optional', key, i, arr[i]);
        saveEvents(key, arr); renderEventsForSelected(); renderCalendar();
      });
      li.querySelector('.toggleCancelled').addEventListener('click', (e)=>{
        incClick();
        const i = Number(e.target.dataset.i);
        arr[i].cancelled = !arr[i].cancelled;
        log('toggle cancelled', key, i, arr[i]);
        saveEvents(key, arr); renderEventsForSelected(); renderCalendar();
      });
      li.querySelector('.delete').addEventListener('click', (e)=>{
        incClick();
        const i = Number(e.target.dataset.i);
        arr.splice(i,1);
        log('delete event', key, i);
        saveEvents(key, arr); renderEventsForSelected(); renderCalendar();
      });
      eventsList.appendChild(li);
    });
  }
}

function saveEvents(key, arr){
  state.events[key] = arr;
  // persist lightly in localStorage for demo
  localStorage.setItem('calendar.events', JSON.stringify(state.events));
}

eventForm.addEventListener('submit', (ev)=>{
  ev.preventDefault();
  incClick();
  if(!state.selected) return;
  const key = dateKey(state.year,state.month,state.selected);
  const arr = state.events[key] || [];
  arr.push({title: titleInput.value, time: timeInput.value, optional: optionalInput.checked, cancelled:false});
  saveEvents(key, arr);
  log('add event', key, arr[arr.length-1]);
  titleInput.value=''; timeInput.value=''; optionalInput.checked=false;
  renderEventsForSelected(); renderCalendar();
});

startTestBtn.addEventListener('click', ()=>{
  incClick();
  if(!state.testRunning){
    state.testRunning = true;
    state.testStart = Date.now();
    state.clickCount = 0;
    startTestBtn.textContent = 'Stop test';
    log('test started');
  } else {
    state.testRunning = false;
    startTestBtn.textContent = 'Start test (measure)';
    const elapsed = Math.round((Date.now()-state.testStart)/1000);
    log('test stopped', {clicks: state.clickCount, seconds: elapsed});
    // also output results in console friendly format
    console.table([{metric:'clicks', value: state.clickCount},{metric:'seconds', value: elapsed}]);
  }
  updateMetrics();
});

function loadPersisted(){
  try{
    const raw = localStorage.getItem('calendar.events');
    if(raw) state.events = JSON.parse(raw);
  }catch(e){ log('could not load persisted events', e) }
}

function init(){
  loadPersisted();
  renderCalendar();
  updateMetrics();
  // keyboard accessibility: allow selecting day via arrow keys
  calendar.addEventListener('keydown', (e)=>{
    const focused = document.activeElement;
    if(focused && focused.classList.contains('day')){
      let d = Number(focused.dataset.day);
      if(e.key==='ArrowRight') d = Math.min(d+1,31);
      if(e.key==='ArrowLeft') d = Math.max(d-1,1);
      const target = calendar.querySelector(`.day[data-day='${d}']`);
      if(target) target.focus();
    }
  });
}
init();
