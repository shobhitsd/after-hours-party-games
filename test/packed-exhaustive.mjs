import assert from 'node:assert/strict';
import {writeFile,mkdir} from 'node:fs/promises';
import {performance} from 'node:perf_hooks';
import {packedTemplates,packedPools} from '../packed-content.js';
import {roomPayout} from '../packed.js';

// Enumerate every occupancy vector, including abstentions, for every legal draw.
// This checks all outcome shapes, not every labelled-player permutation.
function* compositions(total,slots,prefix=[]){if(slots===1){yield [...prefix,total];return;}for(let n=0;n<=total;n++)yield*compositions(total-n,slots-1,[...prefix,n]);}
function* draws(ceilings,prefix=[]){if(prefix.length===ceilings.length){yield prefix;return;}for(let n=1;n<=ceilings[prefix.length];n++)yield*draws(ceilings,[...prefix,n]);}
const start=performance.now(),byPlayerCount=[];let scenarios=0,roomChecks=0;
for(const [key,ceilings]of Object.entries(packedTemplates)){
 const n=Number(key),k=ceilings.length,occupancies=[...compositions(n,k+1)];let checked=0;
 for(const caps of draws(ceilings))for(const occupancy of occupancies){
  let classic=0,soft=0;
  for(let i=0;i<k;i++){
   const count=occupancy[i],pool=packedPools[i],capacity=caps[i];
   // Integer quotient by repeated subtraction is independent of Math.floor.
   let quotient=0,left=pool;if(count>0&&count<=capacity)while(left>=count){quotient++;left-=count;}
   const result=roomPayout(pool,capacity,count),gentle=roomPayout(pool,capacity,count,true);
   if(result.each!==quotient||result.awarded!==quotient*count||result.lost+result.awarded!==pool||result.remainder!==(count>0&&count<=capacity?left:0))throw Error(`Classic payout mismatch ${n}/${i}/${capacity}/${count}`);
   const softEach=count===capacity+1?1:quotient;
   if(gentle.each!==softEach||gentle.awarded!==softEach*count)throw Error(`Soft Landing mismatch ${n}/${i}/${capacity}/${count}`);
   classic+=result.awarded;soft+=gentle.awarded;roomChecks+=2;
  }
  assert.ok(classic>=0&&classic<=packedPools.slice(0,k).reduce((a,b)=>a+b,0));assert.ok(soft>=classic);checked++;
 }
 scenarios+=checked;byPlayerCount.push({players:n,rooms:k,capacityDraws:ceilings.reduce((a,b)=>a*b,1),occupancies:occupancies.length,scenarios:checked});
}
const report={date:new Date().toISOString(),result:'passed',scenarios,scoringModeScenarios:scenarios*2,roomChecks,elapsedSeconds:+((performance.now()-start)/1000).toFixed(2),byPlayerCount,scope:'Every legal capacity vector and room occupancy vector, including missing picks. Classic and Soft Landing. No claims about fun or human strategies.'};
await mkdir(new URL('../test-results/',import.meta.url),{recursive:true});await writeFile(new URL('../test-results/packed-exhaustive.json',import.meta.url),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
