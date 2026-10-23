import React from 'react';
import { GallerySection } from '../GallerySection';
import { Camera, ArrowLeft } from 'lucide-react';
import { PageId } from '../../types/hotel';

interface GalleryPageProps {
  onNavigate: (page: PageId) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-24 pb-16">
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
            <Camera className="w-3.5 h-3.5" />
            <span>VISUAL PHOTO GALLERY</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-stone-100 tracking-tight">
            Photo Gallery & Virtual Experience
          </h1>
          <p className="text-stone-300 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
            Take a visual tour through our master suites, serene swimming pool, crystal ballrooms, and fine dining lounges.
          </p>
        </div>
      </div>

      <GallerySection />
    </div>
  );
};
