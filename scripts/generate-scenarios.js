// Generator for 100 high-quality Trust Issues scenarios with 9 options & safe images each
import { writeFileSync } from 'node:fs';

const rawData = [
  // 1. Travel / Honeymoon
  [
    'Which is the ultimate honeymoon spot?',
    [
      ['Paris, France', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80'],
      ['Swiss Alps', 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=400&q=80'],
      ['Santorini, Greece', 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=400&q=80'],
      ['Kyoto, Japan', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80'],
      ['Maldives Overwater Villa', 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=400&q=80'],
      ['Bali, Indonesia', 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80'],
      ['Queenstown, New Zealand', 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=400&q=80'],
      ['Amalfi Coast, Italy', 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=400&q=80'],
      ['Maui, Hawaii', 'https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format&fit=crop&w=400&q=80']
    ]
  ],
  // 2. Celebration Feast
  [
    'What are you ordering for a big celebration feast?',
    [
      ['Fresh Sushi Platter', 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80'],
      ['Wood-Fired Pizza', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80'],
      ['Royal Dum Biryani', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80'],
      ['Gourmet Smash Burger', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80'],
      ['Street Tacos & Salsa', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=400&q=80'],
      ['Steamed Dumplings & Dim Sum', 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=400&q=80'],
      ['Creamy Truffle Pasta', 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=400&q=80'],
      ['Crispy Masala Dosa', 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=400&q=80'],
      ['Tonkotsu Ramen Bowl', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80']
    ]
  ],
  // 3. Group Sport
  [
    'Which sport would you play with your friends this weekend?',
    [
      ['Football / Soccer', 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=400&q=80'],
      ['Cricket in the Park', 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=400&q=80'],
      ['Basketball Half-Court', 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=400&q=80'],
      ['Tennis Doubles', 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=400&q=80'],
      ['Badminton Rally', 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=400&q=80'],
      ['Beach Volleyball', 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=400&q=80'],
      ['Table Tennis / Ping Pong', 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=400&q=80'],
      ['Cosmic Bowling', 'https://images.unsplash.com/photo-1538330627166-33d1908c210d?auto=format&fit=crop&w=400&q=80'],
      ['Ultimate Frisbee', 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&fit=crop&w=400&q=80']
    ]
  ],
  // 4. TV Series
  [
    'Which TV series would you binge-watch together?',
    [
      ['Friends', 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=400&q=80'],
      ['The Office', 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=400&q=80'],
      ['Stranger Things', 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80'],
      ['Wednesday', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80'],
      ['Sherlock', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80'],
      ['Brooklyn Nine-Nine', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=400&q=80'],
      ['Modern Family', 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=400&q=80'],
      ['Ted Lasso', 'https://images.unsplash.com/photo-1489944445391-11dd35574549?auto=format&fit=crop&w=400&q=80'],
      ['Game of Thrones', 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=400&q=80']
    ]
  ],
  // 5. Superpower
  [
    'Which superpower would you choose for one year?',
    [
      ['Flight', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80'],
      ['Teleportation', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'],
      ['Invisibility', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80'],
      ['Time Travel', 'https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=400&q=80'],
      ['Instant Healing', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400&q=80'],
      ['Mind Reading', 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80'],
      ['Super Speed', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=400&q=80'],
      ['Shape-Shifting', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80'],
      ['Animal Telepathy', 'https://images.unsplash.com/photo-1474511320723-9a56873ee67b?auto=format&fit=crop&w=400&q=80']
    ]
  ],
  // 6. Weekend Vibe
  [
    'What makes the perfect lazy weekend?',
    [
      ['Sunny Beach Trip', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80'],
      ['Movie Marathon Under Blankets', 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=400&q=80'],
      ['Campfire in the Woods', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=400&q=80'],
      ['Competitive Board Game Night', 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=400&q=80'],
      ['Live Outdoor Concert', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80'],
      ['Local Food Truck Crawl', 'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?auto=format&fit=crop&w=400&q=80'],
      ['Modern Art Museum Visit', 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=400&q=80'],
      ['Luxury Hot Spring Spa Day', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80'],
      ['Scenic Mountain Road Trip', 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=400&q=80']
    ]
  ],
  // 7. Dessert
  [
    'Which dessert deserves the undisputed crown?',
    [
      ['Artisan Ice Cream', 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=400&q=80'],
      ['Warm Gulab Jamun', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80'],
      ['Fudgy Chocolate Brownie', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80'],
      ['New York Cheesecake', 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&w=400&q=80'],
      ['Crispy Saffron Jalebi', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=80'],
      ['Classic Italian Tiramisu', 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=400&q=80'],
      ['Soft Cardamom Rasmalai', 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=400&q=80'],
      ['Belgian Sugar Waffles', 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=400&q=80'],
      ['Dark Chocolate Mousse', 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=400&q=80']
    ]
  ],
  // 8. Fictional Universe
  [
    'Which fictional universe would you survive a week in?',
    [
      ['Hogwarts Castle', 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?auto=format&fit=crop&w=400&q=80'],
      ['Wakanda High-Tech City', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80'],
      ['The Shire in Middle-earth', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80'],
      ['Lantern Waste, Narnia', 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80'],
      ['Gotham City Rooftops', 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80'],
      ['Atlantis Coral Palace', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80'],
      ['Neverland Secret Lagoon', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80'],
      ['Asgard Golden City', 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=400&q=80'],
      ['Wonderland Tea Party', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80']
    ]
  ],
  // 9. Lost Luggage Save
  [
    'What single item do you save from a lost luggage disaster?',
    [
      ['Smartphone', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80'],
      ['Passport & Visa Docs', 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80'],
      ['Noise-Cancelling Headphones', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80'],
      ['Favorite Oversized Hoodie', 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80'],
      ['Compact Camera', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80'],
      ['Personal Journal & Pen', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80'],
      ['Emergency Snack Stash', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80'],
      ['Lucky Charm Keychain', 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80'],
      ['Dog-Eared Paper Novel', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80']
    ]
  ],
  // 10. Dream Home Feature
  [
    'What secret room would you install in your dream mansion?',
    [
      ['Two-Story Library & Ladder', 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=400&q=80'],
      ['Heated Infinity Pool', 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=400&q=80'],
      ['Retro Arcade Room', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80'],
      ['Private Cinema with Plush Seats', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&q=80'],
      ['Rooftop Greenhouse & Lounge', 'https://images.unsplash.com/photo-1530629013299-6cb10d168419?auto=format&fit=crop&w=400&q=80'],
      ['Soundproof Jamming Studio', 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=400&q=80'],
      ['Chef Kitchen with Brick Oven', 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80'],
      ['Panoramic Glass Gym', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80'],
      ['Hidden Bookshelf Passageway', 'https://images.unsplash.com/photo-1507842229458-57793d55009a?auto=format&fit=crop&w=400&q=80']
    ]
  ]
];
