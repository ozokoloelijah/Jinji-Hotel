import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  BookmarkCheck, 
  Trash2, 
  Building2 
} from 'lucide-react';
import { BookingReservation } from '../types/hotel';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState('');
  const [reservations, setReservations] = useState<BookingReservation[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<BookingReservation | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('jinji_hotels_reservations');
      if (stored) {
        setReservations(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, [isOpen]);

  const filteredReservations = reservations.filter(
    (res) =>
      res.bookingReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.roomName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to cancel / remove this booking record?')) {
      const updated = reservations.filter((r) => r.id !== id);
      setReservations(updated);
      localStorage.setItem('jinji_hotels_reservations', JSON.stringify(updated));
      if (selectedBooking?.id === id) {
        setSelectedBooking(null);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-stone-900 border border-amber-500/40 rounded-sm shadow-2xl overflow-hidden my-6 max-h-[88vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-950 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <BookmarkCheck className="w-5 h-5 text-amber-400" />
            <span className="font-crest text-sm font-semibold tracking-wider text-amber-300">
              RESERVATION LOOKUP & MANAGEMENT
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-sm text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input */}
        <div className="p-6 border-b border-stone-800 bg-stone-950/40">
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
            Search by Booking Reference Code (e.g. JJH-84291) or Guest Name:
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Enter reference code or guest name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-900 border border-stone-700 focus:border-amber-500 text-stone-100 text-sm rounded-sm pl-9 pr-4 py-2.5 outline-none"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {reservations.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <Building2 className="w-12 h-12 text-stone-600 mx-auto" />
              <h4 className="text-stone-300 font-serif-luxury text-lg">No Active Bookings Found</h4>
              <p className="text-stone-500 text-xs max-w-sm mx-auto">
                You haven’t completed any reservations on this device yet. Use our booking engine to reserve your stay at Jinji Hotels Ltd.
              </p>
            </div>
          ) : filteredReservations.length === 0 ? (
            <div className="text-center py-8 text-stone-400 text-xs">
              No reservation matched "{searchQuery}". Please check your reference code.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredReservations.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-stone-950 border border-stone-800 hover:border-amber-500/40 rounded-sm transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={item.roomImage}
                      alt={item.roomName}
                      className="w-14 h-14 rounded-sm object-cover object-top shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-amber-400 font-bold text-xs">
                          {item.bookingReference}
                        </span>
                        <span className="px-2 py-0.5 bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold uppercase rounded-sm">
                          {item.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-stone-100 mt-0.5">{item.roomName}</h4>
                      <p className="text-xs text-stone-400">
                        {item.checkInDate} → {item.checkOutDate} ({item.nights} Nights)
                      </p>
                      <p className="text-[11px] text-stone-500">Guest: {item.guestName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-stone-800">
                    <div className="sm:text-right">
                      <span className="text-xs font-bold text-amber-400 font-serif-luxury">
                        ₦{item.grandTotal.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-stone-400 block uppercase">
                        {item.paymentMethod === 'pay_at_hotel' ? 'Pay at Hotel' : 'Paid'}
                      </span>
                    </div>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-stone-500 hover:text-red-400 hover:bg-stone-900 rounded-sm transition-colors cursor-pointer"
                      title="Cancel Booking"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-950 border-t border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-sm bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
