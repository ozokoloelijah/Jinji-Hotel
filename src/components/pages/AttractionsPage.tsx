import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Clock, 
  Car, 
  Sun, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  ArrowRight,
  Mountain,
  Palmtree,
  GraduationCap,
  ShoppingBag,
  Building
} from 'lucide-react';
import { LOCAL_ATTRACTIONS_DATA, HOTEL_INFO } from '../../data/hotelData';
import { PageId, LocalAttraction } from '../../types/hotel';

interface AttractionsPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
  onOpenShuttleModal?: () => void;
}

export const AttractionsPage: React.FC<AttractionsPageProps> = ({ 
  onNavigate, 
  onOpenBooking,
  onOpenShuttleModal 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAttraction, setSelectedAttraction] = useState<LocalAttraction | null>(null);

  const categories = [
    { id: 'all', label: 'All Sights', icon: Compass },
    { id: 'nature', label: 'Nature & Waterfalls', icon: Mountain },
    { id: 'culture', label: 'Hills & Heritage', icon: Palmtree },
    { id: 'education', label: 'Academic Centers', icon: GraduationCap },
    { id: 'market', label: 'Markets & Crafts', icon: ShoppingBag },
    { id: 'government', label: 'Transit & State Hubs', icon: Building },
  ];

  const filteredAttractions = selectedCategory === 'all' 
    ? LOCAL_ATTRACTIONS_DATA 
    : LOCAL_ATTRACTIONS_DATA.filter(item => item.category === selectedCategory);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-stone-950 text-stone-100">
      {/* Hero Header */}
      <div className="relative py-16 bg-gradient-to-b from-stone-900 to-stone-950 border-b border-amber-900/30 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Discover Akwanga & Nasarawa State</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-100 tracking-tight mb-4">
            Local Attractions & Destination Guide
          </h1>
          <p className="text-stone-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Positioned in the heart of Nasarawa State along the scenic Abuja-Plateau corridor, Jinji Hotels Ltd serves as your premier luxury base to explore towering waterfalls, historic mountain caves, vibrant regional markets, and tertiary academic institutions.
          </p>

          {/* Key Quick Stats */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-8 text-xs text-stone-300">
            <div className="px-4 py-2 bg-stone-900/80 border border-stone-800 rounded-sm flex items-center gap-2">
              <Car className="w-4 h-4 text-amber-400" />
              <span><strong>90 Mins</strong> from Abuja Airport</span>
            </div>
            <div className="px-4 py-2 bg-stone-900/80 border border-stone-800 rounded-sm flex items-center gap-2">
              <Mountain className="w-4 h-4 text-amber-400" />
              <span><strong>50 Mins</strong> to Farin Ruwa Falls</span>
            </div>
            <div className="px-4 py-2 bg-stone-900/80 border border-stone-800 rounded-sm flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-400" />
              <span>Year-Round Tropical Sun & Breeze</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-sm text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 shadow-md'
                    : 'bg-stone-900 text-stone-300 border border-stone-800 hover:border-amber-500/40 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAttractions.map((attraction) => (
            <div
              key={attraction.id}
              className="bg-stone-900/90 border border-stone-800 hover:border-amber-500/50 rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl group"
            >
              <div>
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={attraction.image}
                    alt={attraction.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                  
                  {/* Distance & Time Pill */}
                  <div className="absolute bottom-3 left-3 bg-stone-950/90 backdrop-blur-md border border-stone-700 px-2.5 py-1 rounded text-[11px] text-amber-300 flex items-center gap-2 font-mono">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-500" />
                      {attraction.distanceKm} km from hotel
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-500" />
                      ~{attraction.travelTimeMinutes} mins
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="font-serif-luxury text-xl font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                    {attraction.name}
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    {attraction.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 block">
                      Key Highlights:
                    </span>
                    {attraction.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-stone-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Best Time */}
                  <div className="pt-2 text-[11px] text-stone-400 border-t border-stone-800">
                    <strong className="text-stone-300">Best time to visit:</strong> {attraction.bestTimeToVisit}
                  </div>
                </div>
              </div>

              {/* Concierge Shuttle Service Box & Action */}
              <div className="p-6 pt-0 space-y-3">
                <div className="p-3 bg-stone-950/80 border border-amber-900/30 rounded text-[11px] text-stone-300">
                  <span className="text-amber-400 font-semibold block mb-0.5">Jinji Concierge Tour Assistance:</span>
                  {attraction.conciergeService}
                </div>

                <a
                  href={`https://wa.me/${HOTEL_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Jinji%20Hotels%20Concierge,%20I%20would%20like%20to%20arrange%20a%20guided%20tour%20or%20shuttle%20to%20${encodeURIComponent(attraction.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 bg-stone-800 hover:bg-stone-750 text-amber-300 border border-amber-500/40 text-xs font-semibold rounded-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Book Guided Tour / Chauffeur</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Chauffeur & Airport Transfer Highlight */}
        <div className="bg-gradient-to-r from-stone-900 via-amber-950/30 to-stone-900 border border-amber-500/30 rounded-lg p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Car className="w-4 h-4" />
              <span>Chauffeured Executive Fleet</span>
            </div>
            <h2 className="font-serif-luxury text-2xl font-bold text-amber-100">
              Need Airport Chauffeur or Inter-State Transportation?
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              We provide private airport transfers to and from Nnamdi Azikiwe International Airport Abuja (ABV), Lafia, and Keffi in air-conditioned luxury SUVs with trained security drivers.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer shadow-lg"
            >
              Book Room & Shuttle
            </button>
            <a
              href={`tel:${HOTEL_INFO.phonePrimary.replace(/\s+/g, '')}`}
              className="w-full sm:w-auto px-5 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call Concierge Desk</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
