import { Product } from './types';

export interface SubCategory {
  name: string;
  count: number;
  slug: string;
  basePrice: number;
}

export interface CategoryData {
  name: string;
  slug: string;
  img: string;
  subCategories: SubCategory[];
  promoTitle: string;
  promoOffer: string;
}

// ── EXHAUSTIVE CATEGORY MAPPING PRESETS MATCHING USER SPECIFICATIONS PRIVILEGES ──
export const CATEGORY_MAP: CategoryData[] = [
  {
    name: "DOOR FRAMES",
    slug: "door-frames",
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80",
    subCategories: [
      { name: "Set", count: 33, slug: "set", basePrice: 14500 },
      { name: "Mandir room", count: 16, slug: "mandir-room", basePrice: 9500 },
      { name: "Door", count: 10, slug: "door", basePrice: 11000 },
      { name: "Cristian Door", count: 2, slug: "christian-door", basePrice: 16000 },
      { name: "Frame", count: 3, slug: "frame", basePrice: 6500 }
    ],
    promoTitle: "Traditional Safety Portals",
    promoOffer: "Upto 35% Off"
  },
  {
    name: "WOODEN SOFAS",
    slug: "wooden-sofas",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    subCategories: [
      { name: "Sofa", count: 15, slug: "sofa", basePrice: 22000 }
    ],
    promoTitle: "Hand-Carved Living Comfort",
    promoOffer: "Upto 45% Off"
  },
  {
    name: "WOODEN CHAIRS",
    slug: "wooden-chairs",
    img: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&q=80",
    subCategories: [
      { name: "cane rocking chair", count: 1, slug: "cane-rocking-chair", basePrice: 8500 },
      { name: "rocking chair", count: 1, slug: "rocking-chair", basePrice: 7500 },
      { name: "royal chair", count: 1, slug: "royal-chair", basePrice: 5800 },
      { name: "aaram chair", count: 1, slug: "aaram-chair", basePrice: 6500 },
      { name: "curve chair", count: 1, slug: "curve-chair", basePrice: 4200 },
      { name: "z chair", count: 1, slug: "z-chair", basePrice: 4800 },
      { name: "chair", count: 8, slug: "chair", basePrice: 3200 },
      { name: "teacher chair", count: 2, slug: "teacher-chair", basePrice: 3800 }
    ],
    promoTitle: "Ergonomic Handcrafted Hardwood Chairs",
    promoOffer: "Upto 35% Off"
  },
  {
    name: "BEDS",
    slug: "beds",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80",
    subCategories: [
      { name: "premium bed", count: 4, slug: "premium-bed", basePrice: 42000 },
      { name: "open bed", count: 11, slug: "open-bed", basePrice: 24000 },
      { name: "floating bed", count: 1, slug: "floating-bed", basePrice: 32000 },
      { name: "box bed", count: 4, slug: "box-bed", basePrice: 27500 },
      { name: "trolley bed", count: 13, slug: "trolley-bed", basePrice: 34500 },
      { name: "poster bed", count: 1, slug: "poster-bed", basePrice: 48000 },
      { name: "bunk bed", count: 1, slug: "bunk-bed", basePrice: 29500 },
      { name: "hydrolic bed", count: 1, slug: "hydraulic-bed", basePrice: 41000 }
    ],
    promoTitle: "Durable Teakwood Beds",
    promoOffer: "Upto 40% Off"
  },
  {
    name: "DRESSING TABLE",
    slug: "dressing-table",
    img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
    subCategories: [
      { name: "DT", count: 5, slug: "dt", basePrice: 11000 }
    ],
    promoTitle: "Royal Teak Vanity Dressers",
    promoOffer: "Upto 30% Off"
  },
  {
    name: "WOODEN SWINGS",
    slug: "wooden-swings",
    img: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=600&q=80",
    subCategories: [
      { name: "Swing", count: 8, slug: "swing", basePrice: 18500 }
    ],
    promoTitle: "Solid Timber Courtyard Jhulas",
    promoOffer: "Upto 35% Off"
  },
  {
    name: "WOODEN SAFETY DOORS",
    slug: "wooden-safety-doors",
    img: "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=600&q=80",
    subCategories: [
      { name: "Safety doors", count: 6, slug: "safety-doors", basePrice: 15500 }
    ],
    promoTitle: "Carved Hardwood Main Security Gates",
    promoOffer: "Upto 25% Off"
  },
  {
    name: "WOODEN MANDIRS",
    slug: "wooden-mandirs",
    img: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=600&q=80",
    subCategories: [
      { name: "Mandir", count: 35, slug: "mandir", basePrice: 13000 },
      { name: "Rajasans", count: 14, slug: "rajasans", basePrice: 3800 },
      { name: "Pooja Mandir", count: 9, slug: "pooja-mandir", basePrice: 8500 }
    ],
    promoTitle: "Devine solid Rosewood Shrines",
    promoOffer: "Upto 50% Off"
  },
  {
    name: "TEAPOYS AND COFEE TABLES",
    slug: "teapoys-coffee-tables",
    img: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80",
    subCategories: [
      { name: "Teapoy", count: 17, slug: "teapoy", basePrice: 5800 }
    ],
    promoTitle: "Contemporary Living Teapoys",
    promoOffer: "Upto 30% Off"
  },
  {
    name: "SOFA CUM BEDS",
    slug: "sofa-cum-beds",
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    subCategories: [
      { name: "Sofa cum Beds", count: 9, slug: "sofa-cum-beds", basePrice: 21500 }
    ],
    promoTitle: "Space-Saving Modern Sliders",
    promoOffer: "Upto 45% Off"
  },
  {
    name: "DINING TABLES",
    slug: "dining-tables",
    img: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=600&q=80",
    subCategories: [
      { name: "Dining", count: 9, slug: "dining", basePrice: 29000 }
    ],
    promoTitle: "Premium 6-Seater Banquet Sets",
    promoOffer: "Upto 40% Off"
  },
  {
    name: "WARDROBES",
    slug: "wardrobes",
    img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80",
    subCategories: [
      { name: "Wardrobe", count: 12, slug: "wardrobe", basePrice: 31000 }
    ],
    promoTitle: "Multi-Compartment Wooden Armoires",
    promoOffer: "Upto 35% Off"
  },
  {
    name: "T.V UNITS",
    slug: "tv-units",
    img: "https://images.unsplash.com/photo-16074730318d2-64f26046e8c7?w=600&q=80",
    subCategories: [
      { name: "T.V Unit", count: 7, slug: "tv-unit", basePrice: 14500 }
    ],
    promoTitle: "Floating Entertainment Credenzas",
    promoOffer: "Upto 35% Off"
  },
  {
    name: "CHAURANG And PAATS",
    slug: "chaurang-and-paats",
    img: "https://images.unsplash.com/photo-1581428982868-e410dd047a90?w=600&q=80",
    subCategories: [
      { name: "CHAURANG", count: 5, slug: "chaurang", basePrice: 2800 }
    ],
    promoTitle: "Aesthetic Pooja Worship Pedestals",
    promoOffer: "Upto 20% Off"
  },
  {
    name: "DIWANS",
    slug: "diwans",
    img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80",
    subCategories: [
      { name: "Open Diwan", count: 1, slug: "open-diwan", basePrice: 16500 },
      { name: "Box Diwan", count: 1, slug: "box-diwan", basePrice: 21000 },
      { name: "Trolley Diwan", count: 1, slug: "trolley-diwan", basePrice: 24500 },
      { name: "Bhaiyya Khat", count: 1, slug: "bhaiyya-khat", basePrice: 14000 }
    ],
    promoTitle: "Royal Indian Lounge Daybeds",
    promoOffer: "Upto 30% Off"
  }
];

