import React, { useState, useEffect } from 'react';
import { 
  UtensilsCrossed, 
  Sparkles, 
  Flame, 
  Calendar, 
  Clock, 
  Users, 
  Check, 
  X, 
  CheckCircle2,
  Wine
} from 'lucide-react';
import { RESTAURANT_MENU, HOTEL_INFO } from '../data/hotelData';
import { RestaurantDish } from '../types/hotel';

export const RestaurantSection: React.FC = () => {
  const [menu, setMenu] = useState<RestaurantDish[]>(() => {
    try {
      const stored = localStorage.getItem('jinji_custom_dining');
      return stored ? JSON.parse(stored) : RESTAURANT_MENU;
    } catch {
      return RESTAURANT_MENU;
    }
  });

  useEffect(() => {
    const handleUpdate = () => {
      try {
        const stored = localStorage.getItem('jinji_custom_dining');
        if (stored) {
          setMenu(JSON.parse(stored));
        }
      } catch {
        // ignore
      }
    };

    window.addEventListener('jinji_dining_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('jinji_dining_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [reserveSubmitted, setReserveSubmitted] = useState(false);

  // Table reservation form state
  const [resDate, setResDate] = useState('');
  const [resTime, setResTime] = useState('7:30 PM (Dinner)');
  const [resGuests, setResGuests] = useState('2 Guests');
  const [resName, setResName] = useState('');
  const [resPhone, setResPhone] = useState('');
  const [dietaryPrefs, setDietaryPrefs] = useState('');

  const categories = [
    { id: 'all', label: 'Complete Menu' },
    { id: 'nigerian', label: 'Authentic Nigerian Delicacies' },
    { id: 'continental', label: 'Continental & International' },
    { id: 'starters', label: 'Suya & Starters' },
    { id: 'drinks', label: 'Signature Cocktails & Wines' },
    { id: 'desserts', label: 'Decadent Desserts' },
  ];

  const filteredDishes = activeTab === 'all'
    ? menu
    : menu.filter((d) => d.category === activeTab);

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReserveSubmitted(true);
  };

  return (
    <section id="restaurant" className="py-20 lg:py-28 bg-stone-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>FINE DINING & LOUNGE</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100 tracking-tight mb-4">
            The Royal Palm Restaurant & Sky Lounge
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-4" />
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Savor unforgettable gastronomic journeys crafted by our executive master chefs. Featuring authentic firewood Nigerian delights, fresh local harvests, prime cuts, and curated vintage wines.
          </p>

          <div className="pt-6">
            <button
              onClick={() => {
                setIsReserveModalOpen(true);
                setReserveSubmitted(false);
              }}
              className="px-7 py-3 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Dining Table</span>
            </button>
          </div>
        </div>

        {/* Menu Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-sm text-xs sm:text-sm font-medium tracking-wide transition-all cursor-pointer ${
                activeTab === cat.id
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                  : 'bg-stone-900 text-stone-300 hover:text-amber-300 hover:bg-stone-850 border border-stone-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-stone-900/90 border border-stone-800 hover:border-amber-500/40 rounded-sm overflow-hidden transition-all duration-300 group flex flex-col justify-between shadow-lg"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

                {dish.isChefSpecial && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-amber-700 text-stone-950 text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3 h-3" />
                    <span>Chef's Signature</span>
                  </div>
                )}

                {dish.spicyLevel && dish.spicyLevel > 0 && (
                  <div className="absolute top-3 right-3 bg-red-950/80 border border-red-500/30 text-red-400 text-[10px] font-semibold px-2 py-0.5 rounded-sm flex items-center gap-0.5">
                    <Flame className="w-3 h-3 fill-red-400" />
                    <span>Spicy</span>
                  </div>
                )}

                <div className="absolute bottom-3 right-3 bg-stone-950/90 border border-amber-500/40 px-3 py-1 rounded-sm backdrop-blur-md">
                  <span className="text-amber-400 font-bold text-sm font-serif-luxury">
                    ₦{dish.price.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif-luxury text-lg font-bold text-stone-100 group-hover:text-amber-300 transition-colors mb-2">
                    {dish.name}
                  </h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    {dish.description}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-stone-800/80 mt-4 text-[11px] text-stone-500">
                  <span className="capitalize">{dish.category} Special</span>
                  <span className="text-amber-400/80">Fresh Daily Prep</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dining Features Strip */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-stone-800 text-center">
          <div className="p-4 bg-stone-900/40 rounded-sm border border-stone-800">
            <h5 className="font-serif-luxury text-amber-300 font-semibold text-base mb-1">
              Complimentary Daily Buffet
            </h5>
            <p className="text-xs text-stone-400">
              Served every morning 6:30 AM – 10:30 AM with fresh pastries, native Nigerian breakfast, and barista coffee.
            </p>
          </div>

          <div className="p-4 bg-stone-900/40 rounded-sm border border-stone-800">
            <h5 className="font-serif-luxury text-amber-300 font-semibold text-base mb-1">
              24/7 In-Room Dining Service
            </h5>
            <p className="text-xs text-stone-400">
              Catering directly to your suite or room at any hour of the day or night with zero delay.
            </p>
          </div>

          <div className="p-4 bg-stone-900/40 rounded-sm border border-stone-800">
            <h5 className="font-serif-luxury text-amber-300 font-semibold text-base mb-1">
              Poolside Sunset Bar
            </h5>
            <p className="text-xs text-stone-400">
              Chilled cocktails, cold beers, barbecued suya skewers, and ambient twilight music by the pool.
            </p>
          </div>
        </div>
      </div>

      {/* Table Reservation Modal */}
      {isReserveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-md bg-stone-900 border border-amber-500/40 rounded-sm shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 bg-stone-950 border-b border-stone-800">
              <div>
                <span className="font-crest text-xs tracking-wider uppercase text-amber-400 block">
                  RESTAURANT & BAR
                </span>
                <h3 className="font-serif-luxury text-lg font-bold text-stone-100">
                  Reserve a Dining Table
                </h3>
              </div>
              <button
                onClick={() => setIsReserveModalOpen(false)}
                className="p-1 rounded-sm text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {reserveSubmitted ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif-luxury text-xl font-bold text-stone-100">
                    Table Reserved!
                  </h4>
                  <p className="text-stone-300 text-xs leading-relaxed">
                    Thank you, <strong className="text-amber-400">{resName}</strong>. A table for {resGuests} on {resDate} ({resTime}) has been reserved at The Royal Palm Restaurant.
                  </p>
                  <button
                    onClick={() => setIsReserveModalOpen(false)}
                    className="px-6 py-2 rounded-sm bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReserveSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                        Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={resDate}
                        onChange={(e) => setResDate(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                        Time Slot *
                      </label>
                      <select
                        value={resTime}
                        onChange={(e) => setResTime(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                      >
                        <option>7:00 AM (Breakfast)</option>
                        <option>1:00 PM (Lunch)</option>
                        <option>7:00 PM (Dinner)</option>
                        <option>8:30 PM (Dinner & Wine)</option>
                        <option>10:00 PM (Late Lounge)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                      Number of Guests *
                    </label>
                    <select
                      value={resGuests}
                      onChange={(e) => setResGuests(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                    >
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>4 Guests</option>
                      <option>6 Guests</option>
                      <option>8+ Guests (VIP Table)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Samuel Danladi"
                      value={resName}
                      onChange={(e) => setResName(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+234 803 123 4567"
                      value={resPhone}
                      onChange={(e) => setResPhone(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                      Seating Preference (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Poolside terrace, indoor romantic corner, high-table"
                      value={dietaryPrefs}
                      onChange={(e) => setDietaryPrefs(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <UtensilsCrossed className="w-4 h-4" />
                    <span>Confirm Table Reservation</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
