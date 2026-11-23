export default {
 id: 'vehicle',
 title: 'Name a vehicle or mode of transport',
 icon: '🚲',
 note: 'Road, rail, water or air.',
 common: `Car|Bus|Train|Bicycle|Airplane|Boat|Truck|Motorcycle|Helicopter|Submarine|Ship|Van|Scooter|Tractor|Tram|
  Ferry|Yacht|Ambulance|Taxi|Rocket|Auto rickshaw|Metro|Jeep|Lorry|Rickshaw|Jet|Fire truck|Police car|
  School bus|Spaceship|Hot air balloon|Skateboard|Cruise ship|Sailboat|Canoe|Scooty|Bullock cart|Cart|Wagon|
  SUV|Tempo|Tanker|Bulldozer|Limousine|Tank|Cable car|Tricycle`,
 uncommon: `Kayak|Gondola|Segway|Monorail|Hovercraft|Glider|Zeppelin|Forklift|Go-kart|Hearse|Jet ski|Locomotive|
  Minivan|Motorboat|Speedboat|Rowboat|Raft|Snowmobile|Steamship|Tugboat|Unicycle|Wheelbarrow|Trolley|Toboggan|
  Pickup truck|Dump truck|Garbage truck|Tow truck|Cement mixer|Road roller|Excavator|Crane|Combine harvester|
  Golf cart|Quad bike|Moped|Electric car|Electric scooter|E-bike|Sports car|Race car|Convertible|Sedan|
  Hatchback|Double-decker bus|Minibus|Coach|Caravan|Trailer|Cycle rickshaw|Tonga|Carriage|Chariot|Stagecoach|
  Sleigh|Sled|Horse|Local train|Bullet train|Steam engine|Goods train|Fighter jet|Private jet|Drone|
  Space shuttle|Airship|Lifeboat|Fishing boat|Houseboat|Cargo ship|Battleship|Warship|Aircraft carrier|
  Pirate ship|Wheelchair|Stroller|Handcart|Camel|Elephant|Palanquin|Buggy|
  Sports bike|Mountain bike|BMX|Delivery van|Sleeper bus|Express train|Passenger train|Mule|Pony|Ox|Yak|Mobility scooter|Snowboard|Ice skates|Surfboard|Paddleboard|Parachute|Air ambulance|Mars rover|Container truck|Patrol boat|Superbike|Mini truck`,
 rare: `Bathyscaphe|Biplane|Catamaran|Dinghy|Galleon|Hydrofoil|Autogyro|Bobsled|Clipper|Frigate|Funicular|
  Gondola lift|Handcar|Junk|Longship|Microlight|Corvette|Destroyer|Cruiser|Galley|Dhow|Schooner|Sloop|Barge|
  Trawler|Container ship|Ocean liner|Icebreaker|Submersible|U-boat|Shikara|Pedal boat|Banana boat|
  Inflatable boat|Dragon boat|Water taxi|Launch|Steamboat|Seaplane|Hang glider|Paraglider|Blimp|Jumbo jet|
  Bomber|Cargo plane|Airliner|Jetpack|Maglev|Light rail|Toy train|Chairlift|Ski lift|Trolleybus|Shuttle|
  Motorhome|Station wagon|Coupe|Semi truck|Monster truck|Dirt bike|Sidecar|Kick scooter|Hoverboard|
  Roller skates|Skis|Snowplow|Dune buggy|Backhoe|Armoured car|Police van|Ice cream truck|Food truck|E-rickshaw|
  Camel cart|Dog sled|Penny-farthing|Tandem|Donkey|Walking|Trireme|Dreadnought|Ironclad|Hansom cab|Elevator|
  Escalator|
  Crossover|MPV|Roadster|Muscle car|Supercar|Flatbed truck|Box truck|Car carrier|Road bike|Folding bicycle|Cargo bike|Monoplane|Turboprop|Supersonic jet|Spy plane|Air taxi|Flying car|Flying boat|Lunar module|Hyperloop|Diesel locomotive|Electric locomotive|Mine cart|Open-top bus|Street sweeper|Cherry picker|Loader|Grader|Torpedo boat|Tall ship|Superyacht|Life raft|Sailboard|Mail van|Donkey cart|Reindeer|Llama|Skeleton`,
 deep: `Aerostat|Bathysphere|Bireme|Brigantine|Carrack|Caravel|Barque|Curragh|Dromon|Galiot|Galleass|Gig|Hulk|Ketch|
  Knorr|Lorcha|Lugger|Penteconter|Pinnace|Polacca|Proa|Sampan|Shallop|Skiff|Tartane|Trabaccolo|Wherry|Xebec|
  Dory|Dray|Brougham|Landau|Velomobile|Hoverbike|Phaeton|Barouche|Surrey|Curricle|Hackney carriage|Omnibus|
  Charabanc|Recumbent bicycle|Jugaad|Jeepney|Songthaew|Matatu|Humvee|Half-track|Armoured personnel carrier|
  Articulated bus|Hot rod|Dragster|Zamboni|Sedan chair|Luge|Troika|Travois|Covered wagon|Ekka|
  Hand-pulled rickshaw|Triplane|Tiltrotor|Ornithopter|Lunar rover|Space capsule|Cog railway|Aerial tramway|
  Railcar|Travelator|Trimaran|Cutter|Brig|Yawl|Punt|Coracle|Outrigger|Pirogue|Dugout|Umiak|Felucca|
  Kettuvallam|Snake boat|Longboat|Narrowboat|Riverboat|Paddle steamer|Windjammer|Man-of-war|Ship of the line|
  Gunboat|Minesweeper|Landing craft|Whaler|Bulk carrier|Dredger|Pontoon|Scull|Vaporetto|Amphibious vehicle|
  Airboat|Longboard|
  Microcar|Kei car|Hypercar|Grand tourer|Fastback|Shooting brake|Panel van|Phat-phati|Chhakda|Pit bike|Minibike|Fixie|Fat bike|Velocipede|Boneshaker|Draisine|Quadricycle|Electric unicycle|Rail bus|People mover|Ekranoplan|Hydroplane|Fireboat|Pilot boat|Lightship|Research vessel|Reed boat|Barquentine|Full-rigged ship|Cog|Quinquereme|Sloop-of-war|Monitor|Hospital ship|Troopship|Ro-ro ship|Reefer ship|LNG carrier|Tender|Tank destroyer|Milk float|Gritter|Snowcat|Boom lift|Scissor lift|Skid steer|Scraper|Paver|Trencher|Tunnel boring machine|Haul truck|Horsebox|Bookmobile|Popemobile|Jitney|Tro tro|Dolmus|Marshrutka|Colectivo|Chiva bus|Danfo|Boda boda|Calesa|Victoria|Trap|Dogcart|Mail coach|Diligence|Wagonette|Buckboard|Chuckwagon|Tumbrel|Sulky|Chaise`,
 aliases: {
  'Gaadi': 'Car', 'Gadi': 'Car', 'Motor car': 'Car', 'Automobile': 'Car',
  'Rail': 'Train', 'Railgadi': 'Train', 'Railway': 'Train',
  'Cycle': 'Bicycle', 'Pushbike': 'Bicycle', 'Bike': 'Motorcycle', 'Motorbike': 'Motorcycle',
  'Aeroplane': 'Airplane', 'Plane': 'Airplane', 'Aircraft': 'Airplane', 'Flight': 'Airplane',
  'Hawai jahaz': 'Airplane', 'Hawai jahaj': 'Airplane', 'Vimaan': 'Airplane', 'Viman': 'Airplane',
  'Naav': 'Boat', 'Nav': 'Boat', 'Nau': 'Boat', 'Jahaz': 'Ship', 'Jahaj': 'Ship',
  'Chopper': 'Helicopter', 'Copter': 'Helicopter', 'Streetcar': 'Tram', 'Trolley car': 'Tram',
  'Cab': 'Taxi', 'Taxicab': 'Taxi',
  'Auto': 'Auto rickshaw', 'Tuk tuk': 'Auto rickshaw', 'Three wheeler': 'Auto rickshaw',
  'Subway': 'Metro', 'Underground': 'Metro', 'Tube': 'Metro', 'Metro train': 'Metro', 'Metro rail': 'Metro', 'Subway train': 'Metro',
  'Jet plane': 'Jet', 'Fire engine': 'Fire truck', 'Fire brigade': 'Fire truck', 'Fire tender': 'Fire truck',
  'Cop car': 'Police car', 'Police jeep': 'Police car', 'Patrol car': 'Police car', 'Police vehicle': 'Police car',
  'Spacecraft': 'Spaceship', 'Balloon': 'Hot air balloon', 'Cruise': 'Cruise ship', 'Cruise liner': 'Cruise ship',
  'Sailing boat': 'Sailboat', 'Sailing ship': 'Sailboat',
  'Bailgadi': 'Bullock cart', 'Ox cart': 'Bullock cart', 'Sports utility vehicle': 'SUV', 'Tempo traveller': 'Tempo',
  'Oil tanker': 'Tanker', 'Water tanker': 'Tanker', 'Tanker truck': 'Tanker', 'Limo': 'Limousine', 'Ropeway': 'Cable car',
  'Trike': 'Tricycle', 'Kart': 'Go-kart', 'Water scooter': 'Jet ski',
  'Engine': 'Locomotive', 'Train engine': 'Locomotive', 'Railway engine': 'Locomotive',
  'Powerboat': 'Motorboat', 'Rowing boat': 'Rowboat', 'Steamer': 'Steamship', 'Tug': 'Tugboat',
  'Pickup': 'Pickup truck', 'Dumper': 'Dump truck', 'Tipper': 'Dump truck', 'Dumper truck': 'Dump truck', 'Tipper truck': 'Dump truck',
  'Garbage van': 'Garbage truck', 'Dustcart': 'Garbage truck', 'Bin lorry': 'Garbage truck', 'Garbage lorry': 'Garbage truck',
  'Trash truck': 'Garbage truck', 'Concrete mixer': 'Cement mixer', 'Steamroller': 'Road roller', 'Roller': 'Road roller',
  'Digger': 'Excavator', 'JCB': 'Excavator', 'Earthmover': 'Excavator', 'Harvester': 'Combine harvester', 'Combine': 'Combine harvester',
  'ATV': 'Quad bike', 'All-terrain vehicle': 'Quad bike', 'Quad': 'Quad bike',
  'EV': 'Electric car', 'Electric vehicle': 'Electric car', 'E-scooter': 'Electric scooter', 'Electric scooty': 'Electric scooter',
  'Electric bike': 'E-bike', 'Electric bicycle': 'E-bike',
  'Racing car': 'Race car', 'Formula 1 car': 'Race car', 'F1 car': 'Race car', 'Formula one car': 'Race car',
  'Double decker': 'Double-decker bus', 'Pedicab': 'Cycle rickshaw',
  'Tanga': 'Tonga', 'Horse cart': 'Tonga', 'Ghoda gadi': 'Tonga',
  'Horse carriage': 'Carriage', 'Horse-drawn carriage': 'Carriage', 'Rath': 'Chariot', 'Sledge': 'Sled',
  'Local': 'Local train', 'Suburban train': 'Local train', 'Mumbai local': 'Local train',
  'Shinkansen': 'Bullet train', 'High-speed train': 'Bullet train', 'High speed rail': 'Bullet train',
  'Steam locomotive': 'Steam engine', 'Steam train': 'Steam engine',
  'Freight train': 'Goods train', 'Cargo train': 'Goods train', 'Maal gaadi': 'Goods train', 'Malgadi': 'Goods train',
  'Fighter plane': 'Fighter jet', 'Fighter aircraft': 'Fighter jet', 'Fighter': 'Fighter jet', 'Warplane': 'Fighter jet',
  'Dirigible': 'Airship', 'Freighter': 'Cargo ship', 'Cargo vessel': 'Cargo ship',
  'Pram': 'Stroller', 'Baby carriage': 'Stroller', 'Pushchair': 'Stroller', 'Baby stroller': 'Stroller',
  'Thela': 'Handcart', 'Pushcart': 'Handcart', 'Palki': 'Palanquin', 'Doli': 'Palanquin', 'Palkhi': 'Palanquin',
  'Gyrocopter': 'Autogyro', 'Gyroplane': 'Autogyro', 'Bobsleigh': 'Bobsled', 'Viking ship': 'Longship',
  'Ultralight': 'Microlight', 'Liner': 'Ocean liner', 'Paddle boat': 'Pedal boat', 'Pedalo': 'Pedal boat',
  'Rubber boat': 'Inflatable boat', 'Zodiac': 'Inflatable boat', 'Rubber dinghy': 'Inflatable boat',
  'Floatplane': 'Seaplane', 'Shuttle bus': 'Shuttle',
  'Camper': 'Motorhome', 'Camper van': 'Motorhome', 'RV': 'Motorhome', 'Recreational vehicle': 'Motorhome',
  'Estate car': 'Station wagon', 'Estate': 'Station wagon',
  'Semi': 'Semi truck', 'Big rig': 'Semi truck', 'Articulated lorry': 'Semi truck', 'Eighteen wheeler': 'Semi truck',
  '18 wheeler': 'Semi truck', 'Semi-trailer': 'Semi truck', 'Trailer truck': 'Semi truck', 'Tractor trailer': 'Semi truck',
  'Rollerblades': 'Roller skates', 'Skates': 'Roller skates', 'Ski': 'Skis', 'Snowplough': 'Snowplow',
  'Armored car': 'Armoured car', 'Ice cream van': 'Ice cream truck',
  'Electric rickshaw': 'E-rickshaw', 'Toto': 'E-rickshaw', 'Tandem bicycle': 'Tandem', 'Tandem bike': 'Tandem',
  'On foot': 'Walking', 'Foot': 'Walking', 'Walk': 'Walking', 'Lift': 'Elevator',
  'Polacre': 'Polacca', 'Prao': 'Proa', 'Prahu': 'Proa', 'Hackney': 'Hackney carriage',
  'Recumbent': 'Recumbent bicycle', 'Recumbent bike': 'Recumbent bicycle',
  'APC': 'Armoured personnel carrier', 'Armored personnel carrier': 'Armoured personnel carrier',
  'Conestoga wagon': 'Covered wagon', 'Pulled rickshaw': 'Hand-pulled rickshaw', 'Hand rickshaw': 'Hand-pulled rickshaw',
  'Moon rover': 'Lunar rover', 'Rover': 'Lunar rover', 'Moon buggy': 'Lunar rover', 'Rack railway': 'Cog railway',
  'Moving walkway': 'Travelator', 'Outrigger canoe': 'Outrigger', 'Dugout canoe': 'Dugout',
  'Chundan vallam': 'Snake boat', 'Canal boat': 'Narrowboat', 'Man o war': 'Man-of-war', 'Pontoon boat': 'Pontoon',
  'Duck boat': 'Amphibious vehicle', 'Amphibian': 'Amphibious vehicle',
  'Kattumaram': 'Catamaran', 'Sportbike': 'Sports bike', 'MTB': 'Mountain bike', 'BMX bike': 'BMX', 'Cargo van': 'Delivery van', 'Courier van': 'Delivery van',
  'Sleeper coach': 'Sleeper bus', 'Mail train': 'Express train', 'Superfast train': 'Express train', 'Mobility chair': 'Mobility scooter', 'Stand-up paddleboard': 'Paddleboard', 'SUP': 'Paddleboard',
  'Air ambulance helicopter': 'Air ambulance', 'Container lorry': 'Container truck', 'Container trailer': 'Container truck', 'Patrol vessel': 'Patrol boat',
  'Chhota Hathi': 'Mini truck', 'Crossover SUV': 'Crossover', 'Multi-purpose vehicle': 'MPV', 'People carrier': 'MPV', 'Flatbed': 'Flatbed truck', 'Box van': 'Box truck', 'Car transporter': 'Car carrier', 'Auto transporter': 'Car carrier',
  'Racing bicycle': 'Road bike', 'Racing bike': 'Road bike', 'Folding bike': 'Folding bicycle', 'Cargo bicycle': 'Cargo bike', 'Propeller plane': 'Turboprop', 'Prop plane': 'Turboprop', 'Concorde': 'Supersonic jet',
  'Lunar lander': 'Lunar module', 'Moon lander': 'Lunar module', 'Diesel engine': 'Diesel locomotive', 'Electric engine': 'Electric locomotive', 'Mine car': 'Mine cart',
  'Road sweeper': 'Street sweeper', 'Sweeper truck': 'Street sweeper', 'Bucket truck': 'Cherry picker', 'Front loader': 'Loader', 'Wheel loader': 'Loader', 'Motor grader': 'Grader', 'Road grader': 'Grader',
  'Windsurfer': 'Sailboard', 'Windsurf board': 'Sailboard', 'Paddy wagon': 'Police van', 'Black Maria': 'Police van', 'Prison van': 'Police van', 'Post van': 'Mail van', 'Postal van': 'Mail van', 'Bicycle rickshaw': 'Cycle rickshaw',
  'Kei truck': 'Kei car', 'GT car': 'Grand tourer', 'Phatphati': 'Phat-phati', 'Chakda': 'Chhakda', 'Chhakdo': 'Chhakda', 'Fixed-gear bicycle': 'Fixie', 'Fixed gear bike': 'Fixie', 'Dandy horse': 'Draisine',
  'Ground effect vehicle': 'Ekranoplan', 'Light vessel': 'Lightship', 'Survey vessel': 'Research vessel', 'Square rigger': 'Full-rigged ship', 'Troop ship': 'Troopship', 'Troop transport': 'Troopship',
  'Roll-on roll-off ship': 'Ro-ro ship', 'Roro': 'Ro-ro ship', 'Refrigerated ship': 'Reefer ship', 'Gas carrier': 'LNG carrier', 'Ship tender': 'Tender', 'Gritting lorry': 'Gritter', 'Salt truck': 'Gritter',
  'Snow groomer': 'Snowcat', 'Aerial work platform': 'Boom lift', 'Skid loader': 'Skid steer', 'Bobcat': 'Skid steer', 'Asphalt paver': 'Paver', 'TBM': 'Tunnel boring machine', 'Mining truck': 'Haul truck', 'Dump hauler': 'Haul truck',
  'Horse trailer': 'Horsebox', 'Mobile library': 'Bookmobile', 'Library bus': 'Bookmobile', 'Trotro': 'Tro tro', 'Dolmuş': 'Dolmus', 'Motorcycle taxi': 'Boda boda', 'Bike taxi': 'Boda boda',
  'Becak rickshaw': 'Cycle rickshaw', 'Becak': 'Cycle rickshaw', 'Cyclo': 'Cycle rickshaw', 'Trishaw': 'Cycle rickshaw', 'Pony and trap': 'Trap', 'Prairie schooner': 'Covered wagon', 'Tumbril': 'Tumbrel', 'Post chaise': 'Chaise',
  'Stretch limo': 'Limousine', 'Stretch limousine': 'Limousine', 'Cabriolet': 'Convertible', 'Drop top': 'Convertible', 'Saloon': 'Sedan', 'Saloon car': 'Sedan', 'Hatch': 'Hatchback',
  'Minicab': 'Taxi', 'Black cab': 'Taxi', 'Shared auto': 'Auto rickshaw', 'Autorickshaw': 'Auto rickshaw', 'Breakdown truck': 'Tow truck', 'Recovery truck': 'Tow truck', 'Wrecker': 'Tow truck',
  'Personal watercraft': 'Jet ski', 'Inline skates': 'Roller skates', 'Mobile home': 'Motorhome', 'Space rocket': 'Rocket',
  'Mule cart': 'Donkey cart', 'Gadha gadi': 'Donkey cart', 'Oont gadi': 'Camel cart', 'Bullock gadi': 'Bullock cart', 'Bail gaadi': 'Bullock cart',
  'Haathi': 'Elephant', 'Hathi': 'Elephant', 'Ghoda': 'Horse', 'Oont': 'Camel', 'Ship of the desert': 'Camel', 'Motor scooter': 'Scooter',
  'Trail bike': 'Dirt bike', 'Motocross bike': 'Dirt bike', 'Pocket bike': 'Minibike', 'Mini bike': 'Minibike', 'Rowing shell': 'Scull', 'Racing shell': 'Scull', 'Knarr': 'Knorr',
  'Okada': 'Boda boda', 'Litter': 'Palanquin', 'Quadcopter': 'Drone', 'Quad copter': 'Drone'
 }
};
