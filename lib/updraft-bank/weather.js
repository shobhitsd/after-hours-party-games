export default {
 id: 'weather',
 title: 'Name a weather phenomenon',
 icon: '⛈️',
 common: `Rain|Snow|Wind|Storm|Thunder|Lightning|Hail|Fog|Cloud|Tornado|Hurricane|Blizzard|Frost|Mist|Rainbow|Drizzle|
  Breeze|Cyclone|Sunshine|Thunderstorm|Heatwave|Monsoon|Flood|Drought|Smog|Humidity|Heat|Cold|Typhoon|Gale|Dew|
  Sleet|Shower|Snowstorm`,
 uncommon: `Loo|Dust storm|Sandstorm|Haze|Cold wave|Downpour|Cloudburst|Rainstorm|Windstorm|Tropical storm|Whirlwind|
  Gust|Dust devil|Squall|Aurora|Waterspout|Ice storm|Freezing rain|Halo|Mirage|Cold front|Warm front|Tempest|
  Whiteout|Black ice|Flash flood|Acid rain|El Niño|La Niña|Overcast|Clear sky|Jet stream|Sea breeze|
  Land breeze|Trade winds|Depression|Anticyclone|Storm surge|Wind chill|Double rainbow|Thundersnow|Flurry|
  Polar vortex|Zephyr|Calm|Dry spell|Hoar frost|Deluge|Precipitation|Cumulus|Cumulonimbus|Nimbus|Stratus|
  Cirrus|Sun shower|Turbulence|Freeze|Thaw|Indian summer|Funnel cloud`,
 rare: `Virga|Sun dog|Graupel|Derecho|Downburst|Microburst|Haboob|Fogbow|Inversion|Mistral|Sirocco|Chinook|Foehn|
  Supercell|Air frost|Alpenglow|Anvil cloud|Ball lightning|Blood rain|Brocken spectre|Crepuscular rays|
  Fata morgana|Fire whirl|Glaze|Green flash|Ground blizzard|Ice fog|Lenticular cloud|Light pillar|Harmattan|
  Khamsin|Simoom|Bora|Nor'easter|Tropical depression|Wind shear|Sheet lightning|Forked lightning|Moonbow|Rime|
  Mango showers|Kalbaisakhi|Western disturbance|Westerlies|Doldrums|Trough|Ridge|Nimbostratus|Mammatus|
  Shelf cloud|Wall cloud|Heat dome|Bomb cyclone|Snow squall|Lake-effect snow|Santa Ana winds|Katabatic wind|
  Anabatic wind|Mizzle|Updraft|Downdraft|Thermal|Diamond dust|Freezing fog|Sea fog`,
 deep: `Autan|Bise|Buran|Calima|Chubasco|Elephanta|Ghibli|Gregale|Kona storm|Koshava|Leveche|Marin|Norte|Pampero|
  Papagayo|Reshabar|Southerly buster|Sudestada|Tehuantepecer|Vardar|Williwaw|Willy-willy|Zonda|Pogonip|
  Catatumbo lightning|Fallstreak hole|Levant|Meltemi|Tramontane|Libeccio|Shamal|Brickfielder|Fremantle Doctor|
  Cape Doctor|Berg wind|Mountain breeze|Valley breeze|Roll cloud|Altocumulus|Altostratus|Cirrocumulus|
  Cirrostratus|Stratocumulus|Noctilucent cloud|Nacreous cloud|Morning glory cloud|Kelvin-Helmholtz cloud|
  Asperitas|Freezing drizzle|Ice pellets|Ground frost|Radiation fog|Advection fog|Corona|Glory|
  Iridescent cloud|Heat lightning|St. Elmo's fire|Sprite|Circumhorizontal arc|Mesocyclone|Squall line|
  Extratropical cyclone|Medicane|Occluded front|Stationary front`,
 aliases: {
  'Rainy': 'Rain', 'Raining': 'Rain', 'Rainfall': 'Rain', 'Baarish': 'Rain', 'Barish': 'Rain', 'Varsha': 'Rain',
  'Snowy': 'Snow', 'Snowfall': 'Snow', 'Snowing': 'Snow', 'Barfbari': 'Snow', 'Windy': 'Wind', 'Hawa': 'Wind',
  'Stormy': 'Storm', 'Toofan': 'Storm', 'Tufan': 'Storm', 'Thunderclap': 'Thunder',
  'Thunderbolt': 'Lightning', 'Lightning strike': 'Lightning', 'Lightning bolt': 'Lightning', 'Bijli': 'Lightning',
  'Hailstorm': 'Hail', 'Hailstones': 'Hail', 'Hailstone': 'Hail', 'Ole': 'Hail',
  'Foggy': 'Fog', 'Kohra': 'Fog', 'Dhund': 'Fog', 'Cloudy': 'Cloud', 'Badal': 'Cloud', 'Baadal': 'Cloud',
  'Twister': 'Tornado', 'Misty': 'Mist', 'Indradhanush': 'Rainbow', 'Tropical cyclone': 'Cyclone', 'Chakravat': 'Cyclone',
  'Sunny': 'Sunshine', 'Sun': 'Sunshine', 'Sunlight': 'Sunshine', 'Sunny day': 'Sunshine', 'Dhoop': 'Sunshine',
  'Lightning storm': 'Thunderstorm', 'Electrical storm': 'Thunderstorm',
  'Flooding': 'Flood', 'Baadh': 'Flood', 'Sukha': 'Drought', 'Humid': 'Humidity', 'Humid weather': 'Humidity',
  'Hot': 'Heat', 'Garmi': 'Heat', 'Hot weather': 'Heat', 'Chilly': 'Cold', 'Sardi': 'Cold', 'Thand': 'Cold', 'Cold weather': 'Cold',
  'Rain shower': 'Shower', 'Lu': 'Loo', 'Aandhi': 'Dust storm', 'Andhi': 'Dust storm', 'Kali andhi': 'Dust storm',
  'Cold snap': 'Cold wave', 'Cold spell': 'Cold wave',
  'Heavy rain': 'Downpour', 'Torrential rain': 'Downpour', 'Heavy rainfall': 'Downpour', 'Gust of wind': 'Gust',
  'Northern lights': 'Aurora', 'Aurora borealis': 'Aurora', 'Southern lights': 'Aurora', 'Aurora australis': 'Aurora',
  'Polar lights': 'Aurora', 'Clear': 'Clear sky', 'Clear skies': 'Clear sky', 'Fair weather': 'Clear sky',
  'Low pressure': 'Depression', 'Low pressure area': 'Depression', 'High pressure': 'Anticyclone', 'Snow flurry': 'Flurry',
  'Parhelion': 'Sun dog', 'Mock sun': 'Sun dog', 'Temperature inversion': 'Inversion', 'Scirocco': 'Sirocco', 'Fohn': 'Foehn',
  'Crepuscular': 'Crepuscular rays', 'Sunbeams': 'Crepuscular rays', 'God rays': 'Crepuscular rays',
  'Firenado': 'Fire whirl', 'Fire tornado': 'Fire whirl', 'Fire devil': 'Fire whirl',
  'Lenticular': 'Lenticular cloud', 'Sun pillar': 'Light pillar', 'Simoon': 'Simoom', 'Northeaster': "Nor'easter",
  'Rime ice': 'Rime', 'Norwester': 'Kalbaisakhi', 'Mammatus cloud': 'Mammatus',
  'Santa Ana': 'Santa Ana winds', 'Santa Anas': 'Santa Ana winds', 'Katabatic': 'Katabatic wind', 'Anabatic': 'Anabatic wind',
  'Haar': 'Sea fog', 'Kosava': 'Koshava', 'Kossava': 'Koshava', 'Southerly': 'Southerly buster',
  'Willie willie': 'Willy-willy', 'Catatumbo': 'Catatumbo lightning', 'Fallstreak': 'Fallstreak hole',
  'Levanter': 'Levant', 'Etesian': 'Meltemi', 'Tramontana': 'Tramontane', 'Cloud iridescence': 'Iridescent cloud',
  "Saint Elmo's fire": "St. Elmo's fire"
 }
};
