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
**Metric:** clicks and elapsed time recorded in the top-right metrics and console table.

## Acceptance Criteria (implemented)
- [x] Clean file structure (index.html, styles.css, script.js, README.md)
- [x] No window.alert() usage
- [x] Prototype is functional: add/edit/delete events, toggle optional/cancelled
- [x] Console records click counts and elapsed time for the test
- [x] Responsive layout and accessible keyboard support
      
## Tech stack & infra
- Plain HTML, CSS, JavaScript (ES2020)
- No external libraries (keep simple). Use localStorage for light persistence.
- To deploy: push this repository to GitHub and enable GitHub Pages (branch: main, folder: /).
  
Validated via WAVE and Nu HTML checker.
## Attribution
Developed by Laine Stinnett with AI (GPT-5) assistance.

## Bonus: Issues & improvements
- Create a GitHub issue titled "Add keyboard shortcuts for faster day navigation" and link it to the relevant file lines.
- Optional improvements: export/import, multiple months, timezone handling, accessibility audit fixes.
