export default {
 id: 'reptile',
 title: 'Name a reptile or amphibian',
 icon: '🦎',
 common: `Snake|Lizard|Crocodile|Alligator|Turtle|Tortoise|Frog|Toad|Chameleon|Gecko|Iguana|Salamander|Newt|Cobra|Viper|
  Python|Anaconda|Komodo dragon|Bullfrog|Tree frog|King cobra|Rattlesnake|Sea turtle|Monitor lizard|Boa`,
 uncommon: `Gila monster|Black mamba|Skink|Axolotl|Caiman|Gharial|Leatherback turtle|Mudpuppy|Terrapin|Tuatara|
  Sidewinder|Copperhead|Cottonmouth|Coral snake|Basilisk|Chuckwalla|Hellbender|Horned lizard|Thorny devil|Slow worm|
  Krait|Russell's viper|Rat snake|Garter snake|Sea snake|Adder|Grass snake|Corn snake|Indian cobra|Pit viper|
  Saltwater crocodile|Nile crocodile|Mugger crocodile|Bearded dragon|Frilled lizard|Garden lizard|House gecko|
  Leopard gecko|Green iguana|Marine iguana|Giant tortoise|Galapagos tortoise|Star tortoise|Snapping turtle|
  Softshell turtle|Box turtle|Red-eared slider|Green sea turtle|Hawksbill turtle|Loggerhead turtle|Olive ridley|
  Poison dart frog|Cane toad|Fire salamander|Giant salamander|Reticulated python|Burmese python|Ball python|
  Indian python|Green mamba|Taipan|Water snake|King snake|Milk snake|Vine snake|Sand boa|Water monitor|
  American alligator|Common frog|Common toad|Leopard frog|Red-eyed tree frog|Glass frog|Tiger salamander`,
 rare: `Blind snake|Caecilian|Glass lizard|Kukri snake|Siren|Spadefoot toad|Whiptail|Agama|Amphisbaena|Anole|Boomslang|
  Bushmaster|Coachwhip|Collared lizard|Death adder|Fer-de-lance|Fire-bellied toad|Flying dragon|Green anole|
  Massasauga|Mud turtle|Olm|Puff adder|Ribbon snake|Tiger snake|Water dragon|Spitting cobra|Saw-scaled viper|
  Gaboon viper|Horned viper|Eyelash viper|Carpet python|Green tree python|Emerald tree boa|Rainbow boa|Rosy boa|
  Diamondback rattlesnake|Brown snake|Common krait|Banded krait|Sea krait|Bull snake|Gopher snake|Hognose snake|
  Racer|Indigo snake|Tree snake|Flying snake|Cat snake|Wolf snake|Keelback|Bronzeback|Trinket snake|Whip snake|
  Smooth snake|Mangrove snake|Asp|Veiled chameleon|Panther chameleon|Jackson's chameleon|Tokay gecko|Crested gecko|
  Day gecko|Leaf-tailed gecko|Flying gecko|Rhinoceros iguana|Bengal monitor|Nile monitor|Savannah monitor|Goanna|
  Blue-tongued skink|Fire skink|Five-lined skink|Sandfish|Fan-throated lizard|Uromastyx|Fence lizard|Tegu|
  Beaded lizard|Legless lizard|Alligator lizard|Wall lizard|Sand lizard|Armadillo lizard|Chinese alligator|
  Spectacled caiman|Black caiman|False gharial|American crocodile|Dwarf crocodile|Siamese crocodile|
  Freshwater crocodile|Kemp's ridley|Flatback turtle|Diamondback terrapin|Alligator snapping turtle|Painted turtle|
  Musk turtle|Map turtle|Wood turtle|Pond turtle|Snake-necked turtle|Aldabra tortoise|Sulcata tortoise|
  Leopard tortoise|Radiated tortoise|Russian tortoise|Gopher tortoise|Desert tortoise|Hermann's tortoise|
  Red-footed tortoise|Goliath frog|Wood frog|Green frog|Marsh frog|Edible frog|White's tree frog|Spring peeper|
  Chorus frog|Pacman frog|Tomato frog|Golden poison frog|African clawed frog|Surinam toad|Purple frog|Flying frog|
  Midwife toad|Rain frog|Natterjack toad|Golden toad|American toad|Spotted salamander|Great crested newt|
  Smooth newt|Eastern newt|Alpine newt`,
 deep: `Amphiuma|Cascabel|Casquehead lizard|Colubrid|Concho water snake|Crocodile skink|Blind skink|Egg-eating snake|
  File snake|Girdled lizard|Hairy frog|Jararaca|Lace monitor|Matamata|Mertens' water monitor|Night adder|Perentie|
  Plated lizard|Rough earth snake|Shingleback|Tentacled snake|Urutu|Woma python|Thread snake|Pipe snake|
  Sunbeam snake|Shieldtail|Twig snake|Stiletto snake|Mussurana|Habu|Mamushi|Rubber boa|African rock python|
  Caiman lizard|Jeweled lizard|Sungazer|Earless monitor lizard|Chinese crocodile lizard|Night lizard|Leopard lizard|
  Zebra-tailed lizard|Racerunner|Sailfin lizard|Butterfly lizard|Cuban crocodile|Orinoco crocodile|Spotted turtle|
  Pig-nosed turtle|Roofed turtle|Flapshell turtle|Pancake tortoise|Cooter|Blanding's turtle|Cricket frog|Mantella|
  Darwin's frog|Reed frog|Pickerel frog|Tailed frog|Paradoxical frog|Titicaca water frog|Harlequin toad|
  Colorado River toad|Mole salamander|Lungless salamander|Red-backed salamander|Fire-bellied newt`,
 aliases: {
  'Croc': 'Crocodile', 'Gator': 'Alligator', 'Tadpole': 'Frog', 'Serpent': 'Snake',
  'Boa constrictor': 'Boa', 'Green anaconda': 'Anaconda', 'Mamba': 'Black mamba', 'Monitor': 'Monitor lizard',
  'Horned toad': 'Horned lizard', 'Moloch': 'Thorny devil', 'Water moccasin': 'Cottonmouth',
  'Leatherback': 'Leatherback turtle', 'Softshell': 'Softshell turtle', 'Spadefoot': 'Spadefoot toad',
  'Oligodon': 'Kukri snake', 'Cordylid': 'Girdled lizard', 'Dibamus': 'Blind skink',
  'Egg eater snake': 'Egg-eating snake', 'Egg eater': 'Egg-eating snake',
  'Merten water monitor': "Mertens' water monitor", 'Pipa pipa': 'Surinam toad', 'Pipa': 'Surinam toad',
  'Leaf tail gecko': 'Leaf-tailed gecko', 'Fire belly toad': 'Fire-bellied toad', 'Draco': 'Flying dragon',
  'Flying lizard': 'Flying dragon', 'Casquehead': 'Casquehead lizard', 'Concho snake': 'Concho water snake',
  'Gavial': 'Gharial', 'Ghariyal': 'Gharial', 'Mugger': 'Mugger crocodile', 'Marsh crocodile': 'Mugger crocodile',
  'Saltie': 'Saltwater crocodile', 'Estuarine crocodile': 'Saltwater crocodile',
  'Spectacled cobra': 'Indian cobra', 'Nag': 'Indian cobra', 'Naag': 'Indian cobra',
  'Royal python': 'Ball python', 'Rock python': 'Indian python', 'Indian rock python': 'Indian python', 'Ajgar': 'Python',
  'Inland taipan': 'Taipan', 'Eastern brown snake': 'Brown snake', 'Asp viper': 'Asp',
  'Checkered keelback': 'Keelback', 'Brahminy blind snake': 'Blind snake', 'Worm snake': 'Blind snake',
  'Calotes': 'Garden lizard', 'Oriental garden lizard': 'Garden lizard', 'Girgit': 'Chameleon',
  'Chhipkali': 'House gecko', 'Chipkali': 'House gecko', 'Wall gecko': 'House gecko',
  'Spiny-tailed lizard': 'Uromastyx', 'Mastigure': 'Uromastyx', 'Worm lizard': 'Amphisbaena',
  'Blue tongue lizard': 'Blue-tongued skink', 'Blue-tongue skink': 'Blue-tongued skink', 'Sleepy lizard': 'Shingleback',
  'Frill-necked lizard': 'Frilled lizard', 'Frilled dragon': 'Frilled lizard', 'Beardie': 'Bearded dragon',
  'Ocellated lizard': 'Jeweled lizard', 'Sailfin dragon': 'Sailfin lizard',
  'Indian star tortoise': 'Star tortoise', 'African spurred tortoise': 'Sulcata tortoise', 'Sulcata': 'Sulcata tortoise',
  'Stinkpot': 'Musk turtle', 'Red-eared terrapin': 'Red-eared slider', 'Slider': 'Red-eared slider',
  'Green turtle': 'Green sea turtle', 'Hawksbill': 'Hawksbill turtle', 'Loggerhead': 'Loggerhead turtle',
  'Olive ridley turtle': 'Olive ridley', 'Mata mata': 'Matamata', 'Indian flapshell turtle': 'Flapshell turtle',
  'Horned frog': 'Pacman frog', 'Poison arrow frog': 'Poison dart frog', 'Dart frog': 'Poison dart frog',
  'Poison frog': 'Poison dart frog', 'Clawed frog': 'African clawed frog', 'Xenopus': 'African clawed frog',
  'Desert rain frog': 'Rain frog', 'Marine toad': 'Cane toad', 'Red eft': 'Eastern newt',
  'Mexican walking fish': 'Axolotl', 'Waterdog': 'Mudpuppy', 'Proteus': 'Olm', 'Tuatara lizard': 'Tuatara',
  'Komodo': 'Komodo dragon', 'Komodo monitor': 'Komodo dragon', 'Rattler': 'Rattlesnake', 'Diamondback': 'Diamondback rattlesnake',
  'Russell viper': "Russell's viper", 'Daboia': "Russell's viper", 'Dhaman': 'Rat snake', 'Kingsnake': 'King snake',
  'American bullfrog': 'Bullfrog', 'Treefrog': 'Tree frog', 'Gila': 'Gila monster', 'Mud snake': 'Rough earth snake'
 }
};
