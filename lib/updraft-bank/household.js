export default {
 id: 'household',
 title: 'Name a household appliance or gadget',
 icon: '🔌',
 note: 'Kitchen, cleaning, comfort or electronics.',
 common: `Fridge|Washing machine|Microwave|Television|Fan|Air conditioner|Iron|Vacuum cleaner|Mixer grinder|Geyser|
  Cooler|Toaster|Oven|Stove|Kettle|Blender|Mixer|Juicer|Hair dryer|Heater|Dishwasher|Rice cooker|Water purifier|
  Gas stove|Computer|Laptop|Mobile phone|Radio|Light bulb|Tube light|Lamp|Charger|Remote|Speaker|Ceiling fan|
  Pressure cooker|Induction cooktop|Grinder|Torch|Clock`,
 uncommon: `Table fan|Exhaust fan|Pedestal fan|Chimney|Sandwich maker|Coffee maker|Air fryer|Food processor|
  Hand blender|Hand mixer|Freezer|Dryer|Sewing machine|Air purifier|Immersion rod|Inverter|Stabilizer|
  Extension cord|Power bank|Headphones|Earphones|Camera|Printer|Router|Tablet|Set-top box|Home theatre|
  Music system|DVD player|Game console|Projector|Telephone|Doorbell|Alarm clock|Hair straightener|Trimmer|
  Electric shaver|Weighing scale|Water pump|Gas lighter|Grill|Wet grinder|Water dispenser|Smartwatch|Calculator|
  Thermometer|Mosquito bat|Mosquito repellent|Emergency light|Night lamp|Humidifier|Microphone|Monitor|
  Keyboard|Mouse|Scanner|Pen drive|Battery|Generator|Solar panel|OTG|Roti maker|Egg boiler|Smart speaker|
  Robot vacuum|Treadmill|Lawn mower|Ring light|Game controller|Memory card|Selfie stick|Hot water bottle|Drone|Photocopier`,
 rare: `Stand mixer|Chopper|Waffle maker|Popcorn maker|Ice cream maker|Bread maker|Slow cooker|Multicooker|
  Deep fryer|Barbecue|Hot plate|Steamer|Espresso machine|Coffee grinder|Toaster oven|Range|Cooktop|
  Garment steamer|Wall fan|Tower fan|Radiator|Blower|Dehumidifier|Thermostat|Heating pad|Electric blanket|
  Boiler|Soundbar|VCR|CD player|Record player|Tape recorder|Walkman|MP3 player|Streaming stick|Antenna|
  Satellite dish|Amplifier|Cordless phone|Intercom|Fax machine|Webcam|Adapter|UPS|Modem|Fitness band|Camcorder|
  CCTV camera|Smoke detector|E-reader|Chandelier|Curling iron|Epilator|Electric toothbrush|Massager|Vaporizer|
  BP monitor|Oximeter|Bottle opener|Can opener|Peeler|Grater|Whisk|Timer|Thermos|Typewriter|
  Wi-Fi extender|Solar water heater|Electric lunch box|Electric tandoor|Tea maker|Citrus juicer|Flour mill|Smart plug|
  Smart bulb|Neckband|Wireless charger|Karaoke machine|Action camera|Instant camera|Laser pointer|Handheld vacuum|
  Leaf blower|Hedge trimmer|Spin mop|Foot massager|Massage chair|Hearing aid|LED strip|Solar light|Lantern|
  Coffee percolator|French press|Moka pot|Pizza oven|Food warmer|Bottle warmer|Pizza cutter|Nutcracker|Corkscrew|Stopwatch`,
 deep: `Sous vide|Dehydrator|Yogurt maker|Soda maker|Milk frother|Ice maker|Wine cooler|Garbage disposal|
  Trash compactor|Steam mop|Carpet cleaner|Floor polisher|Lint remover|Pressure washer|Furnace|Bug zapper|
  Blu-ray player|Gramophone|Subwoofer|Answering machine|Hard drive|Video doorbell|Smart lock|Baby monitor|
  Burglar alarm|VR headset|Digital photo frame|Fairy lights|Water flosser|Massage gun|Glucometer|Nebulizer|
  Garlic press|Salad spinner|Shredder|Laminator|Label maker|Walkie-talkie|Garage door opener|Diffuser|Samovar|
  Electric knife|Meat grinder|Pasta maker|Rotisserie|Electric griddle|
  Graphics tablet|Card reader|USB hub|Pager|Gimbal|String trimmer|Pest repeller|Infrared thermometer|Heated towel rail|
  Hair crimper|Knitting machine|Electric fireplace|Air curtain|Bottle sterilizer|Cotton candy machine|Chocolate fountain|
  Fondue set|Vacuum sealer|Meat thermometer|Spiralizer|Mandoline|Egg slicer|Ice crusher|Washer dryer`,
 aliases: {
  'Refrigerator': 'Fridge', 'Frig': 'Fridge', 'Washer': 'Washing machine', 'Microwave oven': 'Microwave', 'Micro': 'Microwave',
  'TV': 'Television', 'Telly': 'Television', 'Smart TV': 'Television', 'LED TV': 'Television', 'LCD TV': 'Television',
  'Electric fan': 'Fan', 'Pankha': 'Fan',
  'AC': 'Air conditioner', 'Aircon': 'Air conditioner', 'Air conditioning': 'Air conditioner', 'Split AC': 'Air conditioner',
  'Window AC': 'Air conditioner', 'Iron box': 'Iron', 'Press': 'Iron', 'Steam iron': 'Iron', 'Electric iron': 'Iron',
  'Clothes iron': 'Iron', 'Istri': 'Iron', 'Vacuum': 'Vacuum cleaner', 'Hoover': 'Vacuum cleaner',
  'Mixie': 'Mixer grinder', 'Mixi': 'Mixer grinder', 'Mixy': 'Mixer grinder', 'Juicer mixer grinder': 'Mixer grinder',
  'Water heater': 'Geyser', 'Air cooler': 'Cooler', 'Desert cooler': 'Cooler', 'Room cooler': 'Cooler', 'Evaporative cooler': 'Cooler',
  'Bread toaster': 'Toaster', 'Electric oven': 'Oven', 'Electric stove': 'Stove', 'Chulha': 'Stove',
  'Electric kettle': 'Kettle', 'Tea kettle': 'Kettle', 'Blow dryer': 'Hair dryer',
  'Room heater': 'Heater', 'Space heater': 'Heater', 'Electric heater': 'Heater',
  'Electric cooker': 'Rice cooker', 'Electric rice cooker': 'Rice cooker',
  'RO': 'Water purifier', 'Water filter': 'Water purifier', 'RO purifier': 'Water purifier', 'Purifier': 'Water purifier',
  'Aquaguard': 'Water purifier', 'Gas': 'Gas stove', 'Gas burner': 'Gas stove', 'Gas chulha': 'Gas stove', 'Burner': 'Gas stove',
  'PC': 'Computer', 'Desktop': 'Computer', 'Desktop computer': 'Computer',
  'Mobile': 'Mobile phone', 'Cell phone': 'Mobile phone', 'Smartphone': 'Mobile phone', 'Phone': 'Mobile phone',
  'Bulb': 'Light bulb', 'LED bulb': 'Light bulb', 'CFL': 'Light bulb', 'Electric bulb': 'Light bulb', 'LED light': 'Light bulb',
  'Light': 'Light bulb', 'Tube': 'Tube light', 'Fluorescent light': 'Tube light', 'Fluorescent lamp': 'Tube light',
  'Table lamp': 'Lamp', 'Desk lamp': 'Lamp', 'Study lamp': 'Lamp', 'Floor lamp': 'Lamp',
  'Mobile charger': 'Charger', 'Phone charger': 'Charger', 'Remote control': 'Remote', 'TV remote': 'Remote',
  'Bluetooth speaker': 'Speaker', 'Loudspeaker': 'Speaker', 'Cooker': 'Pressure cooker',
  'Induction': 'Induction cooktop', 'Induction stove': 'Induction cooktop', 'Induction cooker': 'Induction cooktop',
  'Induction hob': 'Induction cooktop', 'Induction plate': 'Induction cooktop', 'Flashlight': 'Torch', 'Wall clock': 'Clock',
  'Stand fan': 'Pedestal fan', 'Standing fan': 'Pedestal fan',
  'Kitchen chimney': 'Chimney', 'Range hood': 'Chimney', 'Cooker hood': 'Chimney', 'Extractor hood': 'Chimney', 'Exhaust hood': 'Chimney',
  'Sandwich toaster': 'Sandwich maker', 'Toastie maker': 'Sandwich maker', 'Panini press': 'Sandwich maker',
  'Coffee machine': 'Coffee maker', 'Immersion blender': 'Hand blender', 'Stick blender': 'Hand blender',
  'Electric whisk': 'Hand mixer', 'Electric beater': 'Hand mixer', 'Beater': 'Hand mixer', 'Egg beater': 'Hand mixer',
  'Deep freezer': 'Freezer', 'Deep freeze': 'Freezer', 'Tumble dryer': 'Dryer', 'Clothes dryer': 'Dryer', 'Silai machine': 'Sewing machine',
  'Immersion heater': 'Immersion rod', 'Heating rod': 'Immersion rod', 'Water heating rod': 'Immersion rod', 'Rod': 'Immersion rod',
  'Stabiliser': 'Stabilizer', 'Voltage stabilizer': 'Stabilizer',
  'Extension board': 'Extension cord', 'Extension box': 'Extension cord', 'Power strip': 'Extension cord', 'Spike guard': 'Extension cord',
  'Extension': 'Extension cord', 'Extension lead': 'Extension cord',
  'Headphone': 'Headphones', 'Headset': 'Headphones', 'Earphone': 'Earphones', 'Earbuds': 'Earphones', 'AirPods': 'Earphones',
  'Digital camera': 'Camera', 'DSLR': 'Camera', 'WiFi router': 'Router', 'Wifi': 'Router', 'iPad': 'Tablet', 'Tab': 'Tablet',
  'DTH': 'Set-top box', 'Cable box': 'Set-top box', 'Setup box': 'Set-top box', 'STB': 'Set-top box',
  'Home theater': 'Home theatre', 'Home theatre system': 'Home theatre',
  'Stereo': 'Music system', 'Stereo system': 'Music system', 'Hi-fi': 'Music system', 'Music player': 'Music system',
  'Gaming console': 'Game console', 'PlayStation': 'Game console', 'Xbox': 'Game console', 'Video game console': 'Game console',
  'Video game': 'Game console', 'Console': 'Game console', 'Landline': 'Telephone', 'Landline phone': 'Telephone',
  'Calling bell': 'Doorbell', 'Bell': 'Doorbell', 'Straightener': 'Hair straightener', 'Flat iron': 'Hair straightener',
  'Beard trimmer': 'Trimmer', 'Hair trimmer': 'Trimmer', 'Hair clipper': 'Trimmer', 'Shaver': 'Electric shaver', 'Electric razor': 'Electric shaver',
  'Weighing machine': 'Weighing scale', 'Bathroom scale': 'Weighing scale', 'Kitchen scale': 'Weighing scale', 'Scale': 'Weighing scale',
  'Motor': 'Water pump', 'Water motor': 'Water pump', 'Pump': 'Water pump', 'Lighter': 'Gas lighter', 'Kitchen lighter': 'Gas lighter',
  'Electric grill': 'Grill', 'Griller': 'Grill', 'Water cooler': 'Water dispenser', 'Digital thermometer': 'Thermometer',
  'Mosquito racket': 'Mosquito bat', 'Mosquito racquet': 'Mosquito bat', 'Electric racket': 'Mosquito bat', 'Electric fly swatter': 'Mosquito bat',
  'Mosquito machine': 'Mosquito repellent', 'Mosquito repellent machine': 'Mosquito repellent', 'Emergency lamp': 'Emergency light',
  'Night light': 'Night lamp', 'Night bulb': 'Night lamp', 'Mic': 'Microphone', 'Mike': 'Microphone',
  'USB drive': 'Pen drive', 'Flash drive': 'Pen drive', 'Thumb drive': 'Pen drive', 'USB stick': 'Pen drive', 'USB': 'Pen drive',
  'Cell': 'Battery', 'Genset': 'Generator', 'Oven toaster griller': 'OTG', 'Oven toaster grill': 'OTG', 'Chapati maker': 'Roti maker',
  'Alexa': 'Smart speaker', 'Echo': 'Smart speaker', 'Google Home': 'Smart speaker',
  'Roomba': 'Robot vacuum', 'Robotic vacuum': 'Robot vacuum', 'Robot vacuum cleaner': 'Robot vacuum',
  'Vegetable chopper': 'Chopper', 'Electric chopper': 'Chopper', 'Waffle iron': 'Waffle maker', 'Popcorn machine': 'Popcorn maker',
  'Bread machine': 'Bread maker', 'Crock pot': 'Slow cooker', 'Instant pot': 'Multicooker', 'Electric pressure cooker': 'Multicooker',
  'BBQ': 'Barbecue', 'Barbeque': 'Barbecue', 'Barbecue grill': 'Barbecue', 'Food steamer': 'Steamer',
  'Cooking range': 'Range', 'Hob': 'Cooktop', 'Clothes steamer': 'Garment steamer', 'Hot air blower': 'Blower', 'Heat blower': 'Blower',
  'Turntable': 'Record player', 'Cassette player': 'Tape recorder', 'Cassette recorder': 'Tape recorder',
  'Fire stick': 'Streaming stick', 'Fire TV stick': 'Streaming stick', 'Chromecast': 'Streaming stick',
  'Aerial': 'Antenna', 'TV antenna': 'Antenna', 'Dish': 'Satellite dish', 'Dish antenna': 'Satellite dish', 'Dish TV': 'Satellite dish',
  'Fax': 'Fax machine', 'Adaptor': 'Adapter', 'Fitness tracker': 'Fitness band', 'Smart band': 'Fitness band', 'Fitbit': 'Fitness band',
  'Video camera': 'Camcorder', 'Handycam': 'Camcorder', 'CCTV': 'CCTV camera', 'Security camera': 'CCTV camera',
  'Smoke alarm': 'Smoke detector', 'Kindle': 'E-reader', 'Ebook reader': 'E-reader',
  'Hair curler': 'Curling iron', 'Curler': 'Curling iron', 'Curling tong': 'Curling iron', 'Curling wand': 'Curling iron',
  'Vaporiser': 'Vaporizer', 'Steam inhaler': 'Vaporizer', 'Facial steamer': 'Vaporizer',
  'Blood pressure monitor': 'BP monitor', 'BP machine': 'BP monitor', 'Pulse oximeter': 'Oximeter',
  'Tin opener': 'Can opener', 'Kitchen timer': 'Timer', 'Egg timer': 'Timer',
  'Flask': 'Thermos', 'Thermos flask': 'Thermos', 'Vacuum flask': 'Thermos',
  'Food dehydrator': 'Dehydrator', 'Curd maker': 'Yogurt maker', 'Yoghurt maker': 'Yogurt maker', 'SodaStream': 'Soda maker',
  'Insect killer': 'Bug zapper', 'Fly zapper': 'Bug zapper', 'Woofer': 'Subwoofer', 'Hard disk': 'Hard drive',
  'Smart doorbell': 'Video doorbell', 'Security alarm': 'Burglar alarm', 'Alarm': 'Burglar alarm', 'String lights': 'Fairy lights',
  'Glucose meter': 'Glucometer', 'Sugar machine': 'Glucometer', 'Nebuliser': 'Nebulizer', 'Paper shredder': 'Shredder',
  'Aroma diffuser': 'Diffuser', 'Oil diffuser': 'Diffuser', 'Mincer': 'Meat grinder', 'Griddle': 'Electric griddle',
  'Lawnmower': 'Lawn mower', 'Grass cutter': 'Lawn mower', 'Selfie ring light': 'Ring light', 'Joystick': 'Game controller', 'Gamepad': 'Game controller',
  'Controller': 'Game controller', 'SD card': 'Memory card', 'Micro SD card': 'Memory card', 'Hot water bag': 'Hot water bottle',
  'Xerox machine': 'Photocopier', 'Xerox': 'Photocopier', 'Photocopy machine': 'Photocopier', 'Copier': 'Photocopier',
  'WiFi extender': 'Wi-Fi extender', 'Range extender': 'Wi-Fi extender', 'Wifi repeater': 'Wi-Fi extender', 'Solar geyser': 'Solar water heater',
  'Electric tiffin': 'Electric lunch box', 'Atta chakki': 'Flour mill', 'Chakki': 'Flour mill', 'Smart socket': 'Smart plug', 'Neckband earphones': 'Neckband',
  'Wireless charging pad': 'Wireless charger', 'GoPro': 'Action camera', 'Polaroid': 'Instant camera', 'Polaroid camera': 'Instant camera',
  'Dustbuster': 'Handheld vacuum', 'Hand vacuum': 'Handheld vacuum', 'Weed trimmer': 'String trimmer', 'Weed eater': 'String trimmer',
  'Strimmer': 'String trimmer', 'Hearing machine': 'Hearing aid', 'LED strip light': 'LED strip', 'Strip lights': 'LED strip', 'Solar lamp': 'Solar light',
  'Percolator': 'Coffee percolator', 'Cafetiere': 'French press', 'Plunger coffee maker': 'French press', 'Pizza wheel': 'Pizza cutter',
  'Nut cracker': 'Nutcracker', 'Wine opener': 'Corkscrew', 'Stop watch': 'Stopwatch', 'Drawing tablet': 'Graphics tablet', 'Pen tablet': 'Graphics tablet',
  'Beeper': 'Pager', 'Ultrasonic pest repeller': 'Pest repeller', 'IR thermometer': 'Infrared thermometer', 'Towel warmer': 'Heated towel rail',
  'Crimper': 'Hair crimper', 'Candy floss machine': 'Cotton candy machine', 'Vacuum packer': 'Vacuum sealer', 'Spiraliser': 'Spiralizer',
  'Mandolin slicer': 'Mandoline', 'Bottle steriliser': 'Bottle sterilizer', 'Washer-dryer': 'Washer dryer', 'Oil heater': 'Radiator',
  'Oil filled radiator': 'Radiator', 'Fan heater': 'Heater', 'Halogen heater': 'Heater', 'Convection oven': 'Oven', 'Surge protector': 'Extension cord',
  'Transistor': 'Radio', 'Feature phone': 'Mobile phone', 'Desk fan': 'Table fan'
 }
};
