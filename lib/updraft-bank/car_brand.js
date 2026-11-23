export default {
 id: 'car_brand',
 title: 'Name a car brand',
 icon: '🚗',
 note: 'Current or classic car makers, worldwide.',
 common: `Toyota|Honda|Ford|BMW|Mercedes-Benz|Audi|Tesla|Ferrari|Lamborghini|Porsche|Volkswagen|Hyundai|Tata|
  Mahindra|Maruti Suzuki|Suzuki|Kia|Nissan|Chevrolet|Rolls-Royce|Jaguar|Land Rover|Bugatti|Skoda|Renault`,
 uncommon: `McLaren|Aston Martin|Bentley|Maserati|Volvo|Mazda|Mitsubishi|Subaru|Lexus|Jeep|MG|Fiat|Peugeot|
  Citroen|Dodge|Cadillac|Mini|Range Rover|Opel|Alfa Romeo|Lotus|Buick|Chrysler|Hummer|Datsun|Isuzu|
  Hindustan Motors|Force Motors|BYD|Koenigsegg|Pagani|Lincoln|Rivian|Genesis|Infiniti|Acura|GMC|Maybach|
  Daewoo|Premier|Pontiac|Ram|Polestar|Lucid|DeLorean|Smart|Saab|Seat|Shelby|
  Brabus|Ineos|Standard|AC Cars|Aurus|Maxus|Omoda|Ora|Aito|Scout|SRT|Renault Samsung|Rambler`,
 rare: `Cupra|Dacia|Lancia|Abarth|Alpine|DS Automobiles|Vauxhall|Holden|Proton|Perodua|Lada|Trabant|Geely|Chery|
  Great Wall Motors|Haval|Nio|Xpeng|Li Auto|Zeekr|Hongqi|SAIC|Changan|Dongfeng|Wuling|SsangYong|VinFast|Rimac|
  Spyker|TVR|Caterham|Morgan|Austin|Morris|Rover|Triumph|Austin-Healey|Plymouth|Oldsmobile|Mercury|Saturn|
  Scion|AMC|Studebaker|Packard|Fisker|Daihatsu|Tatra|Yugo|De Tomaso|Reva|Lynk & Co|Alpina|Willys|Reliant|
  Pininfarina|Xiaomi|
  Ashok Leyland|Bajaj|Autobianchi|Messerschmitt|DAF|Bizzarrini|Innocenti|Praga|ARO|FSO|Polski Fiat|Steyr-Puch|Gumpert|Apollo|Glas|Goggomobil|Vanden Plas|Alvis|Lanchester|Singer|Marcos|Lister|Allard|
  Frazer Nash|Bond|Peel|BAC|Radical|Westfield|Gordon Murray Automotive|LEVC|Ligier|Aixam|Kaiser|Hupmobile|LaSalle|Crosley|Panoz|Mosler|Canoo|Aptera|Pravaig|Denza|Yangwang|Jetour|Jaecoo|Exeed|Baojun|
  Neta|Aion|Voyah|Tank|Wey|HSV|Luxgen|Iran Khodro|Saipa|Gurgel|Troller|Tofaş|Monteverdi|Marussia|Trumpchi|Brilliance|Haima|Lifan|Foton|Seres|Deepal|Avatr|Geometry|Bufori|Elfin|FPV`,
 deep: `Mitsuoka|Ruf|Hennessey|SSC|Noble|Ariel|Bristol|Jensen|Sunbeam|Hillman|Humber|Riley|Wolseley|Daimler|
  Simca|Talbot|Panhard|Facel Vega|Delage|Delahaye|Hispano-Suiza|Borgward|NSU|DKW|Horch|Auto Union|Wartburg|
  Moskvitch|Zastava|ZAZ|GAZ|UAZ|ZiL|Edsel|DeSoto|Hudson|Nash|Tucker|Duesenberg|Cord|Pierce-Arrow|Stutz|
  Auburn|Checker|Saleen|Vector|Iso|Lagonda|Matra|Venturi|Wiesmann|Donkervoort|Togg|FAW|GAC|JAC|BAIC|Roewe|
  Leapmotor|Karma|Faraday Future|W Motors|Zenvo|Czinger|Ginetta|Sipani|DC Design|Imperial|Eagle|Geo|
  Isdera|Heinkel|Adler|Wanderer|Lloyd|Voisin|REO|Cunningham|Excalibur|Zotye|Hawtai|Forthing|Soueast|Inokom|Esemka|Bolwell|IKA|Mastretta|VUHL|Birkin|NEVS|Pegaso|GTA Spano|Cisitalia|OSCA|Siata|ATS|
  Mazzanti|DR Automobiles|Amilcar|Salmson|Hotchkiss|Melkus|Hanomag|Prince|Autozam|Eunos|Aspark|Asia Motors|Lordstown|Bollinger|Frazer|Gordon-Keeble|Arash|Zenos|Strom Motors|Puma|Minerva|Gillet|Artega|
  IM Motors|Anadol|Rinspeed|Think|IZh|Syrena`,
 aliases: {
  'VW': 'Volkswagen', 'Volks': 'Volkswagen',
  'Mercedes': 'Mercedes-Benz', 'Merc': 'Mercedes-Benz', 'Benz': 'Mercedes-Benz', 'Merz': 'Mercedes-Benz',
  'Mercedes-AMG': 'Mercedes-Benz', 'AMG': 'Mercedes-Benz',
  'Mercedes-Maybach': 'Maybach',
  'Chevy': 'Chevrolet',
  'Maruti': 'Maruti Suzuki', 'Maruti Udyog': 'Maruti Suzuki',
  'Lambo': 'Lamborghini', 'Rolls': 'Rolls-Royce', 'Jag': 'Jaguar', 'Porche': 'Porsche',
  'Beemer': 'BMW', 'Bimmer': 'BMW', 'Bayerische Motoren Werke': 'BMW',
  'Alfa': 'Alfa Romeo', 'Aston': 'Aston Martin',
  'Tata Motors': 'Tata', 'Mahindra and Mahindra': 'Mahindra',
  'Hindustan': 'Hindustan Motors', 'Force': 'Force Motors', 'Premier Automobiles': 'Premier',
  'Morris Garages': 'MG', 'MG Motor': 'MG',
  'Great Wall': 'Great Wall Motors', 'GWM': 'Great Wall Motors',
  'KG Mobility': 'SsangYong',
  'Lucid Motors': 'Lucid', 'Mahindra Reva': 'Reva', 'Karma Automotive': 'Karma',
  'Tesla Motors': 'Tesla', 'Infinity': 'Infiniti', 'SAIC Motor': 'SAIC',
  'DS': 'DS Automobiles', 'Build Your Dreams': 'BYD', 'Moskvich': 'Moskvitch',
  'BMW Alpina': 'Alpina', 'Shelby American': 'Shelby', 'DeLorean Motor Company': 'DeLorean', 'DMC': 'DeLorean',
  'Xiaomi Auto': 'Xiaomi', 'American Motors': 'AMC', 'Volga': 'GAZ',
  'Ineos Automotive': 'Ineos', 'Standard Motor Company': 'Standard', 'AC': 'AC Cars', 'Renault Samsung Motors': 'Renault Samsung', 'Samsung Motors': 'Renault Samsung', 'Renault Korea': 'Renault Samsung',
  'Scout Motors': 'Scout', 'Leyland': 'Ashok Leyland', 'Holden Special Vehicles': 'HSV', 'Ford Performance Vehicles': 'FPV', 'IKCO': 'Iran Khodro', 'Hozon': 'Neta', 'GAC Aion': 'Aion',
  'Zhiji': 'IM Motors', 'GMA': 'Gordon Murray Automotive', 'Gordon Murray': 'Gordon Murray Automotive', 'Briggs Automotive Company': 'BAC', 'London EV Company': 'LEVC', 'London Taxi Company': 'LEVC',
  'Great Wall Ora': 'Ora', 'GWM Ora': 'Ora', 'Kaiser Motors': 'Kaiser', 'Kaiser-Frazer': 'Kaiser', 'Steyr': 'Steyr-Puch', 'Peel Engineering': 'Peel', 'Bond Cars': 'Bond', 'Chery Omoda': 'Omoda',
  'Street and Racing Technology': 'SRT'
 }
};
