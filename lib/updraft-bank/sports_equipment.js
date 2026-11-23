export default {
 id: 'sports_equipment',
 title: 'Name a piece of sports equipment',
 icon: '🏸',
 note: 'Bats, balls, nets, pads and protective gear.',
 common: `Bat|Ball|Racket|Net|Helmet|Gloves|Stumps|Shuttlecock|Football|Cricket bat|Cricket ball|Tennis racket|Tennis ball|
  Basketball|Volleyball|Hockey stick|Golf club|Skipping rope|Dumbbell|Goalpost|Pads|Boxing gloves|Whistle|Badminton racket|
  Table tennis bat|Bails|Shin guards|Swimming goggles|Treadmill|Skateboard|Frisbee|Golf ball|Baseball bat|Bow|Arrow|
  Punching bag|Yoga mat|Skates|Carrom board|Dartboard`,
 uncommon: `Baseball glove|Baseball|Softball|Rugby ball|Hockey puck|Ice skates|Roller skates|Surfboard|Snowboard|Skis|Ski poles|
  Quiver|Archery target|Javelin|Discus|Shot put|Hammer|Hurdle|Starting blocks|Relay baton|Vaulting pole|Mouthguard|Chest guard|
  Arm guard|Thigh guard|Abdominal guard|Wicketkeeping gloves|Batting gloves|Knee pads|Elbow pads|Wristband|Headband|
  Shoulder pads|Football helmet|Catcher's mask|Cleats|Football boots|Spikes|Swimming cap|Kickboard|Flippers|Snorkel|Wetsuit|
  Life jacket|Paddle|Oar|Speed bag|Hand wraps|Headgear|Focus mitts|Resistance band|Medicine ball|Exercise ball|Foam roller|
  Pull-up bar|Barbell|Kettlebell|Weight plate|Weight bench|Exercise bike|Rowing machine|Elliptical trainer|Ab roller|Hand grip|
  Trampoline|Balance beam|Parallel bars|Pommel horse|Gymnastic rings|Vaulting table|Gym mat|Hula hoop|Cue|Snooker table|
  Pool table|Cue ball|Table tennis table|Bowling ball|Bowling pin|Dart|Striker|Basketball hoop|Backboard|Goal net|Stopwatch|
  Scoreboard|Golf bag|Putter|Kit bag|Squash racket|Bowling machine|Tape ball|Golf tee|Saddle|Stirrup|Running shoes|Ball pump`,
 rare: `Recurve bow|Compound bow|Longbow|Crossbow|Air rifle|Air pistol|Clay pigeon|Foil|Épée|Sabre|Fencing mask|Lacrosse stick|
  Hurley|Sliotar|Polo mallet|Croquet mallet|Croquet hoop|Curling stone|Curling broom|Squash ball|Pickleball paddle|Padel racket|
  Netball|Handball|Water polo ball|Kicking tee|Scrum cap|Tackle bag|Goalie mask|Goalkeeper gloves|Climbing harness|Carabiner|
  Belay device|Climbing rope|Chalk bag|Climbing shoes|Crampons|Ice axe|Quickdraw|Chalk|Springboard|Diving board|Uneven bars|
  Horizontal bar|Crash mat|Crossbar|Starting pistol|Training cones|Agility ladder|Aerobic step|Battle rope|Squat rack|
  Weightlifting belt|Ankle weights|Indian club|Bodyboard|Ski goggles|Ski boots|Snowshoes|Bowling shoes|Wrestling mat|Singlet|
  Boxing ring|Kick pad|Driver|Iron|Wedge|Bridle|Riding helmet|Neck guard|Lane rope|Corner flag|Base|Armbands|Diving mask|
  Scuba tank|Golf glove|Knee brace|Paddleboard|Sight screen|Kayak|Canoe`,
 deep: `Lamé|Plastron|Home plate|Pitching machine|Batting tee|Batting cage|Flagstick|Divot tool|Ball marker|Bridge rest|Ball rack|
  Kho kho pole|Mallakhamb|Gada|Mudgar|Smith machine|Leg press|Cable machine|EZ bar|Lifting straps|Plyometric box|Weight vest|
  Push-up bars|Bosu ball|Balance board|Suspension trainer|Stair climber|Push sled|Piton|Ice screw|Ascender|Riding crop|
  Shinty stick|Cesta|Floorball stick|Sepak takraw ball|Pull buoy|Nose clip|Buoyancy compensator|Weight belt|Rosin bag|Overgrip|
  Grip tape|Ski bindings|Avalanche beacon|Ankle brace|Inner gloves|Wrist wraps|Knee sleeves|Bandy stick|Jai alai ball`,
 aliases: {
  'Racquet': 'Racket', 'Badminton racquet': 'Badminton racket', 'Tennis racquet': 'Tennis racket', 'Squash racquet': 'Squash racket',
  'Shuttle': 'Shuttlecock', 'Birdie': 'Shuttlecock', 'Shuttle cock': 'Shuttlecock', 'Soccer ball': 'Football', 'Wickets': 'Stumps', 'Wicket': 'Stumps',
  'Leg pads': 'Pads', 'Leg guards': 'Pads', 'Batting pads': 'Pads', 'Shin pads': 'Shin guards', 'Goggles': 'Swimming goggles', 'Swim goggles': 'Swimming goggles',
  'Ping pong paddle': 'Table tennis bat', 'Ping pong bat': 'Table tennis bat', 'TT bat': 'Table tennis bat', 'Table tennis racket': 'Table tennis bat', 'Table tennis paddle': 'Table tennis bat',
  'Jump rope': 'Skipping rope', 'Skipping': 'Skipping rope', 'Goal post': 'Goalpost', 'Goal': 'Goalpost', 'Running machine': 'Treadmill',
  'Flying disc': 'Frisbee', 'Heavy bag': 'Punching bag', 'Boxing bag': 'Punching bag', 'Punch bag': 'Punching bag', 'Exercise mat': 'Yoga mat',
  'Carrom': 'Carrom board', 'Baseball mitt': 'Baseball glove', 'Mitt': 'Baseball glove', "Catcher's mitt": 'Baseball glove', 'Puck': 'Hockey puck',
  'Figure skates': 'Ice skates', 'Hockey skates': 'Ice skates', 'Rollerblades': 'Roller skates', 'Inline skates': 'Roller skates', 'Ski sticks': 'Ski poles',
  'Target board': 'Archery target', 'Shot': 'Shot put', 'Hammer throw': 'Hammer', 'Baton': 'Relay baton', 'Pole vault pole': 'Vaulting pole', 'Starting block': 'Starting blocks',
  'Gum shield': 'Mouthguard', 'Gumshield': 'Mouthguard', 'Gum guard': 'Mouthguard', 'Chest pad': 'Chest guard', 'Thigh pad': 'Thigh guard',
  'Box': 'Abdominal guard', 'Groin guard': 'Abdominal guard', 'Abdo guard': 'Abdominal guard', 'Keeping gloves': 'Wicketkeeping gloves', 'Wicket keeping gloves': 'Wicketkeeping gloves',
  'Elbow guard': 'Elbow pads', 'Sweatband': 'Wristband', 'Wrist band': 'Wristband', 'Head band': 'Headband', 'Football cleats': 'Cleats',
  'Studs': 'Football boots', 'Soccer boots': 'Football boots', 'Running spikes': 'Spikes', 'Track spikes': 'Spikes', 'Swim cap': 'Swimming cap',
  'Float board': 'Kickboard', 'Swimming float': 'Kickboard', 'Swim fins': 'Flippers', 'Fins': 'Flippers', 'Life vest': 'Life jacket', 'Buoyancy aid': 'Life jacket',
  'Speed ball': 'Speed bag', 'Boxing wraps': 'Hand wraps', 'Head guard': 'Headgear', 'Boxing headgear': 'Headgear', 'Focus pads': 'Focus mitts', 'Punch mitts': 'Focus mitts',
  'Theraband': 'Resistance band', 'Exercise band': 'Resistance band', 'Swiss ball': 'Exercise ball', 'Gym ball': 'Exercise ball', 'Stability ball': 'Exercise ball', 'Yoga ball': 'Exercise ball',
  'Chin-up bar': 'Pull-up bar', 'Bench press': 'Weight bench', 'Gym bench': 'Weight bench', 'Weight plates': 'Weight plate', 'Stationary bike': 'Exercise bike', 'Spin bike': 'Exercise bike',
  'Exercise cycle': 'Exercise bike', 'Gym cycle': 'Exercise bike', 'Rowing ergometer': 'Rowing machine', 'Erg': 'Rowing machine', 'Cross trainer': 'Elliptical trainer', 'Elliptical': 'Elliptical trainer',
  'Ab wheel': 'Ab roller', 'Hand gripper': 'Hand grip', 'Grip strengthener': 'Hand grip', 'Beam': 'Balance beam', 'Still rings': 'Gymnastic rings', 'Rings': 'Gymnastic rings',
  'Vaulting horse': 'Vaulting table', 'Vault': 'Vaulting table', 'Gymnastics mat': 'Gym mat', 'Pool cue': 'Cue', 'Snooker cue': 'Cue', 'Billiard cue': 'Cue', 'Cue stick': 'Cue',
  'Billiards table': 'Pool table', 'Billiard table': 'Pool table', 'Ping pong table': 'Table tennis table', 'TT table': 'Table tennis table', 'Tenpin': 'Bowling pin', 'Skittle': 'Bowling pin',
  'Carrom striker': 'Striker', 'Basketball net': 'Basketball hoop', 'Basketball ring': 'Basketball hoop', 'Basket': 'Basketball hoop', 'Stop watch': 'Stopwatch',
  'Cricket kit bag': 'Kit bag', 'Kitbag': 'Kit bag', 'Sports bag': 'Kit bag', 'Tee': 'Golf tee', 'Taped ball': 'Tape ball', 'Horse saddle': 'Saddle',
  'Sports shoes': 'Running shoes', 'Trainers': 'Running shoes', 'Sneakers': 'Running shoes', 'Air pump': 'Ball pump',
  'Batting helmet': 'Helmet', 'Cricket helmet': 'Helmet', 'Cycling helmet': 'Helmet', 'Bicycle helmet': 'Helmet', 'Bike helmet': 'Helmet',
  'Recurve': 'Recurve bow', 'Long bow': 'Longbow', 'Air gun': 'Air rifle', 'Clay target': 'Clay pigeon', 'Epee': 'Épée', 'Saber': 'Sabre',
  'Hurling stick': 'Hurley','Polo stick': 'Polo mallet', 'Curling rock': 'Curling stone', 'Curling brush': 'Curling broom',
  'Pickleball racket': 'Pickleball paddle', 'Padel bat': 'Padel racket', 'Padel paddle': 'Padel racket', 'Rugby tee': 'Kicking tee', 'Hockey mask': 'Goalie mask',
  'Keeper gloves': 'Goalkeeper gloves', 'Goalie gloves': 'Goalkeeper gloves', 'Harness': 'Climbing harness', 'Karabiner': 'Carabiner', 'Biner': 'Carabiner', 'ATC': 'Belay device',
  'Quick draw': 'Quickdraw', 'Gym chalk': 'Chalk', 'Climbing chalk': 'Chalk', 'High bar': 'Horizontal bar', 'Asymmetric bars': 'Uneven bars', 'Crash pad': 'Crash mat', 'Landing mat': 'Crash mat',
  'Starter pistol': 'Starting pistol', 'Starter gun': 'Starting pistol', 'Cones': 'Training cones', 'Marker cones': 'Training cones', 'Speed ladder': 'Agility ladder',
  'Step platform': 'Aerobic step', 'Aerobic stepper': 'Aerobic step', 'Battle ropes': 'Battle rope', 'Power rack': 'Squat rack', 'Squat cage': 'Squat rack',
  'Lifting belt': 'Weightlifting belt', 'Gym belt': 'Weightlifting belt', 'Jori': 'Indian club', 'Boogie board': 'Bodyboard', 'Wrestling singlet': 'Singlet', 'Kick shield': 'Kick pad',
  'Golf driver': 'Driver', 'Golf iron': 'Iron', 'Golf wedge': 'Wedge', 'Sand wedge': 'Wedge', 'Pitching wedge': 'Wedge', 'Riding hat': 'Riding helmet',
  'Lane line': 'Lane rope', 'Lane divider': 'Lane rope', 'Baseball base': 'Base', 'Water wings': 'Armbands', 'Arm bands': 'Armbands', 'Swim mask': 'Diving mask', 'Dive mask': 'Diving mask', 'Scuba mask': 'Diving mask',
  'Air tank': 'Scuba tank', 'Diving cylinder': 'Scuba tank', 'Oxygen cylinder': 'Scuba tank', 'Knee support': 'Knee brace', 'Stand-up paddleboard': 'Paddleboard', 'SUP board': 'Paddleboard',
  'Sightscreen': 'Sight screen', 'Home base': 'Home plate', 'Batting T': 'Batting tee', 'Pin flag': 'Flagstick', 'Divot repairer': 'Divot tool', 'Pitch repairer': 'Divot tool',
  'Rest': 'Bridge rest', 'Snooker rest': 'Bridge rest', 'Triangle': 'Ball rack', 'Rack': 'Ball rack', 'Kho-kho pole': 'Kho kho pole', 'Mallakhamba': 'Mallakhamb', 'Mace': 'Gada', 'Mugdar': 'Mudgar', 'Mugdal': 'Mudgar',
  'Leg press machine': 'Leg press', 'Cable crossover': 'Cable machine', 'EZ curl bar': 'EZ bar', 'Wrist straps': 'Lifting straps', 'Plyo box': 'Plyometric box', 'Jump box': 'Plyometric box',
  'Weighted vest': 'Weight vest', 'Push-up handles': 'Push-up bars', 'BOSU': 'Bosu ball', 'Wobble board': 'Balance board', 'TRX': 'Suspension trainer', 'Stairmaster': 'Stair climber', 'Stepper': 'Stair climber',
  'Prowler': 'Push sled', 'Jumar': 'Ascender', 'Crop': 'Riding crop', 'Caman': 'Shinty stick', 'Xistera': 'Cesta', 'Takraw ball': 'Sepak takraw ball', 'Nose plug': 'Nose clip',
  'BCD': 'Buoyancy compensator', 'Dive weight belt': 'Weight belt', 'Rosin': 'Rosin bag', 'Avalanche transceiver': 'Avalanche beacon', 'Ankle support': 'Ankle brace', 'Pelota': 'Jai alai ball'
 }
};
