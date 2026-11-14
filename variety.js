import {packedDefaults} from './packed-content.js';
// Hand-authored packs keep all base answers and sabotage hands distinct.
export const themedBoards = {
 Penguin:['Puffin','Albatross','Seagull','Pelican','Cormorant','Gannet','Petrel'],
 Airport:['Station','Harbour','Terminal','Hangar','Helipad','Airfield','Spaceport'],
 Diamond:['Ruby','Sapphire','Emerald','Opal','Pearl','Topaz','Amethyst'],
 Library:['Archive','Museum','Classroom','Reading room','University','Gallery','Newsroom'],
 Volcano:['Geyser','Canyon','Earthquake','Hot spring','Cliff','Valley','Landslide'],
 Pirate:['Sailor','Captain','Navigator','Smuggler','Explorer','Admiral','Buccaneer'],
 Bee:['Hornet','Butterfly','Moth','Ant','Beetle','Dragonfly','Wasp'],
 Astronaut:['Astronomer','Cosmonaut','Engineer','Scientist','Explorer','Navigator','Pilot'],
 Camera:['Telescope','Binoculars','Microscope','Projector','Scanner','Periscope','Camcorder'],
 Guitar:['Ukulele','Violin','Banjo','Sitar','Harp','Cello','Mandolin'],
 Chocolate:['Caramel','Toffee','Fudge','Marzipan','Nougat','Truffle','Praline'],
 Compass:['Map','GPS','Sextant','Sundial','Altimeter','Radar','Gyroscope']
};
export const extraDecoys = [
 {target:'Camera',clue:'Snapshot',decoys:['Photo','Lens','Selfie','Portrait','Shutter','Flash','Film','Tripod']},
 {target:'Guitar',clue:'Strum',decoys:['Strings','Chord','Plectrum','Acoustic','Musician','Concert','Band','Pick']},
 {target:'Chocolate',clue:'Cocoa',decoys:['Brownie','Cookie','Cake','Cacao','Mocha','Hot drink','Dessert','Sweet']},
 {target:'Compass',clue:'North',decoys:['Pole','Magnet','Direction','Needle','Arctic','Navigation','Bearing','Explorer']}
];
export const extraAssociations = [
 ['Fire',['Dragon','Candle','Volcano'],['Tiger','Camel','Dolphin','Zebra','Panda','Lamp','Torch','Lantern','Mirror','Bell','Glacier','Canyon','Valley','Forest','Desert']],
 ['Paper',['Book','Kite','Ticket'],['Radio','Tablet','Canvas','Keyboard','Camera','Ball','Doll','Drum','Puzzle','Whistle','Coin','Key','Badge','Ring','Stamp']],
 ['Water',['River','Shower','Fountain'],['Road','Trail','Tunnel','Bridge','Railway','Oven','Sofa','Desk','Clock','Wardrobe','Statue','Bench','Gate','Swing','Pavilion']],
 ['Quiet',['Library','Mouse','Snow'],['Market','Stadium','Airport','Factory','Festival','Tiger','Rooster','Parrot','Lion','Donkey','Thunder','Rain','Hail','Wind','Storm']],
 ['Fast',['Cheetah','Rocket','Lightning'],['Tortoise','Snail','Sloth','Koala','Panda','Bicycle','Tractor','Canoe','Balloon','Caravan','Fog','Drizzle','Snow','Frost','Cloud']],
 ['Home',['Nest','Key','Family'],['Cave','Den','Hive','Burrow','Web','Coin','Button','Ribbon','Marble','Token','Choir','Crew','Class','Band','Team']],
 ['Space',['Rocket','Planet','Astronaut'],['Train','Taxi','Boat','Bike','Tram','Cloud','Mountain','Island','Lake','Valley','Chef','Farmer','Dentist','Tailor','Baker']],
 ['Gold',['Medal','Treasure','Sun'],['Ribbon','Badge','Trophy','Certificate','Cup','Letter','Diary','Map','Puzzle','Clue','Moon','Cloud','Rain','Rainbow','Fog']],
 ['Garden',['Rose','Butterfly','Watering can'],['Pine','Moss','Fern','Oak','Reed','Moth','Beetle','Ant','Wasp','Cricket','Kettle','Jug','Bottle','Bucket','Pitcher']],
 ['Travel',['Passport','Suitcase','Train'],['Diary','Novel','Menu','Receipt','Notebook','Basket','Box','Drawer','Shelf','Cupboard','Tractor','Crane','Excavator','Forklift','Plough']],
 ['Winter',['Snowman','Scarf','Ski'],['Sandcastle','Statue','Fountain','Tower','Bridge','Cap','Belt','Sandal','Vest','Shorts','Surfboard','Skateboard','Bicycle','Scooter','Canoe']],
 ['Dream',['Pillow','Unicorn','Moon'],['Cushion','Blanket','Curtain','Carpet','Towel','Horse','Zebra','Camel','Deer','Goat','Sun','Cloud','Rainbow','Wind','Rain']]
];

