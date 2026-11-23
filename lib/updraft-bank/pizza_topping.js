export default {
 id: 'pizza_topping',
 title: 'Name a pizza topping',
 icon: '🍕',
 note: "Anything you'd put on a pizza.",
 common: `Cheese|Mozzarella|Pepperoni|Mushroom|Onion|Tomato|Olive|Bell pepper|Sausage|Chicken|Paneer|Corn|Pineapple|Jalapeno|Ham|
  Bacon|Spinach|Garlic|Basil|Green chili|Tomato sauce|Oregano|Chili flakes`,
 uncommon: `Anchovy|Salami|Meatball|Ground beef|Red onion|Cherry tomato|Sun-dried tomato|Feta|Parmesan|Ricotta|Goat cheese|Cheddar|
  Provolone|Gorgonzola|Arugula|Artichoke|Broccoli|Zucchini|Eggplant|Baby corn|Tandoori chicken|Chicken tikka|Paneer tikka|
  Peri peri chicken|Barbecue chicken|Buffalo chicken|Shrimp|Tuna|Pesto|Barbecue sauce|Hot honey|Egg|Banana pepper|
  Roasted red pepper|Caramelized onion|Spring onion|Burrata|Keema|Canadian bacon|Chorizo|Olive oil|Beef|Pizza sauce`,
 rare: `Pancetta|Soppressata|Nduja|Capicola|Mortadella|Speck|Lamb|Gyro meat|Pulled pork|Brisket|Steak|Taco meat|Clams|Mussels|
  Calamari|Crab|Smoked salmon|Butter chicken|Teriyaki chicken|Kale|Potato|Sweet potato|Asparagus|Peas|Leek|Avocado|Fig|
  Pepperoncini|Cherry pepper|Pickles|Tofu|Vegan cheese|Truffle|Fontina|Gouda|Brie|Pecorino|Asiago|Blue cheese|Monterey Jack|
  Pepper Jack|Rosemary|Parsley|Cilantro|Black pepper|Honey|Balsamic glaze|Truffle oil|Chili oil|Sriracha|Mayonnaise|
  White sauce|Ranch|Buffalo sauce|Capers|Prosciutto|Kalamata olive`,
 deep: `Guanciale|Bresaola|Duck|Turkey|Pork belly|Kebab|Shawarma|Andouille|Kielbasa|Pastrami|Corned beef|Hot dog|Lobster|
  Scallops|Sardines|Caviar|Bulgogi|Butternut squash|Fennel|Radicchio|Brussels sprouts|Cauliflower|Beetroot|Pear|Apple|
  Grapes|Peach|Mango|Poblano|Habanero|Sauerkraut|Kimchi|Porcini|Shiitake|Portobello|Taleggio|Mascarpone|Stracciatella|
  Camembert|Halloumi|Thyme|Mint|Za'atar|Sesame seeds|Pine nuts|Walnuts|Salsa|Refried beans|Black beans|Mac and cheese|
  French fries|Nutella`,
 aliases: {
  'Extra cheese': 'Cheese', 'Double cheese': 'Cheese', 'Fresh mozzarella': 'Mozzarella', 'Buffalo mozzarella': 'Mozzarella', 'Mozz': 'Mozzarella',
  'Pepperonis': 'Pepperoni', 'Chicken pepperoni': 'Pepperoni', 'Mushrooms': 'Mushroom', 'Onions': 'Onion', 'Pyaz': 'Onion', 'Tomatoes': 'Tomato', 'Tamatar': 'Tomato',
  'Black olive': 'Olive', 'Green olive': 'Olive', 'Black olives': 'Olive', 'Olives': 'Olive', 'Capsicum': 'Bell pepper', 'Green pepper': 'Bell pepper',
  'Red pepper': 'Bell pepper', 'Yellow pepper': 'Bell pepper', 'Peppers': 'Bell pepper', 'Red paprika': 'Roasted red pepper', 'Italian sausage': 'Sausage',
  'Chicken sausage': 'Sausage', 'Grilled chicken': 'Chicken', 'Sweetcorn': 'Corn', 'Sweet corn': 'Corn', 'Golden corn': 'Corn', 'Jalapenos': 'Jalapeno',
  'Jalapeño': 'Jalapeno', 'Pickled jalapeno': 'Jalapeno', 'Roasted garlic': 'Garlic', 'Garlic cloves': 'Garlic', 'Fresh basil': 'Basil', 'Basil leaves': 'Basil',
  'Green chilli': 'Green chili', 'Hari mirch': 'Green chili', 'Marinara': 'Tomato sauce', 'Red sauce': 'Tomato sauce', 'Red chilli flakes': 'Chili flakes',
  'Chilli flakes': 'Chili flakes', 'Red pepper flakes': 'Chili flakes', 'Crushed red pepper': 'Chili flakes', 'Anchovies': 'Anchovy', 'Chicken salami': 'Salami',
  'Meatballs': 'Meatball', 'Minced beef': 'Ground beef', 'Beef mince': 'Ground beef', 'Sundried tomato': 'Sun-dried tomato', 'Feta cheese': 'Feta',
  'Parmigiano': 'Parmesan', 'Goats cheese': 'Goat cheese', 'Chevre': 'Goat cheese', 'Rocket': 'Arugula', 'Artichoke hearts': 'Artichoke', 'Courgette': 'Zucchini',
  'Aubergine': 'Eggplant', 'Brinjal': 'Eggplant', 'Chicken tikka masala': 'Chicken tikka', 'Tandoori paneer': 'Paneer tikka', 'Peri peri': 'Peri peri chicken',
  'Piri piri chicken': 'Peri peri chicken', 'BBQ chicken': 'Barbecue chicken', 'Barbeque chicken': 'Barbecue chicken', 'Prawns': 'Shrimp', 'Prawn': 'Shrimp',
  'Basil pesto': 'Pesto', 'BBQ sauce': 'Barbecue sauce', 'Fried egg': 'Egg', 'Boiled egg': 'Egg', 'Banana peppers': 'Banana pepper', 'Roasted peppers': 'Roasted red pepper',
  'Caramelised onion': 'Caramelized onion', 'Scallion': 'Spring onion', 'Green onion': 'Spring onion', 'Chicken keema': 'Keema', 'Mutton keema': 'Keema', 'Qeema': 'Keema',
  'Back bacon': 'Canadian bacon', 'Pizza base sauce': 'Pizza sauce', 'Nduja sausage': 'Nduja', 'Capocollo': 'Capicola', 'Gabagool': 'Capicola', 'Pulled chicken': 'Chicken',
  'Doner meat': 'Gyro meat', 'Taco beef': 'Taco meat', 'Squid': 'Calamari', 'Crab meat': 'Crab', 'Lox': 'Smoked salmon', 'Teriyaki': 'Teriyaki chicken',
  'Potatoes': 'Potato', 'Green peas': 'Peas', 'Matar': 'Peas', 'Figs': 'Fig', 'Pickled chilli': 'Pepperoncini', 'Gherkins': 'Pickles', 'Dill pickles': 'Pickles',
  'Black truffle': 'Truffle', 'Smoked gouda': 'Gouda', 'Blue': 'Blue cheese', 'Danish blue': 'Blue cheese', 'Pepperjack': 'Pepper Jack', 'Coriander leaves': 'Cilantro',
  'Balsamic': 'Balsamic glaze', 'Balsamic vinegar': 'Balsamic glaze', 'Chilli oil': 'Chili oil', 'Mayo': 'Mayonnaise', 'Garlic mayo': 'Mayonnaise', 'Alfredo sauce': 'White sauce',
  'Bechamel': 'White sauce', 'Ranch dressing': 'Ranch', 'Caper': 'Capers', 'Parma ham': 'Prosciutto', 'Kalamata olives': 'Kalamata olive', 'Pork cheek': 'Guanciale',
  'Duck breast': 'Duck', 'Doner kebab': 'Kebab', 'Hotdog': 'Hot dog', 'Frankfurter': 'Hot dog', 'Scallop': 'Scallops', 'Butternut': 'Butternut squash', 'Beet': 'Beetroot',
  'Grape': 'Grapes', 'Porcini mushroom': 'Porcini', 'Shiitake mushroom': 'Shiitake', 'Portobello mushroom': 'Portobello', 'Zaatar': "Za'atar", 'Sesame': 'Sesame seeds',
  'Pine nut': 'Pine nuts', 'Walnut': 'Walnuts', 'Fries': 'French fries', 'Chips': 'French fries', 'Mac n cheese': 'Mac and cheese', 'Chocolate spread': 'Nutella'
 }
};
