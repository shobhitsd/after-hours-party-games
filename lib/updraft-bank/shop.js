export default {
 id: 'shop',
 title: 'Name a type of shop or business',
 icon: '🏪',
 note: 'Bakery, pharmacy, kirana… not brand names.',
 common: `Bakery|Pharmacy|Kirana store|Supermarket|Butcher|Restaurant|Café|Salon|Barber shop|Bookshop|Stationery shop|Clothes shop|
  Shoe shop|Jewellery shop|Toy shop|Sweet shop|Vegetable shop|Fruit shop|Hardware store|Electronics store|Mobile shop|
  Furniture shop|Bank|Petrol pump|Hotel|Dairy|Florist|Tailor|Laundry|Pet shop|Gift shop|Optician|Department store|Dhaba|
  Tea stall|Paan shop|Ice cream parlour|Juice shop|Gym|Garage|Car showroom|Travel agency|Beauty parlour|Grocery store`,
 uncommon: `Boutique|Convenience store|Fishmonger|Delicatessen|Wine shop|Pub|Bar|Fast food restaurant|Pizzeria|Patisserie|
  Confectionery|Flour mill|Ration shop|Hypermarket|Wholesaler|Discount store|Thrift store|Pawn shop|Antique shop|Art gallery|
  Music shop|Computer shop|Photo studio|Print shop|Cyber café|Repair shop|Dry cleaner|Laundromat|Fabric shop|Sports shop|
  Bicycle shop|Car wash|Spa|Tattoo parlour|Coaching centre|Real estate agency|Newsagent|Food stall|Kiosk|Garden centre|
  Bike showroom|Car rental|Courier service|Caterer|Nightclub|Brewery|Cinema|Hostel|Guest house|Resort|Motel|Bistro|Takeaway|
  Xerox shop|Mobile repair shop|Paint shop|Electrical shop|Saree shop|Dry fruit shop|Organic store|Shoe repair shop|Watch shop`,
 rare: `Cheese shop|Chocolate shop|Spice shop|Milk booth|Meat shop|Chicken shop|Health food store|Cash and carry|Dollar store|
  Charity shop|Frame shop|Craft shop|Record store|Video game store|Camera shop|Printing press|Recharge shop|Watch repair shop|
  Key cutting shop|Bag shop|Auto parts shop|Tyre shop|Service centre|Lighting shop|Tile shop|Sanitaryware shop|Glass shop|
  Plywood shop|Mattress shop|Carpet shop|Home decor store|Kitchenware shop|Utensil shop|Crockery shop|Appliance store|Baby shop|
  Card shop|Party supply store|Fireworks shop|Plant nursery|Aquarium shop|Vet clinic|Massage parlour|Nail salon|Yoga studio|
  Dance studio|Driving school|Day care|Play school|Insurance agency|Dental clinic|Clinic|Diagnostic centre|
  Funeral home|Tent house|Bike rental|Food truck|Chaat stall|Tobacconist|Diner|Burger joint|Sushi bar|Steakhouse|Chip shop|
  Kebab shop|Mess|Tiffin service|Cloud kitchen|Wine bar|Pottery shop|Handicraft shop|Emporium|Khadi store|Souvenir shop|
  Duty-free shop|Variety store|Haberdashery|Bridal shop|Perfume shop|Cosmetics shop|Money exchange|Amusement arcade|Gaming zone|
  Factory outlet|Showroom|Teahouse|Doughnut shop|Ice cream truck|Hookah bar|Bowling alley|Bookbinder|Lending library|Fancy store|
  Bangle shop|Grain merchant|Timber yard|Builders' merchant|Scrap shop|Junkyard|Hearing aid centre|Mobile accessories shop|
  Namkeen shop`,
 deep: `Seed shop|Fertiliser shop|Feed store|Pet grooming salon|STD booth|Luggage shop|Puncture shop|Welding shop|Darshini|
  Udupi restaurant|Brasserie|Noodle bar|Bagel shop|Trading post|Pop-up shop|Hat shop|Surgical store|Escape room|Chandlery|
  Trattoria|Osteria|Taverna|Tapas bar|Izakaya|Ramen shop|Dim sum restaurant|Crêperie|Charcuterie|Rotisserie|Smokehouse|
  Gastropub|Roadhouse|Truck stop|Automat|Luncheonette|Soda fountain|Milk bar|Arhat|Chit fund|Cooperative store|Book stall|
  Lottery stall|Stamp vendor|Notary office|Typing centre|Passport agent|Visa agency|Employment agency|Marriage bureau|
  Astrology centre|Detective agency|Security agency|Pest control service|Packers and movers|Transport company|Tour operator|
  Driving range|Shooting range|Riding school|Swimming school|Music school|Art school|Language school|Computer institute|
  Beauty academy|Bridal studio|Mehndi stall|Rangoli shop|Puja samagri shop|Idol shop|Kite shop|Rakhi stall|Lamination shop`,
 aliases: {
  'Bakers': 'Bakery', 'Baker': 'Bakery', 'Bake shop': 'Bakery', 'Cake shop': 'Bakery', 'Boulangerie': 'Bakery',
  'Drugstore': 'Pharmacy', 'Drug store': 'Pharmacy', 'Medicine shop': 'Pharmacy', 'Dawakhana': 'Pharmacy', 'Medical store': 'Pharmacy', 'Medical shop': 'Pharmacy', 'Medicals': 'Pharmacy', 'Chemist': 'Pharmacy', "Chemist's": 'Pharmacy', 'Apothecary': 'Pharmacy',
  'Kirana': 'Kirana store', 'Kirana shop': 'Kirana store', 'Provision store': 'Kirana store', 'Provisions store': 'Kirana store', 'General store': 'Kirana store', 'General stores': 'Kirana store', 'Kirana bhandar': 'Kirana store',
  'Grocery': 'Grocery store', 'Grocer': 'Grocery store', "Grocer's": 'Grocery store', 'Departmental store': 'Department store',
  "Butcher's": 'Butcher', 'Butcher shop': 'Butcher', 'Butchery': 'Butcher', 'Eatery': 'Restaurant', 'Bhojanalaya': 'Restaurant', 'Bhojnalaya': 'Restaurant', 'Cafe': 'Café', 'Coffee shop': 'Café', 'Coffeehouse': 'Café', 'Coffee house': 'Café',
  'Hair salon': 'Salon', "Hairdresser's": 'Salon', 'Hairdresser': 'Salon', "Barber's": 'Barber shop', 'Barbershop': 'Barber shop', 'Nai ki dukaan': 'Barber shop',
  'Bookstore': 'Bookshop', 'Book store': 'Bookshop', 'Bookseller': 'Bookshop', 'Pustak bhandar': 'Bookshop', 'Stationers': 'Stationery shop', 'Stationery store': 'Stationery shop', 'Stationer': 'Stationery shop',
  'Clothing store': 'Clothes shop', 'Clothing shop': 'Clothes shop', 'Garment shop': 'Clothes shop', 'Readymade garments': 'Clothes shop', 'Apparel store': 'Clothes shop',
  'Shoe store': 'Shoe shop', 'Footwear shop': 'Shoe shop', 'Footwear store': 'Shoe shop', 'Jeweller': 'Jewellery shop', 'Jewelers': 'Jewellery shop', 'Jewelry store': 'Jewellery shop', 'Jewellery store': 'Jewellery shop', 'Gold shop': 'Jewellery shop', 'Sunar shop': 'Jewellery shop',
  'Toy store': 'Toy shop', 'Sweets shop': 'Sweet shop', 'Candy store': 'Sweet shop', 'Candy shop': 'Sweet shop', 'Mithai shop': 'Sweet shop', 'Mithai': 'Sweet shop', 'Halwai': 'Sweet shop', 'Halwai shop': 'Sweet shop', 'Sweet mart': 'Sweet shop', 'Sweetmeat shop': 'Sweet shop',
  'Sabzi shop': 'Vegetable shop', 'Sabzi mandi': 'Vegetable shop', 'Greengrocer': 'Vegetable shop', 'Greengrocers': 'Vegetable shop', "Greengrocer's": 'Vegetable shop', 'Fruit stall': 'Fruit shop',
  'Hardware': 'Hardware store', 'Hardware shop': 'Hardware store', 'Ironmonger': 'Hardware store', 'Ironmongery': 'Hardware store', 'Electronics shop': 'Electronics store', 'Electronic shop': 'Electronics store',
  'Mobile store': 'Mobile shop', 'Phone shop': 'Mobile shop', 'Mobile phone shop': 'Mobile shop', 'Furniture store': 'Furniture shop',
  'Gas station': 'Petrol pump', 'Petrol station': 'Petrol pump', 'Filling station': 'Petrol pump', 'Fuel station': 'Petrol pump', 'Lodge': 'Hotel', 'Milk dairy': 'Dairy', 'Dairy shop': 'Dairy',
  'Flower shop': 'Florist', "Florist's": 'Florist', 'Flower stall': 'Florist', 'Garland shop': 'Florist', 'Phool wala': 'Florist', 'Tailoring shop': 'Tailor', 'Tailor shop': 'Tailor', 'Darzi': 'Tailor',
  'Laundry shop': 'Laundry', 'Dhobi': 'Laundry', 'Pet store': 'Pet shop', 'Gift store': 'Gift shop',
  'Opticians': 'Optician', 'Opticals': 'Optician', 'Optical shop': 'Optician', 'Optical store': 'Optician', 'Eyewear store': 'Optician', 'Spectacles shop': 'Optician',
  'Chai shop': 'Tea stall', 'Tea shop': 'Tea stall', 'Chai stall': 'Tea stall', 'Chai tapri': 'Tea stall', 'Tapri': 'Tea stall',
  'Paan stall': 'Paan shop', 'Pan shop': 'Paan shop', 'Pan bidi shop': 'Paan shop', 'Ice cream shop': 'Ice cream parlour', 'Ice cream parlor': 'Ice cream parlour', 'Gelateria': 'Ice cream parlour', 'Gelato shop': 'Ice cream parlour',
  'Juice centre': 'Juice shop', 'Juice stall': 'Juice shop', 'Juice bar': 'Juice shop', 'Smoothie bar': 'Juice shop', 'Gymnasium': 'Gym', 'Fitness centre': 'Gym', 'Health club': 'Gym',
  'Auto repair shop': 'Garage', 'Mechanic shop': 'Garage', 'Car repair shop': 'Garage', 'Car dealership': 'Car showroom', 'Car dealer': 'Car showroom',
  'Travel agent': 'Travel agency', 'Tours and travels': 'Travel agency', 'Beauty salon': 'Beauty parlour', 'Beauty parlor': 'Beauty parlour', 'Parlour': 'Beauty parlour',
  'Corner shop': 'Convenience store', 'Minimart': 'Convenience store', 'Corner store': 'Convenience store', 'Bodega': 'Convenience store', 'Konbini': 'Convenience store',
  'Fish market': 'Fishmonger', 'Fish shop': 'Fishmonger', 'Seafood shop': 'Fishmonger', 'Deli': 'Delicatessen',
  'Liquor store': 'Wine shop', 'Liquor shop': 'Wine shop', 'Theka': 'Wine shop', 'Bottle shop': 'Wine shop', 'Off-licence': 'Wine shop', 'Off licence': 'Wine shop',
  'Tavern': 'Pub', 'Public house': 'Pub', 'Inn': 'Pub', 'Fast food': 'Fast food restaurant', 'Fast food joint': 'Fast food restaurant', 'Pizza shop': 'Pizzeria', 'Pizza place': 'Pizzeria', 'Pastry shop': 'Patisserie',
  'Confectioner': 'Confectionery', 'Chakki': 'Flour mill', 'Atta chakki': 'Flour mill', 'Ration store': 'Ration shop', 'Fair price shop': 'Ration shop', 'PDS shop': 'Ration shop', 'Ration depot': 'Ration shop',
  'Wholesale shop': 'Wholesaler', 'Wholesale store': 'Wholesaler', 'Discount shop': 'Discount store', 'Thrift shop': 'Thrift store', 'Second-hand shop': 'Thrift store', 'Secondhand store': 'Thrift store', 'Consignment store': 'Thrift store',
  'Pawnshop': 'Pawn shop', 'Pawnbroker': 'Pawn shop', 'Antique store': 'Antique shop', 'Gallery': 'Art gallery', 'Music store': 'Music shop', 'Instrument shop': 'Music shop', 'Computer store': 'Computer shop',
  'Photography studio': 'Photo studio', 'Printers': 'Print shop', 'Printing shop': 'Print shop', 'Cyber cafe': 'Cyber café', 'Internet café': 'Cyber café', 'Internet cafe': 'Cyber café',
  'Repair centre': 'Repair shop', 'Electronics repair shop': 'Repair shop', 'Dry cleaners': 'Dry cleaner', 'Dry cleaning': 'Dry cleaner', 'Launderette': 'Laundromat', 'Coin laundry': 'Laundromat',
  'Cloth shop': 'Fabric shop', 'Textile shop': 'Fabric shop', 'Cloth merchant': 'Fabric shop', 'Draper': 'Fabric shop', 'Sporting goods store': 'Sports shop', 'Sports store': 'Sports shop',
  'Cycle shop': 'Bicycle shop', 'Bike shop': 'Bicycle shop', 'Carwash': 'Car wash', 'Day spa': 'Spa', 'Tattoo studio': 'Tattoo parlour', 'Tattoo parlor': 'Tattoo parlour', 'Tattoo shop': 'Tattoo parlour',
  'Coaching institute': 'Coaching centre', 'Coaching center': 'Coaching centre', 'Tuition centre': 'Coaching centre', 'Tuition classes': 'Coaching centre', 'Coaching classes': 'Coaching centre',
  'Estate agent': 'Real estate agency', 'Property dealer': 'Real estate agency', 'Real estate office': 'Real estate agency', 'Newsstand': 'Newsagent', 'News stand': 'Newsagent', 'Magazine stall': 'Newsagent',
  'Street stall': 'Food stall', 'Thela': 'Food stall', 'Stall': 'Food stall', 'Booth': 'Kiosk', 'Garden center': 'Garden centre',
  'Two-wheeler showroom': 'Bike showroom', 'Motorcycle dealership': 'Bike showroom', 'Car hire': 'Car rental', 'Rent a car': 'Car rental', 'Courier': 'Courier service', 'Courier company': 'Courier service',
  'Catering': 'Caterer', 'Catering service': 'Caterer', 'Caterers': 'Caterer', 'Club': 'Nightclub', 'Disco': 'Nightclub', 'Microbrewery': 'Brewery', 'Brewpub': 'Brewery',
  'Movie theatre': 'Cinema', 'Cinema hall': 'Cinema', 'Multiplex': 'Cinema', 'Guesthouse': 'Guest house', 'Homestay': 'Guest house', 'Takeout': 'Takeaway', 'Take-away': 'Takeaway',
  'Photocopy shop': 'Xerox shop', 'Photostat shop': 'Xerox shop', 'Xerox centre': 'Xerox shop', 'Photocopy centre': 'Xerox shop', 'Phone repair shop': 'Mobile repair shop', 'Mobile repairing shop': 'Mobile repair shop',
  'Paint store': 'Paint shop', 'Electrical store': 'Electrical shop', 'Electricals': 'Electrical shop', 'Sari shop': 'Saree shop', 'Dry fruits shop': 'Dry fruit shop', 'Organic shop': 'Organic store',
  'Cobbler shop': 'Shoe repair shop', 'Mochi shop': 'Shoe repair shop', 'Watch store': 'Watch shop',
  'Chocolatier': 'Chocolate shop', 'Fromagerie': 'Cheese shop', 'Masala shop': 'Spice shop', 'Milk parlour': 'Milk booth', 'Mutton shop': 'Meat shop', 'Meat market': 'Meat shop', 'Poultry shop': 'Chicken shop',
  'Health store': 'Health food store', 'Pound shop': 'Dollar store', 'Picture framer': 'Frame shop', 'Arts and crafts store': 'Craft shop', 'Record shop': 'Record store', 'Game store': 'Video game store',
  'Press': 'Printing press', 'Mobile recharge shop': 'Recharge shop', 'Key cutter': 'Key cutting shop', 'Luggage store': 'Luggage shop', 'Spare parts shop': 'Auto parts shop', 'Motor parts shop': 'Auto parts shop',
  'Tyre store': 'Tyre shop', 'Tire shop': 'Tyre shop', 'Service center': 'Service centre', 'Lighting store': 'Lighting shop', 'Tiles shop': 'Tile shop', 'Sanitary shop': 'Sanitaryware shop',
  'Mattress store': 'Mattress shop', 'Rug shop': 'Carpet shop', 'Furnishing store': 'Home decor store', 'Cookware shop': 'Kitchenware shop', 'Bartan shop': 'Utensil shop', 'Bartan bhandar': 'Utensil shop',
  'Crockery store': 'Crockery shop', 'Home appliances store': 'Appliance store', 'Baby store': 'Baby shop', 'Greeting card shop': 'Card shop', 'Party store': 'Party supply store',
  'Firecracker shop': 'Fireworks shop', 'Firecracker stall': 'Fireworks shop', 'Cracker stall': 'Fireworks shop', 'Patakha shop': 'Fireworks shop', 'Nursery': 'Plant nursery', 'Garden nursery': 'Plant nursery',
  'Veterinary clinic': 'Vet clinic', 'Pet clinic': 'Vet clinic', 'Nail bar': 'Nail salon', 'Dance academy': 'Dance studio', 'Motor driving school': 'Driving school',
  'Daycare': 'Day care', 'Creche': 'Day care', 'Crèche': 'Day care', 'Preschool': 'Play school', 'Playschool': 'Play school', 'Insurance office': 'Insurance agency', "Dentist's": 'Dental clinic', "Doctor's clinic": 'Clinic',
  'Diagnostic center': 'Diagnostic centre', 'Diagnostic lab': 'Diagnostic centre', 'Pathology lab': 'Diagnostic centre', 'Path lab': 'Diagnostic centre', 'Funeral parlour': 'Funeral home', 'Undertaker': 'Funeral home',
  'Tent wala': 'Tent house', 'Bike hire': 'Bike rental', 'Cycle rental': 'Bike rental', 'Chaat corner': 'Chaat stall', 'Cigarette shop': 'Tobacconist', 'Tobacco shop': 'Tobacconist', 'Cigar shop': 'Tobacconist',
  'Burger shop': 'Burger joint', 'Sushi restaurant': 'Sushi bar', 'Steak house': 'Steakhouse', 'Chophouse': 'Steakhouse', 'Chippy': 'Chip shop', 'Fish and chip shop': 'Chip shop',
  'Kebab house': 'Kebab shop', 'Shawarma shop': 'Kebab shop', 'Khanaval': 'Mess', 'Khanawal': 'Mess', 'Tiffin centre': 'Tiffin service', 'Ghost kitchen': 'Cloud kitchen', 'Dark kitchen': 'Cloud kitchen',
  'Handicrafts emporium': 'Handicraft shop', 'State emporium': 'Emporium', 'Khadi bhandar': 'Khadi store', 'Souvenir store': 'Souvenir shop', 'Curio shop': 'Souvenir shop', 'Duty free': 'Duty-free shop',
  'Five and dime': 'Variety store', 'Dime store': 'Variety store', 'Haberdasher': 'Haberdashery', 'Bridal boutique': 'Bridal shop', 'Perfumery': 'Perfume shop', 'Attar shop': 'Perfume shop', 'Cosmetic shop': 'Cosmetics shop',
  'Forex': 'Money exchange', 'Bureau de change': 'Money exchange', 'Currency exchange': 'Money exchange', 'Money changer': 'Money exchange', 'Arcade': 'Amusement arcade', 'Video arcade': 'Amusement arcade',
  'Outlet store': 'Factory outlet', 'Tea house': 'Teahouse', 'Tea room': 'Teahouse', 'Tearoom': 'Teahouse', 'Donut shop': 'Doughnut shop', 'Ice cream van': 'Ice cream truck', 'Hookah lounge': 'Hookah bar', 'Shisha bar': 'Hookah bar',
  'Bindery': 'Bookbinder', 'Fancy shop': 'Fancy store', 'Churi shop': 'Bangle shop', 'Lumber yard': 'Timber yard', 'Lumberyard': 'Timber yard', 'Builders merchant': "Builders' merchant",
  'Scrap dealer': 'Scrap shop', 'Kabadi shop': 'Scrap shop', 'Scrapyard': 'Junkyard', 'Salvage yard': 'Junkyard', 'Hearing aid shop': 'Hearing aid centre', 'Farsan shop': 'Namkeen shop',
  'Seed store': 'Seed shop', 'Fertilizer shop': 'Fertiliser shop', 'Khad beej bhandar': 'Fertiliser shop', 'Feed shop': 'Feed store', 'Pet grooming': 'Pet grooming salon',
  'PCO': 'STD booth', 'STD PCO': 'STD booth', 'Phone booth': 'STD booth', 'Telephone booth': 'STD booth', 'Puncture repair shop': 'Puncture shop', 'Udupi hotel': 'Udupi restaurant',
  'Pop up shop': 'Pop-up shop', 'Milliner': 'Hat shop', 'Millinery': 'Hat shop', 'Surgical shop': 'Surgical store', 'Ship chandler': 'Chandlery', 'Creperie': 'Crêperie', 'Truckstop': 'Truck stop',
  'Arhtiya': 'Arhat', 'Aadhat': 'Arhat', 'Chitfund': 'Chit fund', 'Co-op store': 'Cooperative store', 'Bookstall': 'Book stall', 'Railway bookstall': 'Book stall', 'Lottery shop': 'Lottery stall',
  'Stamp paper vendor': 'Stamp vendor', 'Placement agency': 'Employment agency', 'Recruitment agency': 'Employment agency', 'Job agency': 'Employment agency', 'Matrimonial agency': 'Marriage bureau',
  'Jyotish kendra': 'Astrology centre', 'Private detective agency': 'Detective agency', 'Pest control': 'Pest control service', 'Movers and packers': 'Packers and movers', 'Removals company': 'Packers and movers',
  'Transporter': 'Transport company', 'Golf range': 'Driving range', 'Rifle range': 'Shooting range', 'Riding stables': 'Riding school', 'Music academy': 'Music school', 'Language institute': 'Language school',
  'Computer centre': 'Computer institute', 'Beauty school': 'Beauty academy', 'Mehendi stall': 'Mehndi stall', 'Puja store': 'Puja samagri shop', 'Pooja samagri shop': 'Puja samagri shop', 'Murti shop': 'Idol shop',
  'Patang shop': 'Kite shop', 'Rakhi shop': 'Rakhi stall'
 }
};
