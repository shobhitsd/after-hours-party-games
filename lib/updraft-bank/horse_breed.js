export default {
 id: 'horse_breed',
 title: 'Name a horse or pony breed',
 icon: '🐎',
 common: `Arabian|Thoroughbred|Mustang|Shetland Pony|Clydesdale|Quarter Horse|Appaloosa|Friesian|Marwari|Shire|Andalusian|
  Percheron|Lipizzaner|Morgan|Paint Horse|Pinto|Palomino|Kathiawari|Miniature Horse`,
 uncommon: `Tennessee Walking Horse|Standardbred|American Saddlebred|Hanoverian|Trakehner|Akhal-Teke|Belgian|Haflinger|
  Icelandic Horse|Connemara Pony|Welsh Pony|Welsh Cob|Fjord Horse|Exmoor Pony|Dartmoor Pony|New Forest Pony|Highland Pony|
  Falabella|Lusitano|Paso Fino|Peruvian Paso|Criollo|Brumby|Gypsy Vanner|Irish Draught|Irish Sport Horse|Holsteiner|
  Oldenburg|Dutch Warmblood|Selle Francais|Camargue|Knabstrupper|Missouri Fox Trotter|Rocky Mountain Horse|Spiti Horse|
  Zanskari|Manipuri Pony|Bhutia Pony|Deccani|Sindhi Horse|Barb|Mongolian Horse|Przewalski's Horse|Suffolk Punch|Ardennes|
  Breton|Noriker|Shagya Arabian|Anglo-Arab|Cleveland Bay|Hackney|Fell Pony|Dales Pony|Australian Stock Horse|Waler|
  Chincoteague Pony|Pony of the Americas|Kiger Mustang|American Cream Draft|Orlov Trotter|Don Horse|Budyonny|Kabardin|
  Karabakh|Mangalarga Marchador|Azteca`,
 rare: `Boulonnais|Comtois|Auxois|Poitevin|Dole Gudbrandsdal|North Swedish Horse|Finnhorse|Gotland Pony|Konik|Hucul|Tarpan|
  Eriskay Pony|Hackney Pony|Welsh Mountain Pony|Kerry Bog Pony|Caspian Horse|Turkoman Horse|Karabair|Lokai|Russian Trotter|
  Vladimir Heavy Draft|Russian Heavy Draft|Soviet Heavy Draft|Yakutian Horse|Bashkir Horse|American Bashkir Curly|Campolina|
  Galiceno|Florida Cracker Horse|Marsh Tacky|Banker Horse|Sable Island Horse|Spanish Mustang|Colonial Spanish Horse|Nokota|
  Canadian Horse|Newfoundland Pony|Spotted Saddle Horse|Racking Horse|Morab|Swedish Warmblood|Danish Warmblood|Westphalian|
  Rhinelander|Wurttemberger|Bavarian Warmblood|Brandenburger|Mecklenburger|Zangersheide|Belgian Warmblood|Frederiksborg|
  Jutland|Kladruber|Hispano-Arabe|Cartujano|Sorraia|Garrano|Pottok|Merens|Spanish Barb`,
 deep: `Nonius|Furioso-North Star|Gidran|Landais|Bardigiano|Maremmano|Murgese|Salernitano|Giara Horse|Esperia Pony|
  Bosnian Mountain Horse|Pindos Pony|Skyros Pony|Arab-Barb|Dongola|Basuto Pony|Boerperd|Nooitgedacht|Namib Desert Horse|
  Senner|Dulmen Pony|Black Forest Horse|Schleswig Coldblood|Rhenish German Coldblood|Trait du Nord|Italian Heavy Draft|
  Malopolski|Wielkopolski|Silesian Horse|Tori Horse|Estonian Native|Latvian Horse|Zemaitukas|Nordland Horse|Faroe Pony|
  Chumarti|Kazakh Horse|Kyrgyz Horse|Tibetan Pony|Hokkaido Pony|Kiso Horse|Jeju Horse|Batak Pony|Sandalwood Pony|
  Timor Pony|Australian Pony`,
 aliases: {
  'Arab': 'Arabian', 'Arabian Horse': 'Arabian', 'Arab Horse': 'Arabian', 'TB': 'Thoroughbred',
  'Shetland': 'Shetland Pony', 'American Quarter Horse': 'Quarter Horse', 'Appy': 'Appaloosa', 'Friesian Horse': 'Friesian',
  'Marwari Horse': 'Marwari', 'Malani': 'Marwari', 'Kathi': 'Kathiawari', 'Kathiawadi': 'Kathiawari', 'Shire Horse': 'Shire',
  'PRE': 'Andalusian', 'Pura Raza Espanola': 'Andalusian', 'Spanish Horse': 'Andalusian', 'Lipizzan': 'Lipizzaner',
  'Morgan Horse': 'Morgan', 'American Paint Horse': 'Paint Horse', 'Paint': 'Paint Horse', 'Mini horse': 'Miniature Horse',
  'American Miniature Horse': 'Miniature Horse', 'Tennessee Walker': 'Tennessee Walking Horse', 'Walking Horse': 'Tennessee Walking Horse',
  'Saddlebred': 'American Saddlebred', 'Teke': 'Akhal-Teke', 'Belgian Draft': 'Belgian', 'Brabant': 'Belgian',
  'Belgian Heavy Draft': 'Belgian', 'Avelignese': 'Haflinger', 'Icelandic': 'Icelandic Horse', 'Icelandic Pony': 'Icelandic Horse',
  'Connemara': 'Connemara Pony', 'Norwegian Fjord': 'Fjord Horse', 'Fjord': 'Fjord Horse', 'Exmoor': 'Exmoor Pony',
  'Dartmoor': 'Dartmoor Pony', 'New Forest': 'New Forest Pony', 'Highland': 'Highland Pony', 'Garron': 'Highland Pony',
  'Paso': 'Paso Fino', 'Peruvian Horse': 'Peruvian Paso', 'Crioulo': 'Criollo', 'Gypsy Cob': 'Gypsy Vanner', 'Irish Cob': 'Gypsy Vanner',
  'Tinker': 'Gypsy Vanner', 'Gypsy Horse': 'Gypsy Vanner', 'Irish Draft': 'Irish Draught', 'KWPN': 'Dutch Warmblood',
  'Holstein': 'Holsteiner', 'Knabstrup': 'Knabstrupper', 'Fox Trotter': 'Missouri Fox Trotter', 'Spiti Pony': 'Spiti Horse',
  'Zanskari Pony': 'Zanskari', 'Manipuri': 'Manipuri Pony', 'Meitei Sagol': 'Manipuri Pony', 'Bhutia': 'Bhutia Pony',
  'Barbary Horse': 'Barb', 'Barb Horse': 'Barb', 'Mongolian Pony': 'Mongolian Horse', 'Takhi': "Przewalski's Horse",
  'Asian wild horse': "Przewalski's Horse", 'Suffolk': 'Suffolk Punch', 'Suffolk Horse': 'Suffolk Punch', 'Ardennais': 'Ardennes',
  'Breton Horse': 'Breton', 'Noric': 'Noriker', 'Pinzgauer': 'Noriker', 'Anglo-Arabian': 'Anglo-Arab', 'Hackney Horse': 'Hackney',
  'Fell': 'Fell Pony', 'Dales': 'Dales Pony', 'Stock Horse': 'Australian Stock Horse', 'Chincoteague': 'Chincoteague Pony',
  'Assateague Pony': 'Chincoteague Pony', 'POA': 'Pony of the Americas', 'Kiger': 'Kiger Mustang', 'Orlov': 'Orlov Trotter',
  'Budenny': 'Budyonny', 'Kabarda': 'Kabardin', 'Mangalarga': 'Mangalarga Marchador', 'Dole Horse': 'Dole Gudbrandsdal',
  'Finnish Horse': 'Finnhorse', 'Gotland Russ': 'Gotland Pony', 'Polish Konik': 'Konik', 'Huzul': 'Hucul', 'Hutsul': 'Hucul',
  'Caspian': 'Caspian Horse', 'Turkmen Horse': 'Turkoman Horse', 'Bashkir Curly': 'American Bashkir Curly',
  'Curly Horse': 'American Bashkir Curly', 'Cracker Horse': 'Florida Cracker Horse', 'Outer Banks Horse': 'Banker Horse',
  'Furioso': 'Furioso-North Star', 'Carthusian': 'Cartujano', 'Basque Pony': 'Pottok', 'Ariegeois Pony': 'Merens',
  'Ariege Pony': 'Merens', 'Boer Horse': 'Boerperd', 'Dulmener': 'Dulmen Pony', 'Black Forest Chestnut': 'Black Forest Horse',
  'Nordlandshest': 'Nordland Horse', 'Lyngshest': 'Nordland Horse', 'Faroese Horse': 'Faroe Pony', 'Chummarti': 'Chumarti',
  'Dosanko': 'Hokkaido Pony', 'Jeju Pony': 'Jeju Horse', 'Waler Horse': 'Waler', 'Clydesdale Horse': 'Clydesdale',
  'Percheron Horse': 'Percheron', 'Appaloosa Horse': 'Appaloosa', 'Mustang Horse': 'Mustang', 'Pinto Horse': 'Pinto',
  'Palomino Horse': 'Palomino', 'Kathiawari Horse': 'Kathiawari', 'Shetland Pony Horse': 'Shetland Pony',
  'Akhal Teke Horse': 'Akhal-Teke', 'Lusitano Horse': 'Lusitano', 'Lipizzaner Horse': 'Lipizzaner', 'Don': 'Don Horse',
  'Tarpan Horse': 'Tarpan', 'Brumbies': 'Brumby'
 }
};
