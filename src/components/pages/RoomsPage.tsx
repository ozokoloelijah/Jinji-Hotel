import React from 'react';
import { RoomsSection } from '../RoomsSection';
import { Bed, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import { PageId, Room, HotelInfoConfig } from '../../types/hotel';
import { HOTEL_INFO, ROOMS_DATA } from '../../data/hotelData';

interface RoomsPageProps {
  onSelectRoomDetails: (room: Room) => void;
  onBookRoom: (roomId: string) => void;
  onNavigate: (page: PageId) => void;
  rooms?: Room[];
  hotelInfo?: HotelInfoConfig;
}

export const RoomsPage: React.FC<RoomsPageProps> = ({
  onSelectRoomDetails,
  onBookRoom,
  onNavigate,
  rooms = ROOMS_DATA,
  hotelInfo = HOTEL_INFO
}) => {
  return (
    <div className="pt-24 pb-16">
      {/* Page Title Banner */}
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
            <Bed className="w-3.5 h-3.5" />
            <span>ACCOMMODATIONS & SUITES</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-stone-100 tracking-tight">
            Rooms & Suites at {hotelInfo.name}
          </h1>
          <p className="text-stone-300 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
            Choose from 52+ elegantly appointed rooms starting from ₦45,000/night, with guaranteed 24/7 power, high-speed Starlink Wi-Fi, and 24-hour room service.
          </p>
        </div>
      </div>

      <RoomsSection
        onSelectRoomDetails={onSelectRoomDetails}
        onBookRoom={onBookRoom}
        rooms={rooms}
      />
    </div>
  );
};
