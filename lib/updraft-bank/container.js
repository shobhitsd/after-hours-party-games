export default {
 id: 'container',
 title: 'Name a bag, box or container',
 icon: '👜',
 note: 'Anything that holds things.',
 common: `Bag|Box|Bottle|Jar|Basket|Bucket|Tin|Can|Carton|Crate|Suitcase|Backpack|Handbag|Purse|Wallet|Envelope|Barrel|
  Tank|Trunk|Sack|Pouch|Lunch box|Dustbin|Packet|Jug|Flask|Vase|Bowl|Pot|Tiffin|School bag|Plastic bag|Shopping bag|
  Gift box|Pencil box|Toolbox|Jewellery box|Matchbox|Shoebox`,
 uncommon: `Tote bag|Sling bag|Clutch|Duffel bag|Briefcase|Laptop bag|Messenger bag|Satchel|Trolley bag|Fanny pack|Paper bag|
  Jute bag|Cloth bag|Gunny bag|Garbage bag|Ziploc bag|Recycling bin|Laundry basket|Hamper|Picnic basket|Cardboard box|
  Pizza box|Cooler box|Water bottle|Canteen|Jerrycan|Gas cylinder|Drum|Keg|Cask|Tub|Watering can|Oil can|Container|
  Canister|Cookie jar|Biscuit tin|Piggy bank|Safe|Cash box|Treasure chest|Toy box|Chest|Coffin|Urn|Pitcher|Matka|
  Letter box|Pencil case|Sachet|Flower pot|Cage|Shipping container|Parcel|Egg carton|Lunch bag|Thermos|Vanity bag`,
 rare: `Kitbag|Doctor's bag|Diaper bag|Camera bag|Golf bag|Saddlebag|Mailbag|Sandbag|Goody bag|Doggy bag|Toiletry bag|
  Makeup bag|Glasses case|Card holder|Coin purse|Money belt|Sewing box|First aid box|Pill box|Ring box|Trinket box|
  Hat box|Gift bag|Dumpster|Compost bin|Silo|Cistern|Aquarium|Fish bowl|Birdcage|Planter|Hip flask|Beaker|Test tube|
  Vial|Cauldron|Carafe|Decanter|Kalash|Surahi|Lota|Handi|Pitara|Sandook|Jhola|Potli|Batua|Garment bag|Portfolio|
  Juice box|Takeaway box|Tube|Spray bottle|Feeding bottle|Ballot box|Donation box|Tip jar|Suggestion box|Bread box|
  Spice box|Tea caddy|Ice bucket|Bento box|Tackle box|Quiver|Scabbard|Mess tin|Lockbox|Strongbox|Shoe bag|Laundry bag|
  Drawstring bag|Bucket bag|Hobo bag|Wristlet|Crossbody bag|Weekender bag|Carry-on`,
 deep: `Carpet bag|Pannier|Vanity case|Snuff box|Cigar box|Humidor|Steamer trunk|Footlocker|Skip|Wheelie bin|Hopper|
  Terrarium|Window box|Amphora|Wineskin|Calabash|Conical flask|Petri dish|Ampoule|Crucible|Firkin|Hogshead|Demijohn|
  Carboy|Growler|Flagon|Ewer|Coffer|Reliquary|Sarcophagus|Time capsule|Blister pack|Dropper bottle|Squeeze bottle|
  Net bag|Haversack|Dilly bag|Pyxis|Tantalus|Casket|Ossuary|Puncheon|Tun|Bota bag|Etui|Minaudiere|Reticule|Sporran|Pochette|Musette bag|Bindle|Furoshiki|Bilum`,
 aliases: {
  'Thaila': 'Bag', 'Thaili': 'Pouch', 'Dibba': 'Box', 'Dabba': 'Box', 'Daba': 'Box', 'Bottal': 'Bottle', 'Tokri': 'Basket', 'Tokra': 'Basket',
  'Balti': 'Bucket', 'Pail': 'Bucket', 'Tin can': 'Tin', 'Tetra Pak': 'Carton', 'Milk carton': 'Carton', 'Luggage': 'Suitcase',
  'Rucksack': 'Backpack', 'Knapsack': 'Backpack', 'Bagpack': 'Backpack', 'Pithu': 'Backpack', 'Pitthu': 'Backpack', 'Hand bag': 'Handbag',
  'Batwa': 'Wallet', 'Billfold': 'Wallet', 'Water tank': 'Tank', 'Peti': 'Trunk', 'Bori': 'Sack', 'Lunchbox': 'Lunch box', 'Trash can': 'Dustbin',
  'Garbage can': 'Dustbin', 'Rubbish bin': 'Dustbin', 'Waste bin': 'Dustbin', 'Bin': 'Dustbin', 'Kooda daan': 'Dustbin', 'Packet bag': 'Packet',
  'Tiffin box': 'Tiffin', 'Tiffin carrier': 'Tiffin', 'Thermos flask': 'Thermos', 'Belt bag': 'Fanny pack', 'Gourd': 'Calabash', 'Bin bag': 'Garbage bag','Polythene bag': 'Plastic bag', 'Polybag': 'Plastic bag', 'Panni': 'Plastic bag',
  'Carry bag': 'Shopping bag', 'Tool box': 'Toolbox', 'Tool kit': 'Toolbox', 'Jewelry box': 'Jewellery box', 'Jewellery case': 'Jewellery box',
  'Shoe box': 'Shoebox', 'Match box': 'Matchbox', 'Tote': 'Tote bag', 'Gym bag': 'Duffel bag', 'Duffle bag': 'Duffel bag', 'Holdall': 'Duffel bag',
  'Attache case': 'Briefcase', 'Office bag': 'Laptop bag', 'Trolley': 'Trolley bag', 'Roller bag': 'Trolley bag', 'Bum bag': 'Fanny pack',
  'Waist pouch': 'Fanny pack', 'Jute sack': 'Gunny bag', 'Gunny sack': 'Gunny bag', 'Bin liner': 'Garbage bag', 'Trash bag': 'Garbage bag',
  'Zip-lock bag': 'Ziploc bag', 'Freezer bag': 'Ziploc bag', 'Laundry hamper': 'Laundry basket', 'Gift hamper': 'Hamper', 'Ice box': 'Cooler box',
  'Cool box': 'Cooler box', 'Icebox': 'Cooler box', 'Ice chest': 'Cooler box', 'Cooler': 'Cooler box', 'Jerry can': 'Jerrycan', 'Cylinder': 'Gas cylinder',
  'LPG cylinder': 'Gas cylinder', 'Vat': 'Tub', 'Tupperware': 'Container', 'Storage container': 'Container', 'Money box': 'Piggy bank', 'Gullak': 'Piggy bank',
  'Tijori': 'Safe', 'Toy chest': 'Toy box', 'Mailbox': 'Letter box', 'Post box': 'Letter box', 'Postbox': 'Letter box', 'Ghada': 'Matka',
  'Gamla': 'Flower pot', 'Flowerpot': 'Flower pot', 'Plant pot': 'Flower pot', 'Pinjra': 'Cage', 'Package': 'Parcel', 'Egg box': 'Egg carton',
  'Egg tray': 'Egg carton', 'Vacuum flask': 'Thermos', 'Cosmetic bag': 'Vanity bag', 'Kit bag': 'Kitbag', 'Nappy bag': 'Diaper bag',
  'Party bag': 'Goody bag', 'Wash bag': 'Toiletry bag', 'Washbag': 'Toiletry bag', 'Spectacle case': 'Glasses case', 'Spectacles case': 'Glasses case',
  'Specs case': 'Glasses case', 'Chashma box': 'Glasses case', 'Card case': 'Card holder', 'Coin pouch': 'Coin purse', 'First aid kit': 'First aid box',
  'Medicine box': 'First aid box', 'Pill organiser': 'Pill box', 'Pill organizer': 'Pill box', 'Hatbox': 'Hat box', 'Skip bin': 'Dumpster',
  'Fishbowl': 'Fish bowl', 'Bird cage': 'Birdcage', 'Kalasham': 'Kalash', 'Kalasha': 'Kalash', 'Pitari': 'Pitara', 'Sanduk': 'Sandook',
  'Sandooq': 'Sandook', 'Jhola bag': 'Jhola', 'Potli bag': 'Potli', 'Suit bag': 'Garment bag', 'Takeout box': 'Takeaway box', 'Takeaway container': 'Takeaway box',
  'Baby bottle': 'Feeding bottle', 'Charity box': 'Donation box', 'Hundi': 'Donation box', 'Collection box': 'Donation box', 'Bread bin': 'Bread box',
  'Masala dabba': 'Spice box', 'Masala box': 'Spice box', 'Bento': 'Bento box', 'Sheath': 'Scabbard', 'Lock box': 'Lockbox', 'Weekender': 'Weekender bag',
  'Carry on': 'Carry-on', 'Cross-body bag': 'Crossbody bag', 'Dumpster bin': 'Dumpster', 'String bag': 'Net bag', 'Mesh bag': 'Net bag',
  'Canteen bottle': 'Canteen', 'Water skin': 'Wineskin', 'Waterskin': 'Wineskin', 'Lab flask': 'Conical flask', 'Erlenmeyer flask': 'Conical flask',
  'Petri plate': 'Petri dish', 'Toiletry kit': 'Toiletry bag', 'Dopp kit': 'Toiletry bag'
 }
};
