// scripts/curate-and-verify-all.mjs
import { verifyUrls } from './verify-packed-urls.mjs';

const u = id => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=400&q=80`;

export const questions21to40 = [
  // 21. Cheeses of the World
  [
    "Which artisan cheese is the true star of the charcuterie board?",
    [
      { text: "Aged Dutch Gouda", image: u("1486297678162-eb2a19b0a32d") }, // cheese block
      { text: "Creamy French Brie", image: u("1452195100486-9cc805987862") }, // brie cheese
      { text: "Sharp English Cheddar", image: u("1624806992066-5ffcf7ca186b") }, // cheddar wedge
      { text: "Blue Italian Gorgonzola", image: u("1634487359989-3e90c9432133") }, // blue cheese
      { text: "Fresh Buffalo Mozzarella", image: u("1528736235302-52922df5c122") }, // mozzarella burrata
      { text: "Spanish Manchego Wedge", image: u("1641939650612-0ea78a6993ea") } // manchego cheese
    ]
  ],

  // 22. World Street Food
  [
    "Which street food city is at the absolute top of your culinary bucket list?",
    [
      { text: "Tokyo (Crispy Yakitori & Ramen)", image: u("1503899036084-c55cdd92da26") }, // tokyo alley
      { text: "Mexico City (Tacos al Pastor)", image: u("1551504734-5ee1c4a1479b") }, // tacos
      { text: "Bangkok (Pad Thai & Mango Sticky Rice)", image: u("1508009603885-50cf7c579365") }, // bangkok street
      { text: "Mumbai (Vada Pav & Street Chaat)", image: u("1601050690597-df0568f70950") }, // street food samosa/chaat
      { text: "Istanbul (Charcoal Kebab & Simit)", image: u("1524231757912-21f4fe3a7200") }, // istanbul
      { text: "Rome (Suppli & Pizza al Taglio)", image: u("1533105079780-92b9be482077") }, // italy food/street
    ]
  ],

  // 23. Potato Cravings
  [
    "Which potato preparation is the supreme crowning glory of carbohydrates?",
    [
      { text: "Golden Crispy French Fries", image: u("1573080496219-bb080dd4f877") }, // french fries
      { text: "Creamy Roasted Garlic Mashed Potatoes", image: u("1633436375153-d7045cb93e38") }, // mashed potatoes with gravy
      { text: "Crispy Fried Potato Samosas", image: u("1601050690597-df0568f70950") }, // potato samosas
      { text: "Tender Golden Potato Gnocchi in Butter", image: u("1551183053-bf91a1d81141") }, // potato gnocchi
      { text: "Farm-Fresh Whole Russet Potatoes", image: u("1518977676601-b53f82aba655") }, // whole potatoes
      { text: "Kettle Cooked Sea Salt Potato Chips", image: u("1566478989037-eec170784d0b") } // potato chips
    ]
  ],

  // 24. Sweet Pies
  [
    "Which sweet pie coming fresh out of the oven smells the absolute best?",
    [
      { text: "Warm Cinnamon Apple Pie", image: u("1535920527002-b35e96722eb9") }, // baked apple pie
      { text: "Southern Toasted Pecan Pie", image: u("1519869325930-281384150729") }, // pecan pie
      { text: "Zesty Florida Key Lime Pie", image: u("1534778101976-62847782c213") }, // key lime / citrus tart
      { text: "Wild Mountain Blueberry Pie", image: u("1563805042-7684c019e1cb") }, // berry pie
      { text: "Sweet-Tart Michigan Cherry Pie", image: u("1528825871115-3581a5387919") }, // cherry tart / cherries
      { text: "Decadent Dark Chocolate Silk Pie", image: u("1541781774459-bb2af2f05b55") } // chocolate pie
    ]
  ],

  // 25. Ultimate Comfort Foods
  [
    "Which comfort food hit the spot after an exhausting week?",
    [
      { text: "Baked Four-Cheese Mac & Cheese", image: u("1543339308-43e59d6b73a6") }, // mac and cheese
      { text: "Golden Buttermilk Fried Chicken", image: u("1562967914-608f82629710") }, // fried chicken
      { text: "Deep-Dish Cheesy Pepperoni Pizza", image: u("1513104890138-7c749659a591") }, // pizza
      { text: "Double Bacon Smash Cheeseburger", image: u("1568901346375-23c9450c58cd") }, // burger
      { text: "Steaming Tonkotsu Pork Ramen", image: u("1569718212165-3a8278d5f624") }, // ramen
      { text: "Crispy Sourdough Grilled Cheese", image: u("1528735602780-2552fd46c7af") } // grilled cheese
    ]
  ],

  // 26. Extreme Sports
  [
    "Which extreme adventure sport would you tackle if fear were turned off?",
    [
      { text: "Tandem Skydiving Freefall from 15,000 Feet", image: u("1492684223066-81342ee5ff30") }, // skydiving
      { text: "Roaring Whitewater Rapids River Rafting", image: u("1530866495561-507c9faab2ed") }, // rafting
      { text: "Deep Coral Reef Scuba Diving", image: u("1544551763-46a013bb70d5") }, // scuba diving
      { text: "Canyon Suspension Bridge Bungee Jump", image: u("1507699622108-4be3abd695ad") }, // bungee / canyon
      { text: "High Alpine Mountain Rock Climbing", image: u("1464822759023-fed622ff2c3b") }, // rock climbing
      { text: "Powder Snowboarding Down Alpine Slopes", image: u("1503376780353-7e6692767b70") } // snowboarding / alpine
    ]
  ],

  // 27. Artisan Donuts
  [
    "Which artisan donut flavor is worth breaking every dietary rule for?",
    [
      { text: "Warm Glazed Old Fashioned Donut", image: u("1551024506-0bccd828d307") }, // glazed donut
      { text: "Assorted Frosted Artisan Donuts", image: u("1551024601-bec78aea704b") }, // assorted donuts
      { text: "Strawberry Frosted with Rainbow Sprinkles", image: u("1514517521153-1be72277b32f") }, // pink frosted donut
      { text: "Cinnamon Sugar Glazed Apple Fritter", image: u("1527515637462-cff94eecc1ac") }, // fritter / donut
      { text: "Powdered Sugar Raspberry Jelly Filled", image: u("1551024709-8f23befc6f87") }, // filled donut
      { text: "Double Dark Chocolate Fudge Donut", image: u("1606313564200-e75d5e30476c") } // chocolate fudge
    ]
  ],

  // 28. Lake Summer Activities
  [
    "Which thrilling lake activity is the highlight of a sunny summer day?",
    [
      { text: "Kayaking at Early Morning Sunrise", image: u("1506744038136-46273834b3fb") }, // kayak on lake
      { text: "High-Speed Jet Skiing Across Open Water", image: u("1544551763-46a013bb70d5") }, // water action / jetski
      { text: "Stand-Up Paddleboarding in a Calm Cove", image: u("1686845537112-eca1181d458c") }, // paddleboard water
      { text: "Sailing a White Catamaran on the Water", image: u("1502680390469-be75c86b636f") }, // sailing boat
      { text: "Relaxing Pontoon Boat Cruise with Friends", image: u("1499793983690-e29da59ef1c2") }, // boat on lake
      { text: "Cannonball Diving off the Wooden Pier", image: u("1530122037265-a5f1f91d3b99") } // diving into water
    ]
  ],

  // 29. Asian Noodles
  [
    "Which global noodle dish is the ultimate bowl of pure comfort?",
    [
      { text: "Rich Japanese Tonkotsu Pork Bone Ramen", image: u("1569718212165-3a8278d5f624") }, // ramen
      { text: "Fragrant Vietnamese Beef Pho with Fresh Herbs", image: u("1582878826629-29b7ad1cdc43") }, // pho noodle soup
      { text: "Sweet & Savory Thai Pad Thai with Crushed Peanuts", image: u("1559314809-0d155014e29e") }, // pad thai
      { text: "Fiery Sichuan Dan Dan Noodles with Chili Oil", image: u("1541696432-82c6da8ce7bf") }, // dan dan noodles
      { text: "Thick Chewy Japanese Udon in Dashi Broth", image: u("1612927601601-6638404737ce") }, // udon noodles
      { text: "Indonesian Wok-Fried Mie Goreng", image: u("1585032226651-759b368d7246") } // fried noodles
    ]
  ],

  // 30. BBQ Smokehouse
  [
    "Which barbecue staple is the undisputed masterpiece of the smoke pit?",
    [
      { text: "16-Hour Smoked Texas Beef Brisket", image: u("1558030006-450675393462") }, // smoked beef brisket
      { text: "Fall-Off-the-Bone Memphis Dry-Rub Ribs", image: u("1569352304334-6e422cd70ecd") }, // bbq ribs
      { text: "Sweet Carolina Pulled Pork Sandwich", image: u("1528735602780-2552fd46c7af") }, // pulled pork
      { text: "Crispy Smoky BBQ Chicken Wings", image: u("1567620832903-9fc6debc209f") }, // bbq wings
      { text: "Spicy Smoked Jalapeno Cheddar Sausage", image: u("1565299624946-b28f40a0ae38") }, // sausage / bbq
      { text: "Caramelized Barbecue Burnt Ends", image: u("1568901346375-23c9450c58cd") } // burnt ends
    ]
  ],

  // 31. Skewers on the Grill
  [
    "Which street food skewer off the charcoal grill is perfection on a stick?",
    [
      { text: "Japanese Chicken Scallion Yakitori", image: u("1503899036084-c55cdd92da26") }, // yakitori grill
      { text: "Malaysian Chicken Satay with Peanut Sauce", image: u("1555939594-58d7cb561ad1") }, // satay skewers
      { text: "Greek Pork Souvlaki with Tzatziki", image: u("1570077188670-e3a8d69ac5ff") }, // souvlaki skewer
      { text: "Middle Eastern Shish Taouk Skewers", image: u("1524231757912-21f4fe3a7200") }, // shish taouk
      { text: "Brazilian Picanha Beef Churrasco", image: u("1558030006-450675393462") }, // beef churrasco
      { text: "Grilled Rosemary Mushroom & Pepper Skewers", image: u("1540420773420-3366772f4999") } // veggie skewers
    ]
  ],

  // 32. Fresh Orchard Fruits
  [
    "Which fresh fruit is undeniably the king of flavor?",
    [
      { text: "Sweet Sun-Ripened Strawberries", image: u("1464965911861-746a04b4bca6") }, // strawberries
      { text: "Crisp Juicy Honeycrisp Apple", image: u("1560806887-1e4cd0b6cbd6") }, // fresh red apple
      { text: "Golden Sliced Alphonso Mango", image: u("1553279768-865429fa0078") }, // fresh mango
      { text: "Juicy Sun-Warmed White Peach", image: u("1517423440428-a5a00ad493e8") }, // fresh peach
      { text: "Sweet Dark Bing Cherries", image: u("1528825871115-3581a5387919") }, // sweet cherries
      { text: "Chilled Crisp Red Watermelon Wedge", image: u("1587049352846-4a222e784d38") } // watermelon
    ]
  ],

  // 33. Teas of the World
  [
    "Which steaming cup of tea warms you up the best?",
    [
      { text: "Frothy Ceremonial Japanese Matcha", image: u("1536256263959-770b48d82b0a") }, // matcha bowl
      { text: "Spiced Masala Chai Brewed with Ginger", image: u("1576092768241-dec231879fc3") }, // masala chai
      { text: "Fragrant British Earl Grey with Bergamot", image: u("1514432324607-a09d9b4aefdd") }, // earl grey cup
      { text: "Chinese Jasmine Dragon Green Tea", image: u("1556679343-c7306c1976bc") }, // jasmine green tea
      { text: "Moroccan Fresh Mint Tea with Honey", image: u("1547592180-85f173990554") }, // fresh mint tea
      { text: "Calming Whole Chamomile Blossom Infusion", image: u("1597481499750-3e6b22637e12") } // chamomile flowers
    ]
  ],

  // 34. Party Dips
  [
    "Which party dip is absolutely mandatory on the warm chip table?",
    [
      { text: "Fresh Lime Chunky Guacamole", image: u("1551504734-5ee1c4a1479b") }, // guacamole
      { text: "Smooth Garlic Olive Oil Hummus with Paprika", image: u("1540420773420-3366772f4999") }, // hummus bowl
      { text: "Warm Creamy Spinach Artichoke Dip", image: u("1543339308-43e59d6b73a6") }, // spinach dip
      { text: "Fire-Roasted Tomato & Jalapeno Salsa Roja", image: u("1513456852971-30c0b8199d4d") }, // salsa
      { text: "French Onion Dip with Kettle Chips", image: u("1566478989037-eec170784d0b") }, // french onion dip
      { text: "Warm Tex-Mex Queso Blanco with Green Chiles", image: u("1513104890138-7c749659a591") } // queso cheese dip
    ]
  ],

  // 35. Pasta Dishes
  [
    "Which pasta shape holds sauce with the highest culinary perfection?",
    [
      { text: "Silky Wide Ribbons of Tagliatelle Bolognese", image: u("1556761175-5973dc0f32e7") }, // tagliatelle
      { text: "Heavy Ridged Rigatoni in Rich Ragu", image: u("1512621776951-a57141f2eefd") }, // rigatoni pasta
      { text: "Pillowy Ricotta & Spinach Stuffed Ravioli", image: u("1587740908075-9e245070dfaa") }, // ravioli
      { text: "Classic Twirling Spaghetti alla Chitarra", image: u("1551892374-ecf8754cf8b0") }, // spaghetti
      { text: "Tender Golden Potato Gnocchi in Brown Butter", image: u("1551183053-bf91a1d81141") }, // gnocchi
      { text: "Deep-Dish Baked Cheesy Lasagna Sheets", image: u("1574894709920-11b28e7367e3") } // lasagna
    ]
  ],

  // 36. Gourmet Salads
  [
    "Which gourmet salad is genuinely satisfying enough to be the entire meal?",
    [
      { text: "Crisp Romaine Caesar with Shaved Parm & Croutons", image: u("1540420773420-3366772f4999") }, // caesar salad
      { text: "Mediterranean Greek Salad with Feta & Kalamata Olives", image: u("1523049673857-eb18f1d7b578") }, // greek salad
      { text: "Caprese Salad with Ripe Heirloom Tomatoes & Fresh Basil", image: u("1528736235302-52922df5c122") }, // caprese mozzarella
      { text: "Loaded Cobb Salad with Avocado, Hard-Boiled Egg & Bacon", image: u("1512621776951-a57141f2eefd") }, // cobb salad
      { text: "Asian Sesame Ginger Cabbage Crunch", image: u("1546069901-ba9599a7e63c") }, // asian salad
      { text: "Roasted Beetroot & Goat Cheese with Candied Walnuts", image: u("1599599810769-bcde5a160d32") } // beetroot salad
    ]
  ],

  // 37. Late-Night Diner Orders
  [
    "What are you ordering at 2:00 AM in a retro all-night chrome diner?",
    [
      { text: "Golden Buttermilk Pancake Stack with Whipped Butter", image: u("1567620905732-2d1ec7ab7445") }, // pancakes
      { text: "Crispy Buttermilk Chicken Tenders & Golden Fries", image: u("1562967914-608f82629710") }, // chicken tenders
      { text: "Belgian Waffle Drizzled with Warm Maple Syrup", image: u("1562376552-0d160a2f238d") }, // waffle
      { text: "Sizzling Double Bacon Cheeseburger on Brioche", image: u("1568901346375-23c9450c58cd") }, // cheeseburger
      { text: "Two Eggs Over Easy with Crispy Hash Browns & Bacon", image: u("1525351484163-7529414344d8") }, // eggs and hash browns
      { text: "Thick Hand-Spun Dark Chocolate Milkshake", image: u("1572490122747-3968b75cc699") } // chocolate milkshake
    ]
  ],

  // 38. Tabletop Board Games
  [
    "Which legendary board game are you bringing to cabin weekend?",
    [
      { text: "Settlers of Catan Island Trading", image: u("1610890716171-6b1bb98ffd09") }, // catan board game
      { text: "Ticket to Ride Cross-Country Train Routes", image: u("1563941402622-4e7a488bcc57") }, // train board game
      { text: "Classic Scrabble High-Score Crossword", image: u("1589829545856-d10d557cf95f") }, // scrabble tiles
      { text: "Codenames Secret Agent Word Clues", image: u("1606167668584-78701c57f13d") }, // codenames card game
      { text: "Carcassonne Medieval Castles & Roads", image: u("1509198397868-475647b2a1e5") }, // board game pieces
      { text: "Wingspan Bird Sanctuary Engine Builder", image: u("1552728089-57bdde30beb3") } // wingspan game
    ]
  ],

  // 39. Campfire Cooking
  [
    "Which campfire cooking feast tastes best under the open stars?",
    [
      { text: "Golden Toasted Marshmallow S’mores on Graham Crackers", image: u("1504280390367-361c6d9f38f4") }, // campfire smores
      { text: "Foil-Wrapped Buttered Garlic Potatoes & Herbs", image: u("1544025162-d76694265947") }, // roasted potatoes
      { text: "Cast-Iron Skillet Fried Eggs & Applewood Bacon", image: u("1525351484163-7529414344d8") }, // eggs bacon skillet
      { text: "Dutch Oven Simmering Texas Beef Chili", image: u("1543339308-43e59d6b73a6") }, // dutch oven chili
      { text: "Flame-Kissed All-Beef Hot Dogs Roasted on a Stick", image: u("1541696432-82c6da8ce7bf") }, // roasted hot dog
      { text: "Cast-Iron Campfire Peach Cobbler Crisp", image: u("1563805042-7684c019e1cb") } // campfire cobbler
    ]
  ],

  // 40. Household Pets
  [
    "Which lovable pet brings the most happiness to a home?",
    [
      { text: "Curious Playful Orange Tabby Cat", image: u("1514888286974-6c03e2ca1dba") }, // orange tabby cat
      { text: "Loyal Smiling Golden Labrador Retriever", image: u("1552053831-71594a27632d") }, // golden retriever / lab
      { text: "Soft Fluffy Dwarf Bunny Rabbit", image: u("1585110396000-c9ffd4e4b308") }, // cute bunny
      { text: "Colorful Intelligent Talking Parrot", image: u("1552728089-57bdde30beb3") }, // colorful parrot
      { text: "Gentle Chirping Guinea Pig", image: u("1548767797-d8c844163c4c") }, // guinea pig / small pet
      { text: "Graceful Swimming Bright Orange Goldfish", image: u("1522069169874-c58ec4b76be5") } // goldfish
    ]
  ]
];
