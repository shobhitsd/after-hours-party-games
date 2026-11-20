/* Updraft's adjustable creative controls. Nothing else should hard-code motion timing. */
(function(root){
  const config = Object.freeze({
    game: {
      maxFuel: 6, wrongFuelCost: 2, wrongDropMeters: 90, questionsPerFlight: 5,
      altitudeGain: [320, 360, 400, 440, 480],
    },
    motion: {
      correctMs: 1900, rareMs: 2550, wrongMs: 1750, tierMs: 1600,
      welcomeMs: 1200, waveMs: 1400, landingMs: 2550, altitudeMs: 1750, constellationMs: 2700, skipMinMs: 0,
      shakePx: 5, reducedMs: 120, debugTimeScale: 1,
      particles: {poolSize: 36, common: 16, rare: 28},
    },
    audio: {
      // WebAudio mix levels; keep them modest so the voice of the scene is never fatiguing.
      master: .72, quietScale: .37, crossfadeSeconds: .7, cueDuck: .44,
      motifEveryMs: 12400, windLoopSeconds: 2,
      // Each sky has a different acoustic fingerprint, rather than a louder version of one track.
      skies: [
        {subtitle:'A kettle of morning air',root:174.61,wind:.24,brightness:650,pulse:.18,shimmer:.10},
        {subtitle:'Soft clouds, folded like linen',root:196,wind:.37,brightness:900,pulse:.25,shimmer:.19},
        {subtitle:'Golden threads in the breeze',root:220,wind:.29,brightness:1250,pulse:.40,shimmer:.45},
        {subtitle:'The hush above everything',root:146.83,wind:.19,brightness:530,pulse:.13,shimmer:.63},
        {subtitle:'Small bells in the night orchard',root:164.81,wind:.12,brightness:980,pulse:.16,shimmer:.90}
      ],
      cues: {
        start:{steps:[0,4,7],seconds:.19,level:.067},
        correct:{steps:[0,4,7,12],seconds:.135,level:.085},
        rare:{steps:[0,7,12,16,19],seconds:.16,level:.075},
        wrong:{steps:[0,-2,-5],seconds:.22,level:.041},
        tier:{steps:[0,7,12,14],seconds:.23,level:.073},
        constellation:{steps:[0,4,7,12,16,19,24],seconds:.22,level:.070},
        wave:{steps:[0,4],seconds:.12,level:.065},
        landing:{steps:[7,4,0,-5],seconds:.25,level:.058}
      }
    },
    cinematography: {
      ribbonOpacity: .48, veilOpacity: .66, sunbeamOpacity: .74,
      cloudRushPx: 34, cloudDipPx: 17, kiteFloatSeconds: 6.8,
    },
    sky: {
      tiers: [
        {alt:0,   name:'First Light',    marker:'01', sky:['#f5c7a0','#fce4c6','#eed6d4'], cloud:1, stars:0},
        {alt:300, name:'Cloud Sea',      marker:'02', sky:['#bdcbee','#e1e8fa','#f7e9d5'], cloud:.95, stars:0},
        {alt:700, name:'Golden Current', marker:'03', sky:['#82b9dc','#f7d9a3','#f4d9bd'], cloud:.66, stars:.05},
        {alt:1100,name:'Blue Beyond',    marker:'04', sky:['#354e86','#849bc6','#cfbecc'], cloud:.24, stars:.8},
        {alt:1500,name:'Night Orchard',  marker:'05', sky:['#161c46','#3b4f82','#886f9b'], cloud:.03, stars:1},
      ],
    },
  });
  root.UPDRAFT_CONFIG = config;
  if(typeof module!=='undefined') module.exports=config;
})(typeof window!=='undefined'?window:globalThis);
