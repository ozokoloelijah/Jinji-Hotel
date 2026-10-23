import React, { useState } from 'react';
import { 
  Car, 
  Plane, 
  MapPin, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Check, 
  X, 
  Phone,
  Send
} from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface AirportShuttleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AirportShuttleModal: React.FC<AirportShuttleModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [pickupPoint, setPickupPoint] = useState('Abuja Airport (Nnamdi Azikiwe International)');
  const [vehicleType, setVehicleType] = useState('Executive Prado / Fortuner SUV');
  const [passengerCount, setPassengerCount] = useState('1-2 Passengers');
  const [flightNumber, setFlightNumber] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-stone-900 border border-amber-500/40 rounded-lg max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
        <div className="flex items-start justify-between border-b border-stone-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-400 font-semibold">
              <Car className="w-3.5 h-3.5" />
              <span>Chauffeured Executive Fleet</span>
            </div>
            <h2 className="font-serif-luxury text-xl font-bold text-amber-100 mt-1">
              Airport Chauffeur & Shuttle Service
            </h2>
            <p className="text-xs text-stone-400">
              Safe, air-conditioned executive transfer between Abuja Airport (ABV), Lafia, and Jinji Hotels Akwanga.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-6 bg-emerald-950/80 border border-emerald-500/40 rounded-lg text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-serif-luxury text-lg font-bold text-emerald-200">Shuttle Request Received!</h3>
            <p className="text-xs text-emerald-300/90 leading-relaxed">
              Thank you, <strong>{guestName}</strong>. Our logistics concierge has logged your pickup request for <strong>{pickupPoint}</strong> on <strong>{arrivalDate}</strong> at <strong>{arrivalTime}</strong>. A chauffeur confirmation voucher has been transmitted to your WhatsApp.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-stone-300 font-medium mb-1">Pickup Location *</label>
              <select
                value={pickupPoint}
                onChange={(e) => setPickupPoint(e.target.value)}
                className="w-full bg-stone-950 border border-stone-700 text-stone-100 rounded-sm px-3 py-2.5 outline-none focus:border-amber-500"
              >
                <option value="Abuja Airport (Nnamdi Azikiwe International)">Abuja Airport (Nnamdi Azikiwe International - Domestic/Intl)</option>
                <option value="Abuja Central Business District (CBD)">Abuja Central Business District (CBD)</option>
                <option value="Lafia City Center / Govt House">Lafia City Center / State Secretariat</option>
                <option value="Keffi Interchange / NSUK">Keffi Interchange / NSUK Corridor</option>
                <option value="Akwanga Motor Park / Train Hub">Akwanga Central Terminal</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-300 font-medium mb-1">Vehicle Selection *</label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 text-stone-100 rounded-sm px-3 py-2.5 outline-none focus:border-amber-500"
                >
                  <option value="Executive Prado / Fortuner SUV">Executive 4x4 SUV (₦35,000)</option>
                  <option value="Luxury Sedan (Camry/Corolla)">Executive Luxury Sedan (₦25,000)</option>
                  <option value="Toyota Coaster Bus (Delegations)">18-Seater Coaster Bus (₦75,000)</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-300 font-medium mb-1">Flight Number (If Any)</label>
                <input
                  type="text"
                  placeholder="e.g. Air Peace P47120"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 text-stone-100 rounded-sm px-3 py-2.5 outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-300 font-medium mb-1">Arrival Date *</label>
                <input
                  type="date"
                  required
                  value={arrivalDate}
                  onChange={(e) => setArrivalDate(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 text-stone-100 rounded-sm px-3 py-2.5 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-medium mb-1">Estimated Arrival Time *</label>
                <input
                  type="time"
                  required
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 text-stone-100 rounded-sm px-3 py-2.5 outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-300 font-medium mb-1">Guest Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alhaji Ibrahim Tanko"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 text-stone-100 rounded-sm px-3 py-2.5 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-medium mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +234 803 123 4567"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 text-stone-100 rounded-sm px-3 py-2.5 outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="p-3 bg-stone-950 border border-stone-800 rounded text-[11px] text-stone-400 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                All transfers include complimentary chilled bottled water, mobile phone chargers, and vetted security escorts upon request.
              </span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-stone-400 hover:text-stone-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Confirm Chauffeur Request</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
