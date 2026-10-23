import React from 'react';
import { 
  X, 
  Check, 
  Minus, 
  Bed, 
  Maximize2, 
  Users, 
  Sparkles, 
  Calendar,
  Zap,
  Wifi,
  Tv,
  Bath
} from 'lucide-react';
import { Room } from '../types/hotel';

interface RoomComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  rooms: Room[];
  onBookRoom: (roomId: string) => void;
}

export const RoomComparisonModal: React.FC<RoomComparisonModalProps> = ({
  isOpen,
  onClose,
  rooms,
  onBookRoom,
}) => {
  if (!isOpen) return null;

  const comparisonFeatures = [
    { label: 'Nightly Rate (NGN)', key: 'price', render: (r: Room) => `₦${r.price.toLocaleString()}` },
    { label: 'Room Dimensions (Sqm)', key: 'sizeSqm', render: (r: Room) => `${r.sizeSqm} m²` },
    { label: 'Bed Configuration', key: 'bedType', render: (r: Room) => r.bedType },
    { label: 'Maximum Occupancy', key: 'maxGuests', render: (r: Room) => `${r.maxGuests} Adults` },
    { 
      label: 'Private Jacuzzi Tub', 
      key: 'jacuzzi', 
      render: (r: Room) => r.amenities.some(a => a.toLowerCase().includes('jacuzzi')) ? true : false 
    },
    { 
      label: 'Executive Workstation Desk', 
      key: 'desk', 
      render: (r: Room) => r.amenities.some(a => a.toLowerCase().includes('desk') || a.toLowerCase().includes('workstation')) ? true : false 
    },
    { 
      label: 'Complimentary Starlink Wi-Fi', 
      key: 'wifi', 
      render: () => true 
    },
    { 
      label: '24/7 Uninterrupted AC & Power', 
      key: 'power', 
      render: () => true 
    },
    { 
      label: 'Smart 4K Satellite TV', 
      key: 'tv', 
      render: () => true 
    },
    { 
      label: 'Complimentary Chef Breakfast', 
      key: 'breakfast', 
      render: (r: Room) => r.price >= 85000 ? true : false 
    },
    { 
      label: 'VIP Dedicated Butler on Call', 
      key: 'butler', 
      render: (r: Room) => r.category === 'presidential' ? true : false 
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-stone-900 border border-amber-500/40 rounded-lg max-w-5xl w-full my-8 p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-stone-800 shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Side-by-Side Suite Comparison</span>
            </div>
            <h2 className="font-serif-luxury text-2xl font-bold text-amber-100 mt-1">
              Find Your Ideal Accommodation
            </h2>
            <p className="text-xs text-stone-400">
              Compare amenities, dimensions, and services across all 52+ suites at Jinji Hotels Ltd, Akwanga.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Table Container */}
        <div className="overflow-x-auto flex-1 pb-4">
          <table className="w-full text-left border-collapse min-w-[680px]">
            <thead>
              <tr className="border-b border-stone-800">
                <th className="p-3 text-xs font-semibold text-stone-400 uppercase tracking-wider w-44 bg-stone-950/60 sticky left-0 z-10">
                  Feature / Amenity
                </th>
                {rooms.map((room) => (
                  <th key={room.id} className="p-3 text-center min-w-[130px]">
                    <div className="h-20 w-full mb-2 overflow-hidden rounded border border-stone-700">
                      <img src={room.featuredImage} alt={room.name} className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="font-serif-luxury text-xs font-bold text-amber-200 line-clamp-1">{room.name}</div>
                    <div className="font-mono text-xs font-bold text-amber-400 mt-0.5">₦{room.price.toLocaleString()}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60 text-xs">
              {comparisonFeatures.map((feat, idx) => (
                <tr key={idx} className="hover:bg-stone-850/40 transition-colors">
                  <td className="p-3 font-medium text-stone-300 bg-stone-950/60 sticky left-0 z-10 text-xs">
                    {feat.label}
                  </td>
                  {rooms.map((room) => {
                    const val = feat.render(room);
                    return (
                      <td key={room.id} className="p-3 text-center">
                        {typeof val === 'boolean' ? (
                          val ? (
                            <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                          ) : (
                            <Minus className="w-4 h-4 text-stone-600 mx-auto" />
                          )
                        ) : (
                          <span className="font-medium text-stone-200">{val}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-stone-700 bg-stone-950/80">
                <td className="p-3 font-semibold text-stone-300 sticky left-0 z-10">
                  Action
                </td>
                {rooms.map((room) => (
                  <td key={room.id} className="p-3 text-center">
                    <button
                      onClick={() => {
                        onClose();
                        onBookRoom(room.id);
                      }}
                      className="w-full py-2 px-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-[11px] uppercase tracking-wider rounded-sm shadow transition-transform hover:scale-105 cursor-pointer"
                    >
                      Book Suite
                    </button>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
