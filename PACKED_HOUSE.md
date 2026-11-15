# Packed House — implemented rules

Packed House replaces Trust Issues and Last Seat in the six-game lounge. This implementation follows the supplied PH-1.0 rules, with the operational clarifications below. On 16 November 2026 the flow was simplified to **Rank → Discuss & choose → Reveal**, at the user's request. Scoring and hidden capacity rules are unchanged. The supplied report's 3.7 million tests are external claims; our independently run checks are recorded in VERIFICATION.md.

## Play

Five to ten players join before the start; later arrivals and players beyond ten watch as spectators. Everyone privately ranks all five options (six for nine or ten players), then sees the resulting rooms with choices immediately enabled. Discuss your plans in person or on a separate voice call while saving or updating a room, and reveal whether its entrants fit.

The latest valid saved ranking or pick before the phase closes counts. Moving an option or selecting a room is a draft until you press Save/Update. Live Rank and Pick always run their full timers, even when everyone has submitted. Practice waits for Continue demo at every step. Bots use only their filtered player view; they cannot inspect the capacity draw.

Ranking uses Borda points K through 1. Ties use more firsts, fewer lasts, then the random order committed before ranking. Margins do not change pools. No valid ballots means all options follow that committed random order. In the supplied all-Borda-tied example, first-place votes still precede the random tie-break: A and E beat the options with no firsts.

| Seated at start | Options | Tier pools | Capacity ceilings (all start at 1) |
| --- | --- | --- | --- |
| 5 | 5 | 12 / 10 / 8 / 6 / 6 | 2 / 2 / 2 / 2 / 2 |
| 6 | 5 | 12 / 10 / 8 / 6 / 6 | 3 / 2 / 2 / 2 / 2 |
| 7 | 5 | 12 / 10 / 8 / 6 / 6 | 4 / 3 / 2 / 2 / 2 |
| 8 | 5 | 12 / 10 / 8 / 6 / 6 | 4 / 3 / 3 / 3 / 2 |
| 9 | 6 | 12 / 10 / 8 / 6 / 6 / 6 | 4 / 3 / 3 / 2 / 2 / 2 |
| 10 | 6 | 12 / 10 / 8 / 6 / 6 / 6 | 4 / 4 / 3 / 3 / 2 / 2 |

Each capacity is drawn independently and uniformly within its range. Higher tiers never have a lower **ceiling**; an individual draw can still give a lower tier more actual seats. The original seated count fixes these templates for the whole game.

If entrants fit, each receives `floor(pool / entrants)`. Empty seats do not dilute that payout. A single entrant can win the whole pool. Overfull rooms award zero to everyone. Empty rooms, missed picks, and rounding remainders award nothing; nothing rolls over. The only possible nonzero rounding remainders are 8/3, 10/3 and 10/4.

Optional **Soft Landing** is off by default. Exactly one entrant over capacity earns one point per entrant; two or more over still earns zero. These are consolation points outside the forfeited room pool. This rule has calculation coverage, but its effect on enjoyment and balance needs playtesting.

Highest total wins. Ties use more positive-scoring rounds, then fewer zero-scoring rounds; remaining ties share the win. Since everyone has the same completed round count, the second tie-break is normally redundant. No final multiplier, jackpot, Spy Card, underdog or reverse-tier rule is carried over.

## Settings and pacing

- 5–10 rounds, default 8; 6 is recommended for groups of 9–10.
- Rank 30 seconds; Discuss & choose 65 seconds. Each timer can be 10–120 seconds. The question appears above the ranking controls immediately. There are no separate Question, Tiers, or Talk phases.
- Choices are open for the entire combined discussion timer. All saved choices remain editable until it ends. Reveals wait for the host to continue, giving everyone time to inspect calculations; there is no forced reveal timeout.
- Sixty curated questions with photos cover colours, food, sports, shows, activities and other preferences. Questions do not repeat within a game. Options are shuffled before ranking; five are used from each six-option curated set for smaller groups.
- Custom packs: 5 or 6 unique options per question, at least as many distinct questions as rounds, maximum 30 questions. All questions need 6 options for 9–10 players. Save the pack before starting.
- Individual ballots appear at reveal by default. Anonymous mode shuffles ballots and removes identities; picks and payouts remain public. Anonymity does not prevent people inferring a ballot from its contents.

## Connection and submission behaviour

The client sends a heartbeat every five seconds. After fifteen seconds without authenticated activity a player is marked Away. This grace period avoids penalising a momentary network interruption. Explicit Leave marks the seat away immediately. At Rank/Pick close, only connected seated players' valid submissions count; already-frozen rankings never change during Discuss & choose.

An away player keeps their identity, score and original seat. Reload the same tab or use the **private seat link** in the game sidebar to reconnect from another device. That link signs in as the player and must stay private. An ordinary invite creates a spectator after the game starts. In the lounge spectators can take an available seat for the next game.

Fewer than four connected seated players pauses the current phase and saves its remaining timer. Four reconnecting resumes it. After two minutes without recovery, or if the host chooses End game, only completed rounds count. Host control transfers to the connected human who has been connected longest; reconnecting the original host does not take control back.

Server phase identifiers reject old requests, including across rematches. Each submitted request can carry an idempotency identifier: retrying it cannot overwrite a newer submission. Multiple tabs can watch one identity without adding another seat. State revisions prevent delayed responses replacing newer browser state.

## Hidden draws and verification

Before ranking, the server draws capacities, a random tie order and a secret 256-bit nonce. The commitment is SHA-256 over the UTF-8 JSON array:

```
[roundId, "PH-1.0", seatedCount, capacitiesByTier, tieOrderByOptionId, nonce]
```

Only the commitment is exposed before reveal. The browser remembers the first commitment it sees for that round, then checks the revealed proof and capacity mapping against it. A device joining only at reveal explicitly says that it did not witness the earlier commitment. Verification also works on local HTTP/Wi-Fi through the tested portable SHA-256 implementation. A matching hash proves consistency with the commitment, not that a malicious server originally drew fairly.

## Files and running

`packed.js` owns aggregation, scoring, phases, settings, presence and filtered views. `packed-content.js` owns templates and curated questions. `public/packed-ui.js`, `public/packed.css` and `public/packed-proof.js` supply the interface and verification. Existing engine/server/client integration retains the other five games.

Double-click **START GAMES.cmd** or run `npm start`, then open http://localhost:3000. The game currently needs a persistent Node process. Rooms and scores are in memory and do not survive a server restart; no online deployment or durable persistence is included in this change. Public hosting must use the persistent backend described in README.md.

Run `npm test`, `npm run test:ui`, `npm run test:exhaustive`, and `npm run test:load`. Playwright uses port 3100; load checks use 3101 and control phase deadlines to run quickly. Run exhaustive/load checks after Playwright, which clears test-results at startup. Human sessions are still needed to assess fun, perceived fairness and the frequency of zero scores.
