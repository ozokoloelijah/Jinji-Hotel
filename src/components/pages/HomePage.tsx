import React from 'react';
import { HomeHeroSlider } from '../HomeHeroSlider';
import { JinjiRewardsSection } from '../JinjiRewardsSection';
import { PageId, Room, HotelInfoConfig } from '../../types/hotel';
import { HOTEL_INFO, ROOMS_DATA, HOME_SLIDER_IMAGES } from '../../data/hotelData';
import { 
  Building2, 
  UtensilsCrossed, 
  Calendar, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Waves
} from 'lucide-react';

interface HomePageProps {
  onOpenBooking: (roomId?: string, initialData?: { checkIn: string; checkOut: string; adults: number }) => void;
  onNavigate: (page: PageId) => void;
  onOpenLoyaltyModal?: () => void;
  sliderImages?: Array<{ id: number; title: string; tagline: string; url: string }>;
  rooms?: Room[];
  hotelInfo?: HotelInfoConfig;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onOpenBooking, 
  onNavigate,
  onOpenLoyaltyModal,
  sliderImages = HOME_SLIDER_IMAGES,
  rooms = ROOMS_DATA,
  hotelInfo = HOTEL_INFO
}) => {
  return (
    <div>
      {/* 5-Image 3-Second Slider Hero with Minimal Write-up */}
      <HomeHeroSlider 
        onOpenBooking={onOpenBooking} 
        onNavigate={onNavigate} 
        sliderImages={sliderImages}
        rooms={rooms}
        hotelInfo={hotelInfo}
      />

      {/* Minimal Luxury Portal Quick Links Strip */}
      <section className="bg-stone-900 border-t border-b border-amber-950/40 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-400 block mb-1">
              EXPLORE JINJI HOTELS LTD
            </span>
            <h2 className="font-serif-luxury text-2xl font-bold text-stone-100">
              Discover Our Distinctive Offerings
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              onClick={() => onNavigate('rooms')}
              className="p-5 rounded-sm bg-stone-950 border border-stone-800 hover:border-amber-500/50 transition-all cursor-pointer group text-center"
            >
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-3 group-hover:bg-amber-500 group-hover:text-stone-950 transition-colors">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif-luxury text-sm font-bold text-stone-100 group-hover:text-amber-300">
                Suites & Rooms
              </h3>
              <p className="text-[11px] text-stone-400 mt-1">From ₦45,000 / Night</p>
            </div>

            <div
              onClick={() => onNavigate('events')}
              className="p-5 rounded-sm bg-stone-950 border border-stone-800 hover:border-amber-500/50 transition-all cursor-pointer group text-center"
            >
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-3 group-hover:bg-amber-500 group-hover:text-stone-950 transition-colors">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-serif-luxury text-sm font-bold text-stone-100 group-hover:text-amber-300">
                Event Halls
              </h3>
              <p className="text-[11px] text-stone-400 mt-1">Up to 1,200 Capacity</p>
            </div>

            <div
              onClick={() => onNavigate('restaurant')}
              className="p-5 rounded-sm bg-stone-950 border border-stone-800 hover:border-amber-500/50 transition-all cursor-pointer group text-center"
            >
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-3 group-hover:bg-amber-500 group-hover:text-stone-950 transition-colors">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <h3 className="font-serif-luxury text-sm font-bold text-stone-100 group-hover:text-amber-300">
                Royal Palm Dining
              </h3>
              <p className="text-[11px] text-stone-400 mt-1">Nigerian & Continental</p>
            </div>

            <div
              onClick={() => onNavigate('facilities')}
              className="p-5 rounded-sm bg-stone-950 border border-stone-800 hover:border-amber-500/50 transition-all cursor-pointer group text-center"
            >
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-3 group-hover:bg-amber-500 group-hover:text-stone-950 transition-colors">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-serif-luxury text-sm font-bold text-stone-100 group-hover:text-amber-300">
                24/7 Power & Pool
              </h3>
              <p className="text-[11px] text-stone-400 mt-1">Zero Outage Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Jinji Rewards VIP Loyalty Program Section */}
      <JinjiRewardsSection 
        onOpenBooking={onOpenBooking}
        onOpenLoyaltyModal={onOpenLoyaltyModal || (() => {})}
        onNavigate={onNavigate}
        rooms={rooms}
      />
    </div>
  );
};
