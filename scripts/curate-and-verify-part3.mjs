// scripts/curate-and-verify-part3.mjs
import { verifyUrls } from './verify-packed-urls.mjs';

const u = id => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=400&q=80`;

export const questions41to60 = [
  // 41. Creative Hobbies
  [
    "Which creative weekend hobby would you pick up in a heartbeat?",
    [
      { text: "Expressive Acrylic Canvas Painting", image: u("1579783900882-c0d3dad7b119") }, // painting palette
      { text: "Handcrafted Ceramic Wheel Pottery", image: u("1565193566173-7a0ee3dbe261") }, // pottery ceramics
      { text: "Nurturing Miniature Bonsai Trees", image: u("1512428813834-c702c7702b78") }, // bonsai plant
      { text: "Fingerstyle Acoustic Guitar Picking", image: u("1510915361894-db8b60106cb1") }, // acoustic guitar
      { text: "Vintage 35mm Analog Film Photography", image: u("1516035069371-29a1b244cc32") }, // film camera
      { text: "Artisan Sourdough Bread Baking", image: u("1509440159596-0249088772ff") } // sourdough baking
    ]
  ],

  // 42. Backyard Garden Oasis
  [
    "Which garden feature would transform your backyard into an oasis?",
    [
      { text: "Natural Carved Stone Waterfall Fountain", image: u("1519671482749-fd09be7ccebf") }, // water fountain
      { text: "Blooming Fragrant Climbing Rose Arch", image: u("1518895949257-7621c3c786d7") }, // rose garden arch
      { text: "Shaded Cedar Pergola Draped in Vines", image: u("1585320806297-9794b3e4eeae") }, // pergola greenhouse
      { text: "Serene Japanese Koi Pond with Water Lilies", image: u("1522069169874-c58ec4b76be5") }, // koi pond fish
      { text: "Raised Fragrant Kitchen Herb Garden", image: u("1540420773420-3366772f4999") }, // herb garden
      { text: "Circular Stone Fire Pit with Adirondack Chairs", image: u("1504280390367-361c6d9f38f4") } // stone fire pit
    ]
  ],

  // 43. Glamping Luxuries
  [
    "Which luxury item makes outdoor glamping truly magical?",
    [
      { text: "Spacious Heavy Canvas Bell Tent", image: u("1478131143081-80f7f84ca84d") }, // bell tent camping
      { text: "Warm Glowing String Fairy Lights", image: u("1516450360452-9312f5e86fc7") }, // fairy lights
      { text: "Cozy Natural Sheepskin Throw Rugs", image: u("1584100936595-c0654b55a2e2") }, // cozy blankets
      { text: "Portable Artisan Espresso Machine", image: u("1510591509098-f4fdc6d0ff04") }, // espresso
      { text: "Outdoor Pocket Movie Projector & Screen", image: u("1489599849927-2ee91cede3ba") }, // cinema projection
      { text: "Reclining Weathered Teak Lounge Chairs", image: u("1499793983690-e29da59ef1c2") } // outdoor lounge chair
    ]
  ],

  // 44. Artisan Ice Cream Flavors
  [
    "Which artisan ice cream flavor is the undisputed masterpiece?",
    [
      { text: "Salted Caramel Swirl with Fleur de Sel", image: u("1570197788417-0e82375c9371") }, // caramel ice cream
      { text: "Creamy Pure Madagascar Vanilla Bean", image: u("1497034825429-c343d7c6a68f") }, // vanilla ice cream
      { text: "Decadent Dark Chocolate Fudge Chunk", image: u("1563805042-7684c019e1cb") }, // chocolate ice cream
      { text: "Roasted Sicilian Pistachio Cream", image: u("1501443762994-82bd5dace89a") }, // pistachio ice cream
      { text: "Fresh Garden Mint with Dark Chocolate Flakes", image: u("1567206563064-6f60f40a2b57") }, // mint ice cream
      { text: "Tangy Wild Summer Raspberry Sorbet", image: u("1505394033641-40c6ad1178d7") } // berry sorbet
    ]
  ],

  // 45. Vacation Souvenirs
  [
    "Which travel souvenir do you cherish on your shelf forever?",
    [
      { text: "Handcrafted Local Ceramic Coffee Mug", image: u("1514432324607-a09d9b4aefdd") }, // ceramic mug
      { text: "Stamped Leather Travel Journal & Passport", image: u("1544716278-ca5e3f4abd8c") }, // leather journal book
      { text: "Framed Canvas by a Local Street Artist", image: u("1565008447742-97f6f38c985c") }, // canvas painting
      { text: "Hand-Woven Wool Throw Blanket", image: u("1584100936595-c0654b55a2e2") }, // wool throw
      { text: "Glass Bottle of Cold-Pressed Artisan Olive Oil", image: u("1474979266404-7eaacbcd87c5") }, // olive oil bottle
      { text: "Vintage Illustrated Postcard from the Journey", image: u("1513542789411-b6a5d4f31634") } // postcard vintage
    ]
  ],

  // 46. Theme Park Thrills
  [
    "Which theme park thrill ride do you sprint towards at rope drop?",
    [
      { text: "Giga Roller Coaster with an 80-Degree Drop", image: u("1513889961551-628c1e5e2ee9") }, // roller coaster
      { text: "Whitewater Canyon Splash Log Flume", image: u("1530866495561-507c9faab2ed") }, // water splash
      { text: "Giant Skyline Ferris Wheel at Sunset", image: u("1502136969935-8d8eef54d77b") }, // ferris wheel
      { text: "Dark Haunted Manor Ghost Ride", image: u("1509198397868-475647b2a1e5") }, // spooky manor
      { text: "Fast-Spinning Neon Bumper Cars", image: u("1511512578047-dfb367046420") }, // arcade / amusement
      { text: "200-Foot Vertical Freefall Tower", image: u("1492684223066-81342ee5ff30") } // freefall drop
    ]
  ],

  // 47. Secret Agent Gadgets
  [
    "Which secret agent gadget would you keep in your jacket pocket?",
    [
      { text: "Titanium Wristwatch with Laser Cutter", image: u("1523275335684-37898b6baf30") }, // luxury tech watch
      { text: "Tactical Night Vision Surveillance Goggles", image: u("1508739773434-c26b3d09e071") }, // tech vision optics
      { text: "Executive Fountain Pen with Invisible Ink", image: u("1583485088034-697b5bc54ccd") }, // luxury fountain pen
      { text: "Bulletproof Reinforced Umbrella Shield", image: u("1534447677768-be436bb09401") }, // stylish umbrella
      { text: "Silent Hummingbird Micro Surveillance Drone", image: u("1527977966376-1c8408f9f108") }, // drone flying
      { text: "High-Precision Multi-Tool Lockpick Set", image: u("1581783342308-f792dbdd27c5") } // precision tool / keys
    ]
  ],

  // 48. Cozy Rainy Day Escapes
  [
    "What is your ultimate rainy afternoon indoor escape?",
    [
      { text: "Reading a Mystery Novel in an Armchair", image: u("1512820790803-83ca734da794") }, // reading book
      { text: "Assembling a 1,000-Piece Jigsaw Puzzle", image: u("1610890716171-6b1bb98ffd09") }, // jigsaw puzzle
      { text: "Simmering a Rich Dutch Oven Beef Stew", image: u("1547592166-23ac45744acd") }, // stew pot
      { text: "Movie Marathon of Nostalgic Cinema Classics", image: u("1489599849927-2ee91cede3ba") }, // cinema screen
      { text: "Playing Soft Piano Melodies by the Window", image: u("1501785888041-af3ef285b470") }, // piano keys
      { text: "Warm Heavy Fleece Blanket Nap with Rainfall", image: u("1584100936595-c0654b55a2e2") } // blanket nap
    ]
  ],

  // 49. Zombie Outbreak Survival Gear
  [
    "Which zombie outbreak survival tool would you trust with your life?",
    [
      { text: "Heavy Forged Steel Crowbar", image: u("1581783342308-f792dbdd27c5") }, // steel tool / crowbar
      { text: "Hand-Crank Emergency Weather Radio & Torch", image: u("1508739773434-c26b3d09e071") }, // emergency radio/tech
      { text: "Military Long-Life MRE Food Rations", image: u("1558030006-450675393462") }, // survival food jerky
      { text: "Multi-Stage Survival Water Filter Straw", image: u("1506744038136-46273834b3fb") }, // fresh river water
      { text: "Rugged Steel-Toe Waterproof Combat Boots", image: u("1520639888713-7851133b1ed0") }, // leather boots
      { text: "Padded Heavy-Duty Leather Riding Jacket", image: u("1551028719-00167b16eac5") } // leather jacket
    ]
  ],

  // 50. Fantasy Tabletop RPG Classes
  [
    "Which tabletop RPG class are you playing on your grand campaign?",
    [
      { text: "Heavy Armor Holy Paladin with War Hammer", image: u("1514539079130-25950c84af65") }, // armor warrior art
      { text: "Robed Wizard Summoning Arcane Fireballs", image: u("1518709268805-4e9042af9f23") }, // fantasy magic
      { text: "Stealthy Dagger-Wielding Shadow Rogue", image: u("1509198397868-475647b2a1e5") }, // shadow dark rogue
      { text: "Elven Longbow Ranger Tracking in the Wild", image: u("1542273917363-3b1817f69a2d") }, // forest woodland ranger
      { text: "Devout Battle Cleric Healing the Party", image: u("1493976040374-85c8e12f0c0e") }, // holy shrine / temple
      { text: "Wildshape Nature Druid Channeling the Forest", image: u("1448375240586-882707db888b") } // deep wild forest
    ]
  ],

  // 51. TV Comedy Classics
  [
    "Which beloved TV comedy would you marathon on repeat with friends?",
    [
      { text: "The Office (Dunder Mifflin Paper Company)", image: u("1497215728101-856f4ea42174") }, // modern office desk
      { text: "Friends (Central Perk Coffeehouse Couch)", image: u("1517248135467-4c7edcad34c4") }, // coffeehouse lounge
      { text: "Brooklyn Nine-Nine (Police Precinct)", image: u("1486406146926-c627a92ad1ab") }, // city precinct towers
      { text: "Parks and Recreation (Small Town Council)", image: u("1577495508048-b635879837f1") }, // town hall / park
      { text: "Schitt's Creek (Quirky Family Dynasty)", image: u("1566073771259-6a8506099945") }, // vintage motel
      { text: "Ted Lasso (AFC Richmond Football Club)", image: u("1579952363873-27f3bade9f55") } // soccer pitch stadium
    ]
  ],

  // 52. Magnificent Ocean Wildlife
  [
    "Which majestic ocean creature would you want to swim alongside safely?",
    [
      { text: "Massive Humpback Whale Breaching Open Waters", image: u("1518837695005-2083093ee35b") }, // ocean whale
      { text: "Pod of Playful Bottlenose Dolphins", image: u("1570481662006-a3a1374699e8") }, // dolphins
      { text: "Ancient Pacific Green Sea Turtle", image: u("1544551763-46a013bb70d5") }, // sea turtle diving
      { text: "Graceful Giant Oceanic Manta Ray", image: u("1544551763-46a013bb70d5") }, // manta ray diving
      { text: "Vibrant Clownfish in Sea Anemone", image: u("1522069169874-c58ec4b76be5") }, // colorful tropical fish
      { text: "Majestic Great White Shark in Open Sea", image: u("1544551763-46a013bb70d5") } // shark
    ]
  ],

  // 53. Vintage Flea Market Finds
  [
    "Which vintage flea market treasure would you haggle for immediately?",
    [
      { text: "Fully Restored 35mm Analog Film Camera", image: u("1516035069371-29a1b244cc32") }, // vintage camera
      { text: "Vintage Wood-Cabinet Vinyl Turntable", image: u("1539375665275-f9de415ef9ac") }, // vinyl turntable
      { text: "Solid Brass 19th Century Navigator's Compass", image: u("1508739773434-c26b3d09e071") }, // brass compass
      { text: "Distressed Brown Leather Aviator Jacket", image: u("1551028719-00167b16eac5") }, // leather jacket
      { text: "Mid-Century Art Deco Neon Wall Clock", image: u("1563861826100-9cb868fdbe1c") }, // vintage wall clock
      { text: "Cloth-Bound First Edition Classic Book", image: u("1544716278-ca5e3f4abd8c") } // antique book
    ]
  ],

  // 54. Legendary Superpowers
  [
    "Which legendary superpower would you choose to have for life?",
    [
      { text: "Effortless Soaring Flight Above the Clouds", image: u("1507525428034-b723cf961d3e") }, // clouds / flight sky
      { text: "Instant Teleportation Anywhere on Earth", image: u("1519671482749-fd09be7ccebf") }, // skyline teleport
      { text: "Complete Optical Invisibility at Will", image: u("1518709268805-4e9042af9f23") }, // magic misty light
      { text: "Instant Cellular Healing & Peak Vitality", image: u("1540420773420-3366772f4999") }, // radiant vital green
      { text: "Lightning-Fast Superspeed Across Cities", image: u("1503376780353-7e6692767b70") }, // motion speed
      { text: "Mind-Controlled Telekinesis Moving Heavy Objects", image: u("1511512578047-dfb367046420") } // futuristic energy
    ]
  ],

  // 55. Earth's Natural Wonders
  [
    "Which natural wonder of the world leaves you completely breathless?",
    [
      { text: "The Grand Canyon Carved Crimson Chasm", image: u("1474044159687-1ee9f3a51722") }, // grand canyon
      { text: "Polar Northern Lights / Aurora Borealis", image: u("1517411032315-54ef2cb783bb") }, // aurora borealis
      { text: "Mount Everest Snowy Peak Piercing the Clouds", image: u("1464822759023-fed622ff2c3b") }, // snowy mountain peak
      { text: "Victoria Falls Roaring Curtain of Mist", image: u("1432405972618-c60b0225b8f9") }, // roaring waterfall
      { text: "Great Barrier Reef Underwater Coral Wonderland", image: u("1544551763-46a013bb70d5") }, // coral reef
      { text: "The Swiss Matterhorn Jagged Alpine Peak", image: u("1530122037265-a5f1f91d3b99") } // swiss alps matterhorn
    ]
  ],

  // 56. Energizing Morning Rituals
  [
    "Which morning ritual makes you feel energized and invincible?",
    [
      { text: "Freshly Ground Pour-Over Specialty Coffee", image: u("1485808191679-5f86510681a2") }, // pour over coffee
      { text: "20 Minutes of Sunlit Morning Yoga & Stretching", image: u("1545205597-3d9d02c29597") }, // yoga morning
      { text: "Splash of Ice-Cold Glacier Spring Water", image: u("1517701550927-30cf4ba1dba5") }, // water splash
      { text: "Brisk Morning Jog Through Quiet Neighborhood", image: u("1461896836934-ffe607ba8211") }, // jogging morning
      { text: "Writing Three Gratitudes in a Fresh Journal", image: u("1544716278-ca5e3f4abd8c") }, // writing journal
      { text: "Steaming Hot Shower Followed by a Cool Blast", image: u("1507652313519-d4e9174996dd") } // spa shower
    ]
  ],

  // 57. Tropical Island Fun
  [
    "Which tropical island activity defines peak vacation bliss?",
    [
      { text: "Snorkeling over Rainbow Shallow Coral Reefs", image: u("1544551763-46a013bb70d5") }, // snorkeling reef
      { text: "Afternoon Nap Swaying in a Beachside Hammock", image: u("1507525428034-b723cf961d3e") }, // beach hammock
      { text: "Riding Warm Cresting Turquoise Surf Waves", image: u("1502680390469-be75c86b636f") }, // surfing waves
      { text: "Sipping Fresh Chilled Coconut with a Bamboo Straw", image: u("1525385133512-2f3bdd039054") }, // coconut drink
      { text: "Watching Fiery Golden Orange Ocean Sunset", image: u("1495616811223-4d98c6e9c869") }, // ocean sunset
      { text: "Cruising on a Sunset Catamaran with Cold Drinks", image: u("1506744038136-46273834b3fb") } // sailing boat
    ]
  ],

  // 58. Global Cultural Celebrations
  [
    "Which worldwide cultural celebration would you travel across the globe to see?",
    [
      { text: "Rio de Janeiro Carnival Samba Parade", image: u("1516450360452-9312f5e86fc7") }, // carnival party
      { text: "Kyoto Cherry Blossom Spring Hanami", image: u("1493976040374-85c8e12f0c0e") }, // cherry blossom temple
      { text: "Venice Carnivale Elaborate Masquerade Ball", image: u("1533105079780-92b9be482077") }, // venice italy
      { text: "Diwali Festival of Lights with Glowing Diyas", image: u("1514517521153-1be72277b32f") }, // festival glowing lights
      { text: "Munich Oktoberfest Giant Wooden Beer Hall", image: u("1510591509098-f4fdc6d0ff04") }, // beer hall feast
      { text: "Mexican Dia de los Muertos Candlelit Celebration", image: u("1509198397868-475647b2a1e5") } // candlelit celebration
    ]
  ],

  // 59. Nostalgic Candy Shop Treats
  [
    "Which sweet candy shop treat brings back pure childhood wonder?",
    [
      { text: "Soft Sugar-Dusted Peach Gummy Rings", image: u("1582058091505-f87a2e55a40f") }, // gummy candy
      { text: "Sour Neon Gummy Worms with Tangy Sugar", image: u("1582058091505-f87a2e55a40f") }, // sour gummies
      { text: "Fresh Whipped Saltwater Taffy", image: u("1514517521153-1be72277b32f") }, // colorful candy
      { text: "Rich Dark Chocolate Cocoa Dusted Truffles", image: u("1606313564200-e75d5e30476c") }, // chocolate truffles
      { text: "Rainbow Assorted Glass Hard Candies", image: u("1527515637462-cff94eecc1ac") }, // colorful hard candies
      { text: "Traditional Old-School Black Licorice Twirls", image: u("1568605117036-5fe5e7bab0b7") } // licorice
    ]
  ],

  // 60. World City Skylines at Night
  [
    "Which world city skyline is the most breathtaking to view at night?",
    [
      { text: "New York City Manhattan Glowing Towers", image: u("1480714378408-67cf0d13bc1b") }, // new york skyline
      { text: "Tokyo Neon Shibuya & Tokyo Tower", image: u("1503899036084-c55cdd92da26") }, // tokyo night
      { text: "London River Thames & Illuminated Big Ben", image: u("1513635269975-59663e0ac1ad") }, // london big ben
      { text: "Paris Sparkling Eiffel Tower at Midnight", image: u("1502602898657-3e91760cbb34") }, // paris eiffel tower
      { text: "Hong Kong Victoria Harbour Laser Lights", image: u("1506973035872-a4ec16b8e8d9") }, // hong kong / sydney harbor
      { text: "Sydney Opera House & Harbour Bridge Illuminated", image: u("1506973035872-a4ec16b8e8d9") } // sydney harbor
    ]
  ]
];
