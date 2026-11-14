# Gameplay fixes and verification

## Packed House replacement — 14 November 2026

Packed House replaces Trust Issues and Last Seat in both the game catalog and running engine. The other five games remain. Rules, tables and operational choices: [PACKED_HOUSE.md](PACKED_HOUSE.md). Historical results below describe earlier versions, not the current game.

### Current checks

- **50 engine/test cases passed** with `npm test`. These include 1,200 complete randomized games across all six games (6,700 rounds, 60,248 accepted player actions), plus a separate 1,000 Packed House games (7,496 rounds). Packed House checks include all player counts, skipped and replaced submissions, disconnected players, floor division, optional Soft Landing, anonymous ballots, shared wins, paused timers, host transfer, and returning from a paused game to another game.
- **10,000 aggregation fuzz cases** check Borda conservation and ordering independence. Portable SHA-256 matches Node's implementation on known vectors and 300 generated proofs; edits to each committed field fail verification. Pre-reveal player and spectator views are checked for capacity, nonce, ranking, pick and token leaks.
- **6,438,312 exhaustive outcome combinations passed**, each checked under Classic and Soft Landing: every legal capacity vector crossed with every room-occupancy vector, including abstentions, for 5–10 players. That is 12,876,624 scoring-mode scenarios and 76,491,216 per-room checks. An independent integer-quotient calculation checks payouts. This exhausts outcome shapes, not every labelled-player permutation or strategy. Report: `test-results/packed-exhaustive.json`.
- **31 distinct browser scenarios passed across the full regression run and final focused rerun.** The full run passed 30/31; its remaining test sampled a second tab before that tab had received its own updated state. The test now waits for both clients and deliberately holds an older HTTP response until a newer choice arrives. The final seven-test Packed House run passed in full. Existing games' full practice rounds, all roles, rematches, typing, selection flicker, borrowed-hand auditing and mobile regressions passed in the full run.
- Packed House browser coverage includes five full practice rounds, changing saved ranks/picks, reload and duplicate tabs, anonymous/custom packs, text escaping, rejected settings, tampered-proof warnings, drag/drop, touch pointer cancellation, and twelve viewport sizes from 320 pixels wide through desktop and tablet landscapes. Chrome, Firefox and WebKit passed their interaction checks. These are browser tests, not physical-device certification.
- A real-timer **ten-player** browser/API game verified six rooms, full Rank/Pick deadlines even after everyone submitted, hidden picks/capacities, late spectators, a scored reveal, quorum pause, host transfer and early finish with completed scores preserved.

### HTTP/SSE workload

`npm run test:load` passed on an isolated local server:

| Measurement | Result |
| --- | --- |
| Rooms / seated players / spectators | 20 / 200 / 20 |
| Concurrent event streams | 221, including a duplicate identity |
| Completed rounds | 100 |
| Requests | 7,945 |
| Idempotent duplicate/delayed retries | 3,000, without undoing later saves |
| Stream events inspected | 84,816 |
| Maximum in-flight HTTP requests | 32 |
| Latest elapsed workload | 15.35 seconds |
| Request median / p95 / max | 50.57 / 123.09 / 272.79 ms |

The workload uses real HTTP and SSE but controls phase deadlines through the in-process engine. It checks spectator restrictions, per-player event identity, revisions, hidden data, accepted replacements, duplicate retries, exact payouts, finished games and stale rematch actions. It is not a production internet-capacity benchmark. Report: `test-results/load-report.json`.

### Review and run

- Screenshots inspected: `test-results/packed-pick-phone.png`, `packed-reveal-ipad.png`, `packed-reveal-desktop.png`. The final screenshots disable animations while capturing their completed state; the app itself retains transitions and staggered reveals, with reduced-motion support.
- The local server was restarted at **http://localhost:3000** and verified to list Packed House plus the five remaining games. New UI/proof/CSS assets return HTTP 200; server error log is empty. Use START GAMES.cmd again when needed; STOP GAMES.cmd tracks the restarted process.
- `git diff --check` passed. The Docker copy list includes the new engine and existing `lib` dependencies; a container build was not run.
- The supplied document's earlier 3.7-million-test and strategic-bot findings were not independently reproduced. Our tests establish the checks above, not that the game is fun or balanced against human strategies. Human playtests remain necessary, especially for zero-score frustration and Soft Landing.
- Rooms remain in process memory and reset on restart. A persistent Node host is required for real multiplayer; the existing serverless adapter alone is insufficient. This change was not deployed to a public host.

