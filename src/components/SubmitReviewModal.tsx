import React, { useState } from 'react';
import { 
  Star, 
  X, 
  Check, 
  MessageSquare, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Review } from '../types/hotel';

interface SubmitReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview?: (review: Review) => void;
}

export const SubmitReviewModal: React.FC<SubmitReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview,
}) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [guestName, setGuestName] = useState('');
  const [guestRole, setGuestRole] = useState('');
  const [guestLocation, setGuestLocation] = useState('Abuja, Nigeria');
  const [roomStayed, setRoomStayed] = useState('Presidential Suite');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      name: guestName.trim() || 'Valued Guest',
      role: guestRole.trim() || 'Verified Guest',
      location: guestLocation.trim() || 'Nigeria',
      rating,
      date: 'Just Now',
      roomStayed,
      comment: comment.trim(),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    };

    if (onSubmitReview) {
      onSubmitReview(newRev);
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-stone-900 border border-amber-500/40 rounded-lg max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
        <div className="flex items-start justify-between border-b border-stone-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Guest Feedback & Rating</span>
            </div>
            <h2 className="font-serif-luxury text-xl font-bold text-amber-100 mt-1">
              Share Your Jinji Experience
            </h2>
            <p className="text-xs text-stone-400">
              Your feedback inspires our hospitality team to elevate 5-star standards.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 bg-emerald-950/80 border border-emerald-500/40 rounded-lg text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-serif-luxury text-lg font-bold text-emerald-200">Review Submitted!</h3>
            <p className="text-xs text-emerald-300/90 leading-relaxed">
              Thank you, <strong>{guestName}</strong>! Your review has been saved to our guest book. We look forward to welcoming you back to Jinji Hotels Ltd.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Star Rating Selector */}
            <div className="text-center py-2 bg-stone-950 rounded border border-stone-800">
              <span className="text-[11px] uppercase tracking-wider text-stone-400 block mb-2 font-medium">
                Overall Experience Rating
              </span>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = (hoverRating || rating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 text-2xl transition-transform hover:scale-125 cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          isFilled
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-stone-600'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <span className="text-[11px] text-amber-300 font-bold mt-1 block">
                {rating === 5 ? '5.0 ★ Exceptional Royalty' : `${rating}.0 ★ Very Good`}
              </span>
            </div>

            <div>
              <label className="block text-stone-300 font-medium mb-1">Your Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Barrister Tunde Adeleke"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full bg-stone-950 border border-stone-700 text-stone-100 rounded-sm px-3 py-2.5 outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-300 font-medium mb-1">Profession / Role</label>
                <input
                  type="text"
                  placeholder="e.g. Managing Director"
                  value={guestRole}
                  onChange={(e) => setGuestRole(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 text-stone-100 rounded-sm px-3 py-2.5 outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-stone-300 font-medium mb-1">City / State</label>
                <input
                  type="text"
                  placeholder="e.g. Abuja, Nigeria"
                  value={guestLocation}
                  onChange={(e) => setGuestLocation(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 text-stone-100 rounded-sm px-3 py-2.5 outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-300 font-medium mb-1">Room or Suite Stayed *</label>
              <select
                value={roomStayed}
                onChange={(e) => setRoomStayed(e.target.value)}
                className="w-full bg-stone-950 border border-stone-700 text-stone-100 rounded-sm px-3 py-2.5 outline-none focus:border-amber-500"
              >
                <option value="Presidential Suite">Presidential Suite</option>
                <option value="Executive Suite">Executive Suite</option>
                <option value="Super Deluxe Room">Super Deluxe Room</option>
                <option value="Deluxe Room">Deluxe Room</option>
                <option value="Standard Room">Standard Room</option>
                <option value="Grand Crystal Ballroom">Grand Crystal Ballroom (Event)</option>
                <option value="Royal Palm Restaurant">Royal Palm Restaurant (Dining)</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-300 font-medium mb-1">Your Review & Comments *</label>
              <textarea
                rows={3}
                required
                placeholder="Share your thoughts on suite comfort, food quality, 24/7 power, and staff hospitality..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-stone-950 border border-stone-700 text-stone-100 rounded-sm px-3 py-2 outline-none focus:border-amber-500"
              />
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
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer shadow-md"
              >
                Publish Review
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
