# project-delta

# ClickLess — Improve tiny, annoying inputs so users click less

**Purpose.** Demonstrate a small but common UI inefficiency (entering month/year expiry or timer values with long scroll wheels or long dropdowns) and present a faster, accessible alternative.

**User Story.** As a user of web forms, I want to enter expiry/timer/date values faster so I click fewer times and complete tasks more quickly.

**Tagline.** Pick a date or expiry faster — fewer clicks, less wait.

## Live Demo
(When deployed) GitHub Pages link goes here — update after deploy.

## What the app shows
- A “Before” panel that mimics a slow dropdown/scroll wheel input (inefficient).
- An “After” panel with a grid of month buttons + quick year picker and a numeric pad — fewer clicks.
- A metrics logger (console): click count and time-to-complete for each task attempt.

## Test case
1. Open the page.
2. In the BEFORE panel: choose month via a long dropdown (simulate many choices).
3. In the AFTER panel: choose month by clicking a button and set year via quick picker.
**Metric**: compare click count and time-to-complete printed to console. Success = fewer clicks and lower time in AFTER.

## Acceptance Criteria (mapped)
- Clean repo: main source files are index.html, styles.css, app.js.
- GitHub Pages: deploy branch `main` or `gh-pages`; add live link in About.
- README includes purpose, user story, tagline, test case, metric for success.
- Accessibility validation: run WAVE and axe (instructions below).
- Function: prototype is interactive; no `alert()`; actions logged to console.
- Bonus: include an issue in GitHub titled `Enhancement: Add keyboard shortcuts for month selection` linking to code line.

## Accessibility (validation)
- Use WAVE: https://wave.webaim.org/ and paste your deployed URL.
- Use axe DevTools (browser extension): scan for violations.
- Ensure semantic HTML, proper labels, keyboard focus, and ARIA where needed.

## Infrastructure & Tech Stack
- HTML5, CSS3 (responsive CSS grid / flexbox)
- Vanilla JavaScript (ES2020+)
- No build tools required — simple static page (easy deploy via GitHub Pages)
- Fonts: system UI stack (no external network fetches)
- Icons: lightweight inline SVG (no external icon libs)

## Attribution
- Code authorered by me
- UI patterns inspired by common UX learnings (no copy-paste external assets)
- Development assisted by AI (VSCode Copilot / GPT-5 mini) — used for quick scaffolding and suggestions.

## How to run locally
1. Clone repo.
2. Open `index.html` in a browser (no server needed).
3. Open DevTools Console to see metrics when you interact.
4. Deploy to GitHub Pages from main branch via repository settings.

## Bonus: GitHub Issue (example)
Title: `Enhancement: Add keyboard shortcuts for month selection`
Body: Explain where code lives (`app.js`, function `selectMonth`) and request a PR to add `keydown` support.

