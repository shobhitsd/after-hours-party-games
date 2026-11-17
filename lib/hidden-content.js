// Server-only, immutable launch edition. Tiers are editorial, not measured frequencies.
export const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase().replace(/[^A-Z]/g,'');
const bank = (id, title, groups) => ({id, title, answers:groups.flatMap((words,i)=>words.split('|').map(word=>({word, key:normalize(word), points:[5,10,20,40][i], tier:['Common','Uncommon','Rare','Deep cut'][i]})))});
export const prompts = [
 bank('fruit','Name a fruit',[
  'Apple|Banana|Orange|Mango|Grape|Pear|Peach|Plum|Lemon|Lime|Pineapple|Strawberry|Watermelon|Cherry|Kiwi',
  'Papaya|Apricot|Guava|Coconut|Lychee|Pomegranate|Passion fruit|Blueberry|Raspberry|Grapefruit|Fig|Date',
  'Jackfruit|Persimmon|Mulberry|Starfruit|Quince|Tamarind|Cranberry|Blackberry|Dragon fruit',
  'Rambutan|Mangosteen|Soursop|Longan|Loquat|Jujube|Durian']),
 bank('animal','Name a mammal',[
  'Dog|Cat|Horse|Cow|Sheep|Goat|Pig|Lion|Tiger|Elephant|Monkey|Rabbit|Mouse|Bear|Zebra|Giraffe',
  'Dolphin|Whale|Otter|Panda|Koala|Camel|Wolf|Fox|Deer|Donkey|Kangaroo|Gorilla|Squirrel',
  'Platypus|Armadillo|Meerkat|Hedgehog|Lemur|Wombat|Tapir|Badger|Bison|Yak|Chimpanzee',
  'Quokka|Okapi|Aardvark|Pangolin|Echidna']),
 bank('bird','Name a bird',[
  'Sparrow|Parrot|Eagle|Owl|Duck|Crow|Pigeon|Peacock|Penguin|Swan|Chicken',
  'Toucan|Flamingo|Robin|Raven|Ostrich|Kingfisher|Woodpecker|Pelican|Falcon|Seagull|Dove',
  'Hornbill|Albatross|Kestrel|Nightingale|Wren|Heron|Crane|Puffin|Cormorant|Magpie|Quail',
  'Hoopoe|Kakapo|Cassowary|Jacana|Quetzal|Shoebill|Lyrebird']),
 bank('vegetable','Name a culinary vegetable',[
  'Carrot|Potato|Tomato|Onion|Pea|Cucumber|Cabbage|Broccoli|Spinach|Pumpkin|Corn',
  'Cauliflower|Beetroot|Radish|Garlic|Eggplant|Zucchini|Sweet potato|Celery|Leek|Lettuce|Kale',
  'Okra|Artichoke|Asparagus|Parsnip|Turnip|Fennel|Watercress|Bok choy|Chard',
  'Kohlrabi|Celeriac|Salsify|Jicama|Romanesco|Rutabaga']),
 bank('country','Name a country',[
  'India|China|France|Japan|Canada|Brazil|Australia|Italy|Spain|Germany|Mexico|Egypt|Russia',
  'Chile|Nepal|Peru|Kenya|Greece|Portugal|Sweden|Norway|Thailand|Vietnam|Argentina|Indonesia|South Africa|United States|United Kingdom',
  'Bhutan|Mongolia|Uruguay|Ecuador|Croatia|Tunisia|Jamaica|Madagascar|Sri Lanka|Malaysia|Finland|Poland|Morocco|Pakistan|Bangladesh',
  'Kiribati|Vanuatu|Comoros|Djibouti|Eswatini|Suriname|Tuvalu|Seychelles']),
 bank('instrument','Name a musical instrument',[
  'Piano|Guitar|Violin|Drum|Flute|Trumpet|Saxophone|Keyboard|Harp',
  'Cello|Clarinet|Trombone|Ukulele|Harmonica|Accordion|Banjo|Tabla|Sitar|Viola|Tambourine',
  'Oboe|Bassoon|Marimba|Xylophone|Mandolin|Bagpipe|Dulcimer|Glockenspiel|Lute|Djembe',
  'Theremin|Erhu|Shamisen|Balalaika|Kalimba|Sarangi|Ocarina']),
 bank('flower','Name a flowering plant',[
  'Rose|Lily|Sunflower|Tulip|Daisy|Lotus|Orchid|Jasmine|Marigold|Hibiscus',
  'Lavender|Daffodil|Dahlia|Poppy|Iris|Peony|Carnation|Magnolia|Petunia|Dandelion',
  'Zinnia|Camellia|Foxglove|Hydrangea|Chrysanthemum|Snapdragon|Gardenia|Wisteria|Crocus',
  'Anemone|Delphinium|Fritillary|Hellebore|Ranunculus|Amaryllis']),
 bank('food','Name a dish or prepared food',[
  'Pizza|Burger|Pasta|Sandwich|Salad|Soup|Cake|Bread|Pancake|Ice cream|Curry|Noodles',
  'Biryani|Dosa|Idli|Samosa|Taco|Sushi|Ramen|Risotto|Lasagna|Falafel|Hummus|Waffle|Omelette',
  'Ratatouille|Shakshuka|Gnocchi|Paella|Kimchi|Dhokla|Ceviche|Goulash|Baklava|Pierogi',
  'Okonomiyaki|Khachapuri|Bibimbap|Injera|Koshari|Jambalaya']),
 bank('sport','Name a sport',[
  'Football|Cricket|Tennis|Basketball|Hockey|Swimming|Badminton|Golf|Rugby|Baseball|Boxing',
  'Volleyball|Cycling|Wrestling|Archery|Surfing|Skiing|Rowing|Karate|Judo|Table tennis|Gymnastics',
  'Fencing|Squash|Lacrosse|Curling|Biathlon|Triathlon|Kabaddi|Taekwondo|Water polo|Handball',
  'Sepak takraw|Hurling|Korfball|Bocce|Skeleton|Pentathlon']),
 bank('color','Name a colour',[
  'Red|Blue|Green|Yellow|Orange|Purple|Pink|Black|White|Brown|Grey',
  'Violet|Indigo|Turquoise|Maroon|Beige|Gold|Silver|Teal|Crimson|Navy|Magenta',
  'Amber|Ochre|Scarlet|Coral|Cerulean|Mauve|Lavender|Vermilion|Chartreuse|Cyan|Ivory',
  'Aubergine|Ecru|Viridian|Periwinkle|Burgundy|Sienna'])
];
const aliases={vegetable:{aubergine:'Eggplant',courgette:'Zucchini',beet:'Beetroot',sweetcorn:'Corn'},country:{usa:'United States',uk:'United Kingdom',america:'United States'},instrument:{drums:'Drum',bagpipes:'Bagpipe'},color:{gray:'Grey'},food:{omelet:'Omelette',lasagne:'Lasagna'},sport:{soccer:'Football'}};
for(const p of prompts)for(const a of p.answers)a.aliases=Object.entries(aliases[p.id]||{}).filter(([,word])=>word===a.word).map(([word])=>normalize(word));
const entries = [
 ['Machu Picchu','A famous place','An Inca citadel high in the Andes of Peru.'],
 ['Mount Everest','A famous place','The Himalayan mountain on the border of Nepal and China.'],
 ['Eiffel Tower','A famous landmark','The iron tower built in Paris for the 1889 exposition.'],
 ['Stonehenge','A famous landmark','The prehistoric stone circle in southern England.'],
 ['Grand Canyon','A famous place','The vast canyon carved by the Colorado River in Arizona.'],
 ['Tower Bridge','A famous landmark','The London bridge with two towers and a lifting central roadway.'],
 ['Golden Gate','A famous landmark','The name of the strait and the orange suspension bridge in San Francisco.'],
 ['Angkor Wat','A famous landmark','The temple complex in Cambodia.'],
 ['Taj Mahal','A famous landmark','The marble mausoleum in Agra, India.'],
 ['Colosseum','A famous landmark','The ancient amphitheatre in Rome.'],
 ['Acropolis','A famous landmark','The ancient hilltop citadel above Athens.'],
 ['Niagara Falls','A famous place','The waterfalls on the border of Canada and the United States.'],
 ['Mount Etna','A famous place','The active volcano on the Italian island of Sicily.'],
 ['Mount Fuji','A famous place','The volcanic mountain and cultural landmark in Japan.'],
 ['Madagascar','An island','The large island off the southeastern coast of Africa.'],
 ['New Zealand','A country','The Pacific country whose two main islands are the North and South Islands.'],
 ['Argentina','A country','The South American country whose capital is Buenos Aires.'],
 ['Singapore','A country','The island city-state in Southeast Asia.'],
 ['Australia','A country','The country whose capital is Canberra.'],
 ['Indonesia','A country','The Southeast Asian archipelago that includes Java and Sumatra.'],
 ['Harry Potter','A fictional character','The young wizard who attends Hogwarts.'],
 ['Cinderella','A fictional character','The fairy-tale heroine associated with a glass slipper.'],
 ['Snow White','A fictional character','The fairy-tale heroine who meets seven dwarfs.'],
 ['Spider-Man','A fictional character','The web-slinging superhero, also known as Peter Parker.'],
 ['Superman','A fictional character','The superhero from Krypton whose civilian identity is Clark Kent.'],
 ['Wonder Woman','A fictional character','The Amazon superhero also known as Diana.'],
 ['Darth Vader','A fictional character','The armoured Star Wars character with the distinctive breathing sound.'],
 ['Mickey Mouse','A fictional character','The animated Disney mouse with round ears.'],
 ['Peter Pan','A fictional character','The boy who never grows up and lives in Neverland.'],
 ['Pinocchio','A fictional character','The wooden puppet whose nose grows when he lies.']
];
export const puzzles = entries.map(([answer,category,explanation],i)=>({
 id:`hd-1-${String(i+1).padStart(3,'0')}`,canonical:normalize(answer),answer,category,explanation,
 version:1,aliases:answer==='Colosseum'?['COLISEUM']:[],
 // Rotate both pairings and order; published versions never change with player input.
 rounds:Array.from({length:5},(_,r)=>[prompts[[0,1,4,5,2,6,3,7,8,9][(i+r*2)%10]],prompts[[0,1,4,5,2,6,3,7,8,9][(i+r*2+1)%10]]])
}));

