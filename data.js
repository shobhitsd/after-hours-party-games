import { extraAssociations, extraDecoys, themedBoards } from './variety.js';
import {packedGame} from './packed-content.js';
export const games = {
  packed:packedGame,
  signals: { name: 'Signal Bridge', min: 4, max: 8, rounds: 5, category: 'Word association', tagline: 'One clue. Different minds.', description: 'Send one word across the room. Can everyone find their own connection?', color: 'purple', duration: '8–12 min', rules: ['One player sees a different board of 6, 9, or 12 cards for every receiver, with a secret target highlighted.', 'The signal sender gives one word. Everyone else privately picks a card from their own board.', 'Earn one shared point per correct answer, plus two when everyone connects. Play five rounds, rotating the sender.'] },
  decoy: { name: 'Decoy Department', min: 5, max: 8, rounds: 0, category: 'Creative sabotage', tagline: 'Good clues. Bad intentions.', description: 'Slip in a convincing decoy and lead your friends delightfully astray.', color: 'orange', duration: '10–15 min', rules: ['The guide sees a secret target on an eight-word board of related answers and gives a one-word clue.', 'Two saboteurs each choose one extra word from a private hand. The board is shuffled with their decoys.', 'Each correct guess earns the guesser and guide a point. Each decoy pick earns its saboteur two. Everyone gets one turn as guide.'] },
  crowd: { name: 'Crowd Control', min: 4, max: 8, rounds: 0, category: 'Social prediction', tagline: 'Know your people. Maybe.', description: 'Craft a dilemma that splits the room exactly the way you want.', color: 'pink', duration: '8–12 min', rules: ['The question setter gets a secret target number of yes votes and a prompt with a blank.', 'Fill the blank to persuade exactly that many people. Everyone else votes yes or no privately.', 'An exact hit earns three points; one vote away earns one. Everyone gets one turn as setter.'] },
  twins: { name: 'Almost Twins', min: 6, max: 8, rounds: 5, category: 'Friendly deduction', tagline: 'Find your kind of weird.', description: 'Someone has the other half of your secret pair. Follow the clues.', color: 'blue', duration: '8–12 min', rules: ['Play with six or eight people. Everyone receives a secret word with a related partner word somewhere in the room.', 'Give a short clue about your word without saying it. Read everyone’s clues, then privately choose your partner.', 'If you both choose each other, you each earn two points. New pairs are dealt for five rounds; nobody is eliminated.'] },
  borrowed: { name: 'Borrowed Words', min: 4, max: 8, rounds: 0, category: 'Team wordplay', tagline: 'Their words. Your problem.', description: 'Your rivals take away your best words. Make the leftovers count.', color: 'yellow', duration: '10–15 min', rules: ['Split into two equal teams. Each team’s clue-giver sees a secret target and twelve word cards.', 'The opposing clue-giver removes three cards without seeing the target. Arrange up to three remaining cards as a clue; one redraw is available before choosing.', 'Teammates vote on a shared answer board. A correct team answer earns everyone on that team one point. Tied votes use the leftmost answer. Everyone gets one turn as clue-giver.'] }
};

export const associations = [
  ['Shine', ['Lighthouse','Diamond','Celebrity'], ['Hospital','Airport','School','Bakery','Museum','Blanket','Bottle','Key','Spoon','Clock','Chef','Pilot','Farmer','Dentist','Driver']],
  ['Cold', ['Iceberg','Penguin','Winter'], ['Volcano','Forest','Desert','River','Mountain','Parrot','Lion','Dog','Horse','Bee','Summer','Autumn','Spring','Morning','Sunset']],
  ['Fly', ['Airplane','Butterfly','Kite'], ['Train','Bus','Boat','Bicycle','Car','Elephant','Ant','Shark','Snail','Snake','Ball','Drum','Book','Puzzle','Doll']],
  ['Sweet', ['Honey','Cake','Candy'], ['Salt','Pepper','Rice','Flour','Oil','Bread','Soup','Salad','Cheese','Pasta','Chalk','Coin','Ribbon','Stone','Glass']],
  ['Night', ['Moon','Owl','Dream'], ['Sun','Cloud','Rainbow','Wind','Rain','Eagle','Sparrow','Duck','Swan','Hen','Lunch','Work','Picnic','Race','School']],
  ['Ocean', ['Whale','Anchor','Coral'], ['Fox','Rabbit','Bear','Deer','Wolf','Wheel','Wing','Rail','Saddle','Engine','Rose','Cactus','Oak','Moss','Fern']],
  ['Music', ['Piano','Concert','Singer'], ['Desk','Lamp','Sofa','Shelf','Mirror','Market','Library','Station','Airport','Farm','Doctor','Baker','Judge','Painter','Plumber']],
  ['Royal', ['Crown','Castle','Queen'], ['Hat','Scarf','Boot','Glove','Shirt','Cabin','Tent','Garage','Flat','Cottage','Teacher','Nurse','Actor','Cook','Athlete']],
  ['Time', ['Clock','Calendar','Hourglass'], ['Radio','Camera','Phone','Screen','Speaker','Map','Letter','Novel','Menu','Poster','Compass','Telescope','Scale','Ruler','Magnet']],
  ['Green', ['Leaf','Emerald','Broccoli'], ['Petal','Root','Bark','Seed','Thorn','Ruby','Pearl','Gold','Silver','Copper','Carrot','Onion','Potato','Tomato','Beet']],
  ['Magic', ['Wand','Wizard','Dragon'], ['Pencil','Brush','Fork','Needle','Hammer','Knight','Sailor','Miner','Tailor','Guard','Tiger','Camel','Dolphin','Zebra','Panda']],
  ['Round', ['Ball','Planet','Pizza'], ['Bat','Net','Goal','Whistle','Ski','Comet','Meteor','Galaxy','Rocket','Satellite','Sandwich','Toast','Noodle','Baguette','Waffle']],
  ...extraAssociations
];

