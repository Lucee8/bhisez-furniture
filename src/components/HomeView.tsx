import React, { useState, useEffect, useMemo } from 'react';
import { ViewState, Product } from '../types';
import { ALL_PRODUCTS, TESTIMONIALS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  MessageCircle,
  Truck, 
  Award,
  Store,
  ChevronRight,
  Sparkles,
  CheckCircle,
  ArrowRight,
  ChevronLeft,
  X,
  Star,
  FileText,
  DollarSign,
  Calculator,
  UserCheck,
  Percent,
  Check,
  CornerDownRight,
  Youtube,
  Plus,
  Trash2,
  Play,
  Film
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: ViewState) => void;
  onSelectCategory: (category: string) => void;
  onSelectProduct: (productId: string | number) => void;
  onToggleWishlist: (productId: string | number) => void;
  wishlist: (string | number)[];
}

// 1. Summer Season Sale Left Main Banners
const SUMMER_HERO_SLIDES = [
  {
    id: 1,
    title: 'SUMMER Season Sale',
    subtitle: 'Dining Sets',
    priceInfo: 'Starting From ₹49,989',
    img: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=1200&q=80',
    linkCategory: 'dining'
  },
  {
    id: 2,
    title: 'HERITAGE Craftsmanship',
    subtitle: 'Safety Doors',
    priceInfo: 'Starting From ₹16,000',
    img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&q=80',
    linkCategory: 'doors'
  },
  {
    id: 3,
    title: 'SACRED Divine Spaces',
    subtitle: 'Teak Mandirs',
    priceInfo: 'Starting From ₹12,500',
    img: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1200&q=80',
    linkCategory: 'mandir'
  }
];

// 2. Beautiful Categories Grid matching Wooden Street screenshot with the requested 14 categories
const IMG_GRID_CATEGORIES = [
  { 
    label: 'Beds', 
    img: '/images/BED/trolley bed 07.webP', 
    categoryKey: 'beds', 
    filters: ['All', 'Bedroom'] 
  },
  { 
    label: 'Wooden Sofas', 
    img: '/images/SOFA/sofa 05.webP', 
    categoryKey: 'wooden-sofas', 
    filters: ['All', 'Living'] 
  },
  { 
    label: 'Wooden Chairs', 
    img: '/images/CHAIR/z chair.webP', 
    categoryKey: 'wooden-chairs', 
    filters: ['All', 'Living'] 
  },
  { 
    label: 'DoorFrames', 
    img: '/images/DOOR AND FRAMES/set 01.webP', 
    categoryKey: 'door-frames', 
    filters: ['All', 'Doors & Puja'] 
  },
  { 
    label: 'Dressing Table', 
    img: '/images/DRESSING TABLE/dressing table 02.webP', 
    categoryKey: 'dressing-table', 
    filters: ['All', 'Bedroom'] 
  },
  { 
    label: 'Wooden Swings', 
    img: '/images/SWING/swing 02.webP', 
    categoryKey: 'wooden-swings', 
    filters: ['All', 'Living'] 
  },
  { 
    label: 'Wooden Safety Doors', 
    img: '/images/DOOR AND FRAMES/safety door 04.webP', 
    categoryKey: 'wooden-safety-doors', 
    filters: ['All', 'Doors & Puja'] 
  },
  { 
    label: 'Wooden Mandirs', 
    img: '/images/MANDIR/mandir 35.webP', 
    categoryKey: 'wooden-mandirs', 
    filters: ['All', 'Doors & Puja'] 
  },
  { 
    label: 'Teapoys & Coffee Tables', 
    img: '/images/TEAPOY/teapoy 07.webP', 
    categoryKey: 'teapoys-coffee-tables', 
    filters: ['All', 'Living'] 
  },
  { 
    label: 'Sofa Cum Beds', 
    img: '/images/SOFA/sofa cum bed 03.webP', 
    categoryKey: 'sofa-cum-beds', 
    filters: ['All', 'Living', 'Bedroom'] 
  },
  { 
    label: 'Dining Tables', 
    img: '/images/DINING/dining 07.webP', 
    categoryKey: 'dining-tables', 
    filters: ['All', 'Dining'] 
  },
  { 
    label: 'Wardrobes', 
    img: '/images/WARDROBE/wardrobe 11.webP', 
    categoryKey: 'wardrobes', 
    filters: ['All', 'Bedroom'] 
  },
  { 
    label: 'TV Units', 
    img: '/images/TV UNIT/tv unit 01.webP', 
    categoryKey: 'tv-units', 
    filters: ['All', 'Living'] 
  },
  { 
    label: 'Chaurang & Paats', 
    img: '/images/CHAURANG AND PATH/chaurang 03.webP', 
    categoryKey: 'chaurang-and-paats', 
    filters: ['All', 'Doors & Puja'] 
  },
  { 
    label: 'Diwans', 
    img: '/images/DIWAN/trolley diwan.webP', 
    categoryKey: 'diwans', 
    filters: ['All', 'Living'] 
  }
];

