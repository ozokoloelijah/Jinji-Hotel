import React, { useState } from 'react';
import { 
  Star, 
  Calendar, 
  Users, 
  ArrowRight, 
  Bed, 
  ShieldCheck, 
  Zap, 
  Wifi, 
  CheckCircle2 
} from 'lucide-react';
import { HOTEL_INFO, ROOMS_DATA } from '../data/hotelData';

interface HeroProps {
  onOpenBooking: (roomId?: string, initialData?: { checkIn: string; checkOut: string; adults: number }) => void;
  onExploreRooms: () => void;
  onExploreEvents: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreRooms, onExploreEvents }) => {
  // Dates default to today and tomorrow in YYYY-MM-DD
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(formatDate(today));
  const [checkOut, setCheckOut] = useState(formatDate(tomorrow));
  const [selectedRoomId, setSelectedRoomId] = useState(ROOMS_DATA[0].id);
  const [adults, setAdults] = useState(2);

  const selectedRoom = ROOMS_DATA.find((r) => r.id === selectedRoomId) || ROOMS_DATA[0];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking(selectedRoomId, {
      checkIn,
      checkOut,
      adults,
    });
  };

  return (
    <section id="home" className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-24 pb-12 sm:pb-16 overflow-hidden">
      {/* Background Image with Luxury Tint & Radial Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85"
          alt="Jinji Hotels Ltd Luxury Facade & Lobby"
          className="w-full h-full object-cover object-top scale-105 filter brightness-[0.40] contrast-[1.1]"
        />
        {/* Gradient overlays matching Ri-Seingon dark luxury tone */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,12,0.85)_100%)]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 lg:pt-24 text-center my-auto">
        {/* 5-Star Luxury Rating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/40 backdrop-blur-md mb-6 shadow-lg shadow-amber-950/50">
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-amber-200">
            5-STAR LUXURY HOSPITALITY • AKWANGA, NASARAWA
          </span>
        </div>

        {/* Hero Main Heading */}
        <h1 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-stone-100 max-w-5xl mx-auto leading-[1.15] mb-6">
          A Beacon of <span className="shimmer-gold">Luxury</span> and Refined Hospitality
        </h1>

        {/* Hero Tagline */}
        <p className="text-base sm:text-lg md:text-xl text-stone-300 max-w-3xl mx-auto font-light leading-relaxed mb-8 sm:mb-10">
          Welcome to <strong className="text-amber-400 font-medium">Jinji Hotels Ltd</strong> — where timeless comfort,
          sumptuous suites, 24/7 guaranteed power, magnificent event halls, and gourmet dining create an unforgettable sanctuary in Nasarawa State.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 sm:mb-14">
          <button
            onClick={() => onOpenBooking()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-sm bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:via-amber-500 hover:to-amber-600 text-stone-950 font-bold text-sm tracking-wider uppercase transition-all shadow-xl shadow-amber-900/50 hover:shadow-amber-600/40 hover:-translate-y-0.5 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-stone-950" />
            <span>Book Your Stay</span>
          </button>

          <button
            onClick={onExploreRooms}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-sm bg-stone-900/80 hover:bg-stone-800/90 text-stone-200 hover:text-amber-300 border border-amber-500/30 hover:border-amber-400 font-semibold text-sm tracking-wide transition-all backdrop-blur-md cursor-pointer"
          >
            <span>Explore Rooms & Suites</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>

          <button
            onClick={onExploreEvents}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm bg-transparent hover:bg-stone-900/40 text-stone-300 hover:text-white border border-stone-700 hover:border-stone-500 font-medium text-sm tracking-wide transition-all cursor-pointer"
          >
            <span>Event Halls (800+ Cap)</span>
          </button>
        </div>

        {/* Hallmarks Badges Ticker */}
        <div className="hidden md:flex flex-wrap items-center justify-center gap-6 lg:gap-10 text-xs text-stone-300 font-medium pb-2">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>24/7 Guaranteed Power Supply</span>
          </div>
          <span className="text-amber-500/40">•</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Armed Security & 24/7 CCTV</span>
          </div>
          <span className="text-amber-500/40">•</span>
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-amber-400" />
            <span>Ultra-Fast Starlink Wi-Fi</span>
          </div>
          <span className="text-amber-500/40">•</span>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>52+ World-Class Suites</span>
          </div>
        </div>
      </div>

      {/* Floating Reservation Booking Bar */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 w-full mt-6">
        <div className="bg-stone-950/90 border border-amber-500/40 rounded-md backdrop-blur-xl shadow-2xl p-4 sm:p-6 text-stone-100">
          <div className="flex items-center justify-between border-b border-amber-900/40 pb-3 mb-4">
            <span className="font-crest text-xs sm:text-sm font-semibold tracking-wider text-amber-400 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              DIRECT RESERVATIONS • BEST RATE GUARANTEE
            </span>
            <span className="text-xs text-stone-400 hidden sm:inline">
              Selected: <strong className="text-amber-300">{selectedRoom.name}</strong> (₦{selectedRoom.price.toLocaleString()} / night)
            </span>
          </div>

          <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* Check-in Date */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1.5">
                Check-In Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={checkIn}
                  min={formatDate(today)}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-stone-100 text-sm rounded-sm px-3.5 py-2.5 outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Check-out Date */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1.5">
                Check-Out Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-stone-100 text-sm rounded-sm px-3.5 py-2.5 outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Room Category */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1.5 flex items-center gap-1.5">
                <Bed className="w-3.5 h-3.5 text-amber-500" />
                Room / Suite Category
              </label>
              <select
                value={selectedRoomId}
                onChange={(e) => setSelectedRoomId(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-stone-100 text-sm rounded-sm px-3.5 py-2.5 outline-none transition-colors"
              >
                {ROOMS_DATA.map((room) => (
                  <option key={room.id} value={room.id} className="bg-stone-900 text-stone-100">
                    {room.name} — ₦{room.price.toLocaleString()}/night
                  </option>
                ))}
              </select>
            </div>

            {/* Guests & Action Button */}
            <div className="flex gap-2">
              <div className="w-1/3 sm:w-1/3">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1.5 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-amber-500" />
                  Guests
                </label>
                <select
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="w-full bg-stone-900 border border-stone-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-stone-100 text-sm rounded-sm px-2.5 py-2.5 outline-none"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                </select>
              </div>

              <div className="w-2/3 sm:w-2/3">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-transparent mb-1.5">
                  Action
                </label>
                <button
                  type="submit"
                  className="w-full py-2.5 px-3 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-amber-500/20 flex items-center justify-center gap-1.5 cursor-pointer h-[42px]"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
