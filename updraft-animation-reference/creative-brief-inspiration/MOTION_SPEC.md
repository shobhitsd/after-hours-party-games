# Updraft: Motion Spec

A reference and starting point for animation behavior, not a rulebook. Treat the beats, timings
and numbers as suggestions; improve or replace them if you can make a moment feel better.
Keep tunable values in one config file and expose them in a debug panel.

## 1. Motion tokens
```ts
export const motion = {
  ease: {
    lift:   "power2.out",        // rising, confident
    sink:   "power2.in",         // deflating, descending
    snap:   "back.out(1.6)",     // stamps, UI thumps
    settle: "elastic.out(1, 0.6)", // balloon bounce after dip
    soft:   "sine.inOut",        // idle loops, sway
  },
  dur: {
    micro: 0.18, short: 0.45, beat: 0.9, scene: 1.8, milestone: 2.6,
  },
  particles: { max: 150, windWisps: 24, stars: 80, sparks: 40, confetti: 90 },
  camera:    { pushIn: 1.06, pushInRare: 1.12, shakeTurbulence: 6 /*px*/, letterbox: 0.09 /*screen fraction*/ },
  fuel:      { max: 6, lowThreshold: 2 },
  altitude:  { metersPerPoint: 10, tiers: [0, 200, 500, 900, 1500] },
  timeScaleDebug: 1,
};
```

## 2. World driver
`getSkyState(altitude) => { gradientStops[], cloudDensity, cloudScale, starOpacity,
auroraOpacity, sunAngle, parallaxSpeed, windVolume, audioLowpassHz, tier }`
- Interpolate smoothly between tiers (no hard cuts). Crossfade duration 2s.
- Altitude changes are tweened (never jump). The altimeter number counts up with the tween.

## 3. State machine (game logic, pure)
```
LAUNCHPAD -> ROUND_PROMPT -> GUESSING -> RESULT(hit | turbulence)
   -> TIER_CHECK -> ROUND_PROMPT (next) ... -> FINAL_APPROACH -> LANDING
GUESSING -> OUT_OF_FUEL -> LANDING   (any time fuel reaches 0)
```
Events emitted to the animation layer:
`GAME_START, ROUND_PROMPT, LETTER_LAUNCH, CORRECT_ANSWER{rarity}, WRONG_ANSWER{fuelLost},
LOW_FUEL, TIER_CHANGE{from,to}, OUT_OF_FUEL, FINAL_APPROACH, WIN_LANDING`

## 4. EventDirector rules
- FIFO queue; one cinematic plays at a time. Small ambient reactions may layer on top.
- **Skip:** tap, click or Space fast-forwards the current timeline to its end state (timeline.progress(1)), and end states must always be valid.
- **Auto-shorten:** if the same event type fired 3+ times within 30s, play a 60% length variant.
- **Priority:** OUT_OF_FUEL, TIER_CHANGE and WIN_LANDING can't be skipped before their first 0.6s, and they jump the queue.
- Common events <= 1.2s total. Milestones 2-3s.
- Always restore the neutral state (camera, letterbox, vignette, expression) at the end.

## 5. Event beats (timeline breakdowns)
Times in seconds from event start. Character = C, balloon = B, camera = Cam.

**GAME_START (~3.2s)**
0.0 sky dawn fade in, B on launchpad, ropes taut
0.6 C waves at player, eyes to camera
1.4 burner roars (flame flare, whoosh SFX), ropes release
1.8 B lifts with `lift` ease, Cam pushes in slightly, tagline fades in
3.0 settle to idle sway

**ROUND_PROMPT (~0.9s)**
0.0 C eyes go to question card (look-down gaze)
0.5 C glances back to player, one brow raised
0.9 gaze held, ready

**LETTER_LAUNCH (~1.2s)**
0.0 C holds up letter token toward player
0.3 release, token floats up with slight spiral and a soft trail
1.2 token fades into the slipstream, small wind wisp swirl

