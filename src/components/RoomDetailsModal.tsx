import React, { useState } from 'react';
import { 
  X, 
  Bed, 
  Users, 
  Maximize2, 
  Check, 
  Calendar, 
  Star, 
  ShieldCheck, 
  Sparkles,
  Zap
} from 'lucide-react';
import { Room } from '../types/hotel';

interface RoomDetailsModalProps {
  room: Room | null;
  onClose: () => void;
  onBook: (roomId: string) => void;
}

export const RoomDetailsModal: React.FC<RoomDetailsModalProps> = ({ room, onClose, onBook }) => {
  if (!room) return null;

  const [activeImage, setActiveImage] = useState(room.featuredImage);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-stone-900 border border-amber-500/40 rounded-sm shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-950 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <span className="font-crest text-xs tracking-widest uppercase text-amber-400">
              JINJI HOTELS LTD • ROOM SPECIFICATION
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-sm text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Main Visual Carousel / Gallery */}
          <div>
            <div className="relative h-72 sm:h-96 rounded-sm overflow-hidden border border-stone-800 mb-3">
              <img
                src={activeImage}
                alt={room.name}
                className="w-full h-full object-cover object-top transition-all duration-500"
              />
              <div className="absolute bottom-3 right-3 bg-stone-950/90 border border-amber-500/40 px-4 py-2 rounded-sm text-right backdrop-blur-md">
                <span className="text-[11px] text-stone-400 uppercase tracking-wider block">Official Rate</span>
                <span className="text-xl sm:text-2xl font-bold text-amber-400 font-serif-luxury">
                  ₦{room.price.toLocaleString()}
                </span>
                <span className="text-stone-400 text-xs"> / night</span>
              </div>
            </div>

            {/* Thumbnail selectors */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {room.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-16 rounded-sm overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activeImage === img ? 'border-amber-400 scale-105' : 'border-stone-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${room.name} thumb ${idx}`} className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          </div>

          {/* Room Title & Key Specs */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-100">
                {room.name}
              </h2>
              {room.badge && (
                <span className="px-3 py-1 bg-amber-500 text-stone-950 text-xs font-bold uppercase rounded-sm tracking-wider">
                  {room.badge}
                </span>
              )}
            </div>
            <p className="text-amber-400/90 text-sm italic font-serif-luxury">
              "{room.tagline}"
            </p>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-stone-950/80 rounded-sm border border-stone-800 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <Maximize2 className="w-4 h-4 text-amber-400" />
              <div>
                <span className="text-stone-400 block text-[10px] uppercase">Room Space</span>
                <strong className="text-stone-200">{room.sizeSqm} sqm</strong>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Bed className="w-4 h-4 text-amber-400" />
              <div>
                <span className="text-stone-400 block text-[10px] uppercase">Bedding Type</span>
                <strong className="text-stone-200">{room.bedType}</strong>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" />
              <div>
                <span className="text-stone-400 block text-[10px] uppercase">Occupancy</span>
                <strong className="text-stone-200">Up to {room.maxGuests} Guests</strong>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <div>
                <span className="text-stone-400 block text-[10px] uppercase">Power Supply</span>
                <strong className="text-amber-400">24/7 Guaranteed</strong>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
              Room Overview & Atmosphere
            </h4>
            <p className="text-stone-300 text-sm leading-relaxed">
              {room.description}
            </p>
          </div>

          {/* Highlights & Key Features */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
              Room Signature Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {room.highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-stone-300 bg-stone-950/50 p-2 rounded-sm border border-stone-800">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Full Amenities Checklist */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
              Included In-Room Amenities
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-stone-300">
              {room.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="px-6 py-4 bg-stone-950 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-stone-400 text-xs">
            Includes complimentary Starlink Wi-Fi & daily housekeeping.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded-sm bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBook(room.id);
              }}
              className="w-1/2 sm:w-auto px-7 py-2.5 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book This Room</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
