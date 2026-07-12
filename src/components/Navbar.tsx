import { useState } from 'react';
import { ViewState } from '../types';
import { CATEGORY_MAP } from '../data';
import { 
  ShoppingCart, 
  Heart, 
  MapPin, 
  User, 
  Search, 
  Menu, 
  X,
  PhoneCall
} from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  cartCount: number;
  wishlistCount: number;
  onSearchChange: (query: string) => void;
  searchQuery: string;
  isLoggedIn: boolean;
  onLogout: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onSelectCategory: (category: string, subCategory?: string | null) => void;
}

export default function Navbar({
  currentView,
  onNavigate,
  cartCount,
  wishlistCount,
  onSearchChange,
  searchQuery,
  isLoggedIn,
  onLogout,
  mobileMenuOpen,
  setMobileMenuOpen,
  onSelectCategory,
}: NavbarProps) {
  const [activeMegaCat, setActiveMegaCat] = useState<string | null>(null);

  // Brand Logo component
  const renderLogo = () => {
    return (
      <img 
        src="/images/bhisez%20logo.png" 
        alt="Bhisez Furniture" 
        className="h-12 sm:h-20 mb-[-20px] mt-[-10px] w-auto object-contain block py-0.5"
        referrerPolicy="no-referrer"
      />
    );
  };

  return (
    <>
      <header className="relative z-[100] bg-white border-b border-[#E0D8CF] shadow-xs">
      {/* 1. TOP-MOST UTILITY RIBBON (Wooden Street Style) */}
      <div className="bg-[#FAF7F2] border-b border-[#EBE3D9] text-stone-600 text-[10.5px] font-medium py-1.5 px-4 sm:px-6 lg:px-8 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Left Ribbon Links */}
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => onNavigate('home')} 
              className="text-[#E52E2D] font-bold hover:opacity-80 transition-opacity cursor-pointer"
            >
              Furniture
            </button>
            <button 
              onClick={() => onNavigate('contact')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Home Interiors
            </button>
            <button 
              onClick={() => onNavigate('contact')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Bulk Order
            </button>
          </div>
          
          {/* Right Ribbon Links */}
          <div className="flex items-center space-x-6 text-stone-500">
            <a 
              href="tel:+919314444747" 
              className="flex items-center gap-1 hover:text-stone-900 transition-colors font-bold"
            >
              <PhoneCall size={11} className="text-stone-400" />
              +91-9314444747
            </a>
            <span className="text-stone-300">|</span>
            <button 
              onClick={() => onNavigate('about')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Become a Franchise
            </button>
            <span className="text-stone-300">|</span>
            <button 
              onClick={() => onNavigate('showroom')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Track Order
            </button>
            <span className="text-stone-300">|</span>
            <button 
              onClick={() => onNavigate('contact')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Help Center
            </button>
            <span className="text-stone-300">|</span>
            <a 
              href="?view=admin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-700 hover:text-amber-900 transition-colors cursor-pointer font-bold"
              id="navbar-admin-btn"
            >
              🔒 Admin Panel
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR (Wooden Street Layout) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2 sm:py-2.5 bg-transparent">
          
          {/* Logo on Left */}
          <button 
            onClick={() => onNavigate('home')} 
            className="flex items-center bg-transparent border-none cursor-pointer focus:outline-none shrink-0"
            id="nav-logo-btn"
          >
            {renderLogo()}
          </button>

          {/* Centered Large Search Bar (Wooden Street style) */}
          <div className="flex-1 max-w-xl mx-8 hidden md:block">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search Products, Color & More..."
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (currentView !== 'beds' && e.target.value) {
                    onNavigate('beds');
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (currentView !== 'beds') {
                      onNavigate('beds');
                    }
                  }
                }}
                className="w-full bg-white border border-[#C9BFA6] text-stone-800 text-xs rounded-md pl-4 pr-10 py-1.5 sm:py-2 shadow-2xs focus:ring-1 focus:ring-[#FBBD18] focus:border-[#FBBD18] outline-none transition-all placeholder-stone-400 font-medium"
                id="navbar-search-input"
              />
              <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 cursor-pointer hover:text-stone-800" />
            </div>
          </div>

          {/* Icon Navigation Row on Right with Labels Below (Exactly matching the screenshot) */}
          <div className="flex items-center space-x-1 sm:space-x-4">
            
            {/* Stores Icon */}
            <button 
              onClick={() => onNavigate('showroom')} 
              className="flex flex-col items-center p-1 text-stone-700 hover:text-orange-600 transition-colors cursor-pointer group"
              title="Showroom Stores"
            >
              <MapPin size={19} className="group-hover:scale-105 transition-transform" />
              <span className="text-[10px] font-bold text-stone-500 mt-0.5 select-none">Stores</span>
            </button>

            {/* Profile / Account Icon */}
            <button 
              onClick={() => onNavigate(isLoggedIn ? 'home' : 'login')} 
              className="flex flex-col items-center p-1 text-stone-700 hover:text-orange-600 transition-colors cursor-pointer group"
              title={isLoggedIn ? "My Account" : "Sign In"}
            >
              <User size={19} className="group-hover:scale-105 transition-transform" />
              <span className="text-[10px] font-bold text-stone-500 mt-0.5 select-none">
                {isLoggedIn ? "Profile" : "Profile"}
              </span>
            </button>

            {/* Wishlist Icon */}
            <button 
              onClick={() => onNavigate('wishlist')} 
              className="relative flex flex-col items-center p-1 text-stone-700 hover:text-orange-600 transition-colors cursor-pointer group"
              id="navbar-wishlist-btn"
              title="My Wishlist"
            >
              <div className="relative">
                <Heart size={19} className={`${currentView === 'wishlist' ? 'fill-red-500 stroke-red-500 text-red-500' : 'text-stone-700'} group-hover:scale-105 transition-transform`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full text-[8px] font-black w-4 h-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold text-stone-500 mt-0.5 select-none">
                Wishlist ({wishlistCount})
              </span>
            </button>

            {/* Cart Icon */}
            <button 
              onClick={() => onNavigate('cart')} 
              className="relative flex flex-col items-center p-1 text-stone-700 hover:text-orange-600 transition-colors cursor-pointer group"
              id="navbar-cart-btn"
              title="My Shopping Cart"
            >
              <div className="relative font-bold">
                <ShoppingCart size={19} className={`${currentView === 'cart' ? 'stroke-orange-500 text-orange-500' : 'text-stone-700'} group-hover:scale-105 transition-transform`} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-amber-600 text-white rounded-full text-[8px] font-black w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold text-stone-500 mt-0.5 select-none">
                Cart ({cartCount})
              </span>
            </button>

            {/* Sign Out (If Logged In) */}
            {isLoggedIn && (
              <button 
                onClick={onLogout}
                className="hidden lg:flex flex-col items-center p-1 text-stone-500 hover:text-red-600 transition-colors cursor-pointer text-[10px] font-bold"
                id="navbar-logout-btn"
              >
                <X size={18} />
                <span className="mt-0.5">Sign Out</span>
              </button>
            )}

            {/* Mobile Menu Button toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="lg:hidden p-2 text-stone-700 hover:bg-stone-50 rounded-md cursor-pointer"
              id="navbar-mobile-menu-btn"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>
        </div>
      </div>
    </header>

      {/* 3. CATEGORY NAVIGATION TAPE / SLAT (Wooden Street style category ribbon with hovering rich Mega Menus) */}
      <div 
        className="sticky top-0 z-[120] bg-[#FAF7F2] border-t border-b border-[#EBE3D9] shadow-xs relative"
        onMouseLeave={() => setActiveMegaCat(null)}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-1.5 md:py-2 overflow-x-auto select-none no-scrollbar whitespace-nowrap text-xs md:text-[12px] font-bold text-stone-700">
          {CATEGORY_MAP.map((cat) => (
            <button
              key={cat.slug}
              onMouseEnter={() => setActiveMegaCat(cat.slug)}
              onClick={() => {
                onSelectCategory(cat.slug, null);
                setActiveMegaCat(null);
              }}
              className={`px-3 py-0.5 hover:text-[#CBB89D] hover:scale-[1.02] transition-all cursor-pointer duration-200 uppercase tracking-wide text-stone-800 ${
                activeMegaCat === cat.slug ? 'text-amber-600 font-extrabold border-b-[2px] border-amber-600' : ''
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* ── RICH HOVER MEGA DROPDOWN POPUP MENU ── */}
        {activeMegaCat && (
          <div 
            className="absolute top-full left-0 right-0 w-full bg-white border-t border-stone-200 shadow-2xl z-[150] px-8 py-8 animate-fade-in block"
            onMouseEnter={() => setActiveMegaCat(activeMegaCat)}
            onMouseLeave={() => setActiveMegaCat(null)}
          >
            <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8">
              {/* Left Sub-Categories Panel (Cols 1-3) */}
              <div className="col-span-3 grid grid-cols-3 gap-8">
                {(() => {
                  const currentCat = CATEGORY_MAP.find(c => c.slug === activeMegaCat);
                  if (!currentCat) return null;
                  return currentCat.subCategories.map((sub) => (
                    <div key={sub.slug} className="space-y-3.5 border-r border-stone-100 last:border-r-0 pr-4">
                      <button
                        onClick={() => {
                          onSelectCategory(currentCat.slug, sub.slug);
                          setActiveMegaCat(null);
                        }}
                        className="font-serif text-[15px] font-black text-[#5C4033] hover:text-[#CBB89D] transition-colors text-left block border-b border-stone-100 pb-1.5 w-full uppercase tracking-wider"
                      >
                        {sub.name}
                      </button>
                      <div className="flex flex-col space-y-2.5 text-stone-500 text-xs">
                        <button 
                          onClick={() => {
                            onSelectCategory(currentCat.slug, sub.slug);
                            setActiveMegaCat(null);
                          }}
                          className="text-left font-bold text-amber-700 hover:text-amber-900 transition-colors"
                        >
                          ✦ Explore All {sub.name} Options ({sub.count} Designs)
                        </button>
                        <span className="text-stone-400 block font-medium">✦ 100% Seasoned Malvani Hardwood</span>
                        <span className="text-stone-400 block font-medium">✦ Eco-friendly Oil-polish Finish</span>
                        <span className="text-stone-400 block font-medium">✦ 5-Year Termite Proof Assurance</span>
                      </div>
                    </div>
                  ));
                })()}
              </div>

              {/* Right Side Promo Panel (Col 4) */}
              {(() => {
                const currentCat = CATEGORY_MAP.find(c => c.slug === activeMegaCat);
                if (!currentCat) return null;
                return (
                  <div className="relative rounded-2xl overflow-hidden shadow-md border border-stone-100 group h-[210px] bg-stone-900">
                    <img 
                      src={currentCat.img} 
                      alt={currentCat.name} 
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 opacity-80" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-stone-950/10"></div>
                    <div className="absolute inset-x-4 bottom-4 text-white z-10 flex flex-col justify-end">
                      <span className="bg-[#FBBD18] text-stone-950 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider block w-fit mb-1.5">
                        {currentCat.promoOffer}
                      </span>
                      <h4 className="font-serif text-[15px] font-bold leading-tight uppercase tracking-wide text-white">{currentCat.promoTitle}</h4>
                      <p className="text-stone-300 text-[11px] mt-0.5">By Ramesh Bhise Carpenters</p>
                      
                      <button
                        onClick={() => {
                          onSelectCategory(currentCat.slug, null);
                          setActiveMegaCat(null);
                        }}
                        className="mt-3 text-[10px] bg-amber-500 hover:bg-amber-600 text-stone-950 px-4 py-2 rounded-xl font-bold uppercase tracking-wider transition-colors w-fit shadow-xs"
                      >
                        Browse Showcase
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden animate-fade-in">
          <div className="fixed inset-0 z-40 bg-stone-900/40 backdrop-blur-2xs" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="fixed right-0 top-0 bottom-0 z-50 w-72 max-w-xs bg-[#FAF7F2] p-6 shadow-xl flex flex-col justify-between py-10 transition-transform">
            
            <div>
              {/* Drawer header */}
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#E0D8CF]">
                {renderLogo()}
                <button 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="rounded-full p-1 hover:bg-stone-200 text-stone-400 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Links */}
              <nav className="flex flex-col space-y-4">
                <button 
                  onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} 
                  className="text-left text-sm font-semibold text-[#3D2B1F] py-2 px-3 hover:bg-[#E8DDD1]/40 rounded-md"
                >
                  🏠 Home
                </button>
                <button 
                  onClick={() => { onNavigate('beds'); setMobileMenuOpen(false); }} 
                  className="text-left text-sm font-semibold text-[#3D2B1F] py-2 px-3 hover:bg-[#E8DDD1]/40 rounded-md"
                >
                  🛋️ All Products & Beds
                </button>
                <button 
                  onClick={() => { onNavigate('showroom'); setMobileMenuOpen(false); }} 
                  className="text-left text-sm font-semibold text-[#3D2B1F] py-2 px-3 hover:bg-[#E8DDD1]/40 rounded-md"
                >
                  📍 Visit Showroom
                </button>
                <button 
                  onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }} 
                  className="text-left text-sm font-semibold text-[#3D2B1F] py-2 px-3 hover:bg-[#E8DDD1]/40 rounded-md"
                >
                  📖 About Us
                </button>
                <button 
                  onClick={() => { onNavigate('contact'); setMobileMenuOpen(false); }} 
                  className="text-left text-sm font-semibold text-[#3D2B1F] py-2 px-3 hover:bg-[#E8DDD1]/40 rounded-md"
                >
                  ⚙️ Custom Order
                </button>
                <button 
                  onClick={() => { onNavigate('wishlist'); setMobileMenuOpen(false); }} 
                  className="text-left text-sm font-semibold text-[#3D2B1F] py-2 px-3 hover:bg-[#E8DDD1]/40 rounded-md"
                >
                  ❤️ My Wishlist ({wishlistCount})
                </button>
                <a 
                  href="?view=admin"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-left text-sm font-bold text-amber-800 py-2 px-3 hover:bg-[#E8DDD1]/40 rounded-md block"
                >
                  🔒 Workshop Admin Portal
                </a>
              </nav>
            </div>

            {/* Mobile Footer Area */}
            <div className="border-t border-[#E0D8CF] pt-4 flex flex-col space-y-3">
              <a 
                href="https://wa.me/919999999999?text=Hi! I Want to Enquire About Custom Furniture." 
                target="_blank" 
                rel="noreferrer"
                className="w-full text-center bg-[#25D366] text-white text-xs font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2"
              >
                💬 WhatsApp Ramesh
              </a>
              {isLoggedIn ? (
                <button 
                  onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                  className="text-center font-bold text-xs text-[#3D2B1F] py-2"
                >
                  Sign Out
                </button>
              ) : (
                <button 
                  onClick={() => { onNavigate('login'); setMobileMenuOpen(false); }}
                  className="text-center font-bold text-xs text-amber-800 py-2"
                >
                  Sign In / Create Account
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
}
