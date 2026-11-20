/* Chapter III · Miri's acting notes. Pure presentation data: it never changes game rules. */
(function(root){
  'use strict';
  const directions=Object.freeze({
    correct:Object.freeze({caption:'AND THE WORLD LIFTS WITH YOU',shortCaption:'WE RISE TOGETHER',pose:'elated'}),
    rare:Object.freeze({caption:'SOME WONDERS ASK US TO LOOK CLOSER',shortCaption:'A RARE WONDER',pose:'astonished'}),
    wrong:Object.freeze({caption:'A LITTLE DETOUR. STILL TOGETHER.',shortCaption:'A GENTLE DETOUR',pose:'gentle'}),
    tier:Object.freeze({caption:'THE SKY OPENS ANOTHER DOOR',shortCaption:'A NEW SKY',pose:'wonder'}),
    landing:Object.freeze({caption:'THE GROUND IS KIND TO EXPLORERS',shortCaption:'HOME TOGETHER',pose:'home'}),
    constellation:Object.freeze({caption:'WE LEFT A SIGN AMONG THE STARS',shortCaption:'OUR SKY WRITING',pose:'starstruck'}),
    wave:Object.freeze({caption:'YOUR CO-PILOT WAVES BACK',shortCaption:'MIRI WAVES BACK',pose:'hello'}),
  });
  function directionFor(kind){return directions[kind]||directions.wave;}
  function finalNote(correct,answered,total){
    if(correct===total)return '“Do you think the stars will remember us? I rather hope so.”';
    if(correct===0)return '“A good journey isn’t one without detours. It’s one we made together.”';
    if(answered<total)return '“The wind chose a shorter story today. I’m glad you were here for it.”';
    if(correct>=total-1)return '“We were only one small breeze away from the stars. I’d fly with you again.”';
    return '“Some skies are for climbing. Others are for learning the shape of clouds.”';
  }
  root.UpdraftActing={directionFor,finalNote};
  if(typeof module!=='undefined')module.exports={directionFor,finalNote};
})(typeof window!=='undefined'?window:globalThis);
