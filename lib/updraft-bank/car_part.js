export default {
 id: 'car_part',
 title: 'Name a part of a car or bike',
 icon: '🔧',
 common: `Engine|Wheel|Tyre|Steering wheel|Brake|Seat|Door|Window|Windscreen|Headlight|Horn|Mirror|Bumper|Bonnet|Boot|Battery|
  Gear|Clutch|Accelerator|Seat belt|Wiper|Indicator|Silencer|Chain|Pedal|Handlebar|Spokes|Bell|Exhaust|Radiator|Dashboard|
  Speedometer|Fuel tank|Number plate|Airbag|Taillight|Roof|Spare tyre|Kickstand|Saddle|Mudguard|Carrier`,
 uncommon: `Gearbox|Transmission|Axle|Chassis|Suspension|Shock absorber|Spark plug|Alternator|Carburettor|Fuel injector|Piston|
  Crankshaft|Camshaft|Cylinder|Fan belt|Timing belt|Air filter|Oil filter|Fuel pump|Water pump|Starter motor|Ignition|
  Catalytic converter|Brake pad|Disc brake|Drum brake|Handbrake|Gear lever|Odometer|Tachometer|Fuel gauge|Rear-view mirror|
  Side mirror|Sunroof|Glovebox|Cup holder|Headrest|Armrest|Tailgate|Fender|Grille|Hubcap|Rim|Alloy wheel|Tube|Valve|Fog light|
  Hazard lights|Brake light|Reverse light|Car key|Key fob|Car stereo|Air conditioner|Heater|Power window|Door handle|Door lock|
  Wiper blade|Engine block|Dipstick|Flywheel|Differential|Drive shaft|Wheel bearing|Hub|Lug nut|Brake caliper|ABS|Turbocharger|
  Exhaust pipe|ECU|Fuse box|Fuse|Spoiler|Roof rack|Tow bar|Mud flap|Kick starter|Self starter|Centre stand|
  Pillion seat|Footrest|Grab rail|Crash guard|Saree guard|Chain guard|Sprocket|Brake lever|Clutch lever|Handle grip|
  Frame|Fork|Reflector|Visor|Instrument cluster|Ignition switch|Choke|Brake pedal|Clutch pedal|Floor mat|Sun visor|
  Centre console|Gear knob|Antenna|Fuel cap|Basket|Parking sensor|Reversing camera`,
 rare: `Distributor|Steering column|Steering rack|Power steering|Infotainment system|Defroster|Windshield washer|
  Radiator cap|Cylinder head|Head gasket|Oil pan|Torque converter|CV joint|Universal joint|Tie rod|Ball joint|Control arm|
  Leaf spring|Coil spring|Strut|Anti-roll bar|Brake master cylinder|Brake booster|Brake line|Supercharger|Intercooler|
  Intake manifold|Exhaust manifold|Tailpipe|Oxygen sensor|Relay|Wiring harness|Ignition coil|Glow plug|Fuel filter|Fuel line|
  Throttle body|Throttle|Timing chain|Serpentine belt|Pulley|Thermostat|Radiator hose|Expansion tank|AC compressor|Condenser|
  Cabin air filter|Blower motor|Diffuser|Tow hitch|Running board|Side skirt|Bull bar|Leg guard|Fairing|
  Derailleur|Freewheel|Cassette|Crank|Chainring|Bottom bracket|Shifter|Brake cable|Brake shoe|Seat post|Stem|Headset|
  Dynamo|Training wheels|Swingarm|Trip meter|Grab handle|Cigarette lighter|Dashcam|Wheel arch|Emblem|Undercarriage|Tread|
  Sidewall|Roof rail|Fuel door|Electric motor|Charging port|Gear cable|Toe clip|Mono-shock|Caliper brake|Valve stem|Piston ring|
  Connecting rod|Crankcase|Push rod|Rocker arm|Horn button|Wiper motor|Washer fluid reservoir`,
 deep: `Quarter glass|A-pillar|B-pillar|C-pillar|Quarter panel|Rocker panel|Bonnet scoop|Hood ornament|Washer nozzle|Floor pan|
  Firewall|Crumple zone|Roll cage|Subframe|Monocoque|Inverter|Onboard charger|Bead|ISOFIX|Ashtray|Paddle shifters|Spoke nipple|
  Quick release|V-brake|Coaster brake|Idler pulley|EGR valve|PCV valve|Heater core|Evaporator|Resonator|Splitter|
  MacPherson strut|Panhard rod|Trailing arm|Kingpin|Steering knuckle|Pitman arm|Drag link|Synchromesh|Clutch plate|
  Pressure plate|Throw-out bearing|Bell housing|Flexplate|Harmonic balancer|Timing cover|Rocker cover|Tappet|Valve spring|
  Wastegate|Blow-off valve|Throttle cable|Mass airflow sensor|Knock sensor|Crankshaft position sensor|Camshaft position sensor|
  Cam belt tensioner|Fuel rail|Fuel pressure regulator|Glow plug relay|Solenoid|Bendix drive|Slip ring|Rectifier|
  Voltage regulator|Brake proportioning valve|Wheel cylinder|Handbrake cable|Bump stop|Shock mount|Engine mount|
  Gearbox mount|Driveshaft centre bearing|Limited-slip differential|Transfer case|Half shaft|Final drive|Hub motor|
  Dropout|Chainstay|Seatstay|Top tube|Down tube|Head tube|Fork crown|Kill switch|Petcock`,
 aliases: {
  'Tire': 'Tyre', 'Tyres': 'Tyre', 'Steering': 'Steering wheel', 'Brakes': 'Brake', 'Windshield glass': 'Windscreen', 'Front glass': 'Windscreen',
  'Headlamp': 'Headlight', 'Head light': 'Headlight', 'Hooter': 'Horn', 'Wing mirror': 'Side mirror', 'ORVM': 'Side mirror', 'Door mirror': 'Side mirror',
  'Hood': 'Bonnet', 'Trunk': 'Boot', 'Dickey': 'Boot', 'Dicky': 'Boot', 'Diggy': 'Boot', 'Car battery': 'Battery', 'Battery pack': 'Battery',
  'Gas pedal': 'Accelerator', 'Throttle pedal': 'Accelerator', 'Race': 'Accelerator', 'Seatbelt': 'Seat belt', 'Safety belt': 'Seat belt', 'Wipers': 'Wiper', 'Windscreen wiper': 'Wiper', 'Windshield wiper': 'Wiper',
  'Blinker': 'Indicator', 'Turn signal': 'Indicator', 'Indicators': 'Indicator', 'Bicycle chain': 'Chain', 'Bike chain': 'Chain', 'Pedals': 'Pedal',
  'Handle': 'Handlebar', 'Handlebars': 'Handlebar', 'Spoke': 'Spokes', 'Cycle bell': 'Bell', 'Bicycle bell': 'Bell', 'Speedo': 'Speedometer', 'Speed meter': 'Speedometer',
  'Petrol tank': 'Fuel tank', 'Gas tank': 'Fuel tank', 'Tank': 'Fuel tank', 'Licence plate': 'Number plate', 'License plate': 'Number plate', 'Registration plate': 'Number plate',
  'Air bag': 'Airbag', 'Tail light': 'Taillight', 'Tail lamp': 'Taillight', 'Back light': 'Taillight', 'Rear light': 'Taillight', 'Stepney': 'Spare tyre', 'Spare wheel': 'Spare tyre', 'Spare tire': 'Spare tyre',
  'Stand': 'Kickstand', 'Kick stand': 'Kickstand', 'Bike seat': 'Saddle', 'Cycle seat': 'Saddle', 'Mud guard': 'Mudguard', 'Luggage carrier': 'Carrier', 'Rear rack': 'Carrier',
  'Gear box': 'Gearbox', 'Shock absorbers': 'Shock absorber', 'Shocks': 'Shock absorber', 'Shockers': 'Shock absorber', 'Shocker': 'Shock absorber',
  'Sparkplug': 'Spark plug', 'Plug': 'Spark plug', 'Carburetor': 'Carburettor', 'Carb': 'Carburettor', 'Injector': 'Fuel injector', 'Pistons': 'Piston',
  'Crank shaft': 'Crankshaft', 'Cam shaft': 'Camshaft', 'Cylinders': 'Cylinder', 'V-belt': 'Fan belt', 'Cam belt': 'Timing belt', 'Starter': 'Starter motor', 'Self motor': 'Starter motor',
  'Cat converter': 'Catalytic converter', 'Catalytic convertor': 'Catalytic converter', 'Brake pads': 'Brake pad', 'Disc brakes': 'Disc brake', 'Drum brakes': 'Drum brake',
  'Parking brake': 'Handbrake', 'Hand brake': 'Handbrake', 'Emergency brake': 'Handbrake', 'Gear stick': 'Gear lever', 'Gearstick': 'Gear lever', 'Stick shift': 'Gear lever', 'Gear shift': 'Gear lever',
  'Mileage meter': 'Odometer', 'Rev counter': 'Tachometer', 'RPM meter': 'Tachometer', 'Fuel meter': 'Fuel gauge', 'Fuel indicator': 'Fuel gauge', 'Rearview mirror': 'Rear-view mirror', 'Back mirror': 'Rear-view mirror',
  'Moonroof': 'Sunroof', 'Glove compartment': 'Glovebox', 'Glove box': 'Glovebox', 'Cupholder': 'Cup holder', 'Head rest': 'Headrest', 'Arm rest': 'Armrest',
  'Wing': 'Fender', 'Radiator grille': 'Grille', 'Grill': 'Grille', 'Wheel cover': 'Hubcap', 'Hub cap': 'Hubcap', 'Alloys': 'Alloy wheel', 'Mag wheel': 'Alloy wheel', 'Alloy rim': 'Alloy wheel',
  'Tyre tube': 'Tube', 'Fog lamp': 'Fog light', 'Hazards': 'Hazard lights', 'Parking lights': 'Hazard lights', 'Stop light': 'Brake light', 'Reversing light': 'Reverse light', 'Backup light': 'Reverse light',
  'Ignition key': 'Car key', 'Key': 'Car key', 'Remote key': 'Key fob', 'Music system': 'Car stereo', 'Radio': 'Car stereo', 'Head unit': 'Car stereo', 'AC': 'Air conditioner', 'Air conditioning': 'Air conditioner',
  'Electric window': 'Power window', 'Door lock actuator': 'Door lock', 'Wiper blades': 'Wiper blade', 'Block': 'Engine block', 'Oil dipstick': 'Dipstick', 'Fly wheel': 'Flywheel',
  'Diff': 'Differential', 'Driveshaft': 'Drive shaft', 'Propeller shaft': 'Drive shaft', 'Prop shaft': 'Drive shaft', 'Wheel nut': 'Lug nut', 'Lug nuts': 'Lug nut', 'Wheel bolt': 'Lug nut',
  'Caliper': 'Brake caliper', 'Anti-lock brakes': 'ABS', 'Anti-lock braking system': 'ABS', 'Turbo': 'Turbocharger', 'Exhaust system': 'Exhaust', 'Engine control unit': 'ECU', 'ECM': 'ECU',
  'Rear wing': 'Spoiler', 'Luggage rack': 'Roof rack', 'Towbar': 'Tow bar', 'Mudflap': 'Mud flap', 'Splash guard': 'Mud flap', 'Kick start': 'Kick starter', 'Kick': 'Kick starter',
  'Self start': 'Self starter', 'Electric start': 'Self starter', 'Centre-stand': 'Centre stand', 'Center stand': 'Centre stand', 'Main stand': 'Centre stand', 'Double stand': 'Centre stand',
  'Pillion': 'Pillion seat', 'Back seat': 'Pillion seat', 'Foot rest': 'Footrest', 'Engine guard': 'Crash guard', 'Saari guard': 'Saree guard', 'Sari guard': 'Saree guard',
  'Chain cover': 'Chain guard', 'Chain case': 'Chain guard', 'Sprockets': 'Sprocket', 'Brake handle': 'Brake lever', 'Clutch handle': 'Clutch lever',
  'Grips': 'Handle grip', 'Handlebar grip': 'Handle grip', 'Cycle frame': 'Frame', 'Bike frame': 'Frame', 'Forks': 'Fork', 'Telescopic forks': 'Fork', 'Front suspension': 'Fork',
  'Reflectors': 'Reflector', 'Instrument panel': 'Instrument cluster', 'Meter console': 'Instrument cluster', 'Gauge cluster': 'Instrument cluster', 'Ignition lock': 'Ignition switch',
  'Floor mats': 'Floor mat', 'Sunshade': 'Sun visor', 'Center console': 'Centre console', 'Gearknob': 'Gear knob', 'Gear shift knob': 'Gear knob', 'Aerial': 'Antenna', 'Petrol cap': 'Fuel cap', 'Gas cap': 'Fuel cap', 'Tank cap': 'Fuel cap',
  'Parking sensors': 'Parking sensor', 'Reverse camera': 'Reversing camera', 'Rear camera': 'Reversing camera', 'Backup camera': 'Reversing camera', 'Reverse parking sensor': 'Parking sensor',
  'Rotor': 'Disc brake', 'Brake rotor': 'Disc brake', 'Steering box': 'Steering rack', 'Rack and pinion': 'Steering rack', 'Power steering pump': 'Power steering',
  'Touchscreen': 'Infotainment system', 'Demister': 'Defroster', 'Defogger': 'Defroster', 'Washer': 'Windshield washer', 'Windscreen washer': 'Windshield washer',
  'Head': 'Cylinder head', 'Gasket': 'Head gasket', 'Oil sump': 'Oil pan', 'Constant velocity joint': 'CV joint', 'U-joint': 'Universal joint', 'Tie-rod': 'Tie rod', 'Tie rod end': 'Tie rod',
  'Wishbone': 'Control arm', 'A-arm': 'Control arm', 'Leaf springs': 'Leaf spring', 'Coil springs': 'Coil spring', 'Struts': 'Strut', 'Sway bar': 'Anti-roll bar', 'Stabiliser bar': 'Anti-roll bar', 'Stabilizer bar': 'Anti-roll bar',
  'Master cylinder': 'Brake master cylinder', 'Vacuum booster': 'Brake booster', 'Brake hose': 'Brake line', 'Intake': 'Intake manifold', 'Header': 'Exhaust manifold', 'Headers': 'Exhaust manifold',
  'O2 sensor': 'Oxygen sensor', 'Wire harness': 'Wiring harness', 'Coil pack': 'Ignition coil', 'Throttle valve': 'Throttle body', 'Timing chain cover': 'Timing cover',
  'Drive belt': 'Serpentine belt', 'Coolant reservoir': 'Expansion tank', 'Coolant tank': 'Expansion tank', 'AC condenser': 'Condenser', 'Pollen filter': 'Cabin air filter',
  'Rear diffuser': 'Diffuser', 'Trailer hitch': 'Tow hitch', 'Hitch': 'Tow hitch', 'Footboard': 'Running board', 'Side step': 'Running board', 'Nerf bar': 'Running board', 'Roo bar': 'Bull bar', 'Push bar': 'Bull bar',
  'Leg shield': 'Leg guard', 'Cowl': 'Fairing', 'Foot peg': 'Footrest', 'Footpeg': 'Footrest', 'Side stand': 'Kickstand', 'Inner tube': 'Tube', 'Front fork': 'Fork', 'Brake disc': 'Disc brake', 'Brake drum': 'Drum brake', 'Derailer': 'Derailleur', 'Rear derailleur': 'Derailleur', 'Front derailleur': 'Derailleur',
  'Freewheel hub': 'Freewheel', 'Cog cassette': 'Cassette', 'Crank arm': 'Crank', 'Crankset': 'Crank', 'Chain ring': 'Chainring', 'Chainwheel': 'Chainring', 'BB': 'Bottom bracket',
  'Gear shifter': 'Shifter', 'Brake shoes': 'Brake shoe', 'Seatpost': 'Seat post', 'Seat pillar': 'Seat post', 'Handlebar stem': 'Stem', 'Tyre inner tube': 'Tube',
  'Bicycle dynamo': 'Dynamo', 'Bottle dynamo': 'Dynamo', 'Stabilisers': 'Training wheels', 'Stabilizers': 'Training wheels', 'Side wheels': 'Training wheels', 'Swing arm': 'Swingarm',
  'Trip computer': 'Trip meter', 'Lighter': 'Cigarette lighter', 'Dash cam': 'Dashcam', 'Wheel well': 'Wheel arch', 'Badge': 'Emblem', 'Logo': 'Emblem', 'Underbody': 'Undercarriage', 'Tyre tread': 'Tread',
  'Roof rails': 'Roof rail', 'Fuel flap': 'Fuel door', 'Fuel lid': 'Fuel door', 'Motor': 'Electric motor', 'Charge port': 'Charging port', 'Charging socket': 'Charging port', 'Gear wire': 'Gear cable',
  'Monoshock': 'Mono-shock', 'Rim brake': 'Caliper brake', 'Tyre valve': 'Valve stem', 'Piston rings': 'Piston ring', 'Con rod': 'Connecting rod', 'Conrod': 'Connecting rod', 'Pushrod': 'Push rod', 'Muffler': 'Silencer', 'Sump': 'Oil pan', 'Brake servo': 'Brake booster', 'Lambda sensor': 'Oxygen sensor', 'Lifter': 'Tappet', 'Track rod': 'Tie rod', 'Windshield': 'Windscreen',
  'Washer reservoir': 'Washer fluid reservoir', 'Quarter window': 'Quarter glass', 'Vent window': 'Quarter glass', 'Sill': 'Rocker panel', 'Hood scoop': 'Bonnet scoop', 'Air scoop': 'Bonnet scoop',
  'Bulkhead': 'Firewall', 'Roll bar': 'Roll cage', 'Unibody': 'Monocoque', 'Tyre bead': 'Bead', 'Paddle shift': 'Paddle shifters', 'Paddles': 'Paddle shifters', 'Nipple': 'Spoke nipple', 'Quick-release skewer': 'Quick release',
  'Back pedal brake': 'Coaster brake', 'Exhaust gas recirculation valve': 'EGR valve', 'Heater matrix': 'Heater core', 'Panhard bar': 'Panhard rod', 'Steering arm': 'Steering knuckle', 'Knuckle': 'Steering knuckle',
  'Synchro': 'Synchromesh', 'Clutch disc': 'Clutch plate', 'Clutch plates': 'Clutch plate', 'Clutch cover': 'Pressure plate', 'Release bearing': 'Throw-out bearing', 'Bellhousing': 'Bell housing',
  'Crankshaft pulley': 'Harmonic balancer', 'Valve cover': 'Rocker cover', 'Tappets': 'Tappet', 'Valve lifter': 'Tappet', 'Hydraulic lifter': 'Tappet', 'Accelerator cable': 'Throttle cable',
  'MAF sensor': 'Mass airflow sensor', 'Crank sensor': 'Crankshaft position sensor', 'Cam sensor': 'Camshaft position sensor', 'Common rail': 'Fuel rail', 'Starter solenoid': 'Solenoid',
  'Regulator rectifier': 'Rectifier', 'Wheel cylinders': 'Wheel cylinder', 'Brake servo unit': 'Brake booster', 'Bump stops': 'Bump stop', 'Engine mounts': 'Engine mount', 'LSD': 'Limited-slip differential',
  'Transfer box': 'Transfer case', 'Halfshaft': 'Half shaft', 'Fork dropout': 'Dropout', 'Chain stay': 'Chainstay', 'Seat stay': 'Seatstay', 'Engine kill switch': 'Kill switch', 'Fuel tap': 'Petcock', 'Fuel cock': 'Petcock'
 }
};
