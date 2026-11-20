export default {
 id: 'insect',
 title: 'Name an insect or bug',
 icon: '🐞',
 note: 'Spiders, scorpions and other creepy-crawlies count.',
 common: `Ant|Bee|Butterfly|Mosquito|Fly|Beetle|Spider|Wasp|Dragonfly|Moth|Grasshopper|Cricket|Ladybug|Cockroach|Flea|
  Termite|Cicada|Firefly|Praying mantis|Caterpillar|Centipede|Millipede|Scorpion|Tick|Louse|Bed bug|Honeybee|Locust|
  Hornet|Bumblebee|Tarantula`,
 uncommon: `Aphid|Silverfish|Earwig|Mayfly|Damselfly|Weevil|Scarab|Katydid|Dung beetle|Glowworm|June bug|Lacewing|
  Mealworm|Water strider|Stick insect|Stink bug|Gnat|Midge|Horse fly|Fruit fly|Tsetse fly|Crane fly|Silkworm|
  Monarch butterfly|Stag beetle|Rhinoceros beetle|Black widow|Daddy longlegs|Mite|Fire ant|Carpenter ant|
  Yellowjacket|Maggot|Woodlouse|Leaf insect|Swallowtail|Hawk moth|Wolf spider|Jumping spider|Brown recluse|
  House spider|Garden spider|Red velvet mite|Head louse|Whitefly|Mealybug|Carpenter bee|Paper wasp|Blow fly|
  Sand fly|Black fly|Deer fly|Hoverfly|Leafhopper|Kissing bug|Assassin bug|Colorado potato beetle|Japanese beetle|
  Boll weevil|Clothes moth|Atlas moth|Luna moth|Army ant|Leafcutter ant|Killer bee|Water beetle|Dust mite|
  Booklouse|Bristletail|Caddisfly|Click beetle|Dobsonfly|Flea beetle|Planthopper|Sawfly`,
 rare: `Scorpionfly|Stonefly|Thrips|Treehopper|Velvet ant|Webspinner|Antlion|Bark beetle|Burying beetle|Chinch bug|
  Cicada killer|Damsel bug|Eyed click beetle|Fishfly|Fungus gnat|Ichneumon wasp|Lanternfly|Mud dauber|Rove beetle|
  Soldier fly|Tarantula hawk|Tiger beetle|Water boatman|Bullet ant|Weaver ant|Harvester ant|Bulldog ant|
  Argentine ant|Pharaoh ant|Mason bee|Leafcutter bee|Sweat bee|Stingless bee|Potter wasp|Gall wasp|Fig wasp|
  Asian giant hornet|Spider wasp|Painted lady|Red admiral|Cabbage white|Blue morpho|Birdwing|Skipper|Fritillary|
  Peacock butterfly|Tortoiseshell|Brimstone|Glasswing|Owl butterfly|Viceroy|Mourning cloak|Emperor moth|Gypsy moth|
  Tiger moth|Death's-head hawkmoth|Hummingbird hawk-moth|Codling moth|Peppered moth|Bagworm|Armyworm|Cutworm|
  Bollworm|Hornworm|Inchworm|Woolly bear|Tent caterpillar|Hercules beetle|Goliath beetle|Cockchafer|Leaf beetle|
  Jewel beetle|Bombardier beetle|Diving beetle|Whirligig beetle|Darkling beetle|Soldier beetle|Deathwatch beetle|
  Carpet beetle|Rice weevil|Emerald ash borer|Woodworm|Flour beetle|Greenbottle|Flesh fly|Botfly|Robber fly|
  Stable fly|Bee fly|Drain fly|Warble fly|Screwworm|Giant water bug|Water scorpion|Scale insect|Spittlebug|
  Squash bug|Boxelder bug|Lac insect|Cochineal|Mole cricket|Camel cricket|Weta|Jerusalem cricket|Orchid mantis|
  Hissing cockroach|Mantisfly|Owlfly|Alderfly|Snakefly|Firebrat|Springtail|Barklouse|Orb weaver|Huntsman spider|
  Trapdoor spider|Funnel-web spider|Redback spider|Cellar spider|Crab spider|Fishing spider|Goliath birdeater|
  Camel spider|Peacock spider|Wandering spider|Emperor scorpion|Deathstalker|Whip scorpion|Pseudoscorpion|
  Deer tick|Spider mite|Chigger|House centipede|Giant centipede|Pill millipede`,
 deep: `Backswimmer|Bat fly|Biting midge|Blister beetle|Carrion beetle|Casebearer|Chalcid wasp|Checkered beetle|
  Cuckoo wasp|Ensign wasp|Ground beetle|Hellgrammite|Kudzu bug|Longhorn beetle|Mydas fly|Pigeon horntail|
  Snipe fly|Twisted-wing parasite|Honeypot ant|Orchid bee|Digger wasp|Fairyfly|Hairstreak|Common Mormon|
  Plain tiger|Cinnabar moth|Leaf miner|Diamondback moth|Cecropia moth|Polyphemus moth|Io moth|Comet moth|Wax moth|
  Corn borer|Tussock moth|Titan beetle|Tortoise beetle|Atlas beetle|Elephant beetle|Rose chafer|Oil beetle|
  Cucumber beetle|Powderpost beetle|Ambrosia beetle|Dung fly|Stalk-eyed fly|Hessian fly|Louse fly|Leaf-footed bug|
  Lace bug|Harlequin bug|Cotton stainer|Psyllid|Thorn bug|Wheel bug|Milkweed bug|Jewel bug|Lubber grasshopper|
  Ice crawler|Water spider|Hobo spider|Lynx spider|Spitting spider|Mouse spider|Golden silk orb-weaver|
  Bark scorpion|Tailless whip scorpion`,
 aliases: {
  'Housefly': 'Fly', 'House fly': 'Fly', 'Honey bee': 'Honeybee', 'Bumble bee': 'Bumblebee',
  'Ladybird': 'Ladybug', 'Lady beetle': 'Ladybug', 'Roach': 'Cockroach', 'Lice': 'Louse',
  'Mantis': 'Praying mantis', 'Mantid': 'Praying mantis', 'Lightning bug': 'Firefly', 'Jugnu': 'Firefly',
  'Walkingstick': 'Stick insect', 'Stick bug': 'Stick insect', 'Phasmid': 'Stick insect',
  'Shield bug': 'Stink bug', 'Pond skater': 'Water strider', 'Water skater': 'Water strider',
  'Booklice': 'Booklouse', 'Head lice': 'Head louse', 'Greenfly': 'Aphid', 'Plant louse': 'Aphid',
  'June beetle': 'June bug', 'Maybug': 'Cockchafer', 'May bug': 'Cockchafer',
  'Daddy long legs': 'Daddy longlegs', 'Harvestman': 'Daddy longlegs',
  'Pill bug': 'Woodlouse', 'Roly poly': 'Woodlouse', 'Sowbug': 'Woodlouse', 'Sow bug': 'Woodlouse', 'Woodlice': 'Woodlouse',
  'Monarch': 'Monarch butterfly', 'Sphinx moth': 'Hawk moth', 'Hawkmoth': 'Hawk moth', 'Silk moth': 'Silkworm',
  'Spongy moth': 'Gypsy moth', 'Morpho': 'Blue morpho', 'Looper': 'Inchworm', 'Potato beetle': 'Colorado potato beetle',
  'Potato bug': 'Colorado potato beetle', 'Bluebottle': 'Blow fly', 'Horsefly': 'Horse fly', 'Hover fly': 'Hoverfly',
  'Daddy longlegs fly': 'Crane fly', 'Moth fly': 'Drain fly', 'Froghopper': 'Spittlebug',
  'Africanized bee': 'Killer bee', 'Murder hornet': 'Asian giant hornet', 'Yellow jacket': 'Yellowjacket',
  'Ichneumon': 'Ichneumon wasp', 'Horntail': 'Pigeon horntail', 'Eyed clicker': 'Eyed click beetle',
  'Strepsiptera': 'Twisted-wing parasite', 'Stylops': 'Twisted-wing parasite',
  'Spotted lanternfly': 'Lanternfly', 'Cave cricket': 'Camel cricket', 'Bush cricket': 'Katydid',
  'Madagascar hissing cockroach': 'Hissing cockroach', 'Rhino beetle': 'Rhinoceros beetle',
  'Lightning beetle': 'Firefly', 'Glow worm': 'Glowworm', 'Bedbug': 'Bed bug', 'Khatmal': 'Bed bug',
  'Machhar': 'Mosquito', 'Titli': 'Butterfly', 'Makdi': 'Spider', 'Bichhu': 'Scorpion', 'Cheenti': 'Ant', 'Chinti': 'Ant',
  'Makkhi': 'Fly', 'Deemak': 'Termite', 'White ant': 'Termite', 'Tiddi': 'Locust', 'Jhingur': 'Cricket',
  'Sun spider': 'Camel spider', 'Solifuge': 'Camel spider', 'Vinegaroon': 'Whip scorpion',
  'Whip spider': 'Tailless whip scorpion', 'Amblypygid': 'Tailless whip scorpion',
  'Diving bell spider': 'Water spider', 'Banana spider': 'Golden silk orb-weaver',
  'Brazilian wandering spider': 'Wandering spider', 'Redback': 'Redback spider', 'Black widow spider': 'Black widow',
  'Funnel web spider': 'Funnel-web spider', 'Recluse': 'Brown recluse', 'Recluse spider': 'Brown recluse',
  'Harvest mite': 'Chigger', 'Rain bug': 'Red velvet mite', 'Birbahuti': 'Red velvet mite', 'Velvet mite': 'Red velvet mite',
  'Red cotton bug': 'Cotton stainer', 'Orb-weaver spider': 'Orb weaver', 'Orb weaver spider': 'Orb weaver',
  'Death head moth': "Death's-head hawkmoth", "Death's head moth": "Death's-head hawkmoth",
  'Hummingbird moth': 'Hummingbird hawk-moth', 'Cabbage butterfly': 'Cabbage white', 'Thrip': 'Thrips',
  'Leaf cutter ant': 'Leafcutter ant', 'Ant lion': 'Antlion', 'Doodlebug': 'Antlion',
  'Mantis fly': 'Mantisfly', 'Scorpion fly': 'Scorpionfly', 'Checkered': 'Checkered beetle', 'Bot fly': 'Botfly'
 }
};
