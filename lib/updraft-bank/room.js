export default {
 id: 'room',
 title: 'Name a room or part of a house',
 icon: '🚪',
 note: 'Rooms, spaces and features: attic, balcony…',
 common: `Kitchen|Bedroom|Bathroom|Living room|Dining room|Hall|Balcony|Terrace|Garden|Garage|Attic|Basement|Toilet|Study|Store room|
  Roof|Door|Window|Wall|Floor|Ceiling|Staircase|Verandah|Courtyard|Porch|Lawn|Corridor|Lobby|Drawing room|Guest room|Pooja room|
  Nursery|Home office|Laundry room|Library|Closet|Loft|Cellar|Pantry|Patio|Driveway|Gate|Fence|Chimney|Fireplace|Lift|Backyard`,
 uncommon: `Master bedroom|Family room|Den|Lounge|Foyer|Hallway|Landing|Utility room|Powder room|En suite|Walk-in closet|Dressing room|
  Playroom|Games room|Home theatre|Music room|Sunroom|Conservatory|Wine cellar|Spare room|Servant quarters|Shed|Carport|Sit-out|
  Mezzanine|Rooftop|Front yard|Yard|Swimming pool|Sauna|Steam room|Home gym|Boiler room|Panic room|Crawl space|
  Breakfast nook|Kitchenette|Kitchen island|Front door|Back door|Fire escape|Skylight|Bay window|French window|Window sill|Shutters|
  Gutter|Drainpipe|Eaves|Gable|Dormer|Awning|Steps|Doorstep|Doorbell|Letterbox|Boundary wall|Pathway|Kitchen garden|Water tank|
  Septic tank|Sump|Borewell|Well|Foundation|Pillar|Beam|Arch|Alcove|Niche|Nook|False ceiling|Window grille|Ventilator|Hearth|
  Mantelpiece|Window seat|Barsati|Baithak|Aangan|Stairwell|Spiral staircase|Trapdoor|Doorway|Studio|Workshop|Man cave|Rec room|
  Guest bathroom|Children's room|Bunk room|Craft room|Sewing room|Prayer room|Plinth|Solar panel|Flower bed|Granny flat`,
 rare: `Parlour|Mudroom|Media room|Box room|Outhouse|Pool house|Home bar|Larder|Scullery|Linen closet|Cloakroom|Vestibule|
  Chamber|Atrium|Stoop|Breakfast room|Wet room|Shower room|Ballroom|Billiard room|Darkroom|Utility area|Dry balcony|
  Partition wall|Rafter|Joist|Lintel|Skirting board|Cornice|Wainscoting|Threshold|Bannister|Railing|Parapet|Compound wall|Portico|
  Gallery|Cupola|Turret|Jharokha|Chhajja|Otla|Thinnai|Dalaan|Chaubara|Tulsi vrindavan|Terrace garden|Deck|
  Sleeping porch|Wet bar|Butler's pantry|Strongroom|Root cellar|Furnace room|Galley kitchen|Antechamber|Boudoir|Morning room|
  Smoking room|Trophy room|Gun room|Boot room|Schoolroom|Great hall|Long gallery|Servants' hall|Still room|Buttery|Airing cupboard|
  Lanai|Loggia|Breezeway|Widow's walk|Weather vane|Lightning rod|Dado|Picture rail|Ceiling rose|Load-bearing wall|Inglenook|Jaali|
  Bonus room|Great room`,
 deep: `Oriel window|Clerestory|Transom|Fanlight|Mullion|Soffit|Fascia|Flashing|Ridge|Valley|Hip roof|Mansard|Gambrel|Bargeboard|
  Quoin|Corbel|Pilaster|Balustrade|Baluster|Newel post|Stringer|Riser|Tread|Nosing|Half-landing|Winder|Dumbwaiter|Laundry chute|
  Coal cellar|Priest hole|Secret passage|Tack room|Porte-cochère|Snug|Keeping room|Sleeping loft|Cockloft|Undercroft|Solar|
  Garderobe|Oratory|Kang|Genkan|Engawa|Tokonoma|Washitsu|Ondol|Majlis|Diwan khana|Zenana|Mardana|Nadumuttam|Padippura|Charupadi|
  Poomukham|Duct area|Lift lobby|Stilt parking`,
 aliases: {
  'Rasoi': 'Kitchen', 'Rasoi ghar': 'Kitchen', 'Rasoda': 'Kitchen', 'Bedchamber': 'Bedroom', 'Sleeping room': 'Bedroom', 'Washroom': 'Bathroom', 'Bath': 'Bathroom', 'Snanghar': 'Bathroom',
  'Sitting room': 'Living room', 'Front room': 'Living room', 'Lounge room': 'Living room', 'Hall room': 'Hall', 'Dining area': 'Dining room', 'Dining hall': 'Dining room',
  'Chhat': 'Terrace', 'Roof terrace': 'Terrace', 'Bagicha': 'Garden', 'Bageecha': 'Garden', 'Attic room': 'Attic', 'Tehkhana': 'Basement',
  'Restroom': 'Toilet', 'Lavatory': 'Toilet', 'WC': 'Toilet', 'Loo': 'Toilet', 'Water closet': 'Toilet', 'Latrine': 'Toilet', 'Shauchalay': 'Toilet', 'Study room': 'Study', 'Reading room': 'Study',
  'Storeroom': 'Store room', 'Storage room': 'Store room', 'Store': 'Store room', 'Flooring': 'Floor', 'Stairs': 'Staircase', 'Stairway': 'Staircase', 'Seedhi': 'Staircase',
  'Veranda': 'Verandah', 'Varanda': 'Verandah', 'Quadrangle': 'Courtyard', 'Front porch': 'Porch', 'Back porch': 'Porch', 'Screened porch': 'Porch', 'Grass': 'Lawn', 'Passage': 'Corridor', 'Passageway': 'Corridor',
  'Entrance lobby': 'Lobby', 'Guest bedroom': 'Guest room', 'Pooja ghar': 'Pooja room', 'Puja room': 'Pooja room', 'Puja ghar': 'Pooja room', 'Mandir room': 'Pooja room', 'Thakurghar': 'Pooja room',
  'Baby room': 'Nursery', 'Office': 'Home office', 'Work room': 'Home office', 'Laundry': 'Laundry room', 'Wash area': 'Utility area', 'Home library': 'Library', 'Cupboard': 'Closet',
  'Elevator': 'Lift', 'Back yard': 'Backyard', 'Back garden': 'Backyard', 'Chimney stack': 'Chimney', 'Fire place': 'Fireplace',
  'Master suite': 'Master bedroom', 'Main bedroom': 'Master bedroom', 'Family lounge': 'Family room', 'TV room': 'Family room', 'Television room': 'Family room',
  'Entrance hall': 'Foyer', 'Entryway': 'Foyer', 'Entrance': 'Foyer', 'Half bath': 'Powder room', 'Half bathroom': 'Powder room',
  'Ensuite': 'En suite', 'Attached bathroom': 'En suite', 'Attached bath': 'En suite', 'Walk-in wardrobe': 'Walk-in closet', 'Changing room': 'Dressing room',
  'Toy room': 'Playroom', 'Game room': 'Games room', 'Gaming room': 'Games room', 'Home cinema': 'Home theatre', 'Home theater': 'Home theatre', 'Theatre room': 'Home theatre',
  'Sun porch': 'Sunroom', 'Spare bedroom': 'Spare room', 'Servant room': 'Servant quarters', "Servants' quarters": 'Servant quarters', "Maid's room": 'Servant quarters', 'Staff quarters': 'Servant quarters',
  'Tool shed': 'Shed', 'Garden shed': 'Shed', 'Sitout': 'Sit-out', 'Mezzanine floor': 'Mezzanine', 'Front garden': 'Front yard', 'Pool': 'Swimming pool', 'Steam bath': 'Steam room',
  'Gym room': 'Home gym', 'Gym': 'Home gym', 'Boiler house': 'Boiler room', 'Safe room': 'Panic room', 'Breakfast corner': 'Breakfast nook', 'Main door': 'Front door', 'Main gate': 'Gate',
  'Rear door': 'Back door', 'Roof window': 'Skylight', 'Roof light': 'Skylight', 'Bay': 'Bay window', 'French door': 'French window', 'Windowsill': 'Window sill', 'Sill': 'Window sill',
  'Rain gutter': 'Gutter', 'Eavestrough': 'Gutter', 'Downpipe': 'Drainpipe', 'Downspout': 'Drainpipe', 'Rainwater pipe': 'Drainpipe', 'Dormer window': 'Dormer', 'Sunshade': 'Awning',
  'Front steps': 'Steps', 'Door bell': 'Doorbell', 'Mailbox': 'Letterbox', 'Postbox': 'Letterbox', 'Mail slot': 'Letterbox', 'Garden path': 'Pathway', 'Path': 'Pathway', 'Walkway': 'Pathway',
  'Vegetable garden': 'Kitchen garden', 'Vegetable patch': 'Kitchen garden', 'Overhead tank': 'Water tank', 'Underground tank': 'Sump', 'Underground water tank': 'Sump', 'Tubewell': 'Borewell',
  'Kuan': 'Well', 'Neev': 'Foundation', 'Column': 'Pillar', 'Archway': 'Arch', 'Recess': 'Alcove', 'Wall niche': 'Niche', 'Reading nook': 'Nook', 'Drop ceiling': 'False ceiling', 'Suspended ceiling': 'False ceiling', 'POP ceiling': 'False ceiling',
  'Grill': 'Window grille', 'Window grill': 'Window grille', 'Grille': 'Window grille', 'Roshandan': 'Ventilator', 'Mantel': 'Mantelpiece', 'Mantle': 'Mantelpiece', 'Mantelshelf': 'Mantelpiece', 'Window bench': 'Window seat',
  'Roof room': 'Barsati', 'Baithak khana': 'Baithak', 'Angan': 'Aangan', 'Angana': 'Aangan', 'Chowk': 'Aangan', 'Spiral stairs': 'Spiral staircase', 'Winding staircase': 'Spiral staircase',
  'Hatch': 'Trapdoor', 'Art studio': 'Studio', 'Garage workshop': 'Workshop', 'Recreation room': 'Rec room', 'Rumpus room': 'Rec room', 'Common bathroom': 'Guest bathroom',
  "Kids' room": "Children's room", "Child's room": "Children's room", 'Hobby room': 'Craft room', 'Namaz room': 'Prayer room', 'Meditation room': 'Prayer room',
  'Solar panels': 'Solar panel', 'Granny annexe': 'Granny flat', 'Parlor': 'Parlour', 'Junk room': 'Box room', 'Linen cupboard': 'Linen closet',
  'Pool room': 'Billiard room', 'Snooker room': 'Billiard room', 'Utility': 'Utility area', 'Utility balcony': 'Dry balcony', 'Service balcony': 'Dry balcony', 'Partition': 'Partition wall',
  'Skirting': 'Skirting board', 'Baseboard': 'Skirting board', 'Crown moulding': 'Cornice', 'Crown molding': 'Cornice', 'Wainscot': 'Wainscoting', 'Door sill': 'Threshold', 'Banister': 'Bannister', 'Handrail': 'Railing',
  'Chajja': 'Chhajja', 'Ottla': 'Otla', 'Dalan': 'Dalaan', 'Chaubaara': 'Chaubara', 'Tulsi chaura': 'Tulsi vrindavan', 'Rooftop garden': 'Terrace garden', 'Roof garden': 'Terrace garden', 'Decking': 'Deck',
  'Anteroom': 'Antechamber', 'Ante-room': 'Antechamber', 'Widows walk': "Widow's walk", 'Weathervane': 'Weather vane', 'Weathercock': 'Weather vane', 'Lightning conductor': 'Lightning rod',
  'Ceiling medallion': 'Ceiling rose', 'Jali': 'Jaali', 'Lattice screen': 'Jaali', 'Sun lounge': 'Sunroom', 'Solarium': 'Sunroom',
  'Oriel': 'Oriel window', 'Clerestory window': 'Clerestory', 'Transom window': 'Transom', 'Mansard roof': 'Mansard', 'Gambrel roof': 'Gambrel', 'Vergeboard': 'Bargeboard',
  'Spindle': 'Baluster', 'Newel': 'Newel post', 'Stair tread': 'Tread', 'Stair riser': 'Riser', 'Dumb waiter': 'Dumbwaiter', 'Porte cochere': 'Porte-cochère', 'Carriage porch': 'Porte-cochère',
  'Tatami room': 'Washitsu', 'Japanese room': 'Washitsu', 'Diwankhana': 'Diwan khana', 'Nadumittam': 'Nadumuttam',
  'Garret': 'Attic', 'Lumber room': 'Box room'
 }
};