**CORRECT_ANSWER**
- Common 🪶 (~1.0s): small burner puff, C thumbs up, +altitude tween 0.6s, feather stamp snaps in
- Uncommon 🌤️ (~1.3s): warm light wash across scene, C delighted, bigger lift, stamp snaps in
- Rare ⚡ (~1.6s): white-gold flash 80ms, C awe, Cam pushIn 1.12, strong lift, stamp with spark burst
- Deep Cut 🌟 (~2.4s): slow-mo 0.5x for 0.8s, letterbox bars in, sunbeam burst from basket, C tips cap to the player, huge lift, stamp with starfield flourish, bars out

**WRONG_ANSWER (~1.1s)**
0.0 panel shudders (shake 6px decaying), B tilts 4 degrees
0.1 C grips rim, expression nervous, eyes to player ("did you see that?")
0.2 fuel capsule icon vents steam (`-1` or `-2` Fuel text)
0.3 envelope inflation eases down one step, altitude dips slightly with `settle` bounce
1.1 recover to idle

**LOW_FUEL (~1.0s, repeating soft pulse until resolved)**
Amber gauge pulse, C taps the gauge and glances anxiously at player, envelope sag 5%, tension audio layer fades in

**TIER_CHANGE (~2.6s)**
0.0 sky crossfade begins, parallax speed eases
0.5 tier banner slides in (name + altitude)
0.8 C looks around, expression awe, then looks to player and nods
2.0 banner out, new ambient details fade in (clouds, stars, aurora, planes)

**OUT_OF_FUEL: the "losing air" sequence (~4.0s, kind)**
0.0 burner sputters and dies (flame flickers out), music dips
0.5 envelope deflates visibly over 2s, ropes slacken
0.8 B begins gentle descent with `sink` ease, parallax reverses direction softly
1.5 C looks into camera, rueful smile, shrugs
2.8 sky warms back to launchpad dawn tones, ground rises into view
3.6 soft landing bump, dust puff, C bows to player. Flight log slides in

**FINAL_APPROACH (~2.0s)**
Music swells, golden light intensifies, C squares shoulders, B steadies and the sway drops to 30%, vignette fades in lightly

**WIN_LANDING (~3.5s)**
Descent to a golden launchpad, confetti of paper planes and sparks, C waves and bows, "A bright landing at the launchpad" title, Flight Log summary slides in

## 6. Camera language
Push-ins via scale and translate on a wrapper `<g>` or div, never on individual layers. Letterbox
via two fixed bars animating `transform: translateY`. Shake via decaying random offsets on the
wrapper. Vignette via an overlay with animated `opacity`.

## 7. Performance and accessibility
- 60fps target on mid-range phone. Check the FPS counter with all ambient layers on.
- Pool particles. Never allocate inside the frame loop.
- Only animate `transform` and `opacity`. Use `will-change` sparingly.
- Pause all animation and audio when the tab is hidden.
- `prefers-reduced-motion`: no shake, no camera moves, no letterbox, no slow-mo; use 150ms fades and static expressions; keep all information visible.

## 8. Debug panel (required, dev only)
- Altitude slider (0-2000m), fuel slider (0-6)
- Button for every event in section 3, plus rarity variants
- Time scale toggle (0.25x, 0.5x, 1x)
- FPS counter, live particle count, current queue contents
- Toggle: reduced-motion simulation
- Toggle: timeline overlay (current event, elapsed time)

## 9. Suggested build order (reorder freely)
1. Scaffold, config file, state machine stub, event bus, debug panel
2. Sky engine: `getSkyState`, gradient, parallax clouds, stars, aurora
3. Balloon + basket + physics (fuel-driven inflation, sway, lift, dip)
4. Character SVG rig: expressions, gestures, idle, gaze (see `STEP4_CHARACTER_RIG_PROMPTS.md`)
5. EventDirector + GAME_START, LETTER_LAUNCH, CORRECT_ANSWER (all rarities), WRONG_ANSWER
6. ROUND_PROMPT, LOW_FUEL, TIER_CHANGE, OUT_OF_FUEL, FINAL_APPROACH, WIN_LANDING
7. Audio layer
8. Performance pass, reduced-motion pass, mobile touch pass
