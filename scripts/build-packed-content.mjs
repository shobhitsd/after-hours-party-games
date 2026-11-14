// scripts/build-packed-content.mjs
import fs from 'fs';
import { questions as part1 } from './test-packed-curation.mjs';
import { questions21to40 as part2 } from './curate-and-verify-all.mjs';
import { questions41to60 as part3 } from './curate-and-verify-part3.mjs';

const allQuestions = [...part1, ...part2, ...part3];
console.log(`Total questions to write: ${allQuestions.length}`);

const header = `export const packedDefaults={packedRounds:8,packedRankSeconds:30,packedTalkSeconds:45,packedPickSeconds:20,packedAnonymous:false,packedSoftLanding:false,packedPack:'curated',packedCustom:[]};
export const packedTemplates={
 5:[2,2,2,2,2],6:[3,2,2,2,2],7:[4,3,2,2,2],8:[4,3,3,3,2],9:[4,3,3,2,2,2],10:[4,4,3,3,2,2]
};
export const packedPools=[12,10,8,6,6,6];
export const packedGame={name:'Packed House',min:5,max:10,rounds:8,color:'green',category:'Collective bluffing',duration:'12–20 min',tagline:'We built the rooms together. Who dares enter?',description:'Rank together. Make your own promises. Find a room with space to split the prize.',rules:[
 'Everyone privately ranks five options (six with 9–10 players). Combined rankings set fixed point pools: 12, 10, 8, then 6. Higher tiers have at least as high a seat ceiling.',
 'Discuss and bluff, then choose a room. You see its possible capacity, but the exact number stays hidden. Change your saved ranking or pick until the timer ends; your latest valid submission counts.',
 'If everyone fits, split the pool by the people who entered, rounded down. Too crowded means zero for everyone there. Missing picks take no seat and earn zero; unclaimed pools do not carry over.',
 'Reveal the seats, payouts, lost remainders and everyone’s rankings. Hidden draws were committed before rankings and are verified on your device. Most points wins; scoring in more rounds breaks a tie.',
 'Play 5–10 rounds (default 8; 6 recommended for 9–10 players). Late arrivals watch as spectators. Fewer than four connected players pauses the game for up to two minutes, then ends it with completed scores kept. Optional Soft Landing gives 1 point when a room is over capacity by exactly one.'
]};
export const packedQuestions = `;

const content = header + JSON.stringify(allQuestions, null, 1) + ';\n';
fs.writeFileSync('packed-content.js', content, 'utf8');
console.log('Successfully written packed-content.js!');
