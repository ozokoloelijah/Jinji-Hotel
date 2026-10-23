import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Waves, 
  ShieldCheck, 
  Wifi, 
  UtensilsCrossed, 
  Dumbbell, 
  Car, 
  Sparkles,
  Clock,
  Crown
} from 'lucide-react';
import { FACILITIES_DATA } from '../data/hotelData';
import { Facility } from '../types/hotel';

interface FacilitiesSectionProps {
  onOpenBooking: () => void;
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({ onOpenBooking }) => {
  const [facilities, setFacilities] = useState<Facility[]>(() => {
    try {
      const stored = localStorage.getItem('jinji_custom_facilities');
      return stored ? JSON.parse(stored) : FACILITIES_DATA;
    } catch {
      return FACILITIES_DATA;
    }
  });

  useEffect(() => {
    const handleUpdate = () => {
      try {
        const stored = localStorage.getItem('jinji_custom_facilities');
        if (stored) {
          setFacilities(JSON.parse(stored));
        }
      } catch {
        // ignore
      }
    };

    window.addEventListener('jinji_facilities_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('jinji_facilities_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Waves': return <Waves className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Wifi': return <Wifi className="w-5 h-5" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-5 h-5" />;
      case 'Dumbbell': return <Dumbbell className="w-5 h-5" />;
      case 'Car': return <Car className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="facilities" className="py-20 lg:py-28 bg-stone-900 relative overflow-hidden border-t border-b border-amber-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Crown className="w-3.5 h-3.5" />
            <span>WORLD-CLASS AMENITIES</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100 tracking-tight mb-4">
            Facilities Engineered for Supreme Comfort
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-4" />
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Experience absolute peace of mind. Every amenity at Jinji Hotels Ltd is built to international 5-star benchmarks, ensuring uninterrupted luxury from arrival to departure.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((fac) => (
            <div
              key={fac.id}
              className="bg-stone-950 border border-stone-800 hover:border-amber-500/40 rounded-sm overflow-hidden transition-all duration-300 group flex flex-col justify-between shadow-lg hover:shadow-xl"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={fac.image}
                  alt={fac.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
                
                <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/40 backdrop-blur-md flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-stone-950 transition-colors">
                  {getIcon(fac.iconName)}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif-luxury text-base font-bold text-stone-100 group-hover:text-amber-300 transition-colors mb-1">
                    {fac.title}
                  </h4>
                  <p className="text-[11px] font-semibold text-amber-400/90 uppercase tracking-wider mb-2">
                    {fac.subtitle}
                  </p>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    {fac.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-800/80 mt-4 flex items-center gap-1.5 text-[11px] text-stone-400">
                  <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{fac.hours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Power Supply Spotlight Callout (signature characteristic of Ri-Seingon / Nigerian Luxury) */}
        <div className="mt-16 bg-gradient-to-r from-amber-950/60 via-stone-950 to-amber-950/40 border border-amber-500/30 p-8 rounded-sm relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5" />
                <span>Zero Power Downtime Promise</span>
              </div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-100">
                100% Uninterrupted Clean Electricity Guaranteed
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                We understand that uninterrupted electricity and cooling are non-negotiable for true hospitality. Jinji Hotels Ltd operates dual heavy-duty synchronized diesel power plants supported by high-voltage hybrid solar battery storage to guarantee seamless power 24 hours a day, 365 days a year.
              </p>
            </div>

            <button
              onClick={onOpenBooking}
              className="px-7 py-3 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider shrink-0 transition-all shadow-md cursor-pointer"
            >
              Book with Confidence
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
