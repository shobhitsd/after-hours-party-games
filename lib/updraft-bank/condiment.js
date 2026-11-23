export default {
 id: 'condiment',
 title: 'Name a sauce, dip, chutney or condiment',
 icon: '🥫',
 common: `Ketchup|Mayonnaise|Mustard|Soy sauce|Hot sauce|Chili sauce|Barbecue sauce|Mint chutney|Green chutney|Coconut chutney|
  Tamarind chutney|Pickle|Mango pickle|Salsa|Guacamole|Hummus|Ranch|Pesto|Vinegar|Schezwan sauce|Raita|Salt|Jam|Honey|Peanut butter`,
 uncommon: `Tzatziki|Sriracha|Worcestershire sauce|Gravy|Wasabi|Tartar sauce|Thousand Island|Honey mustard|Aioli|Peri peri sauce|
  Sweet chili sauce|Oyster sauce|Hoisin sauce|Fish sauce|Teriyaki sauce|Chili oil|Tahini|Baba ganoush|Chimichurri|Pico de gallo|
  Nacho cheese|Cheese sauce|Hollandaise|Bechamel|Marinara|Alfredo sauce|Pizza sauce|Bolognese sauce|Garlic chutney|Mango chutney|
  Tomato chutney|Lime pickle|Dijon mustard|Buffalo sauce|Sweet and sour sauce|Peanut sauce|Balsamic vinegar|Maple syrup|
  Chocolate sauce|Caramel sauce|Whipped cream|Sour cream|Marmalade|Relish|Black pepper|Olive oil|Cranberry sauce|Mint sauce`,
 rare: `Apple sauce|Horseradish|Cocktail sauce|Caesar dressing|Vinaigrette|Blue cheese dressing|Chipotle mayo|Sriracha mayo|
  Tandoori mayo|Sambal|Gochujang|Chili crisp|Plum sauce|Black bean sauce|Chili garlic sauce|Ponzu|Tonkatsu sauce|Furikake|Miso|
  Harissa|Toum|Muhammara|Labneh|Taramasalata|Tapenade|Romesco|Salsa verde|Mole|Queso|Enchilada sauce|Bearnaise|Veloute|
  Beurre blanc|Vodka sauce|Brown sauce|Salad cream|Piccalilli|Onion chutney|Peanut chutney|Gongura pachadi|Thecha|Avakaya|
  Mixed pickle|Garlic pickle|Chilli pickle|Murabba|Chunda|Podi|Kasundi|Wholegrain mustard|English mustard|Burger sauce|
  Steak sauce|Mushroom sauce|Peppercorn sauce|Mint jelly|Lemon curd|Golden syrup|Butterscotch sauce|Custard|Hot fudge|
  Nuoc cham|Kecap manis|Tamari|Eel sauce|Spicy mayo|Ajvar|Chermoula|Mojo|French onion dip|Spinach dip|Remoulade|Au jus|
  Malt vinegar|Apple cider vinegar|Rice vinegar|Kimchi|Pickled ginger|Pickled onion|Sauerkraut|Capers|Chilli vinegar|
  Green chilli sauce|Ginger chutney|Sesame chutney|Dates chutney|Gremolata|Dukkah|Crema|Chakalaka`,
 deep: `Ssamjang|Doenjang|Chogochujang|XO sauce|Mentsuyu|Yuzu kosho|Okonomiyaki sauce|Tare|Yum yum sauce|Char siu sauce|
  Doubanjiang|Sacha sauce|Black vinegar|Sweet bean sauce|Nam prik|Zhug|Skordalia|Amba|Shatta|Lyutenitsa|Tkemali|Adjika|Shito|
  Awaze|Pique|Salsa macha|Adobo sauce|Huancaina sauce|Pebre|Aji|Espagnole|Mornay|Demi-glace|Bordelaise|Chasseur|Diane sauce|
  Bread sauce|Cumberland sauce|Redcurrant jelly|Apple butter|Rouille|Pistou|Persillade|Bagna cauda|Agrodolce|Gribiche|
  Mignonette|Fry sauce|Comeback sauce|Banana ketchup|Curry ketchup|Chow-chow|Seven-layer dip|Bean dip|Kara chutney|
  Tomato thokku|Inji puli|Sambharo|Hara namak|Nga pi|Sambal matah|Bumbu`,
 aliases: {
  'Tomato ketchup': 'Ketchup', 'Tomato sauce': 'Ketchup', 'Catsup': 'Ketchup', 'Mayo': 'Mayonnaise', 'Veg mayo': 'Mayonnaise', 'Eggless mayo': 'Mayonnaise', 'Yellow mustard': 'Mustard',
  'Mustard sauce': 'Mustard', 'Soya sauce': 'Soy sauce', 'Shoyu': 'Soy sauce', 'Tabasco': 'Hot sauce', 'Red chilli sauce': 'Chili sauce', 'Chilli sauce': 'Chili sauce', 'Red chili sauce': 'Chili sauce',
  'BBQ sauce': 'Barbecue sauce', 'Barbeque sauce': 'Barbecue sauce', 'Pudina chutney': 'Mint chutney', 'Hari chutney': 'Green chutney', 'Coriander chutney': 'Green chutney',
  'Dhaniya chutney': 'Green chutney', 'Dhania chutney': 'Green chutney', 'Nariyal chutney': 'Coconut chutney', 'Thengai chutney': 'Coconut chutney', 'Imli chutney': 'Tamarind chutney',
  'Meethi chutney': 'Tamarind chutney', 'Saunth chutney': 'Tamarind chutney', 'Achar': 'Pickle', 'Achaar': 'Pickle', 'Pickles': 'Pickle', 'Aam ka achar': 'Mango pickle',
  'Aam achar': 'Mango pickle', 'Salsa roja': 'Salsa', 'Guac': 'Guacamole', 'Houmous': 'Hummus', 'Hommus': 'Hummus', 'Ranch dressing': 'Ranch', 'Basil pesto': 'Pesto', 'Pesto sauce': 'Pesto',
  'White vinegar': 'Vinegar', 'Sirka': 'Vinegar', 'Szechuan sauce': 'Schezwan sauce', 'Schezwan chutney': 'Schezwan sauce', 'Sichuan sauce': 'Schezwan sauce', 'Boondi raita': 'Raita',
  'Namak': 'Salt', 'Table salt': 'Salt', 'Jelly': 'Jam', 'Fruit jam': 'Jam', 'Shahad': 'Honey', 'PB': 'Peanut butter', 'Tzaziki': 'Tzatziki', 'Lea and Perrins': 'Worcestershire sauce',
  'Worcester sauce': 'Worcestershire sauce', 'Brown gravy': 'Gravy', 'Tartare sauce': 'Tartar sauce', '1000 Island': 'Thousand Island', 'Thousand Island dressing': 'Thousand Island',
  'Honey mustard sauce': 'Honey mustard', 'Garlic mayo': 'Aioli', 'Garlic mayonnaise': 'Aioli', 'Peri peri': 'Peri peri sauce', 'Piri piri sauce': 'Peri peri sauce', 'Nando\'s sauce': 'Peri peri sauce',
  'Sweet chilli sauce': 'Sweet chili sauce', 'Thai sweet chili sauce': 'Sweet chili sauce', 'Hoisin': 'Hoisin sauce', 'Nam pla': 'Fish sauce', 'Nuoc mam': 'Fish sauce', 'Teriyaki': 'Teriyaki sauce',
  'Chilli oil': 'Chili oil', 'Tahina': 'Tahini', 'Tahini sauce': 'Tahini', 'Baba ghanoush': 'Baba ganoush', 'Baba ghanouj': 'Baba ganoush', 'Pico': 'Pico de gallo', 'Salsa fresca': 'Pico de gallo',
  'Nacho cheese sauce': 'Nacho cheese', 'Cheese dip': 'Queso', 'Chile con queso': 'Queso', 'Salsa con queso': 'Queso', 'White sauce': 'Bechamel', 'Bechamel sauce': 'Bechamel',
  'Marinara sauce': 'Marinara', 'Pasta sauce': 'Marinara', 'Red sauce': 'Marinara', 'Alfredo': 'Alfredo sauce', 'Ragu': 'Bolognese sauce', 'Bolognese': 'Bolognese sauce',
  'Lehsun chutney': 'Garlic chutney', 'Lasun chutney': 'Garlic chutney', 'Sweet mango chutney': 'Mango chutney', 'Nimbu achar': 'Lime pickle', 'Lemon pickle': 'Lime pickle',
  'Dijon': 'Dijon mustard', 'Wing sauce': 'Buffalo sauce', 'Sweet n sour sauce': 'Sweet and sour sauce', 'Satay sauce': 'Peanut sauce', 'Balsamic': 'Balsamic vinegar',
  'Balsamic glaze': 'Balsamic vinegar', 'Chocolate syrup': 'Chocolate sauce', 'Caramel': 'Caramel sauce', 'Whipped topping': 'Whipped cream', 'Orange marmalade': 'Marmalade',
  'Sweet relish': 'Relish', 'Pickle relish': 'Relish', 'Pepper': 'Black pepper', 'Kali mirch': 'Black pepper', 'Extra virgin olive oil': 'Olive oil', 'Applesauce': 'Apple sauce',
  'Prawn cocktail sauce': 'Cocktail sauce', 'Marie Rose sauce': 'Cocktail sauce', 'Marie Rose': 'Cocktail sauce', 'Caesar': 'Caesar dressing',
  'Blue cheese dip': 'Blue cheese dressing', 'Chipotle mayonnaise': 'Chipotle mayo', 'Sambal oelek': 'Sambal', 'Red pepper paste': 'Gochujang',
  'Chilli crisp': 'Chili crisp', 'Duck sauce': 'Plum sauce', 'Chinese plum sauce': 'Plum sauce', 'Chilli garlic sauce': 'Chili garlic sauce',
  'Katsu sauce': 'Tonkatsu sauce', 'Miso paste': 'Miso', 'Lebanese garlic sauce': 'Toum', 'Garlic sauce': 'Toum', 'Taramosalata': 'Taramasalata', 'Olive tapenade': 'Tapenade',
  'Mole poblano': 'Mole', 'Bearnaise sauce': 'Bearnaise', 'HP sauce': 'Brown sauce', 'Pyaz chutney': 'Onion chutney', 'Groundnut chutney': 'Peanut chutney',
  'Shengdana chutney': 'Peanut chutney', 'Gongura chutney': 'Gongura pachadi', 'Avakai': 'Avakaya', 'Mirchi ka achar': 'Chilli pickle', 'Green chilli pickle': 'Chilli pickle',
  'Lehsun ka achar': 'Garlic pickle', 'Aam ka murabba': 'Murabba', 'Amla murabba': 'Murabba', 'Chundo': 'Chunda', 'Gunpowder': 'Podi', 'Idli podi': 'Podi', 'Milagai podi': 'Podi',
  'Chutney powder': 'Podi', 'Bengali mustard sauce': 'Kasundi', 'Grain mustard': 'Wholegrain mustard', 'A1 sauce': 'Steak sauce', 'A1': 'Steak sauce', 'Pepper sauce': 'Peppercorn sauce',
  'Butterscotch': 'Butterscotch sauce', 'Custard sauce': 'Custard', 'Creme anglaise': 'Custard', 'Fudge sauce': 'Hot fudge', 'Sweet soy sauce': 'Kecap manis', 'Unagi sauce': 'Eel sauce',
  'Mojo sauce': 'Mojo', 'Onion dip': 'French onion dip', 'Spinach artichoke dip': 'Spinach dip', 'Jus': 'Au jus', 'Cider vinegar': 'Apple cider vinegar', 'Gari': 'Pickled ginger',
  'Sushi ginger': 'Pickled ginger', 'Pickled onions': 'Pickled onion', 'Caper': 'Capers', 'Green chili sauce': 'Green chilli sauce', 'Inji chutney': 'Ginger chutney',
  'Til chutney': 'Sesame chutney', 'Ellu chutney': 'Sesame chutney', 'Khajur imli chutney': 'Tamarind chutney', 'Imli ki chutney': 'Tamarind chutney', 'Khajur chutney': 'Dates chutney', 'Date chutney': 'Dates chutney',
  'Mexican crema': 'Crema', 'Soybean paste': 'Doenjang', 'Chili bean paste': 'Doubanjiang', 'Toban djan': 'Doubanjiang', 'Shacha sauce': 'Sacha sauce',
  'Chinkiang vinegar': 'Black vinegar', 'Zhoug': 'Zhug', 'Skhug': 'Zhug', 'Mango pickle sauce': 'Amba', 'Lutenitsa': 'Lyutenitsa', 'Ajika': 'Adjika',
  'Aji sauce': 'Aji', 'Aji verde': 'Aji', 'Demi glace': 'Demi-glace', 'Chow chow relish': 'Chow-chow', '7 layer dip': 'Seven-layer dip',
  'Kara chatni': 'Kara chutney', 'Allam pachadi': 'Ginger chutney', 'Pahadi namak': 'Hara namak'
 }
};
