import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  MapPin, 
  Calendar, 
  Menu, 
  X, 
  Crown, 
  BookmarkCheck,
  Clock,
  MessageCircle,
  ChevronDown,
  Building2,
  UtensilsCrossed,
  Zap,
  Camera, 
  Info, 
  Lock,
  Gift,
  Compass,
  ShieldCheck,
  Briefcase
} from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';
import { PageId, HotelInfoConfig } from '../types/hotel';
import { LocalWeatherWidget } from './LocalWeatherWidget';

interface NavbarProps {
  currentPage: PageId | 'admin';
  onNavigate: (page: PageId) => void;
  onOpenBooking: (roomId?: string) => void;
  onOpenMyBookings: () => void;
  onOpenAdminLogin: () => void;
  hotelInfo?: HotelInfoConfig;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage,
  onNavigate, 
  onOpenBooking, 
  onOpenMyBookings,
  onOpenAdminLogin,
  hotelInfo = HOTEL_INFO
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuSections = [
    { id: 'rooms' as PageId, name: 'Accommodations & Suites', icon: Building2, desc: '52+ Luxury Suites from ₦45,000' },
    { id: 'offers' as PageId, name: 'Special Offers & Packages', icon: Gift, desc: 'Romantic, Corporate & Long-Stay Deals' },
    { id: 'attractions' as PageId, name: 'Akwanga & Nasarawa Guide', icon: Compass, desc: 'Farin Ruwa Falls & Local Heritage' },
    { id: 'events' as PageId, name: 'Grand Event Halls', icon: Calendar, desc: '1,200 Capacity Ballroom & Marquee' },
    { id: 'restaurant' as PageId, name: 'Royal Palm Restaurant', icon: UtensilsCrossed, desc: 'Nigerian & Continental Fine Dining' },
    { id: 'facilities' as PageId, name: 'Facilities & 24/7 Power', icon: Zap, desc: 'Olympic Pool, Gym & Zero Outages' },
    { id: 'policies' as PageId, name: 'Hotel Policies & FAQs', icon: ShieldCheck, desc: 'Check-In Times, Safety & Guarantees' },
    { id: 'careers' as PageId, name: 'Careers & Talent', icon: Briefcase, desc: 'Join Our 5-Star Hospitality Family' },
    { id: 'gallery' as PageId, name: 'Visual Photo Gallery', icon: Camera, desc: 'Suites, Pool & Architectural Tour' },
    { id: 'about' as PageId, name: 'About Jinji Hotels', icon: Info, desc: 'Heritage, Values & 5-Star Standards' },
    { id: 'contact' as PageId, name: 'Contact & Location', icon: MapPin, desc: 'Akwanga, Nasarawa & Direction Map' },
  ];

