export default {
 id: 'beauty',
 title: 'Name a beauty, grooming or toiletry product',
 icon: '🧴',
 note: 'Generic product types, not brand names.',
 common: `Soap|Shampoo|Conditioner|Toothpaste|Toothbrush|Comb|Hairbrush|Lipstick|Kajal|Eyeliner|Mascara|Foundation|
  Face wash|Moisturiser|Sunscreen|Body lotion|Perfume|Deodorant|Hair oil|Nail polish|Talcum powder|Face cream|
  Cold cream|Shaving cream|Razor|Lip balm|Hand wash|Body wash|Hair gel|Compact powder`,
 uncommon: `Bindi|Sindoor|Mehndi|Cotton buds|Hair dye|Mouthwash|Dental floss|Tongue cleaner|Nail cutter|Tweezers|Nail file|
  Blush|Concealer|Primer|Highlighter|Eyeshadow|Eyebrow pencil|Lip gloss|Lip liner|BB cream|Toner|Serum|Night cream|
  Face scrub|Face pack|Makeup remover|Aftershave|Beard oil|Hair spray|Hair serum|Hair removal cream|Wax strips|
  Body mist|Cologne|Attar|Petroleum jelly|Rose water|Multani mitti|Nail polish remover|False nails|False eyelashes|
  Eyelash curler|Makeup sponge|Makeup brush|Loofah|Pumice stone|Hand cream|Hand sanitiser|Wet wipes|Cotton pads|
  Sanitary pad|Sheet mask|Face powder|Kumkum`,
 rare: `Bronzer|Setting spray|Setting powder|CC cream|Eye cream|Body scrub|Clay mask|Peel-off mask|Micellar water|
  Cleansing oil|Cleansing balm|Beard balm|Shaving brush|Safety razor|Straight razor|Hair wax|Pomade|Mousse|Dry shampoo|
  Hair mask|Leave-in conditioner|Prickly heat powder|Aloe vera gel|Ubtan|Alum|Surma|Lip tint|Lip scrub|Cuticle oil|
  Nail buffer|Base coat|Top coat|Nail glue|Brow gel|Powder puff|Foot cream|Tampon|Menstrual cup|Bubble bath|Bath salts|
  Bath bomb|Body oil|Body butter|Massage oil|Essential oil|Face mist|Tinted moisturiser|Pimple patch|Nose strip|
  Heat protectant|Hair tonic|Shaving soap|Tooth powder|Whitening strips|Colour corrector|Gua sha|Jade roller|Lip oil|
  Shampoo bar|Cuticle pusher|Hair rollers|Contour stick|Face oil|Blotting paper|Lip plumper|Kohl pencil`,
 deep: `Alta|Datun|Miswak|Banana powder|Kabuki brush|Spoolie|Dermaroller|Konjac sponge|Essence|Ampoule|Sleeping mask|
  Eye primer|Brow pomade|Lash serum|Solid perfume|Styptic pencil|Moustache wax|Lash glue|Exfoliating glove|
  Pre-shave oil|Aftershave balm|Setting lotion|Nail strengthener|Lip primer`,
 aliases: {
  'Bathing soap': 'Soap', 'Saboon': 'Soap', 'Sabun': 'Soap', 'Tooth paste': 'Toothpaste', 'Tooth brush': 'Toothbrush', 'Hair brush': 'Hairbrush',
  'Kanghi': 'Comb', 'Kangha': 'Comb', 'Lip stick': 'Lipstick', 'Kohl': 'Kajal', 'Kajal stick': 'Kajal', 'Eye liner': 'Eyeliner', 'Eye pencil': 'Eyeliner',
  'Liquid foundation': 'Foundation', 'Facewash': 'Face wash', 'Face cleanser': 'Face wash', 'Cleanser': 'Face wash', 'Moisturizer': 'Moisturiser',
  'Sunblock': 'Sunscreen', 'Sun cream': 'Sunscreen', 'Suncream': 'Sunscreen', 'Sunscreen lotion': 'Sunscreen', 'Lotion': 'Body lotion',
  'Moisturising lotion': 'Body lotion', 'Fragrance': 'Perfume', 'Scent': 'Perfume', 'Eau de parfum': 'Perfume', 'Eau de toilette': 'Perfume',
  'Deo': 'Deodorant', 'Antiperspirant': 'Deodorant', 'Roll-on': 'Deodorant', 'Body spray': 'Deodorant', 'Nail paint': 'Nail polish',
  'Nail varnish': 'Nail polish', 'Nail enamel': 'Nail polish', 'Talc': 'Talcum powder', 'Baby powder': 'Talcum powder', 'Powder': 'Talcum powder',
  'Shaving foam': 'Shaving cream', 'Shaving gel': 'Shaving cream', 'Shaver': 'Razor', 'Chapstick': 'Lip balm', 'Lip salve': 'Lip balm',
  'Handwash': 'Hand wash', 'Liquid soap': 'Hand wash', 'Shower gel': 'Body wash', 'Compact': 'Compact powder', 'Pressed powder': 'Compact powder',
  'Ear buds': 'Cotton buds', 'Earbuds': 'Cotton buds', 'Q-tips': 'Cotton buds', 'Cotton swabs': 'Cotton buds', 'Henna': 'Mehndi', 'Mehendi': 'Mehndi',
  'Hair colour': 'Hair dye', 'Hair color': 'Hair dye', 'Floss': 'Dental floss', 'Tongue scraper': 'Tongue cleaner', 'Nail clipper': 'Nail cutter',
  'Nail clippers': 'Nail cutter', 'Tweezer': 'Tweezers', 'Chimti': 'Tweezers', 'Emery board': 'Nail file', 'Blusher': 'Blush', 'Rouge': 'Blush',
  'Eye shadow': 'Eyeshadow', 'Eyeshadow palette': 'Eyeshadow', 'Brow pencil': 'Eyebrow pencil', 'Lip pencil': 'Lip liner', 'Facial toner': 'Toner',
  'Face serum': 'Serum', 'Exfoliator': 'Face scrub', 'Face mask': 'Face pack', 'Makeup wipes': 'Makeup remover', 'After shave': 'Aftershave',
  'Hairspray': 'Hair spray', 'Dusting powder': 'Talcum powder', 'Depilatory cream': 'Hair removal cream', 'Waxing strips': 'Wax strips',
  'Ittar': 'Attar', 'Itra': 'Attar', 'Itr': 'Attar', 'Vaseline': 'Petroleum jelly', 'Gulab jal': 'Rose water', 'Gulabjal': 'Rose water',
  "Fuller's earth": 'Multani mitti', 'Multani mati': 'Multani mitti', 'Nail paint remover': 'Nail polish remover', 'Acetone': 'Nail polish remover',
  'Press-on nails': 'False nails', 'Fake nails': 'False nails', 'Artificial nails': 'False nails', 'False lashes': 'False eyelashes',
  'Fake eyelashes': 'False eyelashes', 'Beauty blender': 'Makeup sponge', 'Beauty sponge': 'Makeup sponge', 'Bath sponge': 'Loofah', 'Luffa': 'Loofah',
  'Loofa': 'Loofah', 'Pumice': 'Pumice stone', 'Hand sanitizer': 'Hand sanitiser', 'Sanitiser': 'Hand sanitiser', 'Sanitizer': 'Hand sanitiser',
  'Baby wipes': 'Wet wipes', 'Wet tissues': 'Wet wipes', 'Cotton wool': 'Cotton pads', 'Sanitary napkin': 'Sanitary pad', 'Pad': 'Sanitary pad',
  'Kumkum powder': 'Kumkum', 'Roli': 'Kumkum', 'Setting mist': 'Setting spray', 'Loose powder': 'Setting powder', 'Under-eye cream': 'Eye cream',
  'Mud mask': 'Clay mask', 'Cleansing water': 'Micellar water', 'Cut-throat razor': 'Straight razor', 'Hair pomade': 'Pomade', 'Styling mousse': 'Mousse',
  'Hair mousse': 'Mousse', 'Hair pack': 'Hair mask', 'Phitkari': 'Alum', 'Alum block': 'Alum', 'Lip stain': 'Lip tint', 'Nail buffing block': 'Nail buffer',
  'Bath salt': 'Bath salts', 'Aroma oil': 'Essential oil', 'Facial mist': 'Face mist', 'Tinted moisturizer': 'Tinted moisturiser', 'Acne patch': 'Pimple patch',
  'Pore strip': 'Nose strip', 'Heat protection spray': 'Heat protectant', 'Dant manjan': 'Tooth powder', 'Manjan': 'Tooth powder',
  'Teeth whitening strips': 'Whitening strips', 'Color corrector': 'Colour corrector', 'Face roller': 'Jade roller', 'Hair curlers': 'Hair rollers',
  'Curlers': 'Hair rollers', 'Blotting sheets': 'Blotting paper', 'Kajal pencil': 'Kohl pencil', 'Mahavar': 'Alta', 'Aalta': 'Alta', 'Datoon': 'Datun',
  'Neem stick': 'Datun', 'Neem datun': 'Datun', 'Siwak': 'Miswak', 'Derma roller': 'Dermaroller', 'Mustache wax': 'Moustache wax', 'Eyelash glue': 'Lash glue'
 }
};
