export default {
 id: 'ice_cream_flavour',
 title: 'Name an ice cream flavour',
 icon: '🍦',
 note: 'Classic, Indian or adventurous.',
 common: `Vanilla|Chocolate|Strawberry|Mango|Butterscotch|Pistachio|Chocolate chip|Cookies and cream|Mint chocolate chip|Coffee|
  Black currant|Caramel|Kesar pista|Tutti frutti|Coconut|Neapolitan|Banana|Kulfi|Rocky road|Raspberry|Salted caramel|Cookie dough`,
 uncommon: `Rum and raisin|Butter pecan|Hazelnut|Peanut butter|Cherry|Blueberry|Lemon|Orange|Matcha|Dark chocolate|White chocolate|
  Chocolate fudge|Brownie|Cheesecake|Birthday cake|Bubblegum|Cotton candy|Sitaphal|Anjeer|Malai|Rose|Paan|Chikoo|Guava|Badam|
  Rabri|Gulkand|Lychee|Pineapple|Jackfruit|Tender coconut|Black forest|Red velvet|Tiramisu|Pralines and cream|Honey|Almond|
  Mocha|French vanilla|Belgian chocolate|Kaju kishmish|Saffron|Fig and honey|Double chocolate|Choco almond`,
 rare: `Espresso|Cinnamon|Ginger|Pumpkin|Peach|Apple pie|Toffee|Dulce de leche|Stracciatella|Fior di latte|Spumoni|Cassata|
  Moose tracks|Rajbhog|Gulab jamun|Rasmalai|Thandai|Jamun|Kala khatta|Masala chai|Jaggery|Death by chocolate|Black sesame|Ube|
  Taro|Red bean|Lavender|Earl Grey|Cake batter|Eggnog|Maple walnut|Passion fruit|Lime|Watermelon|Blackberry|Walnut|Macadamia|
  Banoffee|Creme brulee|Custard|Malted milk|Sweet cream|Honeycomb|Marshmallow|S'mores|Peppermint|Thai tea|Chocolate peanut butter|
  Mint|Brown butter|Cardamom|Fruit and nut`,
 deep: `Key lime pie|Gianduja|Kokum|Filter coffee|Gajar halwa|Mishti doi|Nolen gur|Durian|Basil|Olive oil|Avocado|Sweet corn|
  Cheese|Bacon|Garlic|Chili|Wasabi|Charcoal|Blue moon|Superman|Cereal milk|Horchata|Elderflower|Hibiscus|Yuzu|Grapefruit|
  Blood orange|Pomegranate|Apricot|Plum|Cranberry|Kiwi|Dragon fruit|Snickerdoodle|Sticky toffee|Buttermilk|Licorice|Hojicha|
  Chilli guava|Black pepper|Rosemary|Sea salt|Goat cheese|Bourbon|Pecan pie|Carrot cake|Tulsi`,
 aliases: {
  'Vanilla bean': 'Vanilla', 'Madagascar vanilla': 'Vanilla', 'Choco': 'Chocolate', 'Chocolate ice cream': 'Chocolate', 'Milk chocolate': 'Chocolate', 'Strawberries': 'Strawberry',
  'Alphonso mango': 'Mango', 'Alphonso': 'Mango', 'Aam': 'Mango', 'Pista': 'Pistachio', 'Choco chip': 'Chocolate chip', 'Choc chip': 'Chocolate chip', 'Chocolate chips': 'Chocolate chip',
  'Oreo': 'Cookies and cream', 'Cookies n cream': 'Cookies and cream', 'Cookies and creme': 'Cookies and cream', 'Mint choc chip': 'Mint chocolate chip', 'Mint chip': 'Mint chocolate chip',
  'Chocolate mint': 'Mint chocolate chip', 'Coffee ice cream': 'Coffee', 'Blackcurrant': 'Black currant', 'Kesar pistachio': 'Kesar pista', 'Kesar badam pista': 'Kesar pista',
  'Tutti fruity': 'Tutti frutti', 'Tuti fruti': 'Tutti frutti', 'Nariyal': 'Coconut', 'Matka kulfi': 'Kulfi', 'Malai kulfi': 'Kulfi', 'Salted caramel ice cream': 'Salted caramel',
  'Rum raisin': 'Rum and raisin', 'Rum n raisin': 'Rum and raisin', 'Butter pecan ice cream': 'Butter pecan', 'Green tea': 'Matcha', 'Matcha green tea': 'Matcha',
  'Fudge': 'Chocolate fudge', 'Hot fudge': 'Chocolate fudge', 'Fudge brownie': 'Brownie', 'Chocolate brownie': 'Brownie', 'Bubble gum': 'Bubblegum', 'Candy floss': 'Cotton candy',
  'Custard apple': 'Sitaphal', 'Sitafal': 'Sitaphal', 'Fig': 'Anjeer', 'Anjir': 'Anjeer', 'Gulab': 'Rose', 'Meetha paan': 'Paan', 'Sapota': 'Chikoo', 'Chiku': 'Chikoo',
  'Sapodilla': 'Chikoo', 'Amrood': 'Guava', 'Badam pista': 'Badam', 'Rabdi': 'Rabri', 'Litchi': 'Lychee', 'Lichi': 'Lychee', 'Kathal': 'Jackfruit', 'Tender coconut ice cream': 'Tender coconut',
  'Black forest cake': 'Black forest', 'Pralines n cream': 'Pralines and cream', 'Praline': 'Pralines and cream', 'Honey ice cream': 'Honey', 'Kesar': 'Saffron',
  'Cashew raisin': 'Kaju kishmish', 'Kaju draksh': 'Kaju kishmish', 'Kaju kismis': 'Kaju kishmish', 'Double choc': 'Double chocolate', 'Chocolate almond': 'Choco almond',
  'Pumpkin spice': 'Pumpkin', 'Peaches and cream': 'Peach',
  'Raj bhog': 'Rajbhog', 'Jamoon': 'Jamun', 'Chai': 'Masala chai', 'Chai latte': 'Masala chai', 'Gur': 'Jaggery', 'Black sesame ice cream': 'Black sesame', 'Purple yam': 'Ube',
  'Adzuki bean': 'Red bean', 'Earl grey tea': 'Earl Grey', 'Maple': 'Maple walnut', 'Maple pecan': 'Maple walnut', 'Passionfruit': 'Passion fruit', 'Tarbooz': 'Watermelon',
  'Creme caramel': 'Custard', 'Malt': 'Malted milk', 'Hokey pokey': 'Honeycomb', 'Candy cane': 'Peppermint', 'Thai iced tea': 'Thai tea', 'Peanut butter cup': 'Chocolate peanut butter',
  'Mint ice cream': 'Mint', 'Elaichi': 'Cardamom', 'Key lime': 'Key lime pie', 'Nutella': 'Gianduja', 'Chocolate hazelnut': 'Gianduja', 'Nolen gur ice cream': 'Nolen gur',
  'Activated charcoal': 'Charcoal', 'Black charcoal': 'Charcoal', 'Cereal': 'Cereal milk', 'Black licorice': 'Licorice', 'Liquorice': 'Licorice', 'Roasted green tea': 'Hojicha',
  'Spicy guava': 'Chilli guava', 'Holy basil': 'Tulsi', 'Gajar ka halwa': 'Gajar halwa'
 }
};
