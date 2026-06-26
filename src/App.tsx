import { useState, useEffect } from 'react';
import { ViewState, CartItem, Product, ShowroomWalkthrough } from './types';
import { ALL_PRODUCTS, CATEGORY_MAP } from './data';
import { motion, AnimatePresence } from 'motion/react';

// Import sub components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import BedsView from './components/BedsView';
import ProductDetailView from './components/ProductDetailView';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import PaymentsView from './components/PaymentsView';
import ShowroomView from './components/ShowroomView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import WishlistView from './components/WishlistView';
import LoginView from './components/LoginView';
import AdminView from './components/AdminView';


// Named icons
import { MessageCircle, Heart, X, Check } from 'lucide-react';

const DEFAULT_INQUIRIES = [
  {
    id: 'inq-1',
    name: 'Siddharth Rane',
    phone: '+91 98201 12234',
    city: 'Malvan',
    subject: 'Custom Furniture Inquiry',
    message: 'Need 3 massive teak door frames seasoned with custom walnut polish. Please provide sizing options and shipping durations.',
    notes: 'Teak wood, custom walnut polish',
    status: 'Pending',
    date: '2026-06-10'
  },
  {
    id: 'inq-2',
    name: 'Priyanka Desai',
    phone: '+91 91672 55431',
    city: 'Kudal',
    subject: 'Showroom visit guide',
    message: 'Planning to visit Sukalwad NH-66 showroom to lock premium double beds with hydraulic storage. Will Ramesh be there on Saturday?',
    notes: 'Premium double bed, hydraulic storage',
    status: 'Reviewed',
    date: '2026-06-09'
  },
  {
    id: 'inq-3',
    name: 'Ramesh Patil',
    phone: '+91 93245 67781',
    city: 'Sawantwadi',
    subject: 'Bulk/Commercial quote',
    message: 'Require 10 standard counter height wooden chairs and 4 mango-wood dining tables for our family homestay project. Need Grade-A seasoned logs.',
    notes: 'Homestay project, mango wood',
    status: 'Resolved',
    date: '2026-06-08'
  }
];

const DEFAULT_WEBSITE_CONTENT = {
  heroTitle: 'Genuine Malvani Hardwoods. Masterfully Carved.',
  heroSubtitle: 'By Ramesh Bhise Carpenter Workshop. Direct heirloom luxury for doors, double-beds, and customized Mandirs since 1995.',
  aboutQuote: "Every ring in a log represents a monsoon we stood together. We don't just shape wood; we preserve Malvan's heritage in your living quarters.",
  whatsappLine: '+91 9314444747',
  malvanAddress: 'Main Market Road, Malvan, Sindhudurg, Maharashtra – 416606',
  sukalwadAddress: 'NH-66 Highway, Sukalwad, Sindhudurg, Maharashtra – 416520',
  adminPasscode: '1234',
  currencySymbol: '₹',
  gstPercent: 18
};

