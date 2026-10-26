export interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  inclusions: string[];
  materials: string[];
  timeline: string;
  idealFor: string;
}

export interface ServicePhoto {
  id: string;          // Stable photo identifier
  src?: string;        // Local path for supplied photos; omitted for Unsplash samples
  kind?: 'image' | 'video';
  alt: string;         // descriptive alt text for accessibility
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'living' | 'kitchens' | 'bedrooms' | 'bespoke' | 'commercial';
  categoryLabel: string;
  location: string;
  badge: string;
  description: string;
  imageUrl: string;
  altText: string;
}

export const SITE_CONFIG = {
  brandLogoUrl: '', // Provide image path or URL if custom image logo is added
  heroVideoUrl: 'https://v1.pinimg.com/videos/mc/720p/50/a6/9b/50a69b0a769f6135fce4c0edd8ee4c53.mp4',
  heroPosterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNz-7nXNbc4y1LmQKm0NZ8UuqzqNihKYkuF_vDUx3iGV_ndHB3RybZMUG6IUWNfwNnSdYXokv29JaKic2JBSZD4lQ7scHLJjTrqcjG1SZ2tsQc8FKdceLCDgCt2bT1AS3M1GXzCXLSupIvqU9fFrAeRkF-XIdSODfYyf4mljiKi_lx4FfddTXydvVNk3kyS6MdKOSAZZUW8Ffr09Xi2zB7fsDromNMCTfvzRJyPCeP0mLMJJr-HAg6LA',
  socials: {
    instagram: 'https://www.instagram.com/sharma_.furniture_.interior/',
    facebook: 'https://www.facebook.com/sharmafurniture.interior/',
  },
  contact: {
    phone: '+91 99235 57479',
    whatsappPhoneRaw: '919923557479',
    email: 'sharmafurnituresninterior@gmail.com',
    location: 'Pune, Maharashtra',
  },
};

export const TRUST_METRICS = [
  {
    target: 30,
    symbol: '+',
    title: 'Years of Experience',
    subtitle: 'More than 30 years of furniture making in Pune',
    icon: 'architecture',
  },
  {
    target: 1500,
    symbol: '+',
    title: 'Projects Completed',
    subtitle: 'Homes and workspaces completed across Pune',
    icon: 'villa',
  },
  {
    target: 100,
    symbol: '%',
    title: 'Made by Our Team',
    subtitle: 'Our own workshop and skilled local team',
    icon: 'handyman',
  },
];

