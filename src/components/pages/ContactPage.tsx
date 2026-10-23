import React from 'react';
import { ContactSection } from '../ContactSection';
import { FAQSection } from '../FAQSection';
import { MapPin, ArrowLeft } from 'lucide-react';
import { PageId, HotelInfoConfig } from '../../types/hotel';
import { HOTEL_INFO } from '../../data/hotelData';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
  hotelInfo?: HotelInfoConfig;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, hotelInfo = HOTEL_INFO }) => {
  return (
    <div className="pt-24 pb-16">
      <div className="bg-stone-950 py-12 px-4 sm:px-6 lg:px-8 border-b border-amber-950/40 text-center">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 uppercase tracking-wider mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>CONTACT & LOCATION</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-stone-100 tracking-tight">
            Find Us in Akwanga, Nasarawa State
          </h1>
          <p className="text-stone-300 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
            {hotelInfo.address}. 24/7 Concierge Hotline: {hotelInfo.phonePrimary}.
          </p>
        </div>
      </div>

      <ContactSection hotelInfo={hotelInfo} />
      <FAQSection />
    </div>
  );
};
