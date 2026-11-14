export const loneDefaults = {loneRankSeconds:30,loneTalkSeconds:45,lonePickSeconds:45,loneSpySeconds:10,loneUnderdogChance:50};
export const loneGame = {
 name:'Trust Issues',min:4,max:8,rounds:0,category:'Trust & bluff',color:'purple',duration:'15–25 min',
 tagline:'Pick what nobody else picks. Trust the Ranker, or don’t.',
 description:'Secret rankings. Public bluffs. Find a valuable option all to yourself.',
 rules:[
  'Best with 5–8 players; 4 also works. A surprise Ranker orders the options in private. Everyone, including the Ranker, picks. Only unique picks earn their option value; the Ranker’s value is halved, rounded up.',
  'Discuss and bluff. The Ranker can record a “ranked first” claim and a message. Use your one Spy Card before locking a pick to peek after everyone else locks. Spy targets stay private unless you reveal them; spy-on-spy refunds both cards.',
  'Unique streaks give ×1, ×1.5, then ×2. A sole unique non-Ranker gets ×2; these multipliers together cap at ×2. Hidden Underdog adds 2. The Ranker earns 1 per collided option, capped at 2. Half-points are kept.',
  'A dead round (no unique non-Ranker) adds 3 to the Jackpot, capped at 6. The next highest-value unique non-Ranker wins it. One secret Reverse Round flips values. The final round adds two options and doubles base values.',
  'Play one round per player. An unpaid final Jackpot goes to last place, split and rounded down on a tie. Most points wins; most unique picks breaks a tie. The Ranker never repeats consecutively or ranks more than twice. Timed-out rankings and picks are random.'
 ]
};
export { loneQuestions } from './lone-scenarios.js';

