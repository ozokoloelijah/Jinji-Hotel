import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Send, 
  Users, 
  Award, 
  Building, 
  GraduationCap, 
  HeartHandshake,
  Check
} from 'lucide-react';
import { CAREER_OPENINGS_DATA, HOTEL_INFO } from '../../data/hotelData';
import { PageId, JobOpening } from '../../types/hotel';

interface CareersPageProps {
  onNavigate: (page: PageId) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onNavigate }) => {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantExperience, setApplicantExperience] = useState('');
  const [applicantCoverLetter, setApplicantCoverLetter] = useState('');
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplicationSubmitted(true);
    setTimeout(() => {
      setApplicationSubmitted(false);
      setSelectedJob(null);
      setApplicantName('');
      setApplicantEmail('');
      setApplicantPhone('');
      setApplicantExperience('');
      setApplicantCoverLetter('');
    }, 4000);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-stone-950 text-stone-100">
      {/* Hero Header */}
      <div className="relative py-16 bg-gradient-to-b from-stone-900 to-stone-950 border-b border-amber-900/30 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Join Our 5-Star Hospitality Family</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-100 tracking-tight mb-4">
            Careers at Jinji Hotels Ltd
          </h1>
          <p className="text-stone-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Build your hospitality career with the pinnacle of luxury in Akwanga, Nasarawa State. We value passion, excellence, integrity, and genuine warmth.
          </p>

          {/* Value Props */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 bg-stone-900/80 border border-stone-800 rounded-sm">
              <Award className="w-5 h-5 text-amber-400 mb-2" />
              <div className="text-xs font-bold text-amber-200">Competitive Pay</div>
              <div className="text-[11px] text-stone-400 mt-0.5">Top-tier hospitality compensation & performance bonuses.</div>
            </div>
            <div className="p-4 bg-stone-900/80 border border-stone-800 rounded-sm">
              <GraduationCap className="w-5 h-5 text-amber-400 mb-2" />
              <div className="text-xs font-bold text-amber-200">Continuous Training</div>
              <div className="text-[11px] text-stone-400 mt-0.5">5-star customer service & food safety certifications.</div>
            </div>
            <div className="p-4 bg-stone-900/80 border border-stone-800 rounded-sm">
              <HeartHandshake className="w-5 h-5 text-amber-400 mb-2" />
              <div className="text-xs font-bold text-amber-200">Staff Meals & Welfare</div>
              <div className="text-[11px] text-stone-400 mt-0.5">Duty meals, medical coverage, and staff transport.</div>
            </div>
            <div className="p-4 bg-stone-900/80 border border-stone-800 rounded-sm">
              <Building className="w-5 h-5 text-amber-400 mb-2" />
              <div className="text-xs font-bold text-amber-200">Career Advancement</div>
              <div className="text-[11px] text-stone-400 mt-0.5">Clear promotion pathways from entry to executive management.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        {/* Open Positions List */}
        <div>
          <h2 className="font-serif-luxury text-2xl font-bold text-amber-100 mb-2">
            Current Vacancies ({CAREER_OPENINGS_DATA.length})
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mb-8">
            Click on any position to view full responsibilities and submit an online application.
          </p>

          <div className="grid grid-cols-1 gap-6">
            {CAREER_OPENINGS_DATA.map((job) => (
              <div
                key={job.id}
                className="bg-stone-900 border border-stone-800 hover:border-amber-500/40 rounded-lg p-6 sm:p-8 transition-all shadow-xl space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-sm border border-amber-500/20 inline-block mb-2">
                      {job.department}
                    </span>
                    <h3 className="font-serif-luxury text-xl font-bold text-stone-100">
                      {job.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-stone-300">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {job.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {job.jobType}
                    </span>
                    {job.salaryRange && (
                      <>
                        <span>•</span>
                        <span className="text-amber-400 font-mono font-medium">{job.salaryRange}</span>
                      </>
                    )}
                  </div>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed">
                  {job.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  <div>
                    <h4 className="font-semibold text-amber-300 uppercase tracking-wider text-[11px] mb-2">
                      Key Responsibilities:
                    </h4>
                    <ul className="space-y-1.5 text-stone-300">
                      {job.responsibilities.map((r, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-amber-300 uppercase tracking-wider text-[11px] mb-2">
                      Requirements & Profile:
                    </h4>
                    <ul className="space-y-1.5 text-stone-300">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="py-2.5 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-sm transition-all cursor-pointer shadow-md"
                  >
                    Apply for this Position
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* General Application Callout */}
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-8 text-center space-y-3">
          <h3 className="font-serif-luxury text-xl font-bold text-amber-100">Don’t See Your Specific Discipline?</h3>
          <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto">
            We are always scouting exceptional talent across hospitality, security, culinary arts, and administration. Send your CV directly to our HR desk at <strong className="text-amber-400 font-mono">{HOTEL_INFO.inquiriesEmail}</strong>.
          </p>
        </div>
      </div>

      {/* Online Job Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-stone-900 border border-amber-500/40 rounded-lg max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Online Job Application</span>
                <h3 className="font-serif-luxury text-xl font-bold text-amber-100 mt-1">{selectedJob.title}</h3>
                <p className="text-xs text-stone-400">{selectedJob.department} • Akwanga, Nasarawa State</p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-stone-400 hover:text-stone-100 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {applicationSubmitted ? (
              <div className="p-6 bg-emerald-950/80 border border-emerald-500/40 rounded-lg text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif-luxury text-lg font-bold text-emerald-200">Application Submitted!</h4>
                <p className="text-xs text-emerald-300/90 leading-relaxed">
                  Thank you, <strong>{applicantName}</strong>. Your application for <strong>{selectedJob.title}</strong> has been transmitted to our HR Operations Directorate. Shortlisted candidates will be contacted for an in-person interview.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samuel Aliyu Tanko"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs rounded-sm px-3 py-2.5 outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. samuel@example.com"
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs rounded-sm px-3 py-2.5 outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +234 803 123 4567"
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs rounded-sm px-3 py-2.5 outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">Years of Relevant Experience *</label>
                  <select
                    required
                    value={applicantExperience}
                    onChange={(e) => setApplicantExperience(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs rounded-sm px-3 py-2.5 outline-none focus:border-amber-500"
                  >
                    <option value="">Select experience level...</option>
                    <option value="entry">Entry Level / Less than 1 year</option>
                    <option value="1-2">1 to 2 Years</option>
                    <option value="3-5">3 to 5 Years</option>
                    <option value="5+">Over 5 Years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">Brief Statement / Why Jinji Hotels? *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us about your background, key strengths, and current residence location..."
                    value={applicantCoverLetter}
                    onChange={(e) => setApplicantCoverLetter(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs rounded-sm px-3 py-2 outline-none focus:border-amber-500"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="px-4 py-2 text-xs text-stone-400 hover:text-stone-200 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Application</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
