import React, { useState } from 'react';
import { 
  Bed, 
  Users, 
  Maximize2, 
  Check, 
  Eye, 
  Calendar, 
  Sparkles,
  Wifi,
  Tv,
  Coffee,
  ShieldAlert
} from 'lucide-react';
import { ROOMS_DATA } from '../data/hotelData';
import { Room } from '../types/hotel';

interface RoomsSectionProps {
  onSelectRoomDetails: (room: Room) => void;
  onBookRoom: (roomId: string) => void;
  rooms?: Room[];
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({ 
  onSelectRoomDetails, 
  onBookRoom,
  rooms = ROOMS_DATA
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Rooms & Suites' },
    { id: 'standard', label: 'Standard Room' },
    { id: 'deluxe', label: 'Deluxe Room' },
    { id: 'super-deluxe', label: 'Super Deluxe' },
    { id: 'executive', label: 'Executive Suite' },
    { id: 'presidential', label: 'Presidential Suite' },
  ];

  const filteredRooms = activeCategory === 'all' 
    ? rooms 
    : rooms.filter(r => r.category === activeCategory);

  return (
    <section id="rooms" className="py-20 lg:py-28 bg-stone-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LUXURY ACCOMMODATIONS</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100 tracking-tight mb-4">
            Each Room is a Masterpiece of Comfort & Design
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-4" />
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            From the comfortable intimacy of our Standard Rooms to the palatial luxury of our Presidential Suite, immerse yourself in hand-crafted furnishings, bespoke amenities, and 24/7 unyielding comfort.
          </p>
        </div>

        {/* Filter Categories Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 sm:px-5 py-2 rounded-sm text-xs sm:text-sm font-medium tracking-wide transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold shadow-lg shadow-amber-900/30'
                  : 'bg-stone-900 text-stone-300 hover:text-amber-300 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-stone-900/90 border border-stone-800 hover:border-amber-500/40 rounded-sm overflow-hidden transition-all duration-300 group flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-amber-950/40"
            >
              {/* Image & Badges */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room.featuredImage}
                  alt={room.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />

                {/* Badge if present */}
                {room.badge && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-amber-700 text-stone-950 text-[11px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider shadow-md">
                    {room.badge}
                  </div>
                )}

                {/* Price Tag Floating bottom right */}
                <div className="absolute bottom-3 right-3 bg-stone-950/90 border border-amber-500/40 px-3.5 py-1.5 rounded-sm backdrop-blur-md text-right">
                  <span className="text-[10px] uppercase text-stone-400 block tracking-wider">Starting from</span>
                  <span className="text-amber-400 font-bold text-lg font-serif-luxury">
                    ₦{room.price.toLocaleString()}
                  </span>
                  <span className="text-stone-400 text-xs"> / night</span>
                </div>
              </div>

              {/* Room Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-100 mb-1 group-hover:text-amber-300 transition-colors">
                    {room.name}
                  </h3>
                  <p className="text-stone-400 text-xs mb-4 line-clamp-2">
                    {room.tagline}
                  </p>

                  {/* Room Specs Icons */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-800 mb-4 text-xs text-stone-300">
                    <div className="flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{room.sizeSqm} sqm</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Bed className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="truncate">{room.bedType.split(' ')[0]}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>Max {room.maxGuests}</span>
                    </div>
                  </div>

                  {/* Amenities Highlights Strip */}
                  <div className="space-y-1.5 mb-6">
                    {room.highlights.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-stone-300">
                        <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => onSelectRoomDetails(room)}
                    className="w-full py-2.5 px-3 rounded-sm bg-stone-800 hover:bg-stone-750 text-stone-300 hover:text-white border border-stone-700 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Details</span>
                  </button>

                  <button
                    onClick={() => onBookRoom(room.id)}
                    className="w-full py-2.5 px-3 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-bold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Banner Below Rooms */}
        <div className="mt-16 bg-stone-900 border border-amber-900/40 p-6 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif-luxury text-lg font-semibold text-stone-100">
                Direct Booking Advantages
              </h4>
              <p className="text-xs sm:text-sm text-stone-400">
                Guaranteed best rate, complimentary high-speed Starlink Wi-Fi, flexible cancellation, and priority early check-in.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onBookRoom(ROOMS_DATA[0].id)}
              className="px-6 py-2.5 rounded-sm bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Check Availability
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