// 3. Stories Behind the Style vertical items
const STYLE_STORIES = [
  {
    name: 'Adolph 7-Drawer Wooden Chest Of Drawers (Honey Finish)',
    price: 31999,
    oldPrice: 53999,
    discount: '41% OFF',
    stars: 5,
    count: 198,
    img: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=500&q=80',
    id: 'bed-3'
  },
  {
    name: 'Lotus Premium Sheesham Wood Bed with Drawer Storage (King Size)',
    price: 54999,
    oldPrice: 101999,
    discount: '46% OFF',
    stars: 5,
    count: 198,
    img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=500&q=80',
    id: 'bed-5'
  },
  {
    name: 'Shriyam Modern 6 Seater Sheesham Wood Dining Set with Mishaan Chairs',
    price: 149999,
    oldPrice: 249999,
    discount: '40% OFF',
    stars: 5,
    count: 80,
    img: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=500&q=80',
    id: 'table-1'
  },
  {
    name: 'Shashwat 2 Seater Sheesham Wood Cane Swing Chair (Sand Grey)',
    price: 86999,
    oldPrice: 171999,
    discount: '49% OFF',
    stars: 5,
    count: 184,
    img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&q=80',
    id: 'bed-10'
  },
  {
    name: 'Oxford 3 Seater Fabric Sofa (Indigo Blue Premium Matte Finish)',
    price: 43999,
    oldPrice: 90999,
    discount: '51% OFF',
    stars: 5,
    count: 80,
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80',
    id: 'sofa-1'
  }
];

// 4. Discover whats new items
const NEW_DISCOVERIES = [
  {
    name: 'Ayaana Sheesham Wood 3 Seater Sofa Cum Bed with Cane Weaving',
    price: 67499,
    oldPrice: 146999,
    discount: '54% OFF',
    stars: 5,
    count: 146,
    img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80',
    id: 'sofa-2'
  },
  {
    name: 'Albus 3 Seater Fabric Sofa (Cotton Canvas, Jade Ivory Tweed)',
    price: 37999,
    oldPrice: 63999,
    discount: '41% OFF',
    stars: 5,
    count: 14,
    img: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=500&q=80',
    id: 'sofa-3'
  },
  {
    name: 'Calmora Engineered Wood Bed with Upholstered Headboard Storage',
    price: 19999,
    oldPrice: 41999,
    discount: '52% OFF',
    stars: 5,
    count: 143,
    img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&q=80',
    id: 'bed-2'
  },
  {
    name: 'Avira Premium Upholstery Lounge Chair (Salmon Pink / Brass Caps)',
    price: 11999,
    oldPrice: 31999,
    discount: '63% OFF',
    stars: 5,
    count: 20,
    img: 'https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=500&q=80',
    id: 'sofa-1'
  },
  {
    name: 'Eka Premium Mango Wood Console Table with Natural Cane detailing',
    price: 31499,
    oldPrice: 58999,
    discount: '46% OFF',
    stars: 5,
    count: 48,
    img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500&q=80',
    id: 'bed-10'
  }
];

