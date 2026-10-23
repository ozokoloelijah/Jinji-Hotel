import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Zap, 
  CreditCard, 
  Users, 
  Waves, 
  Sparkles, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Phone, 
  FileText,
  CheckCircle2
} from 'lucide-react';
import { HOTEL_POLICIES_DATA, FAQ_DATA, HOTEL_INFO } from '../../data/hotelData';
import { PageId } from '../../types/hotel';

interface PoliciesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
}

export const PoliciesPage: React.FC<PoliciesPageProps> = ({ onNavigate, onOpenBooking }) => {
  const [openPolicyId, setOpenPolicyId] = useState<string | null>('pol-checkin');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const getPolicyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Clock': return Clock;
      case 'Zap': return Zap;
      case 'ShieldCheck': return ShieldCheck;
      case 'CreditCard': return CreditCard;
      case 'Users': return Users;
      case 'Waves': return Waves;
      case 'Sparkles': return Sparkles;
      default: return FileText;
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-stone-950 text-stone-100">
      {/* Header */}
      <div className="relative py-16 bg-gradient-to-b from-stone-900 to-stone-950 border-b border-amber-900/30 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Transparency, Safety & Guest Comfort</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-100 tracking-tight mb-4">
            Hotel Policies & Guest Guide
          </h1>
          <p className="text-stone-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            At Jinji Hotels Ltd, we are committed to providing a secure, serene, and world-class luxury environment for all guests, dignitaries, and event organizers.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        {/* Core Guarantees Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-stone-900/90 border border-amber-500/30 rounded-lg p-6 text-center space-y-2 shadow-lg">
            <div className="w-10 h-10 mx-auto rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-base font-bold text-amber-100">Check-in: 2:00 PM</h3>
            <p className="text-xs text-stone-400">Check-out is 12:00 PM noon. Early arrival options available.</p>
          </div>

          <div className="bg-stone-900/90 border border-amber-500/30 rounded-lg p-6 text-center space-y-2 shadow-lg">
            <div className="w-10 h-10 mx-auto rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-base font-bold text-amber-100">24/7 Power Assured</h3>
            <p className="text-xs text-stone-400">Twin industrial Cummins diesel generators & solar hybrid ATS.</p>
          </div>

          <div className="bg-stone-900/90 border border-amber-500/30 rounded-lg p-6 text-center space-y-2 shadow-lg">
            <div className="w-10 h-10 mx-auto rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-base font-bold text-amber-100">100% Armed Security</h3>
            <p className="text-xs text-stone-400">24-hour perimeter police escorts, CCTV, and gated checkpoints.</p>
          </div>
        </div>

        {/* Official Policies Accordion */}
        <div className="space-y-4">
          <h2 className="font-serif-luxury text-2xl font-bold text-amber-100 mb-6 flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-amber-400" />
            <span>Official Hotel Operating Policies</span>
          </h2>

          <div className="space-y-3">
            {HOTEL_POLICIES_DATA.map((policy) => {
              const Icon = getPolicyIcon(policy.iconName);
              const isOpen = openPolicyId === policy.id;

              return (
                <div
                  key={policy.id}
                  className="bg-stone-900 border border-stone-800 rounded-lg overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenPolicyId(isOpen ? null : policy.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-stone-850/60 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-sm bg-stone-950 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-400/90 block">
                          {policy.category}
                        </span>
                        <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-stone-100">
                          {policy.title}
                        </h3>
                        <p className="text-xs text-stone-400 mt-0.5 line-clamp-1 sm:line-clamp-none">
                          {policy.summary}
                        </p>
                      </div>
                    </div>
                    <div className="text-stone-400 shrink-0">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 pt-2 border-t border-stone-800 space-y-3 bg-stone-950/40">
                      <ul className="space-y-2.5 mt-2">
                        {policy.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-300 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="space-y-6 pt-8 border-t border-stone-800">
          <div className="text-center space-y-2">
            <HelpCircle className="w-8 h-8 text-amber-400 mx-auto" />
            <h2 className="font-serif-luxury text-2xl font-bold text-amber-100">
              Frequently Asked Questions (FAQs)
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm">
              Answers to common inquiries regarding reservations, logistics, and guest amenities in Akwanga.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_DATA.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-stone-900 border border-stone-800 rounded-lg overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-stone-850/60 transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-xs sm:text-sm text-stone-200">
                      {faq.q}
                    </span>
                    <span className="text-amber-400 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 pt-1 text-xs text-stone-300 leading-relaxed border-t border-stone-800 bg-stone-950/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Assistance Box */}
        <div className="bg-stone-900 border border-amber-500/30 rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="font-serif-luxury text-lg font-bold text-amber-100">Have a Special Requirement or Medical Need?</h3>
            <p className="text-stone-400 text-xs">
              Our front office team is on duty 24/7 to accommodate accessible suites, early check-in, or dietary requests.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${HOTEL_INFO.phonePrimary.replace(/\s+/g, '')}`}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center gap-1.5 shadow"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Front Desk</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
