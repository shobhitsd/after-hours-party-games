// scripts/test-packed-curation.mjs
import fs from 'fs';

const u = id => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=400&q=80`;

export const questions = [
  // 1. Holiday Destination
  [
    "What is your dream holiday getaway?",
    [
      { text: "Tropical Beach Resort", image: u("1507525428034-b723cf961d3e") }, // beach waves sand
      { text: "Snowy Alpine Ski Chalet", image: u("1530122037265-a5f1f91d3b99") }, // snowy swiss alps
      { text: "Historic Kyoto Shrines", image: u("1493976040374-85c8e12f0c0e") }, // kyoto pagoda temple
      { text: "Santorini Cliffside Villa", image: u("1570077188670-e3a8d69ac5ff") }, // santorini blue domes
      { text: "Maldives Overwater Bungalow", image: u("1514282401047-d79a71a590e8") }, // maldives bungalow
      { text: "Parisian Boulevard Balcony", image: u("1502602898657-3e91760cbb34") } // eiffel tower paris
    ]
  ],

  // 2. Celebration Dinner
  [
    "What are you ordering for a big celebration feast?",
    [
      { text: "Fresh Sushi & Sashimi Platter", image: u("1579871494447-9811cf80d66c") }, // sushi platter
      { text: "Wood-Fired Neapolitan Pizza", image: u("1513104890138-7c749659a591") }, // pizza
      { text: "Royal Dum Biryani in Clay Pot", image: u("1563379091339-03b21ab4a4f8") }, // biryani
      { text: "Double Bacon Smash Burger", image: u("1568901346375-23c9450c58cd") }, // burger
      { text: "Street Tacos with Fresh Lime", image: u("1551504734-5ee1c4a1479b") }, // tacos
      { text: "Steamed Dim Sum Dumplings", image: u("1541696432-82c6da8ce7bf") } // dim sum
    ]
  ],

  // 3. Sports
  [
    "Which sport would you play with friends this weekend?",
    [
      { text: "Football / Soccer Match", image: u("1579952363873-27f3bade9f55") }, // soccer ball on pitch
      { text: "Cricket on the Green", image: u("1531415074968-036ba1b575da") }, // cricket bat and ball
      { text: "Badminton Doubles Rally", image: u("1626224583764-f87db24ac4ea") }, // badminton racket and birdie
      { text: "Basketball Half-Court", image: u("1519861531473-9200262188bf") }, // basketball hoop
      { text: "Tennis on Clay Court", image: u("1595435934249-5df7ed86e1c0") }, // tennis racket and balls
      { text: "Beach Volleyball in the Sand", image: u("1612872087720-bb876e2e67d1") } // beach volleyball
    ]
  ],

  // 4. Coffee Shop Order
  [
    "What is your go-to coffee shop order?",
    [
      { text: "Iced Caramel Macchiato", image: u("1485808191679-5f86510681a2") }, // iced coffee caramel
      { text: "Oat Milk Vanilla Latte", image: u("1534778101976-62847782c213") }, // latte art
      { text: "Double Shot Espresso", image: u("1510591509098-f4fdc6d0ff04") }, // espresso cup
      { text: "Cold Brew with Sweet Cream", image: u("1517701550927-30cf4ba1dba5") }, // cold brew glass
      { text: "Ceremonial Matcha Latte", image: u("1536256263959-770b48d82b0a") }, // matcha latte
      { text: "Velvety Flat White", image: u("1577968897966-3d4325b36b61") } // flat white cup
    ]
  ],

  // 5. Crown of Desserts
  [
    "Which dessert deserves the undisputed crown?",
    [
      { text: "Warm Chocolate Lava Cake", image: u("1606313564200-e75d5e30476c") }, // molten lava cake
      { text: "Artisan Italian Gelato", image: u("1497034825429-c343d7c6a68f") }, // gelato scoops
      { text: "New York Style Cheesecake", image: u("1533134242443-d4fd215305ad") }, // cheesecake slice
      { text: "Classic Coffee Tiramisu", image: u("1571877227200-a0d98ea607e9") }, // tiramisu
      { text: "Crispy Cinnamon Sugar Churros", image: u("1589301760014-d929f3979dbc") }, // churros with chocolate
      { text: "Warm Cardamom Gulab Jamun", image: u("1601050690597-df0568f70950") } // gulab jamun bowl
    ]
  ],

  // 6. Secret Mansion Room
  [
    "What secret room would you install in your dream mansion?",
    [
      { text: "Floor-to-Ceiling Library", image: u("1521587760476-6c12a4b040da") }, // library books
      { text: "Private Heated Indoor Pool", image: u("1576013551627-0cc20b96c2a7") }, // indoor pool
      { text: "Retro Arcade & Pinball Vault", image: u("1511512578047-dfb367046420") }, // arcade cabinets
      { text: "Dolby Atmos Cinema Room", image: u("1489599849927-2ee91cede3ba") }, // cinema theater
      { text: "Botanical Greenhouse Conservatory", image: u("1585320806297-9794b3e4eeae") }, // greenhouse
      { text: "Rooftop Stargazing Observatory", image: u("1519671482749-fd09be7ccebf") } // rooftop observatory
    ]
  ],

  // 7. Dog Breeds (carefully verified accurate dog breeds)
  [
    "Which dog breed is your ride-or-die loyal best friend?",
    [
      { text: "Noble Protective German Shepherd", image: u("1513350660342-816d92510adf") }, // German Shepherd
      { text: "Vocal Blue-Eyed Siberian Husky", image: u("1568572933382-74d440642117") }, // Siberian Husky
      { text: "Short-Legged Welsh Corgi", image: u("1560743641-3914f2c45636") }, // Welsh Corgi
      { text: "Classic Friendly Yellow Labrador", image: u("1537204696486-967f1b7198c8") }, // Yellow Labrador
      { text: "Bat-Eared Playful French Bulldog", image: u("1598133894008-61f7fdb8cc3a") }, // French Bulldog
      { text: "Eternally Smiling Golden Retriever", image: u("1511732351157-1865efcb7b7b") } // Golden Retriever
    ]
  ],

  // 8. Game Night Snack
  [
    "Which snack is non-negotiable at game night?",
    [
      { text: "Warm Movie Theater Popcorn", image: u("1578849278619-e73505e9610f") }, // popcorn
      { text: "Crispy Fried Samosas", image: u("1601050690597-df0568f70950") }, // samosas
      { text: "Fully Loaded Cheesy Nachos", image: u("1513456852971-30c0b8199d4d") }, // nachos
      { text: "Hot Seasoned French Fries", image: u("1573080496219-bb080dd4f877") }, // fries
      { text: "Soft-Baked Choc Chip Cookies", image: u("1499636136210-6f4ee915583e") }, // cookies
      { text: "Steamed Dim Sum Dumplings", image: u("1563245372-f21724e3856d") } // dumplings
    ]
  ],

  // 9. Breakfast of Champions
  [
    "What is the undisputed breakfast of champions?",
    [
      { text: "Fluffy Buttermilk Pancake Stack", image: u("1567620905732-2d1ec7ab7445") }, // pancakes
      { text: "Full Traditional English Breakfast", image: u("1525351484163-7529414344d8") }, // english breakfast
      { text: "Crispy Golden Belgian Waffles", image: u("1562376552-0d160a2f238d") }, // waffles
      { text: "Smashed Avocado Sourdough Toast", image: u("1588137378633-dea1336ce1e2") }, // avocado toast
      { text: "Crispy Golden Masala Dosa", image: u("1589301760014-d929f3979dbc") }, // dosa
      { text: "Eggs Benedict with Hollandaise", image: u("1608039829572-78524f79c4c7") } // eggs benedict
    ]
  ],

  // 10. Pizza Perfection
  [
    "Which pizza style reigns supreme?",
    [
      { text: "Classic Margherita with Fresh Basil", image: u("1574071318508-1cdbab80d002") }, // margherita
      { text: "Crispy Double Pepperoni & Mozzarella", image: u("1628840042765-356cda07504e") }, // pepperoni
      { text: "Quattro Formaggi Four Cheese Blend", image: u("1513104890138-7c749659a591") }, // four cheese
      { text: "Truffle Mushroom & Roasted Garlic", image: u("1544982503-9f984c14501a") }, // mushroom pizza
      { text: "Smoky BBQ Chicken & Red Onion", image: u("1565299624946-b28f40a0ae38") }, // bbq pizza
      { text: "Prosciutto di Parma & Shaved Parm", image: u("1593560708920-61dd98c46a4e") } // prosciutto pizza
    ]
  ],

  // 11. Fresh Bakery Treats
  [
    "Which fresh bakery treat is impossible to walk past in the morning?",
    [
      { text: "Flaky Golden Butter Croissant", image: u("1555507036-ab1f4038808a") }, // croissant
      { text: "Warm Iced Cinnamon Roll", image: u("1509440159596-0249088772ff") }, // cinnamon roll
      { text: "Toasted Everything Bagel with Cream Cheese", image: u("1772758631775-62f1912fe0f7") }, // bagel
      { text: "Pain au Chocolat with Dark Chocolate", image: u("1530610476181-d83430b64dcd") }, // pain au chocolat
      { text: "Fresh Blueberry Crumb Muffin", image: u("1586985289688-ca3cf47d3e6e") }, // muffin
      { text: "Crusty Artisan Sourdough Loaf", image: u("1589367920969-ab8e050bbb04") } // sourdough loaf
    ]
  ],

  // 12. Steaming Soul Soups
  [
    "Which steaming bowl of soup heals your soul on a freezing winter night?",
    [
      { text: "Rich Tonkotsu Pork Bone Ramen", image: u("1569718212165-3a8278d5f624") }, // ramen
      { text: "French Onion Soup with Broiled Gruyère", image: u("1547592166-23ac45744acd") }, // french onion
      { text: "Creamy Roasted Tomato Bisque", image: u("1547592180-85f173990554") }, // tomato soup
      { text: "New England Clam Chowder in Bread Bowl", image: u("1588166524941-3bf61a9c41db") }, // chowder
      { text: "Spicy Thai Tom Yum Goong", image: u("1541696432-82c6da8ce7bf") }, // tom yum
      { text: "Hearty Tuscan Vegetable Minestrone", image: u("1540420773420-3366772f4999") } // minestrone
    ]
  ],

  // 13. Dream Vehicles
  [
    "Which dream ride are you cruising in along the coast?",
    [
      { text: "Porsche 911 GT3 in Signal Green", image: u("1503376780353-7e6692767b70") }, // porsche
      { text: "1967 Ford Mustang Fastback", image: u("1584345604476-8ec5e12e42dd") }, // mustang
      { text: "Classic British Racing Green Mini", image: u("1511919884226-fd3cad34687c") }, // mini
      { text: "Rugged Land Rover Defender", image: u("1519641471654-76ce0107ad1b") }, // land rover
      { text: "Sleek Red Ferrari Supercar", image: u("1583121274602-3e2820c69888") }, // ferrari
      { text: "Vintage Triumph Cafe Racer Motorcycle", image: u("1558981403-c5f9899a28bc") } // motorcycle
    ]
  ],

  // 14. Musical Instruments
  [
    "Which musical instrument would you choose to magically shred on stage?",
    [
      { text: "Fender Stratocaster Electric Guitar", image: u("1511671782779-c97d3d27a1d4") }, // electric guitar
      { text: "Concert Grand Piano", image: u("1501785888041-af3ef285b470") }, // grand piano
      { text: "Full Acoustic Drum Kit", image: u("1519892300165-cb5542fb47c7") }, // drums
      { text: "Classical Concert Violin", image: u("1612225330812-01a9c6b355ec") }, // violin
      { text: "Brass Jazz Saxophone", image: u("1525994886773-080587e161c2") }, // saxophone
      { text: "Warm Acoustic Fingerstyle Guitar", image: u("1510915361894-db8b60106cb1") } // acoustic guitar
    ]
  ],

  // 15. Cozy Hot Drinks
  [
    "Which hot beverage warms your hands best during a freezing storm?",
    [
      { text: "Rich Dark Hot Chocolate with Marshmallows", image: u("1542990253-0d0f5be5f0ed") }, // hot chocolate
      { text: "Spiced Masala Chai Simmered with Ginger", image: u("1576092768241-dec231879fc3") }, // chai latte
      { text: "Hot Spiced Apple Cider with Cinnamon", image: u("1513558161293-cdaf765ed2fd") }, // apple cider
      { text: "Frothy Japanese Matcha Green Tea", image: u("1536256263959-770b48d82b0a") }, // matcha
      { text: "Thick Roasted Turkish Coffee", image: u("1514432324607-a09d9b4aefdd") }, // coffee
      { text: "Velvety Dusted Cinnamon Cappuccino", image: u("1534778101976-62847782c213") } // cappuccino
    ]
  ],

  // 16. Sandwich Masterpieces
  [
    "Which sandwich build is pure culinary perfection?",
    [
      { text: "Crusty Sourdough Grilled Cheese", image: u("1528735602780-2552fd46c7af") }, // grilled cheese
      { text: "Thick-Cut Maple Bacon BLT on Brioche", image: u("1553909489-cd47e0907980") }, // BLT
      { text: "Pressed Panini Sandwich with Roast Pork", image: u("1567234669003-dce7a7a88821") }, // panini sandwich
      { text: "Crispy Pork Katsu Sando on Milk Bread", image: u("1600891964599-f61ba0e24092") }, // katsu sando
      { text: "Italian Deli Sub Packed with Cold Cuts", image: u("1509722747041-616f39b57569") }, // deli sub
      { text: "Toasted Pastrami & Sauerkraut Reuben", image: u("1550547660-d9450f859349") } // reuben
    ]
  ],

  // 17. Dream Vacation Venues
  [
    "Choose your dream party venue for an unforgettable weekend.",
    [
      { text: "Panoramic Skyline Rooftop Lounge", image: u("1519671482749-fd09be7ccebf") }, // rooftop skyline
      { text: "Sun-Drenched Coastal Beach House", image: u("1499793983690-e29da59ef1c2") }, // beach house
      { text: "Secret Walled Garden with Fairy Lights", image: u("1585320806297-9794b3e4eeae") }, // garden
      { text: "Private Vintage Arcade & Bowling Lounge", image: u("1511512578047-dfb367046420") }, // arcade
      { text: "Secluded Pine Forest Timber Cabin", image: u("1449158743715-0a90ebb6d2d8") }, // timber cabin
      { text: "Private Neon Karaoke Club Suite", image: u("1516450360452-9312f5e86fc7") } // neon karaoke
    ]
  ],

  // 18. Childhood Playground Games
  [
    "Which childhood playground game was the most intensely competitive?",
    [
      { text: "Red Rubber Ball Dodgeball", image: u("1519861531473-9200262188bf") }, // ball game
      { text: "Heavy Grass Tug of War", image: u("1776243321350-9a1678266e06") }, // tug of war
      { text: "High-Stakes Hide and Seek at Dusk", image: u("1507525428034-b723cf961d3e") }, // dusk beach/field
      { text: "Fast-Paced Playground Freeze Tag", image: u("1461896836934-ffe607ba8211") }, // running/racing
      { text: "Chalk Drawn Sidewalk Hopscotch", image: u("1513542789411-b6a5d4f31634") }, // hopscotch chalk
      { text: "Full Field Capture the Flag", image: u("1579952363873-27f3bade9f55") } // field sports
    ]
  ],

  // 19. Retro Video Games
  [
    "Which retro video game holds the greatest nostalgic magic?",
    [
      { text: "Super Mario 64 & Mushroom Kingdom", image: u("1550745165-9bc0b252726f") }, // retro gaming console
      { text: "Sonic the Hedgehog Green Hill Zone", image: u("1607604276583-eef5d076aa5f") }, // sonic / game cartridge
      { text: "Original Game Boy Russian Tetris", image: u("1551103782-8ab07afd45c1") }, // game boy
      { text: "Classic Neon Pac-Man Arcade", image: u("1511512578047-dfb367046420") }, // pac-man arcade
      { text: "Street Fighter II Arcade Cabinet", image: u("1538481199705-c710c4e965fc") }, // arcade fighting
      { text: "Legend of Zelda Ocarina of Time", image: u("1518709268805-4e9042af9f23") } // fantasy adventure
    ]
  ],

  // 20. Road Trip Snacks
  [
    "Which road trip snack never lets you down on a long drive?",
    [
      { text: "Smoky Black Pepper Beef Jerky", image: u("1558030006-450675393462") }, // beef jerky
      { text: "Sweet & Salty Roasted Nut Trail Mix", image: u("1509440159596-0249088772ff") }, // nuts trail mix
      { text: "Crispy Kettle Cooked Sea Salt Chips", image: u("1566478989037-eec170784d0b") }, // potato chips
      { text: "Fruity Chewy Gummy Bears", image: u("1582058091505-f87a2e55a40f") }, // gummy bears
      { text: "Crunchy Salted Pretzel Twists", image: u("1568605117036-5fe5e7bab0b7") }, // pretzels
      { text: "Rich 70% Dark Sea Salt Chocolate", image: u("1606313564200-e75d5e30476c") } // chocolate bar
    ]
  ]
];

