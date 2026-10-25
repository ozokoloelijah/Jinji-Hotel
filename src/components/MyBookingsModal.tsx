import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  Calendar, 
  BookmarkCheck, 
  Trash2, 
  Printer, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Users,
  Crown,
  Sparkles,
  Gift,
  Coins,
  Award,
  Star,
  Copy,
  Check,
  ArrowRight,
  TrendingUp,
  Tag,
  AlertCircle
} from 'lucide-react';
import { BookingReservation, LoyaltyMember, LoyaltyRewardItem, LoyaltyVoucher } from '../types/hotel';
import { LOYALTY_REWARDS_DATA } from '../data/hotelData';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'bookings' | 'loyalty';
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({ 
  isOpen, 
  onClose,
  initialTab = 'bookings'
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'bookings' | 'loyalty'>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [reservations, setReservations] = useState<BookingReservation[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<BookingReservation | null>(null);

  // Loyalty Program State
  const [member, setMember] = useState<LoyaltyMember | null>(null);
  const [vouchers, setVouchers] = useState<LoyaltyVoucher[]>([]);
  const [redeemSuccess, setRedeemSuccess] = useState<LoyaltyVoucher | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [redeemError, setRedeemError] = useState('');

  // Quick Enrollment Form (inside loyalty tab if not yet registered)
  const [enrollName, setEnrollName] = useState('');
  const [enrollEmail, setEnrollEmail] = useState('');
  const [enrollPhone, setEnrollPhone] = useState('');
  const [isSubmittingEnroll, setIsSubmittingEnroll] = useState(false);

  // Synchronize initialTab if changed
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Load reservations and loyalty data
  useEffect(() => {
    try {
      const storedRes = localStorage.getItem('jinji_hotels_reservations');
      if (storedRes) {
        setReservations(JSON.parse(storedRes));
      }

      const storedMember = localStorage.getItem('jinji_rewards_member');
      if (storedMember) {
        setMember(JSON.parse(storedMember));
      }

      const storedVouchers = localStorage.getItem('jinji_rewards_vouchers');
      if (storedVouchers) {
        setVouchers(JSON.parse(storedVouchers));
      }
    } catch {
      // ignore
    }
  }, [isOpen]);

  // Filter reservations
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

  // Points Calculation:
  // Base points from completed bookings (10 pts per ₦1,000 = grandTotal / 100)
  const bookingsPoints = reservations.reduce((acc, curr) => {
    return acc + Math.floor((curr.grandTotal || 0) / 100);
  }, 0);

  const welcomeBonus = member?.bonusPoints || 0;
  const totalRedeemed = member?.redeemedPoints || 0;
  const currentAvailablePoints = Math.max(0, welcomeBonus + bookingsPoints - totalRedeemed);

  // Calculate dynamic tier
  const lifetimePoints = welcomeBonus + bookingsPoints;
  const computedTier: 'Silver' | 'Gold' | 'Platinum' = 
    lifetimePoints >= 15000 ? 'Platinum' : lifetimePoints >= 5000 ? 'Gold' : 'Silver';

  // Quick enroll from loyalty tab
  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollName.trim() || !enrollEmail.trim() || !enrollPhone.trim()) return;

    setIsSubmittingEnroll(true);
    const memberId = 'JR-' + Math.floor(100000 + Math.random() * 900000);
    const newMember: LoyaltyMember = {
      memberId,
      fullName: enrollName.trim(),
      email: enrollEmail.trim(),
      phone: enrollPhone.trim(),
      tier: 'Silver',
      bonusPoints: 500,
      enrolledAt: new Date().toISOString(),
      redeemedPoints: 0,
    };

    setTimeout(() => {
      try {
        localStorage.setItem('jinji_rewards_member', JSON.stringify(newMember));
      } catch {
        // ignore
      }
      setMember(newMember);
      setIsSubmittingEnroll(false);
    }, 500);
  };

  // Redeem Reward Voucher
  const handleRedeemReward = (item: LoyaltyRewardItem) => {
    setRedeemError('');
    if (!member) return;

    if (currentAvailablePoints < item.pointsCost) {
      setRedeemError(`Insufficient points. You need ${item.pointsCost} points for this reward (Current balance: ${currentAvailablePoints} pts).`);
      return;
    }

    const voucherCode = 'JRV-' + Math.floor(10000 + Math.random() * 90000);
    const newVoucher: LoyaltyVoucher = {
      id: 'vch-' + Date.now(),
      code: voucherCode,
      rewardTitle: item.title,
      pointsDeducted: item.pointsCost,
      redeemedAt: new Date().toISOString(),
      status: 'Active',
    };

    const updatedVouchers = [newVoucher, ...vouchers];
    const updatedMember: LoyaltyMember = {
      ...member,
      redeemedPoints: (member.redeemedPoints || 0) + item.pointsCost,
      tier: computedTier,
    };

    setVouchers(updatedVouchers);
    setMember(updatedMember);
    setRedeemSuccess(newVoucher);

    try {
      localStorage.setItem('jinji_rewards_vouchers', JSON.stringify(updatedVouchers));
      localStorage.setItem('jinji_rewards_member', JSON.stringify(updatedMember));
    } catch {
      // ignore
    }
  };

  const handleCopyVoucher = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-stone-900 border border-amber-500/40 rounded-sm shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-950 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-400" />
            <span className="font-crest text-sm font-semibold tracking-wider text-amber-300">
              GUEST PORTAL & JINJI REWARDS
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-sm text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-stone-800 bg-stone-950/80 px-6 pt-2 gap-4">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'bookings'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>My Reservations ({reservations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('loyalty')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'loyalty'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Crown className="w-4 h-4 text-amber-400" />
            <span>Jinji Rewards Loyalty</span>
            {member && (
              <span className="px-1.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-[10px]">
                {currentAvailablePoints.toLocaleString()} pts
              </span>
            )}
          </button>
        </div>

        {/* TAB 1: RESERVATIONS */}
        {activeTab === 'bookings' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Search input */}
            <div className="p-5 border-b border-stone-800 bg-stone-950/40">
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
                  {filteredReservations.map((item) => {
                    const earnedPts = Math.floor((item.grandTotal || 0) / 100);
                    return (
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
                              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-amber-950/80 border border-amber-500/30 text-amber-300 text-[10px] font-semibold rounded-sm">
                                <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                                <span>+{earnedPts} Loyalty Pts</span>
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
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: JINJI REWARDS LOYALTY */}
        {activeTab === 'loyalty' && (
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            {member ? (
              /* ENROLLED MEMBER LOYALTY DASHBOARD */
              <div className="space-y-6">
                {/* Virtual Card & Top Balance Card */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  {/* Digital VIP Membership Card */}
                  <div className="md:col-span-6 flex justify-center">
                    <div className="w-full aspect-[1.586] rounded-xl bg-gradient-to-tr from-stone-950 via-stone-900 to-amber-950/90 border border-amber-500/60 p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden text-stone-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Crown className="w-5 h-5 text-amber-400" />
                          <div>
                            <span className="font-crest text-xs font-bold tracking-widest text-amber-200 block">JINJI HOTELS</span>
                            <span className="text-[8px] uppercase tracking-wider text-amber-400/80 block">REWARDS CLUB</span>
                          </div>
                        </div>
                        <div className="w-8 h-6 rounded bg-gradient-to-tr from-amber-600 via-amber-300 to-amber-600 border border-amber-400/80 shadow" />
                      </div>

                      <div className="my-auto py-1">
                        <span className="text-[9px] text-stone-400 uppercase tracking-widest block">VIP Member Number</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-base font-bold text-amber-300">
                            {member.memberId}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-end justify-between border-t border-amber-500/20 pt-2 text-xs">
                        <div>
                          <span className="text-[8px] uppercase tracking-wider text-stone-400 block">Cardholder</span>
                          <p className="font-serif-luxury font-bold text-xs tracking-wide text-white truncate max-w-[150px]">
                            {member.fullName}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/50 text-[9px] font-bold text-amber-300 uppercase">
                            {computedTier} Tier
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Points Metrics */}
                  <div className="md:col-span-6 space-y-3">
                    <div className="p-4 bg-stone-950 border border-stone-800 rounded-sm">
                      <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                        Available Points Balance
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="font-serif-luxury text-3xl font-extrabold text-amber-400">
                          {currentAvailablePoints.toLocaleString()}
                        </span>
                        <span className="text-xs text-stone-400">pts</span>
                      </div>
                      <span className="text-xs text-emerald-400 font-semibold block mt-0.5">
                        ≈ ₦{(currentAvailablePoints * 10).toLocaleString()} Redeemable Hotel Credit
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-stone-950/70 border border-stone-800 rounded-sm">
                        <span className="text-[10px] uppercase text-stone-400 block">From Bookings</span>
                        <span className="font-bold text-amber-300 font-mono">+{bookingsPoints.toLocaleString()} pts</span>
                      </div>
                      <div className="p-3 bg-stone-950/70 border border-stone-800 rounded-sm">
                        <span className="text-[10px] uppercase text-stone-400 block">Signup Bonus</span>
                        <span className="font-bold text-emerald-400 font-mono">+{welcomeBonus} pts</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Redeem Success Notification */}
                {redeemSuccess && (
                  <div className="p-4 bg-emerald-950/90 border border-emerald-500/60 rounded-sm space-y-2 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Reward Successfully Claimed!</span>
                      </div>
                      <button
                        onClick={() => setRedeemSuccess(null)}
                        className="text-stone-400 hover:text-white text-xs cursor-pointer"
                      >
                        Dismiss
                      </button>
                    </div>
                    <p className="text-xs text-stone-200">
                      Your voucher for <strong>{redeemSuccess.rewardTitle}</strong> is active. Present this voucher code at front desk check-in:
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="font-mono text-sm font-bold bg-stone-900 border border-emerald-500/50 text-emerald-300 px-3 py-1 rounded-sm">
                        {redeemSuccess.code}
                      </span>
                      <button
                        onClick={() => handleCopyVoucher(redeemSuccess.code)}
                        className="px-3 py-1 rounded-sm bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCode ? 'Copied' : 'Copy Voucher'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Redeem Error */}
                {redeemError && (
                  <div className="p-3 bg-red-950/80 border border-red-500/50 rounded-sm flex items-center gap-2 text-red-300 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{redeemError}</span>
                  </div>
                )}

                {/* Rewards Catalog */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4 text-amber-400" />
                      <h4 className="font-serif-luxury text-sm font-bold text-stone-100 uppercase tracking-wider">
                        Redeem Points for Exclusive Privileges
                      </h4>
                    </div>
                    <span className="text-[11px] text-stone-400">
                      Instant Voucher Issuance
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {LOYALTY_REWARDS_DATA.map((item) => {
                      const canAfford = currentAvailablePoints >= item.pointsCost;
                      return (
                        <div
                          key={item.id}
                          className={`p-3.5 bg-stone-950 border rounded-sm flex flex-col justify-between gap-3 transition-all ${
                            canAfford 
                              ? 'border-stone-800 hover:border-amber-500/50' 
                              : 'border-stone-850 opacity-70'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="px-2 py-0.5 rounded-sm bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-[10px] font-bold">
                                {item.pointsCost} Points
                              </span>
                              <span className="text-[10px] text-emerald-400 font-semibold font-mono">
                                Value: ₦{item.valueNaira.toLocaleString()}
                              </span>
                            </div>
                            <h5 className="font-serif-luxury text-xs font-bold text-stone-100 mt-1">
                              {item.title}
                            </h5>
                            <p className="text-[11px] text-stone-400 mt-1 leading-snug">
                              {item.description}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-stone-900 flex items-center justify-between">
                            <span className="text-[10px] text-stone-500 capitalize">
                              Category: {item.category}
                            </span>
                            <button
                              onClick={() => handleRedeemReward(item)}
                              disabled={!canAfford}
                              className={`px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                canAfford
                                  ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-sm'
                                  : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                              }`}
                            >
                              {canAfford ? 'Redeem Voucher' : `Need ${item.pointsCost - currentAvailablePoints} more`}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Active Vouchers List */}
                {vouchers.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2 border-b border-stone-800 pb-2">
                      <Tag className="w-4 h-4 text-emerald-400" />
                      <h4 className="font-serif-luxury text-sm font-bold text-stone-100 uppercase tracking-wider">
                        My Claimed Vouchers ({vouchers.length})
                      </h4>
                    </div>

                    <div className="space-y-2">
                      {vouchers.map((v) => (
                        <div
                          key={v.id}
                          className="p-3 bg-stone-950 border border-stone-800 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                        >
                          <div>
                            <span className="font-bold text-xs text-stone-100 block">{v.rewardTitle}</span>
                            <span className="text-[10px] text-stone-500">
                              Claimed on {new Date(v.redeemedAt).toLocaleDateString()} • -{v.pointsDeducted} pts
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-amber-300 bg-stone-900 px-2 py-1 rounded-sm border border-stone-700">
                              {v.code}
                            </span>
                            <button
                              onClick={() => handleCopyVoucher(v.code)}
                              className="px-2 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs rounded-sm transition-colors cursor-pointer"
                              title="Copy code"
                            >
                              Copy
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* NOT ENROLLED CALLOUT & INSTANT SIGNUP */
              <div className="space-y-6">
                <div className="text-center max-w-md mx-auto space-y-2 py-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto mb-2">
                    <Crown className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif-luxury text-xl font-bold text-stone-100">
                    Join Jinji Rewards & Claim 500 Welcome Points
                  </h4>
                  <p className="text-xs text-stone-400">
                    Earn 10 points per ₦1,000 spent on all suites and dining at Jinji Hotels Ltd. Redeem points for room discounts and luxury vouchers.
                  </p>
                </div>

                <form onSubmit={handleEnroll} className="bg-stone-950 p-6 rounded-sm border border-stone-800 space-y-3 max-w-lg mx-auto shadow-xl">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={enrollName}
                      onChange={(e) => setEnrollName(e.target.value)}
                      placeholder="e.g. Grace Joshua"
                      className="w-full bg-stone-900 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={enrollEmail}
                        onChange={(e) => setEnrollEmail(e.target.value)}
                        placeholder="grace@example.com"
                        className="w-full bg-stone-900 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={enrollPhone}
                        onChange={(e) => setEnrollPhone(e.target.value)}
                        placeholder="+234 807 000 0000"
                        className="w-full bg-stone-900 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingEnroll}
                    className="w-full py-2.5 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md mt-2 flex items-center justify-center gap-1.5"
                  >
                    {isSubmittingEnroll ? (
                      <span>Enrolling...</span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Join Now (Receive 500 Bonus Points)</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between">
          <div className="text-[11px] text-stone-500">
            {activeTab === 'loyalty' ? (
              <span>Points rate: 10 pts per ₦1,000 spend • Valid for 24 months</span>
            ) : (
              <span>Jinji Hotels Ltd • Akwanga, Nasarawa State</span>
            )}
          </div>

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
