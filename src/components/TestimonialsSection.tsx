import React from 'react';
import { Star, Quote, Award } from 'lucide-react';
import { REVIEWS_DATA } from '../data/hotelData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-stone-900 relative overflow-hidden border-t border-b border-amber-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>GUEST EXPERIENCES</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100 tracking-tight mb-4">
            Words from Discerning Guests
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-4" />
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Read firsthand accounts of executive comfort, culinary delight, and memorable celebrations from our esteemed guests.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {REVIEWS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="p-6 sm:p-8 bg-stone-950 border border-stone-800 hover:border-amber-500/40 rounded-sm relative flex flex-col justify-between shadow-xl transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400 bg-stone-900 px-2.5 py-1 rounded-sm border border-stone-800">
                    {rev.roomStayed}
                  </span>
                </div>

                <Quote className="w-8 h-8 text-amber-500/20 mb-2" />

                <p className="text-stone-300 text-sm leading-relaxed italic mb-6">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-800 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/40 shrink-0"
                />
                <div>
                  <h4 className="font-serif-luxury text-base font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                    {rev.name}
                  </h4>
                  <p className="text-xs text-amber-400/90 font-medium">
                    {rev.role} • <span className="text-stone-400 font-normal">{rev.location}</span>
                  </p>
                  <span className="text-[10px] text-stone-400">{rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