  const handleSelectPage = (page: PageId) => {
    onNavigate(page);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className={`bg-stone-950/95 border-b border-amber-900/30 text-stone-300 text-xs py-2 px-4 transition-all duration-300 ${isScrolled ? 'hidden md:block py-1.5' : 'py-2'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 text-stone-300">
            <a 
              href={hotelInfo.googleMapUrl || 'https://maps.app.goo.gl/BVnFZfDGksT9tPCd9'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
              title="Open Jinji Hotels on Google Maps (Andaha-Jos Road)"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{hotelInfo.shortAddress}</span>
            </a>
            <a 
              href={`tel:${hotelInfo.phonePrimary.replace(/\s+/g, '')}`} 
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{hotelInfo.phonePrimary}</span>
            </a>
            <span className="hidden lg:flex items-center gap-1.5 text-stone-400">
              <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Check-in: {hotelInfo.checkInTime} | Check-out: {hotelInfo.checkOutTime}</span>
            </span>
            <div className="hidden xl:block">
              <LocalWeatherWidget />
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={onOpenMyBookings}
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors font-medium cursor-pointer"
            >
              <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Find My Reservation</span>
            </button>
            <span className="text-stone-700">|</span>
            <a
              href={`https://wa.me/${hotelInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(hotelInfo.name)},%20I%20would%20like%20to%20make%20an%20inquiry.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Concierge</span>
            </a>
            <span className="text-stone-700">|</span>
            {/* Discreet hidden admin trigger button */}
            <button
              onClick={onOpenAdminLogin}
              className="text-stone-600 hover:text-amber-400/80 p-0.5 rounded transition-colors cursor-pointer"
              title="Staff Portal Login"
            >
              <Lock className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-stone-950/98 backdrop-blur-md shadow-2xl py-3 border-b border-amber-900/40' 
            : 'bg-stone-950/85 backdrop-blur-sm py-3.5 border-b border-amber-500/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Crest */}
          <button 
            onClick={() => handleSelectPage('home')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            {hotelInfo.logoUrl ? (
              <img src={hotelInfo.logoUrl} alt={hotelInfo.name} className="w-10 h-10 object-contain rounded-sm border border-amber-500/40 shadow-lg" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-full bg-stone-950 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-amber-400" />
                </div>
              </div>
            )}
            <div>
              <div className="font-crest text-lg sm:text-xl font-bold tracking-wider text-amber-100 group-hover:text-amber-400 transition-colors">
                {hotelInfo.logoText || 'JINJI HOTELS'}
              </div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-amber-400/80 font-medium">
                {hotelInfo.logoSubtitle || 'Luxury Hotel & Suites • Akwanga'}
              </div>
            </div>
          </button>

          {/* Desktop Nav Links & Dropdown Menu */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <button
              onClick={() => handleSelectPage('home')}
              className={`py-1 transition-colors cursor-pointer tracking-wide ${
                currentPage === 'home' ? 'text-amber-400 font-bold' : 'text-stone-300 hover:text-amber-300'
              }`}
            >
              Home
            </button>

            {/* SECTIONS DROPDOWN MENU */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`py-1 px-3 rounded-sm flex items-center gap-1.5 transition-all cursor-pointer border ${
                  dropdownOpen || (currentPage !== 'home' && currentPage !== 'admin')
                    ? 'border-amber-500/50 bg-amber-950/40 text-amber-400 font-semibold'
                    : 'border-stone-800 bg-stone-900/60 text-stone-200 hover:border-amber-500/30 hover:text-amber-300'
                }`}
              >
                <span>Hotel Sections Menu</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-amber-400' : 'text-stone-400'}`} />
              </button>

              {/* Dropdown Menu Popup */}
              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-stone-950/98 border border-amber-500/40 rounded-sm shadow-2xl backdrop-blur-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-2 border-b border-stone-800 text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                    Explore Dedicated Pages:
                  </div>
                  <div className="py-1 space-y-1">
                    {menuSections.map((sec) => {
                      const Icon = sec.icon;
                      const isCurrent = currentPage === sec.id;
                      return (
                        <button
                          key={sec.id}
                          onClick={() => handleSelectPage(sec.id)}
                          className={`w-full p-2.5 rounded-sm flex items-start gap-3 transition-colors text-left cursor-pointer ${
                            isCurrent
                              ? 'bg-amber-950/60 border border-amber-500/40 text-amber-300 font-semibold'
                              : 'hover:bg-stone-900 text-stone-300 hover:text-white'
                          }`}
                        >
                          <div className={`p-1.5 rounded-sm shrink-0 ${isCurrent ? 'bg-amber-500 text-stone-950' : 'bg-stone-900 text-amber-400'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold leading-none">{sec.name}</div>
                            <div className="text-[10px] text-stone-400 mt-1 leading-tight">{sec.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleSelectPage('rooms')}
              className={`py-1 transition-colors cursor-pointer tracking-wide ${
                currentPage === 'rooms' ? 'text-amber-400 font-bold' : 'text-stone-300 hover:text-amber-300'
              }`}
            >
              Suites & Rooms
            </button>

            <button
              onClick={() => handleSelectPage('offers')}
              className={`py-1 px-2.5 rounded-sm transition-all cursor-pointer tracking-wide flex items-center gap-1.5 ${
                currentPage === 'offers' 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold' 
                  : 'text-amber-300/90 hover:text-amber-200 border border-amber-500/30 bg-amber-950/30'
              }`}
            >
              <Gift className="w-3.5 h-3.5 text-amber-400" />
              <span>Special Offers</span>
            </button>

            <button
              onClick={() => handleSelectPage('attractions')}
              className={`py-1 transition-colors cursor-pointer tracking-wide ${
                currentPage === 'attractions' ? 'text-amber-400 font-bold' : 'text-stone-300 hover:text-amber-300'
              }`}
            >
              Akwanga Guide
            </button>

            <button
              onClick={() => handleSelectPage('events')}
              className={`py-1 transition-colors cursor-pointer tracking-wide ${
                currentPage === 'events' ? 'text-amber-400 font-bold' : 'text-stone-300 hover:text-amber-300'
              }`}
            >
              Event Halls
            </button>

            <button
              onClick={() => handleSelectPage('restaurant')}
              className={`py-1 transition-colors cursor-pointer tracking-wide ${
                currentPage === 'restaurant' ? 'text-amber-400 font-bold' : 'text-stone-300 hover:text-amber-300'
              }`}
            >
              Restaurant & Bar
            </button>

            <button
              onClick={() => handleSelectPage('contact')}
              className={`py-1 transition-colors cursor-pointer tracking-wide ${
                currentPage === 'contact' ? 'text-amber-400 font-bold' : 'text-stone-300 hover:text-amber-300'
              }`}
            >
              Contact
            </button>
          </div>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:via-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-amber-950/60 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-stone-950" />
              <span>Book Your Stay</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenBooking()}
              className="sm:hidden px-3 py-1.5 rounded-sm bg-amber-500 text-stone-950 font-bold text-xs uppercase"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-stone-300 hover:text-amber-400 hover:bg-stone-900 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-950/98 backdrop-blur-xl border-b border-amber-900/40 px-6 py-6 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800 text-xs text-amber-400 uppercase tracking-widest font-semibold">
            <span>Hotel Sections Menu</span>
            <button onClick={() => setMobileMenuOpen(false)} className="text-stone-400">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col gap-1 py-4 border-b border-stone-800">
            <button
              onClick={() => handleSelectPage('home')}
              className={`text-left py-2 text-sm font-medium transition-colors ${
                currentPage === 'home' ? 'text-amber-400 font-bold' : 'text-stone-300'
              }`}
            >
              🏠 Home Page
            </button>

            {menuSections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => handleSelectPage(sec.id)}
                className={`text-left py-2 text-sm font-medium transition-colors flex items-center justify-between ${
                  currentPage === sec.id ? 'text-amber-400 font-bold' : 'text-stone-300'
                }`}
              >
                <span>{sec.name}</span>
                <span className="text-[10px] text-stone-500">View Page →</span>
              </button>
            ))}
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-sm bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-stone-950 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Your Stay Now</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMyBookings();
              }}
              className="w-full py-2.5 rounded-sm bg-stone-900 border border-amber-500/30 text-amber-400 font-medium text-xs uppercase flex items-center justify-center gap-2"
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>Lookup My Reservation</span>
            </button>

            {/* Hidden admin link in mobile menu */}
            <div className="pt-2 text-center">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminLogin();
                }}
                className="text-stone-600 hover:text-amber-400 text-[11px] inline-flex items-center gap-1 cursor-pointer"
              >
                <Lock className="w-3 h-3" />
                <span>Staff Portal Access</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
