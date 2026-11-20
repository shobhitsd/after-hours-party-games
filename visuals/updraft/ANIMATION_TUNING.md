# Updraft: full source and animation tuning

Open **`updraft-animation-playground.html`** directly in a browser. It is a complete, self-contained HTML/CSS/JavaScript animation preview, with GSAP and inline SVG included. No server, CDN, React, Vite, npm install or build step is needed to use that file. Open it in a text editor to see the full code; find `export const CONFIG` at the top of the module script. The preview buttons are purely visual; the real game remains authoritative.

The actual Updraft game uses the same code through its existing static animation asset. For maintainable edits use `gsap-config.js`, `balloon.js`, `visual-director.js`, `controls-motion.js`, `scene-art.js`, and `cinema.css`; `npm run build:visuals` regenerates both the application's asset and the standalone full-source HTML. Editing the standalone file changes only that preview. No backend, questions, scoring or state-management code was changed.

## Exact numbers to change

All durations are **seconds**. Distances are pixels, angles degrees, and scales are multipliers. `CONFIG` is the only animation timing/easing configuration.

| Desired change | CONFIG field | Default | Example |
| --- | --- | --- | --- |
| Everything faster | `speed` | `1` | `1.4` = 40% faster playback |
| Everything slower | `speed` | `1` | `0.75` = slower playback |
| Longer falling sequence | `durations.wrong` | `2.6` | `3.2` |
| Quicker celebration | `durations.correct` | `2` | `1.5` |
| Longer final ascent | `durations.celebrate` | `3.5` | `4.5` |
| Higher correct-answer lift | `rise.height` | `42` | `60` |
| Deeper fall | `fall.distance` | `78` | `95` — check basket/dialogue clearance |
| Stronger impact squash | `fall.squashY` / `fall.squashX` | `0.68` / `1.2` | `0.55` / `1.3` |
| More deflation before falling | `fall.deflateY` | `0.77` | `0.65` |
| More basket swing | `fall.basketSwing` | `11` | `16` |
| More screen shake | `shake.amplitude` | `5` | `8` |
| Longer shake | `shake.repeat` / `shake.step` | `5` / `0.045` | `7` / `0.055` |
| Bigger tense camera zoom | `camera.tenseZoom` | `1.055` | `1.09` |
| More confetti / dust | `particles.confetti` / `particles.dust` | `20` / `12` | `28` / `16` |
| More afterimages | `fall.trailCount` | `3` | `4` |
| More visible afterimages | `fall.trailOpacity` | `0.19` | `0.27` |
| Greater final ascent | `finale.ascent` | `220` | `280` |
| Less movement on phones | `responsive.travel` | `0.48` | `0.35` |
| Fewer phone particles | `responsive.particles` | `0.65` | `0.45` |
| Slower idle bob | `idle.float` | `2.8` | `4` |
| More frequent idle gestures | `idle.gestureMinimum` / `gestureVariation` | `6.5` / `4.5` | `4` / `3` |

`ease.fall = 'power2.in'` provides acceleration. `ease.rebound = 'back.out(1.5)'` controls recovery overshoot; change to `back.out(2)` for more bounce. `ease.float = 'sine.inOut'` controls the gentle bob. The scene timing fractions in `beats` and `segments` establish choreography: impact is at `0.43 × durations.wrong`, recovery starts at `0.59 × durations.wrong`. Keep related segment lengths aligned when moving these beats; changing whole-scene duration or `speed` is easier. Particle lifetimes are independently configurable and can extend a scene's visual cleanup beyond its main body movement.

## Code organization

`Balloon.idle()`, `rise()`, `fall()`, `celebrate()`, and `reset()` control the separate envelope, basket, ropes and flame elements of the supplied Miri SVG. Falling changes rope geometry to a slack curve, accelerates, squashes on impact, shakes the camera inside the scene, emits dusty cloud particles, and recovers. Correct answers rise with a flame burst and confetti. A solved existing flight triggers the bright happy-place ending, without inventing a new final-answer rule.

`SceneDirector` creates a GSAP master timeline per result and a separate ambient context. It observes confirmed game outcomes through the existing adapter. New results, skip, navigation, reduced motion and hidden tabs revert the relevant context and remove temporary particles. Gameplay never waits for timeline completion. SVG origins are explicitly supplied on animated limbs so context cleanup cannot move an arm away from the character.

`controls-motion.js` uses GSAP for the existing letter flights, button presses, score labels and UI reactions. CSS animations/transitions are disabled on the active Updraft page, preventing two animation engines from competing. No ScrollTrigger is loaded.

The GSAP 3.13.0 distribution and original license notice are included locally. Implementation references: [GSAP installation](https://gsap.com/docs/v3/Installation/) and [context cleanup](https://gsap.com/docs/v3/GSAP/gsap.context()/).

Reduced motion shows still expressions and final scenery, with no fall, shake, camera zoom or particles. The explicit motion switch also stops control animations. The standalone preview is for reviewing visuals; the local game at `/updraft` is the place to verify real gameplay. Neither artifact has been deployed by this task.
