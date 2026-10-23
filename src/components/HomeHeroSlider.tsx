import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Sparkles, 
  ArrowRight,
  Bed,
  Users,
  ShieldCheck,
  Zap,
  Wifi,
  Crown
} from 'lucide-react';
import { HOME_SLIDER_IMAGES, ROOMS_DATA, HOTEL_INFO } from '../data/hotelData';
import { PageId, Room, HotelInfoConfig } from '../types/hotel';

interface HomeHeroSliderProps {
  onOpenBooking: (roomId?: string, initialData?: { checkIn: string; checkOut: string; adults: number }) => void;
  onNavigate: (page: PageId) => void;
  sliderImages?: Array<{ id: number; title: string; tagline: string; url: string }>;
  rooms?: Room[];
  hotelInfo?: HotelInfoConfig;
}

export const HomeHeroSlider: React.FC<HomeHeroSliderProps> = ({ 
  onOpenBooking, 
  onNavigate,
  sliderImages = HOME_SLIDER_IMAGES,
  rooms = ROOMS_DATA,
  hotelInfo = HOTEL_INFO
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = sliderImages.length;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reservation quick dates
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(formatDate(today));
  const [checkOut, setCheckOut] = useState(formatDate(tomorrow));
  const [selectedRoomId, setSelectedRoomId] = useState(rooms[0]?.id || 'standard-room');
  const [adults, setAdults] = useState(2);

  // 3-second automatic slide from right to left
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 3000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total]);

  const goToNext = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const goToPrev = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking(selectedRoomId, {
      checkIn,
      checkOut,
      adults,
    });
  };

  return (
    <div className="w-full bg-stone-950 pt-20 sm:pt-24">
      {/* 1. SLIDER CONTAINER - Clear, Vibrant, Crisp 5-Image Carousel Sliding Right to Left */}
      <div className="relative w-full h-[380px] sm:h-[500px] md:h-[580px] lg:h-[640px] overflow-hidden bg-black select-none">
        {/* Sliding images strip */}
        <div 
          className="flex h-full w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {sliderImages.map((slide, idx) => (
            <div key={slide.id || idx} className="w-full h-full shrink-0 relative overflow-hidden bg-stone-950 flex items-center justify-center">
              {/* Ambient blurred backdrop that automatically fills widescreen/frame margins for photos of any aspect ratio */}
              <img
                src={slide.url}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover filter blur-2xl scale-125 opacity-40 brightness-50 pointer-events-none"
              />

              {/* Main slide picture automatically fitted into frame with upper top part showing */}
              <img
                src={slide.url}
                alt={slide.title}
                className="relative z-10 w-full h-full object-cover object-top filter brightness-[0.94] contrast-[1.03] saturate-[1.05] transition-all duration-700"
              />

              {/* Subtle edge shadows only to frame the image and preserve clear details */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/25 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Previous Slide Navigation Button */}
        <button
          onClick={goToPrev}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-stone-950/60 hover:bg-stone-900/90 border border-amber-500/40 text-amber-400 hover:text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-2xl hover:scale-105"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Slide Navigation Button */}
        <button
          onClick={goToNext}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-stone-950/60 hover:bg-stone-900/90 border border-amber-500/40 text-amber-400 hover:text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-2xl hover:scale-105"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Floating Slide Caption & Progress Indicators on bottom of slider */}
        <div className="absolute bottom-5 left-0 right-0 z-20 px-4 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-3 pointer-events-none">
          {/* Slide Title & Identifier Tag */}
          <div className="pointer-events-auto bg-stone-950/85 border border-amber-500/40 backdrop-blur-md px-3.5 py-1.5 rounded-sm shadow-xl flex items-center gap-2.5">
            <span className="px-2 py-0.5 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 text-[10px] font-bold uppercase tracking-wider shadow-sm">
              Slide {currentIndex + 1} of {total}
            </span>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs sm:text-sm font-serif-luxury font-bold text-amber-200">
              {sliderImages[currentIndex]?.title}
            </span>
            <span className="text-stone-400 text-xs hidden md:inline">
              — {sliderImages[currentIndex]?.tagline}
            </span>
          </div>

          {/* 5-Slide Progress Indicator Dots with Clear Slide Numbers */}
          <div className="pointer-events-auto flex items-center gap-1.5 bg-stone-950/80 border border-stone-800 backdrop-blur-md px-3 py-1 rounded-full shadow-lg">
            {sliderImages.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (timerRef.current) clearInterval(timerRef.current);
                  setCurrentIndex(i);
                }}
                className={`h-5 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center text-[10px] font-bold ${
                  currentIndex === i 
                    ? 'w-10 bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 shadow-md' 
                    : 'w-5 bg-stone-850 hover:bg-stone-700 text-stone-400 hover:text-white border border-stone-800'
                }`}
                aria-label={`Go to slide ${i + 1}`}
                title={`Go to Slide ${i + 1}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. SECTION BELOW SLIDES - Headline, Write-Up, 3 Action Buttons, and Quick Booking Bar */}
      <section className="relative z-10 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-stone-950 border-b border-amber-950/40">
        <div className="max-w-5xl mx-auto text-center">
          {/* 5-Star Accreditation Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/70 border border-amber-500/40 backdrop-blur-md mb-6 shadow-xl">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-amber-200">
              {hotelInfo.name} • {hotelInfo.shortAddress}
            </span>
          </div>

          {/* Main Headline (Moved Below Slides as Requested) */}
          <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-stone-100 max-w-4xl mx-auto leading-[1.18] mb-5">
            A Beacon of <span className="shimmer-gold">Luxury</span> and Refined Hospitality
          </h1>

          {/* Description Write-Up (Moved Below Slides as Requested) */}
          <p className="text-base sm:text-lg md:text-xl text-stone-300 max-w-3xl mx-auto font-light leading-relaxed mb-8">
            Experience world-class comfort with 52+ luxury suites, 24/7 guaranteed power, magnificent event halls, and authentic fine dining in the heart of Nasarawa State.
          </p>

          {/* The 3 Action Buttons (Book your stay, view suites and rate, about Jinji - Below Slide Images) */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
            <button
              onClick={() => onOpenBooking()}
              className="px-8 py-3.5 rounded-sm bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:via-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-amber-950/60 cursor-pointer flex items-center gap-2 hover:scale-[1.02]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Your Stay</span>
            </button>

            <button
              onClick={() => onNavigate('rooms')}
              className="px-7 py-3.5 rounded-sm bg-stone-900 hover:bg-stone-850 text-stone-200 hover:text-amber-300 border border-amber-500/40 hover:border-amber-400 font-semibold text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer flex items-center gap-2"
            >
              <span>View Suites & Rates</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>

            <button
              onClick={() => onNavigate('about')}
              className="px-7 py-3.5 rounded-sm bg-stone-950 hover:bg-stone-900 text-stone-300 hover:text-white border border-stone-700 hover:border-stone-500 font-medium text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              <span>About {hotelInfo.shortName}</span>
            </button>
          </div>

          {/* Quick Booking Reservation Bar */}
          <div className="max-w-4xl mx-auto text-left">
            <div className="bg-stone-900/90 border border-amber-500/40 rounded-sm backdrop-blur-xl p-5 text-stone-100 shadow-2xl">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Direct Reservation Bar
                </span>
                <span className="text-[11px] text-stone-400 hidden sm:inline">
                  Best Rate Guaranteed • No Reservation Fees
                </span>
              </div>

              <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-stone-400 mb-1">
                    Check-In Date
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    min={formatDate(today)}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-stone-400 mb-1">
                    Check-Out Date
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-stone-400 mb-1 flex items-center gap-1">
                    <Bed className="w-3 h-3 text-amber-500" />
                    Accommodation
                  </label>
                  <select
                    value={selectedRoomId}
                    onChange={(e) => setSelectedRoomId(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                  >
                    {rooms.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name} (₦{r.price.toLocaleString()})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-2">
                  <div className="w-1/3">
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-stone-400 mb-1 flex items-center gap-1">
                      <Users className="w-3 h-3 text-amber-500" />
                      Guests
                    </label>
                    <select
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                    </select>
                  </div>

                  <div className="w-2/3">
                    <button
                      type="submit"
                      className="w-full py-2.5 px-3 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer h-[38px] shadow-md"
                    >
                      <span>Check & Book</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