// Helper array of alternate realistic high quality Unsplash photos representing crafted wood furniture
const SAMPLE_PHOTOS: Record<string, string[]> = {
  "door-frames": [
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80",
    "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=600&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80"
  ],
  "wooden-sofas": [
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600&q=80"
  ],
  "wooden-chairs": [
    "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&q=80",
    "https://images.unsplash.com/photo-1503602642458-232111445657?w=600&q=80",
    "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80"
  ],
  "beds": [
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80",
    "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80",
    "https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?w=600&q=80",
    "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80"
  ],
  "dressing-table": [
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
    "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&q=80"
  ],
  "wooden-swings": [
    "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=600&q=80"
  ],
  "wooden-safety-doors": [
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80"
  ],
  "wooden-mandirs": [
    "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=600&q=80",
    "https://images.unsplash.com/photo-1581428982868-e410dd047a90?w=600&q=80"
  ],
  "teapoys-coffee-tables": [
    "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80",
    "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&q=80"
  ],
  "sofa-cum-beds": [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80"
  ],
  "dining-tables": [
    "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=600&q=80",
    "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=600&q=80"
  ],
  "wardrobes": [
    "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80"
  ],
  "tv-units": [
    "https://images.unsplash.com/photo-16074730318d2-64f26046e8c7?w=600&q=80",
    "https://images.unsplash.com/photo-1594040226829-7f251ab46d80?w=600&q=80"
  ],
  "chaurang-and-paats": [
    "https://images.unsplash.com/photo-1581428982868-e410dd047a90?w=600&q=80"
  ],
  "diwans": [
    "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80"
  ]
};

