export default {
 id: 'metal',
 title: 'Name a metal or alloy',
 icon: '⚙️',
 note: 'Metallic elements and alloys.',
 common: `Iron|Gold|Silver|Copper|Bronze|Brass|Steel|Aluminum|Lead|Tin|Zinc|Nickel|Titanium|Platinum|Mercury|
  Stainless steel|Magnesium|Sodium|Calcium|Potassium|Uranium|Lithium|Chromium|Cast iron`,
 uncommon: `Tungsten|Cobalt|Manganese|Plutonium|Radium|Pewter|Solder|White gold|Rose gold|Sterling silver|
  Wrought iron|Palladium|Cadmium|Bismuth|Barium|Iridium|Rhodium|Osmium|Molybdenum|Vanadium|Zirconium|Thorium|
  Gallium|Cesium|Strontium|Beryllium|Carbon steel|Mild steel|Amalgam|German silver|Bell metal|Gunmetal|Pig iron|
  Polonium|Francium|Antimony|Neodymium|Alloy steel|Electrum|Duralumin|Nichrome|Rubidium|Galvanized steel|TMT steel|Yellow gold|Sponge iron|Surgical steel|Green gold|Tinplate|
  High-carbon steel|Ductile iron|Grey iron|Malleable iron|Depleted uranium|Bidri`,
 rare: `Niobium|Ruthenium|Scandium|Tantalum|Thallium|Indium|Yttrium|Hafnium|Rhenium|Technetium|Lanthanum|Cerium|
  Actinium|Americium|Curium|Einsteinium|Californium|Fermium|Nobelium|Berkelium|Neptunium|Protactinium|Europium|
  Gadolinium|Mendelevium|Lawrencium|Samarium|Lutetium|Invar|Monel|Cupronickel|Damascus steel|Tool steel|
  High-speed steel|Spring steel|Inconel|Nitinol|Phosphor bronze|Aluminium bronze|Britannia metal|Type metal|
  Wootz steel|Galinstan|Nordic gold|White metal|Panchaloha|Constantan|Alnico|Babbitt|Zamak|Mu-metal|Hastelloy|
  Wood's metal|Crucible steel|Cast steel|Silicon bronze|Manganese bronze|Arsenical bronze|Aluminium brass|Gilding metal|
  Prince's metal|Purple gold|Tibetan silver|Blister steel|Shear steel|HSLA steel|Vanadium steel|Nickel steel|Tungsten steel|
  Bearing steel|White iron|Meteoric iron|Ferrovanadium|Ferromolybdenum|Ferrotitanium|Ferrotungsten|Spiegeleisen|Silicomanganese|
  Alclad|Aluminium-lithium alloy|Sheffield plate|Osmiridium|Platinum-iridium|Samarium-cobalt`,
 deep: `Dysprosium|Erbium|Holmium|Praseodymium|Promethium|Terbium|Thulium|Ytterbium|Rutherfordium|Dubnium|Seaborgium|
  Bohrium|Hassium|Meitnerium|Darmstadtium|Roentgenium|Copernicium|Nihonium|Flerovium|Moscovium|Livermorium|
  Billon|Magnalium|Pinchbeck|Tombac|Alumel|Chromel|Devarda's alloy|Fernico|Kanthal|Manganin|Nimonic|Permalloy|
  Stellite|Ticonal|Vitallium|Zircaloy|Rose's metal|Field's metal|Muntz metal|Admiralty brass|Dutch metal|
  Speculum metal|Corinthian bronze|Shakudo|Shibuichi|Tumbaga|Ashtadhatu|Kovar|Elinvar|Waspaloy|Incoloy|
  Maraging steel|Weathering steel|Chromoly|Silicon steel|Manganese steel|Bulat steel|Tamahagane|Ferrochrome|
  Ferromanganese|Ferrosilicon|Terne|Crown gold|Argentium|Goloid|Potin|Orichalcum|Hepatizon|Cartridge brass|
  Naval brass|Red brass|Beryllium copper|Cunife|Sendust|Supermalloy|Terfenol-D|Magnox|Elektron|Birmabright|
  Hiduminium|Y alloy|Silumin|NaK|Pot metal|Britannia silver|Coin silver|Staballoy|Mischmetal|Ferrocerium|
  Bismuth bronze|Ferroniobium|Ferroboron|Ferronickel|Ferrophosphorus|6061 aluminium|7075 aluminium|Arsenical copper|Rene 41|
  Ti-6Al-4V|Gum metal|Beta titanium|Elgiloy|Talonite|Cerrobend|AZ91|Kirksite|Cunico|Metglas|Vicalloy|Similor|Paktong`,
 aliases: {
  'Loha': 'Iron', 'Sona': 'Gold', 'Chandi': 'Silver', 'Tamba': 'Copper', 'Peetal': 'Brass', 'Pital': 'Brass',
  'Ispat': 'Steel', 'Aluminium': 'Aluminum', 'Jasta': 'Zinc', 'Quicksilver': 'Mercury', 'Para': 'Mercury',
  'Stainless': 'Stainless steel', 'SS': 'Stainless steel', 'Chrome': 'Chromium', 'Wolfram': 'Tungsten',
  'Sterling': 'Sterling silver', 'Caesium': 'Cesium', 'Dental amalgam': 'Amalgam', 'Nickel silver': 'German silver',
  'Kansa': 'Bell metal', 'Kaansa': 'Bell metal', 'Bell bronze': 'Bell metal',
  'Copper nickel': 'Cupronickel', 'Damascus': 'Damascus steel', 'HSS': 'High-speed steel', 'Aluminum bronze': 'Aluminium bronze',
  'Wootz': 'Wootz steel', 'Panchadhatu': 'Panchaloha', 'Panchdhatu': 'Panchaloha', 'Babbitt metal': 'Babbitt',
  'Wood metal': "Wood's metal", 'Devarda': "Devarda's alloy", 'Rose metal': "Rose's metal", 'Field metal': "Field's metal",
  'Corten': 'Weathering steel', 'Corten steel': 'Weathering steel', 'Chrome moly': 'Chromoly', 'Chromoly steel': 'Chromoly',
  'Electrical steel': 'Silicon steel', 'Hadfield steel': 'Manganese steel', 'Mangalloy': 'Manganese steel',
  'Argentium silver': 'Argentium', 'Beryllium bronze': 'Beryllium copper',
  'Galvanized iron': 'Galvanized steel', 'Galvanised steel': 'Galvanized steel', 'Galvanised iron': 'Galvanized steel', 'GI': 'Galvanized steel',
  'TMT': 'TMT steel', 'TMT bar': 'TMT steel', 'Thermo-mechanically treated steel': 'TMT steel', 'DRI': 'Sponge iron', 'Direct reduced iron': 'Sponge iron',
  'Surgical stainless steel': 'Surgical steel', 'Tin plate': 'Tinplate', 'High carbon steel': 'High-carbon steel', 'Low-carbon steel': 'Mild steel',
  'Nodular iron': 'Ductile iron', 'Spheroidal graphite iron': 'Ductile iron', 'Gray iron': 'Grey iron', 'Gray cast iron': 'Grey iron', 'Grey cast iron': 'Grey iron',
  'DU': 'Depleted uranium', 'Bidriware': 'Bidri', 'Red gold': 'Rose gold', 'Pink gold': 'Rose gold', 'Amethyst gold': 'Purple gold',
  'Aluminum brass': 'Aluminium brass', 'Aluminum-lithium alloy': 'Aluminium-lithium alloy', 'Al-Li alloy': 'Aluminium-lithium alloy',
  'High-strength low-alloy steel': 'HSLA steel', 'Spiegel': 'Spiegeleisen', 'Iridosmine': 'Osmiridium', 'SmCo': 'Samarium-cobalt',
  'Samarium cobalt magnet': 'Samarium-cobalt', '6061': '6061 aluminium', '6061 aluminum': '6061 aluminium', '7075': '7075 aluminium',
  '7075 aluminum': '7075 aluminium', 'Ti64': 'Ti-6Al-4V', 'Grade 5 titanium': 'Ti-6Al-4V', 'Mannheim gold': 'Similor', 'Pakfong': 'Paktong',
  'Alpaca silver': 'German silver', 'Argentan': 'German silver', 'Maillechort': 'German silver', 'Linotype metal': 'Type metal',
  'Spelter': 'Zinc', 'Chrome steel': 'Chromoly', 'Gunmetal bronze': 'Gunmetal', 'Asht dhatu': 'Ashtadhatu', 'Ashta dhatu': 'Ashtadhatu',
  'Ranga': 'Tin', 'Seesa': 'Lead', 'Sisa': 'Lead', 'Swarna': 'Gold', 'Rajat': 'Silver', 'Lauh': 'Iron', 'Tamra': 'Copper',
  'Fe': 'Iron', 'Au': 'Gold', 'Ag': 'Silver', 'Cu': 'Copper', 'Pb': 'Lead', 'Sn': 'Tin', 'Zn': 'Zinc', 'Hg': 'Mercury', 'Pt': 'Platinum',
  'Al': 'Aluminum', 'Ti': 'Titanium', 'Ni': 'Nickel', 'Mg': 'Magnesium', 'Na': 'Sodium', 'Li': 'Lithium', 'Cr': 'Chromium', 'Co': 'Cobalt',
  'Mn': 'Manganese', 'W': 'Tungsten', 'U': 'Uranium', 'Pu': 'Plutonium', 'Pd': 'Palladium', 'Ir': 'Iridium', 'Os': 'Osmium', 'Rh': 'Rhodium'
 }
};
