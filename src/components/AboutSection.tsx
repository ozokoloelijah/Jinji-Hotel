import React from 'react';
import { 
  Crown, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Award, 
  Users, 
  HeartHandshake, 
  Check 
} from 'lucide-react';
import { HOTEL_INFO, HOTEL_STATS, HOTEL_CORE_VALUES } from '../data/hotelData';

interface AboutSectionProps {
  onOpenBooking: () => void;
  onExploreFacilities: () => void;
  hotelInfo?: typeof HOTEL_INFO;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ 
  onOpenBooking, 
  onExploreFacilities,
  hotelInfo = HOTEL_INFO 
}) => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-stone-900 relative overflow-hidden border-t border-b border-amber-950/40">
      {/* Decorative ambient subtle glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header Tag */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Crown className="w-3.5 h-3.5" />
            <span>DISCOVER OUR HERITAGE</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100 tracking-tight mb-4">
            Where Timeless Luxury Meets Authentic Hospitality
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-4" />
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Nestled in the scenic beauty of Akwanga, Nasarawa State, {hotelInfo.name} is an iconic landmark designed to offer executive travelers, vacationers, and dignitaries an unprecedented standard of comfort.
          </p>
        </div>

        {/* 2-Column Story and Photo Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          {/* Left Column: Narrative & Values */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-amber-100 font-semibold leading-snug">
              A Serene Oasis Designed for Rest, Celebration, and Productive Summits
            </h3>
            
            <p className="text-stone-300 leading-relaxed text-sm sm:text-base">
              At <strong className="text-amber-400 font-semibold">{hotelInfo.name}</strong>, we believe true luxury is found in the quiet confidence of seamless execution. From our 52 elegantly appointed accommodations ranging from our cozy Standard rooms to our regal Presidential Suite, every corner is curated with intentional artistry.
            </p>

            <p className="text-stone-300 leading-relaxed text-sm sm:text-base">
              Whether you are in Akwanga for an executive business retreat, hosting a grand wedding in our 1,200-capacity Crystal Ballroom, or escaping the city bustle for a rejuvenating weekend by our Olympic pool, our team delivers warm, personalized Nigerian hospitality that leaves an indelible imprint.
            </p>

            {/* Core Values 2x3 Grid */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {HOTEL_CORE_VALUES.map((val, idx) => (
                <div key={idx} className="bg-stone-950/70 border border-stone-800 hover:border-amber-500/40 p-4 rounded-sm transition-all group">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-stone-950 transition-colors">
                      <Check className="w-3 h-3" />
                    </div>
                    <h4 className="text-sm font-semibold text-stone-200 group-hover:text-amber-300 transition-colors">
                      {val.title}
                    </h4>
                  </div>
                  <p className="text-xs text-stone-400 pl-7">{val.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                Reserve Your Stay
              </button>
              <button
                onClick={onExploreFacilities}
                className="px-6 py-3 rounded-sm bg-stone-950 border border-stone-700 hover:border-amber-400 text-stone-300 hover:text-amber-300 font-medium text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                View Hotel Facilities
              </button>
            </div>
          </div>

          {/* Right Column: Visual Collage with Overlays */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image */}
              <div className="relative rounded-sm overflow-hidden border-2 border-amber-500/30 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80"
                  alt="Jinji Hotels Ltd Architecture & Pool"
                  className="w-full h-[400px] sm:h-[480px] object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                    Prime Hospitality Destination
                  </span>
                  <p className="text-sm text-stone-200 font-serif-luxury">
                    {hotelInfo.shortAddress}
                  </p>
                </div>
              </div>

              {/* Floating Highlight Card */}
              <div className="absolute -bottom-6 -left-6 bg-stone-950/95 border border-amber-500/40 p-4 sm:p-5 rounded-sm shadow-2xl backdrop-blur-md max-w-[240px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
                    <Award className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-xl font-bold text-amber-300 font-serif-luxury">5-Star</span>
                    <p className="text-[10px] uppercase tracking-wider text-stone-400">Luxury Hospitality</p>
                  </div>
                </div>
                <p className="text-xs text-stone-300">
                  Certified excellence in guest comfort, 24/7 power, and refined Nigerian gastronomy.
                </p>
              </div>

              {/* Floating Rating Badge Top Right */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-amber-600 to-amber-800 text-stone-950 font-bold px-4 py-2 rounded-sm shadow-xl flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span className="text-xs tracking-wider text-amber-100 uppercase">Akwanga Landmark</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid modeled on Ri-Seingon's signature achievements */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 pt-10 border-t border-stone-800">
          {HOTEL_STATS.map((stat, idx) => (
            <div 
              key={idx} 
              className={`text-center p-5 rounded-sm bg-stone-950/50 border border-stone-800/80 hover:border-amber-500/40 transition-all ${
                idx === 4 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              <div className="font-serif-luxury text-3xl sm:text-4xl font-bold text-amber-400 mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-stone-400 uppercase tracking-wider font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
