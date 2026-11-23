export default {
 id: 'stationery',
 title: 'Name an item of stationery',
 icon: '✏️',
 note: 'School or office supplies.',
 common: `Pen|Pencil|Eraser|Sharpener|Ruler|Notebook|Scissors|Glue|Stapler|Paper|Marker|Highlighter|Crayon|Sticky note|
  Paper clip|Envelope|Diary|Calculator|Sketch pen|Geometry box|Tape|Compass|Folder|File`,
 uncommon: `Ballpoint pen|Gel pen|Fountain pen|Ink|Refill|Mechanical pencil|Colour pencil|Pencil box|Pencil case|Protractor|
  Set square|Divider|Glue stick|Correction pen|Correction tape|Drawing pin|Rubber band|Binder clip|Staple|Hole punch|
  Paper cutter|Notepad|Register|Exercise book|Scrapbook|Sketchbook|Graph paper|Chart paper|Chalk|Duster|
  Whiteboard marker|Permanent marker|Clipboard|Stamp pad|Rubber stamp|Index card|Flashcard|Planner|Calendar|Bookmark|
  Label|Sticker|Tracing paper|Carbon paper|Watercolours|Paintbrush|Oil pastels|Pen stand|Slate|Whiteboard|
  Spiral notebook|Ring binder|Paperweight`,
 rare: `Fineliner|Brush pen|Calligraphy pen|Rollerball pen|Dip pen|Nib|Ink cartridge|Inkwell|Blotting paper|Pencil lead|
  Kneaded eraser|Charcoal pencil|Pastel|Stencil|French curve|T-square|Washi tape|Masking tape|Double-sided tape|Glue gun|
  Bulldog clip|Letter tray|Lever arch file|Box file|Legal pad|Staple remover|Paper guillotine|Craft knife|Cutting mat|
  Date stamp|Address book|Journal|Ledger|Receipt book|Name slip|Book cover|Poster colours|Glitter pen|Colour paper|
  Foam sheet|Tape dispenser|Drawing board|Letter opener|Slate pencil|Desk organiser|Postcard|Greeting card|Writing pad|
  Brown paper|Crepe paper|Postage stamp`,
 deep: `Quill|Reed pen|Takhti|Bone folder|Architect's scale|Rolodex|Pencil extender|Eraser shield|Document wallet|
  Mount board|Ivory sheet|Glitter glue|Cardstock|Construction paper|Wax seal|Sealing wax|Embosser|Numbering machine|
  Treasury tag|Expanding file|Page flag|Laminating pouch|Clutch pencil|Pencil grip|Rubber cement|Paper fastener|Ink eraser`,
 aliases: {
  'Biro': 'Ballpoint pen', 'Ball pen': 'Ballpoint pen', 'Ballpen': 'Ballpoint pen', 'Rubber': 'Eraser', 'Pencil eraser': 'Eraser',
  'Pencil sharpener': 'Sharpener', 'Scale': 'Ruler', 'Gum': 'Glue', 'Fevicol': 'Glue', 'Fevistick': 'Glue stick', 'Post-it': 'Sticky note',
  'Post-it note': 'Sticky note', 'Gem clip': 'Paper clip', 'Highlighter pen': 'Highlighter', 'Felt-tip pen': 'Sketch pen', 'Felt pen': 'Sketch pen',
  'Instrument box': 'Geometry box', 'Compass box': 'Geometry box', 'Geometry set': 'Geometry box', 'Math set': 'Geometry box',
  'Sellotape': 'Tape', 'Cellotape': 'Tape', 'Cello tape': 'Tape', 'Scotch tape': 'Tape', 'Sticky tape': 'Tape', 'Adhesive tape': 'Tape',
  'Pair of compasses': 'Compass', 'File folder': 'Folder', 'Manila folder': 'Folder', 'Pen refill': 'Refill', 'Lead pencil': 'Pencil',
  'Propelling pencil': 'Mechanical pencil', 'Pencil pouch': 'Pencil case', 'Coloured pencil': 'Colour pencil', 'Colored pencil': 'Colour pencil',
  'Color pencil': 'Colour pencil', 'Pencil colour': 'Colour pencil', 'Whitener': 'Correction pen', 'Tipp-Ex': 'Correction pen',
  'Correction fluid': 'Correction pen', 'Liquid paper': 'Correction pen', 'Thumbtack': 'Drawing pin', 'Thumb pin': 'Drawing pin',
  'Board pin': 'Drawing pin', 'Push pin': 'Drawing pin', 'Elastic band': 'Rubber band', 'Stapler pin': 'Staple', 'Stapler pins': 'Staple',
  'Hole puncher': 'Hole punch', 'Punching machine': 'Hole punch', 'Paper punch': 'Hole punch', 'Box cutter': 'Paper cutter',
  'Memo pad': 'Notepad', 'Scribbling pad': 'Notepad', 'Copy': 'Exercise book', 'Composition book': 'Exercise book', 'Workbook': 'Exercise book',
  'Sketch book': 'Sketchbook', 'Drawing book': 'Sketchbook', 'Graph sheet': 'Graph paper', 'Chart': 'Chart paper', 'Chart sheet': 'Chart paper',
  'Blackboard duster': 'Duster', 'Board duster': 'Duster', 'Board eraser': 'Duster', 'Whiteboard eraser': 'Duster', 'Board marker': 'Whiteboard marker',
  'Dry erase marker': 'Whiteboard marker', 'Sharpie': 'Permanent marker', 'Exam pad': 'Clipboard', 'Exam board': 'Clipboard',
  'Ink pad': 'Stamp pad', 'Flash card': 'Flashcard', 'Organiser': 'Planner', 'Organizer': 'Planner', 'Day planner': 'Planner',
  'Desk calendar': 'Calendar', 'Watercolors': 'Watercolours', 'Water colours': 'Watercolours', 'Paint box': 'Watercolours',
  'Pen holder': 'Pen stand', 'Slate board': 'Slate', 'Binder': 'Ring binder', 'Fine liner': 'Fineliner', 'Rollerball': 'Rollerball pen',
  'Nib pen': 'Dip pen', 'Ink bottle': 'Inkwell', 'Ink pot': 'Inkwell', 'Dawat': 'Inkwell', 'Blotter': 'Blotting paper',
  'Pencil leads': 'Pencil lead', 'Lead refill': 'Pencil lead', 'Putty rubber': 'Kneaded eraser', 'Putty eraser': 'Kneaded eraser',
  'Hot glue gun': 'Glue gun', 'Foldback clip': 'Bulldog clip', 'In-tray': 'Letter tray', 'Paper tray': 'Letter tray', 'Arch file': 'Lever arch file',
  'Staple puller': 'Staple remover', 'Guillotine': 'Paper guillotine', 'X-Acto knife': 'Craft knife', 'Hobby knife': 'Craft knife',
  'Self-healing mat': 'Cutting mat', 'Poster colors': 'Poster colours', 'Poster paint': 'Poster colours', 'Coloured paper': 'Colour paper',
  'Colored paper': 'Colour paper', 'EVA sheet': 'Foam sheet', 'Tape holder': 'Tape dispenser', 'Desk organizer': 'Desk organiser',
  'Desk tidy': 'Desk organiser', 'Paper knife': 'Letter opener', 'Kalam': 'Reed pen', 'Feather pen': 'Quill', 'Quill pen': 'Quill',
  'Mountboard': 'Mount board', 'Card paper': 'Cardstock', 'Sugar paper': 'Construction paper', 'Seal stamp': 'Wax seal',
  'Sticky tabs': 'Page flag', 'Page marker': 'Page flag', 'Brass fastener': 'Paper fastener', 'Split pin': 'Paper fastener',
  'Expanding folder': 'Expanding file', 'Accordion file': 'Expanding file', 'Laminating sheet': 'Laminating pouch', 'Pencil gripper': 'Pencil grip',
  'Wax crayon': 'Crayon', 'Writing paper': 'Writing pad', 'Kagaz': 'Paper', 'Kaagaz': 'Paper', 'Stamp': 'Postage stamp', 'Greetings card': 'Greeting card'
 }
};
