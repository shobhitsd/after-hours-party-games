export default {
 id: 'superpower',
 title: 'Name a superpower',
 icon: '⚡',
 note: 'Flight, invisibility, telekinesis…',
 common: `Flight|Invisibility|Super strength|Super speed|Telekinesis|Telepathy|Teleportation|Time travel|Shapeshifting|
Healing factor|X-ray vision|Laser vision|Mind control|Immortality|Invulnerability|Fire control|Ice powers|Weather control|
Shrinking|Magic`,
 uncommon: `Precognition|Time manipulation|Elasticity|Intangibility|Super hearing|Night vision|Wall-crawling|Spider-sense|
Underwater breathing|Animal communication|Power absorption|Energy blasts|Force fields|Electricity control|Magnetism|
Water control|Earth control|Wind control|Light manipulation|Shadow manipulation|Technopathy|Sonic scream|Duplication|
Super intelligence|Enhanced senses|Super agility|Reality warping|Luck manipulation|Astral projection|Necromancy|Resurrection|
Healing|Empathy|Illusions|Memory manipulation|Possession|Portal creation|Levitation|Growth|Camouflage|Plant control|
Animal control|Super breath|Fire breath|Super jump|Gravity manipulation|Hypnosis|Elemental control|Photographic memory|
Omnipotence|Omniscience|Clairvoyance|Danger sense|Super stamina|Super reflexes|Power mimicry|Heat vision|Freeze breath|
Time stopping|Size manipulation|Webbing|Retractable claws`,
 rare: `Density control|Echolocation|Dimensional travel|Matter manipulation|Transmutation|Power negation|Energy absorption|
Kinetic absorption|Emotion manipulation|Dream manipulation|Omnipresence|Wish granting|Agelessness|Infrared vision|
Telescopic vision|Microscopic vision|Psychometry|Mediumship|Persuasion|Omnilingualism|Sound manipulation|
Vibration manipulation|Earthquake generation|Plasma manipulation|Metal manipulation|Sand manipulation|Lava manipulation|
Smoke form|Liquid form|Insect control|Summoning|Animal transformation|Bone manipulation|Toxin generation|Disease manipulation|
Fear inducement|Pain inducement|Aura reading|Retrocognition|Biokinesis|Radiation manipulation|Spatial manipulation|
Cosmic awareness|Lycanthropy|Vampirism|Gliding|Super swimming|Super smell|Energy constructs|Hair manipulation|
Crystal manipulation|Wings|Chi manipulation|Ki blasts|Charmspeak|Hemokinesis|Thermokinesis|Explosion generation|
Disintegration|Petrification|Age manipulation|Sleep inducement|Psychic blast|Mental shield`,
 deep: `Remote viewing|Soul manipulation|Life force absorption|Power bestowal|Power augmentation|Power sensing|
Superhuman tracking|Time loop|Black hole generation`,
 aliases: {
  'Flying': 'Flight', 'Fly': 'Flight', 'Invisible': 'Invisibility', 'Super-strength': 'Super strength', 'Strength': 'Super strength',
  'Superhuman strength': 'Super strength', 'Super-speed': 'Super speed', 'Speed': 'Super speed', 'Superhuman speed': 'Super speed',
  'Psychokinesis': 'Telekinesis', 'Moving objects with your mind': 'Telekinesis', 'Mind reading': 'Telepathy', 'Reading minds': 'Telepathy',
  'Thought projection': 'Telepathy', 'Teleport': 'Teleportation', 'Teleporting': 'Teleportation', 'Time-travel': 'Time travel',
  'Time traveling': 'Time travel', 'Shape-shifting': 'Shapeshifting', 'Morphing': 'Shapeshifting', 'Shapeshifter': 'Shapeshifting',
  'Regeneration': 'Healing factor', 'Self-healing': 'Healing factor', 'Accelerated healing': 'Healing factor',
  'X ray vision': 'X-ray vision', 'Laser eyes': 'Laser vision', 'Eye beams': 'Laser vision', 'Optic blasts': 'Laser vision',
  'Immortal': 'Immortality', 'Eternal life': 'Immortality', 'Invincibility': 'Invulnerability', 'Indestructibility': 'Invulnerability',
  'Superhuman durability': 'Invulnerability', 'Bulletproof skin': 'Invulnerability', 'Bulletproof': 'Invulnerability',
  'Pyrokinesis': 'Fire control', 'Fire manipulation': 'Fire control', 'Fire powers': 'Fire control', 'Pyromancy': 'Fire control',
  'Cryokinesis': 'Ice powers', 'Ice manipulation': 'Ice powers', 'Ice control': 'Ice powers', 'Freezing': 'Ice powers',
  'Atmokinesis': 'Weather control', 'Weather manipulation': 'Weather control', 'Storm creation': 'Weather control',
  'Controlling weather': 'Weather control', 'Shrink': 'Shrinking', 'Sorcery': 'Magic', 'Spellcasting': 'Magic', 'Witchcraft': 'Magic',
  'Seeing the future': 'Precognition', 'Future sight': 'Precognition', 'Foresight': 'Precognition', 'Divination': 'Precognition',
  'Chronokinesis': 'Time manipulation', 'Time control': 'Time manipulation', 'Stretching': 'Elasticity', 'Rubber body': 'Elasticity',
  'Super flexibility': 'Elasticity', 'Phasing': 'Intangibility', 'Walking through walls': 'Intangibility', 'Wall-climbing': 'Wall-crawling',
  'Adhesion': 'Wall-crawling', 'Spider sense': 'Spider-sense', 'Water breathing': 'Underwater breathing',
  'Breathing underwater': 'Underwater breathing', 'Talking to animals': 'Animal communication', 'Zoolingualism': 'Animal communication',
  'Power stealing': 'Power absorption', 'Energy projection': 'Energy blasts', 'Force field': 'Force fields', 'Shields': 'Force fields',
  'Electrokinesis': 'Electricity control', 'Electricity': 'Electricity control', 'Lightning control': 'Electricity control',
  'Lightning generation': 'Electricity control', 'Magnetokinesis': 'Magnetism', 'Magnetic powers': 'Magnetism',
  'Hydrokinesis': 'Water control', 'Water manipulation': 'Water control', 'Aquakinesis': 'Water control',
  'Geokinesis': 'Earth control', 'Earth manipulation': 'Earth control', 'Aerokinesis': 'Wind control', 'Air control': 'Wind control',
  'Wind manipulation': 'Wind control', 'Air manipulation': 'Wind control', 'Photokinesis': 'Light manipulation',
  'Umbrakinesis': 'Shadow manipulation', 'Darkness manipulation': 'Shadow manipulation', 'Shadow control': 'Shadow manipulation',
  'Machine control': 'Technopathy', 'Technokinesis': 'Technopathy', 'Cyberpathy': 'Technopathy', 'Supersonic scream': 'Sonic scream',
  'Cloning': 'Duplication', 'Self-duplication': 'Duplication', 'Multiplication': 'Duplication', 'Genius intellect': 'Super intelligence',
  'Heightened senses': 'Enhanced senses', 'Agility': 'Super agility', 'Reality manipulation': 'Reality warping',
  'Probability manipulation': 'Luck manipulation', 'Luck': 'Luck manipulation', 'Astral travel': 'Astral projection',
  'Raising the dead': 'Necromancy', 'Coming back to life': 'Resurrection', 'Healing others': 'Healing', 'Healing touch': 'Healing',
  'Illusion casting': 'Illusions', 'Memory erasing': 'Memory manipulation', 'Mind wiping': 'Memory manipulation',
  'Body possession': 'Possession', 'Portals': 'Portal creation', 'Wormhole creation': 'Portal creation', 'Hovering': 'Levitation',
  'Giant growth': 'Growth', 'Growing': 'Growth', 'Chlorokinesis': 'Plant control', 'Plant manipulation': 'Plant control',
  'Animal manipulation': 'Animal control', 'Fire breathing': 'Fire breath', 'Super leaping': 'Super jump', 'Super jumping': 'Super jump',
  'Gravikinesis': 'Gravity manipulation', 'Gravity control': 'Gravity manipulation', 'Element control': 'Elemental control',
  'Bending': 'Elemental control', 'Elemental manipulation': 'Elemental control', 'Eidetic memory': 'Photographic memory',
  'All-powerful': 'Omnipotence', 'All-knowing': 'Omniscience', 'ESP': 'Clairvoyance', 'Sixth sense': 'Clairvoyance',
  'Super endurance': 'Super stamina', 'Superhuman reflexes': 'Super reflexes', 'Power copying': 'Power mimicry',
  'Power replication': 'Power mimicry', 'Ice breath': 'Freeze breath', 'Stopping time': 'Time stopping', 'Time stop': 'Time stopping',
  'Time freeze': 'Time stopping', 'Size changing': 'Size manipulation', 'Web-slinging': 'Webbing', 'Web shooting': 'Webbing',
  'Claws': 'Retractable claws', 'Power nullification': 'Power negation', 'Nullification': 'Power negation',
  'Molecular manipulation': 'Matter manipulation', 'Alchemy': 'Transmutation', 'Dream walking': 'Dream manipulation',
  'Interdimensional travel': 'Dimensional travel', 'Wishing': 'Wish granting', 'Eternal youth': 'Agelessness',
  'Thermal vision': 'Infrared vision', 'Talking to ghosts': 'Mediumship', 'Seeing ghosts': 'Mediumship', 'Super charisma': 'Persuasion',
  'Speaking all languages': 'Omnilingualism', 'Multilingualism': 'Omnilingualism', 'Sonokinesis': 'Sound manipulation',
  'Ferrokinesis': 'Metal manipulation', 'Entomopathy': 'Insect control', 'Werewolf': 'Lycanthropy', 'Poison generation': 'Toxin generation',
  'Postcognition': 'Retrocognition', 'Blood manipulation': 'Hemokinesis', 'Heat control': 'Thermokinesis', 'Charm speak': 'Charmspeak',
  'Kamehameha': 'Ki blasts', 'Ki': 'Ki blasts', 'Explosions': 'Explosion generation', 'Turning people to stone': 'Petrification'
 }
};
