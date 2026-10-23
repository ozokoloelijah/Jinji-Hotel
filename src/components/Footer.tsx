import React, { useState } from 'react';
import { 
  Crown, 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  CheckCircle2, 
  Lock,
  ExternalLink,
  Share2
} from 'lucide-react';
import { HOTEL_INFO, ROOMS_DATA } from '../data/hotelData';
import { PageId, HotelInfoConfig } from '../types/hotel';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: (roomId?: string) => void;
  onOpenMyBookings: () => void;
  onOpenAdminLogin: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
  onOpenSubmitReview?: () => void;
  onOpenShuttle?: () => void;
  onOpenCompareRooms?: () => void;
  hotelInfo?: HotelInfoConfig;
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigate,
  onOpenBooking, 
  onOpenMyBookings,
  onOpenAdminLogin,
  onOpenPrivacy,
  onOpenTerms,
  onOpenSubmitReview,
  onOpenShuttle,
  onOpenCompareRooms,
  hotelInfo = HOTEL_INFO
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
    }
  };

  const handleGoTo = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-amber-900/40 relative overflow-hidden">
      {/* Decorative top gold gradient accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Info (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              {hotelInfo.logoUrl ? (
                <img src={hotelInfo.logoUrl} alt={hotelInfo.name} className="w-11 h-11 object-contain rounded-sm border border-amber-500/40 shadow-lg" />
              ) : (
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 p-0.5 shadow-lg shadow-amber-950/40">
                  <div className="w-full h-full rounded-full bg-stone-950 flex items-center justify-center">
                    <Crown className="w-5 h-5 text-amber-400" />
                  </div>
                </div>
              )}
              <div>
                <div className="font-crest text-xl font-bold tracking-wider text-amber-100">
                  {hotelInfo.logoText || 'JINJI HOTELS'}
                </div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-amber-400/80 font-medium">
                  {hotelInfo.logoSubtitle || 'Luxury Hotel & Suites • Akwanga'}
                </div>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              {hotelInfo.description}
            </p>

            <div className="pt-2 text-xs text-stone-400 space-y-2">
              <div>
                <p className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span className="leading-snug">{hotelInfo.address}</span>
                </p>
                <div className="flex items-center gap-3 pl-5.5 pt-1 text-[11px]">
                  <a
                    href={hotelInfo.googleMapUrl || 'https://maps.app.goo.gl/BVnFZfDGksT9tPCd9'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <span className="text-stone-700">•</span>
                  <a
                    href={hotelInfo.googleShareUrl || 'https://share.google/NN3dac8IJIJL1vSF0'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-400 hover:text-white font-medium inline-flex items-center gap-1 transition-colors"
                  >
                    <Share2 className="w-2.5 h-2.5 text-blue-400" />
                    <span>Location Pin</span>
                  </a>
                </div>
              </div>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <a href={`tel:${hotelInfo.phonePrimary}`} className="hover:text-amber-400 transition-colors">
                  {hotelInfo.phonePrimary}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <a href={`mailto:${hotelInfo.email}`} className="hover:text-amber-400 transition-colors">
                  {hotelInfo.email}
                </a>
              </p>
            </div>
          </div>

          {/* Dedicated Section Pages (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif-luxury text-sm font-bold text-amber-300 uppercase tracking-wider">
              Hotel Pages & Sights
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleGoTo('home')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Home Page
                </button>
              </li>
              <li>
                <button onClick={() => handleGoTo('offers')} className="hover:text-amber-400 transition-colors cursor-pointer text-amber-300 font-medium">
                  Special Offers & Deals
                </button>
              </li>
              <li>
                <button onClick={() => handleGoTo('attractions')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Akwanga & Nasarawa Guide
                </button>
              </li>
              <li>
                <button onClick={() => handleGoTo('rooms')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Rooms & Suites
                </button>
              </li>
              <li>
                <button onClick={() => handleGoTo('events')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Event Halls & Banquets
                </button>
              </li>
              <li>
                <button onClick={() => handleGoTo('restaurant')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Royal Palm Restaurant
                </button>
              </li>
              <li>
                <button onClick={() => handleGoTo('facilities')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Facilities & 24/7 Power
                </button>
              </li>
              <li>
                <button onClick={() => handleGoTo('policies')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Hotel Policies & FAQs
                </button>
              </li>
              <li>
                <button onClick={() => handleGoTo('careers')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Careers & Talent
                </button>
              </li>
              <li>
                <button onClick={() => handleGoTo('gallery')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Photo Gallery
                </button>
              </li>
              <li>
                <button onClick={() => handleGoTo('contact')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Contact & Directions
                </button>
              </li>
            </ul>
          </div>

          {/* Accommodations (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif-luxury text-sm font-bold text-amber-300 uppercase tracking-wider">
              Accommodations & Guest Tools
            </h4>
            <ul className="space-y-2 text-xs">
              {ROOMS_DATA.map((r) => (
                <li key={r.id}>
                  <button
                    onClick={() => {
                      handleGoTo('rooms');
                      onOpenBooking(r.id);
                    }}
                    className="flex items-center justify-between w-full hover:text-amber-400 transition-colors text-left group cursor-pointer"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform">{r.name}</span>
                    <span className="text-[11px] text-amber-400/80 font-mono">₦{r.price.toLocaleString()}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="pt-2 space-y-2">
              {onOpenCompareRooms && (
                <button
                  onClick={onOpenCompareRooms}
                  className="w-full py-1.5 px-3 bg-stone-900 border border-stone-700 hover:border-amber-500/50 text-stone-200 text-xs font-medium rounded-sm transition-colors cursor-pointer text-left flex items-center justify-between"
                >
                  <span>Compare All 5 Suites</span>
                  <span className="text-amber-400 text-[11px]">→</span>
                </button>
              )}

              {onOpenShuttle && (
                <button
                  onClick={onOpenShuttle}
                  className="w-full py-1.5 px-3 bg-stone-900 border border-stone-700 hover:border-amber-500/50 text-stone-200 text-xs font-medium rounded-sm transition-colors cursor-pointer text-left flex items-center justify-between"
                >
                  <span>Airport Chauffeur Shuttle</span>
                  <span className="text-amber-400 text-[11px]">→</span>
                </button>
              )}

              {onOpenSubmitReview && (
                <button
                  onClick={onOpenSubmitReview}
                  className="w-full py-1.5 px-3 bg-stone-900 border border-stone-700 hover:border-amber-500/50 text-stone-200 text-xs font-medium rounded-sm transition-colors cursor-pointer text-left flex items-center justify-between"
                >
                  <span>Write a Guest Review</span>
                  <span className="text-amber-400 text-[11px]">★</span>
                </button>
              )}

              <button
                onClick={onOpenMyBookings}
                className="w-full py-2 px-3 bg-stone-900 border border-amber-500/30 text-amber-400 text-xs font-semibold rounded-sm hover:bg-stone-850 transition-colors cursor-pointer text-center block"
              >
                Find / Manage My Booking
              </button>
            </div>
          </div>

          {/* Newsletter (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif-luxury text-sm font-bold text-amber-300 uppercase tracking-wider">
              Exclusive VIP Offers
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Subscribe to receive private discounts, seasonal weekend retreat packages, and gala invitations.
            </p>

            {newsletterSubscribed ? (
              <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-sm text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Thank you! You are subscribed to VIP Offers.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 text-stone-100 text-xs rounded-sm px-3 py-2.5 outline-none focus:border-amber-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe to Newsletter</span>
                </button>
              </form>
            )}

            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-wider text-stone-500 block mb-1">
                Accepted Payment Methods
              </span>
              <div className="flex flex-wrap gap-1.5 text-[10px] text-stone-400">
                <span className="px-2 py-0.5 bg-stone-900 border border-stone-800 rounded-sm">Mastercard</span>
                <span className="px-2 py-0.5 bg-stone-900 border border-stone-800 rounded-sm">Visa</span>
                <span className="px-2 py-0.5 bg-stone-900 border border-stone-800 rounded-sm">Verve</span>
                <span className="px-2 py-0.5 bg-stone-900 border border-stone-800 rounded-sm">Bank Transfer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Hidden Admin Access */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div className="text-center sm:text-left">
            <p>© {new Date().getFullYear()} Jinji Hotels Ltd. All rights reserved.</p>
            <p className="text-[11px] text-stone-600 mt-0.5">
              {hotelInfo.address}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button 
              onClick={onOpenPrivacy} 
              className="hover:text-amber-400 cursor-pointer text-stone-400 transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button 
              onClick={onOpenTerms} 
              className="hover:text-amber-400 cursor-pointer text-stone-400 transition-colors"
            >
              Terms & Conditions
            </button>
            <span>•</span>
            
            {/* HIDDEN ADMIN BUTTON */}
            <button
              onClick={onOpenAdminLogin}
              className="inline-flex items-center gap-1 text-stone-600 hover:text-amber-400 transition-colors p-1 rounded cursor-pointer"
              title="Staff Management Portal (Requires Login)"
            >
              <Lock className="w-3 h-3" />
              <span className="text-[11px]">Staff Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