Reproduce with `npm test`, `npm run test:ui`, `npm run test:exhaustive`, and `npm run test:load`, in that order. Playwright clears its output directory at startup, so run the two JSON-producing stress checks afterward.

## Trust Issues addition — 14 November 2026

- Added the seventh game with private ranking, recorded claims, timed picks, Spy Windows, all specified scoring twists, random Ranker constraints, final-round chaos, awards and rematches. Details and clarified edge cases: [LONE_PICK.md](.archive/retired-games/LONE_PICK.md).
- `npm test`: **53 tests passed**. The main randomized workload now completes **1,400 games, 7,500 rounds and 54,420 accepted actions** across all seven games. Dedicated Trust Issues checks additionally complete 200 timeout-driven games and 25 practice games.
- Browser checks: **35 distinct tests passed**. The complete 34-test suite passed; after final presentation refinements, all five Trust Issues browser tests passed, including the newly added unique-pick tie-break/shared-winner check.
- Trust Issues browser coverage includes a complete mobile practice game, Spy Card use and target disclosure, every phase through final awards/rematch, real multiplayer private peeks, the full Pick timer, rank controls and draft restoration. Twelve viewport sizes are exercised. Chrome, WebKit and Firefox passed their relevant interaction tests; physical devices were not certified.
- Concurrency regression passed: **24 rooms, 192 players, 193 event streams, 4,109 requests and 1,152 rejected duplicate submissions**. This shared-server check uses Last Seat; it is not a claim that 192-player Trust Issues sessions were load-tested. Latest local workload: 2.00 seconds; measured request median / p95 / maximum: 30.84 / 137.94 / 164.40 ms.
- Screenshots: `test-results/lone-ipad-rank.png`, `lone-phone-spy.png`, `lone-phone-reveal.png`, and `lone-awards.png`. Load report: `test-results/load-report.json`.
- The local server was restarted and verified at `http://localhost:3000`, including the new game catalog and UI module. No hosted service was deployed. Rooms still live in server memory.

## Previous update — 13 November 2026

## What changed

- **Selection flicker:** the client previously replaced the entire page on each selection and bot update, restarting the stage entrance animation. It now patches existing DOM nodes and replaces the stage only when the server advances to a new phase. Card identity, focus, typing selection, scroll, clue order, and in-progress drafts survive updates.
- **Borrowed Words hand confusion:** sabotage acts on the opponent's hand; clue-building acts on the player's own hand. Both now remain visible in consistent, labeled team panels during these phases. Removed slots stay visible. The status explicitly says both clue-givers finished removing three cards each. These are separate hands, not a reshuffle of the same hand.
- **Game variety:** 6/9/12-card Signal Bridge boards with 24 association groups; twelve related Decoy Department sets; 36 Last Seat round sets across six topics with visible or mystery limits. Only hosts can change lobby options; guests receive the same configuration. Mystery capacities are fixed before voting and withheld until reveal.
- **Redraw defect:** the old redraw could choose the same replacement word repeatedly. Replacements now come from one unique shuffled pool. The three removed cards keep their original words and positions. A confirmation explains that only the nine available cards will change.
- **Practice pacing:** practice has no deadline and pauses after every completed phase until the host chooses Continue demo. It shows a step indicator, role, actual number of required submissions, and next step. Multiplayer still advances automatically and uses timers.
- **Bot information:** bots use only filtered player views, authored word associations, and basic preferences. Their guess logic no longer reads the current round’s secret answer or partner assignment. Unusual clues can still be misunderstood.
- **Race conditions:** monotonically increasing state revisions prevent delayed HTTP responses from undoing newer live updates. Phase identifiers reject stale actions even across rematches. Pending requests prevent repeated client submissions. Duplicate tabs can receive the same player’s stream without repeatedly disconnecting one another.
- **Other fixes:** unique practice player names, invalid game-name rejection, expired-action rejection, per-session write rate limits for players sharing Wi-Fi, Unicode avatars, and narrow-screen layout adjustments.

