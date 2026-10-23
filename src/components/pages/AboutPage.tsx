import React from 'react';
import { AboutSection } from '../AboutSection';
import { TestimonialsSection } from '../TestimonialsSection';
import { Crown, ArrowLeft } from 'lucide-react';
import { PageId } from '../../types/hotel';

interface AboutPageProps {
  onOpenBooking: () => void;
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking, onNavigate }) => {
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
            <Crown className="w-3.5 h-3.5" />
            <span>ABOUT JINJI HOTELS LTD</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-stone-100 tracking-tight">
            Our Story, Heritage & Standards
          </h1>
          <p className="text-stone-300 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
            Discover the passion, values, and architectural excellence behind Nasarawa State's premier luxury hospitality venue.
          </p>
        </div>
      </div>

      {/* Main About Component */}
      <AboutSection 
        onOpenBooking={onOpenBooking} 
        onExploreFacilities={() => onNavigate('facilities')} 
      />

      {/* Guest Testimonials */}
      <TestimonialsSection />
    </div>
  );
};
