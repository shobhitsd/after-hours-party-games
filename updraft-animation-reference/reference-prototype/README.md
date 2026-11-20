# UPDRAFT — The Little Wonders Expedition

**A playable, cinematic, offline-friendly daily trivia prototype — Chapter VI: The Living Journey.**

Five hand-picked wonders, one balloon, and a co-pilot named **Miri Quill** who meets the player's eyes. Correct answers fire the burner and lift the world; wrong ones bring a kind wobble and descent. Rare wonders cut into Miri’s face; perfect flights draw a constellation; every completed flight produces downloadable **Sky Mail**. **Chapter VI choreographs the camera, clouds, sunlight and wind with every answer—and holds the trivia fact until Miri’s cinematic is finished.** Chapter V’s opt-in soundscape and five-note sky song remain intact. The Flight Atlas and all earlier features remain intact.


## Play it immediately

**The easiest way:** open `updraft-play.html` in a modern browser. It is a complete, self-contained HTML file with **no dependencies, setup, accounts or network connection**.

**Work from source:** start a local static server in this folder:

```sh
python -m http.server 8000
```

Visit `http://localhost:8000` to play the source version. All source code is in `src/`, and `build.py` produces the standalone version.

## Controls

- **Start** with “Let's take flight.”
- **Choose an answer** by tapping/clicking its card, or pressing **1/2/3** or **A/B/C** while a question is active.
- **Skip a cinematic** by clicking/tapping the animated sky, clicking “Skip the moment,” or pressing **Space**.
- **Read the fact**, then click “Continue flight” or press **Space**. The fact never disappears by itself.
- **Open Sky Mail** at the end of any flight. Save its 1200 × 800 PNG postcard or copy your flight note. On mobile, tap “Inspect the star map” to zoom and pan.
- **Open the Flight Atlas** from the boarding pass or flight journal to see your last seven dated skies and replay their fixed routes. Atlas entries save locally at the end of a flight; casual practice flights do not change your daily records.
- **Wave to Miri** using the small “Wave to Miri” button in the sky. It triggers a skippable mini-performance and does not affect scores, fuel or the current question.
- **Watch the sky answer:** after you select an option, the discovery fact stays hidden until Miri’s reaction and any new-sky reveal finish. Skip at any time to reveal it immediately.
- **Meet the paper kite:** scrub altitude to about 840m in the creative panel, or discover it during an ordinary flight. It has no gameplay effect.
- **Choose your soundtrack** using the Sound of the Sky ticket inside the balloon. Select Silent (default), Quiet or Cinematic. The header speaker icon is a fast mute/full-score toggle. Original pads, wind, burner and reaction melodies are synthesized live with Web Audio; there is no autoplay or audio download.
- **Listen to your own sky song:** a perfect flight makes its five discoveries into five notes as the constellation draws. The melody is deterministic for that route.
- **Creative debug controls:** click the little gear or press **D**. Press Escape to close. Drag altitude/fuel sliders; demo correct, rare, wrong, new-sky, awe, sky-writing and landing reactions; change speed; simulate reduced motion; inspect event/FPS.

## Creative decisions

- **Lead character:** Miri Quill, a curious aeronaut with a little vanity, a long fluttering scarf and a habit of looking directly at the player.
- **Original, entirely code-drawn art:** hand-authored inline SVG, CSS scenery, deterministic stars and tiny fixed-pool spark bursts. No external illustrations or stock assets.
- **The sky is a character:** one altitude number controls five smoothly blending atmosphere bands, clouds, sunlight, stars, aurora, the ground, and instrument styling.
- **The trivia stays yours:** each round awards a journal souvenir. A mistaken answer also unlocks a short interesting fact.
- **Deliberate pacing:** answer → cinematic → unhurried fact → player-controlled continuation. On narrow screens, the camera scrolls up to the cinematic and back to the fact card.
- **Forgiving failure:** six fuel cells, two lost per wrong answer. Zero fuel means a kind landing, not a failure screen.
- **Micro-acting before spectacle:** all answer options prompt the same curious gaze, without hinting at correctness. Correct, incorrect, new-sky and landing events each have specific eye, brow, head and arm choreography. Each correct answer leaves a golden stitch on Miri’s scarf.
- **A camera that feels close:** exceptionally rare answers—and the fifth perfect answer—cut into a close portrait of the *same original SVG face*, not a second character asset. This keeps all expressions consistent.
- **Sky Mail:** the game history deterministically defines five star locations. Only a flawless flight draws lines between them, first as an animated celestial reveal and then as a keeper postcard. Unlit stars give other flights a meaningful, kinder shape.
- **The sound changes with the sky:** five altitude-sensitive acoustic presets blend smoothly while Miri receives discrete original reaction motifs. Mute is the default and sound never alters score, fuel or outcomes.
- **Portable by design:** `src/postcard.js` is pure and tested. The browser rasterizes its self-contained SVG into a shareable PNG without a server, CDN or external assets.
- **Daily ritual:** a 38-question bank follows a deliberate daily arc of two common, two uncommon and one rare finale, with varied topics. Each local date has a deterministic route; replaying an old date uses that same route. Separate practice flights offer a new route without rewriting daily scores.
- **Flight Atlas:** seven recent days, local-only records, a golden seal for a flawless score, and gentle remembered greetings on return. No backend or accounts.