export default function App() {
  // Navigation states
  const [currentView, setCurrentView] = useState<ViewState>('home');

  // Dynamic application state systems
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('bhisez_products');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ALL_PRODUCTS;
  });

  const [categories, setCategories] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('bhisez_categories');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return CATEGORY_MAP;
  });

  const [inquiries, setInquiries] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('bhisez_inquiries');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_INQUIRIES;
  });

  const [websiteContent, setWebsiteContent] = useState<any>(() => {
    try {
      const saved = localStorage.getItem('bhisez_webcontent');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_WEBSITE_CONTENT;
  });

  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0] || ALL_PRODUCTS[0]);
  const [initialCategoryFilter, setInitialCategoryFilter] = useState<string | null>('all');
  const [initialSubCategoryFilter, setInitialSubCategoryFilter] = useState<string | null>(null);

  // Search filter
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart & Wishlist states
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<(string | number)[]>([]);

  // User details & state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Active Toast notify
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);

  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem('bhisez_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('bhisez_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('bhisez_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('bhisez_webcontent', JSON.stringify(websiteContent));
  }, [websiteContent]);

  // Load wishlist from local storage on launch
  useEffect(() => {
    try {
      const saved = localStorage.getItem('bhisez_wl');
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2500);
  };

  const handleNavigate = (view: ViewState) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
  };

  // Select category from dashboard & redirect
  const handleSelectCategory = (category: string, subCategory?: string | null) => {
    setInitialCategoryFilter(category);
    setInitialSubCategoryFilter(subCategory || null);
    handleNavigate('beds');
  };

  // View specific product detailed setup
  const handleSelectProduct = (productId: string | number) => {
    const prod = products.find(p => p.id === productId);
    if (prod) {
      setSelectedProduct(prod);
      handleNavigate('product-detail');
    }
  };

  // Toggle saving to wishlist
  const handleToggleWishlist = (productId: string | number) => {
    let next: (string | number)[];
    const isWished = wishlist.includes(productId);

    if (isWished) {
      next = wishlist.filter(id => id !== productId);
      triggerToast('🤍 Removed from Wishlist!');
    } else {
      next = [...wishlist, productId];
      triggerToast('❤️ Added to Wishlist!');
    }

    setWishlist(next);
    localStorage.setItem('bhisez_wl', JSON.stringify(next));
  };

  // Adding to Shopping Cart Array
  const handleAddToCart = (
    product: Product, 
    quantity: number, 
    size: string, 
    finish: string, 
    storage: string
  ) => {
    const existingIdx = cart.findIndex(item => 
      item.product.id === product.id && 
      item.size === size && 
      item.finish === finish && 
      item.storage === storage
    );

    if (existingIdx > -1) {
      const nextCart = [...cart];
      nextCart[existingIdx].quantity += quantity;
      setCart(nextCart);
    } else {
      setCart([...cart, { product, quantity, size, finish, storage }]);
    }
    triggerToast('🛒 Added to Cart successfully!');
  };

  const handleUpdateCartItemQty = (productId: string | number, qty: number) => {
    if (qty < 1) return;
    const nextCart = cart.map(item => {
      if (item.product.id === productId) {
        return { ...item, quantity: qty };
      }
      return item;
    });
    setCart(nextCart);
  };

  const handleRemoveCartItem = (productId: string | number) => {
    setCart(cart.filter(item => item.product.id !== productId));
    triggerToast('🗑️ Item removed from Cart!');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    triggerToast('🔓 Signed out successfully!');
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    triggerToast('🔒 Welcomed as privileged member!');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7F2] font-sans antialiased text-[#3D2B1F]">
      
      {/* Dynamic Alert Toast */}
      {toastVisible && (
        <div className="fixed bottom-24 right-6 sm:bottom-8 sm:right-8 z-[200] max-w-sm bg-[#1A1209] text-[#FAF7F2] border border-[#3D2B1F] shadow-xl px-5 py-3.5 rounded-xl flex items-center space-x-2.5 animate-scale-in">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white font-bold text-xs">
            ✓
          </span>
          <span className="text-xs font-bold font-space select-none tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Primary Header/Navbar */}
      <div className={currentView === 'beds' ? 'hidden md:block' : ''}>
        <Navbar 
          currentView={currentView}
          onNavigate={handleNavigate}
          cartCount={cart.reduce((s, c) => s + c.quantity, 0)}
          wishlistCount={wishlist.length}
          onSearchChange={setSearchQuery}
          searchQuery={searchQuery}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          onSelectCategory={handleSelectCategory}
        />
      </div>

      {/* Main active view port */}
      <main className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
          >
            {currentView === 'home' && (
              <HomeView 
                onNavigate={handleNavigate}
                onSelectCategory={handleSelectCategory}
                onSelectProduct={handleSelectProduct}
                onToggleWishlist={handleToggleWishlist}
                wishlist={wishlist}
              />
            )}

            {currentView === 'beds' && (
              <BedsView 
                onNavigate={handleNavigate}
                onSelectProduct={handleSelectProduct}
                onToggleWishlist={handleToggleWishlist}
                wishlist={wishlist}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                initialCategoryFilter={initialCategoryFilter}
                initialSubCategoryFilter={initialSubCategoryFilter}
                cartCount={cart.reduce((s, c) => s + c.quantity, 0)}
                wishlistCount={wishlist.length}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
                products={products}

              />
            )}

            {currentView === 'product-detail' && (
              <ProductDetailView 
                onNavigate={handleNavigate}
                product={selectedProduct}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                wishlist={wishlist}
              />
            )}

            {currentView === 'cart' && (
              <CartView 
                onNavigate={handleNavigate}
                cart={cart}
                onUpdateCartItemQty={handleUpdateCartItemQty}
                onRemoveCartItem={handleRemoveCartItem}
              />
            )}

            {currentView === 'checkout' && (
              <CheckoutView 
                onNavigate={handleNavigate}
                cart={cart}
              />
            )}

            {currentView === 'payments' && (
              <PaymentsView 
                onNavigate={handleNavigate}
                cart={cart}
                onClearCart={handleClearCart}
              />
            )}

            {currentView === 'showroom' && (
              <ShowroomView />
            )}

            {currentView === 'about' && (
              <AboutView onNavigate={handleNavigate} />
            )}

            {currentView === 'contact' && (
              <ContactView />
            )}

            {currentView === 'wishlist' && (
              <WishlistView 
                onNavigate={handleNavigate}
                onSelectProduct={handleSelectProduct}
                onToggleWishlist={handleToggleWishlist}
                wishlist={wishlist}
                products={products}
              />
            )}

            {currentView === 'login' && (
              <LoginView 
                onNavigate={handleNavigate}
                onLoginSuccess={handleLoginSuccess}
              />
            )}

            {currentView === 'admin' && (
              <AdminView 
                products={products}
                onUpdateProducts={setProducts}
                categories={categories}
                onUpdateCategories={setCategories}
                inquiries={inquiries}
                onUpdateInquiries={setInquiries}
                websiteContent={websiteContent}
                onUpdateWebsiteContent={setWebsiteContent}
                onNavigate={handleNavigate}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Primary Footer */}
      <div className={currentView === 'beds' ? 'hidden md:block' : ''}>
        <Footer onNavigate={handleNavigate} />
      </div>

      {/* Ambient Floating WhatsApp helper button */}
      <a 
        href={`https://wa.me/919999999999?text=${encodeURIComponent(`Hi Ramesh! I'd like to get an estimate for solid hardwood furniture.`)}`}
        target="_blank"
        className="fixed bottom-6 left-6 z-[90] w-12 h-12 bg-[#25D366] hover:bg-[#1ebd59] text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        rel="noreferrer"
        title="Chat on WhatsApp"
        id="whatsapp-floating-btn"
      >
        <MessageCircle size={22} className="fill-current text-white stroke-none" />
      </a>



    </div>
  );
}
