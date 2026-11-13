import { associations, borrowedSets, decoys, filler, pairSets, pairHints } from './data.js';

const normalize = value => String(value || '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
const words = value => normalize(value).split(' ').filter(Boolean);
const pick = items => items[Math.floor(Math.random()*items.length)];
const lexicon = new Map();
function relate(word, hints) {
  const name=normalize(word), terms=lexicon.get(name)||new Set(words(word));
  for(const hint of hints)for(const token of words(hint))terms.add(token);
  lexicon.set(name,terms);
}
for(const [clue,targets] of associations)for(const target of targets)relate(target,[clue]);
for(const set of borrowedSets)relate(set.target,set.clue);
for(const set of decoys)for(const word of [set.target,...set.decoys])relate(word,[set.clue]);
for(const [word,hint] of Object.entries(pairHints))relate(word,[hint]);
for(const word of filler)relate(word,[]);
function relevance(answer, clue) {
  const terms=lexicon.get(normalize(answer))||new Set(words(answer));
  return words(clue).reduce((score,word)=>score+(terms.has(word)?1:0),0);
}
function bestIndex(items, score) {
  const scores=items.map(score),max=Math.max(...scores);
  return pick(items.map((_,i)=>i).filter(i=>scores[i]===max));
}
const partnerWords = word => pairSets.flat().filter(pair=>pair.includes(word)).flat().filter(other=>other!==word);

// Bots get exactly the same filtered view as a browser. They cannot read other
// players' targets, votes, partner assignments, or unsubmitted choices.
export function chooseBotAction(v) {
  if(v.game==='signals'){
    if(v.stage==='clue'){
      const targets=Object.values(v.boards).map(b=>b.cards[b.target]);
      const options=associations.filter(([clue])=>!Object.values(v.boards).some(b=>b.cards.some(w=>normalize(w)===normalize(clue))));
      return options[bestIndex(options,([clue])=>targets.reduce((sum,target)=>sum+relevance(target,clue),0))][0];
    }
    return bestIndex(v.board,word=>relevance(word,v.clue));
  }
  if(v.game==='decoy'){
    if(v.stage==='clue')return decoys.find(set=>set.target===v.target)?.clue||'Connection';
    return bestIndex(v.stage==='sabotage'?v.hand:v.board,word=>relevance(word,v.clue));
  }
  if(v.game==='borrowed'){
    if(v.stage==='sabotage')return v.hand.map((word,i)=>({i,score:borrowedSets.filter(set=>set.clue.includes(word)).length})).sort((a,b)=>a.score-b.score||a.i-b.i).slice(0,3).map(x=>x.i);
    if(v.stage==='clue')return v.hand.map((word,i)=>({i,score:relevance(v.target,word)*10-borrowedSets.filter(set=>set.target!==v.target&&set.clue.includes(word)).length})).filter(x=>!v.removed.includes(x.i)).sort((a,b)=>b.score-a.score||a.i-b.i).slice(0,3).map(x=>x.i);
    return bestIndex(v.board,word=>relevance(word,v.clue.join(' ')));
  }
  if(v.game==='twins'){
    if(v.stage==='clue')return pairHints[v.word];
    const candidates=v.players.filter(p=>p.id!==v.me),partners=partnerWords(v.word);
    return candidates[bestIndex(candidates,p=>Math.max(0,...partners.map(word=>relevance(word,v.clues[p.id]))))].id;
  }
  if(v.game==='crowd'){
    const money=v.prompt.includes('₹');
    if(v.stage==='tune')return String(money?Math.round(5000+v.target*2500):Math.max(2,18-v.target*2));
    const number=Number((v.question.match(/[\d,]+/)||['10'])[0].replaceAll(',',''));
    const personality=1+v.players.findIndex(p=>p.id===v.me);
    const rewardingMoney=money&&!/spend|costing/i.test(v.question);
    return rewardingMoney?number>=personality*3000:money?number<=personality*1500:number<=personality*3;
  }
  if(v.game==='seat')return pick(v.destinations.flatMap((d,i)=>Array.from({length:d.safe?2:Math.min(4,d.capacity??d.capacityRange[0])},()=>i)));
  throw new Error('No bot action for this phase.');
}
