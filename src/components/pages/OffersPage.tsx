import React, { useState } from 'react';
import { 
  Tag, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  ArrowRight, 
  Copy, 
  Check, 
  Clock, 
  ShieldCheck, 
  MessageCircle,
  Percent,
  Gift
} from 'lucide-react';
import { OFFERS_DATA, HOTEL_INFO } from '../../data/hotelData';
import { PageId } from '../../types/hotel';

interface OffersPageProps {
  onOpenBooking: (roomId?: string) => void;
  onNavigate: (page: PageId) => void;
}

export const OffersPage: React.FC<OffersPageProps> = ({ onOpenBooking, onNavigate }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-stone-950 text-stone-100">
      {/* Top Banner & Header */}
      <div className="relative py-16 bg-gradient-to-b from-stone-900 to-stone-950 border-b border-amber-900/30 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Gift className="w-3.5 h-3.5" />
            <span>Exclusive Direct-Booking Privileges</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-100 tracking-tight mb-4">
            Special Offers & Seasonal Retreats
          </h1>
          <p className="text-stone-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Discover curated luxury experiences at Jinji Hotels Ltd. Enjoy exclusive promotional rates, romantic anniversary escapes, corporate group retreats, and weekend feasts in Akwanga.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        {/* Direct Booking Guarantee Card */}
        <div className="bg-gradient-to-r from-amber-950/40 via-stone-900/80 to-amber-950/40 border border-amber-500/30 rounded-lg p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
              <Percent className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-lg font-bold text-amber-100">Best Direct Rate Guarantee</h3>
              <p className="text-stone-400 text-xs sm:text-sm mt-0.5">
                Book directly on our official website or concierge desk for guaranteed lowest rates, free early check-in, and complimentary Wi-Fi & breakfast upgrades.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenBooking()}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-sm shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              Book Direct Now
            </button>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {OFFERS_DATA.map((offer) => (
            <div
              key={offer.id}
              className="bg-stone-900/90 border border-amber-500/20 hover:border-amber-500/50 rounded-lg overflow-hidden flex flex-col transition-all duration-300 shadow-xl group"
            >
              {/* Image & Badges */}
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
                
                {/* Discount Badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 text-xs font-black px-3 py-1.5 rounded-sm shadow-lg flex items-center gap-1.5 uppercase tracking-wider">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{offer.discountBadge}</span>
                </div>

                {/* Validity Badge */}
                <div className="absolute top-4 right-4 bg-stone-950/80 backdrop-blur-md border border-stone-700 text-amber-300 text-xs px-3 py-1.5 rounded-sm flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{offer.validity}</span>
                </div>

                {/* Price Display */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="text-stone-400 text-xs block mb-0.5">Package Starting From</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-bold font-mono text-amber-400">
                        ₦{offer.offerPrice.toLocaleString()}
                      </span>
                      {offer.regularPrice && (
                        <span className="text-sm line-through text-stone-400 font-mono">
                          ₦{offer.regularPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Promo Code Pill */}
                  <button
                    onClick={() => handleCopyCode(offer.promoCode)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-950/90 hover:bg-stone-850 border border-amber-500/40 text-amber-300 text-xs font-mono rounded cursor-pointer transition-colors shadow-md"
                    title="Click to copy promo code"
                  >
                    {copiedCode === offer.promoCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-amber-400" />
                        <span>CODE: <strong>{offer.promoCode}</strong></span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Offer Details */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-amber-400/90 text-xs font-medium uppercase tracking-wider mt-1">
                    {offer.subtitle}
                  </p>

                  {/* Inclusions List */}
                  <div className="mt-5 space-y-2.5">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-400 block">
                      Package Inclusions:
                    </span>
                    <ul className="space-y-2">
                      {offer.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-300">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Terms */}
                  <p className="text-[11px] text-stone-400 mt-5 pt-4 border-t border-stone-800 italic">
                    * {offer.terms}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => onOpenBooking(offer.targetRoomId)}
                    className="w-full sm:flex-1 py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Claim Package / Book</span>
                  </button>
                  <a
                    href={`https://wa.me/${HOTEL_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Jinji%20Hotels,%20I%20am%20interested%20in%20the%20${encodeURIComponent(offer.title)}%20(Code:%20${offer.promoCode}).`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto py-3 px-4 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Inquire via WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate & Group Special Inquiries Section */}
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-8 sm:p-10 text-center space-y-4">
          <Sparkles className="w-8 h-8 text-amber-400 mx-auto" />
          <h2 className="font-serif-luxury text-2xl font-bold text-amber-100">
            Planning a Wedding, Government Summit or Large Delegation?
          </h2>
          <p className="text-stone-300 text-sm max-w-2xl mx-auto leading-relaxed">
            Our dedicated banquet and sales concierges curate customized group lodging, buffet banquets, and hall reservations with bespoke bulk discounts.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('events')}
              className="px-6 py-3 bg-stone-800 hover:bg-stone-750 text-amber-300 border border-amber-500/40 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer flex items-center gap-2"
            >
              <span>Explore Event Halls</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
            >
              Contact Sales Concierge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
