export default {
 id: 'currency',
 title: 'Name a currency',
 icon: '💱',
 note: 'Current or historical. Unit names like Dollar work.',
 common: `Rupee|Dollar|Euro|Pound|Yen|Yuan|Dirham|Dinar|Riyal|Franc|Ruble|Peso`,
 uncommon: `Lira|Won|Baht|Ringgit|Rupiah|Taka|Rand|Real|Krona|Krone|Shekel|Shilling|Deutsche Mark|Dong|Rufiyaa|Ngultrum|Afghani`,
 rare: `Peseta|Drachma|Guilder|Escudo|Zloty|Forint|Koruna|Leu|Lev|Hryvnia|Kyat|Kip|Riel|Tugrik|Tenge|Som|Manat|Lari|Dram|Naira|Cedi|Birr|Kwacha|Pula|Bolivar|Sol|Pataca|Toman|Markka|Schilling|Kuna|Balboa|Colon|Quetzal
  |Bitcoin|Ethereum|Dogecoin|Denarius|Mohur|Florin|Guinea|Ducat|Doubloon`,
 deep: `Somoni|Denar|Lek|Convertible Mark|Tolar|Lats|Litas|Kroon|Punt|Ostmark|Reichsmark|Rentenmark|Papiermark|Goldmark|Thaler|Riksdaler|Scudo|Karbovanets|Pengo|Chervonets|Livre|Ecu|Maravedi|Piece of Eight
  |Sestertius|Aureus|Solidus|Obol|Talent|Stater|Daric|Tael|Ryo|Hwan|Tical|Akce|Kurus|Piastre|Continental
  |Dam|Pagoda|Fanam|Tanka|Cowrie|Karshapana|Pana|Kori|Xerafim
  |Cordoba|Lempira|Gourde|Boliviano|Guarani|Sucre|Inti|Austral|Cruzeiro|Cruzado|Pa'anga|Tala|Vatu|Kina
  |Ouguiya|Dalasi|Leone|Lilangeni|Loti|Nakfa|Dobra|Ariary|Kwanza|Metical|Zaire|Ekwele|Syli|ZiG
  |Litecoin|Ripple|Tether|Solana|Cardano|Monero|Binance Coin|USD Coin|Shiba Inu|Polkadot|Bitcoin Cash|Stellar|Tron|Dai|Zcash|Dash|Chainlink|Avalanche`,
 aliases: {
  'Indian Rupee': 'Rupee', 'INR': 'Rupee', 'Rupaya': 'Rupee', 'Rupiya': 'Rupee', 'Rupaiya': 'Rupee', 'Pakistani Rupee': 'Rupee', 'PKR': 'Rupee', 'Sri Lankan Rupee': 'Rupee',
  'Nepalese Rupee': 'Rupee', 'Nepali Rupee': 'Rupee', 'Mauritian Rupee': 'Rupee',
  'US Dollar': 'Dollar', 'USD': 'Dollar', 'American Dollar': 'Dollar', 'Australian Dollar': 'Dollar', 'AUD': 'Dollar', 'Canadian Dollar': 'Dollar', 'CAD': 'Dollar',
  'Singapore Dollar': 'Dollar', 'SGD': 'Dollar', 'Hong Kong Dollar': 'Dollar', 'HKD': 'Dollar', 'New Zealand Dollar': 'Dollar', 'NZD': 'Dollar', 'New Taiwan Dollar': 'Dollar',
  'Zimbabwean Dollar': 'Dollar', 'Buck': 'Dollar', 'Greenback': 'Dollar',
  'EUR': 'Euro',
  'GBP': 'Pound', 'Pound Sterling': 'Pound', 'Sterling': 'Pound', 'British Pound': 'Pound', 'Quid': 'Pound', 'Egyptian Pound': 'Pound',
  'JPY': 'Yen', 'Japanese Yen': 'Yen',
  'Renminbi': 'Yuan', 'RMB': 'Yuan', 'CNY': 'Yuan', 'Chinese Yuan': 'Yuan', 'Kuai': 'Yuan',
  'AED': 'Dirham', 'UAE Dirham': 'Dirham', 'Emirati Dirham': 'Dirham', 'Moroccan Dirham': 'Dirham', 'Dirhem': 'Dirham',
  'KWD': 'Dinar', 'Kuwaiti Dinar': 'Dinar', 'Bahraini Dinar': 'Dinar', 'Iraqi Dinar': 'Dinar', 'Jordanian Dinar': 'Dinar', 'Serbian Dinar': 'Dinar',
  'Rial': 'Riyal', 'SAR': 'Riyal', 'Saudi Riyal': 'Riyal', 'Qatari Riyal': 'Riyal', 'Omani Rial': 'Riyal', 'Iranian Rial': 'Riyal',
  'Swiss Franc': 'Franc', 'CHF': 'Franc', 'French Franc': 'Franc', 'CFA Franc': 'Franc', 'CFA': 'Franc', 'CFP Franc': 'Franc', 'Belgian Franc': 'Franc',
  'Rouble': 'Ruble', 'Russian Ruble': 'Ruble', 'RUB': 'Ruble', 'Russian Rouble': 'Ruble',
  'Mexican Peso': 'Peso', 'Philippine Peso': 'Peso', 'Piso': 'Peso', 'Argentine Peso': 'Peso',
  'Italian Lira': 'Lira', 'Turkish Lira': 'Lira', 'TRY': 'Lira',
  'Korean Won': 'Won', 'South Korean Won': 'Won', 'KRW': 'Won',
  'Thai Baht': 'Baht', 'THB': 'Baht', 'Malaysian Ringgit': 'Ringgit', 'MYR': 'Ringgit', 'Indonesian Rupiah': 'Rupiah', 'IDR': 'Rupiah',
  'Bangladeshi Taka': 'Taka', 'BDT': 'Taka', 'South African Rand': 'Rand', 'ZAR': 'Rand', 'Brazilian Real': 'Real', 'BRL': 'Real', 'Reais': 'Real',
  'Swedish Krona': 'Krona', 'SEK': 'Krona', 'Icelandic Krona': 'Krona', 'Kronor': 'Krona', 'Kronur': 'Krona',
  'Norwegian Krone': 'Krone', 'Danish Krone': 'Krone', 'NOK': 'Krone', 'DKK': 'Krone', 'Kroner': 'Krone',
  'Israeli Shekel': 'Shekel', 'New Shekel': 'Shekel', 'NIS': 'Shekel', 'ILS': 'Shekel', 'Sheqel': 'Shekel',
  'Kenyan Shilling': 'Shilling', 'Ugandan Shilling': 'Shilling', 'Tanzanian Shilling': 'Shilling',
  'Mark': 'Deutsche Mark', 'German Mark': 'Deutsche Mark', 'Deutschmark': 'Deutsche Mark', 'D-Mark': 'Deutsche Mark', 'DM': 'Deutsche Mark',
  'Vietnamese Dong': 'Dong', 'VND': 'Dong', 'Maldivian Rufiyaa': 'Rufiyaa', 'Rufiya': 'Rufiyaa', 'Bhutanese Ngultrum': 'Ngultrum',
  'Spanish Peseta': 'Peseta', 'Greek Drachma': 'Drachma', 'Dutch Guilder': 'Guilder', 'Gulden': 'Guilder', 'Caribbean Guilder': 'Guilder', 'Portuguese Escudo': 'Escudo',
  'Polish Zloty': 'Zloty', 'PLN': 'Zloty', 'Hungarian Forint': 'Forint', 'HUF': 'Forint', 'Czech Koruna': 'Koruna', 'CZK': 'Koruna', 'Crown': 'Koruna', 'Czech Crown': 'Koruna',
  'Romanian Leu': 'Leu', 'Lei': 'Leu', 'Bulgarian Lev': 'Lev', 'Leva': 'Lev', 'Ukrainian Hryvnia': 'Hryvnia', 'Hryvna': 'Hryvnia', 'Grivna': 'Hryvnia',
  'Myanmar Kyat': 'Kyat', 'Lao Kip': 'Kip', 'Cambodian Riel': 'Riel', 'Mongolian Tugrik': 'Tugrik', 'Togrog': 'Tugrik', 'Tugrug': 'Tugrik',
  'Kazakh Tenge': 'Tenge', 'Kazakhstani Tenge': 'Tenge', 'Sum': 'Som', 'Soum': 'Som',
  'Nigerian Naira': 'Naira', 'Ghanaian Cedi': 'Cedi', 'Ethiopian Birr': 'Birr', 'Zambian Kwacha': 'Kwacha', 'Malawian Kwacha': 'Kwacha', 'Botswana Pula': 'Pula',
  'Venezuelan Bolivar': 'Bolivar', 'Peruvian Sol': 'Sol', 'Nuevo Sol': 'Sol', 'Macanese Pataca': 'Pataca',
  'Finnish Markka': 'Markka', 'Finnmark': 'Markka', 'Austrian Schilling': 'Schilling', 'Croatian Kuna': 'Kuna',
  'BTC': 'Bitcoin', 'Ether': 'Ethereum', 'ETH': 'Ethereum', 'Doge': 'Dogecoin', 'Aruban Florin': 'Florin',
  'Irish Pound': 'Punt', 'East German Mark': 'Ostmark', 'Taler': 'Thaler', 'Maria Theresa Thaler': 'Thaler', 'Rixdollar': 'Riksdaler',
  'Pieces of Eight': 'Piece of Eight', 'Spanish Dollar': 'Piece of Eight',
  'Emalangeni': 'Lilangeni', 'Maloti': 'Loti', 'Zimbabwe Gold': 'ZiG',
  'LTC': 'Litecoin', 'XRP': 'Ripple', 'USDT': 'Tether', 'ADA': 'Cardano', 'BNB': 'Binance Coin', 'USDC': 'USD Coin', 'SHIB': 'Shiba Inu', 'XLM': 'Stellar'
 }
};
