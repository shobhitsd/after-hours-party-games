export default {
 id: 'gem',
 title: 'Name a gemstone or mineral',
 icon: '💎',
 note: 'Gems, minerals and ores all count.',
 common: `Diamond|Ruby|Emerald|Sapphire|Pearl|Opal|Amethyst|Topaz|Jade|Quartz|Garnet|Turquoise|Amber|Onyx|Aquamarine|
  Peridot|Agate|Moonstone|Gold|Silver|Coral|Coal|Mica|Copper|Graphite|Gypsum|Iron ore|Bauxite|Platinum|
  Tourmaline|Zircon|Lapis lazuli|Rose quartz|Limestone|Talc|Sulphur`,
 uncommon: `Malachite|Jasper|Obsidian|Bloodstone|Alexandrite|Beryl|Carnelian|Chalcedony|Citrine|Hematite|Morganite|
  Pyrite|Spinel|Sunstone|Tanzanite|Tiger's eye|Cat's eye|Alabaster|Feldspar|Calcite|Dolomite|Magnetite|Fluorite|
  Halite|Corundum|Flint|Jet|Mother of pearl|Cubic zirconia|Moissanite|Yellow sapphire|Star sapphire|
  Smoky quartz|Fire opal|Labradorite|Amazonite|Kunzite|Rhodonite|Rhodochrosite|Serpentine|Sodalite|Azurite|
  Cinnabar|Galena|Manganese ore|Borax|Kaolinite|Asbestos|Olivine|Chromite|Uraninite|Hessonite|Aventurine|
  Sardonyx|Chrysoprase|Iolite|Kyanite|Apatite|Selenite|Zeolite|Moldavite|Howlite|Nephrite|Jadeite|Barite|
  Magnesite|Cassiterite|Sphalerite|Chalcopyrite|Ilmenite|Monazite|Rutile|Biotite|Muscovite|Hornblende`,
 rare: `Rhodolite|Almandine|Pyrope|Spessartine|Grossular|Andradite|Tsavorite|Demantoid|Zoisite|Benitoite|Charoite|
  Diopside|Goshenite|Heliodor|Larimar|Seraphinite|Sugilite|Titanite|Vesuvianite|Andalusite|Chrysoberyl|
  Chrysocolla|Cordierite|Danburite|Hiddenite|Lepidolite|Spodumene|Scapolite|Sillimanite|Staurolite|Smithsonite|
  Variscite|Prehnite|Epidote|Ametrine|Rubellite|Indicolite|Paraiba tourmaline|Schorl|Watermelon tourmaline|
  Padparadscha|Star ruby|Black opal|Rutilated quartz|Milky quartz|Marcasite|Aragonite|Siderite|Limonite|Bornite|
  Cuprite|Stibnite|Molybdenite|Wolframite|Scheelite|Orthoclase|Plagioclase|Albite|Microcline|Pyroxene|Augite|
  Amphibole|Chlorite|Vermiculite|Anhydrite|Sylvite|Celestite|Cerussite|Tektite|Ammolite|Shungite|Bixbite|
  Taaffeite|Painite|Lazurite|Enstatite|Realgar|Orpiment|Desert rose|Chert|Sard|Chrysotile|Wollastonite|
  Tremolite|Actinolite|Goethite|Pyrolusite|Cryolite|Nepheline|Meerschaum|Dioptase|Wulfenite|Vanadinite|
  Apophyllite|Stilbite`,
 deep: `Pargasite|Uvarovite|Amblygonite|Axinite|Datolite|Dumortierite|Euclase|Gaspeite|Hambergite|Hauyne|Kornerupine|
  Afghanite|Boleite|Brazilianite|Clinohumite|Diaspore|Ekanite|Grandidierite|Hackmanite|Jeremejevite|Pezzottaite|
  Phoenicochroite|Pollucite|Purpurite|Rhodizite|Sinhalite|Tugtupite|Villiaumite|Wardite|Musgravite|
  Poudretteite|Serendibite|Phenakite|Petalite|Spectrolite|Thulite|Chiastolite|Hemimorphite|Wavellite|Anglesite|
  Witherite|Strontianite|Crocoite|Pyromorphite|Mimetite|Cavansite|Heulandite|Natrolite|Scolecite|Okenite|
  Arsenopyrite|Elbaite|Dravite|Prase|Montmorillonite|Perovskite|Columbite|Tantalite|Pentlandite|Carnotite|
  Autunite|Torbernite|Leucite|Zincite|Franklinite|Willemite|Trona|Natron|Nitre|Ulexite|Colemanite|Epsomite|
  Alunite|Jarosite|Manganite|Cobaltite|Erythrite|Skutterudite|Millerite|Chalcocite|Covellite|Tetrahedrite|
  Atacamite|Chalcanthite|Glaucophane|Crocidolite|Hypersthene|Aegirine|Phlogopite|Pyrophyllite|Antigorite|
  Lizardite|Ice|Bismuth`,
 aliases: {
  'Heera': 'Diamond', 'Hira': 'Diamond', 'Manik': 'Ruby', 'Manikya': 'Ruby', 'Panna': 'Emerald',
  'Neelam': 'Sapphire', 'Blue sapphire': 'Sapphire', 'Moti': 'Pearl', 'Blue topaz': 'Topaz',
  'Crystal': 'Quartz', 'Rock crystal': 'Quartz', 'Quartz crystal': 'Quartz', 'Sphatik': 'Quartz',
  'Firoza': 'Turquoise', 'Chrysolite': 'Peridot', 'Sona': 'Gold', 'Chandi': 'Silver',
  'Moonga': 'Coral', 'Munga': 'Coral', 'Red coral': 'Coral', 'Koyla': 'Coal', 'Abhrak': 'Mica', 'Tamba': 'Copper',
  'Iron': 'Iron ore', 'Aluminium ore': 'Bauxite', 'Lapis': 'Lapis lazuli', 'Soapstone': 'Talc', 'Steatite': 'Talc',
  'Sulfur': 'Sulphur', 'Brimstone': 'Sulphur', 'Heliotrope': 'Bloodstone', 'Cornelian': 'Carnelian', 'Haematite': 'Hematite',
  "Fool's gold": 'Pyrite', 'Iron pyrite': 'Pyrite', 'Pyrites': 'Pyrite', 'Tiger eye': "Tiger's eye",
  'Lehsunia': "Cat's eye", 'Lahsuniya': "Cat's eye", 'Cymophane': "Cat's eye", 'Vaidurya': "Cat's eye",
  'Lodestone': 'Magnetite', 'Fluorspar': 'Fluorite', 'Rock salt': 'Halite', 'Salt': 'Halite', 'Nacre': 'Mother of pearl',
  'CZ': 'Cubic zirconia', 'American diamond': 'Cubic zirconia', 'Zirconia': 'Cubic zirconia',
  'Pukhraj': 'Yellow sapphire', 'Pushparagam': 'Yellow sapphire', 'Pushkaraj': 'Yellow sapphire', 'Smokey quartz': 'Smoky quartz',
  'Lead ore': 'Galena', 'Manganese': 'Manganese ore', 'Kaolin': 'Kaolinite', 'China clay': 'Kaolinite', 'Chrome ore': 'Chromite',
  'Pitchblende': 'Uraninite', 'Uranium': 'Uraninite', 'Uranium ore': 'Uraninite', 'Gomed': 'Hessonite', 'Gomedh': 'Hessonite',
  'Baryte': 'Barite', 'Barytes': 'Barite', 'Tin ore': 'Cassiterite', 'Tinstone': 'Cassiterite',
  'Zinc blende': 'Sphalerite', 'Zinc ore': 'Sphalerite', 'Zinc': 'Sphalerite',
  'Copper pyrite': 'Chalcopyrite', 'Copper pyrites': 'Chalcopyrite',
  'Sphene': 'Titanite', 'Idocrase': 'Vesuvianite', 'Paraiba': 'Paraiba tourmaline', 'Peacock ore': 'Bornite',
  'Celestine': 'Celestite', 'Red beryl': 'Bixbite', 'Sepiolite': 'Meerschaum',
  'Zultanite': 'Diaspore', 'Csarite': 'Diaspore', 'Saltpetre': 'Nitre', 'Saltpeter': 'Nitre', 'Niter': 'Nitre'
 }
};
