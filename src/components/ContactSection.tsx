import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageCircle, 
  CheckCircle2, 
  ShieldCheck,
  Compass,
  ExternalLink,
  Share2
} from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';
import { HotelInfoConfig } from '../types/hotel';

interface ContactSectionProps {
  hotelInfo?: HotelInfoConfig;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ hotelInfo = HOTEL_INFO }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-stone-900 relative overflow-hidden border-t border-amber-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100 tracking-tight mb-4">
            Connect with Our Hospitality Team
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-4" />
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Whether booking an extended suite stay, organizing a grand gala, or inquiring about airport transfers, our concierge desk is available 24 hours daily.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details & Map Card (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-stone-950 p-6 sm:p-8 rounded-sm border border-stone-800 space-y-6 shadow-xl">
              <h3 className="font-serif-luxury text-xl font-bold text-amber-300 pb-3 border-b border-stone-800">
                Contact Information
              </h3>

              {/* Physical Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">
                    Our Location
                  </span>
                  <p className="text-sm text-stone-200 mt-0.5 leading-relaxed font-medium">
                    {hotelInfo.address}
                  </p>
                  
                  {/* Google Maps & Google Share Address Links */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <a
                      href={hotelInfo.googleMapUrl || 'https://maps.app.goo.gl/BVnFZfDGksT9tPCd9'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all shadow-sm hover:scale-[1.02]"
                      title="Open Jinji Hotels in Google Maps"
                    >
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>Google Maps (Directions)</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>

                    <a
                      href={hotelInfo.googleShareUrl || 'https://share.google/NN3dac8IJIJL1vSF0'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 text-xs font-medium transition-all shadow-sm hover:scale-[1.02]"
                      title="Share Jinji Hotels Location Pin"
                    >
                      <Share2 className="w-3.5 h-3.5 text-blue-400" />
                      <span>Share Location Link</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">
                    Reservations Hotline (24/7)
                  </span>
                  <div className="mt-0.5 space-y-0.5">
                    <a href={`tel:${hotelInfo.phonePrimary.replace(/\s+/g, '')}`} className="text-sm text-stone-200 hover:text-amber-400 transition-colors block font-medium">
                      {hotelInfo.phonePrimary}
                    </a>
                    <a href={`tel:${hotelInfo.phoneSecondary.replace(/\s+/g, '')}`} className="text-sm text-stone-200 hover:text-amber-400 transition-colors block font-medium">
                      {hotelInfo.phoneSecondary}
                    </a>
                  </div>
                </div>
              </div>

              {/* Email Addresses */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">
                    Email Inquiries
                  </span>
                  <div className="mt-0.5 space-y-0.5">
                    <a href={`mailto:${hotelInfo.email}`} className="text-sm text-stone-200 hover:text-amber-400 transition-colors block">
                      {hotelInfo.email}
                    </a>
                    <a href={`mailto:${hotelInfo.inquiriesEmail}`} className="text-sm text-stone-400 hover:text-amber-400 transition-colors block">
                      {hotelInfo.inquiriesEmail}
                    </a>
                  </div>
                </div>
              </div>

              {/* WhatsApp Direct */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${hotelInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(hotelInfo.name)},%20I%20would%20like%20to%20make%20a%20reservation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-sm bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>

            {/* Stylized Map Card */}
            <div className="bg-stone-950 p-4 rounded-sm border border-stone-800 space-y-2">
              <div className="relative h-44 rounded-sm overflow-hidden border border-stone-800">
                <iframe
                  title="Jinji Hotels Akwanga Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63032.54157140833!2d8.37568165!3d8.90847955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10515764d7df6db7%3A0xc3c509b5eb0cf03e!2sAkwanga%2C%20Nasarawa!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                  className="w-full h-full border-0 filter invert contrast-[0.9] opacity-80"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute top-2 left-2 bg-stone-950/90 border border-amber-500/40 text-[10px] text-amber-300 px-2.5 py-1 rounded-sm uppercase tracking-wider font-semibold">
                  Akwanga, Nasarawa State
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                <a
                  href={hotelInfo.googleMapUrl || 'https://maps.app.goo.gl/BVnFZfDGksT9tPCd9'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                  <span>→</span>
                </a>
                <a
                  href={hotelInfo.googleShareUrl || 'https://share.google/NN3dac8IJIJL1vSF0'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-400 hover:text-white font-medium inline-flex items-center gap-1 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Share Location Link</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Contact Form (Right 7 Cols) */}
          <div className="lg:col-span-7 bg-stone-950 p-6 sm:p-10 rounded-sm border border-stone-800 shadow-2xl flex flex-col justify-between">
            <div>
              <h3 className="font-serif-luxury text-2xl font-bold text-stone-100 mb-2">
                Send an Online Message
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 mb-6">
                Fill out the form below and our guest experience desk will respond promptly via email or phone call.
              </p>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif-luxury text-2xl font-bold text-stone-100">
                    Message Successfully Sent!
                  </h4>
                  <p className="text-stone-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-amber-400">{formData.name}</strong>. Your inquiry has been routed to our front desk team. We will contact you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: 'General Inquiry',
                        message: '',
                      });
                    }}
                    className="px-6 py-2 rounded-sm bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alhaji Danjuma Musa"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm p-3 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="danjuma@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm p-3 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+234 802 000 1122"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm p-3 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                        Subject of Inquiry *
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm p-3 outline-none"
                      >
                        <option>Room & Suite Reservation</option>
                        <option>Event Hall Booking & Proposal</option>
                        <option>Wedding Banquet Inquiries</option>
                        <option>Restaurant Table Reservation</option>
                        <option>Airport Chauffeur Transport</option>
                        <option>Corporate Partnership / Retainer</option>
                        <option>Other Feedback</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                      Your Detailed Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Please share details about your planned stay, event dates, room requirements, or any special preferences..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm p-3 outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Concierge</span>
                  </button>
                </form>
              )}
            </div>

            <div className="pt-6 border-t border-stone-800 text-[11px] text-stone-500 flex items-center justify-between">
              <span>Privacy Guaranteed. Your information is never shared.</span>
              <span className="text-amber-500/80">Average response time: &lt; 30 mins</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
