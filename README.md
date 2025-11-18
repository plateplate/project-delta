# calendar-improve

**Purpose:** Demonstrate an improved day-entry and event UX for a calendar. Replace long scroll-wheel and dropdown-only flows with a direct, toggleable, accessible day grid and quick event controls.

**User Story:** As a user who schedules events, I want to add, edit, and toggle optional/cancelled events with fewer clicks and clearer visuals so I can manage my day faster.

**Tagline:** Click days, not wheels — faster day entry.

## Test case
1. Start the test (press "Start test")
2. Click day 14
3. Add event "Study" at 18:00
4. Toggle 'optional' on that event
5. Mark it cancelled, then unmark
6. Stop test  

**Metric:** clicks and elapsed time recorded in the top-right metrics and in a console table.

## Acceptance Criteria (implemented)
- [x] Clean file structure (index.html, styles.css, script.js, README.md)
- [x] No window.alert() usage
- [x] Prototype is functional: add/edit/delete events, toggle optional/cancelled
- [x] Console records click counts and elapsed time for the test
- [x] Responsive layout and accessible keyboard support
- [x] Links back to repo and profile in the nav

## Tech stack & infra
- Plain HTML, CSS, JavaScript (ES2020)
- No external libraries (keep simple). Uses localStorage for light persistence.
- To deploy on GitHub Pages:
  1. Create a repo named `calendar-improve` under your account: `plateplate`.
  2. Push these files to the `main` branch (root folder).
  3. In repo settings → Pages, select branch **main** and folder **root**.
  4. Your app will be at `https://plateplate.github.io/calendar-improve/`.
  5. Put that URL in the repo’s **About** section.

## Attribution
- UI idea inspired by course prompt and "tumbly" pattern.
- Minimal example code is original for this project.
- AI assistance: ChatGPT (GPT-5.1 Thinking) was used to help scaffold HTML/CSS/JS and documentation.

## Bonus: Issues & improvements
Create GitHub issues (with permalinks to code) for any bonus work, for example:

- **"Add keyboard shortcuts for faster day navigation"** — link to `script.js` lines that handle key events.
- **"Add icon set for event types"** — link to `index.html` and `styles.css` where icons would be styled.

These issues should be closed once the bonus is implemented so your instructor can easily verify them.