export function validateLibrary(library=puzzles){
 const errors=[];const ids=new Set(),answers=new Set();
 for(const p of library){
  const letters=new Set(p.canonical);if(ids.has(p.id)||answers.has(p.canonical))errors.push(`${p.id}: duplicate`);ids.add(p.id);answers.add(p.canonical);
  if(p.canonical.length<8||p.canonical.length>12||letters.size<6||letters.size>9)errors.push(`${p.id}: hidden length/distinct letters`);
  if(p.rounds.length!==5||new Set(p.rounds.flat().map(x=>x.id)).size!==10)errors.push(`${p.id}: prompt variety`);
  for(const letter of letters){const sources=p.rounds.flat().filter(q=>q.answers.some(a=>a.points<40&&a.key.includes(letter)));const count=new Set(p.rounds.flatMap(pair=>pair.flatMap(q=>q.answers.filter(a=>a.key.includes(letter)).map(a=>a.key)))).size;if(sources.length<2||count<3)errors.push(`${p.id}: coverage ${letter}`);}
 }
 for(const p of prompts){const keys=new Set();for(const a of p.answers){if(a.key.length<3||a.key.length>14||keys.has(a.key))errors.push(`${p.id}: invalid ${a.word}`);keys.add(a.key);}}
 return errors;
}
