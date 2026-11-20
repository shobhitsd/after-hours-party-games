// ALL animation times are seconds; distances are CSS pixels and rotations are degrees.
export const CONFIG={
 speed:1, // 1.4 = faster, .75 = slower; presentation only.
 ease:{float:'sine.inOut',move:'power2.inOut',rise:'power3.out',fall:'power2.in',rebound:'back.out(1.5)',out:'power2.out',linear:'none'},
 durations:{correct:2,wrong:2.6,rare:2.4,sky:1.7,landing:2.1,celebrate:3.5,wave:1.2,consider:.85,ponder:1,ready:1.05,idle:1.7},
 beats:{anticipate:.12,launch:.18,impact:.43,rebound:.59,settle:.82,finish:1,portraitIn:.22,portraitHold:.72,portraitOut:.9,smile:.7,flame:.22,particles:.28},
 segments:{anticipate:.12,drop:.31,squash:.09,rebound:.16,recover:.41,zoomIn:.18,zoomOut:.32,burst:.35},
 idle:{float:2.8,rotation:3.6,scarf:1.6,cloud:12,light:8,blink:.12,blinkPause:4.5,gestureMinimum:6.5,gestureVariation:4.5,typingCooldown:2.5,lift:6,tilt:1.2},
 rise:{height:42,anticipation:8,flameScale:2.4,cloudNear:58,cloudFar:20},
 fall:{distance:78,rotation:8,deflateX:1.12,deflateY:.77,squashX:1.2,squashY:.68,basketSwing:11,flameScale:2.7,cloudTravel:115,trailCount:3,trailGap:.07,trailLife:.45,trailOpacity:.19},
 shake:{amplitude:5,step:.045,repeat:5},
 camera:{tenseZoom:1.055,riseZoom:1.025,followY:12},
 particles:{confetti:20,dust:12,celebrate:34,life:.85,stagger:.012,spread:100,lift:60,fall:85,colors:['#f6c86d','#e98d88','#85bbb5','#a49ad2','#fff3cb']},
 finale:{ascent:220,restY:-42,raysOpacity:.55,birdsX:80,sky:['#8ecce9','#cdeefa','#fff2c8']},
 responsive:{breakpoint:760,travel:.48,shake:.5,particles:.65},
 ui:{press:.24,letter:.46,letterStagger:.025,spark:.48,points:.85,error:.24,arrive:.28,wind:.9,delay:.12,cleanup:1.8,windStagger:.1,buttonScale:.94},
 // Flight-deck controls: 3D tilt, tile flips, card deals, counters and pointer parallax.
 deck:{perspective:900,tilePerspective:520,tilt:7,tiltSoft:1.6,tiltLift:14,tiltFollow:.35,tiltRelease:.55,flip:.62,flipLift:14,tileStagger:.035,enter:.46,rise:22,stagger:.055,pop:.42,count:.9,launch:.58,parallaxFollow:.7,
  parallax:[['.ud-hills',14],['.ud-sun',-9],['.ud-kite',22],['.ud-stars',-6],['.ud-scene-heading',4],['.ud-dialogue',6]]},
 acting:{nod:7,brow:5,arm:44,surpriseArm:68,eyes:1.14,pupil:3,wink:.28,winkAt:.45,cheek:.8},
 poses:{correct:[[0,'thinking'],[.18,'happy']],wrong:[[0,'awe'],[.59,'rueful'],[.82,'soft']],rare:[[0,'thinking'],[.22,'awe'],[.7,'happy']],landing:[[0,'soft'],[.7,'happy']]},
 maxQueue:2,
 skies:[
  {at:0,name:'First Light',colors:['#f4c9b0','#fce9d1','#e9d6ce']},
  {at:300,name:'Cloud Sea',colors:['#bbcff0','#e2eafa','#f8e7d5']},
  {at:800,name:'Golden Current',colors:['#9cc6e2','#f8e0af','#f2cfba']},
  {at:1500,name:'Blue Beyond',colors:['#3e5684','#a3b5cf','#dac5c7']},
  {at:2500,name:'Night Orchard',colors:['#222d51','#586b9a','#a194b6']}
 ],
 lines:{correct:'Oh, that’s lovely! Look what your curiosity can lift.',hit:'There it is! Another little piece of the sky, found together.',wrong:'Whoa! A little turbulence. We have got this, together.',rare:'Oh… wait. That is a wonderfully unexpected discovery.',sky:'Look up for a moment. A whole new sky is opening.',solved:'You found it! Welcome to our little patch of sunshine.',landing:'Some journeys are for wondering. I’m glad you came along.',welcome:'Well, hello there. Shall we see what the sky is hiding?',wave:'A wave for me? Right back at you, co-pilot.',hint:'Psst… a little clue, just between the two of us.'}
};
export const CINEMA=CONFIG;
export function skyForAltitude(altitude){const safe=Number.isFinite(altitude)?Math.max(0,altitude):0;return Math.max(0,CONFIG.skies.findLastIndex(s=>safe>=s.at));}
