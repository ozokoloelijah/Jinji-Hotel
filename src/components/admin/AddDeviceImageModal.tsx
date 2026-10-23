import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Camera, 
  Image as ImageIcon, 
  Check, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  Crown,
  Building2,
  Calendar,
  UtensilsCrossed,
  Zap,
  ArrowRight
} from 'lucide-react';
import { processLocalImageFile } from './LocalImagePicker';
import { Room, EventHall, RestaurantDish, Facility, HotelInfoConfig, GalleryItem } from '../../types/hotel';

interface AddDeviceImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTargetSection?: 'logo' | 'slider_replace' | 'slider_new' | 'room' | 'gallery' | 'event' | 'dining' | 'facility';
  initialSlideIndex?: number;
  rooms: Room[];
  onUpdateRooms: (updatedRooms: Room[]) => void;
  hotelInfo: HotelInfoConfig;
  onUpdateHotelInfo: (updatedInfo: HotelInfoConfig) => void;
  sliderImages: Array<{ id: number; title: string; tagline: string; url: string }>;
  onUpdateSliderImages: (images: Array<{ id: number; title: string; tagline: string; url: string }>) => void;
  eventHalls: EventHall[];
  onUpdateEventHalls: (updatedHalls: EventHall[]) => void;
  restaurantMenu: RestaurantDish[];
  onUpdateRestaurantMenu: (updatedMenu: RestaurantDish[]) => void;
  facilities: Facility[];
  onUpdateFacilities: (updatedFacilities: Facility[]) => void;
  galleryImages: GalleryItem[];
  onUpdateGalleryImages: (updatedGallery: GalleryItem[]) => void;
  onSuccessToast: (msg: string) => void;
  onLogActivity: (action: string, category: any, details: string) => void;
}