## Architecture

```
index.html           Readable source markup and original balloon/character SVG
src/config.js        Single home for motion, game, sky and audio tuning
src/game.js          Pure, deterministic game rules and daily question deck
src/soundscore.js    Pure altitude-to-sound profile map and five-wonder melody
src/skycinema.js    Pure altitude-weather profile and cinematic shot directions
src/audio.js         Opt-in Web Audio ambience, effects and resource lifecycle
src/acting.js        Pure stage directions, director captions and Miri’s end note
src/postcard.js      Pure SVG Sky Mail generation and unique constellation coordinates
src/logbook.js       Pure seven-day route/record normalization and best-score tracking
src/app.js           Event director, animation presentation, UI and debug panel
src/styles.css       Sky, character rig, cinematics and responsive design
build.py             Produces standalone updraft-play.html
updraft-play.html    Offline one-file playable build
screenshots/         Actual screenshots, an exported PNG, and GIFs recorded from Chromium
tests/               Pure Node tests + browser smoke / accessibility tests
brief/               Original reference documents you provided
```

**Guardrail:** animation is a one-way subscriber. Only `src/game.js` changes the true score, altitude, fuel or round phase; `src/app.js` uses the resulting event to stage a movie moment. Stopping or skipping any event commits its intended final visual state.

## Tuning the feel

Use `src/config.js`:

| Setting | Current value | Effect |
| --- | --- | --- |
| `motion.correctMs` | 1900 ms | Ordinary correct-answer beat |
| `motion.rareMs` | 2550 ms | Rare surprise with camera push + letterboxing |
| `motion.wrongMs` | 1750 ms | A gentle wobble and fuel vent |
| `motion.tierMs` | 1600 ms | New-sky announcement |
| `motion.landingMs` | 2550 ms | Warm safe landing |
| `motion.constellationMs` | 2700 ms | Star-writing finale for a flawless flight |
| `motion.waveMs` | 1400 ms | A skippable hello from Miri |
| `game.wrongFuelCost` | 2 | Fuel spent on each mistake |
| `game.altitudeGain` | 320, 360, 400, 440, 480 m | Lift awarded by each correct wonder |
| `sky.tiers` | 0, 300, 700, 1100, 1500 m | Atmosphere milestones |

The debug panel also controls playback speed without affecting pure game logic.

## Chapter VI

Read `CHAPTER_VI.md` for the new physical-depth cinematography, player-first fact reveal and browser verification. The original Chapter V soundtrack remains available.

## Chapter V

Read `CHAPTER_V.md` for soundscape design, performance and accessibility considerations. The 12-second MP3 audio preview was captured from Chromium’s real Web Audio graph and normalized for listening; the runtime itself contains no recorded audio.

## Tests and screenshots

```sh
node --test tests/*.test.cjs
python build.py
python tests/browser_check.py
python tests/extended_check.py
python tests/capture_gif.py
python tests/chapter_two_check.py
python tests/chapter_three_check.py
python tests/chapter_four_check.py
python tests/capture_chapter_two.py
python tests/capture_chapter_three.py
python tests/capture_chapter_four.py
```

Browser tests require **Python Playwright** and a **Chromium executable** at `/usr/bin/chromium` in this evaluation environment; change `executable_path` on other machines. Browser smoke tests render the self-contained HTML into Chromium and exercise both good and bad answers, tier changes, safe landings, the journal, mobile widths 320px and 390px, reduced-motion simulation and JS errors.

For Chapter IV, 16 Node tests pass and the browser Atlas journey exercises a soft landing, a perfect rerun, a practice flight, an archived day and mobile UI without uncaught JavaScript errors. Previous Chapter II and III checks continue to pass. The evaluation browser blocks local/HTTP navigation, so the Atlas browser test uses a controlled local-storage substitute; real cross-session storage persistence, screen-reader behavior and mid-range phone frame rate still need testing. See `CHAPTER_IV.md` for details.

## Known MVP boundaries

This is an enjoyable vertical slice, not yet a hosted production service. It has a curated 38-question bank and a private local flight ledger, but no online scores, multiplayer, player account, analytics or backend. The SVG character now has a small expression rig (calm, happy, rueful, awe, wink) plus a reusable portrait close-up, but not professional sprite-sheet character animation. The audio is a set of simple generated cues rather than a full original score.

**Next:** test the build on real phones; independently verify each trivia fact and publish immutable daily routes. Social features can wait until the core two-minute flight feels exquisite.

## Originality and credits

Artwork, character, name, questions and prose in this project are newly authored for Updraft. No third-party fonts, art files, sound recordings or runtime libraries are used. See `docs/licenses.md` for details. The original user-supplied brief is preserved separately as inspiration; it is not the source code specification.
