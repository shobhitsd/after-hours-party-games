-- Supabase Seed Data for Trust Issues (100 Scenarios & 900 Options)
-- Generated automatically
BEGIN;

-- Scenario 1: Which is the ultimate honeymoon spot?...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which is the ultimate honeymoon spot?', 'icebreaker', false, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Paris, France', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80', 0),
  ('Swiss Alps', 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=400&q=80', 1),
  ('Santorini, Greece', 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=400&q=80', 2),
  ('Kyoto, Japan', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80', 3),
  ('Maldives Overwater Villa', 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=400&q=80', 4),
  ('Bali, Indonesia', 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80', 5),
  ('Queenstown, New Zealand', 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=400&q=80', 6),
  ('Amalfi Coast, Italy', 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=400&q=80', 7),
  ('Maui, Hawaii', 'https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 2: What are you ordering for a big celebrat...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'What are you ordering for a big celebration feast?', 'icebreaker', false, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Fresh Sushi Platter', 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80', 0),
  ('Wood-Fired Pizza', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80', 1),
  ('Royal Dum Biryani', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80', 2),
  ('Gourmet Smash Burger', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80', 3),
  ('Street Tacos & Salsa', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=400&q=80', 4),
  ('Steamed Dumplings & Dim Sum', 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=400&q=80', 5),
  ('Creamy Truffle Pasta', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80', 6),
  ('Crispy Masala Dosa', 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=400&q=80', 7),
  ('Tonkotsu Ramen Bowl', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 3: Which sport would you play with your fri...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which sport would you play with your friends this weekend?', 'icebreaker', false, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Football / Soccer', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 0),
  ('Cricket in the Park', 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=400&q=80', 1),
  ('Basketball Half-Court', 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=400&q=80', 2),
  ('Tennis Doubles', 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=400&q=80', 3),
  ('Badminton Rally', 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=400&q=80', 4),
  ('Beach Volleyball', 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=400&q=80', 5),
  ('Table Tennis / Ping Pong', 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=400&q=80', 6),
  ('Cosmic Bowling', 'https://images.unsplash.com/photo-1538330627166-33d1908c210d?auto=format&fit=crop&w=400&q=80', 7),
  ('Ultimate Frisbee', 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 4: Which TV series would you binge-watch to...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which TV series would you binge-watch together?', 'icebreaker', false, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Friends', 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=400&q=80', 0),
  ('The Office', 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=400&q=80', 1),
  ('Stranger Things', 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80', 2),
  ('Wednesday', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80', 3),
  ('Sherlock', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80', 4),
  ('Brooklyn Nine-Nine', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=400&q=80', 5),
  ('Modern Family', 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=400&q=80', 6),
  ('Ted Lasso', 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80', 7),
  ('Game of Thrones', 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 5: Which superpower would you choose for on...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which superpower would you choose for one year?', 'icebreaker', false, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Flight', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80', 0),
  ('Teleportation', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 1),
  ('Invisibility', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80', 2),
  ('Time Travel', 'https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=400&q=80', 3),
  ('Instant Healing', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400&q=80', 4),
  ('Mind Reading', 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80', 5),
  ('Super Speed', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=400&q=80', 6),
  ('Shape-Shifting', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80', 7),
  ('Animal Telepathy', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 6: What makes the perfect lazy weekend?...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'What makes the perfect lazy weekend?', 'icebreaker', false, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Sunny Beach Trip', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80', 0),
  ('Movie Marathon Under Blankets', 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=400&q=80', 1),
  ('Campfire in the Woods', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=400&q=80', 2),
  ('Competitive Board Game Night', 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=400&q=80', 3),
  ('Live Outdoor Concert', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80', 4),
  ('Local Food Truck Crawl', 'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?auto=format&fit=crop&w=400&q=80', 5),
  ('Modern Art Museum Visit', 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=400&q=80', 6),
  ('Luxury Hot Spring Spa Day', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80', 7),
  ('Scenic Mountain Road Trip', 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 7: Which dessert deserves the undisputed cr...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which dessert deserves the undisputed crown?', 'icebreaker', false, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Artisan Ice Cream', 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=400&q=80', 0),
  ('Warm Gulab Jamun', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80', 1),
  ('Fudgy Chocolate Brownie', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80', 2),
  ('New York Cheesecake', 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&w=400&q=80', 3),
  ('Crispy Saffron Jalebi', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=80', 4),
  ('Classic Italian Tiramisu', 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=400&q=80', 5),
  ('Soft Cardamom Rasmalai', 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=400&q=80', 6),
  ('Belgian Sugar Waffles', 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=400&q=80', 7),
  ('Dark Chocolate Mousse', 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 8: Which fictional universe would you survi...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which fictional universe would you survive a week in?', 'icebreaker', false, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Hogwarts Castle', 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?auto=format&fit=crop&w=400&q=80', 0),
  ('Wakanda High-Tech City', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80', 1),
  ('The Shire in Middle-earth', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80', 2),
  ('Lantern Waste, Narnia', 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80', 3),
  ('Gotham City Rooftops', 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80', 4),
  ('Atlantis Coral Palace', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80', 5),
  ('Neverland Secret Lagoon', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80', 6),
  ('Asgard Golden City', 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=400&q=80', 7),
  ('Wonderland Tea Party', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 9: What single item do you save from a lost...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'What single item do you save from a lost luggage disaster?', 'icebreaker', false, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Smartphone', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80', 0),
  ('Passport & Visa Docs', 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80', 1),
  ('Noise-Cancelling Headphones', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80', 2),
  ('Favorite Oversized Hoodie', 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80', 3),
  ('Compact Mirrorless Camera', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80', 4),
  ('Personal Journal & Pen', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80', 5),
  ('Emergency Snack Stash', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80', 6),
  ('Lucky Charm Keychain', 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80', 7),
  ('Dog-Eared Paper Novel', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 10: What secret room would you install in yo...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'What secret room would you install in your dream mansion?', 'icebreaker', false, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Two-Story Library & Ladder', 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=400&q=80', 0),
  ('Heated Infinity Pool', 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=400&q=80', 1),
  ('Retro Arcade Room', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80', 2),
  ('Private Cinema with Plush Seats', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&q=80', 3),
  ('Rooftop Greenhouse & Lounge', 'https://images.unsplash.com/photo-1530629013299-6cb10d168419?auto=format&fit=crop&w=400&q=80', 4),
  ('Soundproof Jamming Studio', 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=400&q=80', 5),
  ('Chef Kitchen with Brick Oven', 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80', 6),
  ('Panoramic Glass Gym', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80', 7),
  ('Hidden Bookshelf Passageway', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 11: Which animal would make the best mascot ...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which animal would make the best mascot for your crew?', 'icebreaker', false, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Gentoo Penguin', 'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?auto=format&fit=crop&w=400&q=80', 0),
  ('Red Fox', 'https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=400&q=80', 1),
  ('Sea Otter', 'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?auto=format&fit=crop&w=400&q=80', 2),
  ('Giant Panda', 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80', 3),
  ('Bengal Tiger', 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=400&q=80', 4),
  ('Bottlenose Dolphin', 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=400&q=80', 5),
  ('Barn Owl', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80', 6),
  ('Red Panda', 'https://images.unsplash.com/photo-1547407139-3c921a66005c?auto=format&fit=crop&w=400&q=80', 7),
  ('Capybara', 'https://images.unsplash.com/photo-1627916607164-7b20241db935?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 12: Which talent would you magically master ...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which talent would you magically master overnight?', 'icebreaker', false, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Master Chef Cooking', 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=80', 0),
  ('Soulful Vocals & Singing', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80', 1),
  ('Street Dancing / Hip-Hop', 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=400&q=80', 2),
  ('Oil Painting', 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80', 3),
  ('Fluency in 5 Languages', 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80', 4),
  ('Sleight-of-Hand Magic', 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=400&q=80', 5),
  ('Big Wave Surfing', 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=400&q=80', 6),
  ('Fine Art Photography', 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=400&q=80', 7),
  ('Charismatic Storytelling', 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 13: Which snack is non-negotiable at game ni...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which snack is non-negotiable at game night?', 'icebreaker', false, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Movie Theater Butter Popcorn', 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=400&q=80', 0),
  ('Loaded Cheese Nachos', 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=400&q=80', 1),
  ('Crispy Fried Samosas', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80', 2),
  ('Truffle Parmesan Fries', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80', 3),
  ('Crunchy Salt & Vinegar Chips', 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=400&q=80', 4),
  ('Golden Vegetable Spring Rolls', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80', 5),
  ('Warm Choc Chip Cookies', 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&q=80', 6),
  ('Spicy Onion Pakoras', 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=400&q=80', 7),
  ('Soft Baked Bavarian Pretzels', 'https://images.unsplash.com/photo-1583338917451-face2751d8d5?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 14: How do you spend an unexpected paid day ...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'How do you spend an unexpected paid day off tomorrow?', 'icebreaker', false, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Sleep In Till Noon', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80', 0),
  ('Brunch with Close Friends', 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=400&q=80', 1),
  ('Explore New City Neighborhoods', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80', 2),
  ('Hike a Mountain Trail', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80', 3),
  ('Bake Artisanal Pastries', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80', 4),
  ('Carefree Shopping Spree', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80', 5),
  ('Read in a Sunlit Hammock', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80', 6),
  ('All-Day Video Game Marathon', 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=400&q=80', 7),
  ('Home Cooked Dinner with Family', 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 15: Which theme park thrill ride are you get...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which theme park thrill ride are you getting in line for first?', 'icebreaker', false, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Looping Roller Coaster', 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&w=400&q=80', 0),
  ('Giant Sky Ferris Wheel', 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80', 1),
  ('High-Speed Water Flume', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80', 2),
  ('Retro Bumper Cars', 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=400&q=80', 3),
  ('Outdoor Go-Kart Grand Prix', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=400&q=80', 4),
  ('Ornate Carousel Horses', 'https://images.unsplash.com/photo-1560707303-4e980ce876ad?auto=format&fit=crop&w=400&q=80', 5),
  ('150ft Vertical Drop Tower', 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80', 6),
  ('Haunted Mansion Ghost Train', 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=400&q=80', 7),
  ('Swinging Pirate Ship', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 16: Which holiday souvenir do you keep on di...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which holiday souvenir do you keep on display forever?', 'icebreaker', false, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Local Handcrafted Pottery', 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=400&q=80', 0),
  ('Vintage Illustrated Postcard', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=400&q=80', 1),
  ('Authentic Local Spice Blend', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80', 2),
  ('Framed Panoramic Sunset Photo', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 3),
  ('Handmade Ceramic Coffee Mug', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80', 4),
  ('Foreign Language Paperback', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80', 5),
  ('Engraved Brass Keyring', 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80', 6),
  ('Antique Folding City Map', 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=80', 7),
  ('Concert Wristband & Stub', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 17: What is your go-to coffee shop order?...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'What is your go-to coffee shop order?', 'icebreaker', false, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Iced Caramel Macchiato', 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=400&q=80', 0),
  ('Oat Milk Vanilla Latte', 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=400&q=80', 1),
  ('Double Shot Espresso', 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=400&q=80', 2),
  ('Cold Brew with Sweet Foam', 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=400&q=80', 3),
  ('Ceremonial Matcha Latte', 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=400&q=80', 4),
  ('Cortado in Glass', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80', 5),
  ('Spiced Masala Chai Latte', 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80', 6),
  ('Dark Mocha with Whipped Cream', 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=400&q=80', 7),
  ('Velvety Flat White', 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 18: Which item do you grab in a zombie apoca...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which item do you grab in a zombie apocalypse outbreak?', 'icebreaker', false, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Aluminium Baseball Bat', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 0),
  ('Steel Katana Sword', 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80', 1),
  ('Hunting Crossbow & Bolts', 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&fit=crop&w=400&q=80', 2),
  ('Gas-Powered Chainsaw', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=400&q=80', 3),
  ('Heavy Cast Iron Skillet', 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=80', 4),
  ('Hardened Steel Crowbar', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80', 5),
  ('Demolition Sledgehammer', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80', 6),
  ('Compound Archery Bow', 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=400&q=80', 7),
  ('Heavy Duty Fire Axe', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 19: What is your first ridiculous purchase a...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'What is your first ridiculous purchase after winning the lottery?', 'icebreaker', false, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Private Tropical Island Week', 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=400&q=80', 0),
  ('Custom Matte Black Supercar', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80', 1),
  ('State-of-the-Art Music Studio', 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=400&q=80', 2),
  ('Unlimited Designer Closet', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80', 3),
  ('Mega Yacht Party with Friends', 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=400&q=80', 4),
  ('365-Day First Class World Tour', 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=400&q=80', 5),
  ('Vintage Guitar & Synth Vault', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80', 6),
  ('3-Star Michelin Dinner for 30', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=80', 7),
  ('Full-Time Personal Butler & Chef', 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 20: Which era would you visit first in a one...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which era would you visit first in a one-way time machine trip?', 'icebreaker', false, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Ancient Egypt 2500 BC', 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80', 0),
  ('Renaissance Florence 1500', 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=400&q=80', 1),
  ('Roaring Twenties in New York', 'https://images.unsplash.com/photo-1496868834840-5f4c98840aaa?auto=format&fit=crop&w=400&q=80', 2),
  ('Swinging Sixties London', 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=400&q=80', 3),
  ('Feudal Japan Edo Period', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80', 4),
  ('Wild West Frontier 1880', 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=400&q=80', 5),
  ('Year 3000 Cyberpunk Metropolis', 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=400&q=80', 6),
  ('Woodstock Music Festival 1969', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80', 7),
  ('Cretaceous Dinosaur Forest', 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 21: What is the undisputed breakfast of cham...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'What is the undisputed breakfast of champions?', 'dilemma', false, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Classic Eggs Benedict', 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=400&q=80', 0),
  ('Stack of Fluffy Pancakes', 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=400&q=80', 1),
  ('Full English Fry-Up', 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=400&q=80', 2),
  ('Spicy Masala Omelette & Toast', 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80', 3),
  ('Açaí Berry Superfood Bowl', 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=400&q=80', 4),
  ('Avocado Sourdough Toast', 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=400&q=80', 5),
  ('Belgian Waffles with Berries', 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=400&q=80', 6),
  ('Loaded Breakfast Burrito', 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=400&q=80', 7),
  ('Warm Flaky Pain au Chocolat', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 22: Which dream concert would you drop every...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which dream concert would you drop everything to attend?', 'dilemma', false, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Queen Live at Wembley', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80', 0),
  ('Daft Punk Pyramid Alive Tour', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80', 1),
  ('Fleetwood Mac Rumours Era', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80', 2),
  ('Beyoncé Renaissance World Tour', 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=400&q=80', 3),
  ('Coldplay Stadium Light Show', 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=400&q=80', 4),
  ('Michael Jackson Bad World Tour', 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=400&q=80', 5),
  ('Nirvana MTV Unplugged', 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=400&q=80', 6),
  ('Taylor Swift The Eras Tour', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=80', 7),
  ('Bob Marley at Rainbow Theatre', 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 23: Which luxury item makes camping actually...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which luxury item makes camping actually enjoyable?', 'dilemma', false, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Plush Self-Inflating Air Mattress', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80', 0),
  ('High-Performance Ice Cooler', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=400&q=80', 1),
  ('Campfire Moka Espresso Pot', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80', 2),
  ('Tree Hammock with Bug Net', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80', 3),
  ('High-Capacity Solar Generator', 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80', 4),
  ('Cast Iron Dutch Oven for Stews', 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=80', 5),
  ('Warm Glow Fairy String Lights', 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=400&q=80', 6),
  ('Campfire Acoustic Guitar', 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=400&q=80', 7),
  ('Instant Pop-Up Canvas Cabin', 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 24: Which dreaded chore would you pay to eli...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which dreaded chore would you pay to eliminate forever?', 'dilemma', false, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Ironing Wrinkled Clothes', 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=400&q=80', 0),
  ('Scrubbing Bathroom Grout', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80', 1),
  ('Handwashing Greasy Pots', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80', 2),
  ('Folding Giant Laundry Piles', 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=400&q=80', 3),
  ('Taking Out Leaking Garbage', 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80', 4),
  ('Scraping Burnt Grease from the Oven', 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80', 5),
  ('Dusting Bookshelves & Blinds', 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=400&q=80', 6),
  ('Mopping Sticky Hardwood Floors', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80', 7),
  ('Weeding Prickly Garden Beds', 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 25: Which road trip snack never lets you dow...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which road trip snack never lets you down?', 'dilemma', false, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Sweet & Salty Trail Mix', 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=400&q=80', 0),
  ('Smoked Beef Jerky', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80', 1),
  ('Sour Neon Gummy Worms', 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=400&q=80', 2),
  ('Chocolate Peanut Butter Cups', 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=400&q=80', 3),
  ('Cheddar Baked Fish Crackers', 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=400&q=80', 4),
  ('Spicy Kettle-Cooked BBQ Chips', 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=400&q=80', 5),
  ('Roasted Salted Sunflower Seeds', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80', 6),
  ('Chewy Dried Mango Slices', 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80', 7),
  ('Powdered Sugar Mini Donuts', 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 26: Which legendary board game are you bring...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which legendary board game are you bringing to cabin weekend?', 'dilemma', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Settlers of Catan', 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=400&q=80', 0),
  ('Ticket to Ride: Europe', 'https://images.unsplash.com/photo-1563941402622-4e7a488bcc57?auto=format&fit=crop&w=400&q=80', 1),
  ('Codenames Party Edition', 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=400&q=80', 2),
  ('Betrayal at House on the Hill', 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80', 3),
  ('Wingspan Bird Reserve', 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=400&q=80', 4),
  ('Secret Hitler Social Deduction', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=400&q=80', 5),
  ('Carcassonne Medieval Castle', 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=400&q=80', 6),
  ('Clue / Cluedo Murder Mystery', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80', 7),
  ('Global Conquest Risk', 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 27: Which superhero would make the ultimate ...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which superhero would make the ultimate crime-fighting partner?', 'dilemma', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Spider-Man (Peter Parker)', 'https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?auto=format&fit=crop&w=400&q=80', 0),
  ('Iron Man (Tony Stark)', 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?auto=format&fit=crop&w=400&q=80', 1),
  ('Batman (Bruce Wayne)', 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80', 2),
  ('Wonder Woman (Diana Prince)', 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80', 3),
  ('Deadpool (Wade Wilson)', 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80', 4),
  ('Scarlet Witch (Wanda Maximoff)', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80', 5),
  ('Wolverine (Logan)', 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=400&q=80', 6),
  ('Thor Odinson', 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=400&q=80', 7),
  ('Doctor Strange (Stephen Strange)', 'https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 28: Which comfort food hit the spot after a ...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which comfort food hit the spot after a brutal week?', 'dilemma', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Baked Truffle Mac & Cheese', 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=400&q=80', 0),
  ('Crispy Fried Chicken Tenders', 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80', 1),
  ('Loaded Canadian Poutine', 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80', 2),
  ('Midnight Instant Spicy Ramen', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80', 3),
  ('Golden Mozzarella Sticks', 'https://images.unsplash.com/photo-1548340748-6d2b7d7da280?auto=format&fit=crop&w=400&q=80', 4),
  ('Warm Cinnamon Rolls with Cream Frosting', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80', 5),
  ('Crusty Sourdough Grilled Cheese', 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80', 6),
  ('Chocolate Thick Shake with Salted Fries', 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80', 7),
  ('Cheesy Chicken Quesadilla', 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 29: Which season has the absolute best atmos...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which season has the absolute best atmosphere?', 'dilemma', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Crisp Autumn Leaves & Hoodies', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80', 0),
  ('Sun-Drenched Midsummer Beach Days', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80', 1),
  ('First Silent Snowfall of Winter', 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&w=400&q=80', 2),
  ('Blooming Cherry Blossom Spring', 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=400&q=80', 3),
  ('Warm Golden-Hour Indian Summer', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80', 4),
  ('Cozy Rainy Monsoon Afternoons', 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=400&q=80', 5),
  ('Fresh Breezy Early Spring Evenings', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80', 6),
  ('Lakeside Late Summer Sunsets', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 7),
  ('Snowy Mountain Cabin Winter', 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 30: Which mythical creature would you raise ...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which mythical creature would you raise from an egg?', 'dilemma', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Friendly Fire-Breathing Baby Dragon', 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80', 0),
  ('Loyal Winged Gryphon', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80', 1),
  ('Immortal Golden Phoenix', 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=400&q=80', 2),
  ('Majestic White Pegasus', 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=400&q=80', 3),
  ('Glade Forest Unicorn', 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80', 4),
  ('Mystic Nine-Tailed Kitsune', 'https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=400&q=80', 5),
  ('Playful Three-Headed Cerberus Pup', 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80', 6),
  ('Island-Sized Ancient Sea Turtle', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80', 7),
  ('Thunder-Summoning Giant Thunderbird', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 31: Which global street food city is at the ...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which global street food city is at the very top of your bucket list?', 'dilemma', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Tokyo (Yakitori & Takoyaki)', 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80', 0),
  ('Bangkok (Pad Thai & Mango Sticky Rice)', 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=400&q=80', 1),
  ('Mexico City (Tacos al Pastor)', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=400&q=80', 2),
  ('Mumbai (Vada Pav & Pani Puri)', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80', 3),
  ('Istanbul (Simit & Kebabs)', 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=400&q=80', 4),
  ('Palermo, Sicily (Arancini & Cannoli)', 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=400&q=80', 5),
  ('Singapore (Hawker Center Hainanese Chicken)', 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=400&q=80', 6),
  ('Seoul (Tteokbokki & Hotteok)', 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=400&q=80', 7),
  ('Oaxaca (Tlayudas & Mole)', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 32: Which karaoke anthem gets everyone screa...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which karaoke anthem gets everyone screaming along?', 'dilemma', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Bohemian Rhapsody – Queen', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80', 0),
  ('Don''t Stop Believin'' – Journey', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80', 1),
  ('Mr. Brightside – The Killers', 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=400&q=80', 2),
  ('Dancing Queen – ABBA', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=80', 3),
  ('Sweet Caroline – Neil Diamond', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80', 4),
  ('Since U Been Gone – Kelly Clarkson', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80', 5),
  ('Wonderwall – Oasis', 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=400&q=80', 6),
  ('I Want It That Way – Backstreet Boys', 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=400&q=80', 7),
  ('Livin'' on a Prayer – Bon Jovi', 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 33: Which movie genre are you picking for Fr...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which movie genre are you picking for Friday night group watch?', 'dilemma', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Psychological Thriller with Huge Twists', 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80', 0),
  ('Nostalgic 90s Ensemble Comedy', 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=400&q=80', 1),
  ('Mind-Bending Sci-Fi Mystery', 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=400&q=80', 2),
  ('Classic Slasher Horror Movie', 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=400&q=80', 3),
  ('High-Stakes Casino Heist', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80', 4),
  ('Epic Fantasy Quest & Swords', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80', 5),
  ('Mansion Whodunit Murder Mystery', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80', 6),
  ('High-Octane Martial Arts Action', 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=400&q=80', 7),
  ('Heartwarming Coming-of-Age Indie', 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 34: Which childhood playground game was the ...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which childhood playground game was the most intensely competitive?', 'dilemma', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Four Square Tournament', 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=400&q=80', 0),
  ('Capture the Flag in the Woods', 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80', 1),
  ('Hide and Seek at Sunset', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80', 2),
  ('Gym Class Rubber Dodgeball', 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=400&q=80', 3),
  ('The Living Room Floor Is Lava', 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=400&q=80', 4),
  ('Infection / Zombie Tag', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 5),
  ('Red Rover Across the Grass', 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&fit=crop&w=400&q=80', 6),
  ('Spiral Tetherball Pole Match', 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=400&q=80', 7),
  ('Recess Big Red Kickball', 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 35: What hilarious phrase would you teach yo...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'What hilarious phrase would you teach your talking pet parrot?', 'dilemma', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('“Who goes there? Identify yourself!”', 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=400&q=80', 0),
  ('“The secret password is taco!”', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=400&q=80', 1),
  ('“Help, a wizard turned me into a bird!”', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80', 2),
  ('“Don’t look now, but someone is behind you.”', 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80', 3),
  ('“Never trust the Ranker!”', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=400&q=80', 4),
  ('“Dramatic plot twist incoming!”', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80', 5),
  ('“I know what you did last summer.”', 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=400&q=80', 6),
  ('“Order pizza immediately!”', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80', 7),
  ('“Beep boop, does not compute.”', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 36: Which pizza topping combo reigns supreme...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which pizza topping combo reigns supreme?', 'dilemma', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Crispy Pepperoni & Hot Honey Drizzle', 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=400&q=80', 0),
  ('San Marzano Margherita with Fresh Basil', 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80', 1),
  ('Prosciutto di Parma, Arugula & Shaved Parm', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80', 2),
  ('Quattro Formaggi Four-Cheese Blend', 'https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=400&q=80', 3),
  ('Smoky BBQ Chicken & Red Onions', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80', 4),
  ('Wild Forest Mushroom & Truffle Cream', 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=400&q=80', 5),
  ('Meat Lovers (Bacon, Sausage, Ham, Beef)', 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=400&q=80', 6),
  ('Goat Cheese, Caramelized Onion & Fig', 'https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?auto=format&fit=crop&w=400&q=80', 7),
  ('White Garlic Ricotta with Roasted Spinach', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 37: If you had to celebrate one holiday ever...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'If you had to celebrate one holiday every single month, which is it?', 'dilemma', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Halloween (Costumes, Candies & Haunted Houses)', 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=400&q=80', 0),
  ('Christmas (Cozy Lights, Tree & Secret Santa)', 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=400&q=80', 1),
  ('Diwali (Golden Diyas, Sweets & Firecrackers)', 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=400&q=80', 2),
  ('Midsummer Solstice (Beach Bonfires & Flowers)', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80', 3),
  ('Thanksgiving (All-Day Feast & Pumpkin Pies)', 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=400&q=80', 4),
  ('New Year’s Eve (Midnight Champagne & Confetti)', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=80', 5),
  ('St. Patrick’s Day (Emerald Parades & Pubs)', 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=400&q=80', 6),
  ('Valentine’s Day (Luxury Chocolate & Candlelight)', 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&q=80', 7),
  ('Holi (Vibrant Colored Powder Festival)', 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 38: Which dream car are you driving down the...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which dream car are you driving down the Pacific Coast Highway?', 'dilemma', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('1967 Cherry Red Ford Mustang Fastback', 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=400&q=80', 0),
  ('Porsche 911 GT3 in Signal Green', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80', 1),
  ('Silver Aston Martin DB5', 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=400&q=80', 2),
  ('Rosso Corsa Ferrari F40', 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=400&q=80', 3),
  ('Overland Expedition Land Rover Defender', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80', 4),
  ('Matte Black Tesla Cyber-Roadster', 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=400&q=80', 5),
  ('Audi R8 V10 Spyder Convertible', 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=400&q=80', 6),
  ('Vintage British Racing Green Mini Cooper', 'https://images.unsplash.com/photo-1532581140115-3e355d1ed1de?auto=format&fit=crop&w=400&q=80', 7),
  ('1965 Shelby Cobra 427 Roadster', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 39: Which single luxury item are you bringin...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which single luxury item are you bringing to a desert island retreat?', 'dilemma', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Solar-Powered Satellite High-Speed Internet', 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80', 0),
  ('Endless Bean Espresso Barista Machine', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80', 1),
  ('Memory Foam King Bed with Egyptian Cotton', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=80', 2),
  ('Waterproof Kindle Loaded with 10,000 Books', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80', 3),
  ('High-Fidelity Surround Sound Speaker', 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=400&q=80', 4),
  ('Silk-Weave Double Hammock in the Palms', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80', 5),
  ('Endless Gourmet Hot Sauce & Spice Box', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80', 6),
  ('Outdoor Portable Wood-Fired Pizza Oven', 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=80', 7),
  ('Vintage Martin Acoustic Guitar in Weather Case', 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 40: Which shelter rescue pet are you taking ...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which shelter rescue pet are you taking home today?', 'dilemma', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Scruffy Terrier Mix with Loving Eyes', 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80', 0),
  ('Gentle Senior Golden Retriever', 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80', 1),
  ('Big Affectionate Orange Tabby Cat', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80', 2),
  ('Floppy-Eared Sleepy Basset Hound', 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=400&q=80', 3),
  ('Giant Fluffy Bernese Mountain Pup', 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=400&q=80', 4),
  ('Ultra-Smart Tri-Color Border Collie', 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&w=400&q=80', 5),
  ('Tiny Playful Calico Kitten', 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=400&q=80', 6),
  ('Gentle Sniffing Rescue Beagle', 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=400&q=80', 7),
  ('Majestic Long-Haired Maine Coon', 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 41: Which sandwich build is pure perfection ...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which sandwich build is pure perfection between two slices of bread?', 'dilemma', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Pressed Cuban Sandwich (Pork, Ham, Swiss, Pickles)', 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80', 0),
  ('Warm NY Pastrami on Seeded Rye with Mustard', 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=400&q=80', 1),
  ('Crispy Lemongrass Pork Bánh Mì', 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?auto=format&fit=crop&w=400&q=80', 2),
  ('Caprese Focaccia (Burrata, Heirloom Tomato, Pesto)', 'https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&w=400&q=80', 3),
  ('Philly Ribeye Cheesesteak with Fried Onions', 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80', 4),
  ('Crispy Pork Katsu Sando on Milk Bread', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80', 5),
  ('Maine Lobster Roll on Toasted Butter Brioche', 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=400&q=80', 6),
  ('Classic Reuben (Corned Beef, Sauerkraut, Russian Dressing)', 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=400&q=80', 7),
  ('Crispy Thick-Cut Maple Bacon BLT on Brioche', 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 42: Which solar system destination would you...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which solar system destination would you explore in an advanced space suit?', 'dilemma', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Red Sand Dunes & Canyons of Mars', 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=400&q=80', 0),
  ('Subsurface Ocean of Jupiter’s Moon Europa', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 1),
  ('Rings of Saturn Viewed from Titan', 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=400&q=80', 2),
  ('Active Sulfur Volcanoes of Io', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80', 3),
  ('Floating Cloud City in the Skies of Venus', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 4),
  ('Nitrogen Ice Mountains of Pluto', 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=400&q=80', 5),
  ('Geysers of Enceladus Spraying into Space', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80', 6),
  ('Craters & Sea of Tranquility on the Moon', 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&w=400&q=80', 7),
  ('Solar Observatory in Close Orbit of the Sun', 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 43: Which musical instrument would you choos...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which musical instrument would you choose to instantly shred on stage?', 'dilemma', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Sunburst Electric Fender Stratocaster', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80', 0),
  ('Steinway Concert Grand Piano', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80', 1),
  ('Double-Bass Acoustic Drum Kit', 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=400&q=80', 2),
  ('Vintage Brass Tenor Saxophone', 'https://images.unsplash.com/photo-1525994886773-080587e161c2?auto=format&fit=crop&w=400&q=80', 3),
  ('Warm Acoustic Concert Cello', 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=400&q=80', 4),
  ('Funk Slap Bass Guitar', 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=400&q=80', 5),
  ('Spanish Flamenco Nylon Guitar', 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=400&q=80', 6),
  ('Analog Modular Synthesizer', 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=400&q=80', 7),
  ('Traditional Scottish Highland Bagpipes', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 44: Which dipping sauce is essential alongsi...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which dipping sauce is essential alongside a basket of hot french fries?', 'dilemma', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Roasted Garlic & White Truffle Aioli', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80', 0),
  ('Spicy Smoky Chipotle Mayo', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80', 1),
  ('Classic Tomato Ketchup', 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=400&q=80', 2),
  ('Warm Cheddar & Ale Beer Cheese Dip', 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=400&q=80', 3),
  ('Creamy Sweet Honey Mustard', 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=400&q=80', 4),
  ('Sweet & Spicy Thai Chili Sauce', 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=400&q=80', 5),
  ('Smoky Hickory Texas BBQ Sauce', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80', 6),
  ('Buttermilk Herb Ranch Dressing', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80', 7),
  ('German Spiced Curry Ketchup', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 45: Which wilderness survival skill would yo...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which wilderness survival skill would you trust with your life?', 'dilemma', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Friction Fire Starting with Bow Drill', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=400&q=80', 0),
  ('Primitive Water Filtration & Boiling', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 1),
  ('Building a Weatherproof Debris Hut', 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=400&q=80', 2),
  ('Foraging Wild Edibles & Medicinal Herbs', 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80', 3),
  ('Celestial Navigation by Stars & Constellations', 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=400&q=80', 4),
  ('Bushcraft Knot Tying & Timber Lashings', 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80', 5),
  ('Reading Wild Animal Tracks & Trails', 'https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=400&q=80', 6),
  ('Hand-Carved River Spear Fishing', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80', 7),
  ('Emergency Splinting & Trauma First Aid', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 46: What is your ideal rainy afternoon escap...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'What is your ideal rainy afternoon escape indoors?', 'dilemma', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Reading a Thriller Novel with Warm Tea', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80', 0),
  ('Strumming Acoustic Songs by the Window', 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=400&q=80', 1),
  ('Watercolor Painting Botanical Landscapes', 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80', 2),
  ('Simmering a 4-Hour Beef Bourguignon Stew', 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=400&q=80', 3),
  ('Piecing Together a 1,000-Piece Jigsaw Puzzle', 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=400&q=80', 4),
  ('Spinning Vintage Jazz Records on Vinyl', 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=400&q=80', 5),
  ('Knitting an Oversized Chunky Wool Blanket', 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=400&q=80', 6),
  ('Afternoon Nap Lulled by Rolling Thunder', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80', 7),
  ('Creative Journaling & Life Brainstorming', 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 47: Which fantasy RPG class would you choose...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which fantasy RPG class would you choose for your adventure?', 'dilemma', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Stealthy Dual-Dagger Shadow Rogue', 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80', 0),
  ('Elemental Arcane Fire Wizard', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80', 1),
  ('Radiant Holy Paladin Shieldbearer', 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=400&q=80', 2),
  ('Forest Shapeshifting Beast Druid', 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80', 3),
  ('Raging Great-Axe Berserker Barbarian', 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=400&q=80', 4),
  ('Eagle-Eyed Longbow Wilderness Ranger', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80', 5),
  ('Mystic Spirit Summoner / Warlock', 'https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=400&q=80', 6),
  ('Charismatic Lute-Playing Lore Bard', 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=400&q=80', 7),
  ('Way of the Open Hand Martial Monk', 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 48: Which artisanal ice cream flavor combina...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which artisanal ice cream flavor combination is unbeatable?', 'dilemma', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Sea Salt Caramel & Crunchy Pretzel', 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=400&q=80', 0),
  ('70% Dark Chocolate with Flaky Maldon Salt', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80', 1),
  ('Roasted Sicilian Pistachio Gelato', 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=400&q=80', 2),
  ('Fresh Spearmint & Dark Chocolate Flakes', 'https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=400&q=80', 3),
  ('Brown Butter Chocolate Chip Cookie Dough', 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80', 4),
  ('Alphonso Mango & Passionfruit Swirl', 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=400&q=80', 5),
  ('Espresso Bean with English Butter Toffee', 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=400&q=80', 6),
  ('Roasted Balsamic Strawberry Shortcake', 'https://images.unsplash.com/photo-1488900128323-21503983a07e?auto=format&fit=crop&w=400&q=80', 7),
  ('Wild Honey & Lavender with Honeycomb Bits', 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 49: In which city would you love to spend 24...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'In which city would you love to spend 24 hours wandering alone?', 'dilemma', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Kyoto (Ancient Stone Shrines & Bamboo Groves)', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80', 0),
  ('Amsterdam (Canal Bridges & Brick Houses)', 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=400&q=80', 1),
  ('Barcelona (Gothic Quarter & Sunlit Plazas)', 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=400&q=80', 2),
  ('Edinburgh (Old Town Wynds & Volcanic Castle)', 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=400&q=80', 3),
  ('New York City (SoHo Cast Iron & Village Cafés)', 'https://images.unsplash.com/photo-1496868834840-5f4c98840aaa?auto=format&fit=crop&w=400&q=80', 4),
  ('Florence (Renaissance Piazzas & Arno River)', 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=400&q=80', 5),
  ('Prague (Gothic Spires & Charles Bridge)', 'https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=400&q=80', 6),
  ('Vienna (Imperial Grandeur & Classical Coffeehouses)', 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=400&q=80', 7),
  ('Reykjavík (Volcanic Coastlines & Northern Lights)', 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 50: What are you pulling up to order at a 1:...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'What are you pulling up to order at a 1:00 AM drive-thru?', 'dilemma', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Double Bacon Cheeseburger with Secret Sauce', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80', 0),
  ('20-Piece Golden Chicken Nuggets with Sweet & Sour', 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80', 1),
  ('Cheesy Gordita Crunch & Baja Freeze', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=400&q=80', 2),
  ('Warm Apple Hand Pie with Cinnamon Sugar', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80', 3),
  ('Thick Hand-Spun Chocolate Shake', 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80', 4),
  ('Seasoned Crispy Curly Fries Basket', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80', 5),
  ('Animal-Style Grilled Onion Melted Fries', 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80', 6),
  ('Warm Miniature Cinnamon Sugar Donuts', 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=400&q=80', 7),
  ('Ice-Cold Lemonade Iced Slushie', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 51: Which retro video game holds the greates...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which retro video game holds the greatest nostalgic magic?', 'spicy', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Super Mario 64 (Peach’s Castle Painting Jumps)', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80', 0),
  ('The Legend of Zelda: Ocarina of Time', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80', 1),
  ('Pokémon Red / Blue (Pallet Town & Starters)', 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=400&q=80', 2),
  ('Sonic the Hedgehog 2 (Green Hill Loop-de-Loops)', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80', 3),
  ('Street Fighter II (Arcade Joystick Battles)', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80', 4),
  ('Original Game Boy Russian Tetris', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80', 5),
  ('Donkey Kong Country (Jungle Minecart Tracks)', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80', 6),
  ('Final Fantasy VII (Midgar & Cloud Strife)', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80', 7),
  ('GoldenEye 007 (4-Player Split-Screen Facility)', 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 52: Which extreme adventure sport are you ta...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which extreme adventure sport are you tackling first if fear were turned off?', 'spicy', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('15,000ft Tandem Skydiving Freefall', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=80', 0),
  ('Class V Roaring Whitewater Rafting', 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=400&q=80', 1),
  ('Bungee Jump off Canyon Suspension Bridge', 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=400&q=80', 2),
  ('Cage Diving with Pelagic Great White Sharks', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80', 3),
  ('Ice Axe Climbing up a Frozen Alpine Waterfall', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80', 4),
  ('Proximity Wingsuit Gliding Over Peaks', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80', 5),
  ('Formula 1 High-Downforce Hot Lap', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=400&q=80', 6),
  ('Helicopter Drop into Untracked Powder Bowls', 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=400&q=80', 7),
  ('Tow-In Surfing Massive 25ft Ocean Rollers', 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 53: Which fresh bakery treat is impossible t...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which fresh bakery treat is impossible to walk past in the morning?', 'spicy', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Warm Golden Honey Flaky Croissant', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80', 0),
  ('Freshly Glazed Cinnamon Brioche Swirl', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80', 1),
  ('Toasted Almond Frangipane Tart', 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=400&q=80', 2),
  ('Dark Chocolate Swirled Jewish Babka', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80', 3),
  ('Caramelized Brittany Kouign-Amann', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80', 4),
  ('Wild Blueberry Cream Cheese Danish', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80', 5),
  ('Toasted Everything Bagel with Scallion Cream', 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=400&q=80', 6),
  ('Warm Crusty Artisan Sourdough with Sea Salt Butter', 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=400&q=80', 7),
  ('Cardamom Spiced Pistachio Escargot', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 54: If all your bills were paid forever, wha...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'If all your bills were paid forever, what second career would you pursue?', 'spicy', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('National Geographic Wildlife Cinematographer', 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=400&q=80', 0),
  ('Wilderness Ranger in a Glacier National Park', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80', 1),
  ('Artisan Wood-Fired Sourdough Bakery Owner', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80', 2),
  ('Cozy Coastal Bookstore & Coffee Lounge Curator', 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=400&q=80', 3),
  ('Organic Hillside Vineyard Winemaker in Tuscany', 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=400&q=80', 4),
  ('Coral Reef Restoration Scuba Scientist', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80', 5),
  ('Bestselling Murder Mystery Novelist in a Cabin', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80', 6),
  ('Rare Vinyl Record Store Owner & DJ', 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=400&q=80', 7),
  ('Master Carpenter Crafting Heirloom Dining Tables', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 55: Which morning ritual sets the tone for a...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which morning ritual sets the tone for an amazing day?', 'spicy', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('First Uninterrupted Sip of Fresh Pour-Over Coffee', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80', 0),
  ('Steaming Hot High-Pressure 10-Minute Shower', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80', 1),
  ('Stepping Onto the Porch into Crisp Morning Air', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80', 2),
  ('20 Minutes of Book Reading Before Touching Any Screen', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80', 3),
  ('Hot Breakfast of Eggs, Fruit & Avocado Toast', 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80', 4),
  ('Blasting an Upbeat Feel-Good Playlist While Getting Dressed', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80', 5),
  ('Sunrise 5K Jog Through Quiet Neighborhood Streets', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=400&q=80', 6),
  ('Deep Full-Body Stretching & Mindful Yoga', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80', 7),
  ('Extra 15 Minutes of Snuggling with Your Pet in Bed', 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 56: Which theme party would you immediately ...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which theme party would you immediately RSVP “Yes” to?', 'spicy', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('80s Neon Retro Arcade & Synthwave Night', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80', 0),
  ('Vintage 1920s Speakeasy Murder Mystery Gala', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=80', 1),
  ('Tropical Sunset Luau with Tiki Cocktails', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80', 2),
  ('Late 90s / Y2K Pop Culture Throwback Bash', 'https://images.unsplash.com/photo-1496868834840-5f4c98840aaa?auto=format&fit=crop&w=400&q=80', 3),
  ('Casino Royale Black Tie Poker Tournament', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80', 4),
  ('Mad Hatter Whimsical Tea Party & Dessert Bar', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80', 5),
  ('Backyard Bohemian Glow Music Festival', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80', 6),
  ('Post-Apocalyptic Cyberpunk Underground Rave', 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=400&q=80', 7),
  ('Silk Pajamas, Gourmet Cereal & Cartoon Night', 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 57: Which covert spy gadget are you packing ...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which covert spy gadget are you packing on your top-secret mission?', 'spicy', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Laser-Cutting Submariner Watch with Wire Saws', 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=400&q=80', 0),
  ('Micro Titanium Wrist Grappling Hook Gun', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80', 1),
  ('Augmented Reality Contact Lenses with Face Rec', 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=400&q=80', 2),
  ('Sports Car with Ejector Seat & Caltrop Droppers', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80', 3),
  ('Fountain Pen with Concealed Sleeping Darts', 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=400&q=80', 4),
  ('Vocal Cord Modulator Voice Mimic Patch', 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=400&q=80', 5),
  ('Ultra-Light Nanotube Bulletproof Dinner Jacket', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&q=80', 6),
  ('Pocket EMP Jammer That Disables All Nearby Cameras', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80', 7),
  ('Thermal Night-Vision Sunglasses with X-Ray Gaze', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 58: Which artisan cheese is the true star of...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which artisan cheese is the true star of the charcuterie board?', 'spicy', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Triple-Crème French Brie de Meaux', 'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=400&q=80', 0),
  ('Five-Year Extra Sharp English Clothbound Cheddar', 'https://images.unsplash.com/photo-1624806992066-5ffcf7ca186b?auto=format&fit=crop&w=400&q=80', 1),
  ('Black Truffle Infused Creamy Gouda', 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=400&q=80', 2),
  ('Sweet & Tangy Gorgonzola Dolce with Honey', 'https://images.unsplash.com/photo-1634487359989-3e90c9432133?auto=format&fit=crop&w=400&q=80', 3),
  ('Nutty Swiss Cave-Aged Gruyère Premier Cru', 'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=400&q=80', 4),
  ('Spanish Manchego Curado with Quince Paste', 'https://images.unsplash.com/photo-1624806992066-5ffcf7ca186b?auto=format&fit=crop&w=400&q=80', 5),
  ('Silky Pugliese Burrata with Stracciatella Center', 'https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&w=400&q=80', 6),
  ('Smoked Applewood Wisconsin Cheddar', 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=400&q=80', 7),
  ('Crumbly 36-Month Parmigiano-Reggiano Wheels', 'https://images.unsplash.com/photo-1634487359989-3e90c9432133?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 59: Which fortress defense feature would you...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which fortress defense feature would you demand on your medieval castle?', 'spicy', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Deep Crocodile Moat with Weighted Drawbridge', 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=400&q=80', 0),
  ('High Stone Crenellations for Longbow Archers', 'https://images.unsplash.com/photo-1585543805890-6051f7829f98?auto=format&fit=crop&w=400&q=80', 1),
  ('Underground Escape Tunnel Through Mountain Caves', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80', 2),
  ('Machicolation Holes Dropping Burning Pitch & Boulders', 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=400&q=80', 3),
  ('Triple Heavy Iron Portcullis Defense Gates', 'https://images.unsplash.com/photo-1585543805890-6051f7829f98?auto=format&fit=crop&w=400&q=80', 4),
  ('Twin Octagonal Fortress Gatehouse Guard Towers', 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=400&q=80', 5),
  ('Clockwise Spiral Staircases Handicapping Attackers', 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=400&q=80', 6),
  ('Slit Arrow Loops with 360-Degree Valley Views', 'https://images.unsplash.com/photo-1585543805890-6051f7829f98?auto=format&fit=crop&w=400&q=80', 7),
  ('Massive Rooftop Trebuchet Siege Engine', 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 60: Which steaming bowl of soup heals your s...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which steaming bowl of soup heals your soul on a freezing winter night?', 'spicy', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('French Onion Soup with Broiled Gruyère Crust', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=400&q=80', 0),
  ('Creamy Roasted Tomato Bisque with Grilled Cheese', 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=400&q=80', 1),
  ('Slow-Simmered Vietnamese Beef Phở with Fresh Herbs', 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=400&q=80', 2),
  ('Spicy Hungarian Beef Goulash with Potatoes & Paprika', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=400&q=80', 3),
  ('New England Clam Chowder in Sourdough Bread Bowl', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=400&q=80', 4),
  ('Fragrant Thai Tom Yum Goong with Lemongrass & Prawns', 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=400&q=80', 5),
  ('Hearty Tuscan Minestrone with Kale & Pesto', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=400&q=80', 6),
  ('Rich Tonkotsu Pork Bone Miso Ramen with Chashu', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80', 7),
  ('Velvety Roasted Butternut Squash Soup with Pumpkin Seeds', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 61: Which animated universe would you move i...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which animated universe would you move into tomorrow if you could?', 'spicy', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Bikini Bottom with SpongeBob & Patrick', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80', 0),
  ('Springfield (742 Evergreen Terrace & Moe’s)', 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=400&q=80', 1),
  ('Gravity Falls & the Mystery Shack Forests', 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80', 2),
  ('Avatar: Four Elemental Nations (Air Temples)', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80', 3),
  ('Land of Ooo with Finn and Jake', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80', 4),
  ('Pokémon Kanto Region (Pallet to Indigo Plateau)', 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=400&q=80', 5),
  ('Duckburg with Scrooge McDuck’s Money Bin', 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=400&q=80', 6),
  ('Studio Ghibli Bathhouse & Grassy Meadows', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80', 7),
  ('Phineas & Ferb’s 104 Days of Summer Backyard', 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 62: If you had to drink one beverage with ev...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'If you had to drink one beverage with every meal for life, what is it?', 'spicy', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Ice-Cold Pure Mountain Glacier Spring Water', 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80', 0),
  ('Fresh Squeezed Valencia Orange Juice with Pulp', 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=400&q=80', 1),
  ('Crisp Sun-Brewed Iced Tea with Fresh Lemon', 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80', 2),
  ('Cane Sugar Mexican Coca-Cola in Glass Bottles', 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=400&q=80', 3),
  ('Sparkling San Pellegrino with a Lime Wedge', 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80', 4),
  ('Chilled Japanese Sencha Green Tea', 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80', 5),
  ('Ice-Cold Tender Coconut Water Straight from Shell', 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=400&q=80', 6),
  ('Creamy Whole Farm Chocolate Milk', 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80', 7),
  ('Cold Pressed Crisp Orchard Apple Cider', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 63: Which campfire cooking feast tastes best...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which campfire cooking feast tastes best under the open stars?', 'spicy', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Wild River Salmon Smoked on Cedar Planks', 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80', 0),
  ('Seared Bone-In Ribeye Directly on Hardwood Coals', 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=400&q=80', 1),
  ('Cast Iron Peach & Blackberry Crumble Cobbler', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80', 2),
  ('Double Toasted Golden Marshmallow Hershey S’mores', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=400&q=80', 3),
  ('Foil Packet Buttered Garlic Potatoes & Smoked Sausage', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80', 4),
  ('Dutch Oven Red Wine Braised Short Ribs', 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=400&q=80', 5),
  ('Skewered Halloumi Cheese, Peppers & Cherry Tomatoes', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80', 6),
  ('Crispy Cast Iron Skillet Cheese & Chorizo Quesadilla', 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=400&q=80', 7),
  ('Traditional Campfire Skillet Bannock Bread with Honey', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 64: Which absurd event should be added to th...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which absurd event should be added to the Olympic Games immediately?', 'spicy', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Synchronized Office Swivel Chair Racing', 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=400&q=80', 0),
  ('Extreme Olympic Forest Hide and Seek Tournament', 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80', 1),
  ('High-Flyer Trampoline Wall Dodgeball', 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=400&q=80', 2),
  ('High-Pressure Tight Parallel Parking Sprint', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80', 3),
  ('Downhill Giant Foam Mattress Sledding', 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=400&q=80', 4),
  ('Synchronized Swimming in Three-Piece Suits', 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=400&q=80', 5),
  ('Championship Feather Pillow Fight in an Octagon', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80', 6),
  ('100-Meter Tall Oak Tree Free-Climbing Sprint', 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80', 7),
  ('Human Obstacle Agility Course with Dog Handlers', 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 65: Which dog breed is your ride-or-die loya...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which dog breed is your ride-or-die loyal best friend?', 'spicy', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Eternally Smiling Golden Retriever', 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80', 0),
  ('Noble Protective German Shepherd', 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=400&q=80', 1),
  ('Short-Legged Energetic Welsh Corgi', 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=400&q=80', 2),
  ('Vocal Blue-Eyed Siberian Husky', 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=400&q=80', 3),
  ('Classic Friendly Yellow Labrador', 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80', 4),
  ('Merle Coat Australian Shepherd', 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&w=400&q=80', 5),
  ('Bat-Eared Playful French Bulldog', 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80', 6),
  ('Giant White Fluffy Cloud Samoyed', 'https://images.unsplash.com/photo-1529429617124-95b109e86bb8?auto=format&fit=crop&w=400&q=80', 7),
  ('Ultra-Athletic Clever Border Collie', 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 66: Which rare find in a vintage flea market...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which rare find in a vintage flea market would you buy instantly?', 'spicy', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Working 1970s Leather-Trim Polaroid SX-70', 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80', 0),
  ('Heirloom Solid Brass Maritime Sundial Compass', 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=80', 1),
  ('Original Danish Teak Lounge Armchair', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80', 2),
  ('Sealed First-Pressing Pink Floyd Dark Side Vinyl', 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=400&q=80', 3),
  ('Weighted Hand-Carved Rosewood & Maple Chess Set', 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=400&q=80', 4),
  ('Distressed 1940s Shearling Leather Aviator Jacket', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&q=80', 5),
  ('Glowing Vintage 1950s Glass Neon Diner Sign', 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=80', 6),
  ('1800s Skeleton Mechanical Pocket Watch', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80', 7),
  ('Framed 17th Century Celestial Star Chart Engraving', 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 67: Which sci-fi starship would you pilot on...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which sci-fi starship would you pilot on an interstellar voyage?', 'spicy', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Millennium Falcon (Fastest Hunk of Junk in Galaxy)', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80', 0),
  ('USS Enterprise NCC-1701-D (Galaxy Class Bridge)', 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=400&q=80', 1),
  ('Serenity (Firefly Transport Ship with Cozy Mess)', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 2),
  ('SSV Normandy SR-2 (Stealth Frigate & EDI)', 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=400&q=80', 3),
  ('Battlestar Galactica (Heavy Armor Colonial Fleet)', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80', 4),
  ('Swordfish II Monoracer from Cowboy Bebop', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80', 5),
  ('The TARDIS (Bigger on the Inside Time Machine)', 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=400&q=80', 6),
  ('The Razor Crest (Mandalorian Gunship & Carbonite)', 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=400&q=80', 7),
  ('Planet Express Delivery Ship (Dark Matter Powered)', 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 68: Which pasta shape holds sauce with the h...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which pasta shape holds sauce with the highest culinary perfection?', 'spicy', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Rigatoni with Deep Grooves for Rich Ragu', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80', 0),
  ('Wide Silky Ribbons of Fresh Egg Pappardelle', 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80', 1),
  ('Tender Pillowy Potato Gnocchi in Gorgonzola', 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80', 2),
  ('Twisted Spirals of Cavatappi / Gemelli', 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=400&q=80', 3),
  ('Jumbo Spinach & Ricotta Stuffed Ravioli', 'https://images.unsplash.com/photo-1587740908075-9e245070dfaa?auto=format&fit=crop&w=400&q=80', 4),
  ('Bronze-Cut Classic Twirling Spaghetti alla Chitarra', 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?auto=format&fit=crop&w=400&q=80', 5),
  ('Pugliese Orecchiette Little Ears with Sausage & Broccoli Rabe', 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=400&q=80', 6),
  ('Farfalle Bowties with Cream & Sweet Peas', 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=400&q=80', 7),
  ('Thick Hollow Bucatini Slurping Cacio e Pepe', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 69: Which music genre creates the absolute b...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which music genre creates the absolute best late-night drive mood?', 'spicy', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Retro 80s Synthwave & Neon Electronic Night-Call', 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=400&q=80', 0),
  ('Raw 90s Alternative Rock & Grunge Anthems', 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=400&q=80', 1),
  ('Smooth 2000s R&B Slow Jams with Deep Bass', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80', 2),
  ('Cozy Lo-Fi Hip Hop Beats & Rain Ambience', 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=400&q=80', 3),
  ('Epic Cinematic Film Scores by Hans Zimmer', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80', 4),
  ('Smooth 70s California Yacht Rock & Harmonies', 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=400&q=80', 5),
  ('Atmospheric Dream Pop & Echoing Reverb Guitars', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80', 6),
  ('Indie Road Trip Anthems with Shouting Choruses', 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80', 7),
  ('Late-Night Noir Cool Jazz & Muted Trumpet', 'https://images.unsplash.com/photo-1525994886773-080587e161c2?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 70: Which steaming cup of tea warms you up t...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which steaming cup of tea warms you up the best?', 'spicy', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Whole Chamomile Flowers with Lavender & Honey', 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=400&q=80', 0),
  ('Fragrant High Mountain Jasmine Dragon Pearls', 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80', 1),
  ('Simmered Masala Chai with Ginger, Cardamom & Milk', 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80', 2),
  ('Japanese Genmaicha with Roasted Brown Rice', 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=400&q=80', 3),
  ('Moroccan Mint Green Tea Poured from High Spout', 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80', 4),
  ('Smoky Bergamot British Earl Grey with Cream', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80', 5),
  ('Crimson Hibiscus Flower Herbal Infusion', 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=400&q=80', 6),
  ('Nutty Vanilla South African Red Bush Rooibos', 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80', 7),
  ('Aged Vintage Yunnan Earthy Dark Pu-erh', 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 71: Where is your ultimate secret hideout lo...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Where is your ultimate secret hideout located?', 'spicy', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Ancient Redwood Multi-Story Treehouse', 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80', 0),
  ('Hidden Sea Cave Accessible Only at Low Tide', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80', 1),
  ('Decommissioned Subway Station with Retro Train Cars', 'https://images.unsplash.com/photo-1496868834840-5f4c98840aaa?auto=format&fit=crop&w=400&q=80', 2),
  ('Isolated Alpine Fire Lookout Tower on a Peak', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80', 3),
  ('Storm-Battered Lighthouse on a Rocky Islet', 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=400&q=80', 4),
  ('Hidden Attic Loft Above a Bustling Parisian Bakery', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80', 5),
  ('Submerged Glass Capsule in a Tropical Coral Lagoon', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80', 6),
  ('Camouflaged Log Cabin in Dense Scandinavian Pines', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=400&q=80', 7),
  ('Desert Canyon Oasis with a Hidden Palm Spring', 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 72: Which fresh fruit is undeniably the king...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which fresh fruit is undeniably the king of flavor?', 'spicy', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Sun-Ripened Alphonso Mango with Floral Honey Aroma', 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80', 0),
  ('Ice-Cold Crisp Honeycrisp Apple', 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=400&q=80', 1),
  ('Wild Mountain Blackberries Picked from Brambles', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80', 2),
  ('Japanese White Peach (Juice Running Down Your Wrist)', 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=400&q=80', 3),
  ('Sweet Golden Sugarloaf Pineapple Slice', 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=400&q=80', 4),
  ('Chilled Crisp Wedge of Crimson Watermelon', 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80', 5),
  ('Sweet Dark Bing Cherries with Green Stems', 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=400&q=80', 6),
  ('Creamy Ripe Hass Avocado with Sea Salt', 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=400&q=80', 7),
  ('Tart Tropical Passionfruit Scooped with a Spoon', 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 73: Which worldwide festival would you fly a...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which worldwide festival would you fly across continents to experience?', 'spicy', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Rio de Janeiro Samba Carnival Parade', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80', 0),
  ('Tomorrowland Electronic Fairytale Stage in Belgium', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80', 1),
  ('Venice Masked Grand Ball along the Canals', 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=400&q=80', 2),
  ('Día de los Muertos Altars & Marigolds in Oaxaca', 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=400&q=80', 3),
  ('Pingxi Sky Lantern Festival Glowing into Night', 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=400&q=80', 4),
  ('Glastonbury Pyramid Stage Camping Festival', 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=400&q=80', 5),
  ('Munich Oktoberfest Giant Pretzel & Beer Halls', 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=400&q=80', 6),
  ('Burning Man Kinetic Art in Black Rock Desert', 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80', 7),
  ('Kyoto Gion Matsuri Giant Lantern Wooden Floats', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 74: Where would you build your supervillain ...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Where would you build your supervillain mountain lair?', 'spicy', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Hollowed-Out Inactive Island Volcano with Retractable Dome', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 0),
  ('Submerged Arctic Base Beneath Heavy Blue Glacial Ice', 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=400&q=80', 1),
  ('Decommissioned Orbital Space Station Looking at Earth', 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=400&q=80', 2),
  ('Neo-Gothic Skyscraper Penthouse in Midnight Storms', 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80', 3),
  ('Perched Castle on an Inaccessible Sea Cliff in Scotland', 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=400&q=80', 4),
  ('Underground Saharan Silo Hidden Beneath Shifting Dunes', 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80', 5),
  ('Ultra-Stealth Superyacht with Submersible Mini-Sub', 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=400&q=80', 6),
  ('Overgrown Ancient Mayan Pyramid with Satellite Dishes', 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80', 7),
  ('Deep Ocean Hydrothermal Vent Research Station', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 75: Which dip is absolutely mandatory on the...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which dip is absolutely mandatory on the warm tortilla chip table?', 'spicy', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Chunky Fresh Guacamole with Lime, Cilantro & Sea Salt', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=400&q=80', 0),
  ('Fire-Roasted Salsa Roja with Charred Jalapeños', 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=400&q=80', 1),
  ('Velvety Warm Tex-Mex Queso Blanco with Green Chiles', 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=400&q=80', 2),
  ('Tangy Charred Tomatillo Salsa Verde', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=400&q=80', 3),
  ('Black Bean & Sweet Roasted Corn Fiesta Dip', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80', 4),
  ('Baked Warm Creamy Spinach & Artichoke Dip', 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=400&q=80', 5),
  ('Sweet & Fiery Habanero Mango Pico de Gallo', 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80', 6),
  ('Zesty Creamy Jalapeño Ranch Dip', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80', 7),
  ('Warm Layered Refried Beans with Melted Monterey Jack', 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 76: If you were transported to an iconic dec...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'If you were transported to an iconic decade for one year, which do you pick?', 'hypothetical', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('1920s: Roaring Jazz Age, Speakeasies & Art Deco Glamour', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=80', 0),
  ('1950s: Neon Drive-Ins, Classic Chrome Cars & Early Rock', 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=80', 1),
  ('1960s: Swinging London, Abbey Road & Summer of Love', 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=400&q=80', 2),
  ('1970s: Studio 54 Glitter Disco & Legendary Stadium Rock', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80', 3),
  ('1980s: Synthwave Beats, Mall Culture & Arcade Goldmines', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80', 4),
  ('1990s: Grunge Flannel, Hip-Hop Golden Age & Retro Gaming', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80', 5),
  ('Early 2000s: Y2K Cyber Trends, Flip Phones & Pop Royalty', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80', 6),
  ('1940s: Big Band Swing, Victory Rolls & Classic Cinema', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&q=80', 7),
  ('1890s: Belle Époque Paris World’s Fair & Impressionism', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 77: Which sweet pie coming fresh out of the ...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which sweet pie coming fresh out of the oven smells the absolute best?', 'hypothetical', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Bubbling Cinnamon Apple Pie with Flaky Butter Lattice', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80', 0),
  ('Toasted Southern Bourbon Pecan Pie', 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=400&q=80', 1),
  ('Zesty Florida Key Lime Pie with Graham Cracker Crust', 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=400&q=80', 2),
  ('Sweet-Tart Michigan Sour Cherry Pie with Sugar Dusting', 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=400&q=80', 3),
  ('Wild Mountain Blueberry Pie with Violet Juices', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80', 4),
  ('Decadent French Silk Dark Chocolate Pie with Whipped Cream', 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=400&q=80', 5),
  ('Classic Autumn Spiced Pumpkin Pie with Nutmeg', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80', 6),
  ('Warm Brown Sugar Georgia Peach Cobbler Pie', 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=400&q=80', 7),
  ('Caramel Banana Cream Pie with White Chocolate Curls', 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 78: Which primitive bushcraft shelter would ...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which primitive bushcraft shelter would you feel most confident sleeping in?', 'hypothetical', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Insulated A-Frame Timber Debris Hut', 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=400&q=80', 0),
  ('Semi-Submerged Underground Earth Dugout Shelter', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80', 1),
  ('Elevated Bamboo Platform Above the Jungle Floor', 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80', 2),
  ('Pine Bough Lean-To with Stone Fire Wall Reflector', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=400&q=80', 3),
  ('Carved Snow Quinzee Dome with Candle Chimney', 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=400&q=80', 4),
  ('Domed Birchbark Native American Wigwam', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80', 5),
  ('Bivouac Under a Natural Granite Rock Overhang', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 6),
  ('Suspended Waterproof Paracord Jungle Hammock', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80', 7),
  ('Turf-Roofed Scottish Highland Stone Bothy', 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 79: Which alien-like deep ocean creature wou...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which alien-like deep ocean creature would you want to observe safely in a sub?', 'hypothetical', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Giant Bioluminescent Phantom Jellyfish with 30ft Arms', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80', 0),
  ('Massive Colossal Squid in the Abyssal Twilight Zone', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80', 1),
  ('Ancient 400-Year-Old Slow-Moving Greenland Shark', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80', 2),
  ('Deep Sea Pelican Gulper Eel with Hinged Balloon Jaws', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80', 3),
  ('Ear-Flapping Miniature Dumbo Octopus Floating in Blue', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80', 4),
  ('Armored Giant Sea Isopod Scavenging on Ocean Floor', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80', 5),
  ('Pitch-Black Anglerfish with Glowing Head Light Bait', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80', 6),
  ('Barreleye Fish with Transparent Glowing Domed Head', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80', 7),
  ('Vampire Squid Inverting Its Spiked Cape into a Sphere', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 80: Which dream job on a Hollywood blockbust...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which dream job on a Hollywood blockbuster film set would you take?', 'hypothetical', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Practical Special Effects & Explosions Supervisor', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&q=80', 0),
  ('Martial Arts Stunt Coordinator & Fight Choreographer', 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=400&q=80', 1),
  ('Original Film Score Composer Conducting 90-Piece Orchestra', 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=400&q=80', 2),
  ('Sci-Fi Concept Artist Designing Aliens & Starships', 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80', 3),
  ('Master Weaponsmith & Prop Fabricator Crafting Swords', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80', 4),
  ('Global Location Scout Flying to Uncharted Landscapes', 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=400&q=80', 5),
  ('Lead Cinematographer Operating 70mm IMAX Cameras', 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=400&q=80', 6),
  ('Sound Designer Inventing Monster Roars & Sci-Fi Lasers', 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=400&q=80', 7),
  ('Head Costume Designer for Epic Period & Fantasy Wardrobes', 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 81: Which global noodle dish is the ultimate...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which global noodle dish is the ultimate bowl of pure comfort?', 'hypothetical', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Rich Tokyo Tonkotsu Ramen with Melted Chashu & Soft Egg', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80', 0),
  ('Sizzling Bangkok Pad Thai with Tamarind, Crushed Peanuts & Lime', 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=400&q=80', 1),
  ('Fragrant Saigon Beef Phở with Star Anise & Fresh Basil', 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=400&q=80', 2),
  ('Silky Italian Tagliatelle al Tartufo with Shaved Black Truffle', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80', 3),
  ('Fiery Sichuan Dan Dan Noodles with Chili Oil & Minced Pork', 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=400&q=80', 4),
  ('Creamy Singapore Coconut Curry Laksa with Prawns', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80', 5),
  ('Korean Spicy Seafood Jjamppong Noodle Soup', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80', 6),
  ('Hand-Pulled Lanzhou Beef Noodles with Radish & Cilantro', 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=400&q=80', 7),
  ('Thick Chewy Japanese Udon in Dashi Broth with Crispy Tempura', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 82: Where is your dream scenic outdoor picni...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Where is your dream scenic outdoor picnic blanket spread?', 'hypothetical', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Grassy Cliff Hilltop Overlooking Crashing Azure Waves', 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=400&q=80', 0),
  ('Cherry Blossom Orchard in Kyoto with Falling Petals', 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=400&q=80', 1),
  ('Sun-Drenched Lavender Meadow in Rolling Provence', 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=400&q=80', 2),
  ('Soft Powder White Sand Beach at Warm Golden Hour', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80', 3),
  ('Misty Mountain Waterfall Clearing Surrounded by Ferns', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80', 4),
  ('Shaded English Country Lawn Under Ancient 300-Year Oaks', 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80', 5),
  ('Lush Rooftop Botanical Garden Overlooking City Lights', 'https://images.unsplash.com/photo-1530629013299-6cb10d168419?auto=format&fit=crop&w=400&q=80', 6),
  ('Wildflower Alpine Valley beside a Mirror Glacier Lake', 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=400&q=80', 7),
  ('Secluded Palm Tree Oasis Canyon in the Desert at Dusk', 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 83: On which retro arcade cabinet would you ...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'On which retro arcade cabinet would you fight to keep the high score?', 'hypothetical', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('1980 Original Yellow Cabinet Pac-Man', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80', 0),
  ('Galaga Space Fighter Dual-Tractor Beam Battles', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80', 1),
  ('Donkey Kong Jumpman Rolling Barrel Ladders', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80', 2),
  ('Street Fighter II: Champion Edition 2-Player Cabinet', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80', 3),
  ('Teenage Mutant Ninja Turtles 4-Player Co-op Arcade', 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=400&q=80', 4),
  ('Mortal Kombat II Blood & Fatality Cabinet', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80', 5),
  ('Time Crisis Recoil Light-Gun with Foot Pedal', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80', 6),
  ('Dance Dance Revolution Extreme Stage with Metal Bars', 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=400&q=80', 7),
  ('Sega OutRun Moving Hydraulic Ferrari Cabriolet', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 84: Which ambient sound puts you to sleep in...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which ambient sound puts you to sleep in under five minutes?', 'hypothetical', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Heavy Rainstorm Lashing Against Bedroom Windows', 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=400&q=80', 0),
  ('Gentle Low Ocean Waves Lapping a Pebble Shore', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80', 1),
  ('Crackling Birch Logs in a Stone Fireplace Hearth', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=400&q=80', 2),
  ('Distant Low Thunder Rolling Across Night Valleys', 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80', 3),
  ('Soft Mountain Wind Whispering Through Tall Pine Needles', 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80', 4),
  ('Rhythmic Sleeper Train Wheels Clacking Down Midnight Tracks', 'https://images.unsplash.com/photo-1563941402622-4e7a488bcc57?auto=format&fit=crop&w=400&q=80', 5),
  ('Cold Mountain Brook Babbling Over Smooth River Stones', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 6),
  ('Warm Summer Evening Crickets & Cicadas in a Meadow', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80', 7),
  ('Steady Low Hum of a Bedroom Fan in a Cool Dark Room', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 85: Which artisan donut flavor is worth brea...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which artisan donut flavor is worth breaking every dietary rule for?', 'hypothetical', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Brown Butter & Fleur de Sel Caramel Glaze', 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=400&q=80', 0),
  ('Boston Cream with Real Tahitian Vanilla Custard', 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80', 1),
  ('Warm Sugar-Dusted Donut Filled with Wild Raspberry Jam', 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=400&q=80', 2),
  ('Crispy Fluted French Cruller with Honey Glaze', 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80', 3),
  ('Cinnamon Sugar Spiced Orchard Apple Cider Cake Donut', 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=400&q=80', 4),
  ('72% Dark Chocolate Ganache with Roasted Cacao Nibs', 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80', 5),
  ('Vermont Maple Glaze Topped with Thick Crispy Smoked Bacon', 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=400&q=80', 6),
  ('Meyer Lemon Curd Filled with Torched Italian Meringue', 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80', 7),
  ('Chewy Kyoto Matcha Green Tea Glazed Pon-de-Ring Mochi Donut', 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 86: What single feature makes a snowbound wi...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'What single feature makes a snowbound winter cabin unforgettable?', 'hypothetical', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Steaming Outdoor Cedar Hot Tub Surrounded by 3 Feet of Snow', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80', 0),
  ('Massive River-Rock Fireplace with Roaring Hardwood Fire', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=400&q=80', 1),
  ('Thick Heavy Cashmere Blankets on Every Armchair', 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=400&q=80', 2),
  ('Endless Simmering Pot of Spiced Orange Mulled Wine', 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80', 3),
  ('Hand-Knitted Chunky Wool Socks and Sheepskin Slippers', 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80', 4),
  ('Floor-to-Ceiling Bookshelf Loaded with Classic Whodunits', 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=400&q=80', 5),
  ('Vintage Wood Table Full of Strategy Board Games & Cards', 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=400&q=80', 6),
  ('Dutch Oven Beef Bourguignon Simmering All Afternoon', 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=400&q=80', 7),
  ('Loft Bed with Heavy Goose Down Duvet Looking at Falling Snow', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 87: Which mythical artifact from folklore wo...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which mythical artifact from folklore would you keep in a safe?', 'hypothetical', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Ring of Gyges (Turns the Wearer Completely Invisible)', 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80', 0),
  ('Sentient Cloak of Levitation (Flies You Effortlessly Anywhere)', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80', 1),
  ('Philosopher’s Stone (Transforms Base Metals to 24k Gold)', 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80', 2),
  ('Bottomless Bag of Holding (Stores Infinite Objects Weightlessly)', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80', 3),
  ('Mirror of Truth (Reveals Anyone’s True Thoughts and Intentions)', 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80', 4),
  ('Excalibur (Unbreakable Blade of Victory and Leadership)', 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=400&q=80', 5),
  ('Seven-League Boots (Crosses 21 Miles in a Single Stride)', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80', 6),
  ('Chalice of Vitality (Instantly Cures Any Illness or Fatigue)', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80', 7),
  ('All-Seeing Crystal Orb (Shows Any Place on Earth in Real Time)', 'https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 88: Which potato preparation is the supreme ...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which potato preparation is the supreme crowning glory of carbohydrates?', 'hypothetical', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Triple-Cooked Belgian Fries Sizzled to Glass-Like Crunch', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80', 0),
  ('Silky French Robuchon Pommes Purée (50% Butter by Weight)', 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=400&q=80', 1),
  ('Golden Butter-Basted Crispy Diner Hash Browns', 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80', 2),
  ('Giant Baked Russet Potato Loaded with Sour Cream, Bacon & Chives', 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80', 3),
  ('Crispy Spanish Patatas Bravas with Smoked Paprika & Garlic Aioli', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80', 4),
  ('Creamy Thin-Sliced Scalloped Potatoes Dauphinoise with Gruyère', 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=400&q=80', 5),
  ('Crispy Fried Spiced Potato Samosa with Mint Chutney', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80', 6),
  ('Crispy Cast-Iron Smashed Baby Potatoes with Rosemary & Sea Salt', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80', 7),
  ('Basket of Golden Crispy Tater Tots Dipped in Cheese Sauce', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 89: Which magnificent creature would you rid...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which magnificent creature would you ride into an epic fantasy battle?', 'hypothetical', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Armored Svalbard Polar Bear with Plate Armor', 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=400&q=80', 0),
  ('Regal Golden-Feathered Hippogriff Soaring Across Peaks', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80', 1),
  ('Giant Midnight Shadow Direwolf Running at 50 mph', 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80', 2),
  ('Sacred Kirin Striding Across Clouds and Wind', 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80', 3),
  ('Prehistoric Saber-Toothed Cat with 10-Inch Fangs', 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=400&q=80', 4),
  ('Towering Great Horned Irish Elk with 12ft Antlers', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80', 5),
  ('Eastern Celestial Dragon Coiling Through Storm Clouds', 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80', 6),
  ('Four-Tusked War Elephant with a Fortified Archer Howdah', 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=400&q=80', 7),
  ('Swift-Running Giant Yellow Chocobo with Saddles', 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 90: Which gourmet salad topping elevates a b...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which gourmet salad topping elevates a boring bowl into a masterpiece?', 'hypothetical', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Fresh Sliced Hass Avocado with Flaky Sea Salt & Olive Oil', 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=400&q=80', 0),
  ('Warm Breaded Crispy Goat Cheese Medallions', 'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=400&q=80', 1),
  ('Spicy Candied Cinnamon Pecans & Walnuts', 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=400&q=80', 2),
  ('Paper-Thin Shavings of Fresh Black Truffle', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80', 3),
  ('Garlic Butter Sourdough Brioche Croutons', 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=400&q=80', 4),
  ('Crispy Baked Prosciutto di Parma Crisps', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80', 5),
  ('Tangy Pickled Red Onions & Shallots in Red Wine Vinegar', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80', 6),
  ('Fire-Charred Sweet Summer Corn Cut Straight from Cob', 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=400&q=80', 7),
  ('Authentic Crumbled Barrel-Aged Greek Sheep Feta', 'https://images.unsplash.com/photo-1624806992066-5ffcf7ca186b?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 91: Which board game mechanic makes games ir...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which board game mechanic makes games irresistibly strategic and addictive?', 'hypothetical', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Tight Worker Placement with Blocking', 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=400&q=80', 0),
  ('Engine & Deck Building Synergies', 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=400&q=80', 1),
  ('Hidden Traitor & Social Deduction Bluffs', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=400&q=80', 2),
  ('Carcassonne-Style Tile Placement & City Building', 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=400&q=80', 3),
  ('Area Control & Military Troop Maneuvers', 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=80', 4),
  ('Cooperative Race Against an Outbreak Clock', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80', 5),
  ('Push-Your-Luck High Stakes Dice Rolling', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80', 6),
  ('Simultaneous Blind Action Selection', 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80', 7),
  ('High-Drama Resource Trading & Pacts', 'https://images.unsplash.com/photo-1563941402622-4e7a488bcc57?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 92: Which street food skewer off the charcoa...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which street food skewer off the charcoal grill is perfection on a stick?', 'hypothetical', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Japanese Chicken Yakitori with Sweet Tare Glaze & Scallions', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80', 0),
  ('Greek Pork Souvlaki with Lemon, Oregano & Tzatziki', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80', 1),
  ('Malaysian Chicken Satay with Spicy Roasted Peanut Sauce', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80', 2),
  ('Argentinian Flank Steak Churrasco with Herb Chimichurri', 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=400&q=80', 3),
  ('Middle Eastern Minced Lamb Kofta Kebab with Sumac', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80', 4),
  ('Lebanese Shish Taouk with Creamy Garlic Toum Sauce', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80', 5),
  ('Beijing Charcoal Cumin & Red Chili Powder Lamb Chuanr', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80', 6),
  ('Sweet Soy Glazed Teriyaki Beef & Sweet Onion Skewer', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80', 7),
  ('Grilled Cypriot Halloumi, Zucchini & Sweet Pepper Skewer', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 93: Which dream outdoor garden feature would...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which dream outdoor garden feature would you insist on building?', 'hypothetical', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Winding Natural Stone Brook with Koi Pond & Water Lilies', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 0),
  ('Wrought-Iron Victorian Glass Conservatory Greenhouse', 'https://images.unsplash.com/photo-1530629013299-6cb10d168419?auto=format&fit=crop&w=400&q=80', 1),
  ('Fragrant Wooden Pergola Covered in Purple Wisteria & Jasmine', 'https://images.unsplash.com/photo-1585543805890-6051f7829f98?auto=format&fit=crop&w=400&q=80', 2),
  ('Sunken Flagstone Fire Pit Surrounded by Curved Cedar Benches', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=400&q=80', 3),
  ('Heritage Fruit Orchard with Blooming Apple & Peach Trees', 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=400&q=80', 4),
  ('Quiet Japanese Moss Garden with Bamboo Water Shishi-Odoshi', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80', 5),
  ('Outdoor Wood-Fired Pizza Kitchen Under a Grapevine Trellis', 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=80', 6),
  ('Old-Fashioned English Walled Rose Garden with Brick Paths', 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80', 7),
  ('Mirror-Surface Infinity Reflection Pool Facing Mountain Forests', 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 94: Which chocolate bar combination is true ...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which chocolate bar combination is true confectionery genius?', 'hypothetical', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('72% Dark Chocolate with Maldon Sea Salt & Roasted Almonds', 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=400&q=80', 0),
  ('Creamy Milk Chocolate with Honeycomb Toffee Shards', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80', 1),
  ('Single-Origin 85% Madagascar Dark Chocolate with Citrus Notes', 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=400&q=80', 2),
  ('Bittersweet Dark Chocolate with Candied Blood Orange Peel', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80', 3),
  ('Velvety White Chocolate with Roasted Pistachios & Dried Raspberries', 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=400&q=80', 4),
  ('Piedmont Milk Chocolate Gianduja with Whipped Hazelnuts', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80', 5),
  ('Dark Chocolate Infused with Smoked Ancho Chili & Cinnamon', 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=400&q=80', 6),
  ('Dark Chocolate Shell with Liquid Salted Butter Caramel Core', 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=400&q=80', 7),
  ('Matcha Green Tea White Chocolate with Puffed Toasted Rice', 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 95: Which thrilling lake activity is the hig...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which thrilling lake activity is the highlight of a sunny summer day?', 'hypothetical', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Peaceful Sunrise Stand-Up Paddleboard on Glassy Water', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80', 0),
  ('Carving Slalom Cuts on Waterskis Across an Empty Bay', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80', 1),
  ('Riding the Infinite Endless Wave While Wakesurfing', 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=400&q=80', 2),
  ('High-Speed Jet Ski Accelerations Across Choppy Open Water', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80', 3),
  ('Exploring Reedy Islands & Secret Inlets in a Sea Kayak', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 4),
  ('Hanging on for Dear Life on a 3-Person Speed Tubing Ride', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80', 5),
  ('Leaping off a 35ft Natural Granite Cliff into Deep Blue Water', 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=400&q=80', 6),
  ('Skimming Fast Across the Waves on a Twin-Hull Hobie Cat', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80', 7),
  ('Diving with Mask & Snorkel down to a Sunken Shipwreck', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 96: Which dream desk view would boost your c...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which dream desk view would boost your creativity to astronomical levels?', 'hypothetical', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Panoramic Manhattan Skyline Looking Over the Empire State', 'https://images.unsplash.com/photo-1496868834840-5f4c98840aaa?auto=format&fit=crop&w=400&q=80', 0),
  ('Jagged Snow-Capped Swiss Alps Rising Through Soft Morning Clouds', 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=400&q=80', 1),
  ('Turquoise Ocean Waves Crashing on White Sand 50 Feet Away', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80', 2),
  ('Peaceful Japanese Courtyard Garden with Raked Sand & Moss', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80', 3),
  ('Dramatic Pine Forest Canyon with Morning Mist Rising Below', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80', 4),
  ('Classic Parisian Boulevard Balcony with Tree-Lined Stone Mansions', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80', 5),
  ('Golden Gate Bridge Peeking Through Rolling Pacific Fog', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 6),
  ('Endless Rolling Green Tuscan Hills Studded with Italian Cypresses', 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=400&q=80', 7),
  ('Fiery Orange African Savannah Sunset with Silhouetted Acacia Trees', 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 97: Which barbecue staple is the true undisp...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which barbecue staple is the true undisputed masterpiece of the smoke pit?', 'hypothetical', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('16-Hour Smoked Texas Beef Brisket with Peppery Black Bark', 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=400&q=80', 0),
  ('Fall-Off-The-Bone Kansas City Pork Ribs with Sweet Glaze', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80', 1),
  ('Pulled Hickory Pork Shoulder with Tangy Carolina Cider Vinegar', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80', 2),
  ('Smoked Dino Beef Plate Rib with Marbled Melt-in-Your-Mouth Center', 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=400&q=80', 3),
  ('Crispy Pit-Smoked Chicken Wings Tossed in Alabama White Sauce', 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80', 4),
  ('Snappy Housemade Smoked Jalapeño & Cheddar Beef Sausage Links', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80', 5),
  ('Santa Maria Oak-Grilled Tri-Tip with Fresh Tomato Pico', 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=400&q=80', 6),
  ('Dry-Rubbed Memphis Baby Back Ribs with Apple Cider Spritz', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80', 7),
  ('Glazed Caramelized Smoked Pork Belly Burnt Ends (Meat Candy)', 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 98: Which sci-fi innovation would improve da...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which sci-fi innovation would improve daily human life the most?', 'hypothetical', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Instant Star Trek Food Replicator (Any Meal in 5 Seconds)', 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=80', 0),
  ('Universal Real-Time In-Ear Babel Fish Translator', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80', 1),
  ('Self-Cleaning Nanotech Fabrics That Never Stain, Tear or Smell', 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80', 2),
  ('Frictionless Personal Magnetic Hoverboard for City Commutes', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80', 3),
  ('Dream Memory Projector Allowing You to Rewatch Your Nights', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&q=80', 4),
  ('Atmospheric Condenser Bottle Producing Infinite Pure Mineral Water', 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80', 5),
  ('Microscopic Health Nanobots Repairing Body Tissues While Sleeping', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400&q=80', 6),
  ('Ambient Room-Wide Wireless Power Charging Every Device Freely', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80', 7),
  ('Spatial Hologram Workspaces Floating Seamlessly in the Air', 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 99: Which hot drink warms your hands best du...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'Which hot drink warms your hands best during an icy blizzard?', 'hypothetical', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Ultra-Thick Parisian Hot Drinking Chocolate with Whipped Cream', 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=400&q=80', 0),
  ('Steaming Spiced Apple Cider Simmered with Cinnamon & Orange Slices', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80', 1),
  ('Hot Buttered Rum with Brown Sugar, Vanilla Bean & Fresh Nutmeg', 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80', 2),
  ('Authentic Irish Coffee with Jameson Whiskey & Floating Cold Cream', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80', 3),
  ('Clay Cup Indian Kadak Chai Boiled with Fresh Ginger & Cardamom', 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80', 4),
  ('London Fog Steamed Earl Grey with Lavender Syrup & Vanilla', 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=400&q=80', 5),
  ('Peppermint Dark Mocha with Crushed Candy Cane Dust', 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=400&q=80', 6),
  ('Steamed Golden Turmeric Milk with Wildflower Honey & Black Pepper', 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80', 7),
  ('Spiced Hot Cranberry Wassail Punch Simmered with Cloves', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

-- Scenario 100: What are you ordering at 2:00 AM in a re...
WITH ins_s AS (
  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)
  VALUES ('lone', 'What are you ordering at 2:00 AM in a retro all-night chrome diner?', 'hypothetical', true, false)
  RETURNING id
)
INSERT INTO scenario_options (scenario_id, text, image_url, order_index)
SELECT ins_s.id, opt.text, opt.image_url, opt.order_index
FROM ins_s, (VALUES
  ('Two Sunny-Side-Up Eggs, Crispy Applewood Bacon & Golden Hash Browns', 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80', 0),
  ('Giant Belgian Waffle with Melted Butter & Warm Maple Syrup', 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=400&q=80', 1),
  ('Stack of Three Fluffy Blueberry Pancakes with Maple Sausage Links', 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=400&q=80', 2),
  ('Flat-Top Griddled Crispy Corned Beef Hash with Buttered Seeded Rye', 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=400&q=80', 3),
  ('Western Denver Omelette with Smoked Ham, Sweet Peppers & Cheddar', 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80', 4),
  ('Triple-Decker Monte Cristo French Toast Sandwich with Raspberry Jam', 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80', 5),
  ('Country Fried Steak with Black Pepper Sausage Cream Gravy', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80', 6),
  ('Brioche French Toast Stuffed with Cream Cheese Frosting & Berries', 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=400&q=80', 7),
  ('Warm Flaky Buttermilk Biscuits Split and Drowned in Sausage Gravy', 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=400&q=80', 8)
) AS opt(text, image_url, order_index);

COMMIT;