# Updraft visual layer — GSAP edition

Start with [the full-source HTML playground](updraft-animation-playground.html) and [the exact tuning guide](ANIMATION_TUNING.md). The HTML works directly from disk, offline, with no build step. It previews the existing game's animations and contains no replacement trivia engine.

The production frontend remains vanilla JavaScript. The only existing game-code hooks are `syncCinema()` after rendering and `cinematicFeedback()` after confirmed actions. No backend, question bank, scoring, persistence or game progression changes belong to this layer.

## Source map

| File | Responsibility |
| --- | --- |
| `gsap-config.js` | One `CONFIG` for every active animation's timing, easing, beat and intensity |
| `balloon.js` | `Balloon.idle()`, `rise()`, `fall()`, `celebrate()`, `reset()` and bounded particle effects |
| `visual-director.js` | `SceneDirector`, GSAP timelines/contexts, cancellation, reduced motion, visibility, visual preview controls |
| `visual-events.js` | Pure read adapter from existing game outcomes; no mutation |
| `character-acting.js` | Non-repeating cosmetic variation, independent of game RNG |
| `miri-art.js` | Namespaced inline SVG adapted from the supplied Chapter VI reference |
| `scene-art.js`, `cinema.css` | Responsive scenery, portrait, separate balloon parts, controls and final bright sky |
| `controls-motion.js` | GSAP input/letter/score feedback; no gameplay logic |
| `flightdeck-motion.js`, `flightdeck.css` | 3D flight deck: flipping letter tiles, card deals and pointer tilt, letter arc, count-ups, Fuel pops, hint unfold, result medal and stars, scene parallax (tuning in `CONFIG.deck`) |
| `vendor/gsap.min.js` | Pinned GSAP 3.13.0 with original license notice; see `vendor/README.md` |

The existing static server has an explicit allowlist. `npm run build:visuals` packages the source into the already-served `public/updraft-motion.js` and appends styles after the generated marker in `public/updraft.css`. It also regenerates the standalone HTML. `npm run build` includes that packaging step. There are no new backend routes, runtime CDN requests, React/Vite dependencies or ScrollTrigger plugins.

Open `/updraft` to play the real game. Press **D** outside text fields for visual previews. `?cinema=off` retains the original scene layout for gameplay comparison. Skip, navigation, new outcomes and reduced-motion changes cancel the entire pending cinematic, revert transforms/rope geometry and remove particles. Motion-off also cancels UI effects. A solved existing flight gets the happy-place ending; animations never award success or advance a question.

All active Updraft animations use GSAP; CSS keyframes/transitions are disabled on that page. Scene and ambient timelines use separate contexts, so cancellation does not accumulate loops. SVG origins are repeated in limb tweens to preserve pivots through context reversion. Shake is limited to the scenery so controls stay usable. Phone travel, shake and particle counts are scaled down. OS reduced motion produces still expressions and final scenery.

## Verification

Run `npm test`, `npm run build`, and `npx playwright test test/browser/hidden.spec.js test/browser/updraft-cinema.spec.js`.

Checks cover scoring/progression parity with cinematics on/off, real rare discoveries, full five-round flights, offline tutorial, save retries, phone/tablet/desktop layouts, interrupted sequences, particle cleanup, SVG pivots, restored ropes, and stopping active GSAP tweens when reduced motion changes. The single HTML is additionally opened using `file://` and tested offline. Local screenshots and `updraft-gsap.webm` live in `.local/cinema-evidence/`; these review artifacts are intentionally untracked.

The supplied Miri artwork's source is `updraft-animation-reference/reference-prototype/index.html`, whose license notes identify it as original prototype artwork. The previous CSS/Web Animations director was replaced; the reference game's standalone trivia scaffolding was never integrated. Physical phone, mobile keyboard and Safari checks remain separate device-validation work. This task does not deploy to Vercel.