## Checks completed

### Engine and randomized checks

`npm test` — **36 tests passed**.

- **1,200 complete simulated games**, covering every game, all allowed player counts, roles, redraws, missing submissions/timeouts, scoring, privacy, and rematches.
- **6,300 rounds** and **46,060 accepted player actions** in that workload.
- **1,000 redraw scenarios**, checking both teams: twelve unique cards, exact removed words in their original slots, no changes to the other team, and no second redraw.
- No practice timeout or automatic skip; duplicate advances are rejected.
- No session token in any filtered player view.
- Every board size, all twelve curated decoy sets, all six topics plus Mixed, both capacity modes and all allowed Last Seat player counts. Invalid settings do not mutate state; guessers cannot inspect private team hands.

### Browser checks

**30 browser tests passed in the complete suite**, including Chrome plus dedicated WebKit and Firefox interaction checks.

- All six games played from start through every round and human role to final scores and rematch.
- Six independent browser sessions joined and completed a multiplayer round.
- Desktop, phone, and 320-pixel layouts; reduced motion; rules and keyboard dialogs.
- Rapid card selection, deselection, selection order, selection limits, focus, scroll, unchanged DOM nodes, and no restarted phase animation on bot updates.
- Exact opponent-hand/removal review; redraw confirmation, cancellation, uniqueness, and unaffected opponent cards.
- Draft text and selections survive reload; typing cursor survives bot submissions.
- Two tabs sharing one player; delayed HTTP responses arriving after newer event-stream updates.
- All six games checked at 320×740, 360×800, 390×844, 430×932, 844×390, 768×1024, 820×1180, 1024×768, 1180×820, 1280×720, 1440×900, and 1920×1080. No horizontal document overflow. WebKit and Firefox also check these widths after live hand interactions. These are browser viewport tests, not physical-device certification.
- Shared lobby settings, 12-card boards, mystery reveal, explicit removal status, and both hands on phone/tablet. Screenshots: `test-results/borrowed-phone.png` and `test-results/borrowed-ipad.png`.

### HTTP and event-stream load

`npm run test:load` — **passed**, using an isolated local test server.

| Workload | Result |
| --- | --- |
| Concurrent rooms | 24 |
| Simulated players | 192 |
| Live event streams | 193, including a duplicate tab |
| Completed multiplayer rounds | 144 |
| HTTP requests | 4,109 |
| Duplicate submissions rejected | 1,152; none scored twice |
| Observed stream events | 11,975 |
| Elapsed workload time | 1.90 seconds |
| Timed request median / 95th percentile / maximum | 32.74 / 131.13 / 159.94 ms |

The timing sample covers the helper-issued requests; duplicate-submission requests are counted and validated but not included in that latency sample. Stream identity, privacy, revision order, final scores, and connection continuity were checked throughout.

These are measurements on this local computer using simulated clients, not a guarantee of production internet capacity or an assertion that every possible defect has been eliminated. Rooms remain in memory and reset on server restart.

## Reproduce

```powershell
npm test
npm run test:ui
npm run test:load
```

Browser tests require installed Google Chrome plus `npx playwright install webkit firefox`, and use port 3100. The HTTP load test uses port 3101. Both keep the regular game server on port 3000 separate. Playwright clears `test-results/` at the beginning of a run; run the load check last to retain its JSON report alongside the browser screenshots.

Hosting configuration is prepared but has not been deployed. The Docker build could not be exercised because the local Docker daemon was not running. Accounts, billing, persistent rooms and production capacity remain implementation work described in `LAUNCH_PLAN.md`.