export const decoys = [
  { target:'Penguin', clue:'Antarctica', decoys:['Iceberg','Seal','Snow','Glacier','Polar bear','Igloo','Walrus','Frost'] },
  { target:'Airport', clue:'Flight', decoys:['Bird','Pilot','Sky','Runway','Helicopter','Wing','Rocket','Cloud'] },
  { target:'Diamond', clue:'Sparkle', decoys:['Star','Glitter','Crystal','Gold','Disco','Sequin','Snowflake','Firework'] },
  { target:'Library', clue:'Books', decoys:['Bookshop','School','Shelf','Novel','Study','Author','Page','Paper'] },
  { target:'Volcano', clue:'Lava', decoys:['Magma','Fire','Crater','Mountain','Ash','Eruption','Furnace','Dragon'] },
  { target:'Pirate', clue:'Treasure', decoys:['Gold','Chest','Island','Map','Jewel','Cave','Ship','Coin'] },
  { target:'Bee', clue:'Honey', decoys:['Hive','Flower','Nectar','Bear','Syrup','Comb','Wax','Sugar'] },
  { target:'Astronaut', clue:'Space', decoys:['Rocket','Planet','Moon','Satellite','Alien','Star','Comet','Galaxy'] },
  ...extraDecoys
].map(set=>({...set,related:themedBoards[set.target]}));
export const filler = ['Umbrella','Guitar','Bicycle','Candle','Socks','Camera','Lemon','Bridge','Carpet','Clock','Spoon','Window','Basket','Pillow','Violin','Bench','Kettle','Rainbow','Pumpkin','Tent','Button','Ladder','Peacock','Suitcase'];

export const prompts = [
 ['Would you spend a night alone in a supposedly haunted hotel for ₹___?','10000'],
 ['Would you give up coffee and tea for ___ days?','14'],
 ['Would you travel ___ hours to see your favourite musician?','8'],
 ['Would you go without your phone for a week for ₹___?','20000'],
 ['Would you eat the same dinner for ___ days?','20'],
 ['Would you wake up at ___ AM every day for a month?','5'],
 ['Would you sing solo in front of ___ strangers?','50'],
 ['Would you walk ___ kilometres for the best meal of your life?','12'],
 ['Would you live without streaming services for ___ months?','6'],
 ['Would you spend ₹___ on a surprise dinner menu?','3000'],
 ['Would you queue ___ hours for a free new phone?','5'],
 ['Would you move to another country for ___ years?','3'],
 ['Would you let a friend choose your clothes for ___ weeks?','4'],
 ['Would you camp without electricity for ___ nights?','5'],
 ['Would you learn a dance routine and perform it for ₹___?','5000'],
 ['Would you eat no sweets for ___ months?','3'],
 ['Would you take a ___ hour bus ride instead of flying to save money?','16'],
 ['Would you spend ₹___ on a hobby you have never tried?','4000'],
 ['Would you go to a party where you know nobody for ___ hours?','3'],
 ['Would you cook every meal at home for ___ weeks?','8'],
 ['Would you swap bedrooms with a friend for ___ days?','7'],
 ['Would you keep a plant alive for ___ years?','5'],
 ['Would you walk up ___ flights of stairs every morning?','12'],
 ['Would you spend ₹___ to try indoor skydiving?','8000'],
 ['Would you watch a ___ hour movie without an interval?','4'],
 ['Would you wear the same colour every day for ___ months?','6'],
 ['Would you enter a talent show with ___ days to prepare?','3'],
 ['Would you go to bed at ___ PM for an entire month?','9'],
 ['Would you volunteer ___ hours of your weekend each month?','8'],
 ['Would you spend ₹___ on a beautifully made board game?','5000'],
 ['Would you listen only to one album for ___ weeks?','2'],
 ['Would you take ___ dance lessons with strangers?','10'],
 ['Would you give up online shopping for ___ months?','6'],
 ['Would you read ___ books in one month?','5'],
 ['Would you learn to juggle for ___ minutes every day?','20'],
 ['Would you host dinner for ___ people by yourself?','10'],
 ['Would you go on a mystery weekend trip costing ₹___?','15000'],
 ['Would you share a holiday house with ___ friends?','12'],
 ['Would you spend ___ days on a train holiday?','7'],
 ['Would you enter a costume contest for a ₹___ prize?','2000']
];