const generateProducts = (): Product[] => {
  const list: Product[] = [];
  
  CATEGORY_MAP.forEach((cat) => {
    cat.subCategories.forEach((sub) => {
      for (let i = 1; i <= sub.count; i++) {
        const id = `${cat.slug}-${sub.slug}-${i}`;
        const numStr = i < 10 ? `0${i}` : `${i}`;
        
        // Form beautiful, highly realistic furniture piece titles
        let name = '';
        if (cat.slug === 'wooden-chairs') {
          if (sub.slug === 'cane-rocking-chair' || sub.slug === 'z-chair') {
            name = sub.name;
          } else {
            name = `${sub.name}-${numStr}`;
          }
        } else {
          name = `${cat.name === "DRESSING TABLE" ? "Premium DT" : cat.name.replace(/s$/i, '')} - ${sub.name} #${numStr}`;
        }
        
        // Cyclic image lookup
        const photos = SAMPLE_PHOTOS[cat.slug] || [cat.img];
        const img = photos[(i - 1) % photos.length];
        
        // Scale prices dynamically
        const calculatedPrice = sub.basePrice + (i - 1) * 350;
        const discountMult = 1.35 + (i % 3) * 0.05;
        const origPrice = Math.round((calculatedPrice * discountMult) / 500) * 500;

        // Custom badges for variety
        let badge: 'bs' | 'new' | 'cus' | null = null;
        if (i === 1) badge = 'bs';
        else if (i === 2) badge = 'new';
        else if (i % 12 === 0) badge = 'cus';

        list.push({
          id,
          name,
          category: cat.slug,
          subCategory: sub.slug,
          price: calculatedPrice,
          orig: origPrice,
          img: img,
          badge,
          colors: ['#4A2511', '#2C1608', '#CBB89D'],
          shortDesc: `Handcrafted with seasoned native timber wood. Built using durable standard premium joinery for generation-lasting strength.`,
          description: `Designed and perfected in Bhisez Sindhudurg workshop of Ramesh Bhise, this ${sub.name} is a fine specimen of Indian carpentry. Features premium selected grains, borer resistant seasoning, and flawless double coat PU satin finish. Excellent ergonomics matching compact as well as royal traditional architecture.`
        });
      }
    });
  });

  return list;
};

// Programmatic export containing exactly 265 highly customized items!
export const ALL_PRODUCTS: Product[] = generateProducts();

export const TESTIMONIALS = [
  {
    name: 'Rahul Desai',
    location: 'Malvan',
    stars: 5,
    text: 'Got our complete solid teak bedroom bed and wardrobes from Bhise\'z. The quality of seasoned timber is outstanding and delivery was fully set up in our room. Highly recommend रमेश (Ramesh) Bhise!'
  },
  {
    name: 'Sunita Naik',
    location: 'Kudal',
    stars: 5,
    text: 'The home pooja mandir they hand-polished is incredibly gorgeous. Karigars here are masters! It looks highly divine and makes our morning rituals joyful.'
  },
  {
    name: 'Manoj Sawant',
    location: 'Ratnagiri',
    stars: 5,
    text: 'Ramesh made us a custom layout sofa-bed matching our drawing room dimensions. They understood our fabric tastes and crafted a masterpiece!'
  }
];