export default function HomeView({
  onNavigate,
  onSelectCategory,
  onSelectProduct,
  onToggleWishlist,
  wishlist
}: HomeViewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [gridFilter, setGridFilter] = useState('All');

  // Interactive YouTube Shorts State initialized from localStorage with curated defaults
  const [youtubeShorts, setYoutubeShorts] = useState<{ id: string; title: string }[]>(() => {
    const saved = localStorage.getItem('bhisez_youtube_shorts_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        // Fallback to defaults
      }
    }
    return [
      { id: 'IhRpzKqwhkk', title: 'Solid Wood Sofa with Premium Box Storage' },
      { id: 'Hh1f27Wzk6o', title: 'Classic Walnut Finished Queen Bed Setup' },
      { id: '_fk3E6tfGgo', title: 'Space-Saving Solid Wood Dining Set' },
      { id: '9wp9xMHV-nI', title: 'Elegant Handcrafted Sheesham Center Table' },
      { id: 'i5kUP5kOyrA', title: 'Solid Pine Wooden Wardrobe with Sliders' }
    ];
  });

  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);
  const shortsContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollShorts = (direction: 'left' | 'right') => {
    if (shortsContainerRef.current) {
      const { scrollLeft, clientWidth } = shortsContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      shortsContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Auto-sync our Shorts list back to user's localStorage
  useEffect(() => {
    localStorage.setItem('bhisez_youtube_shorts_v2', JSON.stringify(youtubeShorts));
  }, [youtubeShorts]);

  const filteredGridCategories = useMemo(() => {
    return IMG_GRID_CATEGORIES.filter(item => item.filters.includes(gridFilter));
  }, [gridFilter]);

  // Proposal State for Pitch Assistant
  const [showPitchDrawer, setShowPitchDrawer] = useState(false);
  const [clientName, setClientName] = useState('Bhise\'z Furniture Showroom');
  const [clientLocation, setClientLocation] = useState('Malvan, Sindhudurg');
  const [featuresList, setFeaturesList] = useState([
    { id: 'landing', label: 'Main Website Platform & Landing Grid', price: 12000, checked: true, required: true },
    { id: 'beds-cat', label: 'Seasoned Wood Catalog & Multi-Filters', price: 3500, checked: true },
    { id: 'wa-enquiry', label: 'Ramesh Chat Direct Whatsapp Custom Order Form', price: 2500, checked: true },
    { id: 'showroom', label: 'Showroom Map & Succinct Interactive Guides', price: 2000, checked: true },
    { id: 'wishlist', label: 'User Wishlist Storage & Dynamic Shopping Bag System', price: 2500, checked: true },
    { id: 'admin', label: 'Secured Premium Member Account Login Console', price: 1500, checked: false },
    { id: 'seo', label: 'Mobile-first Optimization & Malvan Local Google Map SEO Boost', price: 1000, checked: true },
  ]);

  // Calculate dynamic sales quote
  const activeFeaturesTotal = featuresList
    .filter(f => f.checked)
    .reduce((sum, f) => sum + f.price, 0);

  // Hook to slide left hero carousel automatically
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SUMMER_HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SUMMER_HERO_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SUMMER_HERO_SLIDES.length) % SUMMER_HERO_SLIDES.length);
  };


  const toggleFeature = (id: string) => {
    setFeaturesList(prev => prev.map(f => {
      if (f.id === id && !f.required) {
        return { ...f, checked: !f.checked };
      }
      return f;
    }));
  };

  return (
    <div className="bg-[#FCFAF8] min-h-screen text-stone-800 pb-20">
      
      {/* ── SECTION 1: SUMMER HERO CAROUSEL & STACKED BANNERS (BENTO HERO) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Left Carousel slider (2/3 width) */}
          <div className="lg:col-span-2 relative h-[300px] sm:h-[460px] rounded-2xl overflow-hidden bg-stone-100 shadow-xs border border-stone-200 group">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img 
                  src={SUMMER_HERO_SLIDES[currentSlide].img} 
                  alt="Summer Season Sale" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Transparent Gradients with Custom Wood Typography Accent Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
                
                {/* Sale text content */}
                <div className="absolute inset-y-0 left-0 pl-8 pr-4 flex flex-col justify-center text-white z-10 max-w-lg">
                  {/* Glowing text banner */}
                  <div className="flex items-center gap-1.5 text-amber-300 text-xs font-black tracking-widest uppercase mb-1 drop-shadow-md">
                    <span className="w-2 h-2 rounded-full bg-[#E52E2D] animate-ping"></span>
                    SUMMER SALE ACTIVED
                  </div>
                  
                  <h1 className="font-serif text-3xl sm:text-5xl font-black italic tracking-tight text-white mb-1 drop-shadow-md">
                    {SUMMER_HERO_SLIDES[currentSlide].title}
                  </h1>
                  
                  <h2 className="text-xl sm:text-3xl font-black text-[#FBBD18] uppercase tracking-normal mb-1 sm:mb-2 font-sans">
                    {SUMMER_HERO_SLIDES[currentSlide].subtitle}
                  </h2>
                  
                  <p className="text-amber-50 text-base sm:text-lg font-bold font-mono tracking-wide bg-stone-900/40 w-fit px-2 py-0.5 rounded border border-amber-300/20 mb-4 sm:mb-6">
                    {SUMMER_HERO_SLIDES[currentSlide].priceInfo}
                  </p>
                  
                  <button
                    onClick={() => onSelectCategory(SUMMER_HERO_SLIDES[currentSlide].linkCategory)}
                    className="w-fit bg-[#E52E2D] hover:bg-red-600 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded shadow-lg transition-transform hover:scale-102 active:scale-98 cursor-pointer"
                  >
                    Shop This Deal &nbsp;→
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider edge arrows */}
            <button 
              onClick={handlePrevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-25 w-9 h-9 sm:w-11 sm:h-11 bg-white/95 hover:bg-white text-stone-800 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer opacity-80 hover:opacity-100"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleNextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-25 w-9 h-9 sm:w-11 sm:h-11 bg-white/95 hover:bg-white text-stone-800 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer opacity-80 hover:opacity-100"
            >
              <ChevronRight size={20} />
            </button>

            {/* Indicator dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
              {SUMMER_HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${i === currentSlide ? 'bg-[#FBBD18] w-6' : 'bg-white/55 hover:bg-white'}`}
                ></button>
              ))}
            </div>
          </div>

          {/* Right Stacked Two Smaller Banners (1/3 width) */}
          <div className="grid grid-rows-2 gap-4 h-full">
            
            {/* Top Right Banner: Mattress */}
            <div 
              onClick={() => onSelectCategory('bed')}
              className="relative rounded-2xl overflow-hidden bg-stone-800 shadow-2xs border border-stone-200 h-[142px] sm:h-[222px] cursor-pointer group"
            >
              <img 
                src="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80" 
                alt="Mattress Promo" 
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-stone-900/35"></div>
              
              <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-center text-white">
                <h3 className="font-sans text-stone-100 text-xs font-bold uppercase tracking-widest">Mattresses</h3>
                <h4 className="font-serif text-lg sm:text-2xl font-black text-white italic tracking-tight leading-none my-0.5">
                  Sleep. Sink. Snooze
                </h4>
                <p className="text-[10px] text-stone-200 leading-tight max-w-[210px] hidden sm:block">
                  Comfort that adapts to every move you make
                </p>
                <div className="mt-2 sm:mt-3 text-xs font-black text-[#FBBD18] uppercase tracking-wider">
                  Starting From <span className="text-sm">₹5,599*</span>
                </div>
              </div>
            </div>

            {/* Bottom Right Banner: Massive Price Drop Calmora Bed */}
            <div 
              onClick={() => onSelectCategory('bed')}
              className="relative rounded-2xl overflow-hidden bg-stone-800 shadow-2xs border border-stone-200 h-[142px] sm:h-[222px] cursor-pointer group"
            >
              <img 
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80" 
                alt="Bed Promo Deal" 
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-orange-950/80 via-amber-950/40 to-transparent"></div>
              
              <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-center text-white">
                <div className="text-[9px] font-black tracking-widest text-[#FBBD18] uppercase">Limited Time Deal</div>
                <h4 className="font-serif text-xl sm:text-3xl font-black italic text-[#FBBD18] leading-none mb-1">
                  MASSIVE
                </h4>
                <div className="font-sans text-sm sm:text-lg font-black tracking-normal uppercase leading-none">
                  PRICE DROP
                </div>
                
                <div className="mt-3 text-[10px] sm:text-xs">
                  <span className="text-stone-300">Calmora Bed: </span>
                  <span className="line-through text-stone-400">₹24,999</span>
                </div>
                <div className="text-xs sm:text-sm font-black text-white">
                  NOW AT <span className="text-[#FBBD18] text-base sm:text-lg">₹19,999</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── CAROUSEL INFO STRIP ── */}
      <div className="bg-[#1A1209] py-3.5 mt-10 overflow-hidden border-b border-[#3D2B1F]">
        <div className="flex whitespace-nowrap animate-slide-track">
          <div className="flex space-x-16 text-stone-300 text-xs tracking-wider uppercase font-bold">
            <span className="flex items-center gap-1.5"><Truck size={14} className="text-[#FBBD18]" /> FREE DELIVERY ACROSS SINDHUDURG, GOA, RATNAGIRI</span>
            <span className="flex items-center gap-1.5"><Award size={14} className="text-[#FBBD18]" /> 36-MONTH SOLID WOOD WARRANTY</span>
            <span className="flex items-center gap-1.5"><MessageCircle size={14} className="text-[#FBBD18]" /> EASY WHATSAPP QUOTES & CUSTOMISATION</span>
            <span className="flex items-center gap-1.5"><Store size={14} className="text-[#FBBD18]" /> 2 SHOWROOMS: MALVAN & SUKALWAD</span>
          </div>
          <div className="flex space-x-16 text-stone-300 text-xs tracking-wider uppercase font-bold pl-16">
            <span className="flex items-center gap-1.5"><Truck size={14} className="text-[#FBBD18]" /> FREE DELIVERY ACROSS SINDHUDURG, GOA, RATNAGIRI</span>
            <span className="flex items-center gap-1.5"><Award size={14} className="text-[#FBBD18]" /> 36-MONTH SOLID WOOD WARRANTY</span>
            <span className="flex items-center gap-1.5"><MessageCircle size={14} className="text-[#FBBD18]" /> EASY WHATSAPP QUOTES & CUSTOMISATION</span>
            <span className="flex items-center gap-1.5"><Store size={14} className="text-[#FBBD18]" /> 2 SHOWROOMS: MALVAN & SUKALWAD</span>
          </div>
        </div>
      </div>


      {/* ── SECTION 2: HIGH-FIDELITY CATEGORIES GRID MATCHING SCREENSHOT ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        
        {/* Dynamic Category Filter Pills */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-8 sm:mb-10 select-none">
          {['All', 'Living', 'Bedroom', 'Dining', 'Doors & Puja'].map((filter) => (
            <button
              key={filter}
              onClick={() => setGridFilter(filter)}
              className={`px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wide border transition-all duration-300 cursor-pointer ${
                gridFilter === filter 
                  ? 'border-orange-600 text-orange-600 bg-white font-black shadow-xs' 
                  : 'border-stone-300 text-stone-700 bg-white hover:border-orange-500 hover:text-orange-600'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* 12-Item Round/Rectangular Category Cards Grid in 6 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-5 gap-y-7">
          <AnimatePresence mode="popLayout">
            {filteredGridCategories.map((item) => (
              <motion.div
                layout
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                onClick={() => onSelectCategory(item.categoryKey)}
                className="flex flex-col items-center group cursor-pointer text-center"
              >
                {/* Visual Rounded Rect image frame */}
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-stone-50 border border-[#E9E4DB] shadow-2xs group-hover:border-[#E8950B] group-hover:shadow-md transition-all duration-300">
                  <img 
                    src={item.img} 
                    alt={item.label} 
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Elegant bold category title */}
                <span className="mt-3 text-[#3D2B1F] font-bold text-[10.5px] sm:text-xs tracking-wider uppercase group-hover:text-orange-600 transition-colors select-none font-sans">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </section>

            {/* ── SECTION: YOUTUBE SHORTS SHOWCASE CAROUSEL ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-22 border-t border-stone-100 pt-14 mb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#3D2B1F]">
              Where Craftsmanship Comes Alive
            </h2>
            <p className="text-stone-500 text-xs mt-1">
              Explore handcrafted furniture making, detailing, and modern space transformations.
            </p>
          </div>
          
          {/* Carousel Next/Prev Controls */}
          <div className="flex gap-2">
            <button
              onClick={() => scrollShorts('left')}
              className="p-2.5 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 hover:text-stone-900 shadow-2xs transition-all active:scale-95 cursor-pointer flex items-center justify-center select-none"
              title="Scroll Left"
            >
              <ChevronLeft size={16} className="stroke-[2.5]" />
            </button>
            <button
              onClick={() => scrollShorts('right')}
              className="p-2.5 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 hover:text-stone-900 shadow-2xs transition-all active:scale-95 cursor-pointer flex items-center justify-center select-none"
              title="Scroll Right"
            >
              <ChevronRight size={16} className="stroke-[2.5]" />
            </button>
          </div>
        </div>

        {youtubeShorts.length === 0 ? (
          <div className="bg-stone-50 border border-stone-200 border-dashed rounded-2xl p-10 text-center flex flex-col items-center justify-center max-w-md mx-auto">
            <Film size={36} className="text-stone-300 mb-2.5" />
            <h4 className="font-serif text-base font-bold text-stone-800">No Showcase Videos Saved</h4>
            <p className="text-stone-500 text-[11px] mt-1 m-4 leading-relaxed">
              No YouTube Shorts links available to build the design portfolio.
            </p>
          </div>
        ) : (
          <div 
            ref={shortsContainerRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 select-none no-scrollbar snap-x snap-mandatory scroll-smooth"
          >
            {youtubeShorts.map((short) => {
              const isPlaying = activePlayingId === short.id;
              return (
                <div 
                  key={short.id}
                  className="min-w-[200px] sm:min-w-[240px] md:min-w-[260px] max-w-[270px] flex-shrink-0 group relative flex flex-col rounded-2xl overflow-hidden bg-stone-900 border border-stone-200/60 aspect-[9/16] shadow-2xs hover:shadow-lg transition-all duration-300 snap-start"
                >
                  <div className="relative flex-1 bg-black">
                    {isPlaying ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${short.id}?autoplay=1&mute=1&rel=0`}
                        title={short.title}
                        className="w-full h-full border-none absolute inset-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <>
                        {/* High-quality YouTube poster thumbnail */}
                        <img 
                          src={`https://img.youtube.com/vi/${short.id}/hqdefault.jpg`}
                          alt={short.title}
                          className="w-full h-full object-cover opacity-85 group-hover:opacity-70 group-hover:scale-102 transition-all duration-500"
                          referrerPolicy="no-referrer"
                        />

                        {/* Visual Centered Play Circle */}
                        <div 
                          onClick={() => setActivePlayingId(short.id)}
                          className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer z-10"
                        >
                          <div className="p-3.5 bg-white/10 backdrop-blur-md text-white rounded-full group-hover:bg-red-650 group-hover:scale-110 transition-all duration-300 shadow-md">
                            <Play size={18} className="fill-current stroke-none translate-x-[1px]" />
                          </div>
                        </div>

                        {/* Info banner at foot */}
                        <div className="absolute bottom-0 left-0 right-0 p-3.5 bg-gradient-to-t from-black via-black/70 to-transparent z-10 pointer-events-none text-left">
                          <p className="text-[9px] uppercase font-bold tracking-widest text-white/50">TIMBER SPOTLIGHT</p>
                          <h4 className="text-white text-xs font-bold mt-0.5 line-clamp-2">
                            {short.title}
                          </h4>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>


      {/* ── SECTION 3: "Stories Behind the Style" (Upright vertical elegant catalog cards slider) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-18 sm:mt-24 border-t border-stone-100 pt-14">
        
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-950">
              Stories Behind the Style
            </h2>
            <p className="text-stone-500 text-xs mt-1">
              Handpicked heirloom collection for traditional Konkan and western modern aesthetics
            </p>
          </div>
          
          <button 
            onClick={() => onNavigate('beds')}
            className="text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 rounded-full p-2 text-xs flex items-center gap-1.5 transition-all shadow-2xs font-bold leading-none cursor-pointer"
          >
            <span>Explore All Stories</span>
            <ArrowRight size={14} className="text-[#FBBD18]" />
          </button>
        </div>

        {/* Horizontal scrollbar with custom product cards */}
        <div className="flex gap-6 overflow-x-auto pb-4 select-none no-scrollbar snap-x">
          {STYLE_STORIES.map((product, idx) => (
            <div 
              key={idx}
              onClick={() => onSelectProduct(product.id)}
              className="min-w-[240px] sm:min-w-[280px] max-w-[290px] bg-white rounded-xl border border-stone-200/80 shadow-2xs hover:shadow-md transition-all overflow-hidden cursor-pointer group flex flex-col snap-start"
            >
              {/* Product vertical photo layout */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-stone-50">
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(product.id);
                  }}
                  className="absolute top-3 right-3 p-2 bg-white/95 hover:bg-white rounded-full shadow-xs text-stone-500 transition-all cursor-pointer active:scale-95"
                >
                  <Heart 
                    size={15} 
                    className={wishlist.includes(product.id) ? 'fill-red-500 stroke-red-500 text-red-500' : 'text-stone-600'} 
                  />
                </button>
                <div className="absolute top-3 left-3 bg-[#E52E2D] text-white text-[9px] font-black px-2 py-0.5 rounded tracking-normal">
                  {product.discount}
                </div>
              </div>

              {/* Product labels */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-stone-800 line-clamp-2 leading-tight group-hover:text-[#E8950B] transition-colors h-10">
                    {product.name}
                  </h3>
                  
                  {/* Rating Stars row */}
                  <div className="flex items-center gap-1 mt-2 mb-3">
                    <div className="flex text-amber-400">
                      {[...Array(product.stars)].map((_, i) => (
                        <Star key={i} size={11} className="fill-current text-amber-500" />
                      ))}
                    </div>
                    <span className="text-[10px] text-stone-400 font-semibold">({product.count})</span>
                  </div>
                </div>

                {/* Pricing detail row */}
                <div className="border-t border-stone-100 pt-3 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wide leading-none">Deal Price</span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-sm sm:text-base font-black text-stone-900 leading-none">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] sm:text-xs line-through text-stone-400 font-semibold leading-none">
                        ₹{product.oldPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                  
                  <span className="text-[11px] font-black text-orange-600 group-hover:translate-x-1 transition-transform">
                    Enquire &nbsp;→
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </section>


      {/* ── SECTION 4: "Discover what's new" section (Image 4) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-18 sm:mt-24">
        
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-950">
              Discover what's new
            </h2>
            <p className="text-stone-500 text-xs mt-1">
              Freshly designed coastal-resilient premium sofas, armchairs, and engineered box modular beds
            </p>
          </div>
          
          <button 
            onClick={() => onNavigate('beds')}
            className="text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 rounded-full p-2 text-xs flex items-center gap-1.5 transition-all shadow-2xs font-bold leading-none cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight size={14} className="text-[#FBBD18]" />
          </button>
        </div>

        {/* Horizontal carousel shelf */}
        <div className="flex gap-6 overflow-x-auto pb-4 select-none no-scrollbar snap-x">
          {NEW_DISCOVERIES.map((product, idx) => (
            <div 
              key={idx}
              onClick={() => onSelectProduct(product.id)}
              className="min-w-[245px] sm:min-w-[285px] max-w-[290px] bg-white rounded-xl border border-stone-200/85 shadow-2xs hover:shadow-md transition-all overflow-hidden cursor-pointer group flex flex-col snap-start"
            >
              {/* Image Frame */}
              <div className="relative h-48 sm:h-52 overflow-hidden bg-stone-50">
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                  referrerPolicy="no-referrer"
                />
                
                {/* Save item Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(product.id);
                  }}
                  className="absolute top-3 right-3 p-2 bg-white/95 hover:bg-white rounded-full shadow-xs text-stone-500 transition-all cursor-pointer active:scale-95"
                >
                  <Heart 
                    size={14} 
                    className={wishlist.includes(product.id) ? 'fill-red-500 stroke-red-500 text-red-500' : 'text-stone-600'} 
                  />
                </button>
                <div className="absolute top-2.5 left-2.5 bg-yellow-500 text-stone-900 text-[10px] font-black px-2 py-0.5 rounded tracking-normal">
                  {product.discount}
                </div>
              </div>

              {/* Informative info container */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-stone-800 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors h-10">
                    {product.name}
                  </h3>
                  
                  {/* Rating Stars row */}
                  <div className="flex items-center gap-1 mt-1 mb-2">
                    <div className="flex text-amber-400">
                      {[...Array(product.stars)].map((_, i) => (
                        <Star key={i} size={11} className="fill-current text-amber-500" />
                      ))}
                    </div>
                    <span className="text-[10px] text-stone-400 font-semibold">({product.count})</span>
                  </div>
                </div>

                {/* Final prices tag */}
                <div className="border-t border-stone-100 pt-3 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest leading-none">Deal Price</span>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-base font-black text-stone-900 leading-none">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] sm:text-xs line-through text-stone-400 font-semibold leading-none">
                        ₹{product.oldPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                  
                  <span className="text-[11px] font-black text-emerald-600">
                    Ask Ramesh
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </section>


      {/* ── SECTION 5: "Top-Rated by Indian Homes" section placeholder matching Screenshot 4 ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-18 sm:mt-24 border-t border-stone-100 pt-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-950">
              Top-Rated by Indian Homes
            </h2>
            <p className="text-stone-500 text-xs mt-1">
              Crafted to complement diverse Indian lifestyles and coastal moisture shifts
            </p>
          </div>
          <button 
            onClick={() => onNavigate('beds')}
            className="text-amber-900 border-b border-amber-950 font-black text-xs hover:text-amber-700 transition-colors leading-none cursor-pointer"
          >
            Check Best Ratings
          </button>
        </div>

        {/* Flex cards displaying quality elements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="relative rounded-2xl h-[240px] overflow-hidden group border border-stone-100">
            <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80" alt="Master Bedroom" className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
            <div className="absolute bottom-5 left-5 text-white">
              <span className="bg-[#FBBD18] text-stone-950 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider block w-fit mb-1.5">Rating: 4.9/5</span>
              <h4 className="font-serif text-lg font-bold">Premium King Storage Bed</h4>
              <p className="text-stone-300 text-[11px] mt-0.5">Heavy-duty gas pump lifter & seasoned Teakwood</p>
            </div>
          </div>
          
          <div className="relative rounded-2xl h-[240px] overflow-hidden group border border-stone-100">
            <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80" alt="Sofa Suite" className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
            <div className="absolute bottom-5 left-5 text-white">
              <span className="bg-[#FBBD18] text-stone-950 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider block w-fit mb-1.5">Rating: 4.8/5</span>
              <h4 className="font-serif text-lg font-bold">Royal Lounge Couch Suite</h4>
              <p className="text-stone-300 text-[11px] mt-0.5">Ergonomic posture foam wrapped in velvet</p>
            </div>
          </div>

          <div className="relative rounded-2xl h-[240px] overflow-hidden group border border-stone-100">
            <img src="https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=600&q=80" alt="Dining Set" className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
            <div className="absolute bottom-5 left-5 text-white">
              <span className="bg-[#FBBD18] text-stone-950 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider block w-fit mb-1.5">Rating: 5.0/5</span>
              <h4 className="font-serif text-lg font-bold">6 Seater Danish Dining Set</h4>
              <p className="text-stone-300 text-[11px] mt-0.5">Natural matte resin finish resisting daily stains</p>
            </div>
          </div>
        </div>

      </section>





      <AnimatePresence>
        {showPitchDrawer && (
          <>
            {/* Dark Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPitchDrawer(false)}
              className="fixed inset-0 z-[110] bg-black"
            />

            {/* Proposal Drawer container */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-[120] w-[92%] sm:w-[460px] bg-stone-900 text-stone-100 shadow-2xl flex flex-col justify-between overflow-hidden"
            >
              
              {/* Header section with quote calculation */}
              <div className="p-6 border-b border-stone-850 bg-stone-850 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-black tracking-widest text-[#FBBD18]">
                    <UserCheck size={12} />
                    Ready-To-Go Pitch Assistant
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white mt-0.5">Sales Quote Builder</h3>
                </div>
                <button 
                  onClick={() => setShowPitchDrawer(false)}
                  className="p-1.5 bg-stone-800 hover:bg-stone-750 text-stone-300 rounded-full transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable proposal config body */}
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                
                {/* Visual Sales Tag */}
                <div className="bg-[#FCFAF8]/5 border border-amber-500/10 rounded-xl p-4 text-xs space-y-2 text-stone-300">
                  <p className="font-bold text-white text-sm">💡 Pitch Strategy for Bhise'z Furniture</p>
                  <p className="leading-relaxed font-light">
                    This interactive simulator helps you prove the website's high market value tosunita, ramesh, or anyone at 
                    <strong className="text-white"> Bhise'z Furniture (Malvan Shop)</strong>. Toggle custom items on/off to target a highly-optimized package ranging between <strong className="text-[#FBBD18]">₹18,000 and ₹25,000</strong>.
                  </p>
                </div>

                {/* Client properties field inputs */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-400">Target Client Details</label>
                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <span className="text-[10px] text-stone-500 font-semibold uppercase block mb-1">Company Name</span>
                      <input 
                        type="text" 
                        value={clientName} 
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full bg-stone-800 border border-stone-700 rounded p-2 text-xs text-white focus:outline-none focus:border-[#FBBD18]"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-500 font-semibold uppercase block mb-1">Location / Store</span>
                      <input 
                        type="text" 
                        value={clientLocation} 
                        onChange={(e) => setClientLocation(e.target.value)}
                        className="w-full bg-stone-800 border border-stone-700 rounded p-2 text-xs text-white focus:outline-none focus:border-[#FBBD18]"
                      />
                    </div>
                  </div>
                </div>

                {/* Features Selection List */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-transparent">
                    <span className="block text-xs font-bold uppercase tracking-wider text-stone-400">Configure Feature Stack</span>
                    <span className="text-[9px] bg-orange-600/20 text-orange-400 px-2 py-0.5 rounded font-bold font-mono">Coastal Premium</span>
                  </div>

                  <div className="space-y-2">
                    {featuresList.map((f) => (
                      <div 
                        key={f.id}
                        onClick={() => toggleFeature(f.id)}
                        className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer select-none transition-colors ${f.checked ? 'bg-orange-950/20 border-orange-700/50 text-white' : 'bg-stone-850 border-stone-800 text-stone-400 hover:border-stone-700'}`}
                      >
                        <div className="flex items-center gap-2 max-w-[280px]">
                          <div className={`w-4 h-4 rounded flex items-center justify-center border ${f.checked ? 'bg-orange-600 border-none text-white' : 'border-stone-600 bg-transparent'}`}>
                            {f.checked && <Check size={11} className="stroke-[3.5]" />}
                          </div>
                          <div>
                            <span className="text-xs font-bold block">{f.label}</span>
                            {f.required && <span className="text-[9px] font-bold text-orange-400 block uppercase">Included in Base Setup</span>}
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs font-bold font-mono text-[#FBBD18]">₹{f.price.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Summary Section */}
                <div className="bg-[#1A1209] rounded-xl border border-[#3D2B1F] p-4 text-center space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-widest block">Consolidated Website Quote</span>
                  <div className="text-3xl font-black text-white font-mono">
                    ₹{activeFeaturesTotal.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-bold flex items-center justify-center gap-1 bg-emerald-500/10 w-fit px-3 py-1 rounded-full mx-auto">
                    <CheckCircle size={12} /> Live Active Prototype Installed
                  </div>
                </div>

              </div>

              {/* PDF or WhatsApp Pitch call-to-action button */}
              <div className="p-6 border-t border-stone-850 bg-stone-850 space-y-3">
                <div className="text-[11px] text-stone-400 text-center font-light leading-relaxed">
                  "Show Ramesh Bhise & Sunitaji this exact running website on your phone, then open this side-panel to prove catalog modular value!"
                </div>
                
                <a 
                  href={`https://wa.me/919314444747?text=${encodeURIComponent(`Hi Ramesh Bhise! Here is the detailed website proposal customized for ${clientName} in ${clientLocation}:\n\n*Selected Package Features*:\n${featuresList.filter(f=>f.checked).map((f, i)=>(i+1)+'. '+f.label+' (₹'+f.price+')').join('\n')}\n\n*Total Proposed Cost*: ₹${activeFeaturesTotal.toLocaleString('en-IN')}\n\nThis consists of beautiful Wooden Street layouts, custom Teak Bed configurations, and instant WhatsApp booking maps. Let me know when we can review!`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#25D366] hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-center shadow-lg transition-transform active:scale-98 cursor-pointer"
                >
                  💬 Share Pitch Quote Via WhatsApp
                </a>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
