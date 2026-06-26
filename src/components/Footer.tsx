import { useState } from 'react';
import { ViewState } from '../types';

interface FooterProps {
  onNavigate: (view: ViewState) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="bg-[#1A1209] text-stone-300 border-t border-[#3D2B1F] pt-16 pb-8 px-4 sm:px-6 lg:px-8 mt-auto">
      
      {/* Wooden Strip pattern decor */}
      <div className="h-2 bg-radial from-[#6B3F1F] via-[#7D4E28] to-[#5A3318] mb-12 rounded-full"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand Column */}
        <div className="flex flex-col space-y-4">
          <div 
            onClick={() => onNavigate('home')} 
            className="cursor-pointer select-none"
          >
            {!logoError ? (
              <img 
                src="/bhisez%20logo.png" 
                alt="Bhisez Furniture" 
                className="h-10 sm:h-12 w-auto object-contain block py-0.5" 
                onError={() => setLogoError(true)}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex flex-col items-start select-none">
                {/* "Bhisez" with custom dotless i and precise Red dot */}
                <div 
                  className="text-3xl font-black tracking-tight leading-none relative flex items-baseline text-[#FBBD18]"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                >
                  <span>Bh</span>
                  <span className="relative inline-flex items-center justify-center">
                    ı
                    <span 
                      className="absolute -top-[0.25em] left-[52%] -translate-x-1/2 rounded-full bg-[#E52E2D]"
                      style={{ 
                        width: "0.26em",
                        height: "0.26em"
                      }}
                    ></span>
                  </span>
                  <span>sez</span>
                </div>
                {/* Underline Rule & FURNITURE */}
                <div className="flex items-center w-full max-w-[104px] mt-1 bg-transparent">
                  <div className="h-[1.5px] flex-1 bg-[#FAF7F2]"></div>
                  <span 
                    className="text-[8px] font-black tracking-[0.16em] px-2 leading-none mt-0.5 text-[#FAF7F2]"
                    style={{ fontFamily: '"DM Sans", "Space Grotesk", sans-serif' }}
                  >
                    FURNITURE
                  </span>
                  <div className="h-[1.5px] flex-1 bg-[#FAF7F2]"></div>
                </div>
              </div>
            )}
          </div>
          <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
            Handcrafted with solid teak, sheesham, and mango hardwoods based out of the premium coastal region of Malvan & Sukalwad, Sindhudurg since 2010. Designed to outlast trends.
          </p>
          <div className="text-[11px] font-mono text-[#C9983A]">
            ESTD. 2010 · SINDHUDURG, MH
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="font-serif text-amber-50 text-sm font-bold tracking-wider uppercase mb-5">Quick Links</h4>
          <ul className="space-y-3 text-xs">
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-[#E8B84B] transition-colors cursor-pointer bg-transparent border-none text-stone-400">
                Home Showcase
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('beds')} className="hover:text-[#E8B84B] transition-colors cursor-pointer bg-transparent border-none text-stone-400">
                All Products & Beds
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('showroom')} className="hover:text-[#E8B84B] transition-colors cursor-pointer bg-transparent border-none text-stone-400">
                Visits & Walkthroughs
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('about')} className="hover:text-[#E8B84B] transition-colors cursor-pointer bg-transparent border-none text-stone-400">
                Our Story & Wood Grades
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div>
          <h4 className="font-serif text-amber-50 text-sm font-bold tracking-wider uppercase mb-5">Our Showrooms</h4>
          <ul className="space-y-4 text-xs text-stone-400">
            <li className="flex items-start space-x-2">
              <span className="text-amber-500">📍</span>
              <span>
                <strong>Malvan Showroom:</strong><br />
                Main Market Road, Malvan, Sindhudurg, Maharashtra – 416606
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-amber-500">📍</span>
              <span>
                <strong>Sukalwad Showroom:</strong><br />
                NH-66 Highway, Sukalwad, Sindhudurg, Maharashtra – 416520
              </span>
            </li>
          </ul>
        </div>

        {/* Help Column */}
        <div>
          <h4 className="font-serif text-amber-50 text-sm font-bold tracking-wider uppercase mb-5">Support & Sales</h4>
          <p className="text-xs text-stone-400 leading-relaxed mb-4">
            Get instant price quotes or customise design widths, depths or polish stains over WhatsApp.
          </p>
          <div className="flex flex-col space-y-2">
            <a 
              href="https://wa.me/919999999999?text=Hi Bhise'z! I'd like to get a pricing quote for teak furniture." 
              target="_blank" 
              rel="noreferrer"
              className="text-center bg-[#C9983A] hover:bg-[#E8B84B] text-amber-950 font-bold text-xs py-2 px-4 rounded-md transition-colors"
            >
              💬 Chat on WhatsApp
            </a>
            <a 
              href="tel:+919999999999" 
              className="text-center border border-[#3D2B1F] text-amber-50 hover:bg-stone-800 text-xs font-semibold py-2 px-4 rounded-md transition-all"
            >
              📞 Call +91 99999 99999
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[#3D2B1F] flex flex-col md:flex-row justify-between items-center text-xs text-stone-500">
        <p>© 2026 Bhise'z Furniture. Handcrafted with Care in Southern Konkan (Maharashtra). All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <button onClick={() => onNavigate('contact')} className="hover:underline bg-transparent border-none text-stone-500 cursor-pointer">Inquire</button>
          <span>·</span>
          <span className="text-[#C9983A]">Ramesh & Sunita Bhise master designs</span>
        </div>
      </div>

    </footer>
  );
}
