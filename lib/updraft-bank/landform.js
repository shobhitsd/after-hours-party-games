export default {
 id: 'landform',
 title: 'Name a landform or natural feature',
 icon: '🌋',
 note: 'Valley, delta, fjord, volcano…',
 common: `Mountain|Hill|Valley|River|Lake|Ocean|Sea|Island|Desert|Volcano|Beach|Plateau|Plain|Canyon|Cave|Waterfall|Glacier|Forest|Delta
  |Peninsula|Bay|Gulf|Cliff|Coast|Pond|Stream|Gorge|Dune|Swamp|Lagoon|Oasis|Reef|Jungle|Rainforest|Iceberg|Grassland|Hot spring|Spring`,
 uncommon: `Fjord|Mesa|Butte|Atoll|Archipelago|Isthmus|Strait|Cape|Headland|Estuary|Marsh|Wetland|Bog|Crater|Geyser|Ridge|Peak|Summit
  |Mountain range|Foothill|Basin|Ravine|Cove|Inlet|Channel|Creek|Brook|Tributary|Floodplain|Steppe|Savanna|Prairie|Tundra|Meadow|Moor
  |Badlands|Sinkhole|Stalactite|Stalagmite|Rapids|Cascade|Escarpment|Bluff|Sandbar|Sandbank|Pass|Highland|Lowland|Upland|Monolith|Pinnacle
  |Cavern|Grotto|Mangrove|Salt flat|Ice sheet|Ice cap|Ice shelf|Meander|Oxbow lake|Rift valley|Caldera|Lava|Woodland|Taiga|Islet|Shore
  |Whirlpool|Salt lake|Crater lake|Coral island|Barrier reef|Sea cave|Sea arch|Sea stack|Natural arch|Trench|Waterhole|Glen|Gully|Hillock`,
 rare: `Mid-ocean ridge|Seamount|Abyssal plain|Continental shelf|Hydrothermal vent|Shield volcano|Stratovolcano|Cinder cone|Lava dome|Lava tube
  |Lava field|Fumarole|Mud volcano|Moraine|Drumlin|Esker|Cirque|Arete|Hanging valley|Glacial erratic|Tarn|Crevasse|Icefield|Nunatak
  |Alluvial fan|Levee|River terrace|Plunge pool|Slot canyon|Wadi|Arroyo|Gulch|Spit|Tombolo|Shoal|Barrier island|Cay|Fringing reef|Ria|Bight
  |Sound|Firth|Loch|Mudflat|Salt marsh|Tide pool|Blowhole|Promontory|Massif|Cordillera|Saddle|Col|Spur|Crag|Tor|Knoll|Mound|Outcrop|Hoodoo
  |Inselberg|Karst|Cenote|Tepui|Salt pan|Playa|Erg|Fen|Bayou|Heath|Pampas|Veld|Scrubland|Chaparral|Cloud forest|Billabong|Glade|Grove
  |Thicket|Dale|Hollow|Vale|Fault line|Volcanic plug|Natural bridge|Underground river|Confluence|Distributary|Watershed|Glacial lake`,
 deep: `Guyot|Continental slope|Submarine canyon|Kame|Kettle|Horn|Roche moutonnee|Outwash plain|Serac|Pingo|U-shaped valley|V-shaped valley
  |Braided river|Water gap|Wind gap|Coulee|Box canyon|Bajada|Pediment|Reg|Hamada|Barchan|Yardang|Mogote|Polje|Uvala|Limestone pavement
  |Tower karst|Horst|Graben|Cuesta|Hogback|Flatiron|Fold mountain|Block mountain|Kopje|Wave-cut platform|Raised beach|Sea stump|Shingle beach
  |Salt dome|Sabkha|Mire|Copse|Mud pot|Travertine terrace|Lava plateau|Volcanic cone|Maar|Tuya|Fjard|Peneplain|Monadnock|Ait
  |Snowfield|Bergschrund|Kettle lake|Machair|Dry valley|Meander scar|Point bar|Cut bank|Interfluve`,
 aliases: {
  'Mount': 'Mountain', 'Mountains': 'Mountain', 'Hills': 'Hill', 'Plains': 'Plain', 'Isle': 'Island', 'Sea shore': 'Shore', 'Seashore': 'Shore', 'Shoreline': 'Shore',
  'Coastline': 'Coast', 'Seacoast': 'Coast', 'Falls': 'Waterfall', 'Water fall': 'Waterfall', 'Cataract': 'Waterfall',
  'Sand dune': 'Dune', 'Sand dunes': 'Dune', 'Coral reef': 'Reef', 'Tropical rainforest': 'Rainforest', 'Rain forest': 'Rainforest',
  'Thermal spring': 'Hot spring', 'Hot springs': 'Hot spring', 'Freshwater spring': 'Spring', 'Ice berg': 'Iceberg',
  'Fiord': 'Fjord', 'Savannah': 'Savanna', 'Savana': 'Savanna', 'Swampland': 'Swamp', 'Marshland': 'Marsh', 'Peat bog': 'Bog',
  'Impact crater': 'Crater', 'Meteor crater': 'Crater', 'Mountain peak': 'Peak', 'Mountain pass': 'Pass', 'Mountain ridge': 'Ridge',
  'Range': 'Mountain range', 'Mountain chain': 'Mountain range', 'Foothills': 'Foothill', 'River basin': 'Basin', 'Brooklet': 'Brook',
  'Rivulet': 'Stream', 'Flood plain': 'Floodplain', 'Moorland': 'Moor', 'Heathland': 'Heath', 'Doline': 'Sinkhole', 'Swallow hole': 'Sinkhole',
  'Sink hole': 'Sinkhole', 'Highlands': 'Highland', 'Tableland': 'Plateau', 'Table land': 'Plateau', 'Sea cliff': 'Cliff',
  'Salt flats': 'Salt flat', 'Ice sheets': 'Ice sheet', 'Oxbow': 'Oxbow lake', 'Ox-bow lake': 'Oxbow lake', 'Horseshoe lake': 'Oxbow lake',
  'Rift': 'Rift valley', 'Lava flow': 'Lava', 'Woods': 'Woodland', 'Boreal forest': 'Taiga', 'Mangrove forest': 'Mangrove',
  'Mangrove swamp': 'Mangrove', 'Maelstrom': 'Whirlpool', 'Ocean trench': 'Trench', 'Deep sea trench': 'Trench',
  'Oceanic trench': 'Trench', 'Watering hole': 'Waterhole', 'Arch': 'Natural arch', 'Rock arch': 'Natural arch', 'Stack': 'Sea stack',
  'Gulley': 'Gully', 'Mid ocean ridge': 'Mid-ocean ridge', 'Oceanic ridge': 'Mid-ocean ridge', 'Undersea mountain': 'Seamount',
  'Black smoker': 'Hydrothermal vent', 'Composite volcano': 'Stratovolcano', 'Cinder cone volcano': 'Cinder cone', 'Scoria cone': 'Cinder cone',
  'Lava tunnel': 'Lava tube', 'Lava cave': 'Lava tube', 'Lava bed': 'Lava field', 'Mudpot': 'Mud pot', 'Corrie': 'Cirque', 'Cwm': 'Cirque',
  'Erratic': 'Glacial erratic', 'Pyramidal peak': 'Horn', 'Kettle hole': 'Kettle', 'Ice field': 'Icefield', 'Alluvial cone': 'Alluvial fan',
  'Dry riverbed': 'Wadi', 'Sand spit': 'Spit', 'Barrier islands': 'Barrier island', 'Key': 'Cay', 'Mud flat': 'Mudflat', 'Tidal flat': 'Mudflat',
  'Rock pool': 'Tide pool', 'Tidepool': 'Tide pool', 'Lough': 'Loch', 'Headlands': 'Headland', 'Bornhardt': 'Inselberg',
  'Fairy chimney': 'Hoodoo', 'Fairy chimneys': 'Hoodoo', 'Sinkhole lake': 'Cenote', 'Table-top mountain': 'Tepui', 'Dry lake': 'Playa',
  'Salt pans': 'Salt pan', 'Sand sea': 'Erg', 'Veldt': 'Veld', 'Scrub': 'Scrubland', 'Shrubland': 'Scrubland', 'Clearing': 'Glade',
  'Fault': 'Fault line', 'Fault scarp': 'Escarpment', 'Scarp': 'Escarpment', 'Volcanic neck': 'Volcanic plug', 'Drainage basin': 'Watershed',
  'Catchment': 'Watershed', 'Kettle pond': 'Kettle',
  'Desert pavement': 'Reg', 'Gibber plain': 'Reg', 'Barchan dune': 'Barchan', 'Crescent dune': 'Barchan', 'Koppie': 'Kopje',
  'Glacial valley': 'U-shaped valley', 'Braided stream': 'Braided river', 'Shingle': 'Shingle beach',
  'Pebble beach': 'Shingle beach', 'Fold mountains': 'Fold mountain', 'Block mountains': 'Block mountain', 'Fault block mountain': 'Block mountain',
  'Rock shelf': 'Wave-cut platform', 'Wave cut platform': 'Wave-cut platform', 'Shore platform': 'Wave-cut platform',
  'Eyot': 'Ait', 'Snow field': 'Snowfield', 'Slip-off slope': 'Point bar'
 }
};
