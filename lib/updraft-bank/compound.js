export default {
 id: 'compound',
 title: 'Name a chemical compound',
 icon: '🧪',
 note: 'Common or chemical names both count.',
 common: `Water|Carbon dioxide|Sodium chloride|Ammonia|Methane|Glucose|Sucrose|Sodium bicarbonate|Hydrogen peroxide|
  Hydrochloric acid|Sulfuric acid|Carbon monoxide|Ethanol|Acetic acid|Sodium hydroxide|Nitric acid|Calcium carbonate|
  Sodium hypochlorite|Iron oxide|Propane|Butane|Citric acid|Nitrous oxide|Calcium oxide|Calcium hydroxide|Sodium carbonate|
  Copper sulfate|Potassium permanganate|Ethylene|Acetone`,
 uncommon: `Hydrogen sulfide|Sulfur dioxide|Nitrogen dioxide|Nitric oxide|Benzene|Methanol|Formaldehyde|Chloroform|Diethyl ether|
  Ascorbic acid|Caffeine|Nicotine|Aspirin|Paracetamol|Urea|Fructose|Lactose|Starch|Cellulose|Glycerol|Lactic acid|Formic acid|
  Oxalic acid|Phosphoric acid|Ammonium chloride|Ammonium nitrate|Potassium nitrate|Calcium sulfate|Magnesium sulfate|
  Silicon dioxide|Aluminium oxide|Titanium dioxide|Zinc oxide|Magnesium hydroxide|Potassium hydroxide|Potassium chloride|
  Silver nitrate|Calcium chloride|Hydrofluoric acid|Ethylene glycol|Naphthalene|Toluene|Acetylene|Octane|Ethane|
  Chlorofluorocarbon|Monosodium glutamate|Borax|Boric acid|Hydrogen cyanide|Trinitrotoluene|Nitroglycerin|Chlorophyll|
  Cholesterol|Adrenaline|Dopamine|Serotonin|Ibuprofen|Menthol|Curcumin|Camphor|Phenol|Isopropyl alcohol|Magnesium oxide|
  Heavy water|Calcium hypochlorite|Potassium alum|Carbonic acid|Polyethylene|Polyvinyl chloride|Polystyrene|Nylon|
  Polytetrafluoroethylene`,
 rare: `Sodium sulfate|Potassium carbonate|Ferrous sulfate|Barium sulfate|Calcium phosphate|Potassium dichromate|Potassium iodide|
  Potassium chlorate|Ammonium sulfate|Diammonium phosphate|Calcium carbide|Carbon tetrachloride|Phosgene|Sulfur hexafluoride|
  Silicon carbide|Tungsten carbide|Lithium carbonate|Sodium thiosulfate|Silver chloride|Silver bromide|Manganese dioxide|
  Ferric chloride|Hydrazine|Uric acid|Glycine|Tryptophan|Stearic acid|Benzoic acid|Salicylic acid|Malic acid|Tartaric acid|
  Aniline|Phenolphthalein|Indigo|Styrene|Propylene|Acetaldehyde|Xylene|Hexane|Pentane|Glycogen|Adenosine triphosphate|
  Acetylcholine|Oxytocin|Thyroxine|Retinol|Folic acid|Melatonin|Testosterone|Cortisol|Morphine|Penicillin|Quinine|Capsaicin|
  Vanillin|Beta-carotene|Saccharin|Aspartame|Metformin|Amoxicillin|Chloroquine|Polypropylene|Bakelite|Polyurethane|
  Polyethylene terephthalate|Sodium lauryl sulfate|Maltose|Sodium benzoate|Sodium nitrate|Sodium fluoride|Potassium cyanide|
  Picric acid`,
 deep: `Lycopene|Theobromine|Sucralose|Xylitol|Sorbitol|Hydroxyapatite|Sodium silicate|Lead acetate|Carbon disulfide|
  Sulfur trioxide|Phosphorus pentoxide|Xenon tetrafluoride|Boron nitride|Gallium arsenide|Lithium hydroxide|Sodium azide|
  Zinc sulfide|Cadmium sulfide|Zinc sulfate|Sodium nitrite|Hypochlorous acid|Perchloric acid|Alanine|Lysine|Cysteine|Leucine|
  Palmitic acid|Oleic acid|Butyric acid|Succinic acid|Pyridine|Methyl orange|Alizarin|Mauveine|Ethylene oxide|Vinyl chloride|
  Butadiene|Isoprene|Benzaldehyde|Cyclohexane|Propylene glycol|Butanol|Dimethyl sulfoxide|Dichloromethane|Tetrafluoroethylene|
  Chlorine dioxide|Cupric oxide|Barium chloride|Stannous fluoride|Trisodium phosphate|Sodium acetate|Calcium fluoride|
  Lead nitrate|Aluminium chloride|Zinc chloride|Potassium sulfate|Ammonium carbonate|Sodium cyanide|Chitin|Galactose|Ribose|
  Creatine|Codeine|Histamine|Glutathione|Thiamine|Riboflavin|Niacin|Cobalamin|Cholecalciferol|Tocopherol|Phylloquinone|
  Biotin|Pyridoxine|Estradiol|Diclofenac|Cetirizine|Omeprazole|Atorvastatin|Warfarin|Hydroxychloroquine|Azithromycin|
  Dexamethasone|Lidocaine|Piperine|Allicin|Eugenol|Limonene|Citral|Cinnamaldehyde|Linalool|Geraniol|RDX|EDTA|Hexamine|
  Neoprene|Kevlar|Polycarbonate|Sodium stearate`,
 aliases: {
  'H2O': 'Water', 'Pani': 'Water', 'Paani': 'Water', 'Jal': 'Water', 'Dihydrogen monoxide': 'Water',
  'CO2': 'Carbon dioxide', 'Dry ice': 'Carbon dioxide',
  'NaCl': 'Sodium chloride', 'Salt': 'Sodium chloride', 'Table salt': 'Sodium chloride', 'Common salt': 'Sodium chloride', 'Namak': 'Sodium chloride',
  'NH3': 'Ammonia', 'CH4': 'Methane', 'Marsh gas': 'Methane',
  'C6H12O6': 'Glucose', 'Dextrose': 'Glucose', 'Blood sugar': 'Glucose', 'Grape sugar': 'Glucose',
  'Sugar': 'Sucrose', 'Table sugar': 'Sucrose', 'Cane sugar': 'Sucrose', 'Cheeni': 'Sucrose', 'Chini': 'Sucrose', 'Shakkar': 'Sucrose', 'C12H22O11': 'Sucrose',
  'Baking soda': 'Sodium bicarbonate', 'NaHCO3': 'Sodium bicarbonate', 'Bicarbonate of soda': 'Sodium bicarbonate',
  'Sodium hydrogen carbonate': 'Sodium bicarbonate', 'Bicarb': 'Sodium bicarbonate', 'Cooking soda': 'Sodium bicarbonate',
  'H2O2': 'Hydrogen peroxide', 'HCl': 'Hydrochloric acid', 'Muriatic acid': 'Hydrochloric acid',
  'Sulphuric acid': 'Sulfuric acid', 'H2SO4': 'Sulfuric acid', 'Oil of vitriol': 'Sulfuric acid', 'CO': 'Carbon monoxide',
  'Ethyl alcohol': 'Ethanol', 'Alcohol': 'Ethanol', 'C2H5OH': 'Ethanol', 'Grain alcohol': 'Ethanol',
  'Vinegar': 'Acetic acid', 'Ethanoic acid': 'Acetic acid', 'CH3COOH': 'Acetic acid', 'Sirka': 'Acetic acid',
  'Caustic soda': 'Sodium hydroxide', 'Lye': 'Sodium hydroxide', 'NaOH': 'Sodium hydroxide', 'HNO3': 'Nitric acid', 'Aqua fortis': 'Nitric acid',
  'CaCO3': 'Calcium carbonate', 'Chalk': 'Calcium carbonate', 'Limestone': 'Calcium carbonate',
  'Bleach': 'Sodium hypochlorite', 'NaOCl': 'Sodium hypochlorite', 'NaClO': 'Sodium hypochlorite',
  'Rust': 'Iron oxide', 'Ferric oxide': 'Iron oxide', 'Fe2O3': 'Iron oxide', 'C3H8': 'Propane', 'C4H10': 'Butane',
  'Nimbu sat': 'Citric acid', 'Lemon salt': 'Citric acid', 'Laughing gas': 'Nitrous oxide', 'N2O': 'Nitrous oxide',
  'Quicklime': 'Calcium oxide', 'Lime': 'Calcium oxide', 'CaO': 'Calcium oxide', 'Burnt lime': 'Calcium oxide',
  'Slaked lime': 'Calcium hydroxide', 'Hydrated lime': 'Calcium hydroxide', 'Ca(OH)2': 'Calcium hydroxide', 'Chuna': 'Calcium hydroxide',
  'Limewater': 'Calcium hydroxide', 'Washing soda': 'Sodium carbonate', 'Soda ash': 'Sodium carbonate', 'Na2CO3': 'Sodium carbonate',
  'Copper sulphate': 'Copper sulfate', 'CuSO4': 'Copper sulfate', 'Blue vitriol': 'Copper sulfate', 'Neela thotha': 'Copper sulfate',
  'Cupric sulfate': 'Copper sulfate', 'KMnO4': 'Potassium permanganate', "Condy's crystals": 'Potassium permanganate',
  'Lal dawa': 'Potassium permanganate', 'Ethene': 'Ethylene', 'C2H4': 'Ethylene', 'Propanone': 'Acetone', 'Nail polish remover': 'Acetone',
  'H2S': 'Hydrogen sulfide', 'Hydrogen sulphide': 'Hydrogen sulfide', 'Rotten egg gas': 'Hydrogen sulfide',
  'SO2': 'Sulfur dioxide', 'Sulphur dioxide': 'Sulfur dioxide', 'NO2': 'Nitrogen dioxide', 'NO': 'Nitric oxide', 'Nitrogen monoxide': 'Nitric oxide',
  'C6H6': 'Benzene', 'Methyl alcohol': 'Methanol', 'Wood alcohol': 'Methanol', 'CH3OH': 'Methanol',
  'Formalin': 'Formaldehyde', 'Methanal': 'Formaldehyde', 'CH2O': 'Formaldehyde', 'Trichloromethane': 'Chloroform', 'CHCl3': 'Chloroform',
  'Ether': 'Diethyl ether', 'Ethoxyethane': 'Diethyl ether', 'Vitamin C': 'Ascorbic acid', 'Acetylsalicylic acid': 'Aspirin',
  'Acetaminophen': 'Paracetamol', 'Carbamide': 'Urea', 'Fruit sugar': 'Fructose', 'Milk sugar': 'Lactose',
  'Glycerin': 'Glycerol', 'Glycerine': 'Glycerol', 'Methanoic acid': 'Formic acid', 'H3PO4': 'Phosphoric acid',
  'NH4Cl': 'Ammonium chloride', 'Sal ammoniac': 'Ammonium chloride', 'Navsadar': 'Ammonium chloride', 'Nausadar': 'Ammonium chloride',
  'NH4NO3': 'Ammonium nitrate', 'Saltpeter': 'Potassium nitrate', 'Saltpetre': 'Potassium nitrate', 'KNO3': 'Potassium nitrate',
  'Nitre': 'Potassium nitrate', 'Shora': 'Potassium nitrate',
  'Calcium sulphate': 'Calcium sulfate', 'CaSO4': 'Calcium sulfate', 'Gypsum': 'Calcium sulfate', 'Plaster of Paris': 'Calcium sulfate', 'POP': 'Calcium sulfate',
  'Epsom salt': 'Magnesium sulfate', 'MgSO4': 'Magnesium sulfate', 'Magnesium sulphate': 'Magnesium sulfate',
  'Silica': 'Silicon dioxide', 'SiO2': 'Silicon dioxide', 'Alumina': 'Aluminium oxide', 'Al2O3': 'Aluminium oxide', 'Aluminum oxide': 'Aluminium oxide',
  'TiO2': 'Titanium dioxide', 'Titania': 'Titanium dioxide', 'ZnO': 'Zinc oxide', 'Milk of magnesia': 'Magnesium hydroxide',
  'Mg(OH)2': 'Magnesium hydroxide', 'Caustic potash': 'Potassium hydroxide', 'KOH': 'Potassium hydroxide', 'KCl': 'Potassium chloride',
  'AgNO3': 'Silver nitrate', 'Lunar caustic': 'Silver nitrate', 'CaCl2': 'Calcium chloride', 'HF': 'Hydrofluoric acid',
  'Hydrogen fluoride': 'Hydrofluoric acid', 'Antifreeze': 'Ethylene glycol', 'Glycol': 'Ethylene glycol', 'Mothball': 'Naphthalene',
  'Methylbenzene': 'Toluene', 'Ethyne': 'Acetylene', 'C2H2': 'Acetylene', 'C8H18': 'Octane', 'C2H6': 'Ethane',
  'CFC': 'Chlorofluorocarbon', 'Freon': 'Chlorofluorocarbon', 'MSG': 'Monosodium glutamate', 'Ajinomoto': 'Monosodium glutamate',
  'Sodium borate': 'Borax', 'Sodium tetraborate': 'Borax', 'Suhaga': 'Borax', 'HCN': 'Hydrogen cyanide', 'Prussic acid': 'Hydrogen cyanide',
  'TNT': 'Trinitrotoluene', 'Nitroglycerine': 'Nitroglycerin', 'Glyceryl trinitrate': 'Nitroglycerin', 'Epinephrine': 'Adrenaline',
  'Kapur': 'Camphor', 'Kapoor': 'Camphor', 'Carbolic acid': 'Phenol', 'Isopropanol': 'Isopropyl alcohol', 'Rubbing alcohol': 'Isopropyl alcohol',
  'IPA': 'Isopropyl alcohol', 'Magnesia': 'Magnesium oxide', 'MgO': 'Magnesium oxide', 'D2O': 'Heavy water', 'Deuterium oxide': 'Heavy water',
  'Bleaching powder': 'Calcium hypochlorite', 'Alum': 'Potassium alum', 'Phitkari': 'Potassium alum', 'Fitkari': 'Potassium alum',
  'H2CO3': 'Carbonic acid', 'Polythene': 'Polyethylene', 'PE': 'Polyethylene', 'PVC': 'Polyvinyl chloride',
  'Thermocol': 'Polystyrene', 'Styrofoam': 'Polystyrene', 'Teflon': 'Polytetrafluoroethylene', 'PTFE': 'Polytetrafluoroethylene',
  "Glauber's salt": 'Sodium sulfate', 'Sodium sulphate': 'Sodium sulfate', 'Na2SO4': 'Sodium sulfate',
  'Potash': 'Potassium carbonate', 'Pearl ash': 'Potassium carbonate', 'K2CO3': 'Potassium carbonate',
  'Green vitriol': 'Ferrous sulfate', 'Iron sulfate': 'Ferrous sulfate', 'Iron sulphate': 'Ferrous sulfate', 'Ferrous sulphate': 'Ferrous sulfate',
  'FeSO4': 'Ferrous sulfate', 'Kasis': 'Ferrous sulfate', 'Barium meal': 'Barium sulfate', 'BaSO4': 'Barium sulfate', 'Barium sulphate': 'Barium sulfate',
  'K2Cr2O7': 'Potassium dichromate', 'KI': 'Potassium iodide', 'KClO3': 'Potassium chlorate', 'Ammonium sulphate': 'Ammonium sulfate',
  'DAP': 'Diammonium phosphate', 'CaC2': 'Calcium carbide', 'CCl4': 'Carbon tetrachloride', 'Tetrachloromethane': 'Carbon tetrachloride',
  'Carbonyl chloride': 'Phosgene', 'SF6': 'Sulfur hexafluoride', 'Sulphur hexafluoride': 'Sulfur hexafluoride',
  'Carborundum': 'Silicon carbide', 'SiC': 'Silicon carbide', 'Hypo': 'Sodium thiosulfate', 'Sodium thiosulphate': 'Sodium thiosulfate',
  'AgCl': 'Silver chloride', 'AgBr': 'Silver bromide', 'MnO2': 'Manganese dioxide', 'Iron chloride': 'Ferric chloride', 'FeCl3': 'Ferric chloride',
  'Indigotin': 'Indigo', 'Propene': 'Propylene', 'Ethanal': 'Acetaldehyde', 'ATP': 'Adenosine triphosphate', 'Vitamin A': 'Retinol',
  'Folate': 'Folic acid', 'Vitamin B9': 'Folic acid', 'Carotene': 'Beta-carotene', 'PP': 'Polypropylene', 'PET': 'Polyethylene terephthalate',
  'SLS': 'Sodium lauryl sulfate', 'Sodium dodecyl sulfate': 'Sodium lauryl sulfate', 'SDS': 'Sodium lauryl sulfate', 'Malt sugar': 'Maltose',
  'Chile saltpeter': 'Sodium nitrate', 'NaNO3': 'Sodium nitrate', 'NaF': 'Sodium fluoride', 'KCN': 'Potassium cyanide', 'Trinitrophenol': 'Picric acid',
  'Water glass': 'Sodium silicate', 'Sugar of lead': 'Lead acetate', 'CS2': 'Carbon disulfide', 'Carbon disulphide': 'Carbon disulfide',
  'SO3': 'Sulfur trioxide', 'Sulphur trioxide': 'Sulfur trioxide', 'P2O5': 'Phosphorus pentoxide', 'GaAs': 'Gallium arsenide',
  'White vitriol': 'Zinc sulfate', 'Zinc sulphate': 'Zinc sulfate', 'Zinc sulphide': 'Zinc sulfide', 'DMSO': 'Dimethyl sulfoxide',
  'Methylene chloride': 'Dichloromethane', 'DCM': 'Dichloromethane', 'Copper oxide': 'Cupric oxide', 'CuO': 'Cupric oxide',
  'TSP': 'Trisodium phosphate', 'Aluminum chloride': 'Aluminium chloride', 'Smelling salts': 'Ammonium carbonate',
  "Baker's ammonia": 'Ammonium carbonate', 'Potassium sulphate': 'Potassium sulfate', 'Vitamin B1': 'Thiamine', 'Vitamin B2': 'Riboflavin',
  'Vitamin B3': 'Niacin', 'Nicotinic acid': 'Niacin', 'Vitamin B12': 'Cobalamin', 'Vitamin D3': 'Cholecalciferol', 'Vitamin D': 'Cholecalciferol',
  'Vitamin E': 'Tocopherol', 'Vitamin K': 'Phylloquinone', 'Vitamin B7': 'Biotin', 'Vitamin B6': 'Pyridoxine',
  'Methenamine': 'Hexamine', 'Urotropine': 'Hexamine'
 }
};