export const AddDeviceImageModal: React.FC<AddDeviceImageModalProps> = ({
  isOpen,
  onClose,
  initialTargetSection = 'slider_replace',
  initialSlideIndex = 0,
  rooms,
  onUpdateRooms,
  hotelInfo,
  onUpdateHotelInfo,
  sliderImages,
  onUpdateSliderImages,
  eventHalls,
  onUpdateEventHalls,
  restaurantMenu,
  onUpdateRestaurantMenu,
  facilities,
  onUpdateFacilities,
  galleryImages,
  onUpdateGalleryImages,
  onSuccessToast,
  onLogActivity,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImageBase64, setSelectedImageBase64] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [fileSizeInfo, setFileSizeInfo] = useState<string>('');
  
  // Destination Target
  type TargetSection = 'logo' | 'slider_replace' | 'slider_new' | 'room' | 'gallery' | 'event' | 'dining' | 'facility';
  const [targetSection, setTargetSection] = useState<TargetSection>(initialTargetSection);

  // Sub-target selections
  const [sliderIndex, setSliderIndex] = useState<number>(initialSlideIndex);
  const [replaceSlideTitle, setReplaceSlideTitle] = useState<string>('');
  const [replaceSlideTagline, setReplaceSlideTagline] = useState<string>('');
  const [fitMode, setFitMode] = useState<'cover' | 'contain'>('cover');
  const [positionMode, setPositionMode] = useState<'top' | 'center' | 'bottom'>('top');
  const [newSlideTitle, setNewSlideTitle] = useState<string>('Luxury Living at Jinji');
  const [newSlideTagline, setNewSlideTagline] = useState<string>('World-Class Hospitality • 24/7 Power • Unmatched Security');
  const [selectedRoomId, setSelectedRoomId] = useState<string>(rooms[0]?.id || '');
  const [selectedHallId, setSelectedHallId] = useState<string>(eventHalls[0]?.id || '');
  const [selectedDishId, setSelectedDishId] = useState<string>(restaurantMenu[0]?.id || '');
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>(facilities[0]?.id || '');
  const [galleryCategory, setGalleryCategory] = useState<string>('rooms');
  const [galleryTitle, setGalleryTitle] = useState<string>('Exclusive Jinji Suite');
  const [galleryCaption, setGalleryCaption] = useState<string>('Elegantly appointed interiors and premium amenities.');

  // Sync props when modal is opened or target/slide is explicitly passed
  useEffect(() => {
    if (isOpen) {
      if (initialTargetSection) {
        setTargetSection(initialTargetSection);
      }
      const targetIdx = (initialSlideIndex !== undefined && initialSlideIndex >= 0) ? initialSlideIndex : 0;
      setSliderIndex(targetIdx);
      if (sliderImages[targetIdx]) {
        setReplaceSlideTitle(sliderImages[targetIdx].title);
        setReplaceSlideTagline(sliderImages[targetIdx].tagline);
      }
    }
  }, [isOpen, initialTargetSection, initialSlideIndex, sliderImages]);

  // When sliderIndex changes, keep title and tagline synced
  useEffect(() => {
    if (sliderImages[sliderIndex]) {
      setReplaceSlideTitle(sliderImages[sliderIndex].title);
      setReplaceSlideTagline(sliderImages[sliderIndex].tagline);
    }
  }, [sliderIndex, sliderImages]);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const sizeKB = Math.round(file.size / 1024);
      setFileSizeInfo(`${sizeKB} KB (${file.type})`);
      setFileName(file.name);
      const base64 = await processLocalImageFile(file);
      setSelectedImageBase64(base64);
    } catch (err) {
      console.error('Error reading local device file', err);
    }
  };

  const handleApply = () => {
    if (!selectedImageBase64) {
      alert('Please select an image from your device first.');
      return;
    }

    switch (targetSection) {
      case 'logo': {
        const updated = { ...hotelInfo, logoUrl: selectedImageBase64 };
        onUpdateHotelInfo(updated);
        onSuccessToast('New hotel branding logo uploaded from device and applied live!');
        onLogActivity('Logo Updated', 'Content', `Uploaded new logo image from device (${fileName})`);
        break;
      }

      case 'slider_replace': {
        const updated = [...sliderImages];
        if (updated[sliderIndex]) {
          const finalTitle = replaceSlideTitle.trim() || updated[sliderIndex].title;
          const finalTagline = replaceSlideTagline.trim() || updated[sliderIndex].tagline;
          updated[sliderIndex] = { 
            ...updated[sliderIndex], 
            url: selectedImageBase64,
            title: finalTitle,
            tagline: finalTagline,
          };
          onUpdateSliderImages(updated);
          onSuccessToast(`Slide #${sliderIndex + 1} (${finalTitle}) updated from device and auto-fitted into frame!`);
          onLogActivity('Slide Image Replaced', 'Content', `Replaced slide #${sliderIndex + 1} with local device photo, auto-fitted into 16:9 frame`);
        }
        break;
      }

      case 'slider_new': {
        const nextId = sliderImages.length > 0 ? Math.max(...sliderImages.map(s => s.id)) + 1 : 1;
        const newSlide = {
          id: nextId,
          title: newSlideTitle || 'Luxury Sanctuary',
          tagline: newSlideTagline || 'Experience Royalty at Jinji Hotels Ltd',
          url: selectedImageBase64,
        };
        const updated = [...sliderImages, newSlide];
        onUpdateSliderImages(updated);
        onSuccessToast(`New slide "${newSlide.title}" added to home hero slider from your device!`);
        onLogActivity('New Home Slide Added', 'Content', `Added new slider photo from device: "${newSlide.title}"`);
        break;
      }

      case 'room': {
        const updated = rooms.map(r => r.id === selectedRoomId ? { ...r, featuredImage: selectedImageBase64 } : r);
        onUpdateRooms(updated);
        const targetRoom = rooms.find(r => r.id === selectedRoomId);
        onSuccessToast(`Updated photo for ${targetRoom?.name || 'Room'} from device!`);
        onLogActivity('Room Photo Updated', 'Content', `Uploaded new photo from device for ${targetRoom?.name}`);
        break;
      }

      case 'gallery': {
        const nextId = galleryImages.length > 0 ? Math.max(...galleryImages.map(g => g.id)) + 1 : 1;
        const newGalleryItem = {
          id: nextId,
          url: selectedImageBase64,
          title: galleryTitle || 'Jinji Hotel Property',
          category: galleryCategory,
          caption: galleryCaption || 'Luxury hospitality at its peak.',
        };
        const updated = [newGalleryItem, ...galleryImages];
        onUpdateGalleryImages(updated);
        try {
          localStorage.setItem('jinji_custom_gallery', JSON.stringify(updated));
          window.dispatchEvent(new Event('jinji_gallery_updated'));
        } catch {
          // ignore
        }
        onSuccessToast('New photo uploaded from device and added to public photo gallery!');
        onLogActivity('Gallery Photo Added', 'Content', `Added picture "${newGalleryItem.title}" to public gallery`);
        break;
      }

      case 'event': {
        const updated = eventHalls.map(h => h.id === selectedHallId ? { ...h, image: selectedImageBase64 } : h);
        onUpdateEventHalls(updated);
        try {
          localStorage.setItem('jinji_custom_event_halls', JSON.stringify(updated));
          window.dispatchEvent(new Event('jinji_events_updated'));
        } catch {
          // ignore
        }
        const targetHall = eventHalls.find(h => h.id === selectedHallId);
        onSuccessToast(`Updated photo for ${targetHall?.name || 'Event Hall'} from device!`);
        onLogActivity('Event Hall Media Updated', 'Content', `Uploaded new photo from device for ${targetHall?.name}`);
        break;
      }

      case 'dining': {
        const updated = restaurantMenu.map(d => d.id === selectedDishId ? { ...d, image: selectedImageBase64 } : d);
        onUpdateRestaurantMenu(updated);
        try {
          localStorage.setItem('jinji_custom_dining', JSON.stringify(updated));
          window.dispatchEvent(new Event('jinji_dining_updated'));
        } catch {
          // ignore
        }
        const targetDish = restaurantMenu.find(d => d.id === selectedDishId);
        onSuccessToast(`Updated photo for menu item "${targetDish?.name || 'Dish'}" from device!`);
        onLogActivity('Dining Photo Updated', 'Content', `Uploaded new photo from device for ${targetDish?.name}`);
        break;
      }

      case 'facility': {
        const updated = facilities.map(f => f.id === selectedFacilityId ? { ...f, image: selectedImageBase64 } : f);
        onUpdateFacilities(updated);
        try {
          localStorage.setItem('jinji_custom_facilities', JSON.stringify(updated));
          window.dispatchEvent(new Event('jinji_facilities_updated'));
        } catch {
          // ignore
        }
        const targetFacility = facilities.find(f => f.id === selectedFacilityId);
        onSuccessToast(`Updated photo for facility "${targetFacility?.title || 'Facility'}" from device!`);
        onLogActivity('Facility Photo Updated', 'Content', `Uploaded new photo from device for ${targetFacility?.title}`);
        break;
      }
    }

    // Reset and close
    setSelectedImageBase64(null);
    setFileName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-amber-500/40 rounded-sm w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-800 bg-stone-950 sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-lg font-bold text-stone-100 flex items-center gap-2">
                Upload & Add Image from Device
              </h3>
              <p className="text-xs text-stone-400">
                Choose any picture saved locally on your phone or computer without needing an image link.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 flex-1">
          {/* 1. Device File Selector Area */}
          <div className="space-y-2">
            <label className="block text-xs uppercase font-bold text-amber-400 tracking-wider">
              Step 1: Select Picture from Your Device
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {!selectedImageBase64 ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-stone-700 hover:border-amber-500/80 bg-stone-950/80 hover:bg-stone-950 rounded-sm p-8 text-center cursor-pointer transition-all group"
              >
                <div className="w-16 h-16 rounded-full bg-amber-500/10 group-hover:bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center mb-3 transition-colors">
                  <Upload className="w-8 h-8 group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="font-bold text-stone-100 text-sm">
                  Click to Browse Pictures on Your Device
                </h4>
                <p className="text-xs text-stone-400 mt-1 max-w-md mx-auto">
                  Supports JPG, PNG, WEBP, or SVG files stored on your phone, laptop, or computer drive.
                </p>
                <button
                  type="button"
                  className="mt-4 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 group-hover:from-amber-400 group-hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-sm shadow-md"
                >
                  Choose Picture from Device
                </button>
              </div>
            ) : (
              <div className="p-4 bg-stone-950 border border-amber-500/40 rounded-sm flex flex-col sm:flex-row items-center gap-4">
                <img
                  src={selectedImageBase64}
                  alt="Preview"
                  className="w-full sm:w-48 h-32 object-cover object-top rounded-sm border border-stone-800 shrink-0"
                />
                <div className="flex-1 w-full space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-stone-100 truncate">{fileName || 'Local picture loaded'}</span>
                  </div>
                  <p className="text-[11px] text-stone-400">
                    File details: <span className="text-amber-300 font-mono">{fileSizeInfo || 'Ready for web'}</span>
                  </p>
                  <p className="text-[11px] text-emerald-400/90">
                    Image successfully processed from your device storage.
                  </p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs rounded-sm border border-stone-700 cursor-pointer flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Choose Different Picture</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 2. Choose Where to Place This Image */}
          <div className="space-y-3">
            <label className="block text-xs uppercase font-bold text-amber-400 tracking-wider">
              Step 2: Choose Where to Apply this Picture
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {[
                { id: 'slider_new', label: 'New Home Slide', icon: Sparkles },
                { id: 'slider_replace', label: 'Replace Slide', icon: ImageIcon },
                { id: 'room', label: 'Room Photo', icon: Building2 },
                { id: 'logo', label: 'Hotel Logo', icon: Crown },
                { id: 'gallery', label: 'Public Gallery', icon: Camera },
                { id: 'event', label: 'Event Hall', icon: Calendar },
                { id: 'dining', label: 'Dining Dish', icon: UtensilsCrossed },
                { id: 'facility', label: 'Hotel Facility', icon: Zap },
              ].map(opt => {
                const IconComp = opt.icon;
                const isSelected = targetSection === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTargetSection(opt.id as TargetSection)}
                    className={`p-2.5 rounded-sm border text-left flex items-center gap-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold shadow-md'
                        : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-amber-500/50'
                    }`}
                  >
                    <IconComp className={`w-4 h-4 shrink-0 ${isSelected ? 'text-stone-950' : 'text-amber-400'}`} />
                    <span className="truncate">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Section Details Settings */}
          <div className="p-4 bg-stone-950 border border-stone-800 rounded-sm space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Step 3: Configure Destination Details
            </h5>

            {/* Target 1: New Home Slide */}
            {targetSection === 'slider_new' && (
              <div className="space-y-3">
                <p className="text-xs text-stone-400">
                  Adds this local photo as a brand-new high-definition slide into the homepage 3-second auto slider.
                </p>
                <div>
                  <label className="block text-[11px] uppercase text-stone-400 mb-1">Slide Headline Title</label>
                  <input
                    type="text"
                    value={newSlideTitle}
                    onChange={(e) => setNewSlideTitle(e.target.value)}
                    placeholder="e.g. Royal Presidential Hospitality"
                    className="w-full bg-stone-900 border border-stone-700 text-stone-100 text-xs p-2 rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase text-stone-400 mb-1">Slide Subtitle Tagline</label>
                  <input
                    type="text"
                    value={newSlideTagline}
                    onChange={(e) => setNewSlideTagline(e.target.value)}
                    placeholder="e.g. Unmatched serenity in the heart of Akwanga"
                    className="w-full bg-stone-900 border border-stone-700 text-stone-100 text-xs p-2 rounded-sm"
                  />
                </div>
              </div>
            )}

            {/* Target 2: Replace Slide (Slide 1, 2, up to Slide 5) */}
            {targetSection === 'slider_replace' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-2">
                  <div>
                    <h6 className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                      Identify Slide to Replace (Slide 1 to Slide {sliderImages.length})
                    </h6>
                    <p className="text-[11px] text-stone-400">
                      Click the slide you wish to overwrite with your local device photo. Each picture automatically fits the 16:9 frame.
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-sm bg-stone-900 border border-amber-500/30 text-amber-300 text-[11px] font-bold shrink-0">
                    Currently Selected: Slide #{sliderIndex + 1}
                  </span>
                </div>

                {/* 5 Distinct Interactive Slide Selection Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {sliderImages.map((s, idx) => {
                    const isCurrent = sliderIndex === idx;
                    return (
                      <div
                        key={s.id || idx}
                        onClick={() => setSliderIndex(idx)}
                        className={`relative rounded-sm border p-2.5 flex flex-col justify-between cursor-pointer transition-all group ${
                          isCurrent
                            ? 'bg-amber-950/40 border-amber-400 ring-2 ring-amber-400/50 shadow-lg shadow-amber-950/30'
                            : 'bg-stone-900/90 border-stone-800 hover:border-amber-500/50 hover:bg-stone-850'
                        }`}
                      >
                        {/* Slide Number Badge */}
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <span
                            className={`px-2 py-0.5 rounded-sm text-[10px] font-extrabold uppercase tracking-wider ${
                              isCurrent
                                ? 'bg-amber-500 text-stone-950'
                                : 'bg-stone-800 text-amber-400 group-hover:bg-amber-500/20'
                            }`}
                          >
                            Slide {idx + 1}
                          </span>
                          {isCurrent && (
                            <span className="flex items-center gap-1 text-[10px] text-amber-300 font-bold">
                              <Check className="w-3 h-3" /> Replacing
                            </span>
                          )}
                        </div>

                        {/* 16:9 Thumbnail Frame */}
                        <div className="w-full aspect-[16/9] rounded-sm overflow-hidden bg-black border border-stone-800 relative mb-2">
                          <img
                            src={s.url}
                            alt={s.title}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />
                          <span className="absolute bottom-1 left-1.5 text-[9px] font-mono text-stone-300 bg-stone-950/70 px-1 rounded">
                            Frame 16:9
                          </span>
                        </div>

                        {/* Title & Tagline info */}
                        <div className="space-y-0.5">
                          <p className="text-[11px] font-bold text-stone-100 truncate" title={s.title}>
                            {s.title}
                          </p>
                          <p className="text-[10px] text-stone-400 truncate" title={s.tagline}>
                            {s.tagline}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Live Automatic Frame Fitting Preview */}
                {selectedImageBase64 ? (
                  <div className="p-4 bg-stone-950 border border-amber-500/50 rounded-sm space-y-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-stone-800 pb-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span className="text-xs uppercase font-bold text-stone-100">
                          Automatic Frame Preview: Slide #{sliderIndex + 1}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] uppercase text-stone-400 font-bold">Display Focus:</span>
                        <button
                          type="button"
                          onClick={() => setPositionMode('top')}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase cursor-pointer flex items-center gap-1 ${
                            positionMode === 'top'
                              ? 'bg-amber-500 text-stone-950 shadow-sm'
                              : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                          }`}
                          title="Upper top part of the image shows in the display"
                        >
                          <span>▲ Upper Top Part (Active)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPositionMode('center')}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase cursor-pointer ${
                            positionMode === 'center'
                              ? 'bg-amber-500 text-stone-950 shadow-sm'
                              : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                          }`}
                        >
                          Center
                        </button>

                        <span className="text-stone-700">|</span>
                        <span className="text-[10px] uppercase text-stone-400 font-bold">Frame Fit:</span>
                        <button
                          type="button"
                          onClick={() => setFitMode('cover')}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase cursor-pointer ${
                            fitMode === 'cover'
                              ? 'bg-amber-500 text-stone-950'
                              : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                          }`}
                        >
                          Auto-Fill (No Gaps)
                        </button>
                        <button
                          type="button"
                          onClick={() => setFitMode('contain')}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase cursor-pointer ${
                            fitMode === 'contain'
                              ? 'bg-amber-500 text-stone-950'
                              : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                          }`}
                        >
                          Contain (Full Photo)
                        </button>
                      </div>
                    </div>

                    {/* Side-by-side or stacked frame presentation */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                      {/* 16:9 Frame Preview */}
                      <div className="relative w-full aspect-[16/9] rounded-sm overflow-hidden bg-black border-2 border-amber-500/60 shadow-xl group">
                        {/* Ambient blurred backdrop that automatically fills widescreen margins for photos of any aspect ratio */}
                        <img
                          src={selectedImageBase64}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full object-cover object-top filter blur-2xl scale-125 opacity-40 brightness-50 pointer-events-none"
                        />

                        {/* Main slide picture automatically fitted into frame with upper top part showing */}
                        <img
                          src={selectedImageBase64}
                          alt="Device preview fitted into frame"
                          className={`relative z-10 w-full h-full ${
                            fitMode === 'contain' ? 'object-contain' : 'object-cover'
                          } ${
                            positionMode === 'top' ? 'object-top' : positionMode === 'bottom' ? 'object-bottom' : 'object-center'
                          } filter brightness-[0.96] contrast-[1.02] transition-all duration-300`}
                        />

                        {/* Luxury Frame Corner Accents */}
                        <div className="absolute top-2 left-2 z-20 px-2 py-0.5 rounded-sm bg-stone-950/85 border border-amber-500/40 text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                          Slide #{sliderIndex + 1} Live Frame
                        </div>

                        <div className="absolute bottom-2 right-2 z-20 px-2 py-0.5 rounded-sm bg-stone-950/85 border border-emerald-500/40 text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Upper Top Part Displayed</span>
                        </div>
                      </div>

                      {/* Text details for the slide */}
                      <div className="space-y-3">
                        <div className="p-2.5 bg-stone-900 rounded-sm border border-stone-800 space-y-1">
                          <span className="text-[10px] uppercase font-bold text-stone-400 block">
                            Replacing Slide #{sliderIndex + 1} Current Picture:
                          </span>
                          <p className="text-xs font-semibold text-amber-300 truncate">
                            {sliderImages[sliderIndex]?.title}
                          </p>
                          <p className="text-[11px] text-stone-400 truncate">
                            {sliderImages[sliderIndex]?.tagline}
                          </p>
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase font-bold text-stone-400 mb-1">
                            Slide Headline (Optional Update)
                          </label>
                          <input
                            type="text"
                            value={replaceSlideTitle}
                            onChange={(e) => setReplaceSlideTitle(e.target.value)}
                            placeholder="Enter headline for Slide"
                            className="w-full bg-stone-900 border border-stone-700 text-stone-100 text-xs p-2 rounded-sm outline-none focus:border-amber-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase font-bold text-stone-400 mb-1">
                            Slide Subtitle Tagline (Optional Update)
                          </label>
                          <input
                            type="text"
                            value={replaceSlideTagline}
                            onChange={(e) => setReplaceSlideTagline(e.target.value)}
                            placeholder="Enter tagline for Slide"
                            className="w-full bg-stone-900 border border-stone-700 text-stone-100 text-xs p-2 rounded-sm outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-stone-950 border border-dashed border-stone-800 rounded-sm text-center">
                    <p className="text-xs text-stone-400">
                      Step 1 above: Select a photo from your device. It will automatically fit into the <span className="text-amber-400 font-bold">Slide #{sliderIndex + 1}</span> 16:9 frame preview.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Target 3: Room Photo */}
            {targetSection === 'room' && (
              <div className="space-y-3">
                <p className="text-xs text-stone-400">
                  Select which room or suite will display this picture as its primary featured image:
                </p>
                <select
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 text-stone-100 text-xs p-2.5 rounded-sm outline-none"
                >
                  {rooms.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.name} — ₦{r.price.toLocaleString()} / night
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Target 4: Hotel Logo */}
            {targetSection === 'logo' && (
              <div className="space-y-2">
                <p className="text-xs text-stone-400">
                  This picture will become the official branding logo across the header navigation bar, footer, and printed booking vouchers.
                </p>
                <div className="p-3 bg-stone-900 rounded-sm text-xs text-amber-300 flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Your local picture will immediately replace the default crest logo.</span>
                </div>
              </div>
            )}

            {/* Target 5: Public Photo Gallery */}
            {targetSection === 'gallery' && (
              <div className="space-y-3">
                <p className="text-xs text-stone-400">
                  Add this photo to the public interactive photo gallery with category filter and lightbox viewer.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase text-stone-400 mb-1">Gallery Category</label>
                    <select
                      value={galleryCategory}
                      onChange={(e) => setGalleryCategory(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 text-stone-100 text-xs p-2 rounded-sm"
                    >
                      <option value="rooms">Rooms & Suites</option>
                      <option value="pool">Pool & Outdoors</option>
                      <option value="events">Event Halls</option>
                      <option value="dining">Restaurant & Dining</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase text-stone-400 mb-1">Photo Title</label>
                    <input
                      type="text"
                      value={galleryTitle}
                      onChange={(e) => setGalleryTitle(e.target.value)}
                      placeholder="e.g. VIP Royal Lounge"
                      className="w-full bg-stone-900 border border-stone-700 text-stone-100 text-xs p-2 rounded-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] uppercase text-stone-400 mb-1">Photo Caption</label>
                  <input
                    type="text"
                    value={galleryCaption}
                    onChange={(e) => setGalleryCaption(e.target.value)}
                    placeholder="Short description displayed on lightbox"
                    className="w-full bg-stone-900 border border-stone-700 text-stone-100 text-xs p-2 rounded-sm"
                  />
                </div>
              </div>
            )}

            {/* Target 6: Event Hall */}
            {targetSection === 'event' && (
              <div className="space-y-3">
                <p className="text-xs text-stone-400">
                  Select which grand event hall or meeting boardroom will use this photo:
                </p>
                <select
                  value={selectedHallId}
                  onChange={(e) => setSelectedHallId(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 text-stone-100 text-xs p-2.5 rounded-sm outline-none"
                >
                  {eventHalls.map(h => (
                    <option key={h.id} value={h.id}>
                      {h.name} ({h.theaterCapacity} guests)
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Target 7: Dining Dish */}
            {targetSection === 'dining' && (
              <div className="space-y-3">
                <p className="text-xs text-stone-400">
                  Select which menu specialty dish will display this photo:
                </p>
                <select
                  value={selectedDishId}
                  onChange={(e) => setSelectedDishId(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 text-stone-100 text-xs p-2.5 rounded-sm outline-none"
                >
                  {restaurantMenu.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.name} (₦{d.price.toLocaleString()}) — {d.category}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Target 8: Facility */}
            {targetSection === 'facility' && (
              <div className="space-y-3">
                <p className="text-xs text-stone-400">
                  Select which hotel facility or amenity card will display this photo:
                </p>
                <select
                  value={selectedFacilityId}
                  onChange={(e) => setSelectedFacilityId(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 text-stone-100 text-xs p-2.5 rounded-sm outline-none"
                >
                  {facilities.map(f => (
                    <option key={f.id} value={f.id}>
                      {f.title} — {f.subtitle}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-stone-800 bg-stone-950 flex items-center justify-between gap-3 sticky bottom-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-stone-850 hover:bg-stone-800 text-stone-300 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleApply}
            disabled={!selectedImageBase64}
            className={`px-6 py-2.5 rounded-sm font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md ${
              selectedImageBase64
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950'
                : 'bg-stone-800 text-stone-500 cursor-not-allowed'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>Save & Apply Picture Live</span>
          </button>
        </div>
      </div>
    </div>
  );
};
