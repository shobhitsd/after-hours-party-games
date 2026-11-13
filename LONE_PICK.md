# Trust Issues

Added 14 November 2026, using the supplied “Trust Issues (working title): Game Rules & Examples” as the game specification. This adds a seventh game to the existing After Hours app; it does not change hosting or activate billing.

## Play

Open the lounge, choose **Trust Issues**, then **Try with practice bots** or **Host this game**. Best with 5–8 players; four is supported. Each player uses their own screen. Discussion happens in person or through your existing voice call.

The host can set Ranking, Discussion and Pick timers (10–120 seconds), the Spy Window (5–30 seconds), and the hidden Underdog probability (0–100%). The interface offers common presets. Defaults are 30 / 45 / 45 / 10 seconds and 50%. Practice has no timers: the host advances completed steps manually.

1. **Rank:** the randomly chosen Ranker orders every option with accessible up/down controls. Ranking is private. An unsubmitted timed-out ranking becomes a random permutation.
2. **Discuss:** the Ranker can record an explicit “I ranked X first” claim and an optional 160-character message. It may be true or false and may be updated until discussion ends. Everyone sees the latest recorded claim. Private picks open when the timer ends or the host finishes discussion.
3. **Pick:** choose one option. Non-Rankers can optionally record Believe, Doubt, or Not sure about the first-place claim. Regular multiplayer picks always wait for the full Pick timer; missing picks are random. A locked pick cannot change.
4. **Spy:** a player can commit their one Spy Card during Discussion or before locking a regular Pick. Only their identity is announced. Their target stays private unless they explicitly reveal it. After regular picks close, they see their target's final pick and choose during the Spy Window. If nobody uses a Spy Card, the game skips this window.
5. **Reveal:** the option cards reveal their players in sequence, followed by the actual ranking, claim verdict, hidden twists and per-player score calculations.

Sixteen authored questions cover travel, food, sports, series, superpowers, activities and more. Each has nine distinct options, so eight-player finals are fully supported. Questions do not repeat within a game.

## Scoring and hidden information

- Normal rounds have N−1 options, with values from N−1 to 1. The final round has N+1 options and doubles base values.
- A unique pick earns its option value; a shared option earns zero pick points.
- The Ranker's unique base is halved and rounded up **before** applying the streak multiplier.
- Unique streaks use ×1, ×1.5, then ×2. Last Man Standing doubles a sole unique non-Ranker. Their combined multiplier caps at ×2. Half-point results are retained because the supplied rules only request rounding for the Ranker discount and the final Jackpot split.
- A hidden Underdog option adds 2 for a unique pick. Mastermind adds 1 per collided option to the Ranker, capped at 2, even if the Ranker collided. These are flat bonuses.
- A dead round has no unique non-Ranker and adds 3 to the Jackpot, capped at 6. The next unique non-Ranker on the highest-valued option wins the whole pot. Values after reversal and final doubling determine this award.
- After final-round scoring, any unpaid pot goes to the lowest-scoring player(s), equally split and rounded down. The reveal reports any discarded remainder. Final standings include this payout.
- Highest total wins, then most unique picks. A remaining tie shares victory.

The Reverse Round is drawn once from rounds 2–N. Underdog presence and option are drawn at each round's start. Neither draw is sent to any player, including the Ranker, until reveal. Ranking goes only to the Ranker; picks go only to their owner and, during the Spy Window, the one entitled spy. Private targets stay out of other player views even after reveal unless voluntarily announced.

Ranker draws exclude the previous Ranker and anyone who has already ranked twice. Eligible players have weight `3 − prior Ranker turns`, so those with fewer turns are more likely. Nobody is promised a turn.

## Clarifications where the document leaves details open

**Spy chains and refunds:** freeze all Spy Card commitments together when Pick closes. Any spy-to-spy edge refunds both players; take the union across all such edges, including chains and cycles. Refunded spies still choose during the Spy Window, without a peek, and can use the refunded card in a later round. This avoids exposing another spy's unfinished pick or locking players out. All-spy rounds are valid and resolve with blind choices after refunds.

**Claims and awards:** the app can verify an explicit first-place claim, but cannot infer the truth of a spoken conversation or a free-text bluff. The typed message is displayed verbatim with HTML escaped. The first-place claim is compared with the original ranking, so a truthful Ranker remains truthful even when a hidden Reverse Round flips values.

Awards use these visible definitions, with tied winners sharing an award and zero-valued awards left unassigned:

| Award | Measurement |
| --- | --- |
| Silver Tongue | Total collided options across the player's Ranker rounds |
| Detective | Recorded Doubt on a false first-place claim |
| Lone Wolf | Total unique picks |
| Sucker | Recorded Believe on a false first-place claim, followed by a collision on the claimed option |
| Streak Master | Longest consecutive unique-pick streak |
| Ghost | Highest round score from a unique pick after a successful, non-refunded Spy Card; a descriptive payoff, not a claim of causal advantage |

Belief choices never change points. The document's dramatic example says every other player scores zero, but its always-active Mastermind rule gives the Ranker a collision bonus. Implementation follows the explicit scoring table and retains Mastermind.

**Demo timing:** real multiplayer honors the full Pick timer. Practice follows the website's existing no-countdown approach: once all non-spy choices are ready, Continue demo closes Pick and opens Spy or Reveal. Bots use only filtered player views; they rank, make claims, sometimes use Spy Cards, and avoid a peeked option when choosing. They cannot see the hidden draws or opponents' rankings.

## Implementation

| File | Responsibility |
| --- | --- |
| `lone-content.js` | Game metadata, quick rules, timer defaults and sixteen prompt sets |
| `lone.js` | Ranker draws, phases, Spy Card resolution, deterministic scoring, privacy and awards |
| `engine.js` | Integration with rooms, timers, practice progression and rematches |
| `bots.js` | Actions based on a filtered player view |
| `public/lone-ui.js` | Ranking, claims, belief choices, Spy Card controls, reveals and awards |
| `public/app.js`, `public/gameplay.css` | Lounge/settings integration, preserved drafts, responsive controls and animation |
| `test/lone.test.js` | Worked examples, modifiers, hidden information, spy chains, timeouts and randomized complete games |
| `test/browser/lone.spec.js` | Full practice, real multiplayer Spy Window, responsive and browser-engine checks |

Round results retain claim truth, claim-following count, collision-option count and Last Man Standing incidence in the room's in-memory history. No external analytics service or durable telemetry storage is added. Existing room persistence and hosting limitations still apply.

## Verification

Run `npm test` and `npm run test:ui`. The expanded randomized suite covers all seven games. Dedicated Trust Issues cases cover all supported player counts, 200 complete timeout-driven games, 25 complete practice games, worked scoring examples, all-spy cycles, half-points, final unpaid pots, Ranker selection limits and private views. Browser checks exercise phone/tablet/desktop widths, Chrome, WebKit and Firefox. These emulate viewports; they are not a claim of physical-device certification.
