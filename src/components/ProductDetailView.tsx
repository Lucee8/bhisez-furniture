import { useState } from 'react';
import { Product, ViewState } from '../types';
import { 
  Heart, 
  Share2, 
  ShoppingCart, 
  MessageCircle, 
  MapPin, 
  ShieldCheck, 
  Wrench, 
  Settings,
  ChevronDown
} from 'lucide-react';

interface ProductDetailViewProps {
  onNavigate: (view: ViewState) => void;
  product: Product;
  onAddToCart: (product: Product, quantity: number, size: string, finish: string, storage: string) => void;
  onToggleWishlist: (id: string | number) => void;
  wishlist: (string | number)[];
}

const FINISHES = [
  { name: 'Amber Walnut', color: '#c9a87c' },
  { name: 'Danish Walnut', color: '#5a3e28' },
  { name: 'Teak Brown', color: '#7a5230' }
];

export default function ProductDetailView({
  onNavigate,
  product,
  onAddToCart,
  onToggleWishlist,
  wishlist,
}: ProductDetailViewProps) {
  // Config state
  const [selectedSize, setSelectedSize] = useState<string>(product.size === 'king' ? 'King Size' : 'Queen Size');
  const [selectedFinish, setSelectedFinish] = useState<string>('Amber Walnut');
  const [selectedStorage, setSelectedStorage] = useState<string>('Hydraulic Storage');
  const [quantity, setQuantity] = useState<number>(1);
  const [pincode, setPincode] = useState<string>('');
  const [pincodeChecked, setPincodeChecked] = useState<boolean>(false);
  const [deliveryDate, setDeliveryDate] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('desc');

  // Main Image state
  const [mainImageUrl, setMainImageUrl] = useState<string>(product.img);

  const discountAmount = product.orig && product.orig > 0 ? product.orig - product.price : 0;
  const isWished = wishlist.includes(product.id);

  // Live price adjustment
  const computedPrice = (() => {
    let base = product.price;
    if (selectedSize === 'Queen Size') base -= 5000; // Live Queen Sizing discount
    if (selectedStorage === 'Non Storage') base -= 10000; // Live Sizing discount
    return base > 0 ? base : 0;
  })();

  const computedOrigPrice = (() => {
    let base = product.orig || product.price;
    if (selectedSize === 'Queen Size') base -= 8000;
    if (selectedStorage === 'Non Storage') base -= 14000;
    return base > 0 ? base : 0;
  })();

  const computedDiscount = computedOrigPrice > 0 ? Math.round((1 - computedPrice / computedOrigPrice) * 100) : 0;

  const handlePincodeCheck = () => {
    if (pincode.length < 6) {
      alert('Please enter a valid 6-digit Pincode.');
      return;
    }
    const d = new Date();
    d.setDate(d.getDate() + 7);
    const dateStr = d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
    setDeliveryDate(dateStr);
    setPincodeChecked(true);
  };

  const handleAddToCartClick = () => {
    onAddToCart(product, quantity, selectedSize, selectedFinish, selectedStorage);
    // After adding, go to cart
    onNavigate('cart');
  };

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({ title: product.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Slat */}
        <div className="flex items-center space-x-2 text-xs text-stone-500 font-medium mb-8">
          <button onClick={() => onNavigate('home')} className="hover:text-amber-800 bg-transparent border-none cursor-pointer">Home</button>
          <span>›</span>
          <button onClick={() => onNavigate('beds')} className="hover:text-amber-800 bg-transparent border-none cursor-pointer">Beds</button>
          <span>›</span>
          <span className="text-[#3D2B1F] line-clamp-1">{product.name}</span>
        </div>

        {/* MAIN PRODUCT SHEETS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT: GALLERY SHEET */}
          <div className="space-y-4">
            
            {/* Main Stage Frame */}
            <div className="relative aspect-1.1/1 rounded-2xl overflow-hidden border border-[#E0D8CF] bg-white">
              <img 
                src={mainImageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-500"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              
              <div className="absolute top-4 right-4 flex flex-col space-y-2.5 z-20">
                <button 
                  onClick={() => onToggleWishlist(product.id)}
                  className="p-2.5 bg-white/95 hover:bg-white rounded-full shadow-md text-stone-500 transition-transform hover:scale-115"
                >
                  <Heart size={16} className={isWished ? 'fill-red-500 stroke-red-500' : 'text-stone-600'} />
                </button>
                <button 
                  onClick={shareProduct}
                  className="p-2.5 bg-white/95 hover:bg-white rounded-full shadow-md text-stone-600 transition-transform hover:scale-115"
                >
                  <Share2 size={16} />
                </button>
              </div>

              <div className="absolute bottom-4 left-4 text-[10px] font-bold text-white bg-black/40 px-3 py-1 rounded-sm uppercase tracking-widest pointer-events-none">
                📍 Tested Carpenter seasoned
              </div>
            </div>

            {/* Thumbnail Slabs strip */}
            <div className="grid grid-cols-5 gap-3">
              <button 
                onClick={() => setMainImageUrl(product.img)}
                className={`aspect-1 bg-white border rounded-xl overflow-hidden focus:outline-none ${mainImageUrl === product.img ? 'border-amber-700 ring-1 ring-amber-700' : 'border-[#E0D8CF]'}`}
              >
                <img src={product.img} alt="Thumbnail 1" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
              
              {/* Fallback Unsplash wood details thumbs */}
              {[
                'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80',
                'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&q=80',
                'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=500&q=80',
                'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80'
              ].map((url, index) => (
                <button 
                  key={index}
                  onClick={() => setMainImageUrl(url)}
                  className={`aspect-1 bg-white border rounded-xl overflow-hidden focus:outline-none ${mainImageUrl === url ? 'border-amber-700 ring-1 ring-amber-700' : 'border-[#E0D8CF]'}`}
                >
                  <img src={url} alt={`Thumbnail ${index+2}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>

          </div>

          {/* RIGHT: INFO/CONFIGURATION SECTION */}
          <div className="space-y-6">
            
            <div>
              <span className="text-xs font-black tracking-widest text-[#8B6F5C] uppercase">seasoned hardwood series</span>
              <h1 className="font-serif text-2xl sm:text-3xl font-black text-amber-950 mt-1 leading-tight">{product.name}</h1>
              <p className="text-xs text-[#8B6F5C] mt-2">By <button onClick={() => onNavigate('about')} className="underline hover:text-amber-900 bg-transparent border-none p-0">Bhise'z Ferniture Showroom</button></p>
            </div>

            <hr className="border-[#E0D8CF]" />

            {/* Sizing switch triggers */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">Dimensions / Bed Sizing</span>
              <div className="flex space-x-3">
                {['King Size', 'Queen Size'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => setSelectedSize(opt)}
                    className={`px-4 py-2.5 border rounded-xl text-xs font-bold transition-all ${selectedSize === opt ? 'bg-[#3D2B1F] border-[#3D2B1F] text-amber-50' : 'bg-transparent border-[#E0D8CF] text-[#3D2B1F] hover:border-[#3D2B1F]'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Polish finish swatches */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">Hardwood Finish / Seal</span>
              <div className="flex space-x-3">
                {FINISHES.map(f => (
                  <button
                    key={f.name}
                    onClick={() => setSelectedFinish(f.name)}
                    className={`flex items-center space-x-2 px-3 py-2 border rounded-xl text-xs font-bold transition-all ${selectedFinish === f.name ? 'bg-[#3D2B1F] border-[#3D2B1F] text-amber-50' : 'bg-transparent border-[#E0D8CF] text-[#3D2B1F] hover:border-[#3D2B1F]'}`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-stone-400" style={{ backgroundColor: f.color }} />
                    <span>{f.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Storage configuration */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">Underbed storage options</span>
              <div className="flex space-x-3">
                {['Hydraulic Storage', 'Non Storage'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => setSelectedStorage(opt)}
                    className={`px-4 py-2.5 border rounded-xl text-xs font-bold transition-all ${selectedStorage === opt ? 'bg-[#3D2B1F] border-[#3D2B1F] text-amber-50' : 'bg-transparent border-[#E0D8CF] text-[#3D2B1F] hover:border-[#3D2B1F]'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-[#E0D8CF]" />

            {/* LIVE PRICE PANEL */}
            {computedPrice > 0 ? (
              <div className="bg-white border border-[#E0D8CF] p-5 rounded-2xl space-y-2">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">Season sale direct rate</span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-black text-amber-950">₹{computedPrice.toLocaleString('en-IN')}</span>
                  {computedOrigPrice > 0 && (
                    <>
                      <span className="text-xs text-stone-400 line-through">₹{computedOrigPrice.toLocaleString('en-IN')}</span>
                      <span className="text-xs text-emerald-600 font-bold">({computedDiscount}% OFF)</span>
                    </>
                  )}
                </div>
                <p className="text-[11px] text-stone-500">Includes free local white-glove installation & GST invoice.</p>
              </div>
            ) : (
              <div className="bg-white border border-[#E0D8CF] p-5 rounded-2xl flex flex-col items-start space-y-1">
                <span className="text-xs font-bold text-amber-800">🛠️ Price Upon Custom Quote</span>
                <p className="text-[11px] text-stone-500">Contact Ramesh directly to provide custom dimensional sketches or wood finishes.</p>
              </div>
            )}

            {/* Quantity Counter */}
            <div className="flex items-center space-x-4">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Quantity</span>
              <div className="inline-flex items-center border border-[#E0D8CF] rounded-xl bg-white overflow-hidden">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-3 py-1.5 hover:bg-stone-100 font-bold text-stone-700 bg-transparent cursor-pointer"
                >
                  −
                </button>
                <span className="px-4 py-1.5 font-bold text-stone-800 text-xs">{quantity}</span>
                <button 
                  onClick={() => setQuantity(prev => Math.min(10, prev + 1))}
                  className="px-3 py-1.5 hover:bg-stone-100 font-bold text-stone-700 bg-transparent cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Pin check Slat */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">Check Delivery Pincode</span>
              <div className="flex max-w-xs overflow-hidden rounded-xl border border-[#E0D8CF] bg-white">
                <input 
                  type="text" 
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  className="flex-1 px-4 py-2 bg-transparent text-xs text-[#3D2B1F] outline-none"
                  id="pincode-entry-input"
                />
                <button 
                  onClick={handlePincodeCheck}
                  className="bg-[#3D2B1F] hover:bg-[#120a04] px-4 text-xs font-bold text-amber-50 cursor-pointer"
                  id="pincode-check-btn"
                >
                  Check
                </button>
              </div>

              {pincodeChecked && (
                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center space-x-2 text-xs text-emerald-800 max-w-sm">
                  <span className="text-base text-emerald-600">✓</span>
                  <span><strong>Accessible!</strong> Delivered assembled by <strong>{deliveryDate}</strong>.</span>
                </div>
              )}
            </div>

            {/* Quick trust metrics row */}
            <div className="grid grid-cols-3 gap-2 text-center pt-2">
              <div className="p-3 bg-white border border-[#E0D8CF] rounded-xl text-center space-y-1">
                <span className="text-lg">🛡️</span>
                <h5 className="text-[10px] font-black text-amber-950 uppercase tracking-wide">3 Year Warranty</h5>
              </div>
              <div className="p-3 bg-white border border-[#E0D8CF] rounded-xl text-center space-y-1">
                <span className="text-lg">🚚</span>
                <h5 className="text-[10px] font-black text-amber-950 uppercase tracking-wide">Complimentary</h5>
              </div>
              <div className="p-3 bg-white border border-[#E0D8CF] rounded-xl text-center space-y-1">
                <span className="text-lg">🪚</span>
                <h5 className="text-[10px] font-black text-amber-950 uppercase tracking-wide">seasoned teak</h5>
              </div>
            </div>

            {/* ACTION DIRECT CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              
              {product.price > 0 ? (
                <button
                  onClick={handleAddToCartClick}
                  className="w-full bg-[#C9983A] hover:bg-[#E8B84B] text-amber-950 font-bold text-xs uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  id="add-to-cart-cta-btn"
                >
                  <ShoppingCart size={16} /> Add to Cart
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-stone-300 text-stone-500 font-bold text-xs uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed"
                >
                  Custom Quote Only
                </button>
              )}

              <a 
                href={`https://wa.me/919999999999?text=${encodeURIComponent(`Hi Ramesh! I want to order/enquire details. \nProduct: ${product.name}\nSize: ${selectedSize}\nFinish: ${selectedFinish}\nStorage: ${selectedStorage}\nQty: ${quantity}`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 shadow-xs text-center"
              >
                <MessageCircle size={16} /> Order on WhatsApp
              </a>

            </div>

          </div>

        </div>

        {/* BOTTOM ACCORDIONS DETAIL INFORMATION */}
        <div className="mt-16 bg-white border border-[#E0D8CF] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          
          <div className="flex border-b border-[#E0D8CF] space-x-6 overflow-x-auto">
            {[
              { id: 'desc', label: 'Description' },
              { id: 'spec', label: 'Specifications (Amber Walnut)' },
              { id: 'care', label: 'Woodwork Care' },
              { id: 'returns', label: 'Assembly & Returns' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 text-xs sm:text-sm font-bold uppercase tracking-wider whitespace-nowrap bg-transparent border-none cursor-pointer focus:outline-none ${activeTab === tab.id ? 'border-b-2 border-amber-800 text-[#3D2B1F]' : 'text-stone-400 hover:text-stone-600'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs sm:text-sm text-stone-600 leading-relaxed space-y-4">
            
            {activeTab === 'desc' && (
              <>
                <p>Designed and seasoned meticulously within our regional workshops in Malvan, Sindhudurg. This custom product has been the absolute masterpiece of Ramesh Bhise’s traditional structural cabinetry range.</p>
                <p>Constructed completely using seasoned grade solid hardwood boards. Each frame segment undergo double-jointed lockouts preventing alignment failures under extreme humidity levels, accompanied by eco-friendly polyurethane hand lacquer finish.</p>
              </>
            )}

            {activeTab === 'spec' && (
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-stone-100">
                    <td className="py-2.5 font-bold text-stone-800 w-1/3">Seasoned Timber</td>
                    <td className="py-2.5">Solid Teak Hardwood (Grade A seasoned)</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-2.5 font-bold text-stone-800">Support Base Frame</td>
                    <td className="py-2.5">Engineered teak core board panels</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-2.5 font-bold text-stone-800">Hardware & Pistons</td>
                    <td className="py-2.5">Double gas pressure hydraulics (tested 10k cycles)</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-2.5 font-bold text-stone-800">Clear Clearance Height</td>
                    <td className="py-2.5">40 cm ground floor elevation</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-2.5 font-bold text-stone-800">Total Structural Weight</td>
                    <td className="py-2.5">~85 kilograms net deadweight</td>
                  </tr>
                </tbody>
              </table>
            )}

            {activeTab === 'care' && (
              <ul className="space-y-2 list-disc pl-5">
                <li>Gently wipe with modular lint-free dry cloths every week.</li>
                <li>Avoid exposing seasoned teak elements to direct monsoon wall seepages or active heating pipelines.</li>
                <li>Gently treat with natural Teakwood restoration oils once every twelve months to preserve amber walnut gloss coatings.</li>
                <li>Utilize soft caster base pads under bed storage units if sliding across highly polished mosaic tiles.</li>
              </ul>
            )}

            {activeTab === 'returns' && (
              <div className="space-y-3">
                <p><strong>White-Glove assembly:</strong> Our local delivery partners unpack and install the heavy hydraulic components completely free in your master bedroom. There is no additional installation fee.</p>
                <p><strong>24-Hour Settle limits:</strong> Any cancellations or customized layout adjustments must be filed within 24 hours of placing the order before logs enter the carpentry cuts stages.</p>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
