/* PURE game logic: no document, DOM, timers, sound or animation. */
(function(root){
  const settings = (typeof module!=='undefined' && module.exports)
    ? require('./config.js') : root.UPDRAFT_CONFIG;

  const BANK = [
    {id:'octopus', topic:'THE LIVING WORLD', question:'Which remarkable animal has three hearts?',
      choices:['The octopus','The seahorse','The penguin'], correct:0,
      fact:'Two hearts pump blood to the gills. One takes care of the rest.', souvenir:'Three little heartbeats', icon:'♥', rarity:'common'},
    {id:'rain', topic:'THE EVERYDAY MAGICAL', question:'What do we call the earthy scent after rain?',
      choices:['Petrichor','Afterglow','Solstice'], correct:0,
      fact:'Petrichor is the lovely word for that just-rained smell.', souvenir:'The name of rain', icon:'☂', rarity:'uncommon'},
    {id:'ants', topic:'THE NATURAL WORLD', question:'Which continent has no native ants?',
      choices:['Europe','Antarctica','South America'], correct:1,
      fact:'Ants live nearly everywhere, but not in Antarctica.', souvenir:'The quiet continent', icon:'❄', rarity:'rare'},
    {id:'theremin', topic:'SOUND & WONDER', question:'Which instrument can be played without touching it?',
      choices:['Theremin','Bassoon','Harp'], correct:0,
      fact:'A theremin sings when your hands move through invisible electric fields.', souvenir:'Music in the air', icon:'♫', rarity:'uncommon'},
    {id:'ocean', topic:'THE BIG BLUE', question:'The deepest known point in the ocean lies in which ocean?',
      choices:['Indian','Atlantic','Pacific'], correct:2,
      fact:'Challenger Deep lies in the Mariana Trench of the Pacific Ocean.', souvenir:'The deepest blue', icon:'≈', rarity:'rare'},
    {id:'venus', topic:'OUR SOLAR SYSTEM', question:'On which planet is a day longer than its year?',
      choices:['Mercury','Venus','Mars'], correct:1,
      fact:'Venus turns so slowly that one rotation takes longer than one orbit.', souvenir:'A very long day', icon:'☼', rarity:'rare'},
    {id:'butterfly', topic:'THE LIVING WORLD', question:'What do butterflies taste with?',
      choices:['Their feet','Their wings','Their antennae'], correct:0,
      fact:'Taste sensors on their feet help butterflies find plants for their eggs.', souvenir:'A taste for flowers', icon:'✿', rarity:'common'},
    {id:'moon', topic:'ABOVE THE CLOUDS', question:'What causes the Moon to shine in our night sky?',
      choices:['Its own fire','Reflected sunlight','Glowing moon dust'], correct:1,
      fact:'Moonlight is sunlight arriving by a wonderfully roundabout route.', souvenir:'Borrowed light', icon:'☾', rarity:'common'},
    {id:'honey', topic:'THE EVERYDAY MAGICAL', question:'Which of these foods can stay edible for incredibly long periods if stored well?',
      choices:['Fresh bread','Honey','Soft cheese'], correct:1,
      fact:'Honey’s low moisture and acidity help it resist spoilage.', souvenir:'A golden time capsule', icon:'✧', rarity:'common'},
    {id:'flamingo', topic:'THE LIVING WORLD', question:'Why are flamingos famously pink?',
      choices:['Their diet','The sunlight','The temperature'], correct:0,
      fact:'Pigments in the algae and tiny animals they eat tint their feathers.', souvenir:'A borrowed blush', icon:'✿', rarity:'uncommon'},
    {id:'telescope', topic:'GREAT INVENTIONS', question:'What did Galileo famously improve to study the night sky?',
      choices:['The compass','The telescope','The printing press'], correct:1,
      fact:'His improved telescopes helped reveal the moons of Jupiter.', souvenir:'A closer look', icon:'✦', rarity:'uncommon'},
    {id:'whale', topic:'THE BIG BLUE', question:'Which animal has the largest heart of any living animal?',
      choices:['The elephant','The blue whale','The giraffe'], correct:1,
      fact:'A blue whale’s heart can weigh well over a hundred kilograms.', souvenir:'A giant heartbeat', icon:'♥', rarity:'rare'},
    {id:'bananas', topic:'ODDLY TRUE', question:'Botanically speaking, which of these is a berry?',
      choices:['Strawberry','Raspberry','Banana'], correct:2,
      fact:'Bananas count as botanical berries. Strawberries, surprisingly, do not.', souvenir:'The unexpected berry', icon:'❋', rarity:'uncommon'},
    {id:'cloud', topic:'UP IN THE AIR', question:'Which cloud type is most often associated with thunderstorms?',
      choices:['Cumulonimbus','Cirrus','Stratus'], correct:0,
      fact:'Cumulonimbus clouds can climb high into the atmosphere, carrying thunderstorms.', souvenir:'Thunderhead', icon:'☁', rarity:'rare'},
    {id:'light', topic:'SMALL WONDERS', question:'Which travels faster through a vacuum?',
      choices:['Sound','Light','They travel equally fast'], correct:1,
      fact:'Light crosses the distance from the Moon to Earth in roughly 1.3 seconds.', souvenir:'A flash of distance', icon:'✦', rarity:'common'},
    {id:'penguins', topic:'THE LIVING WORLD', question:'Where do emperor penguins live in the wild?',
      choices:['The Arctic','Antarctica','Iceland'], correct:1,
      fact:'Emperor penguins make their home on and around Antarctic sea ice.', souvenir:'The southern march', icon:'❄', rarity:'uncommon'},
      {id:'hummingbird', topic:'THE LIVING WORLD', question:'Which bird can fly backward as well as forward?',
      choices:['Hummingbird','Albatross','Ostrich'], correct:0,
      fact:'Hummingbirds rotate their wings in a figure-eight pattern to hover and fly backward.', souvenir:'A backward dance', icon:'✿', rarity:'uncommon'},
    {id:'saturn', topic:'OUR SOLAR SYSTEM', question:'Which planet is less dense than water, on average?',
      choices:['Earth','Saturn','Mercury'], correct:1,
      fact:'Saturn’s average density is lower than water’s, though no ocean could actually hold it.', souvenir:'A planet like a feather', icon:'◌', rarity:'rare'},
    {id:'coral', topic:'THE BIG BLUE', question:'A coral reef is built by colonies of what?',
      choices:['Animals','Rocks','Seaweed'], correct:0,
      fact:'Tiny coral polyps are animals. Many build limestone homes that become reefs.', souvenir:'A city of tiny builders', icon:'❋', rarity:'uncommon'},
    {id:'amber', topic:'EARTH’S OLD STORIES', question:'What was amber before it hardened over millions of years?',
      choices:['Tree resin','Sea salt','Volcanic glass'], correct:0,
      fact:'Amber begins as sticky tree resin. Sometimes it preserves ancient insects inside.', souvenir:'A golden time machine', icon:'✧', rarity:'rare'},
    {id:'fireflies', topic:'SMALL WONDERS', question:'What produces the glow of a firefly?',
      choices:['Reflected moonlight','A chemical reaction','Tiny electric sparks'], correct:1,
      fact:'A special light-making chemical reaction gives fireflies their glow.', souvenir:'A lantern with wings', icon:'✦', rarity:'uncommon'},
    {id:'ganymede', topic:'OUR SOLAR SYSTEM', question:'Which is the largest moon in our solar system?',
      choices:['Earth’s Moon','Titan','Ganymede'], correct:2,
      fact:'Jupiter’s moon Ganymede is even larger than the planet Mercury.', souvenir:'The giant moon', icon:'☾', rarity:'rare'},
    {id:'aurora', topic:'ABOVE THE CLOUDS', question:'What helps create the dancing lights of an aurora?',
      choices:['Charged particles','Passing clouds','Ocean tides'], correct:0,
      fact:'Charged particles excite gases high in the atmosphere, creating curtains of color.', souvenir:'The sky’s silk ribbons', icon:'✺', rarity:'uncommon'},
    {id:'axolotl', topic:'THE LIVING WORLD', question:'What can an axolotl famously regrow?',
      choices:['Its limbs','Its shell','Its feathers'], correct:0,
      fact:'Axolotls can regenerate lost limbs—and even repair some internal tissues.', souvenir:'A second beginning', icon:'✿', rarity:'rare'},
    {id:'morse', topic:'GREAT INVENTIONS', question:'What is the basic alphabet of Morse code made from?',
      choices:['Colors and shapes','Dots and dashes','Numbers and arrows'], correct:1,
      fact:'Short and long signals can send a message across great distances.', souvenir:'A message in dots', icon:'↝', rarity:'common'},
    {id:'compass', topic:'GREAT INVENTIONS', question:'What does a basic magnetic compass needle align with?',
      choices:['Earth’s magnetic field','The nearest mountain','The direction of the wind'], correct:0,
      fact:'A compass lines up with Earth’s magnetic field—not necessarily true north.', souvenir:'A pocket-sized north', icon:'✳', rarity:'common'},
    {id:'snowflake', topic:'THE NATURAL WORLD', question:'What symmetry is familiar in many snowflakes?',
      choices:['Fivefold','Sixfold','Eightfold'], correct:1,
      fact:'Water molecules in ice tend to arrange into six-sided crystal structures.', souvenir:'The six-sided secret', icon:'❄', rarity:'common'},
    {id:'kelp', topic:'THE BIG BLUE', question:'Giant kelp forests are made of what kind of organism?',
      choices:['Brown algae','Underwater moss','Coral animals'], correct:0,
      fact:'Giant kelp is brown algae that can form swaying underwater forests.', souvenir:'The forest beneath', icon:'≈', rarity:'uncommon'},
    {id:'redspot', topic:'OUR SOLAR SYSTEM', question:'What is Jupiter’s Great Red Spot?',
      choices:['A volcano','A giant storm','An icy crater'], correct:1,
      fact:'It is an enormous, long-lived storm swirling through Jupiter’s atmosphere.', souvenir:'The red storm', icon:'☼', rarity:'uncommon'},
    {id:'moonphases', topic:'ABOVE THE CLOUDS', question:'What changes to create the Moon’s phases?',
      choices:['How much sunlight we see on it','How quickly it spins','The Moon’s own light'], correct:0,
      fact:'We see different amounts of its sunlit half as the Moon travels around Earth.', souvenir:'The changing silver', icon:'☾', rarity:'common'},
    {id:'piano', topic:'SOUND & WONDER', question:'How many keys does a standard modern piano usually have?',
      choices:['61','76','88'], correct:2,
      fact:'Most modern full-size pianos have 88 keys, ranging from low bass to high treble.', souvenir:'Eighty-eight doors', icon:'♫', rarity:'common'},
    {id:'silkworm', topic:'THE LIVING WORLD', question:'Which creature makes the silk used in traditional silk cloth?',
      choices:['Silkworm caterpillar','Dragonfly','Ladybird'], correct:0,
      fact:'A silkworm spins a cocoon from one long strand of silk protein.', souvenir:'The spun cocoon', icon:'❋', rarity:'common'},
    {id:'marsblue', topic:'OUR SOLAR SYSTEM', question:'What color can sunsets near the Sun appear on Mars?',
      choices:['Blue','Green','Purple'], correct:0,
      fact:'Fine Martian dust scatters light so the area near the setting Sun can look bluish.', souvenir:'The blue sunset', icon:'☼', rarity:'rare'},
    {id:'glassfrog', topic:'THE LIVING WORLD', question:'What is unusual about the underside of a glass frog?',
      choices:['It is transparent','It grows feathers','It glows red'], correct:0,
      fact:'Some glass frogs have translucent skin that lets you see organs underneath.', souvenir:'The see-through secret', icon:'♥', rarity:'rare'},
    {id:'lichen', topic:'THE NATURAL WORLD', question:'Lichens are famous for being a partnership involving a fungus and what?',
      choices:['An alga or cyanobacterium','A tiny fish','A moss beetle'], correct:0,
      fact:'A fungus partners with a photosynthetic organism to make many lichens.', souvenir:'An unlikely friendship', icon:'✿', rarity:'rare'},
    {id:'echo', topic:'SOUND & WONDER', question:'Many bats find insects in the dark using which ability?',
      choices:['Echolocation','Bioluminescence','Magnetism'], correct:0,
      fact:'Some bats emit sounds and listen to their returning echoes to find prey.', souvenir:'A map made of sound', icon:'♫', rarity:'uncommon'},
    {id:'treerings', topic:'EARTH’S OLD STORIES', question:'What can tree rings often help scientists estimate?',
      choices:['A tree’s age','The tree’s species without a sample','Its exact height each year'], correct:0,
      fact:'In many trees, each annual growth ring records one year of growing.', souvenir:'The years in wood', icon:'◌', rarity:'common'},
    {id:'tides', topic:'THE BIG BLUE', question:'What has the strongest influence on Earth’s ocean tides?',
      choices:['The Moon’s gravity','Cloud shadows','Ocean salt'], correct:0,
      fact:'The Moon’s gravitational pull is the main driver of Earth’s regular tides.', souvenir:'The ocean’s slow breath', icon:'≈', rarity:'common'},
  ];
  function hashString(s) {
    let h = 2166136261;
    for(let i=0;i<s.length;i++){h^=s.charCodeAt(i); h=Math.imul(h,16777619);}
    return h>>>0;
  }
  function mulberry32(a) {return function(){let t=a+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;};}
  function dailySeed(date=new Date()) {
    // Local calendar date: two co-pilots on the same date get the same route.
    return [date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-');
  }
  function deckFor(seed) {
    const rand=mulberry32(hashString(String(seed))), shuffled=BANK.slice();
    for(let i=shuffled.length-1;i>0;i--){const j=Math.floor(rand()*(i+1));[shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]];}
    // A miniature dramatic arc: welcoming start, building curiosity, a rare finale.
    // Prefer a fresh topic per beat, falling back safely as the bank grows or shrinks.
    const story=['common','common','uncommon','uncommon','rare'];
    const usedTopics=new Set(),selected=[];
    for(const rarity of story.slice(0,settings.game.questionsPerFlight)){
      const picked=shuffled.find(q=>q.rarity===rarity&&!selected.includes(q)&&!usedTopics.has(q.topic))
        ||shuffled.find(q=>q.rarity===rarity&&!selected.includes(q))
        ||shuffled.find(q=>!selected.includes(q)&&!usedTopics.has(q.topic))
        ||shuffled.find(q=>!selected.includes(q));
      if(!picked)break;
      selected.push(picked);usedTopics.add(picked.topic);
    }
    return selected;
  }
  function getTierIndex(altitude) {
    let idx=0;for(let i=1;i<settings.sky.tiers.length;i++)if(altitude>=settings.sky.tiers[i].alt)idx=i;
    return idx;
  }
  function createGame(deck) { return {
    phase:'intro',deck:deck.slice(),index:0,altitude:0,peak:0,fuel:settings.game.maxFuel,
    correct:0,history:[],lastAnswer:null,
  }; }
  function start(game) {return game.phase==='intro'?{...game,phase:'playing'}:game;}
  function answer(game,choiceIndex) {
    if(game.phase!=='playing')return {game,event:null};
    const q=game.deck[game.index];
    if(!Number.isInteger(choiceIndex)||choiceIndex<0||choiceIndex>=q.choices.length)return {game,event:null};
    const hit=choiceIndex===q.correct;
    const altitude=Math.max(0,game.altitude+(hit?settings.game.altitudeGain[game.index]:-settings.game.wrongDropMeters));
    const fuel=Math.max(0,game.fuel-(hit?0:settings.game.wrongFuelCost));
    const fromTier=getTierIndex(game.altitude),toTier=getTierIndex(altitude);
    const event={kind:hit?'CORRECT_ANSWER':'WRONG_ANSWER',hit,question:q,chosen:choiceIndex,
      fromAltitude:game.altitude,toAltitude:altitude,fromTier,toTier,delta:altitude-game.altitude,
      fuelLost:game.fuel-fuel,rarity:q.rarity,finished:game.index===game.deck.length-1||fuel===0,
      landing:fuel===0?'OUT_OF_FUEL':(game.index===game.deck.length-1?'WIN_LANDING':null),
    };
    return {game:{...game,phase:'reaction',altitude,fuel,peak:Math.max(game.peak,altitude),
      correct:game.correct+(hit?1:0),lastAnswer:event,
      history:[...game.history,{id:q.id,question:q.question,hit,chosen:choiceIndex,answer:q.choices[q.correct],
        souvenir:q.souvenir,icon:q.icon,altitude}]},event};
  }
  function advance(game){
    if(game.phase!=='reaction')return game;
    const done=game.fuel===0||game.index>=game.deck.length-1;
    return {...game,phase:done?'end':'playing',index:done?game.index:game.index+1};
  }
  function debugSet(game,field,value){
    if(field==='fuel')return {...game,fuel:Math.min(settings.game.maxFuel,Math.max(0,Math.round(value)))};
    if(field==='altitude')return {...game,altitude:Math.max(0,Math.min(2000,Number(value))),peak:Math.max(game.peak,Number(value))};
    return game;
  }
  const api=Object.freeze({BANK,hashString,dailySeed,deckFor,getTierIndex,createGame,start,answer,advance,debugSet});
  root.UpdraftLogic=api;
  if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
