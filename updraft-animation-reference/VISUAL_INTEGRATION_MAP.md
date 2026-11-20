# Visual integration map — Chapter VI reference

This document is a **map**, not a requirement to use the reference code verbatim. Design and animation are our entire scope. The user's already-built game is authoritative for everything else.

## File ownership and reuse

| Reference file | What it illustrates | Suggested use |
| --- | --- | --- |
| `reference-prototype/index.html` | Miri Quill SVG rig, hot-air balloon, sky layers, close-up portrait, star writing, UI structure | Adapt isolated art/SVG components to the real app; never overwrite the real entry point |
| `reference-prototype/src/styles.css` | Character micro-acting, responsive scenery, keyframes, visual theme, reduced motion | Source of design/motion patterns; scope CSS to avoid existing app collisions |
| `reference-prototype/src/acting.js` | Pure mapping of scene type → Miri's pose/caption | Reuse or translate into a typed/pure animation definition |
| `reference-prototype/src/skycinema.js` | Pure altitude → parallax/lighting/visitor, event → shot name | Good candidate for direct adaptation to the game’s existing altitude/event values |
| `reference-prototype/src/config.js` | Motion timings, particle bounds, audio levels, sky palettes | Extract *visual* settings; do not transplant its `game` settings |
| `reference-prototype/src/app.js` | Director queue, gesture wiring, visual shot scheduling, skip cleanup, debug controls | Read and **extract only the presentation director**; it also contains demo game integration and should not be copied wholesale |
| `reference-prototype/src/audio.js` + `soundscore.js` | User-initiated musical atmosphere and response cues | Optional visual/audio polish; keep independent of scoring |
| `reference-prototype/src/postcard.js` | Illustrated star positions and SVG export | Optional design reference for end-of-flight art only |
| `reference-prototype/src/game.js` + `logbook.js` | Self-contained demo gameplay and Atlas | **Do not integrate or replace the existing game's mechanics or records** |
| `reference-prototype/updraft-play.html` | Single-file completed visual demonstration | Run to experience timing; generated artifact, **do not edit** |

## Visual event contract (proposed adapter)

A presentation adapter should consume real, already-computed outcomes. Names below are examples; use the event API already exposed by the game rather than inventing a new game engine.

```ts
type VisualEvent =
  | { type: 'answer:correct'; altitudeBefore?: number; altitudeAfter?: number; rarity?: 'common' | 'rare' }
  | { type: 'answer:incorrect'; altitudeBefore?: number; altitudeAfter?: number }
  | { type: 'sky:changed'; skyId?: string; altitude?: number }
  | { type: 'flight:finished'; outcome?: string }
  | { type: 'flight:perfect'; discoveries?: readonly string[] }
  | { type: 'companion:wave' };
```

**No writing to score, fuel, correct answer index, progression, server state, or saved daily results.** Animation timers control only presentation. The source demo's `choose()` calls `logic.answer()` because it's a stand-alone demo; the *real* game should publish a result and the animation subscriber should react.

## Suggested scene direction

| Event | Visual shot | Performance |
| --- | --- | --- |
| Correct | `rise` | Burner glows, balloon lifts, foreground clouds sweep faster than distant clouds, Miri shares a wide grin |
| Incorrect | `dip` | Gentle air-loss, cool light, soft cloud cushion, brief rueful look followed by reassuring eye contact |
| Rare correct | `wonder` | Micro-pause, same face rig in a close-up, surprised eyelids/brows, then widen to a new sky |
| Sky transition | `reveal` | Sunbeam and atmosphere shift, distant clouds peel back, Miri looks upward in awe |
| End/landing | `settle` | Gradual calm, scarf and balloon motion reduce, warm goodbye |
| Perfect ending | `stars` | Quiet hand-drawn constellation and musical response (optional), no gameplay changes |
| Wave | `hello` | Miri looks at player and waves, entirely cosmetic |

Current reference uses `data-shot` on `#world`, e.g. `rise`, `dip`, `wonder`, `reveal`, `settle`, `stars`, `hello`. CSS classes such as `.moment-hit`, `.moment-miss`, `.moment-rare`, `.moment-tier`, `.moment-landing` drive character-specific styling. `src/acting.js` provides the pose/caption map. `src/config.js` contains durations such as `motion.correctMs`, `motion.wrongMs`, and `motion.rareMs`.

## Acceptance tests for integration

1. Existing game's rule/progression tests pass unchanged, with animations both on and off.
2. Correct, wrong, rare, and sky-change scenes are triggered by **actual** game outcomes; no correctness clues before answer submission.
3. A skipped scene produces the same final visual state as waiting; no stuck overlays, animation timers, or audio loops.
4. Repeated or rapid interactions cannot leave two overlapping camera shots or alter answer state.
5. Reduced-motion substitutes communicate outcome by text and pose; no rapid movement or mandatory effects.
6. Text/controls remain usable at mobile widths (at least 320px and 390px); keyboard and touch remain intact.
7. Sound is opt-in, muted by default, and never affects game logic.
8. Check 60fps target and memory/resource cleanup on a **physical mid-range phone** when possible; never claim that desktop Chromium alone proves it.
9. Review real before/after screenshots and a short running clip, not only code review.

## Visual priorities for the next pass

Most valuable: eye contact, brows, facial timing, small shoulder/head gestures, believable balloon acceleration and deceleration, atmospheric depth, clear cinematography when the answer resolves. Prefer restraint over decorative layers. Consider a dedicated `VisualDirector` subscriber to avoid making game state and animation state inseparable.
