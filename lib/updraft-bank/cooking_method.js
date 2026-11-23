export default {
 id: 'cooking_method',
 title: 'Name a cooking technique',
 icon: '🍳',
 note: 'Bake, braise, tadka, sous vide…',
 common: `Bake|Boil|Fry|Deep fry|Grill|Roast|Steam|Stir fry|Barbecue|Toast|Microwave|Sauté|Poach|Tadka|Shallow fry|Simmer|Chop|
  Marinate|Smoke|Air fry|Pressure cook|Knead|Whisk|Mash|Slice`,
 uncommon: `Braise|Stew|Broil|Blanch|Sear|Pan fry|Slow cook|Sous vide|Caramelize|Flambé|Dum|Tandoor|Bhuna|Dice|Mince|Grate|Peel|Beat|
  Whip|Fold|Blend|Purée|Strain|Sift|Glaze|Baste|Brine|Cure|Pickle|Ferment|Reduce|Deglaze|Temper|Proof|Stuff|Skewer|Garnish|Season|
  Bread|Batter|Fillet|Debone|Zest|Parboil|Dry roast|Tawa fry|Scramble|Spit roast|Rotisserie|Griddle|Char|Infuse|Grind|Soak|Steep|Stir|Mix|Melt|Pound|Crush|Toss|Skim|Thicken`,
 rare: `Julienne|Chiffonade|Brunoise|Emulsify|Confit|Render|Clarify|Scald|Coddle|Butterfly|Spatchcock|Truss|Tenderize|Score|Dredge|
  Sweat|Brown|Pan roast|Pot roast|En papillote|Bain-marie|Au gratin|Blind bake|Flash fry|Blacken|Dehydrate|Sun dry|Teppanyaki|
  Pit roast|Dry age|Double boil|Shred|Carve|Rest|Cream|Dust|Dry rub|Cold smoke|Hot smoke|Salt bake|Plancha|Braai|Tempura|Velveting|
  Reverse sear|Blowtorch|Brûlée|Macerate|Candy|Sprout|Escabeche|Shock|Pipe|Laminate|Freeze dry|Asado|Clay pot cooking|Bhapa`,
 deep: `Red cooking|Paturi|Dhungar|Pressure fry|Shirr|Larding|Barding|Monter au beurre|Hangi|Kalua|Pachamanca|Clambake|Churrasco|
  Robatayaki|Nimono|Agemono|Yakimono|Mushimono|Batonnet|Paysanne|Tourné|Spherification|Nixtamalization|Tataki|Kinpira|Jugging|
  Fricassee|Earth oven|Haybox cooking|Ember roast|Plank grill`,
 aliases: {
  'Baking': 'Bake', 'Boiling': 'Boil', 'Frying': 'Fry', 'Talna': 'Fry','Deep frying': 'Deep fry', 'Deep-fried': 'Deep fry', 'Grilling': 'Grill', 'Roasting': 'Roast',
  'Steaming': 'Steam', 'Bhaap': 'Steam', 'Stir frying': 'Stir fry', 'Wok frying': 'Stir fry', 'Barbecuing': 'Barbecue', 'Barbeque': 'Barbecue', 'BBQ': 'Barbecue', 'Barbequing': 'Barbecue',
  'Toasting': 'Toast', 'Microwaving': 'Microwave', 'Sauteing': 'Sauté', 'Sautéing': 'Sauté', 'Poaching': 'Poach', 'Tarka': 'Tadka', 'Tempering': 'Tadka', 'Chaunk': 'Tadka', 'Chhaunk': 'Tadka',
  'Chhonk': 'Tadka', 'Baghar': 'Tadka', 'Baghaar': 'Tadka', 'Vaghar': 'Tadka', 'Phodni': 'Tadka', 'Oggarane': 'Tadka', 'Thalippu': 'Tadka', 'Talimpu': 'Tadka', 'Tadka lagana': 'Tadka',
  'Shallow frying': 'Shallow fry', 'Simmering': 'Simmer', 'Chopping': 'Chop', 'Marinating': 'Marinate', 'Marination': 'Marinate', 'Marinade': 'Marinate', 'Smoking': 'Smoke',
  'Air frying': 'Air fry', 'Pressure cooking': 'Pressure cook', 'Kneading': 'Knead', 'Whisking': 'Whisk', 'Mashing': 'Mash', 'Slicing': 'Slice', 'Braising': 'Braise', 'Stewing': 'Stew',
  'Broiling': 'Broil', 'Blanching': 'Blanch', 'Searing': 'Sear', 'Pan frying': 'Pan fry', 'Slow cooking': 'Slow cook', 'Sous-vide cooking': 'Sous vide', 'Caramelizing': 'Caramelize',
  'Caramelise': 'Caramelize', 'Caramelising': 'Caramelize', 'Caramelization': 'Caramelize', 'Caramelisation': 'Caramelize', 'Flambeing': 'Flambé', 'Flambéing': 'Flambé',
  'Dum pukht': 'Dum', 'Dum cooking': 'Dum', 'Tandoori': 'Tandoor', 'Tandoori cooking': 'Tandoor', 'Bhunao': 'Bhuna', 'Bhunna': 'Bhuna', 'Bhunai': 'Bhuna', 'Dicing': 'Dice',
  'Mincing': 'Mince', 'Grating': 'Grate', 'Peeling': 'Peel', 'Beating': 'Beat', 'Whipping': 'Whip', 'Folding': 'Fold', 'Blending': 'Blend', 'Pureeing': 'Purée', 'Puree': 'Purée',
  'Straining': 'Strain', 'Sifting': 'Sift', 'Glazing': 'Glaze', 'Basting': 'Baste', 'Brining': 'Brine', 'Curing': 'Cure', 'Salting': 'Cure', 'Pickling': 'Pickle', 'Achar': 'Pickle',
  'Fermenting': 'Ferment', 'Fermentation': 'Ferment', 'Reducing': 'Reduce', 'Reduction': 'Reduce', 'Deglazing': 'Deglaze', 'Proofing': 'Proof', 'Proving': 'Proof', 'Prove': 'Proof',
  'Stuffing': 'Stuff', 'Skewering': 'Skewer', 'Seekh': 'Skewer', 'Garnishing': 'Garnish', 'Seasoning': 'Season', 'Breading': 'Bread', 'Crumbing': 'Bread', 'Battering': 'Batter',
  'Filleting': 'Fillet', 'Deboning': 'Debone', 'Zesting': 'Zest', 'Parboiling': 'Parboil', 'Dry roasting': 'Dry roast', 'Sekna': 'Dry roast', 'Tawa': 'Tawa fry', 'Scrambling': 'Scramble',
  'Spit roasting': 'Spit roast', 'Griddling': 'Griddle', 'Charring': 'Char', 'Infusing': 'Infuse', 'Infusion': 'Infuse', 'Grinding': 'Grind', 'Soaking': 'Soak', 'Steeping': 'Steep',
  'Emulsifying': 'Emulsify', 'Emulsification': 'Emulsify', 'Rendering': 'Render', 'Clarifying': 'Clarify', 'Scalding': 'Scald', 'Coddling': 'Coddle', 'Butterflying': 'Butterfly',
  'Spatchcocking': 'Spatchcock', 'Trussing': 'Truss', 'Tenderizing': 'Tenderize', 'Tenderise': 'Tenderize', 'Tenderising': 'Tenderize', 'Scoring': 'Score', 'Dredging': 'Dredge',
  'Sweating': 'Sweat', 'Browning': 'Brown', 'Pan roasting': 'Pan roast', 'Pot roasting': 'Pot roast', 'Papillote': 'En papillote', 'Water bath': 'Bain-marie', 'Gratin': 'Au gratin',
  'Gratinate': 'Au gratin', 'Gratinating': 'Au gratin', 'Blind baking': 'Blind bake', 'Bake blind': 'Blind bake', 'Flash frying': 'Flash fry', 'Blackening': 'Blacken',
  'Dehydrating': 'Dehydrate', 'Dehydration': 'Dehydrate', 'Drying': 'Dehydrate', 'Sun drying': 'Sun dry', 'Sun-dried': 'Sun dry', 'Pit roasting': 'Pit roast', 'Dry aging': 'Dry age',
  'Dry ageing': 'Dry age', 'Double boiling': 'Double boil', 'Double boiler': 'Double boil', 'Shredding': 'Shred', 'Carving': 'Carve', 'Resting': 'Rest', 'Creaming': 'Cream',
  'Dusting': 'Dust', 'Rubbing': 'Dry rub', 'Spice rub': 'Dry rub', 'Cold smoking': 'Cold smoke', 'Hot smoking': 'Hot smoke', 'Salt baking': 'Salt bake', 'Salt crust': 'Salt bake',
  'A la plancha': 'Plancha', 'Braaing': 'Braai', 'Reverse searing': 'Reverse sear', 'Torching': 'Blowtorch', 'Blow torching': 'Blowtorch', 'Brulee': 'Brûlée', 'Bruleeing': 'Brûlée',
  'Macerating': 'Macerate', 'Maceration': 'Macerate', 'Candying': 'Candy', 'Sprouting': 'Sprout', 'Germinating': 'Sprout', 'Shocking': 'Shock', 'Ice bath': 'Shock', 'Piping': 'Pipe',
  'Laminating': 'Laminate', 'Lamination': 'Laminate', 'Freeze drying': 'Freeze dry', 'Clay pot': 'Clay pot cooking', 'Bhapa cooking': 'Bhapa', 'Hongshao': 'Red cooking',
  'Red braising': 'Red cooking', 'Dhungar method': 'Dhungar', 'Pressure frying': 'Pressure fry', 'Shirring': 'Shirr', 'Lard': 'Larding', 'Bard': 'Barding', 'Mounting butter': 'Monter au beurre',
  'Kalua pig': 'Kalua', 'Tourne': 'Tourné', 'Nixtamalisation': 'Nixtamalization', 'Jugged': 'Jugging', 'Ubalna': 'Boil', 'Ember cooking': 'Ember roast', 'Cooking in embers': 'Ember roast', 'Plank grilling': 'Plank grill',
  'Pit cooking': 'Earth oven', 'Umu': 'Earth oven', 'Retained heat cooking': 'Haybox cooking', 'Hay box': 'Haybox cooking', 'Wonderbag': 'Haybox cooking',
  'Baked': 'Bake', 'Boiled': 'Boil', 'Fried': 'Fry', 'Deep fried': 'Deep fry', 'Grilled': 'Grill', 'Roasted': 'Roast', 'Steamed': 'Steam', 'Stir fried': 'Stir fry', 'Toasted': 'Toast',
  'Poached': 'Poach', 'Smoked': 'Smoke', 'Braised': 'Braise', 'Stewed': 'Stew', 'Broiled': 'Broil', 'Blanched': 'Blanch', 'Seared': 'Sear', 'Pan fried': 'Pan fry', 'Pickled': 'Pickle',
  'Fermented': 'Ferment', 'Marinated': 'Marinate', 'Cured': 'Cure', 'Charred': 'Char', 'Mashed': 'Mash', 'Scrambled': 'Scramble', 'Caramelized': 'Caramelize', 'Caramelised': 'Caramelize',
  'Stirring': 'Stir', 'Mixing': 'Mix', 'Melting': 'Melt', 'Pounding': 'Pound', 'Crushing': 'Crush', 'Tossing': 'Toss', 'Skimming': 'Skim', 'Thickening': 'Thicken', 'Sauteed': 'Sauté', 'Barbecued': 'Barbecue'
 }
};
