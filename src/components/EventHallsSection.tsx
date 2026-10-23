import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Maximize2, 
  Check, 
  Sparkles, 
  Calendar, 
  Send, 
  X, 
  Crown,
  CheckCircle2
} from 'lucide-react';
import { EVENT_HALLS_DATA, HOTEL_INFO } from '../data/hotelData';
import { EventHall } from '../types/hotel';

export const EventHallsSection: React.FC = () => {
  const [eventHalls, setEventHalls] = useState<EventHall[]>(() => {
    try {
      const stored = localStorage.getItem('jinji_custom_event_halls');
      return stored ? JSON.parse(stored) : EVENT_HALLS_DATA;
    } catch {
      return EVENT_HALLS_DATA;
    }
  });

  useEffect(() => {
    const handleUpdate = () => {
      try {
        const stored = localStorage.getItem('jinji_custom_event_halls');
        if (stored) {
          setEventHalls(JSON.parse(stored));
        }
      } catch {
        // ignore
      }
    };

    window.addEventListener('jinji_events_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('jinji_events_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);
  const [selectedHall, setSelectedHall] = useState<EventHall | null>(null);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [submittedProposal, setSubmittedProposal] = useState(false);

  // Proposal form state
  const [eventType, setEventType] = useState('Wedding Reception');
  const [eventDate, setEventDate] = useState('');
  const [estimatedGuests, setEstimatedGuests] = useState('300');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const handleOpenProposal = (hall: EventHall) => {
    setSelectedHall(hall);
    setIsProposalModalOpen(true);
    setSubmittedProposal(false);
  };

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedProposal(true);
  };

  return (
    <section id="events" className="py-20 lg:py-28 bg-stone-900 relative overflow-hidden border-t border-b border-amber-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Crown className="w-3.5 h-3.5" />
            <span>PRESTIGIOUS VENUES</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100 tracking-tight mb-4">
            Magnificent Event Halls & Conference Spaces
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-4" />
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            With over 500 successful galas, royal weddings, and corporate summits hosted, Jinji Hotels Ltd provides unmatched acoustical elegance, guaranteed power, and banquet catering in Nasarawa State.
          </p>
        </div>

        {/* Halls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {eventHalls.map((hall) => (
            <div
              key={hall.id}
              className="bg-stone-950 border border-stone-800 hover:border-amber-500/40 rounded-sm overflow-hidden transition-all duration-300 group flex flex-col justify-between shadow-xl"
            >
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img
                  src={hall.image}
                  alt={hall.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
                
                <div className="absolute top-3 left-3 bg-stone-950/90 border border-amber-500/30 text-amber-400 text-xs font-semibold px-3 py-1 rounded-sm uppercase tracking-wider backdrop-blur-md">
                  {hall.sqm} sqm • Column-Free
                </div>

                <div className="absolute bottom-3 right-3 bg-stone-950/90 border border-amber-500/40 px-3 py-1.5 rounded-sm backdrop-blur-md text-right">
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Daily Booking Rate</span>
                  <span className="text-amber-400 font-bold text-base font-serif-luxury">
                    ₦{hall.dailyRate.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-100 group-hover:text-amber-300 transition-colors mb-1">
                    {hall.name}
                  </h3>
                  <p className="text-xs text-amber-400/90 font-serif-luxury italic mb-3">
                    {hall.subtitle}
                  </p>
                  <p className="text-xs text-stone-400 leading-relaxed mb-4">
                    {hall.description}
                  </p>

                  {/* Capacities */}
                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-stone-800 mb-4 text-xs text-stone-300">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-500 shrink-0" />
                      <div>
                        <span className="text-stone-500 text-[10px] block uppercase">Banquet Seating</span>
                        <strong className="text-stone-100">{hall.banquetCapacity} Guests</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-500 shrink-0" />
                      <div>
                        <span className="text-stone-500 text-[10px] block uppercase">Theater Style</span>
                        <strong className="text-stone-100">{hall.theaterCapacity} Guests</strong>
                      </div>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-1.5 mb-4">
                    {hall.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-stone-300">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleOpenProposal(hall)}
                  className="w-full py-3 px-4 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request Hall Proposal</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hall Proposal Modal */}
      {isProposalModalOpen && selectedHall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-xl bg-stone-900 border border-amber-500/40 rounded-sm shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 bg-stone-950 border-b border-stone-800">
              <div>
                <span className="font-crest text-xs tracking-wider uppercase text-amber-400 block">
                  EVENT HALL PROPOSAL
                </span>
                <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-stone-100">
                  {selectedHall.name}
                </h3>
              </div>
              <button
                onClick={() => setIsProposalModalOpen(false)}
                className="p-1 rounded-sm text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {submittedProposal ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif-luxury text-2xl font-bold text-stone-100">
                    Proposal Request Received!
                  </h4>
                  <p className="text-stone-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-amber-400">{contactName}</strong>. Our Jinji Hotels Banquet & Events Coordinator has received your inquiry for <strong>{selectedHall.name}</strong> on <strong>{eventDate}</strong>. We will call you within 2 hours.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setIsProposalModalOpen(false)}
                      className="px-6 py-2.5 rounded-sm bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitProposal} className="space-y-4">
                  <div className="p-3 bg-stone-950 rounded-sm border border-stone-800 text-xs text-stone-300 flex justify-between">
                    <span>Base Hall Rate:</span>
                    <strong className="text-amber-400 font-serif-luxury">₦{selectedHall.dailyRate.toLocaleString()} / Day</strong>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                      Event Category *
                    </label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                    >
                      <option>Wedding Reception & Gala</option>
                      <option>Corporate Annual General Meeting (AGM)</option>
                      <option>Government / State Summit</option>
                      <option>Academic Conference / Seminar</option>
                      <option>Anniversary / Birthday Banquet</option>
                      <option>Church / Religious Convention</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                        Intended Event Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                        Estimated Attendees *
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 500"
                        value={estimatedGuests}
                        onChange={(e) => setEstimatedGuests(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Chief Olabisi"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+234 802 345 6789"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                      Catering & AV Requirements (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Buffet catering for 400 people, live sound system, translation booth..."
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs rounded-sm p-2.5 outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Proposal Request</span>
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
