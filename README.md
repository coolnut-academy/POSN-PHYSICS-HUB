# POSN Physics Hub (เตรียมสอบ สอวน. ฟิสิกส์ ค่าย 1)

A complete, static web application designed to help Thai students prepare for the POSN (สอวน.) Physics Camp 1 exam. 

## Project Overview

This app features:
- **Theory Sections**: Summaries of key concepts with LaTeX rendered formulas and common pitfalls.
- **Interactive Simulations**: HTML5 Canvas/SVG simulations for Projectiles, Capacitors, and Thin Lenses.
- **Mock Test System**: A 25-question bank matching the POSN syllabus (Mechanics, Electricity, Magnetism, Heat, Fluid, Optics). Features randomized question selection and detailed, step-by-step mathematical explanations.
- **Formula Map**: Quick reference sheet.
- **Progress Tracking**: Uses `localStorage` to save test scores and attempts.

## Tech Stack

Strictly adhered to the constraints:
- **Core**: HTML5, Vanilla JavaScript (ES6+), CSS3
- **Styling**: Tailwind CSS (via CDN) + Custom Glassmorphism CSS
- **Math Rendering**: MathJax 3 (via CDN)
- **Architecture**: Single Page Application (SPA) natively built without React, Next.js, or any frontend build tools.
- **Data/Backend**: No backend required. Data is stored in JS arrays and user progress is kept in browser `localStorage`.

## How to Run Locally

Since there are no build steps or npm requirements, simply open the `index.html` file in any modern web browser:

1. Clone or download the repository.
2. Double-click `index.html` to open it in Chrome, Edge, or Safari.
3. The app is fully functional immediately.

## How to Deploy to GitHub Pages

1. Push all 4 files (`index.html`, `styles.css`, `app.js`, `README.md`) to a GitHub repository.
2. Go to the repository **Settings** > **Pages**.
3. Under "Build and deployment", set the **Source** to `Deploy from a branch`.
4. Select the `main` (or `master`) branch and the `/ (root)` folder.
5. Click **Save**. Within a few minutes, the app will be live at `https://<your-username>.github.io/<repo-name>/`.

## How to Edit the Question Bank

To add or modify Mock Test questions, open `app.js` and locate the `questionBank` array.

Add a new object following this template:
```javascript
{ 
  id: 99, 
  topic: 'mechanics', // 'mechanics', 'electricity', 'magnetism', 'heat', 'fluid', 'optics'
  type: 'numeric', // or 'formula'
  prompt: 'ข้อความโจทย์ภาษาไทย (รองรับ LaTeX $...$)',
  correctAnswer: 'คำตอบที่ระบบใช้ตรวจ (ไม่คิดตัวพิมพ์เล็กใหญ่)', 
  answerLatex: 'คำตอบในรูปแบบ LaTeX ที่ใช้แสดงผล',
  detailedSolution: 'วิธีทำอย่างละเอียด (รองรับ HTML และ $...$)',
  commonMistake: 'จุดที่นักเรียนมักทำผิดบ่อย'
}
```

## How to Add a New Simulation

1. **HTML**: In `index.html`, add a new `<div class="glass-card p-6">` inside the `#view-sim` section. Create inputs (`<input type="range">`) and a `<canvas>` or `<div>` for SVG.
2. **JS**: In `app.js`, create a new function `initNewSim()` modeled after `initProjectileSim()`. 
3. **Link**: Call `initNewSim()` inside the `initAllSims()` function in `app.js`.

## Important Limitations
- **Static App**: Because there is no backend server, all progress is saved only to the current browser's `localStorage`. If the user clears browser data or changes devices, progress will be lost.
- **Deterministic**: The math derivations are hard-coded intentionally to ensure mathematical accuracy and safety, avoiding the unreliability of AI-generated formulas on the fly.