export const choicePacks = {
 places:{name:'Places',question:'Where would you go?',rounds:[
  [['Rooftop party','🌆'],['Beach house','🏝️'],['Arcade','🕹️'],['Home sweet home','🏡']],
  [['Space lounge','🪐'],['Pool party','🦩'],['Night market','🏮'],['Movie night at home','🍿']],
  [['Backstage','🎸'],['Karaoke club','🎤'],['Pizza place','🍕'],['Cozy sofa','🛋️']],
  [['Private island','🏖️'],['Cabin getaway','🏕️'],['Bowling alley','🎳'],['Reading nook','📚']],
  [['Penthouse','🥂'],['Roller disco','🛼'],['Ice cream shop','🍦'],['Pajama party','🌙']],
  [['The afterparty','🪩'],['Festival','🎪'],['Game café','🎲'],['Breakfast at home','🥞']]
 ]},
 sports:{name:'Sports',question:'Which sport would you choose?',rounds:[
  [['Cricket','🏏'],['Football','⚽'],['Badminton','🏸'],['Just watch','📺']],
  [['Tennis','🎾'],['Basketball','🏀'],['Table tennis','🏓'],['Cheer everyone on','👏']],
  [['Surfing','🏄'],['Swimming','🏊'],['Kayaking','🛶'],['Relax by the water','🏖️']],
  [['Skiing','⛷️'],['Snowboarding','🏂'],['Ice skating','⛸️'],['Hot chocolate break','☕']],
  [['Climbing','🧗'],['Cycling','🚴'],['Running','🏃'],['A gentle stroll','🚶']],
  [['Golf','⛳'],['Bowling','🎳'],['Volleyball','🏐'],['Keep the score','📝']]
 ]},
 shows:{name:'Series',question:'Which series would you choose?',rounds:[
  [['Stranger Things','🔦'],['Friends','☕'],['The Office','📎'],['Browse without choosing','📺']],
  [['Breaking Bad','🧪'],['Sherlock','🔎'],['Dark','🕰️'],['Rewatch a favourite','🛋️']],
  [['Panchayat','🌳'],['Gullak','🏡'],['Kota Factory','📚'],['Watch short clips','📱']],
  [['Brooklyn Nine-Nine','🚓'],['Modern Family','👨‍👩‍👧'],['Ted Lasso','⚽'],['Let someone else pick','🎲']],
  [['One Piece','🏴‍☠️'],['Naruto','🍥'],['Spy x Family','🕵️'],['Read instead','📖']],
  [['The Crown','👑'],['Wednesday','🖤'],['The Last of Us','🌿'],['Early bedtime','🌙']]
 ]},
 food:{name:'Food',question:'What would you order?',rounds:[
  [['Biryani','🍛'],['Pizza','🍕'],['Sushi','🍣'],['Home cooking','🍽️']],
  [['Dosa','🥞'],['Chole bhature','🫓'],['Poha','🍚'],['Toast and tea','☕']],
  [['Momos','🥟'],['Pani puri','🥣'],['Pav bhaji','🍞'],['Bring your own snack','🥜']],
  [['Tacos','🌮'],['Ramen','🍜'],['Pasta','🍝'],['Simple sandwich','🥪']],
  [['Cheesecake','🍰'],['Gulab jamun','🍯'],['Ice cream','🍦'],['A piece of fruit','🍎']],
  [['Filter coffee','☕'],['Bubble tea','🧋'],['Mango shake','🥭'],['A glass of water','💧']]
 ]},
 plans:{name:'Weekend plans',question:'What would you choose for the weekend?',rounds:[
  [['Concert','🎵'],['Escape room','🗝️'],['Café catch-up','☕'],['Take a nap','😴']],
  [['Road trip','🚙'],['Movie marathon','🎬'],['Board games','🎲'],['A quiet day','🌿']],
  [['Pottery workshop','🏺'],['Dance class','💃'],['Cooking together','🥘'],['Do nothing proudly','🛋️']],
  [['Camping','⛺'],['City exploring','🗺️'],['Picnic','🧺'],['Stay in','🏡']],
  [['Theme park','🎢'],['Art gallery','🖼️'],['Bookshop','📚'],['Window shopping','🪟']],
  [['Game tournament','🎮'],['Photography walk','📷'],['Gardening','🪴'],['Sleep in','🛌']]
 ]},
 powers:{name:'Superpowers',question:'Which power would you choose?',rounds:[
  [['Teleportation','🌀'],['Invisibility','👻'],['Flight','🪽'],['Stay human','🙂']],
  [['Time travel','⏳'],['Mind reading','🧠'],['Super strength','💪'],['Good intuition','💡']],
  [['Speak every language','🌍'],['Talk to animals','🐾'],['Breathe underwater','🐠'],['Learn at your own pace','📖']],
  [['Instant healing','💚'],['Control the weather','🌦️'],['Move things with your mind','✨'],['A reliable umbrella','☂️']],
  [['Perfect memory','🧩'],['Never need sleep','⚡'],['Create any food','🍱'],['A good routine','🗓️']],
  [['Become tiny','🐜'],['Change your appearance','🎭'],['See the future','🔮'],['Enjoy the surprise','🎁']]
 ]}
};
export const defaultOptions = {signalCards:9,...packedDefaults};
