// The single definition of Updraft scoring. Pure functions and constants only: imported by the
// server engine (authoritative), the offline tutorial and the browser UI, so the three can
// never drift apart. Nothing here is secret and nothing here trusts the browser's clock.
export const RULES=Object.freeze({
 fuel:6,rounds:5,guesses:3,missCost:1,wrongCost:2,
 tiers:Object.freeze({Common:5,Uncommon:10,Rare:20,'Deep cut':40}),
 hit:5, // each launched letter that is in the hidden answer
 quick:Object.freeze([[10,10],[20,6],[30,3]]), // answered within N seconds of the prompt appearing -> bonus
 solve:100,perFuel:20,perRound:60,clean:25,
 swift:60,swiftFullSeconds:60,swiftZeroSeconds:300, // active play time; fades linearly between the two
 idleCapMs:90000, // a pause between two moves never counts as more than this much active time
 hintCosts:Object.freeze([1,2]), // 1st hint: a written clue. 2nd hint: one revealed letter.
 maxScore:600
});
export const quickBonus=ms=>{if(!Number.isFinite(ms)||ms<0)return 0;for(const [seconds,points] of RULES.quick)if(ms<=seconds*1000)return points;return 0;};
export const quickWindowMs=RULES.quick.at(-1)[0]*1000;
export function swiftBonus(activeMs){
 if(!Number.isFinite(activeMs))return 0;const s=Math.max(0,activeMs)/1000;
 if(s<=RULES.swiftFullSeconds)return RULES.swift;if(s>=RULES.swiftZeroSeconds)return 0;
 return Math.round(RULES.swift*(RULES.swiftZeroSeconds-s)/(RULES.swiftZeroSeconds-RULES.swiftFullSeconds));
}
// The whole solve bonus, itemised. `timed:false` (the tutorial) awards no swift bonus.
export function solveParts({air,rounds,wrong,activeMs,timed=true}){
 const parts={base:RULES.solve,fuel:RULES.perFuel*air,rounds:RULES.perRound*(RULES.rounds-rounds),swift:timed?swiftBonus(activeMs):0,clean:wrong?0:RULES.clean};
 return {...parts,total:parts.base+parts.fuel+parts.rounds+parts.swift+parts.clean};
}
const TITLES=['Grounded, for now','Curious Drifter','Steady Navigator','Cloud Captain','Jetstream Pilot','Aurora Ace'];
export function rating(status,score){
 const stars=status==='solved'?2+(score>=300)+(score>=400)+(score>=500):score>=50?1:0;
 return {stars,title:TITLES[stars]};
}
export const RANKS=Object.freeze([[0,'Fledgling'],[300,'Sky Cadet'],[1000,'Cloud Hopper'],[2500,'Thermal Rider'],[5000,'Jetstream Ace'],[10000,'Stratonaut'],[20000,'Aurora Legend']]);
export function pilotRank(lifetime){
 const points=Math.max(0,Number(lifetime)||0),level=RANKS.findLastIndex(([floor])=>points>=floor),next=RANKS[level+1]||null,floor=RANKS[level][0];
 return {level:level+1,name:RANKS[level][1],points,nextName:next?.[1]||null,nextAt:next?.[0]||null,progress:next?Math.min(1,(points-floor)/(next[0]-floor)):1};
}
