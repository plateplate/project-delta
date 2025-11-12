(() => {
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const now = new Date();
  const currYear = now.getFullYear();
  const monthGrid = document.querySelector('.month-grid');
  const yearDisplay = document.getElementById('yearDisplay');
  const incYear = document.getElementById('incYear');
  const decYear = document.getElementById('decYear');
  function Metrics(name){this.name=name;this.startTime=null;this.endTime=null;this.clicks=0;}
  Metrics.prototype.start=function(){this.startTime=performance.now();this.clicks=0;console.info(`[${this.name}] started`);}
  Metrics.prototype.click=function(){this.clicks+=1;}
  Metrics.prototype.complete=function(){this.endTime=performance.now();const dt=(this.endTime-this.startTime)/1000;console.info(`[${this.name}] completed — clicks: ${this.clicks}, time(s): ${dt.toFixed(3)}`);return{clicks:this.clicks,time:dt};}
  months.forEach((m,i)=>{const b=document.createElement('button');b.type='button';b.innerText=m.slice(0,3);b.setAttribute('role','listitem');b.setAttribute('aria-pressed','false');b.dataset.month=i+1;b.addEventListener('click',()=>{afterMetrics.click();document.querySelectorAll('.month-grid button').forEach(b=>b.setAttribute('aria-pressed','false'));b.setAttribute('aria-pressed','true');selectedAfter.month=b.dataset.month;});monthGrid.appendChild(b);});
  const selectedAfter={month:null,year:currYear};yearDisplay.value=currYear;
  incYear.addEventListener('click',()=>{afterMetrics.click();selectedAfter.year=Number(yearDisplay.value)+1;yearDisplay.value=selectedAfter.year;});
  decYear.addEventListener('click',()=>{afterMetrics.click();selectedAfter.year=Number(yearDisplay.value)-1;yearDisplay.value=selectedAfter.year;});
  yearDisplay.addEventListener('input',()=>{afterMetrics.click();selectedAfter.year=Number(yearDisplay.value);});
  const beforeStartBtn=document.getElementById('beforeStart');const beforeCompleteBtn=document.getElementById('beforeComplete');const beforeMonthSelect=document.getElementById('beforeMonth');const beforeYearSelect=document.getElementById('beforeYear');const afterStartBtn=document.getElementById('afterStart');const afterCompleteBtn=document.getElementById('afterComplete');
  const beforeMetrics=new Metrics('BEFORE');const afterMetrics=new Metrics('AFTER');
  ['beforeMonth','beforeYear','beforeStart','beforeComplete'].forEach(id=>{const el=document.getElementById(id);if(el)el.addEventListener('click',()=>beforeMetrics.click());});
  beforeMonthSelect.addEventListener('change',()=>beforeMetrics.click());beforeYearSelect.addEventListener('change',()=>beforeMetrics.click());
  afterStartBtn.addEventListener('click',()=>{afterMetrics.start();});afterCompleteBtn.addEventListener('click',()=>{const d=afterMetrics.complete();const m=selectedAfter.month?months[selectedAfter.month-1]:'(none)';const y=selectedAfter.year||'(none)';console.info(`[AFTER] selection -> ${m} ${y}`,d);});
  beforeStartBtn.addEventListener('click',()=>{beforeMetrics.start();});beforeCompleteBtn.addEventListener('click',()=>{const d=beforeMetrics.complete();console.info(`[BEFORE] selection -> ${beforeMonthSelect.value||'(none)'} ${beforeYearSelect.value||'(none)'}`,d);});
  monthGrid.addEventListener('keydown',ev=>{const f=document.activeElement;if(f&&f.dataset&&f.dataset.month){if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();f.click();}}});
  document.querySelectorAll('.month-grid button').forEach(b=>b.tabIndex=0);
  window.ClickLess={resetAfter:()=>{document.querySelectorAll('.month-grid button').forEach(b=>b.setAttribute('aria-pressed','false'));selectedAfter.month=null;selectedAfter.year=currYear;yearDisplay.value=currYear;console.info('[ClickLess] After reset');},metrics:{beforeMetrics,afterMetrics}};
  console.info('ClickLess demo ready — open DevTools console. Use Start then Complete in each panel to log metrics.');
})();