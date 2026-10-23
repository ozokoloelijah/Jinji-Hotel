import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Users, 
  Bed, 
  Check, 
  CreditCard, 
  Building2, 
  ShieldCheck, 
  Clock, 
  Copy, 
  Printer, 
  Share2, 
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Crown
} from 'lucide-react';
import { ROOMS_DATA, BOOKING_ADDONS, HOTEL_INFO } from '../data/hotelData';
import { BookingReservation, BookingAddOn, Room, HotelInfoConfig } from '../types/hotel';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedRoomId?: string;
  initialDates?: { checkIn: string; checkOut: string; adults: number };
  rooms?: Room[];
  hotelInfo?: HotelInfoConfig;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedRoomId,
  initialDates,
  rooms = ROOMS_DATA,
  hotelInfo = HOTEL_INFO
}) => {
  if (!isOpen) return null;

  // Defaults
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [step, setStep] = useState<number>(1);
  const [roomId, setRoomId] = useState<string>(preSelectedRoomId || (rooms[0]?.id || 'standard-room'));
  const [checkIn, setCheckIn] = useState<string>(initialDates?.checkIn || formatDate(today));
  const [checkOut, setCheckOut] = useState<string>(initialDates?.checkOut || formatDate(tomorrow));
  const [adults, setAdults] = useState<number>(initialDates?.adults || 2);
  const [children, setChildren] = useState<number>(0);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  
  // Guest Details
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'pay_at_hotel' | 'instant_transfer' | 'card'>('pay_at_hotel');

  // Confirmation result
  const [confirmedReservation, setConfirmedReservation] = useState<BookingReservation | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Sync if preSelectedRoomId changes
  useEffect(() => {
    if (preSelectedRoomId) {
      setRoomId(preSelectedRoomId);
    }
  }, [preSelectedRoomId]);

  const selectedRoom: Room = rooms.find((r) => r.id === roomId) || rooms[0] || ROOMS_DATA[0];

  // Calculate nights
  const calculateNights = () => {
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diffTime = d2.getTime() - d1.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nights = calculateNights();
  const roomTotal = selectedRoom.price * nights;

  // Calculate add-ons total
  const selectedAddOns: BookingAddOn[] = BOOKING_ADDONS.filter((a) => selectedAddOnIds.includes(a.id));
  const addOnsTotal = selectedAddOns.reduce((acc, item) => {
    const cost = item.perNight ? item.price * nights : item.price;
    return acc + cost;
  }, 0);

  const grandTotal = roomTotal + addOnsTotal;

  const toggleAddOn = (id: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate reference code
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const bookingRef = `JJH-${randomNum}`;

    const reservation: BookingReservation = {
      id: `res-${Date.now()}`,
      bookingReference: bookingRef,
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      roomPrice: selectedRoom.price,
      roomImage: selectedRoom.featuredImage,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      nights,
      adults,
      children,
      roomTotal,
      addOns: selectedAddOns,
      addOnsTotal,
      taxAmount: 0,
      grandTotal,
      guestName,
      guestEmail,
      guestPhone,
      specialRequests,
      paymentMethod,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    try {
      const stored = localStorage.getItem('jinji_hotels_reservations');
      const list: BookingReservation[] = stored ? JSON.parse(stored) : [];
      list.unshift(reservation);
      localStorage.setItem('jinji_hotels_reservations', JSON.stringify(list));
    } catch {
      // ignore
    }

    setConfirmedReservation(reservation);
    setStep(4);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleResetAndClose = () => {
    setStep(1);
    setConfirmedReservation(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-stone-900 border border-amber-500/40 rounded-sm shadow-2xl overflow-hidden my-4 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-950 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-amber-400" />
            <span className="font-crest text-xs sm:text-sm font-semibold tracking-wider text-amber-300">
              JINJI HOTELS LTD • RESERVATION SYSTEM
            </span>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1 rounded-sm text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Stepper (if not confirmed) */}
        {!confirmedReservation && (
          <div className="px-6 py-3 bg-stone-950/60 border-b border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-amber-400 font-semibold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-amber-500 text-stone-950' : 'bg-stone-800'}`}>1</span>
              <span>Room & Dates</span>
            </div>
            <div className="w-6 h-px bg-stone-700" />
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-amber-400 font-semibold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-amber-500 text-stone-950' : 'bg-stone-800'}`}>2</span>
              <span>VIP Add-ons</span>
            </div>
            <div className="w-6 h-px bg-stone-700" />
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-amber-400 font-semibold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-amber-500 text-stone-950' : 'bg-stone-800'}`}>3</span>
              <span>Guest & Payment</span>
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* STEP 1: Room & Dates */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-100 mb-1">
                  Select Room Category & Dates
                </h3>
                <p className="text-stone-400 text-xs">
                  Choose your preferred accommodation and dates of stay.
                </p>
              </div>

              {/* Room Card Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                  Select Accommodation
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {rooms.map((r) => (
                    <div
                      key={r.id}
                      onClick={() => setRoomId(r.id)}
                      className={`p-3 rounded-sm border cursor-pointer transition-all flex items-center gap-3 ${
                        roomId === r.id
                          ? 'border-amber-400 bg-amber-950/30'
                          : 'border-stone-800 bg-stone-950/40 hover:border-stone-700'
                      }`}
                    >
                      <img
                        src={r.featuredImage}
                        alt={r.name}
                        className="w-16 h-16 rounded-sm object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-stone-100 truncate">{r.name}</h4>
                          {roomId === r.id && (
                            <Check className="w-4 h-4 text-amber-400 shrink-0" />
                          )}
                        </div>
                        <p className="text-[11px] text-stone-400">{r.sizeSqm} sqm • {r.bedType.split(' ')[0]}</p>
                        <p className="text-xs font-bold text-amber-400 font-serif-luxury">
                          ₦{r.price.toLocaleString()} <span className="text-[10px] text-stone-400 font-normal">/ night</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dates & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-stone-950/60 rounded-sm border border-stone-800">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                    Check-In Date
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    min={formatDate(today)}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 focus:border-amber-500 text-stone-100 text-sm rounded-sm p-2.5 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                    Check-Out Date
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 focus:border-amber-500 text-stone-100 text-sm rounded-sm p-2.5 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                    Adults
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full bg-stone-900 border border-stone-700 text-stone-100 text-sm rounded-sm p-2.5 outline-none"
                  >
                    <option value={1}>1 Adult</option>
                    <option value={2}>2 Adults</option>
                    <option value={3}>3 Adults</option>
                    <option value={4}>4 Adults</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                    Children (under 12)
                  </label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full bg-stone-900 border border-stone-700 text-stone-100 text-sm rounded-sm p-2.5 outline-none"
                  >
                    <option value={0}>No Children</option>
                    <option value={1}>1 Child</option>
                    <option value={2}>2 Children</option>
                  </select>
                </div>
              </div>

              {/* Night calculation summary */}
              <div className="p-4 bg-amber-950/20 border border-amber-900/40 rounded-sm flex items-center justify-between text-xs">
                <div>
                  <span className="text-stone-300">
                    Duration: <strong className="text-amber-300">{nights} {nights === 1 ? 'Night' : 'Nights'}</strong>
                  </span>
                  <p className="text-[11px] text-stone-400">
                    Check-in: {checkIn} (from 2:00 PM) → Check-out: {checkOut} (until 12:00 PM)
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-stone-400 block text-[10px] uppercase">Room Subtotal</span>
                  <span className="text-base font-bold text-amber-400 font-serif-luxury">
                    ₦{roomTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: VIP Add-ons */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-100 mb-1">
                  Enhance Your Stay with VIP Services
                </h3>
                <p className="text-stone-400 text-xs">
                  Elevate your visit with executive airport pickup, daily buffet breakfast, or wellness spa treatments.
                </p>
              </div>

              <div className="space-y-3">
                {BOOKING_ADDONS.map((addon) => {
                  const isChecked = selectedAddOnIds.includes(addon.id);
                  const effectivePrice = addon.perNight ? addon.price * nights : addon.price;

                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={`p-4 rounded-sm border cursor-pointer transition-all flex items-start justify-between gap-4 ${
                        isChecked 
                          ? 'border-amber-400 bg-amber-950/30' 
                          : 'border-stone-800 bg-stone-950/40 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-sm border mt-0.5 flex items-center justify-center transition-colors ${
                            isChecked ? 'bg-amber-500 border-amber-500 text-stone-950' : 'border-stone-600 bg-stone-900'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-stone-100">{addon.name}</h4>
                          <p className="text-xs text-stone-400 mt-0.5">{addon.description}</p>
                          {addon.perNight && (
                            <span className="text-[10px] uppercase tracking-wider text-amber-400 font-medium">
                              (₦{addon.price.toLocaleString()} × {nights} nights)
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-sm font-bold text-amber-400 font-serif-luxury">
                          +₦{effectivePrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Running total preview */}
              <div className="p-4 bg-stone-950 border border-stone-800 rounded-sm space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-400">
                  <span>Room ({selectedRoom.name} × {nights} nights):</span>
                  <span>₦{roomTotal.toLocaleString()}</span>
                </div>
                {addOnsTotal > 0 && (
                  <div className="flex justify-between text-stone-400">
                    <span>VIP Add-ons ({selectedAddOns.length}):</span>
                    <span>₦{addOnsTotal.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-amber-400 pt-2 border-t border-stone-800">
                  <span>Estimated Total:</span>
                  <span className="font-serif-luxury text-base">₦{grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Guest Information & Payment Method */}
          {step === 3 && (
            <form id="booking-form" onSubmit={handleCompleteBooking} className="space-y-6">
              <div>
                <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-100 mb-1">
                  Guest Information & Payment
                </h3>
                <p className="text-stone-400 text-xs">
                  Your reservation confirmation voucher will be sent to these details.
                </p>
              </div>

              {/* Guest Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                    Full Name (As shown on Valid ID) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aliyu Mohammed"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 focus:border-amber-500 text-stone-100 text-sm rounded-sm p-2.5 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="guest@example.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 focus:border-amber-500 text-stone-100 text-sm rounded-sm p-2.5 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                    Phone Number (WhatsApp preferred) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 801 234 5678"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 focus:border-amber-500 text-stone-100 text-sm rounded-sm p-2.5 outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Quiet room on upper floor, early check-in, extra feather pillows..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 focus:border-amber-500 text-stone-100 text-sm rounded-sm p-2.5 outline-none resize-none"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                  Preferred Payment Method
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div
                    onClick={() => setPaymentMethod('pay_at_hotel')}
                    className={`p-3 rounded-sm border cursor-pointer transition-all flex flex-col justify-between ${
                      paymentMethod === 'pay_at_hotel'
                        ? 'border-amber-400 bg-amber-950/30'
                        : 'border-stone-800 bg-stone-950/40 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Building2 className="w-5 h-5 text-amber-400" />
                      {paymentMethod === 'pay_at_hotel' && <Check className="w-4 h-4 text-amber-400" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-100">Pay at Hotel</h4>
                      <p className="text-[10px] text-stone-400 mt-0.5">Pay via cash or POS during check-in</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('instant_transfer')}
                    className={`p-3 rounded-sm border cursor-pointer transition-all flex flex-col justify-between ${
                      paymentMethod === 'instant_transfer'
                        ? 'border-amber-400 bg-amber-950/30'
                        : 'border-stone-800 bg-stone-950/40 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <CreditCard className="w-5 h-5 text-amber-400" />
                      {paymentMethod === 'instant_transfer' && <Check className="w-4 h-4 text-amber-400" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-100">Direct Bank Transfer</h4>
                      <p className="text-[10px] text-stone-400 mt-0.5">Instant transfer to Jinji Hotels Zenith Bank</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-sm border cursor-pointer transition-all flex flex-col justify-between ${
                      paymentMethod === 'card'
                        ? 'border-amber-400 bg-amber-950/30'
                        : 'border-stone-800 bg-stone-950/40 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <ShieldCheck className="w-5 h-5 text-amber-400" />
                      {paymentMethod === 'card' && <Check className="w-4 h-4 text-amber-400" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-100">Debit / Credit Card</h4>
                      <p className="text-[10px] text-stone-400 mt-0.5">Verve, Mastercard, Visa secured</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bank Account Details Notice if transfer */}
              {paymentMethod === 'instant_transfer' && (
                <div className="p-3 bg-stone-950 border border-amber-900/40 rounded-sm text-xs text-stone-300 space-y-1">
                  <p className="font-semibold text-amber-400">{hotelInfo.name} Official Settlement Account:</p>
                  <p>Bank: <strong className="text-stone-100">{hotelInfo.bankName || 'Zenith Bank Plc'}</strong></p>
                  <p>Account Name: <strong className="text-stone-100">{hotelInfo.accountName || `${hotelInfo.name} Operations`}</strong></p>
                  <p>Account Number: <strong className="text-amber-300 font-mono text-sm">{hotelInfo.accountNumber || '1018892044'}</strong></p>
                  <p className="text-[11px] text-stone-400">Use your Full Name or Booking Reference as payment narration.</p>
                </div>
              )}

              {/* Grand Total Summary */}
              <div className="p-4 bg-stone-950 border border-amber-500/30 rounded-sm flex items-center justify-between">
                <div>
                  <span className="text-stone-400 text-xs block">Total Payable</span>
                  <span className="text-xs text-stone-300">{nights} night(s) • {selectedRoom.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-xl sm:text-2xl font-bold text-amber-400 font-serif-luxury">
                    ₦{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </form>
          )}

          {/* STEP 4: Confirmed Voucher */}
          {confirmedReservation && (
            <div className="space-y-6 animate-in zoom-in-95 duration-200">
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center text-emerald-400 mx-auto mb-3 shadow-lg shadow-emerald-950/50">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-100">
                  Reservation Confirmed & Guaranteed!
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm mt-1">
                  Thank you, <strong className="text-amber-400">{confirmedReservation.guestName}</strong>. Your luxury stay at {hotelInfo.name} has been reserved.
                </p>
              </div>

              {/* Printable Voucher Card */}
              <div id="printable-voucher" className="bg-stone-950 border-2 border-amber-500/40 p-6 rounded-sm shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-800 gap-2">
                  <div>
                    <span className="font-crest text-base font-bold text-amber-400 tracking-wider">
                      {hotelInfo.name.toUpperCase()}
                    </span>
                    <p className="text-[10px] text-stone-400 uppercase tracking-widest">Official Reservation Voucher</p>
                  </div>
                  <div className="sm:text-right">
                    <span className="text-xs text-stone-400 block">Booking Reference:</span>
                    <div className="flex items-center sm:justify-end gap-2">
                      <span className="text-lg font-mono font-bold text-amber-300 tracking-wider">
                        {confirmedReservation.bookingReference}
                      </span>
                      <button
                        onClick={() => handleCopyCode(confirmedReservation.bookingReference)}
                        className="p-1 hover:text-amber-400 text-stone-400 transition-colors cursor-pointer"
                        title="Copy code"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    {copiedCode && <span className="text-[10px] text-emerald-400">Copied!</span>}
                  </div>
                </div>

                {/* Details Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase">Room Booked</span>
                    <strong className="text-stone-200">{confirmedReservation.roomName}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase">Check-in</span>
                    <strong className="text-stone-200">{confirmedReservation.checkInDate} (2:00 PM)</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase">Check-out</span>
                    <strong className="text-stone-200">{confirmedReservation.checkOutDate} (12:00 PM)</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase">Duration</span>
                    <strong className="text-stone-200">{confirmedReservation.nights} Night(s)</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs pt-3 border-t border-stone-800">
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase">Guest Name</span>
                    <strong className="text-stone-200">{confirmedReservation.guestName}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase">Phone</span>
                    <strong className="text-stone-200">{confirmedReservation.guestPhone}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase">Payment Status</span>
                    <span className="inline-block px-2 py-0.5 rounded-sm bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold uppercase">
                      {confirmedReservation.paymentMethod === 'pay_at_hotel' ? 'Pay at Check-in' : 'Guaranteed'}
                    </span>
                  </div>
                </div>

                {/* Add-ons list if any */}
                {confirmedReservation.addOns.length > 0 && (
                  <div className="pt-3 border-t border-stone-800 text-xs">
                    <span className="text-stone-500 block text-[10px] uppercase mb-1">VIP Services Included:</span>
                    <div className="flex flex-wrap gap-2">
                      {confirmedReservation.addOns.map((add) => (
                        <span key={add.id} className="px-2 py-1 bg-stone-900 border border-stone-800 text-stone-300 rounded-sm text-[11px]">
                          ✓ {add.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                  <span className="text-sm font-semibold text-stone-300">Grand Total:</span>
                  <span className="text-2xl font-bold text-amber-400 font-serif-luxury">
                    ₦{confirmedReservation.grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handlePrint}
                  className="px-5 py-2.5 rounded-sm bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Voucher</span>
                </button>

                <a
                  href={`https://wa.me/${HOTEL_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Jinji%20Hotels,%20I%20have%20completed%20booking%20reservation%20${confirmedReservation.bookingReference}%20for%20${encodeURIComponent(confirmedReservation.roomName)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-sm bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share on WhatsApp</span>
                </a>

                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 rounded-sm bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Navigation Footer (Steps 1 to 3) */}
        {!confirmedReservation && (
          <div className="px-6 py-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between gap-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-5 py-2 rounded-sm bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div className="text-stone-400 text-xs">Step 1 of 3: Accommodation Details</div>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all shadow-md"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                form="booking-form"
                className="px-7 py-2.5 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all shadow-lg"
              >
                <Check className="w-4 h-4" />
                <span>Confirm Reservation</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
