# Astra — Updraft Animation & Design Handoff

You are joining **Updraft** as a senior creative technologist, UI motion designer, and frontend animation engineer. Read this instruction completely, then inspect the files. The core game ALREADY EXISTS in my VS Code project. **Our work in this collaboration is visual design and animation only.** Do not rebuild the game, redesign its mechanics, generate a new trivia game, or replace my existing application with the reference demo.

## Objective

Make every answer feel like a tiny, cinematic storybook movie scene. A memorable character, Miri Quill, looks toward the player from a hot-air balloon: delight and a rising world for a correct answer; a rueful, reassuring smile and a gentle descent for a mistake; wide-eyed awe on entering a new sky. The scenery, timing, sound, and character gestures should work as one coordinated moment. The design is warm, original, whimsical, polished, and readable on a phone.

## What I am giving you

`reference-prototype/` is the **working Chapter VI animation/design reference**, with a playable HTML demo (`updraft-play.html`) and editable source. It uses vanilla HTML, CSS, inline SVG, and JavaScript for the visual effects. It also includes a small trivia implementation solely to make the motion demo run. **Do not copy `src/game.js` over my real game.**

`VISUAL_INTEGRATION_MAP.md` identifies the animation files and event contracts. `previews/` contains captures of real running scenes. `creative-brief-inspiration/` captures the original creative intent; these are inspiration, not rigid requirements. `START_HERE.md` explains how to run the reference.

## Non-negotiable boundaries

- **Preserve all game rules and gameplay**: scoring, correct answers, question selection, fuel, progression, timers, persistence, networking, backend, state management, and existing game flows. Do not alter them unless I explicitly request it.
- Integrate visuals by **subscribing to existing game events** or adding a narrow, presentation-only adapter. Never let animations calculate or decide outcomes. Do not introduce visual timers that alter game results.
- Adapt to the framework/architecture already used in my game rather than replacing it with the prototype's stack.
- Keep character art original; avoid copying a named franchise's visual identity.
- Animations must be skippable, respect `prefers-reduced-motion`, support keyboard/touch, remain legible at 320px and 390px, and aim for 60fps on a mid-range phone. Use CSS transforms/opacity where possible; avoid unbounded particles and memory leaks.
- Mute by default; audio can start only after user interaction. The game must work perfectly without sound.
- Keep tuning constants in one place. Retain or create visual-debug controls for correct, wrong, rare, new sky, landing, and altitude scrubbing **without mutating real player state**.
- The existing game should continue working unchanged if the animation layer is disabled.

## How to proceed

**Step 1 — Inspect before editing.** Identify the existing game's framework, design system, screen structure, game event sources, and how results currently animate. Inspect the reference prototype's `src/acting.js`, `src/skycinema.js`, `src/styles.css`, `src/config.js`, the inline character/balloon SVG in `index.html`, and the event director in `src/app.js`. Treat `src/game.js` only as a reference test harness.

**Step 2 — Show a short integration plan.** Say exactly which existing files you expect to change, the minimal presentation adapter you would add, what visual shot you will implement first, and how you will verify there is no change to gameplay. Do not ask broad creative questions; use your judgment. If my existing game repository is not visible in this VS Code workspace, ask me to open it before integrating anything.

**Step 3 — Implement one real end-to-end moment.** Make the existing game's *correct-answer* event drive a camera/sky/balloon/Miri reaction in the **real app**. Reuse or improve reference techniques, not necessarily its code. Capture a before/after screenshot or short browser recording. Verify score and the question flow are identical with animation enabled and disabled.

**Step 4 — Extend the emotion language.** Add wrong-answer gentle descent, rare-answer close-up, new-sky reveal, and end-of-flight settling. Prefer subtle character micro-acting—eyes, brows, head, scarf, gesture, and shared eye contact—over excessive particle effects. Keep clear pacing: anticipation → reaction → readable result, with a reliable skip path.

**Step 5 — Polish and test.** Check desktop and mobile, reduced motion, animation skips, low-end performance, keyboard focus, and console errors. Protect event ordering and cleanup on rapid interaction or navigation. Keep visual changes modular and reviewable.

## What to deliver

A working animation upgrade **inside my already-existing Updraft game**, not a new game. Show an actual running preview early. Provide the list of modified files, a concise design rationale, visual evidence from the browser, what tests you ran, and any genuine blockers. Make one thoughtful surprise if it improves the feeling without adding gameplay complexity.

**First response:** inspect the two projects, outline a concise visual-only plan, and start implementing the correct-answer cinematic. If only this handoff folder is open, first show me the reference running and request the path to my real game repo for integration—do not pretend the prototype is the production app.
