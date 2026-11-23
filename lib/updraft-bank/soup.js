export default {
 id: 'soup',
 title: 'Name a soup or stew',
 icon: '🍲',
 note: 'Any cuisine.',
 common: `Tomato soup|Chicken soup|Sweet corn soup|Hot and sour soup|Manchow soup|Mushroom soup|Vegetable soup|Lentil soup|Minestrone|
  Clam chowder|French onion soup|Pumpkin soup|Miso soup|Rasam|Sambar|Chicken stew|Beef stew|Irish stew|Goulash|Ramen|Pho|Tom yum|
  Wonton soup|Chicken noodle soup|Chili`,
 uncommon: `Mulligatawny|Borscht|Gazpacho|Potato soup|Chowder|Bisque|Lobster bisque|Shorba|Lemon coriander soup|Thukpa|Egg drop soup|
  Tom kha gai|Laksa|Gumbo|Split pea soup|Potato leek soup|Butternut squash soup|Tortilla soup|Hot pot|Spinach soup|Corn chowder|
  Bouillabaisse|Ratatouille|Cassoulet|Coq au vin|Beef bourguignon|Dal|Clear soup|Broccoli soup|Carrot soup|Cream of chicken soup|
  Mutton soup|Paya|Kimchi jjigae|Nihari|Haleem`,
 rare: `Ishtu|Talumein|Ribollita|Pasta e fagioli|Zuppa toscana|Italian wedding soup|Cioppino|Vichyssoise|Consomme|Feijoada|Moqueca|Tagine|
  Pozole|Menudo|Sancocho|Harira|Avgolemono|Scotch broth|Oxtail soup|Pea and ham soup|Lancashire hotpot|Chicken paprikash|Etouffee|
  Fish chowder|Black bean soup|Broccoli cheddar soup|Bak kut teh|Sinigang|Sundubu jjigae|Samgyetang|Oden|Nabe|Sukiyaki|Shabu shabu|
  Bird's nest soup|Beef noodle soup|Bun bo Hue|Khao soi|Soto ayam|Bakso|Mohinga|Kadhi|Irish coddle|
  Matzo ball soup|Chicken corn soup|
  Dalma|Thenthuk|Pot-au-feu|Salmorejo|Caldo verde|Solyanka|Okroshka|Bigos|Fesenjan|Ghormeh sabzi|Egusi soup|Pepper soup|Mafe|Doro wat|Callaloo|Brunswick stew|Navy bean soup|Cullen skink|Cock-a-leekie|Tinola|Bulalo|Kare-kare|Arroz caldo|Doenjang jjigae|Budae jjigae|Tteokguk|Miyeokguk|Gamjatang|Canh chua|Bun rieu|Bo kho|Lagman|Kuzhambu|Mor kuzhambu|Sopa de ajo|Ajiaco`,
 deep: `Stracciatella|Garbure|Blanquette de veau|Navarin|Daube|Soupe au pistou|Ajoblanco|Cocido|Fabada|Caldo gallego|Halaszle|Shchi|
  Ukha|Rassolnik|Zurek|Rosol|Fasolada|Magiritsa|Stifado|Tarator|Ezogelin soup|Chorba|Molokhia|Ash reshteh|
  Abgoosht|Groundnut soup|Potjiekos|Sopa de lima|Caldo de res|Albondigas soup|Chupe de camarones|Locro|Cazuela|Pepperpot|Burgoo|She-crab soup|
  Cawl|Scouse|Brown Windsor soup|Porkolt|Waterzooi|Carbonnade|Erwtensoep|Eintopf|Leberknodelsuppe|Frittatensuppe|Lohikeitto|Fiskesuppe|
  Kjotsupa|Batchoy|Sopas|Nilaga|Galbitang|Seolleongtang|Yukgaejang|Haejangguk|Tonjiru|Chanko nabe|Zoni|Suimono|
  Winter melon soup|Buddha jumps over the wall|West Lake beef soup|Lotus root soup|Hu tieu|Boat noodles|Tom saap|Sop buntut|Rawon|Samlor korko|Shurpa|Kharcho|
  Chakapuli|Khash|Bozbash|Piti|Dovga`,
 aliases: {
  'Cream of tomato': 'Tomato soup', 'Tomato shorba': 'Shorba', 'Chicken shorba': 'Shorba', 'Mutton shorba': 'Shorba', 'Caldo de pollo': 'Chicken soup', 'Chicken broth': 'Chicken soup',
  'Corn soup': 'Sweet corn soup', 'Veg sweet corn soup': 'Sweet corn soup', 'Chicken sweet corn soup': 'Sweet corn soup', 'Hot n sour soup': 'Hot and sour soup', 'Manchow': 'Manchow soup',
  'Cream of mushroom': 'Mushroom soup', 'Cream of mushroom soup': 'Mushroom soup', 'Veg soup': 'Vegetable soup', 'Mixed vegetable soup': 'Vegetable soup', 'Dal soup': 'Lentil soup',
  'Masoor dal soup': 'Lentil soup', 'Mercimek corbasi': 'Lentil soup', 'Linsensuppe': 'Lentil soup', 'Minestrone soup': 'Minestrone', 'New England clam chowder': 'Clam chowder',
  'Manhattan clam chowder': 'Clam chowder', 'Onion soup': 'French onion soup', 'Soupe a l oignon': 'French onion soup', 'Miso shiru': 'Miso soup', 'Misoshiru': 'Miso soup',
  'Saaru rasam': 'Rasam', 'Chaaru': 'Rasam', 'Pepper rasam': 'Rasam', 'Tomato rasam': 'Rasam', 'Mysore rasam': 'Rasam', 'Sambhar': 'Sambar',
  'Gulyas': 'Goulash', 'Gulasch': 'Goulash', 'Gulaschsuppe': 'Goulash', 'Ramen noodles': 'Ramen', 'Pho bo': 'Pho', 'Tom yum soup': 'Tom yum', 'Tom yam': 'Tom yum',
  'Wonton noodle soup': 'Wonton soup', 'Chicken noodle': 'Chicken noodle soup', 'Chili con carne': 'Chili', 'Chilli con carne': 'Chili', 'Beef chili': 'Chili',
  'Mulligatawny soup': 'Mulligatawny', 'Borsch': 'Borscht', 'Borshch': 'Borscht', 'Beetroot soup': 'Borscht', 'Kartoffelsuppe': 'Potato soup', 'Seafood chowder': 'Chowder',
  'Lobster soup': 'Lobster bisque', 'Crab bisque': 'Bisque', 'Shrimp bisque': 'Bisque', 'Lemon coriander': 'Lemon coriander soup', 'Gyathuk': 'Thukpa', 'Egg flower soup': 'Egg drop soup',
  'Tom kha': 'Tom kha gai', 'Tom kha kai': 'Tom kha gai', 'Curry laksa': 'Laksa', 'Pea soup': 'Split pea soup', 'Snert': 'Erwtensoep', 'Leek and potato soup': 'Potato leek soup',
  'Butternut soup': 'Butternut squash soup', 'Sopa de tortilla': 'Tortilla soup', 'Steamboat': 'Hot pot', 'Hotpot': 'Hot pot', 'Palak soup': 'Spinach soup',
  'Bourguignon': 'Beef bourguignon', 'Boeuf bourguignon': 'Beef bourguignon', 'Daal': 'Dal', 'Dhal': 'Dal', 'Cream of broccoli': 'Broccoli soup', 'Carrot ginger soup': 'Carrot soup',
  'Paya soup': 'Paya', 'Paya shorba': 'Paya', 'Trotter soup': 'Paya', 'Kimchi stew': 'Kimchi jjigae', 'Nalli nihari': 'Nihari', 'Kerala chicken stew': 'Ishtu', 'Kerala stew': 'Ishtu', 'Saaru': 'Rasam',
  'Pasta fagioli': 'Pasta e fagioli', 'Wedding soup': 'Italian wedding soup', 'Consomme soup': 'Consomme', 'Moqueca baiana': 'Moqueca', 'Tajine': 'Tagine', 'Posole': 'Pozole',
  'Avgolemono soup': 'Avgolemono', 'Paprikash': 'Chicken paprikash', 'Crawfish etouffee': 'Etouffee', 'Pork bone soup': 'Bak kut teh',
  'Soft tofu stew': 'Sundubu jjigae', 'Ginseng chicken soup': 'Samgyetang', 'Nabemono': 'Nabe', 'Shabu-shabu': 'Shabu shabu',
  'Dublin coddle': 'Irish coddle', 'Coddle': 'Irish coddle', 'Matzah ball soup': 'Matzo ball soup', 'Pistou': 'Soupe au pistou',
  'Garlic soup': 'Sopa de ajo', 'Fisherman\'s soup': 'Halaszle', 'Cabbage soup': 'Shchi', 'Sour rye soup': 'Zurek', 'Hunter\'s stew': 'Bigos',
  'Mloukhieh': 'Molokhia', 'Mulukhiyah': 'Molokhia', 'Dizi': 'Abgoosht', 'Fesenjoon': 'Fesenjan', 'Peanut stew': 'Mafe', 'Maafe': 'Mafe', 'Doro wot': 'Doro wat',
  'Caldo de albondigas': 'Albondigas soup', 'Partan bree': 'Cullen skink', 'Cock a leekie': 'Cock-a-leekie', 'Gaisburger Marsch': 'Eintopf', 'Liver dumpling soup': 'Leberknodelsuppe',
  'Salmon soup': 'Lohikeitto', 'Sinigang na baboy': 'Sinigang', 'Chicken tinola': 'Tinola', 'La Paz batchoy': 'Batchoy', 'Army stew': 'Budae jjigae', 'Short rib soup': 'Galbitang',
  'Ox bone soup': 'Seolleongtang', 'Rice cake soup': 'Tteokguk', 'Seaweed soup': 'Miyeokguk', 'Pork bone stew': 'Gamjatang', 'Hangover soup': 'Haejangguk', 'Butajiru': 'Tonjiru',
  'Ozoni': 'Zoni', 'Fo tiao qiang': 'Buddha jumps over the wall', 'Sour fish soup': 'Canh chua', 'Bun bo': 'Bun bo Hue', 'Laghman': 'Lagman',
  'Shorpo': 'Shurpa', 'Chorpa': 'Shurpa', 'Kulambu': 'Kuzhambu', 'Morkuzhambu': 'Mor kuzhambu', 'Kadhi pakora': 'Kadhi'
 }
};
