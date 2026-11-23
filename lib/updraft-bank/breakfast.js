export default {
 id: 'breakfast',
 title: 'Name a breakfast food',
 icon: '🥞',
 note: 'From poha and idli to pancakes.',
 common: `Poha|Upma|Idli|Dosa|Masala dosa|Paratha|Aloo paratha|Pancake|Waffle|Toast|Omelette|Scrambled eggs|Boiled egg|Fried egg|
  Cereal|Cornflakes|Oatmeal|Sandwich|Puri bhaji|Medu vada|Uttapam|Bagel|Croissant|Muffin|French toast|Bacon|Sausage|
  Hash browns|Yogurt|Muesli|Granola|Bread omelette|Egg bhurji`,
 uncommon: `Pongal|Thepla|Chilla|Sabudana khichdi|Misal pav|Dhokla|Appam|Puttu|Idiyappam|Rava dosa|Rava idli|Kachori|
  Chole bhature|Daliya|Fruit salad|Bread and butter|Bread and jam|Vada pav|Bun maska|Masala omelette|Poached egg|Crepe|
  English muffin|Eggs Benedict|Shakshuka|Breakfast burrito|Breakfast sandwich|Avocado toast|Cinnamon roll|Donut|
  Full English breakfast|Baked beans|Congee|Halwa puri|Sprouts|Neer dosa|Set dosa|Peanut butter toast|Cheese toast|Khichdi`,
 rare: `Pesarattu|Akki roti|Jalebi|Bedmi puri|Thalipeeth|Sheera|Khakhra|Fafda|Sabudana vada|Paniyaram|Adai|Kesari bath|
  Luchi|Sattu paratha|Gobi paratha|Paneer paratha|Mooli paratha|Methi paratha|Egg paratha|Keema pav|Akuri|Nihari|Paya|
  Scone|Biscuits and gravy|Grits|Home fries|Ham|Frittata|Quiche|Huevos rancheros|Danish pastry|Pain au chocolat|Overnight oats|
  Chia pudding|Parfait|Acai bowl|Smoothie bowl|Black pudding|Crumpet|Beans on toast|Corned beef hash|Chicken and waffles|
  Cream of wheat|Lox|Dutch baby|Banana bread|Coffee cake|Breakfast taco|Chilaquiles|Arepa|Dim sum|Youtiao|Jianbing|Bao|
  Miso soup|Tamagoyaki|Onigiri|Kaya toast|Nasi lemak|Roti canai|Banh mi|Pho|Pandesal|Ful medames|Falafel|Labneh|Manakish|
  Rosti|Brioche|Churros|Blini|Bacon and eggs|Upma kozhukattai|Semiya upma`,
 deep: `Handvo|Dahi chura|Ghugni|Pathiri|Kiribath|Eggs Florentine|Kippers|Kedgeree|Eggs and soldiers|Bubble and squeak|Blintz|
  Latke|Matzo brei|Johnnycake|Scrapple|Breakfast casserole|Pikelet|Popover|Kolache|Migas|Molletes|Pao de queijo|Gallo pinto|
  Mangu|Ackee and saltfish|Natto|Tapsilog|Longganisa|Champorado|Arroz caldo|Mohinga|Khao tom|Gyeran-ppang|Menemen|Simit|
  Mandazi|Akara|Koko|Tartine|Cornetto|Pan con tomate|Syrniki|Kasha|Ragi porridge|Kanji`,
 aliases: {
  'Kanda poha': 'Poha', 'Pohe': 'Poha', 'Aval': 'Poha', 'Uppuma': 'Upma', 'Uppittu': 'Upma', 'Khara bath': 'Upma', 'Idly': 'Idli', 'Dosai': 'Dosa', 'Plain dosa': 'Dosa',
  'Mysore masala dosa': 'Masala dosa', 'Parantha': 'Paratha', 'Parotha': 'Paratha', 'Aloo parantha': 'Aloo paratha', 'Pancakes': 'Pancake', 'Hotcakes': 'Pancake', 'Flapjacks': 'Pancake',
  'Belgian waffle': 'Waffle', 'Buttered toast': 'Toast', 'Butter toast': 'Toast', 'Bread toast': 'Toast', 'Omelet': 'Omelette', 'Plain omelette': 'Omelette', 'Scrambled egg': 'Scrambled eggs',
  'Hard boiled egg': 'Boiled egg', 'Soft boiled egg': 'Boiled egg', 'Sunny side up': 'Fried egg', 'Half fry': 'Fried egg', 'Over easy': 'Fried egg', 'Corn flakes': 'Cornflakes',
  'Porridge': 'Oatmeal', 'Oats': 'Oatmeal', 'Masala oats': 'Oatmeal', 'Veg sandwich': 'Sandwich', 'Grilled sandwich': 'Sandwich', 'Puri sabzi': 'Puri bhaji', 'Poori bhaji': 'Puri bhaji',
  'Aloo puri': 'Puri bhaji', 'Vada': 'Medu vada', 'Medu wada': 'Medu vada', 'Uthappam': 'Uttapam', 'Uttappam': 'Uttapam', 'Bagels': 'Bagel', 'Pain perdu': 'French toast',
  'Eggy bread': 'French toast', 'Streaky bacon': 'Bacon', 'Sausages': 'Sausage', 'Bangers': 'Sausage', 'Hash brown': 'Hash browns', 'Curd': 'Yogurt', 'Dahi': 'Yogurt', 'Yoghurt': 'Yogurt',
  'Bircher muesli': 'Muesli', 'Anda bhurji': 'Egg bhurji', 'Ven pongal': 'Pongal', 'Methi thepla': 'Thepla', 'Besan chilla': 'Chilla', 'Cheela': 'Chilla', 'Moong dal chilla': 'Chilla',
  'Sabudana khichadi': 'Sabudana khichdi', 'Misal': 'Misal pav', 'Khaman dhokla': 'Dhokla', 'Hoppers': 'Appam', 'Palappam': 'Appam', 'Pittu': 'Puttu', 'String hoppers': 'Idiyappam',
  'Rava dosai': 'Rava dosa', 'Khasta kachori': 'Kachori', 'Kochuri': 'Kachori', 'Chole bhatura': 'Chole bhature', 'Dalia': 'Daliya', 'Broken wheat porridge': 'Daliya',
  'Bread butter': 'Bread and butter', 'Bread jam': 'Bread and jam', 'Jam toast': 'Bread and jam', 'Vada pao': 'Vada pav', 'Maska pav': 'Bun maska', 'Crepes': 'Crepe',
  'Egg Benedict': 'Eggs Benedict', 'Avo toast': 'Avocado toast', 'Cinnamon bun': 'Cinnamon roll', 'Doughnut': 'Donut', 'Full English': 'Full English breakfast',
  'English breakfast': 'Full English breakfast', 'Fry up': 'Full English breakfast', 'Jook': 'Congee', 'Juk': 'Congee', 'Lugaw': 'Congee', 'Rice porridge': 'Congee',
  'Moong sprouts': 'Sprouts', 'Sprouts salad': 'Sprouts', 'Peanut butter sandwich': 'Peanut butter toast', 'Pesarattu dosa': 'Pesarattu', 'Akki rotti': 'Akki roti',
  'Bedmi poori': 'Bedmi puri', 'Suji halwa': 'Sheera', 'Rava sheera': 'Sheera', 'Kesari': 'Kesari bath', 'Appe': 'Paniyaram', 'Kuzhi paniyaram': 'Paniyaram', 'Paddu': 'Paniyaram',
  'Sattu parantha': 'Sattu paratha', 'Anda paratha': 'Egg paratha', 'Keema pao': 'Keema pav', 'Parsi akuri': 'Akuri', 'Nalli nihari': 'Nihari', 'Siri paya': 'Paya',
  'Scones': 'Scone', 'Home fried potatoes': 'Home fries', 'Danish': 'Danish pastry', 'Chocolate croissant': 'Pain au chocolat',
  'Yogurt parfait': 'Parfait', 'Blood sausage': 'Black pudding', 'Smoked salmon': 'Lox', 'Bagel and lox': 'Lox', 'German pancake': 'Dutch baby', 'Banana loaf': 'Banana bread',
  'Chinese doughnut': 'Youtiao', 'Steamed bun': 'Bao', 'Baozi': 'Bao', 'Japanese omelette': 'Tamagoyaki', 'Rice ball': 'Onigiri', 'Roti prata': 'Roti canai', 'Pan de sal': 'Pandesal',
  'Ful': 'Ful medames', "Man'oushe": 'Manakish', 'Manakeesh': 'Manakish', 'Rösti': 'Rosti', 'Churro': 'Churros', 'Blinis': 'Blini',
  'Dahi chuda': 'Dahi chura', 'Kipper': 'Kippers', 'Latkes': 'Latke', 'Matzah brei': 'Matzo brei', 'Johnny cake': 'Johnnycake', 'Drop scone': 'Pikelet',
  'Kolach': 'Kolache', 'Brazilian cheese bread': 'Pao de queijo', 'Tapsi': 'Tapsilog', 'Silog': 'Tapsilog', 'Longanisa': 'Longganisa', 'Gyeranppang': 'Gyeran-ppang',
  'Ragi malt': 'Ragi porridge', 'Ragi kanji': 'Ragi porridge', 'Nachni satva': 'Ragi porridge', 'Puttu kadala': 'Puttu', 'Idli sambar': 'Idli', 'Rava upma': 'Upma'
 }
};