export const WHY_CHOOSE_US_PILLARS = [
  { number: '01', title: 'We Listen to You', description: 'We learn what you need, how you use your space, and what you like before we begin.' },
  { number: '02', title: 'Made to Fit', description: 'We make furniture and storage to fit your rooms and your needs.' },
  { number: '03', title: 'One Team, One Plan', description: 'Our team plans your rooms and furniture together so everything works well together.' },
  { number: '04', title: 'Help from Start to Finish', description: 'Our Pune team guides the work and keeps you updated until it is complete.' },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'home-interior-design', title: 'Home Design', icon: 'home_work',
    shortDescription: 'We plan rooms, choose colours and materials, and make your home comfortable and easy to use.',
    fullDescription: 'We help you plan a home that suits your family and the way you live. We can help with room layouts, colours, lights, and furniture. Our team works with you from the first idea to the finished home.',
    inclusions: ['Room layouts that make your home easy to use', 'Help choosing colours, lights, and finishes', 'Furniture and storage made for your home', 'Plans for lights, power points, and plumbing'],
    materials: ['Teak and oak wood finishes', 'Stone for counters and walls', 'Easy-to-clean wall paint', 'Soft fabrics and made-to-fit storage'],
    timeline: '2 to 4 weeks for planning, then project work', idealFor: 'Apartments, duplexes, penthouses, and homes in Pune'
  },
  {
    id: 'complete-home-interiors', title: 'Full Home Design', icon: 'apartment',
    shortDescription: 'We take care of your home project, from the first plans to the final details.',
    fullDescription: 'We help with the full home project so you do not have to manage many teams yourself. This can include building work, floors, lights, furniture, storage, and the final finishing touches.',
    inclusions: ['One team to guide the full project', 'Help with changes, floors, and lights', 'Made-to-fit furniture, storage, and ceilings', 'Regular updates from our Pune team', 'A final check and clean before handover'],
    materials: ['Strong, water-resistant boards', 'Teak and ash wood', 'Floor tiles in your chosen style', 'Easy-to-clean wall paint'],
    timeline: 'About 60 to 90 working days after the plan is approved', idealFor: 'New homes and full home makeovers'
  },
  {
    id: 'modular-kitchen-design', title: 'Kitchen Design', icon: 'countertops',
    shortDescription: 'Kitchens planned for everyday cooking, with useful storage and easy-to-clean surfaces.',
    fullDescription: 'We plan kitchens around the way your family cooks. Choose the layout, colours, counters, drawers, and storage that work for you. We also fit the kitchen appliances you need.',
    inclusions: ['A layout for cooking, washing, and storage', 'Drawers and pull-out shelves to keep things tidy', 'Good lighting over the counters', 'Space for your kitchen appliances'],
    materials: ['Easy-to-clean counters', 'Strong, water-resistant boards', 'Smooth-close drawers and hinges', 'Glass and painted cabinet doors'],
    timeline: 'About 3 to 4 weeks to make, then a few days to fit', idealFor: 'Families who want a useful, easy-to-clean kitchen'
  },
  {
    id: 'bedroom-interior-design', title: 'Bedroom Design', icon: 'bed',
    shortDescription: 'Comfortable bedrooms with useful storage, soft lighting, and furniture made to fit.',
    fullDescription: 'We create calm bedrooms that suit your style and daily needs. We can make the bed, headboard, bedside tables, wardrobe, dressing area, and lighting work well together.',
    inclusions: ['Made-to-fit beds and headboards', 'Bedside tables with hidden cable space', 'Soft lights for reading and relaxing', 'A dressing area with a mirror'],
    materials: ['Easy-care fabrics', 'Teak and oak wood', 'Safe wood finishes', 'Drawers that close smoothly'],
    timeline: 'About 3 to 4 weeks', idealFor: 'Main bedrooms, guest rooms, and children’s rooms'
  },
  {
    id: 'living-room-interior-design', title: 'Living Room Design', icon: 'chair',
    shortDescription: 'A welcoming living room with comfortable seating, good storage, and a style you love.',
    fullDescription: 'We plan living rooms for family time and guests. Choose from made-to-fit sofas, TV units, shelves, tables, wall finishes, and lighting that suit your home.',
    inclusions: ['Sofas and chairs made for your room', 'Feature walls in wood or stone', 'Shelves and display cabinets', 'Lighting and ceiling ideas'],
    materials: ['Stone and wood finishes', 'Comfortable, easy-care sofa fabrics', 'Strong wood shelves and panels', 'Metal handles and details'],
    timeline: 'About 3 to 5 weeks', idealFor: 'Family living rooms and homes where you host guests'
  },
  {
    id: 'office-interior-design', title: 'Office Design', icon: 'desk',
    shortDescription: 'Practical, comfortable offices with desks, storage, meeting areas, and clear lighting.',
    fullDescription: 'We plan offices that help your team work comfortably and welcome clients. We can make desks, meeting tables, shelves, storage, and waiting areas to fit your space.',
    inclusions: ['Desks with room for wires and chargers', 'Meeting tables with power access', 'Shelves, cupboards, and storage', 'Comfortable seating and waiting areas'],
    materials: ['Wood finishes in colours you choose', 'Panels that help soften noise', 'Easy-care metal and glass parts', 'Strong office furniture'],
    timeline: 'About 4 to 6 weeks', idealFor: 'Offices, meeting rooms, clinics, and workspaces'
  },
  {
    id: 'custom-furniture-design', title: 'Custom Furniture', icon: 'handyman',
    shortDescription: 'Made-to-order tables, chairs, cabinets, and other furniture for your home.',
    fullDescription: 'We make furniture to fit your room, style, and needs. Choose the size, wood, finish, and details with our team. Each piece is made in our Pune workshop.',
    inclusions: ['Furniture made to your size and style', 'Choice of wood and finish', 'Careful hand finishing', 'Strong joints made to last'],
    materials: ['Teak, oak, and other solid woods', 'Strong metal handles and hinges', 'Smooth natural or painted finishes', 'Safe finishes for dining tables'],
    timeline: 'About 2 to 3 weeks for each piece', idealFor: 'Dining tables, coffee tables, cabinets, and chairs'
  },
  {
    id: 'false-ceiling-design', title: 'Ceiling Design', icon: 'grid_goldenratio',
    shortDescription: 'Ceilings with neat lighting that add warmth and style to a room.',
    fullDescription: 'We design ceilings that make a room feel finished. Add soft lights, simple shapes, or wood details. We plan around fans, air conditioners, and other fittings.',
    inclusions: ['Ceiling designs for each room', 'Hidden lights and ceiling lights', 'Wood details if you want them', 'Space for fans and air conditioners'],
    materials: ['Ceiling boards for your room', 'Strong metal supports', 'Warm LED lights', 'Wood and wood-look finishes'],
    timeline: 'About 10 to 14 days', idealFor: 'Living rooms, dining areas, bedrooms, and offices'
  },
  {
    id: 'wardrobe-design', title: 'Wardrobes', icon: 'styler',
    shortDescription: 'Wardrobes planned around your clothes, shoes, and storage needs.',
    fullDescription: 'We make wardrobes that use your space well and keep your things easy to find. Choose shelves, drawers, hanging space, mirrors, and doors that suit you.',
    inclusions: ['Storage planned around your clothes', 'Sliding or hinged doors', 'Lights inside the wardrobe', 'Drawers for smaller items'],
    materials: ['Strong boards and wood finishes', 'Glass doors if you want them', 'Smooth-close hinges and drawers', 'Locks for private storage'],
    timeline: 'About 3 to 4 weeks', idealFor: 'Bedrooms, walk-in wardrobes, and dressing areas'
  },
  {
    id: 'commercial-interior-design', title: 'Office and Shop Design', icon: 'storefront',
    shortDescription: 'Welcoming spaces for shops, clinics, offices, and other businesses.',
    fullDescription: 'We help businesses create spaces that look good and work well every day. We can plan reception areas, shelves, seating, work areas, lighting, and signs.',
    inclusions: ['Reception desks and waiting areas', 'Shelves and display spaces', 'Easy-care floors and surfaces', 'Lighting and signs for your business'],
    materials: ['Strong, easy-to-clean surfaces', 'Floor tiles for busy spaces', 'Glass dividers and sound-softening panels', 'Good lighting that saves energy'],
    timeline: 'About 4 to 8 weeks, depending on the project', idealFor: 'Shops, clinics, salons, offices, and small businesses'
  },
  {
    id: 'tv-units', title: 'TV Units', icon: 'tv_gen',
    shortDescription: 'TV units with useful storage and a tidy place for wires and devices.',
    fullDescription: 'We make TV units to fit your room and screen. Store your devices, books, and other items, with space for wires kept out of sight.',
    inclusions: ['TV units made to fit your wall', 'Storage for devices and other items', 'Space to keep wires tidy', 'Optional wall panels and soft lighting'],
    materials: ['Wood and stone finishes', 'Strong shelves and cabinets', 'Easy-to-open drawers', 'Warm lights if you want them'],
    timeline: 'About 10 to 14 days', idealFor: 'Living rooms, family rooms, and bedrooms'
  }
];

