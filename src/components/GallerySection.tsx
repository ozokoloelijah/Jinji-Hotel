import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2,
  Crown 
} from 'lucide-react';
import { GALLERY_IMAGES } from '../data/hotelData';
import { GalleryItem } from '../types/hotel';

export const GallerySection: React.FC = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>(() => {
    try {
      const stored = localStorage.getItem('jinji_custom_gallery');
      return stored ? JSON.parse(stored) : GALLERY_IMAGES;
    } catch {
      return GALLERY_IMAGES;
    }
  });

  useEffect(() => {
    const handleUpdate = () => {
      try {
        const stored = localStorage.getItem('jinji_custom_gallery');
        if (stored) {
          setGalleryImages(JSON.parse(stored));
        }
      } catch {
        // ignore
      }
    };

    window.addEventListener('jinji_gallery_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('jinji_gallery_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'rooms', label: 'Rooms & Suites' },
    { id: 'pool', label: 'Pool & Outdoors' },
    { id: 'events', label: 'Event Halls' },
    { id: 'dining', label: 'Restaurant & Dining' },
  ];

  const filteredImages = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter((img: GalleryItem) => img.category === activeCategory);

  const handleOpenLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredImages.length);
    }
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-stone-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>VISUAL SHOWCASE</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100 tracking-tight mb-4">
            A Glimpse into Jinji Hospitality
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-4" />
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Explore the contemporary architecture, warm natural lighting, crystal pools, and elegant interior design that define Jinji Hotels Ltd.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-sm text-xs sm:text-sm font-medium tracking-wide transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                  : 'bg-stone-900 text-stone-300 hover:text-amber-300 hover:bg-stone-850 border border-stone-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img: GalleryItem, index: number) => (
            <div
              key={img.id}
              onClick={() => handleOpenLightbox(index)}
              className="group relative h-64 sm:h-72 rounded-sm overflow-hidden border border-stone-800 hover:border-amber-500/50 cursor-pointer shadow-lg transition-all duration-300"
            >
              <img
                src={img.image || img.url}
                alt={img.title}
                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-stone-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold mb-1">
                  {img.category}
                </span>
                <h4 className="font-serif-luxury text-lg font-bold text-stone-100">
                  {img.title}
                </h4>
                <p className="text-xs text-stone-300 mt-0.5">
                  {img.description || img.caption}
                </p>
              </div>

              {/* Hover Zoom Icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-stone-950/80 text-amber-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && filteredImages[selectedImageIndex] && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setSelectedImageIndex(null)}
        >
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-5 right-5 p-2 rounded-full bg-stone-900/80 text-stone-300 hover:text-white transition-colors cursor-pointer z-50"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 text-amber-400 transition-all cursor-pointer z-50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image & Caption */}
          <div 
            className="max-w-5xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredImages[selectedImageIndex].image || filteredImages[selectedImageIndex].url}
              alt={filteredImages[selectedImageIndex].title}
              className="max-h-[72vh] w-auto object-contain rounded-sm border border-stone-800 shadow-2xl"
            />
            <div className="text-center mt-4">
              <h4 className="font-serif-luxury text-xl font-bold text-amber-400">
                {filteredImages[selectedImageIndex].title}
              </h4>
              <p className="text-xs text-stone-300 mt-1">
                {filteredImages[selectedImageIndex].description || filteredImages[selectedImageIndex].caption}
              </p>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 text-amber-400 transition-all cursor-pointer z-50"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
};
