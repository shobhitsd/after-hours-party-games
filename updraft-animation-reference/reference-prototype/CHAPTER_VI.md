# UPDRAFT — Chapter VI: The Living Journey

## What changed

**The answer is a shot, not a UI flash.** The answer card now waits while the sky reacts. A quiet parchment prompt asks the player to look up; only after the event director has completed every beat (including a new-sky reveal) does the question fact appear. The fact stays on screen until the player explicitly continues. Skipping the cinematic reveals the fact immediately and commits all earned altitude, score, and fuel state.

**Physical depth, with no video assets.** Every correct answer pulls near clouds past the balloon faster than distant clouds. A warm shaft of light sweeps across the frame, tiny wind ribbons follow the thermal and a soft foreground cloud bank crosses beneath Miri. Wrong answers reverse that energy: a cooler light and a cloud cushion support the descent. New-sky reveals have a more spacious, atmospheric sweep.

**A very small sky visitor.** At middle altitudes, a hand-drawn paper kite floats past on the wind. It is deterministic, purely decorative and disappears before Night Orchard. The kite's motion pauses when it is not visible. Its SVG consists of a few paths, not a new network asset.

**A direction the director can name.** `src/skycinema.js` is a small pure module. `profile(altitude)` returns near/far parallax, sunlight and visitor visibility; `shot(scene)` maps existing event names to visual directions such as `rise`, `dip`, `reveal` and `settle`. The browser translates these into data attributes and CSS keyframes. Nothing in the module can change score, fuel, deck or the next question.

## One cinematic, three beats

1. **Hush:** player answers; question logic commits instantly, the fact remains visually hidden, Miri turns toward the player.
2. **The sky answers:** the camera gets the corresponding rising, descending or revealing atmospheric shot. The balloon and soundtrack respond together.
3. **The keepsake:** the director finishes or is skipped, all ephemeral visuals clean up, and the fact + next-flight control appear.

A returning player still gets the Flight Atlas, Sky Mail, the five-sky soundtrack and all prior chapters.

## Performance and reduced motion

All new movement is CSS opacity and transforms. No per-frame canvas drawing, no particle allocation, no extra animation clock. The one altitude tween already present in Chapter V updates two custom cloud offsets and kite opacity. Temporary cinematography layers request compositor promotion only while a beat plays. The kite's idle animation is paused outside the middle altitudes.

Native and simulated reduced-motion settings suppress the new wind, light and cloud sweeps while retaining readable captions, color-independent outcomes and the player-controlled fact reveal. The sky is never a required source of answer information.

## How to try it

- Open `updraft-play.html` directly, or run `python -m http.server 8000` from the source directory.
- Answer a question correctly, or choose a wrong option. The question's fact waits until the cinematic ends.
- Press Space, tap the animated sky, or select **Skip the moment** to fast-forward safely.
- Press **D** for the debug panel and scrub altitude to about **840 m** to meet the paper kite.
- Use **Wave to Miri** or the Listening Room at any time; neither affects the score.

## Checks performed in this environment

- 24 pure Node unit tests (game, postcard, Atlas, character, audio score, cinematography).
- Chromium Chapter VI journey: rising and dipping shots, wind animation, kite visibility, skip cleanup, fact handoff, fuel isolation, 390px reduced motion, zero uncaught JavaScript errors.
- Existing Chapter III/IV/V browser regression journeys plus the general browser smoke check.
- Desktop screenshots and an 18-frame GIF captured directly from Chromium, not from a concept render.

**Still to verify:** a physical mid-range Android/iOS device for battery, FPS, mobile GPU memory, touch comfort and audio mixing; a full assistive-technology audit and independent fact-checking of all daily questions. Chromium here uses `set_content` to work around an environment restriction on loading local URLs. Do not treat these checks as a production-device certification.

## Next creative opportunity

A meaningful production milestone would be publishing immutable dated question packs, with content review and offline caching; a daily game loses player trust if the same date's route changes after a content update. Then conduct real-device profiling, accessibility testing and a few sessions of player observation before adding social competition.
