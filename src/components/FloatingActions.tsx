import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';
import { HotelInfoConfig } from '../types/hotel';

interface FloatingActionsProps {
  hotelInfo?: HotelInfoConfig;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ hotelInfo = HOTEL_INFO }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-11 h-11 rounded-full bg-stone-900 border border-amber-500/40 text-amber-400 hover:bg-stone-800 hover:text-amber-300 shadow-xl flex items-center justify-center transition-all cursor-pointer animate-in fade-in"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Floating WhatsApp Concierge */}
      <a
        href={`https://wa.me/${hotelInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(hotelInfo.name)},%20I%20am%20inquiring%20about%20room%20availability%20and%20rates.`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl hover:shadow-emerald-900/50 transition-all hover:scale-105"
        title={`Chat with ${hotelInfo.shortName} Concierge`}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-xs font-bold tracking-wide uppercase hidden sm:inline">
          Chat on WhatsApp
        </span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-stone-900 animate-pulse" />
      </a>
    </div>
  );
};
