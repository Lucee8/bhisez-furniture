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

export const CATEGORY_MAP: CategoryData[] = [
  {
    name: "DOOR FRAMES",
    slug: "door-frames",
    img: "/images/DOOR AND FRAMES/set 01.WebP",
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
    img: "/images/SOFA/sofa 01.WebP",
    subCategories: [
      { name: "Sofa", count: 15, slug: "sofa", basePrice: 22000 }
    ],
    promoTitle: "Hand-Carved Living Comfort",
    promoOffer: "Upto 45% Off"
  },
  {
    name: "WOODEN CHAIRS",
    slug: "wooden-chairs",
    img: "/images/CHAIRS/chair 01.WebP",
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
    img: "/images/BEDS/open bed 01.WebP",
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
    img: "/images/DRESSING TABLE/dressing table 01.WebP",
    subCategories: [
      { name: "DT", count: 5, slug: "dt", basePrice: 11000 }
    ],
    promoTitle: "Royal Teak Vanity Dressers",
    promoOffer: "Upto 30% Off"
  },
  {
    name: "WOODEN SWINGS",
    slug: "wooden-swings",
    img: "/images/SWING/swing 01.WebP",
    subCategories: [
      { name: "Swing", count: 8, slug: "swing", basePrice: 18500 }
    ],
    promoTitle: "Solid Timber Courtyard Jhulas",
    promoOffer: "Upto 35% Off"
  },
  {
    name: "WOODEN SAFETY DOORS",
    slug: "wooden-safety-doors",
    img: "/images/DOOR AND FRAMES/safety door 01.WebP",
    subCategories: [
      { name: "Safety doors", count: 6, slug: "safety-doors", basePrice: 15500 }
    ],
    promoTitle: "Carved Hardwood Main Security Gates",
    promoOffer: "Upto 25% Off"
  },
  {
    name: "WOODEN MANDIRS",
    slug: "wooden-mandirs",
    img: "/images/MANDIR/mandir 01.WebP",
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
    img: "/images/TEAPOY/teapoy 01.WebP",
    subCategories: [
      { name: "Teapoy", count: 17, slug: "teapoy", basePrice: 5800 }
    ],
    promoTitle: "Contemporary Living Teapoys",
    promoOffer: "Upto 30% Off"
  },
  {
    name: "SOFA CUM BEDS",
    slug: "sofa-cum-beds",
    img: "/images/SOFA/sofa cum bed 01.WebP",
    subCategories: [
      { name: "Sofa cum Beds", count: 9, slug: "sofa-cum-beds", basePrice: 21500 }
    ],
    promoTitle: "Space-Saving Modern Sliders",
    promoOffer: "Upto 45% Off"
  },
  {
    name: "DINING TABLES",
    slug: "dining-tables",
    img: "/images/DINING/dining 01.WebP",
    subCategories: [
      { name: "Dining", count: 9, slug: "dining", basePrice: 29000 }
    ],
    promoTitle: "Premium 6-Seater Banquet Sets",
    promoOffer: "Upto 40% Off"
  },
  {
    name: "WARDROBES",
    slug: "wardrobes",
    img: "/images/WADROBE/wardrobe 01.WebP",
    subCategories: [
      { name: "Wardrobe", count: 12, slug: "wardrobe", basePrice: 31000 }
    ],
    promoTitle: "Multi-Compartment Wooden Armoires",
    promoOffer: "Upto 35% Off"
  },
  {
    name: "T.V UNITS",
    slug: "tv-units",
    img: "/images/TV UNIT/tv unit 01.WebP",
    subCategories: [
      { name: "T.V Unit", count: 7, slug: "tv-unit", basePrice: 14500 }
    ],
    promoTitle: "Floating Entertainment Credenzas",
    promoOffer: "Upto 35% Off"
  },
  {
    name: "CHAURANG And PAATS",
    slug: "chaurang-and-paats",
    img: "/images/CHAURANG AND PATH/chaurang 01.WebP",
    subCategories: [
      { name: "CHAURANG", count: 5, slug: "chaurang", basePrice: 2800 }
    ],
    promoTitle: "Aesthetic Pooja Worship Pedestals",
    promoOffer: "Upto 20% Off"
  },
  {
    name: "DIWANS",
    slug: "diwans",
    img: "/images/DIWAN/open diwan.WebP",
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

// ── ALL LOCAL IMAGE MAPS ──
// Folder names match exactly what is in your public/images/ directory.

const LOCAL_IMAGES: Record<string, string[]> = {

  // BEDS
  "beds-premium-bed": [
    "images/BEDS/premium bed 01.WebP",
    "images/BEDS/premium bed 02.WebP",
    "images/BEDS/premium bed 03.WebP",
    "images/BEDS/premium bed 04.WebP",
  ],
  "beds-open-bed": [
    "/images/BEDS/open bed 01.WebP",
    "/images/BEDS/open bed 02.WebP",
    "/images/BEDS/open bed 03.WebP",
    "/images/BEDS/open bed 04.WebP",
    "/images/BEDS/open bed 05.WebP",
    "/images/BEDS/open bed 06.WebP",
    "/images/BEDS/open bed 07.WebP",
    "/images/BEDS/open bed 08.WebP",
    "/images/BEDS/open bed 09.WebP",
    "/images/BEDS/open bed 10.WebP",
    "/images/BEDS/open bed 11.WebP",
  ],
  "beds-floating-bed": [
    "/images/BEDS/floating bed.WebP",
  ],
  "beds-box-bed": [
    "/images/BEDS/box bed 01.WebP",
    "/images/BEDS/box bed 02.WebP",
    "/images/BEDS/box bed 03.WebP",
    "/images/BEDS/box bed 04.WebP",
  ],
  "beds-trolley-bed": [
    "/images/BEDS/trolley bed 01.WebP",
    "/images/BEDS/trolley bed 02.WebP",
    "/images/BEDS/trolley bed 03.WebP",
    "/images/BEDS/trolley bed 04.WebP",
    "/images/BEDS/trolley bed 05.WebP",
    "/images/BEDS/trolley bed 06.WebP",
    "/images/BEDS/trolley bed 07.WebP",
    "/images/BEDS/trolley bed 08.WebP",
    "/images/BEDS/trolley bed 09.WebP",
    "/images/BEDS/trolley bed 10.WebP",
    "/images/BEDS/trolley bed 11.WebP",
    "/images/BEDS/trolley bed 12.WebP",
    "/images/BEDS/trolley bed 13.WebP",
  ],
  "beds-poster-bed": [
    "/images/BEDS/poster bed.WebP",
  ],
  "beds-bunk-bed": [
    "/images/BEDS/bunk bed 01.WebP",
  ],
  "beds-hydraulic-bed": [
    "/images/BEDS/hydrolic bed 01.WebP",
  ],

  // CHAIRS
  "wooden-chairs-cane-rocking-chair": [
    "/images/CHAIRS/cane rocking chair.WebP",
  ],
  "wooden-chairs-rocking-chair": [
    "/images/CHAIRS/cane rocking chair.WebP", // no separate rocking chair file — fallback
  ],
  "wooden-chairs-royal-chair": [
    "/images/CHAIRS/royal chair 01.WebP",
  ],
  "wooden-chairs-aaram-chair": [
    "/images/CHAIRS/aaram chair 01.WebP",
  ],
  "wooden-chairs-curve-chair": [
    "/images/CHAIRS/curve chair 01.WebP",
  ],
  "wooden-chairs-z-chair": [
    "/images/CHAIRS/z chair.WebP",
  ],
  "wooden-chairs-chair": [
    "/images/CHAIRS/chair 01.WebP",
    "/images/CHAIRS/chair 02.WebP",
    "/images/CHAIRS/chair 03.WebP",
    "/images/CHAIRS/chair 04.WebP",
    "/images/CHAIRS/chair 05.WebP",
    "/images/CHAIRS/chair 06.WebP",
    "/images/CHAIRS/chair 07.WebP",
    "/images/CHAIRS/chair 08.WebP",
  ],
  "wooden-chairs-teacher-chair": [
    "/images/CHAIRS/teacher chair 01.WebP",
    "/images/CHAIRS/teacher chair 02.WebP",
  ],

  // DOOR AND FRAMES
  "door-frames-set": Array.from({ length: 33 }, (_, i) =>
    `/images/DOOR AND FRAMES/set ${String(i + 1).padStart(2, '0')}.WebP`
  ),
  "door-frames-mandir-room": Array.from({ length: 16 }, (_, i) =>
    `/images/DOOR AND FRAMES/mandir ${String(i + 1).padStart(2, '0')}.WebP`
  ),
  "door-frames-door": Array.from({ length: 10 }, (_, i) =>
    `/images/DOOR AND FRAMES/door ${String(i + 1).padStart(2, '0')}.WebP`
  ),
  "door-frames-christian-door": [
    "/images/DOOR AND FRAMES/christian 01.WebP",
    "/images/DOOR AND FRAMES/christian 02.WebP",
  ],
  "door-frames-frame": [
    "/images/DOOR AND FRAMES/frame 01.WebP",
    "/images/DOOR AND FRAMES/frame 02.WebP",
    "/images/DOOR AND FRAMES/frame 03.WebP",
  ],

  // WOODEN SAFETY DOORS
  "wooden-safety-doors-safety-doors": Array.from({ length: 6 }, (_, i) =>
    `/images/DOOR AND FRAMES/safety door ${String(i + 1).padStart(2, '0')}.WebP`
  ),

  // DRESSING TABLE
  "dressing-table-dt": Array.from({ length: 5 }, (_, i) =>
    `/images/DRESSING TABLE/dressing table ${String(i + 1).padStart(2, '0')}.WebP`
  ),

  // WOODEN SWINGS
  "wooden-swings-swing": Array.from({ length: 8 }, (_, i) =>
    `/images/SWING/swing ${String(i + 1).padStart(2, '0')}.WebP`
  ),

  // WOODEN MANDIRS
  "wooden-mandirs-mandir": Array.from({ length: 35 }, (_, i) =>
    `/images/MANDIR/mandir ${String(i + 1).padStart(2, '0')}.WebP`
  ),
  "wooden-mandirs-rajasans": Array.from({ length: 14 }, (_, i) =>
    `/images/MANDIR/Rajasan ${String(i + 1).padStart(2, '0')}.WebP`
  ),
  "wooden-mandirs-pooja-mandir": Array.from({ length: 9 }, (_, i) =>
    `/images/MANDIR/Pooja mandir ${String(i + 1).padStart(2, '0')}.WebP`
  ),

  // TEAPOYS
  "teapoys-coffee-tables-teapoy": Array.from({ length: 17 }, (_, i) =>
    `/images/TEAPOY/teapoy ${String(i + 1).padStart(2, '0')}.WebP`
  ),

  // SOFA CUM BEDS
  "sofa-cum-beds-sofa-cum-beds": Array.from({ length: 9 }, (_, i) =>
    `/images/SOFA/sofa cum bed ${String(i + 1).padStart(2, '0')}.WebP`
  ),

  // WOODEN SOFAS
  "wooden-sofas-sofa": Array.from({ length: 15 }, (_, i) =>
    `/images/SOFA/sofa ${String(i + 1).padStart(2, '0')}.WebP`
  ),

  // DINING
  "dining-tables-dining": Array.from({ length: 9 }, (_, i) =>
    `/images/DINING/dining ${String(i + 1).padStart(2, '0')}.WebP`
  ),

  // WARDROBES
  "wardrobes-wardrobe": Array.from({ length: 12 }, (_, i) =>
    `/images/WADROBE/wardrobe ${String(i + 1).padStart(2, '0')}.WebP`
  ),

  // TV UNITS
  "tv-units-tv-unit": Array.from({ length: 7 }, (_, i) =>
    `/images/TV UNIT/tv unit ${String(i + 1).padStart(2, '0')}.WebP`
  ),

  // CHAURANG
  "chaurang-and-paats-chaurang": Array.from({ length: 5 }, (_, i) =>
    `/images/CHAURANG AND PATH/chaurang ${String(i + 1).padStart(2, '0')}.WebP`
  ),

  // DIWANS
  "diwans-open-diwan": ["/images/DIWAN/open diwan.WebP"],
  "diwans-box-diwan": ["/images/DIWAN/box diwan.WebP"],
  "diwans-trolley-diwan": ["/images/DIWAN/trolley diwan.WebP"],
  "diwans-bhaiyya-khat": ["/images/DIWAN/bhaiyya khat.WebP"],
};

const generateProducts = (): Product[] => {
  const list: Product[] = [];

  CATEGORY_MAP.forEach((cat) => {
    cat.subCategories.forEach((sub) => {
      for (let i = 1; i <= sub.count; i++) {
        const id = `${cat.slug}-${sub.slug}-${i}`;
        const numStr = i < 10 ? `0${i}` : `${i}`;

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

        // ── IMAGE LOOKUP ──
        // Key is "cat.slug-sub.slug", picks image i (1-indexed), clamps to last if fewer files
        const key = `${cat.slug}-${sub.slug}`;
        const pool = LOCAL_IMAGES[key] || [cat.img];
        const img = pool[Math.min(i - 1, pool.length - 1)];

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
          img,
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