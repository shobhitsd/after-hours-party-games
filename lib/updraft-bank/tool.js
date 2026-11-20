export default {
 id: 'tool',
 title: 'Name a tool',
 icon: '🔧',
 note: 'Hand, power, garden or workshop tools.',
 common: `Hammer|Screwdriver|Wrench|Spanner|Pliers|Saw|Drill|Axe|Knife|Scissors|Shovel|Spade|Rake|Tape measure|Ruler|
  Ladder|Chisel|File|Crowbar|Sickle|Hoe|Pickaxe|Mallet|Sledgehammer|Hacksaw|Chainsaw|Spirit level|Clamp|Vice|
  Paintbrush|Trowel|Wheelbarrow|Lawn mower|Wire cutter|Tweezers|Tongs|Sandpaper|Torch|Toolbox|Plough|Needle|
  Allen key`,
 uncommon: `Glue gun|Soldering iron|Adjustable spanner|Pipe wrench|Jack|Anvil|Grinder|Sander|Jigsaw|Circular saw|
  Nail gun|Staple gun|Stapler|Paint roller|Spray gun|Blowtorch|Welding machine|Air compressor|Leaf blower|
  Hedge trimmer|Secateurs|Shears|Garden fork|Pitchfork|Watering can|Hose|Scythe|Machete|Hatchet|Utility knife|
  Penknife|Swiss army knife|Plunger|Protractor|Compass|Tester|Multimeter|Jackhammer|Lathe|Plane|Drill bit|
  Step ladder|Funnel|Pulley|Lever|Wedge|Winch|Magnifying glass|Can opener|Bottle opener|Corkscrew|Nutcracker|
  Scraper|Whetstone|Sprinkler|Weeder|Air pump|Socket wrench|Ratchet|Torque wrench|Electric screwdriver|
  Cordless drill|Hand drill|Bolt cutter|Angle grinder|Table saw|Heat gun|Set square|Vernier caliper|
  Nail clipper|Hole punch|Mortar and pestle|Scalpel|Thimble|Knitting needle|Tool belt|Khurpi|Punch`,
 rare: `Band saw|Mitre saw|Router|Planer|Drill press|Hammer drill|Impact driver|Impact wrench|Caulking gun|
  Grease gun|Rivet gun|Welding torch|Pressure washer|Strimmer|Loppers|Mattock|Bow saw|Coping saw|Tile cutter|
  Glass cutter|Pipe cutter|Tin snips|Multitool|Putty knife|Awl|Auger|Rasp|Hoist|Claw hammer|Rubber mallet|
  Bench grinder|Belt sander|Polisher|Wire brush|Sharpener|Caliper|Micrometer|T-square|Divider|Plumb bob|
  Voltmeter|Ammeter|Yardstick|Needle-nose pliers|Locking pliers|Wire stripper|Crimping tool|Pincers|Socket set|
  Lug wrench|Monkey wrench|Phillips screwdriver|Flathead screwdriver|C-clamp|Milling machine|Hydraulic press|
  Tiller|Thresher|Snow shovel|Ice pick|Squeegee|Forceps|Bellows|Concrete mixer|Potter's wheel|Sprayer|
  Reciprocating saw|Scroll saw|Adze|Sawhorse`,
 deep: `Billhook|Fretsaw|Tenon saw|Crosscut saw|Rip saw|Keyhole saw|Pruning saw|Nail punch|Bradawl|Gimlet|Brace|
  Tap and die|Reamer|Countersink|Spokeshave|Drawknife|Froe|Maul|Block and tackle|Ball-peen hammer|Club hammer|
  Dead blow hammer|Tack hammer|Geologist's hammer|Rotary hammer|Rotary tool|Orbital sander|Try square|
  Combination square|Speed square|Carpenter's square|Chalk line|Laser level|Feeler gauge|Dial gauge|Stud finder|
  Marking gauge|Scriber|Bevel|Folding rule|Slip joint pliers|Tongue-and-groove pliers|Side cutters|
  Circlip pliers|Lineman's pliers|Ring spanner|Basin wrench|Strap wrench|Spoke wrench|Tyre lever|Nut driver|
  Float|Hawk|Bolster|Cold chisel|Jointer|Tamper|Oil can|Seam ripper|Staple remover|Desoldering pump|Fish tape|
  Swage|Fuller|Bar clamp|Spring clamp|Mitre box|Jig|Arbor press|Pipe bender|Engraver|Plasma cutter|
  Oxy-acetylene torch|Brush cutter|Harrow|Seed drill|Winnowing fan|Flail|Post hole digger|Bulb planter|Edger|
  Aerator|Dutch hoe|Grafting knife|Ice axe|Digging bar|Drain snake|Palette knife|Gouge|Burin|Loupe|Mandrel|
  Jeweller's saw|Last|Lock pick|Hand axe|Hammerstone|Bow drill|Digging stick|Dibber`,
 aliases: {
  'Hathoda': 'Hammer', 'Hathodi': 'Hammer', 'Hathaura': 'Hammer', 'Pechkas': 'Screwdriver', 'Pechkash': 'Screwdriver',
  'Pana': 'Spanner', 'Plier': 'Pliers', 'Plas': 'Pliers', 'Handsaw': 'Saw', 'Aari': 'Saw',
  'Drill machine': 'Drill', 'Electric drill': 'Drill', 'Power drill': 'Drill', 'Drilling machine': 'Drill', 'Driller': 'Drill',
  'Ax': 'Axe', 'Kulhadi': 'Axe', 'Chaku': 'Knife', 'Chaaku': 'Knife', 'Scissor': 'Scissors', 'Kainchi': 'Scissors',
  'Belcha': 'Shovel', 'Phawda': 'Spade', 'Fawda': 'Spade',
  'Measuring tape': 'Tape measure', 'Inch tape': 'Tape measure', 'Tape': 'Tape measure', 'Measure tape': 'Tape measure',
  'Scale': 'Ruler', 'Rule': 'Ruler', 'Foot rule': 'Ruler', 'Seedhi': 'Ladder', 'Chheni': 'Chisel', 'Cheni': 'Chisel', 'Reti': 'File',
  'Sabbal': 'Crowbar', 'Pry bar': 'Crowbar', 'Wrecking bar': 'Crowbar', 'Jimmy': 'Crowbar', 'Jemmy': 'Crowbar',
  'Hansiya': 'Sickle', 'Daranti': 'Sickle', 'Darati': 'Sickle', 'Garden hoe': 'Hoe', 'Pick': 'Pickaxe', 'Gainti': 'Pickaxe',
  'Level': 'Spirit level', 'Bubble level': 'Spirit level', 'Leveller': 'Spirit level',
  'Vise': 'Vice', 'Bench vice': 'Vice', 'Bench vise': 'Vice', 'Brush': 'Paintbrush',
  'Mower': 'Lawn mower', 'Grass cutter': 'Lawn mower', 'Cutter': 'Wire cutter', 'Cutters': 'Wire cutter',
  'Tweezer': 'Tweezers', 'Tong': 'Tongs', 'Chimta': 'Tongs', 'Emery paper': 'Sandpaper', 'Regmal': 'Sandpaper',
  'Flashlight': 'Torch', 'Toolkit': 'Toolbox', 'Plow': 'Plough', 'Hal': 'Plough', 'Sewing needle': 'Needle', 'Sui': 'Needle',
  'Hex key': 'Allen key', 'Allen wrench': 'Allen key',
  'Hot glue gun': 'Glue gun', 'Solder': 'Soldering iron', 'Soldering gun': 'Soldering iron', 'Soldering machine': 'Soldering iron',
  'Adjustable wrench': 'Adjustable spanner', 'Shifting spanner': 'Adjustable spanner', 'Crescent wrench': 'Adjustable spanner',
  'Stillson wrench': 'Pipe wrench', 'Stillson': 'Pipe wrench', 'Car jack': 'Jack',
  'Grinding machine': 'Grinder', 'Sanding machine': 'Sander', 'Nailer': 'Nail gun', 'Roller': 'Paint roller',
  'Paint sprayer': 'Spray gun', 'Blowlamp': 'Blowtorch', 'Welder': 'Welding machine', 'Welding set': 'Welding machine',
  'Compressor': 'Air compressor', 'Pruning shears': 'Secateurs', 'Pruners': 'Secateurs', 'Garden scissors': 'Secateurs',
  'Garden shears': 'Shears', 'Hedge shears': 'Shears', 'Hedge clippers': 'Shears', 'Clippers': 'Shears',
  'Fork': 'Garden fork', 'Hay fork': 'Pitchfork', 'Hosepipe': 'Hose', 'Garden hose': 'Hose',
  'Box cutter': 'Utility knife', 'Stanley knife': 'Utility knife', 'Paper cutter': 'Utility knife', 'Craft knife': 'Utility knife',
  'Pocket knife': 'Penknife', 'Jackknife': 'Penknife',
  'Line tester': 'Tester', 'Voltage tester': 'Tester', 'Test pen': 'Tester',
  'Pneumatic drill': 'Jackhammer', 'Breaker': 'Jackhammer', 'Hand plane': 'Plane', 'Randa': 'Plane', 'Jack plane': 'Plane',
  'Magnifier': 'Magnifying glass', 'Magnifying lens': 'Magnifying glass', 'Tin opener': 'Can opener', 'Opener': 'Bottle opener',
  'Paint scraper': 'Scraper', 'Sharpening stone': 'Whetstone', 'Oilstone': 'Whetstone', 'Honing stone': 'Whetstone',
  'Pump': 'Air pump', 'Bicycle pump': 'Air pump', 'Cycle pump': 'Air pump', 'Socket spanner': 'Socket wrench',
  'Cordless screwdriver': 'Electric screwdriver', 'Vernier': 'Vernier caliper', 'Vernier calliper': 'Vernier caliper',
  'Vernier callipers': 'Vernier caliper', 'Nail cutter': 'Nail clipper',
  'Pestle and mortar': 'Mortar and pestle', 'Mortar': 'Mortar and pestle', 'Pestle': 'Mortar and pestle',
  'Khurpa': 'Khurpi', 'Centre punch': 'Punch', 'Center punch': 'Punch',
  'Miter saw': 'Mitre saw', 'Chop saw': 'Mitre saw', 'Electric planer': 'Planer', 'Thickness planer': 'Planer',
  'Pillar drill': 'Drill press', 'Caulk gun': 'Caulking gun', 'Riveter': 'Rivet gun', 'Pop rivet gun': 'Rivet gun',
  'String trimmer': 'Strimmer', 'Weed whacker': 'Strimmer', 'Weed wacker': 'Strimmer', 'Weed eater': 'Strimmer',
  'Grass trimmer': 'Strimmer', 'Snips': 'Tin snips', 'Leatherman': 'Multitool', 'Buffer': 'Polisher',
  'Knife sharpener': 'Sharpener', 'Calliper': 'Caliper', 'Callipers': 'Caliper',
  'Screw gauge': 'Micrometer', 'Micrometer screw gauge': 'Micrometer', 'Micrometre': 'Micrometer',
  'Plumb line': 'Plumb bob', 'Plumb': 'Plumb bob', 'Metre stick': 'Yardstick', 'Meter stick': 'Yardstick',
  'Long nose pliers': 'Needle-nose pliers', 'Nose pliers': 'Needle-nose pliers',
  'Vise grip': 'Locking pliers', 'Vise grips': 'Locking pliers', 'Vice grip': 'Locking pliers', 'Mole grips': 'Locking pliers',
  'Mole wrench': 'Locking pliers', 'Stripper': 'Wire stripper', 'Crimper': 'Crimping tool',
  'Wheel spanner': 'Lug wrench', 'Tyre iron': 'Lug wrench', 'Tire iron': 'Lug wrench', 'Wheel brace': 'Lug wrench', 'Wheel wrench': 'Lug wrench',
  'Star screwdriver': 'Phillips screwdriver', 'Phillips head': 'Phillips screwdriver', 'Phillips': 'Phillips screwdriver',
  'Flat screwdriver': 'Flathead screwdriver', 'Slotted screwdriver': 'Flathead screwdriver', 'Minus screwdriver': 'Flathead screwdriver',
  'G-clamp': 'C-clamp', 'Press': 'Hydraulic press', 'Rotavator': 'Tiller', 'Cultivator': 'Tiller', 'Rototiller': 'Tiller',
  'Cement mixer': 'Concrete mixer', 'Sawzall': 'Reciprocating saw', 'Sabre saw': 'Reciprocating saw',
  'Nail set': 'Nail punch', 'Brace and bit': 'Brace', 'Splitting maul': 'Maul', 'Ball pein hammer': 'Ball-peen hammer',
  'Rock hammer': "Geologist's hammer", 'Dremel': 'Rotary tool', 'Framing square': "Carpenter's square", 'L square': "Carpenter's square",
  'Dial indicator': 'Dial gauge', 'Sliding bevel': 'Bevel', 'Bevel gauge': 'Bevel',
  'Channel locks': 'Tongue-and-groove pliers', 'Channellock': 'Tongue-and-groove pliers', 'Water pump pliers': 'Tongue-and-groove pliers',
  'Diagonal pliers': 'Side cutters', 'Nippers': 'Side cutters', 'Linesman pliers': "Lineman's pliers", 'Combination pliers': "Lineman's pliers",
  'Box wrench': 'Ring spanner', 'Ring wrench': 'Ring spanner', 'Tire lever': 'Tyre lever',
  'Plastering float': 'Float', 'Brick bolster': 'Bolster', 'Oiler': 'Oil can', 'F-clamp': 'Bar clamp', 'Miter box': 'Mitre box',
  'Gas cutter': 'Oxy-acetylene torch', 'Cutting torch': 'Oxy-acetylene torch', 'Winnow': 'Winnowing fan',
  'Lawn edger': 'Edger', 'Lawn aerator': 'Aerator', "Plumber's snake": 'Drain snake', 'Drain auger': 'Drain snake',
  'Piercing saw': "Jeweller's saw", 'Dibble': 'Dibber'
 }
};