export const pairSets = [
 [['Coffee','Tea'],['Moon','Sun'],['Train','Bus'],['Cat','Dog']],
 [['Pencil','Pen'],['Ocean','Lake'],['Violin','Guitar'],['Bread','Toast']],
 [['Summer','Winter'],['King','Queen'],['Salt','Pepper'],['Film','Book']],
 [['Thunder','Lightning'],['Shoes','Socks'],['Honey','Sugar'],['Mountain','Hill']],
 [['Butterfly','Moth'],['River','Stream'],['Sofa','Armchair'],['Cake','Cupcake']],
 [['Apple','Pear'],['Knife','Fork'],['Day','Night'],['Bicycle','Scooter']],
 [['Painter','Sculptor'],['Desert','Beach'],['Jacket','Coat'],['Piano','Organ']],
 [['Map','Compass'],['Rain','Snow'],['Wallet','Purse'],['Cricket','Baseball']]
];
export const pairHints = {
 Coffee:'morning',Tea:'leaves',Moon:'craters',Sun:'warmth',Train:'tracks',Bus:'commute',Cat:'purr',Dog:'fetch',
 Pencil:'eraser',Pen:'ink',Ocean:'tides',Lake:'still water',Violin:'bow',Guitar:'strum',Bread:'loaf',Toast:'crunch',
 Summer:'sunscreen',Winter:'scarf',King:'crown',Queen:'throne',Salt:'seasoning',Pepper:'sneeze',Film:'screen',Book:'chapters',
 Thunder:'rumble',Lightning:'flash',Shoes:'laces',Socks:'ankles',Honey:'hive',Sugar:'sweet crystals',Mountain:'summit',Hill:'gentle climb',
 Butterfly:'colourful wings',Moth:'porch light',River:'current',Stream:'trickle',Sofa:'living room',Armchair:'one comfy seat',Cake:'candles',Cupcake:'icing swirl',
 Apple:'orchard',Pear:'narrow top',Knife:'slice',Fork:'prongs',Day:'bright hours',Night:'stars',Bicycle:'pedals',Scooter:'handlebars',
 Painter:'canvas',Sculptor:'marble',Desert:'dunes',Beach:'waves',Jacket:'zipper',Coat:'over layers',Piano:'keys',Organ:'pipes',
 Map:'directions',Compass:'north',Rain:'umbrella',Snow:'flakes',Wallet:'banknotes',Purse:'handbag',Cricket:'wickets',Baseball:'home run'
};
export const borrowedSets = [
 { target:'Airport', clue:['Travel','Sky','Queue','Holiday','Metal','Door','Bird','Late','Family','Cold','Paper','Night'] },
 { target:'Library', clue:['Quiet','Book','Story','Shelf','Paper','Desk','Old','School','Mind','Page','Dust','Room'] },
 { target:'Pizza', clue:['Cheese','Round','Hot','Tomato','Slice','Party','Bread','Box','Red','Oven','Share','Night'] },
 { target:'Beach', clue:['Sand','Sea','Wave','Sun','Holiday','Warm','Shell','Blue','Towel','Salt','Foot','Wind'] },
 { target:'Cinema', clue:['Screen','Dark','Popcorn','Story','Seat','Ticket','Sound','Night','Star','Watch','Friend','Big'] },
 { target:'Hospital', clue:['Doctor','White','Bed','Care','Sick','Help','Clean','Wait','Light','Night','Room','Quiet'] },
 { target:'Birthday', clue:['Cake','Gift','Candle','Year','Sing','Friend','Party','Wish','Age','Sweet','Paper','Happy'] },
 { target:'Camping', clue:['Tent','Fire','Forest','Night','Star','Outside','Cold','Bag','Walk','Ground','Friend','Food'] },
 { target:'Museum', clue:['Art','Old','History','Quiet','Look','Glass','Room','Paint','Bone','School','Tour','Time'] },
 { target:'Football', clue:['Ball','Goal','Team','Grass','Run','Kick','Net','Crowd','Field','Game','Shirt','Round'] }
];
export const destinationSets = [
 [['Rooftop party','🌆',1,6],['Beach house','🏝️',2,4],['Arcade','🕹️',3,2],['Home sweet home','🏡',99,1]],
 [['Space lounge','🪐',1,7],['Pool party','🦩',2,4],['Night market','🏮',3,2],['Movie night','🍿',99,1]],
 [['VIP backstage','🎸',1,8],['Karaoke club','🎤',2,5],['Pizza place','🍕',4,2],['Cozy sofa','🛋️',99,1]],
 [['Private island','🏖️',1,7],['Cabin getaway','🏕️',3,3],['Bowling alley','🎳',4,2],['Reading nook','📚',99,1]],
 [['Penthouse','🥂',2,6],['Roller disco','🛼',3,3],['Ice cream shop','🍦',4,2],['Pajama party','🌙',99,1]],
 [['The afterparty','🪩',1,10],['Festival','🎪',2,5],['Game café','🎲',3,3],['Breakfast club','🥞',99,2]]
];
