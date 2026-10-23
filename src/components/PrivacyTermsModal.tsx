import React from 'react';
import { X, ShieldCheck, FileText, Lock, CheckCircle2 } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface PrivacyTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export const PrivacyTermsModal: React.FC<PrivacyTermsModalProps> = ({
  isOpen,
  onClose,
  type,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-stone-900 border border-amber-500/40 rounded-lg max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 max-h-[85vh] flex flex-col">
        <div className="flex items-start justify-between border-b border-stone-800 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400">
              {type === 'privacy' ? <Lock className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="font-serif-luxury text-xl font-bold text-amber-100">
                {type === 'privacy' ? 'Guest Privacy & Data Protection Policy' : 'Hotel Reservation & Guest Terms'}
              </h2>
              <p className="text-xs text-stone-400">
                {HOTEL_INFO.name} • Akwanga, Nasarawa State, Nigeria
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 space-y-4 text-xs text-stone-300 leading-relaxed pr-2">
          {type === 'privacy' ? (
            <>
              <section className="space-y-1.5">
                <h3 className="font-bold text-amber-300 text-sm">1. Commitment to Guest Confidentiality</h3>
                <p>
                  At {HOTEL_INFO.name}, we hold the privacy of our high-profile guests, government officials, corporate executives, and private travelers in the highest regard. We operate under stringent confidentiality standards adhering to the Nigeria Data Protection Act (NDPA).
                </p>
              </section>

              <section className="space-y-1.5">
                <h3 className="font-bold text-amber-300 text-sm">2. Information We Collect</h3>
                <p>
                  We collect guest identification details (full name, phone number, email address, nationality, government ID) strictly for room registration, security verification, and booking confirmation vouchers. Payment card data processed via our terminals is tokenized and never retained on unencrypted local storage.
                </p>
              </section>

              <section className="space-y-1.5">
                <h3 className="font-bold text-amber-300 text-sm">3. CCTV & Perimeter Security Privacy</h3>
                <p>
                  For guest protection, high-definition closed-circuit television (CCTV) cameras operate in public corridors, parking grounds, and entry points. No optical surveillance is ever installed in private guest bedrooms, bathrooms, or changing areas.
                </p>
              </section>

              <section className="space-y-1.5">
                <h3 className="font-bold text-amber-300 text-sm">4. Data Sharing & Third Parties</h3>
                <p>
                  We never sell, lease, or monetize guest personal information to external commercial marketers. Information is only disclosed to authorized law enforcement when legally compelled under federal Nigerian law.
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-1.5">
                <h3 className="font-bold text-amber-300 text-sm">1. Check-In & Guest Identification</h3>
                <p>
                  Standard check-in begins at {HOTEL_INFO.checkInTime} and check-out is by {HOTEL_INFO.checkOutTime}. Valid government identification must be provided by the lead guest at reception.
                </p>
              </section>

              <section className="space-y-1.5">
                <h3 className="font-bold text-amber-300 text-sm">2. Cancellation & Pre-Authorization</h3>
                <p>
                  Individual suite bookings may be cancelled free of charge up to 24 hours prior to 2:00 PM on the arrival date. Guaranteed reservations cancelled within 24 hours will incur a one-night room charge.
                </p>
              </section>

              <section className="space-y-1.5">
                <h3 className="font-bold text-amber-300 text-sm">3. 24/7 Power & Services Integrity</h3>
                <p>
                  {HOTEL_INFO.name} guarantees continuous electrical power and air conditioning via heavy-duty industrial generator plants and smart solar inverter backups. Complimentary Starlink Wi-Fi is provided for legitimate personal and business communications.
                </p>
              </section>

              <section className="space-y-1.5">
                <h3 className="font-bold text-amber-300 text-sm">4. Conduct & Property Protection</h3>
                <p>
                  All suites are strictly 100% smoke-free. Guests agree to conduct themselves with decorum and avoid disturbing fellow residents. Any intentional property damage will be assessed and billed to the guest folio upon departure.
                </p>
              </section>
            </>
          )}
        </div>

        <div className="pt-3 border-t border-stone-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
          >
            I Understand & Close
          </button>
        </div>
      </div>
    </div>
  );
};
