export default {
 id: 'fabric',
 title: 'Name a fabric or material',
 icon: '🧵',
 note: 'Cloth, or anything things are made of.',
 common: `Cotton|Silk|Wool|Denim|Leather|Nylon|Polyester|Velvet|Linen|Khadi|Jute|Satin|Plastic|Glass|Wood|Steel|Rubber|
  Paper|Metal|Iron|Fur|Lace|Chiffon|Georgette|Rayon|Net|Canvas|Fleece|Cardboard|Clay|Stone|Cement|Marble|Foam|
  Bamboo|Brick`,
 uncommon: `Concrete|Ceramic|Thermocol|Cane|Faux leather|Crepe|Corduroy|Flannel|Tweed|Muslin|Organza|Brocade|Pashmina|
  Cashmere|Felt|Suede|Spandex|Acrylic|Terry cloth|Tarpaulin|Hemp|Coir|Plywood|Aluminium|Copper|Brass|Bronze|
  Gold|Silver|Stainless steel|Granite|Porcelain|Terracotta|Fibreglass|Vinyl|PVC|Polythene|Banarasi|Kanjeevaram|
  Raw silk|Tussar|Chanderi|Zari|Tulle|Taffeta|Poplin|Cambric|Voile|Twill|Gabardine|Microfiber|Mesh|Jersey|
  Sponge|Wax|Straw|Sand|Mud|Tin|Wicker|Cork|Elastic|Plaster|Crystal|Ivory|Feather|Timber|Angora|Mohair|Merino|
  Calico|Gingham`,
 rare: `Alpaca|Lambswool|Chambray|Seersucker|Chintz|Sateen|Damask|Jacquard|Velour|Velveteen|Patent leather|
  Sheepskin|Faux fur|Modal|Lyocell|Acetate|Terrycot|Polycotton|Kevlar|Gore-Tex|Neoprene|Carbon fibre|Teflon|
  Silicone|Latex|Cellophane|Resin|Epoxy|Hessian|Sisal|Flax|Rattan|MDF|Laminate|Veneer|Papier-mâché|Sandstone|
  Slate|Limestone|Bone china|Asphalt|Asbestos|Platinum|Titanium|Bone|Down|Lawn|Mulberry silk|Art silk|
  Mysore silk|Plush|Chenille|Tartan|Cheesecloth|Gauze|Handloom|Tapestry|Batik|Ikat|Bandhani|Patola|Drill|Khaki|
  Parchment`,
 deep: `Shahtoosh|Camel hair|Vicuña|Qiviut|Shetland wool|Worsted|Serge|Chino|Madras|Percale|Chamois|Nubuck|Shearling|
  Snakeskin|Rawhide|Buckskin|Vellum|Lurex|Polypropylene|Bakelite|Celluloid|Perspex|Oilcloth|Raffia|Ramie|Kapok|
  Particle board|Earthenware|Stoneware|Horn|Shell|Mother of pearl|Tortoiseshell|Memory foam|Batiste|Organdy|
  Dimity|Crepe de chine|Charmeuse|Habotai|Dupioni|Shantung|Matka silk|Eri silk|Muga silk|Interlock|Pique|
  Moleskin|Fustian|Flannelette|Sherpa|Boucle|Harris tweed|Oxford cloth|Broadcloth|Sailcloth|Ticking|Buckram|
  Crinoline|Longcloth|Jamdani|Mangalgiri|Kota doria|Maheshwari|Pochampally|Sambalpuri|Mashru|Himroo|Kalamkari|
  Ajrakh|Lamé|Tricot|Ripstop|Cordura|Oilskin|Waxed cotton|Alcantara`,
 aliases: {
  'Suti': 'Cotton', 'Resham': 'Silk', 'Woollen': 'Wool', 'Woolen': 'Wool', 'Oon': 'Wool', 'Jeans': 'Denim',
  'Chamda': 'Leather', 'Chamra': 'Leather', 'Terylene': 'Polyester', 'Dacron': 'Polyester', 'Poly': 'Polyester',
  'Makhmal': 'Velvet', 'Khaddar': 'Khadi', 'Kaanch': 'Glass', 'Kanch': 'Glass', 'Lakdi': 'Wood', 'Wooden': 'Wood',
  'Kagaz': 'Paper', 'Kagaj': 'Paper', 'Loha': 'Iron', 'Viscose': 'Rayon', 'Viscose rayon': 'Rayon', 'Netting': 'Net',
  'Polar fleece': 'Fleece', 'Mitti': 'Clay', 'Patthar': 'Stone',
  'Styrofoam': 'Thermocol', 'Polystyrene': 'Thermocol', 'Thermocole': 'Thermocol',
  'Rexine': 'Faux leather', 'Leatherette': 'Faux leather', 'Artificial leather': 'Faux leather', 'Pleather': 'Faux leather',
  'Vegan leather': 'Faux leather', 'PU leather': 'Faux leather', 'Crape': 'Crepe', 'Cord': 'Corduroy',
  'Mulmul': 'Muslin', 'Malmal': 'Muslin', 'Pashmina wool': 'Pashmina', 'Cashmere wool': 'Cashmere',
  'Lycra': 'Spandex', 'Elastane': 'Spandex', 'Terry': 'Terry cloth', 'Towelling': 'Terry cloth', 'Toweling': 'Terry cloth',
  'Tarp': 'Tarpaulin', 'Tirpal': 'Tarpaulin', 'Ply': 'Plywood', 'Aluminum': 'Aluminium', 'China': 'Porcelain',
  'Fiberglass': 'Fibreglass', 'Glass fibre': 'Fibreglass', 'Polyvinyl chloride': 'PVC',
  'Polyethylene': 'Polythene', 'Polyethene': 'Polythene',
  'Banarasi silk': 'Banarasi', 'Benarasi': 'Banarasi', 'Banarsi': 'Banarasi',
  'Kanchipuram': 'Kanjeevaram', 'Kanjivaram': 'Kanjeevaram', 'Kanchivaram': 'Kanjeevaram',
  'Kanchipuram silk': 'Kanjeevaram', 'Kanjeevaram silk': 'Kanjeevaram',
  'Tussar silk': 'Tussar', 'Tasar': 'Tussar', 'Tussah': 'Tussar', 'Tussore': 'Tussar', 'Kosa': 'Tussar', 'Kosa silk': 'Tussar',
  'Chanderi silk': 'Chanderi', 'Microfibre': 'Microfiber', 'Plaster of Paris': 'Plaster', 'POP': 'Plaster',
  'Feathers': 'Feather', 'Lumber': 'Timber', 'Angora wool': 'Angora', 'Merino wool': 'Merino', 'Alpaca wool': 'Alpaca',
  'Tencel': 'Lyocell', 'Terry cotton': 'Terrycot', 'Terricot': 'Terrycot', 'Carbon fiber': 'Carbon fibre',
  'Burlap': 'Hessian', 'Gunny': 'Hessian', 'Gunny cloth': 'Hessian', 'Sackcloth': 'Hessian', 'Sacking': 'Hessian',
  'Sunmica': 'Laminate', 'Formica': 'Laminate', 'Paper mache': 'Papier-mâché', 'Tar': 'Asphalt', 'Bitumen': 'Asphalt',
  'Artificial silk': 'Art silk', 'Plaid': 'Tartan', 'Ikkat': 'Ikat', 'Bandhej': 'Bandhani', 'Bandhni': 'Bandhani',
  'Plexiglass': 'Perspex', 'Plexiglas': 'Perspex', 'Acrylic glass': 'Perspex', 'Chipboard': 'Particle board',
  'Seashell': 'Shell', 'Nacre': 'Mother of pearl', 'Organdie': 'Organdy', 'Dupion': 'Dupioni', 'Dupioni silk': 'Dupioni',
  'Kota': 'Kota doria'
 }
};