/**
 * Service photo galleries — 15 photos per service.
 * Replace the Unsplash IDs with your own photos when ready:
 * URL format: https://images.unsplash.com/{id}?auto=format&fit=crop&w=1200&q=85
 */
export const SERVICE_PHOTOS: Record<string, ServicePhoto[]> = {
  'home-interior-design': [
    { id: 'photo-1600210492486-724fe5c67fb0', alt: 'Comfortable home with warm colours' },
    { id: 'photo-1600585154340-be6161a56a0c', alt: 'Contemporary living space with elegant furniture' },
    { id: 'photo-1600566753376-12c8ab7fb75b', alt: 'Open-plan home interior design' },
    { id: 'photo-1600573472550-8090b5e0745e', alt: 'Bright modern home with natural light' },
    { id: 'photo-1600607687939-ce8a6c25118c', alt: 'Stylish residential interior design' },
    { id: 'photo-1600585154526-990dced4db0d', alt: 'Elegant home interior with designer finishes' },
    { id: 'photo-1600607687920-4e2a09cf159d', alt: 'Modern interior with refined decor' },
    { id: 'photo-1600566753086-00f18fb6b3ea', alt: 'A comfortable home with carefully chosen furniture' },
    { id: 'photo-1600585152220-90363fe7e115', alt: 'Sophisticated home interior layout' },
    { id: 'photo-1600607687644-c7171b42498f', alt: 'Premium interior design scheme' },
    { id: 'photo-1618221195710-dd6b41faaea6', alt: 'Modern living room interior design' },
    { id: 'photo-1616486338812-3dadae4b4ace', alt: 'Warm home interior with statement pieces' },
    { id: 'photo-1616046229478-9901c5536a45', alt: 'Cozy interior with neutral palette' },
    { id: 'photo-1617806118233-18e1de247200', alt: 'Designer home with custom finishes' },
    { id: 'photo-1616594039964-ae9021a400a0', alt: 'Simple home with comfortable furniture' },
  ],
  'complete-home-interiors': [
    { id: 'photo-1600596542815-ffad4c1539a9', alt: 'Turnkey home interior transformation' },
    { id: 'photo-1600566753190-17f0baa2a6c3', alt: 'A finished home with new floors and furniture' },
    { id: 'photo-1600573472591-ee6b68d14c68', alt: 'End-to-end home interior execution' },
    { id: 'photo-1600210491892-03d54c0aaf87', alt: 'Full home renovation with designer touch' },
    { id: 'photo-1600585152915-d208bec867a1', alt: 'Finished home ready to move into' },
    { id: 'photo-1600607688969-a5bfcd646154', alt: 'A home with matching furniture, colours, and lights' },
    { id: 'photo-1600566752229-250ed79470f8', alt: 'Whole home interior transformation' },
    { id: 'photo-1600585153490-76fb20a32601', alt: 'Comprehensive interior renovation' },
    { id: 'photo-1600566753104-685f4f24cb4d', alt: 'Complete home interior with custom woodwork' },
    { id: 'photo-1600566752355-35792bedcfea', alt: 'A complete home with floors, furniture, and lights' },
    { id: 'photo-1618221195710-dd6b41faaea6', alt: 'A finished home with matching furniture' },
    { id: 'photo-1616046229478-9901c5536a45', alt: 'Full-home interior with cohesive design' },
    { id: 'photo-1600607687644-c7171b42498f', alt: 'Premium complete home renovation' },
    { id: 'photo-1600585154526-990dced4db0d', alt: 'End-to-end interior design and execution' },
    { id: 'photo-1600585154340-be6161a56a0c', alt: 'A home with furniture chosen to match' },
  ],
  'modular-kitchen-design': [
    { id: 'photo-1556911220-e15b29be8c8f', alt: 'Modern modular kitchen with handleless cabinets' },
    { id: 'photo-1556912172-45b7abe8b7e1', alt: 'Sleek kitchen design with island counter' },
    { id: 'photo-1507089947368-19c1da9775ae', alt: 'Contemporary kitchen with quartz countertop' },
    { id: 'photo-1556909212-d5b604d0c90d', alt: 'Modular kitchen with integrated appliances' },
    { id: 'photo-1600489000022-c2086d79f9d4', alt: 'Kitchen with stone counter and storage' },
    { id: 'photo-1565538810643-b5bdb714032a', alt: 'Open modular kitchen with dining connection' },
    { id: 'photo-1574739782594-db4ead022697', alt: 'Premium kitchen cabinetry and hardware' },
    { id: 'photo-1588854337221-4cf9fa96059c', alt: 'White shaker kitchen with wooden accents' },
    { id: 'photo-1541123437800-1bb1317badc2', alt: 'L-shaped modular kitchen with peninsula' },
    { id: 'photo-1520699049698-acd2fccb8cc8', alt: 'Minimalist kitchen with hidden storage' },
    { id: 'photo-1512917774080-9991f1c4c750', alt: 'Scandinavian style modular kitchen' },
    { id: 'photo-1563298723-dcfebaa392e3', alt: 'Modern kitchen with soft-close systems' },
    { id: 'photo-1584622650111-993a426fbf0a', alt: 'Dark oak kitchen with brass hardware' },
    { id: 'photo-1565183997392-2f6f122e5912', alt: 'U-shaped modular kitchen layout' },
    { id: 'photo-1576013551627-0cc20b96c2a7', alt: 'Galley kitchen with under-cabinet lighting' },
  ],
  'bedroom-interior-design': [
    { id: 'photo-1595526114035-0d45ed16cfbf', alt: 'Bedroom with a soft headboard and bed' },
    { id: 'photo-1560448204-e02f11c3d0e2', alt: 'Serene bedroom with neutral tones' },
    { id: 'photo-1505693416388-ac5ce068fe85', alt: 'Modern bedroom with floating nightstands' },
    { id: 'photo-1598928506311-c55ded91a20c', alt: 'Minimalist bedroom with warm lighting' },
    { id: 'photo-1522771739844-6a9f6d5f14af', alt: 'Contemporary bedroom interior design' },
    { id: 'photo-1578683010236-d716f9a3f461', alt: 'Cozy bedroom with textured wall panel' },
    { id: 'photo-1617325247661-675ab4b64ae2', alt: 'Master suite with bouclé headboard' },
    { id: 'photo-1566665797739-1674de7a421a', alt: 'Elegant bedroom with dressing area' },
    { id: 'photo-1595428774223-ef52624120d2', alt: 'Bedroom with bespoke wooden furniture' },
    { id: 'photo-1582719478250-c89cae4dc85b', alt: 'Calming bedroom design with linen drapes' },
    { id: 'photo-1513694203232-719a280e022f', alt: 'Hotel-style master bedroom design' },
    { id: 'photo-1615873968403-89e068629265', alt: 'Sophisticated bedroom with indirect lighting' },
    { id: 'photo-1505693314120-0d443867891c', alt: 'Bedroom with custom walk-in wardrobe' },
    { id: 'photo-1512918728675-ed5a9ecdebfd', alt: 'Modern bedroom with reading corner' },
    { id: 'photo-1540555700478-4be289fbecef', alt: 'Bedroom suite with accent feature wall' },
  ],
  'living-room-interior-design': [
    { id: 'photo-1586023492125-27b2c045efd7', alt: 'Modern living room with organic sofa' },
    { id: 'photo-1555041469-a586c61ea9bc', alt: 'Contemporary lounge with marble accent' },
    { id: 'photo-1567016432779-094069958ea5', alt: 'Living room with comfortable furniture and lights' },
    { id: 'photo-1524758631624-e2822e304c36', alt: 'Minimalist living room with statement wall' },
    { id: 'photo-1538688525198-9b88f6f53126', alt: 'Bright open-plan living area' },
    { id: 'photo-1583847268964-b28dc8f51f92', alt: 'Warm living room with wooden elements' },
    { id: 'photo-1582582621959-48d27397dc69', alt: 'Cozy living room interior design' },
    { id: 'photo-1618219908412-a29a1bb7b86e', alt: 'Elegant lounge with bookmatched marble' },
    { id: 'photo-1615874959474-d609969a20ed', alt: 'Modern living room with fluted partition' },
    { id: 'photo-1584622781564-1d987f7333c1', alt: 'Sophisticated living area with art collection' },
    { id: 'photo-1583845112203-29329902332e', alt: 'Luxe living room with curved sofa' },
    { id: 'photo-1513519245088-0e12902e5a38', alt: 'Living room with magnetic track lighting' },
    { id: 'photo-1493663284031-b7e3aefcae8e', alt: 'Contemporary living space with natural materials' },
    { id: 'photo-1502672260266-1c1ef2d93688', alt: 'Open living room with floor-to-ceiling windows' },
    { id: 'photo-1519710164239-da123dc03ef4', alt: 'Penthouse living room with statement pieces' },
  ],
  'office-interior-design': [
    { id: 'photo-1497366216548-37526070297c', alt: 'Office with wood shelves and desk' },
    { id: 'photo-1497366811353-6870744d04b2', alt: 'Contemporary boardroom with conference table' },
    { id: 'photo-1497215728101-856f4ea42174', alt: 'Open-plan corporate office design' },
    { id: 'photo-1497366754035-f200968a6e72', alt: 'Professional office interior with workstations' },
    { id: 'photo-1504384308090-c894fdcc538d', alt: 'Creative studio office space' },
    { id: 'photo-1517502884422-41eaead166d4', alt: 'Executive cabin with custom desk' },
    { id: 'photo-1577495508048-b635879837f1', alt: 'Home office with built-in shelving' },
    { id: 'photo-1522071820081-009f0129c71c', alt: 'Collaborative workspace with acoustic panels' },
    { id: 'photo-1503899036084-c55cdd92da26', alt: 'Law firm office with dark wood accents' },
    { id: 'photo-1556761175-5973dc0f32e7', alt: 'Modern corporate office with glass partitions' },
    { id: 'photo-1568992687947-868a62a9f521', alt: 'Boutique office with bespoke cabinetry' },
    { id: 'photo-1572021335469-31706a17aaef', alt: 'Executive boardroom with fluted oak cladding' },
    { id: 'photo-1527192491265-7e15c55b1ed2', alt: 'Professional workspace with integrated tech' },
    { id: 'photo-1564069114553-7215e1ff1890', alt: 'Minimalist executive office design' },
    { id: 'photo-1606857521015-7f9fcf423740', alt: 'Premium office with reception lounge' },
  ],
  'custom-furniture-design': [
    { id: 'photo-1533090161767-e6ffed986c88', alt: 'Handcrafted solid teak dining table' },
    { id: 'photo-1592078615290-033ee584e267', alt: 'Wooden table for the living room' },
    { id: 'photo-1503602642458-232111445657', alt: 'Custom upholstered lounge chair' },
    { id: 'photo-1530629013299-6cb10d168419', alt: 'Artisan crafted coffee table' },
    { id: 'photo-1567538096630-e0c55bd6374c', alt: 'Wooden cabinet with storage' },
    { id: 'photo-1549497538-303791108f95', alt: 'Handmade live-edge wooden table' },
    { id: 'photo-1532323544230-7191fd51bc1b', alt: 'Solid wood bed frame' },
    { id: 'photo-1581539250439-c96689b516dd', alt: 'Wood furniture with brass handles' },
    { id: 'photo-1540574163026-643ea20ade25', alt: 'Handcrafted wardrobe with solid wood doors' },
    { id: 'photo-1615066390971-03e4e1c36ddf', alt: 'Custom bookcase and display unit' },
    { id: 'photo-1594026112284-02bb6f3352fe', alt: 'Chair with a soft fabric seat' },
    { id: 'photo-1586023492125-27b2c045efd7', alt: 'Custom sofa with teak frame' },
    { id: 'photo-1555041469-a586c61ea9bc', alt: 'Handcrafted lounge furniture set' },
    { id: 'photo-1567016432779-094069958ea5', alt: 'Artisanal wooden furniture piece' },
    { id: 'photo-1524758631624-e2822e304c36', alt: 'Custom furniture in a home' },
  ],
  'false-ceiling-design': [
    { id: 'photo-1600585154526-990dced4db0d', alt: 'Gypsum false ceiling with cove lighting' },
    { id: 'photo-1600607687920-4e2a09cf159d', alt: 'Modern false ceiling with shadow gap reveals' },
    { id: 'photo-1600566753190-17f0baa2a6c3', alt: 'Ceiling with built-in lights' },
    { id: 'photo-1618221195710-dd6b41faaea6', alt: 'Ceiling design with warm indirect cove' },
    { id: 'photo-1616486338812-3dadae4b4ace', alt: 'Wooden rafter baffle ceiling design' },
    { id: 'photo-1524758631624-e2822e304c36', alt: 'Living room ceiling with track lighting' },
    { id: 'photo-1586023492125-27b2c045efd7', alt: 'Interior with magnetic track ceiling system' },
    { id: 'photo-1600210492486-724fe5c67fb0', alt: 'Room with a ceiling and soft lights' },
    { id: 'photo-1567016432779-094069958ea5', alt: 'Open-plan space with false ceiling zones' },
    { id: 'photo-1616046229478-9901c5536a45', alt: 'Bedroom false ceiling with LED strips' },
    { id: 'photo-1617806118233-18e1de247200', alt: 'Dining area false ceiling design' },
    { id: 'photo-1616594039964-ae9021a400a0', alt: 'Decorative ceiling with timber elements' },
    { id: 'photo-1600585154340-be6161a56a0c', alt: 'Commercial atrium false ceiling' },
    { id: 'photo-1583847268964-b28dc8f51f92', alt: 'Master bedroom tray ceiling design' },
    { id: 'photo-1615874959474-d609969a20ed', alt: 'Ceiling with vents for air conditioning' },
  ],
  'wardrobe-design': [
    { id: 'photo-1590490360182-c33d57733427', alt: 'Custom walk-in wardrobe with glass profiles' },
    { id: 'photo-1571508601891-ca5e7a713859', alt: 'Wardrobe with inside lights' },
    { id: 'photo-1595526114035-0d45ed16cfbf', alt: 'Bedroom with built-in wardrobe' },
    { id: 'photo-1522771739844-6a9f6d5f14af', alt: 'Walk-in closet with wooden shelving' },
    { id: 'photo-1560448204-e02f11c3d0e2', alt: 'Master bedroom wardrobe integration' },
    { id: 'photo-1598928506311-c55ded91a20c', alt: 'Wardrobe with smoked glass sliding doors' },
    { id: 'photo-1566665797739-1674de7a421a', alt: 'Dressing room with velvet-lined drawers' },
    { id: 'photo-1505693416388-ac5ce068fe85', alt: 'Modular wardrobe with full-height profile' },
    { id: 'photo-1578683010236-d716f9a3f461', alt: 'Custom wardrobe with sensor lighting' },
    { id: 'photo-1595428774223-ef52624120d2', alt: 'Wardrobe with jewelry and accessory pullouts' },
    { id: 'photo-1615873968403-89e068629265', alt: 'Walk-in wardrobe with storage' },
    { id: 'photo-1617325247661-675ab4b64ae2', alt: 'Wardrobe with fluted glass panels' },
    { id: 'photo-1513694203232-719a280e022f', alt: 'Fitted wardrobe in master suite' },
    { id: 'photo-1582719478250-c89cae4dc85b', alt: 'Contemporary wardrobe with push-to-open' },
    { id: 'photo-1505693314120-0d443867891c', alt: 'Wardrobe with a lock' },
  ],
  'commercial-interior-design': [
    { id: 'photo-1542744173-8e7e53415bb0', alt: 'Modern commercial reception design' },
    { id: 'photo-1517048676732-d65bc937f952', alt: 'Retail showroom interior design' },
    { id: 'photo-1497366216548-37526070297c', alt: 'Corporate office commercial interior' },
    { id: 'photo-1503899036084-c55cdd92da26', alt: 'Law firm commercial interior design' },
    { id: 'photo-1522071820081-009f0129c71c', alt: 'Collaborative commercial workspace' },
    { id: 'photo-1556761175-5973dc0f32e7', alt: 'Modern commercial space with glass partitions' },
    { id: 'photo-1568992687947-868a62a9f521', alt: 'Boutique clinic interior design' },
    { id: 'photo-1572021335469-31706a17aaef', alt: 'High-end commercial boardroom' },
    { id: 'photo-1527192491265-7e15c55b1ed2', alt: 'Commercial interior with brand identity' },
    { id: 'photo-1564069114553-7215e1ff1890', alt: 'Premium hospitality lounge interior' },
    { id: 'photo-1606857521015-7f9fcf423740', alt: 'Salon with waiting seats and work areas' },
    { id: 'photo-1504384308090-c894fdcc538d', alt: 'Creative studio commercial space' },
    { id: 'photo-1517502884422-41eaead166d4', alt: 'Executive commercial cabin design' },
    { id: 'photo-1497215728101-856f4ea42174', alt: 'Commercial workspace with acoustic treatment' },
    { id: 'photo-1577495508048-b635879837f1', alt: 'Commercial interior with display niches' },
  ],
  'tv-units': [
    { id: 'photo-1618221195710-dd6b41faaea6', alt: 'Floating marble TV console with timber slats' },
    { id: 'photo-1586023492125-27b2c045efd7', alt: 'Living room with integrated TV wall unit' },
    { id: 'photo-1555041469-a586c61ea9bc', alt: 'TV unit with storage and tidy wires' },
    { id: 'photo-1567016432779-094069958ea5', alt: 'TV wall with acoustic backdrop' },
    { id: 'photo-1524758631624-e2822e304c36', alt: 'Media wall with cantilevered console' },
    { id: 'photo-1615874959474-d609969a20ed', alt: 'TV unit with storage and soft lights' },
    { id: 'photo-1616046229478-9901c5536a45', alt: 'Entertainment wall with hidden compartments' },
    { id: 'photo-1616594039964-ae9021a400a0', alt: 'Minimalist TV unit with soft-close storage' },
    { id: 'photo-1600210492486-724fe5c67fb0', alt: 'TV wall with storage and shelves' },
    { id: 'photo-1600585154340-be6161a56a0c', alt: 'TV console with fluted teak panel' },
    { id: 'photo-1583847268964-b28dc8f51f92', alt: 'Living room TV wall with art niches' },
    { id: 'photo-1600607687644-c7171b42498f', alt: 'Custom TV unit with Calacatta marble' },
    { id: 'photo-1616486338812-3dadae4b4ace', alt: 'Entertainment wall with ambient lighting' },
    { id: 'photo-1617806118233-18e1de247200', alt: 'Media unit with soundbar and console' },
    { id: 'photo-1582582621959-48d27397dc69', alt: 'TV wall in modern living room' },
  ],
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'project-1',
    title: 'Living Room with Wood Divider',
    category: 'living',
    categoryLabel: 'Living Room',
    location: 'Pune',
    badge: 'Home design',
    description: 'A wooden divider and comfortable seating make this living room warm and welcoming.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBI6wDAU3aMSWhXX_hOHgsNMQZhI3lAXnVPEqI-uSvGkxy-V2wszNpwtO7rayDUyeVyX5EdazsjmdT9yEHqtYMyo5UXWGR2Pcy_LZPcQ5hTMNTbzEa6EF1GEA9Q8FQ-s9ascW1p5wKxdcXinI2dTDdm68AF6Hsw6rkndNSXWXDjNLOFaWmTCQJGF5bLV1mI8e6CzSU1tGBk1j8bNVYKzCqpj-IulxYuuQluhbO3PF3bdFgowH6WWjFmXw',
    altText: 'A Pune living room with a wood divider and comfortable seating.'
  },
  {
    id: 'project-2',
    title: 'Kitchen with Stone Island',
    category: 'kitchens',
    categoryLabel: 'Modular Kitchen',
    location: 'Kitchen',
    badge: 'Kitchen storage',
    description: 'A stone kitchen island with easy-to-use drawers and cabinets.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQZJnM3aNHvFCs4oKEDJLBJ1FLbxqd8Kqi8OA1I42vuB-tH2LVXIKr1jMLBK8y2-tYeyW9t9BFYCdId-ucw3lmsZGShlno6DX13pDAVXUdW8K1-BifNLUHNukq_9ihLsyDnmKsZU7ylWIpN1q1zoJLG5AC5_QU_LboUMy0JJGXRzoE6duiNEY0bnzAtLkr7_hcEc4tXpQIDLK126AX3JH-2_w5BZKIfo0cYLjwmV8Lhor230Y0Ja5Q0g',
    altText: 'A modern Pune kitchen with a stone island and dark wood cabinets.'
  },
  {
    id: 'project-3',
    title: 'Calm Main Bedroom',
    category: 'bedrooms',
    categoryLabel: 'Bedroom',
    location: 'Bedroom',
    badge: 'Made-to-fit bed',
    description: 'A soft headboard and reading lights make this bedroom calm and comfortable.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAthnUkE4v7GT58-Qm9aoS-kUUTGEVBrhjfLoZCCjB7wTkhsC6GtsZ3ByQWLz_rsghutDepZ3HuiDROdQ8qzOaNe5PlmGGsAVFcTH7tZMXuT8lLVzggtwrukdzSO4Ab_nB9Hisfnsp9l6NXHfofLnsLBJaSratv29AqpTqTKkGlXrpgaESpr3CHl-rcM_d396-uY9RaEcF6noxZy9mgPppiJwPtGx_1X6rJOG0DNWM4PfDJmUwzGULorA',
    altText: 'A calm Pune bedroom with a soft headboard and reading lights.'
  },
  {
    id: 'project-4',
    title: 'Teak Dining Table',
    category: 'bespoke',
    categoryLabel: 'Dining Table',
    location: 'Dining room',
    badge: 'Made-to-order table',
    description: 'A large wooden dining table for family meals and gatherings.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFYQE8WJ4IVPyA81Mn92CkdbCBc_kYVRGEb0kZ5nKG7WkkRFb_VL88VYI5hMQQN0f3aup2dsEg85fDt1DTe1TzA_k3XrnO8FdOBg5QU_mxQm-a4t5jsq12jX2JFHGjfqxXjMfEPc8dn_aPf3F0j3QyiB_W65FqeP8SB5ZDVEHsVD6IzwYKABdOZ9XSgU5op5HHdC2wWm-h4AGIJ5CDHiYm9OqKVXqjQZWAHVfFuI5M6cSYfo9PbVHgVg',
    altText: 'A large teak dining table made for family meals.'
  },
  {
    id: 'project-5',
    title: 'Office Meeting Room',
    category: 'commercial',
    categoryLabel: 'Office',
    location: 'Office',
    badge: 'Wood wall panels',
    description: 'Wood walls, a meeting table, and space for presentations.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYRtWSh5frPxn9QZ15eqS5muqlo3cblrGk5x7YQmSoN9rTfd4e-t2OvXwoBnsSCETXYtH14hJvIrFBNdK6rl1rK__zfqx0QGxEdoHS6fqVuIUtbPJwr6FFKIWp1a8jbyg4HgvTlxAUMriv9K-WTfy1T6G6FuDpZjoeFmwT0Z2cc2NlGY4-n4POYy7i3nqbjdvcK0ahQfEE9BX7n90GhZagtkKP2Qb0kkEzxncL4H2Qx12M3BifyK2rwg',
    altText: 'A Pune office meeting room with wood walls and a large table.'
  },
  {
    id: 'project-6',
    title: 'Walk-in Wardrobe',
    category: 'bedrooms',
    categoryLabel: 'Wardrobe',
    location: 'Wardrobe',
    badge: 'Glass doors and lights',
    description: 'A walk-in wardrobe with sliding doors and soft lights.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFrXX1jW6buYyDwswR8XfqheigEJELeklove3Th0k-85zqU-5lXDl_nw8lHeGJz_552tLvXfulGdTg8pJRqJHrQIk7MK1XUVq-NQkCjZNugYmb9UkZHBYfiGt2fd3Mcl1_olQp_P1e0VPF1yPqj9sbd1jMhITj34Y51VBrwDvX8im99tEcmdtNwne51tskdN3qnTnMGMDHGHC6yeKdZ_tM6zpHt2tsVm0GddLRxqTbSlJhJmpgfdyVxA',
    altText: 'A walk-in wardrobe in Pune with glass doors and soft lights.'
  },
  {
    id: 'project-7',
    title: 'TV Unit with Wood Panels',
    category: 'living',
    categoryLabel: 'TV Unit',
    location: 'Living room',
    badge: 'Stone and wood',
    description: 'A TV unit with storage, a stone top, and wood panels.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnXHbwxljsW9Dilc_4XHOejbKlEYrpGShkG_VHt4JKro7yKff9UWQqZwDCojJd6_V_-pC2cp-KXtlzFxW3QeTBefbdExPhWTKE-9OKhx6KVyfTpVHPSuIJGaFqqwCtMCaAV0kH0xyFrupCvKODdCZZnNqdkwce424BIAoN7qA4HK6-2w3UWgtgwtuZ6MdiR8mOlAOLY6_pj1LWdSyMu0dU5O4tvx5mb3MLmj2hFK6iOrCNGCv7Q6RMgg',
    altText: 'A Pune living room with a TV unit, storage, and wood panels.'
  },
  {
    id: 'project-8',
    title: 'Oak Kitchen with Pantry',
    category: 'kitchens',
    categoryLabel: 'Kitchen',
    location: 'Kitchen',
    badge: 'Extra storage',
    description: 'Oak cabinets, extra storage, and a stone counter make this kitchen easy to use.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR8vxgkjfCvvEILgUmC-eznfPqoQ0guv7_yoqHYY1JnV0aX8YJhFOF6QtFeCaZ_FHNc7-OyqhxS2t6ozQPIObW0shroG0_0xRb2glZGTitXdJSLu5KfSaUmXsWJ_x4jO3oGLCLO63NgE7QXWA6-sRftiPnW4eCk1wLI7mrQC5XEb0yTESKA0lzNeK7lIrvZzXTVQ2iJJO8pa5inOxZiGWwhzeKwEG-brw6rwxqL0sqkDy40L_iRLnDmg',
    altText: 'A Pune kitchen with oak cabinets and extra storage.'
  },
  {
    id: 'project-9',
    title: 'Bedroom with Natural Wood',
    category: 'bedrooms',
    categoryLabel: 'Bedroom',
    location: 'Wood furniture',
    badge: 'Made-to-fit bed',
    description: 'A wooden bed, bedside tables, and warm lights create a calm bedroom.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBc_0LPzmp4VYSDrJBQkcb9csErKCvl1igJ2Huw3GNvdOUWkMyWNNc6MG5BhuDCn--j8kLLkd_ulhsgIAnMX43MTxFJTEIaqpiz-rJtRprtw0oZzAqBD7RsrTasy3qjgUiNw3_AWCPMA3s_UBid4H1j1aywkjBwaxKeqvIj2rCu5yaQ5dXnTPIBpEnX9TRpgwVd4AfkF_0KJjUcT5VT525iZukzgO7pFZmhPB1SMEgEVZl2uVTVRpepqw',
    altText: 'A Pune bedroom with a wooden bed, bedside tables, and soft curtains.'
  },
  {
    id: 'project-10',
    title: 'Curved Wooden Cabinet',
    category: 'bespoke',
    categoryLabel: 'Furniture',
    location: 'Living room',
    badge: 'Wooden cabinet',
    description: 'A curved wooden cabinet with sliding doors and metal handles.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvdz6PoWj6huOrbe8Frbbgg5dKwA0sT-8h4T5wXsCuR2cebenMsP-uGt12gwCva9Q2sFvNHUDrLumLZqf_JfiHa8HF12z-5E5jZMDrRoIzgUpn0Z76tDIJoDje_32GEovotatRsD41FEKWa1WesX_Da9NCXyQVJtJsFy-5bx68oZ6qGN-3NIt6y9xSYx8rprFSqNFikDwpmHJ1VdR9lOwZW50YoYZX04dgbtMxMjZcJOVbPf8wlfp9qg',
    altText: 'A curved wooden cabinet with sliding doors and metal feet.'
  },
  {
    id: 'project-11',
    title: 'Office with Wooden Shelves',
    category: 'commercial',
    categoryLabel: 'Office',
    location: 'Office',
    badge: 'Wooden shelves',
    description: 'Wooden walls, a large desk, and shelves for books and files.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9lBWe1xXk00tfnKdHifuE72ppVWjx12xfiV_f6bskr5nasLKybDqu9Z8WTD38lW1o0MNallv95PAXcS4-zlKRYWIfhV_FlRyYEAnfN3waPqvzOH5AJuXPSrtfzA9kN4PiHp9QJktM8u-2LISNZU6swJPWy5BTk3q3dcXsxrWZMDALB-f7ULLZ7p1R1GCOSajTc6p0UsylkqfUEX4E5J2gzDckCFlxze7DhYsTimBUSlBm3_tIaVBsEg',
    altText: 'A Pune office with wooden shelves, a desk, and soft ceiling lights.'
  },
  {
    id: 'project-12',
    title: 'Wooden Entrance Cabinet',
    category: 'bespoke',
    categoryLabel: 'Entrance',
    location: 'Entrance',
    badge: 'Wood and metal',
    description: 'A wooden entrance table with a large mirror and soft lights.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCal4agp1aomBqKhSX-lxhSoHm644cMSQ0RKYxp_mwwW68cyGDIKONucNeTjwvZ37-J8k_QmgVjqWOKAsr2ngOiIaTRJIoEEVyzHFye43pm4fcuAaR-g9VcRUvLG1VzeUZ18MxaK8rppd9BVpYXpEDhTjgIeMXthLFFHejsPBzkK1orrljIzPOBPeCKTnaYid75hF9ib1vcW8eFoybwMK6dGGQtctA16nbSLzrZE2etcRDC8vBTyp66DQ',
    altText: 'A Pune entrance with a wooden table and a large mirror.'
  }
];
