export default {
 id: 'jewellery',
 title: 'Name a piece of jewellery',
 icon: '📿',
 note: 'Includes Indian ornaments. Jewelry works too.',
 common: `Ring|Necklace|Earrings|Bracelet|Bangle|Chain|Pendant|Anklet|Nose ring|Mangalsutra|Locket|Brooch|Choker|Jhumka|
  Maang tikka|Toe ring|Kada|Nose pin|Engagement ring|Wedding ring|Tiara|Crown`,
 uncommon: `Stud earrings|Hoop earrings|Drop earrings|Danglers|Chandbali|Armlet|Kamarbandh|Nath|Haathphool|Matha patti|
  Charm bracelet|Tennis bracelet|Cuff|Signet ring|Cocktail ring|Eternity ring|Promise ring|Solitaire|Pearl necklace|
  Rani haar|Ear cuff|Cufflinks|Tie pin|Lapel pin|Medallion|Amulet|Charm|Friendship bracelet|Belly button ring|
  Septum ring|Body chain|Rudraksha mala|Chooda|Kaleera|Thumb ring|Hasli|Satlada|Ear chain`,
 rare: `Lariat|Statement necklace|Clip-on earrings|Chandelier earrings|Class ring|Mood ring|Cameo|Diadem|Coronet|
  Passa|Sheeshphool|Bulaq|Laung|Jhanjhar|Ghungroo|Kalgi|Sarpech|Thushi|Bugadi|Karnphool|Vanki|Kasu mala|Guttapusalu|
  Tulsi mala|Bib necklace|Torc|Fob chain|Circlet|Nethi chutti|Mohan mala|Kolhapuri saaj|Gokhru|Champakali|Guluband|
  Paunchi|Chudamani|Rakhdi|Collar necklace|Navratna|ID bracelet|Ear climber`,
 deep: `Riviere|Sautoir|Puzzle ring|Claddagh ring|Posy ring|Poison ring|Spinner ring|Threader earrings|Chatelaine|Hatpin|
  Stickpin|Parure|Demi-parure|Aigrette|Bandeau|Torsade|Negligee necklace|Fibula|Penannular brooch|Mourning ring|
  Toi et moi ring|Lavalier|Opera necklace|Matinee necklace|Princess necklace|Huggie earrings`,
 aliases: {
  'Earring': 'Earrings', 'Ear ring': 'Earrings', 'Ear rings': 'Earrings', 'Kangan': 'Bangle', 'Chudi': 'Bangle', 'Choodi': 'Bangle',
  'Churi': 'Bangle', 'Haar': 'Necklace', 'Angoothi': 'Ring', 'Anguthi': 'Ring', 'Payal': 'Anklet', 'Pajeb': 'Anklet', 'Ankle chain': 'Anklet',
  'Ankle bracelet': 'Anklet', 'Nathni': 'Nath', 'Thali': 'Mangalsutra', 'Thaali': 'Mangalsutra', 'Taali': 'Mangalsutra', 'Mangal sutra': 'Mangalsutra',
  'Jhumki': 'Jhumka', 'Jimikki': 'Jhumka', 'Tikka': 'Maang tikka', 'Mang tikka': 'Maang tikka', 'Maangtikka': 'Maang tikka', 'Bichhiya': 'Toe ring',
  'Bichiya': 'Toe ring', 'Bichua': 'Toe ring', 'Kara': 'Kada', 'Kadaa': 'Kada', 'Wedding band': 'Wedding ring', 'Mukut': 'Crown', 'Nose stud': 'Nose pin',
  'Studs': 'Stud earrings', 'Ear studs': 'Stud earrings', 'Tops': 'Stud earrings', 'Hoops': 'Hoop earrings', 'Bali': 'Hoop earrings', 'Baali': 'Hoop earrings',
  'Dangle earrings': 'Danglers', 'Bajuband': 'Armlet', 'Baju band': 'Armlet', 'Arm cuff': 'Armlet', 'Arm band': 'Armlet',
  'Kamarband': 'Kamarbandh', 'Kardhani': 'Kamarbandh', 'Waist chain': 'Kamarbandh', 'Vaddanam': 'Kamarbandh', 'Oddiyanam': 'Kamarbandh',
  'Hathphool': 'Haathphool', 'Hand chain': 'Haathphool', 'Hand harness': 'Haathphool', 'Mathapatti': 'Matha patti',
  'Cuff bracelet': 'Cuff', 'Signet': 'Signet ring', 'Solitaire ring': 'Solitaire', 'String of pearls': 'Pearl necklace', 'Pearl string': 'Pearl necklace',
  'Cufflink': 'Cufflinks', 'Cuff links': 'Cufflinks', 'Tie clip': 'Tie pin', 'Tie bar': 'Tie pin', 'Lapel badge': 'Lapel pin', 'Talisman': 'Amulet',
  'Taveez': 'Amulet', 'Tabeez': 'Amulet', 'Navel ring': 'Belly button ring', 'Belly ring': 'Belly button ring', 'Rudraksha': 'Rudraksha mala',
  'Choora': 'Chooda', 'Kalire': 'Kaleera', 'Hansli': 'Hasli', 'Hansuli': 'Hasli', 'Satlada haar': 'Satlada', 'Kaan chain': 'Ear chain', 'Mattal': 'Ear chain',
  'Jhoomar': 'Passa', 'Jhumar': 'Passa', 'Jhanjar': 'Jhanjhar', 'Ghungru': 'Ghungroo', 'Kasulaperu': 'Kasu mala',
  'Kasumalai': 'Kasu mala', 'Lakshmi haar': 'Kasu mala', 'Torque': 'Torc', 'Watch chain': 'Fob chain', 'Albert chain': 'Fob chain',
  'Rivière': 'Riviere', 'Claddagh': 'Claddagh ring', 'Lavaliere': 'Lavalier', 'Rakhri': 'Rakhdi', 'Borla': 'Rakhdi', 'Pahunchi': 'Paunchi',
  'Gulubandh': 'Guluband', 'Saaj': 'Kolhapuri saaj', 'Nethichutti': 'Nethi chutti', 'Navaratna': 'Navratna', 'Huggies': 'Huggie earrings', 'Ear crawler': 'Ear climber'
 }
};
