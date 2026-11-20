export default {
 id: 'furniture',
 title: 'Name a piece of furniture',
 icon: '🛋️',
 common: `Chair|Table|Bed|Sofa|Desk|Couch|Wardrobe|Cupboard|Almirah|Shelf|Bookshelf|Stool|Bench|Cabinet|
  Dining table|Coffee table|Study table|Dressing table|Side table|Bedside table|Armchair|Rocking chair|
  Bean bag|Shoe rack|TV stand|Chest of drawers|Bunk bed|Sofa bed|Cot|Dining chair|Office chair|Rack|
  Double bed|Recliner|Bookcase|Dresser|Computer table`,
 uncommon: `Single bed|Crib|Cradle|Swing|Futon|Ottoman|Sideboard|Footstool|Loveseat|Divan|Settee|Chest|Trunk|Locker|
  Closet|Filing cabinet|Kitchen cabinet|Showcase|Coat rack|Folding chair|Plastic chair|High chair|Easy chair|
  Lounge chair|Deck chair|Bar stool|Pouffe|Charpai|Teapoy|Folding table|Kitchen table|Console table|End table|
  Daybed|Hammock|Chaise lounge|Headboard|Armoire|Buffet|Bureau|Hutch|Canopy bed|King size bed|Queen size bed|
  Four-poster bed|Bassinet|Swivel chair|Wall shelf|Display cabinet|Writing desk|Standing desk|Workbench|
  Picnic table|Pool table|Throne|Pew|Gaming chair|Folding bed|Box bed|Water bed|Wall unit|Tea trolley|
  Kitchen island|Sectional|Lawn chair`,
 rare: `Credenza|Massage chair|Camp bed|Mooda|Chowki|Takht|Wine rack|Towel rack|Magazine rack|Umbrella stand|
  Room divider|Entertainment center|China cabinet|Medicine cabinet|Bar cabinet|Crockery unit|Bar cart|Bar table|
  Conference table|Changing table|Lectern|Podium|Tray table|Card table|Piano stool|Step stool|Toy box|Playpen|
  Hamper|Corner shelf|Floating shelf|Workstation|Window seat|Banquette|Camping chair|Director's chair|
  Wicker chair|Sun lounger|Chesterfield|Corner cabinet|Curio cabinet|Drafting table|Drop leaf table|
  Nesting tables|Pedestal table|Trestle table|Roll top desk|Side chair|Tallboy|Vanity bench|Welsh dresser|
  Windsor chair|Wing chair|Trundle bed|Hope chest|Plant stand|Corner cupboard|Commode|Secretary|Highboy|Lowboy|
  Hassock|Glider|Murphy bed|Loft bed|Cubby|Club chair|Tub chair|Egg chair|Adirondack chair|Vitrine|Valet stand|
  Hall tree|Kneehole desk|Morris chair|Fainting couch|Settle|Tea table`,
 deep: `Chifforobe|Escritoire|Gueridon|Whatnot|Canterbury|Davenport|Etagere|Kas|Klismos|Prie dieu|Sella|Taboret|
  Fauteuil|Pie safe|Deacon's bench|Bergere|Bombé chest|Bonheur du jour|Boston rocker|Canapé|Causeuse|Cellarette|
  Chauffeuse|Coffer|Court cupboard|Credence|Duchesse brisée|Gondola chair|Harlequin table|Hunt board|Indiscret|
  Loo table|Pembroke table|Savonarola chair|Sgabello|Vis-à-vis|Tête-à-tête|Méridienne|Récamier|Curule chair|
  Faldstool|Zaisu|Tuffet|Cantilever chair|Ladderback chair|Slipper chair|Kneeling chair|Papasan chair|
  Barcelona chair|Eames chair|Butterfly chair|Gateleg table|Refectory table|Occasional table|Tilt-top table|
  Demilune|Kotatsu|Chabudai|Sewing table|Carrel|Partners desk|Sleigh bed|Platform bed|Cheval mirror`,
 aliases: {
  'Sofa set': 'Sofa', 'Palang': 'Bed', 'Kursi': 'Chair', 'Mez': 'Table', 'Office desk': 'Desk', 'Office table': 'Desk',
  'Almari': 'Almirah', 'Almira': 'Almirah', 'Almaari': 'Almirah', 'Shelves': 'Shelf', 'Shelving unit': 'Shelf',
  'Book rack': 'Bookshelf', 'Book shelf': 'Bookshelf', 'Dining set': 'Dining table',
  'Centre table': 'Coffee table', 'Center table': 'Coffee table', 'Study desk': 'Study table', 'Reading table': 'Study table',
  'Vanity': 'Dressing table', 'Vanity table': 'Dressing table', 'Dresser table': 'Dressing table',
  'Nightstand': 'Bedside table', 'Night table': 'Bedside table', 'Sofa chair': 'Armchair',
  'Bean bag chair': 'Bean bag', 'Shoe cabinet': 'Shoe rack', 'Shoe stand': 'Shoe rack',
  'TV unit': 'TV stand', 'TV cabinet': 'TV stand', 'TV table': 'TV stand', 'Television stand': 'TV stand', 'Media console': 'TV stand',
  'Drawers': 'Chest of drawers', 'Drawer': 'Chest of drawers', 'Sofa cum bed': 'Sofa bed', 'Sleeper sofa': 'Sofa bed',
  'Baby cot': 'Cot', 'Baby bed': 'Cot', 'Computer desk': 'Computer table',
  'Jhoola': 'Swing', 'Jhula': 'Swing', 'Porch swing': 'Swing', 'Garden swing': 'Swing',
  'Diwan': 'Divan', 'Dewan': 'Divan', 'File cabinet': 'Filing cabinet', 'Show case': 'Showcase',
  'Coat stand': 'Coat rack', 'Hat stand': 'Coat rack', 'Hat rack': 'Coat rack', 'Lounger': 'Lounge chair',
  'Pouf': 'Pouffe', 'Charpoy': 'Charpai', 'Khatiya': 'Charpai', 'Khat': 'Charpai', 'Manji': 'Charpai',
  'Chaise longue': 'Chaise lounge', 'Chaise': 'Chaise lounge', 'King bed': 'King size bed', 'Queen bed': 'Queen size bed',
  'Four poster': 'Four-poster bed', 'Revolving chair': 'Swivel chair', 'Writing table': 'Writing desk',
  'Billiards table': 'Pool table', 'Snooker table': 'Pool table', 'Billiard table': 'Pool table',
  'Rollaway bed': 'Folding bed', 'Storage bed': 'Box bed', 'Waterbed': 'Water bed',
  'Serving trolley': 'Tea trolley', 'Tea cart': 'Tea trolley', 'Sectional sofa': 'Sectional', 'L-shaped sofa': 'Sectional',
  'Corner sofa': 'Sectional', 'Garden chair': 'Lawn chair', 'Mudha': 'Mooda', 'Moodha': 'Mooda', 'Moorha': 'Mooda',
  'Chauki': 'Chowki', 'Takhat': 'Takht', 'Folding screen': 'Room divider', 'Partition': 'Room divider',
  'Entertainment unit': 'Entertainment center', 'Entertainment centre': 'Entertainment center',
  'Liquor cabinet': 'Bar cabinet', 'Drinks cabinet': 'Bar cabinet', 'Crockery cabinet': 'Crockery unit',
  'Piano bench': 'Piano stool', 'Cane chair': 'Wicker chair', 'Rattan chair': 'Wicker chair',
  'Drawing table': 'Drafting table', 'Trestle': 'Trestle table', 'Rolltop desk': 'Roll top desk',
  'Wingback chair': 'Wing chair', 'Trundle': 'Trundle bed', 'Blanket chest': 'Hope chest',
  'Secretary desk': 'Secretary', 'Secretaire': 'Secretary', 'Wall bed': 'Murphy bed', 'Valet': 'Valet stand',
  'Davenport desk': 'Davenport', 'Deacon bench': "Deacon's bench", 'Prie dieu chair': 'Prie dieu', 'Klismos chair': 'Klismos',
  'Savonarola': 'Savonarola chair', 'Curule seat': 'Curule chair', 'Eames lounge chair': 'Eames chair',
  'Demilune table': 'Demilune', 'Cheval glass': 'Cheval mirror'
 }
};
