import React, { useState, useEffect } from 'react';
import { 
  Crown, 
  Sparkles, 
  Gift, 
  CheckCircle2, 
  Award, 
  ArrowRight, 
  Star, 
  Coins, 
  CreditCard, 
  ShieldCheck, 
  Zap, 
  Percent, 
  UserCheck, 
  Copy, 
  Check,
  TrendingUp,
  BookmarkCheck
} from 'lucide-react';
import { LoyaltyMember, PageId, Room } from '../types/hotel';
import { ROOMS_DATA } from '../data/hotelData';

interface JinjiRewardsSectionProps {
  onOpenBooking: (roomId?: string) => void;
  onOpenLoyaltyModal: () => void;
  onNavigate: (page: PageId) => void;
  rooms?: Room[];
}

export const JinjiRewardsSection: React.FC<JinjiRewardsSectionProps> = ({
  onOpenBooking,
  onOpenLoyaltyModal,
  onNavigate,
  rooms = ROOMS_DATA,
}) => {
  const [member, setMember] = useState<LoyaltyMember | null>(null);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  // Sign up form inputs
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredRoom, setPreferredRoom] = useState(rooms[0]?.name || 'Executive Presidential Suite');
  const [signupSuccess, setSignupSuccess] = useState(false);

  // Interactive Calculator inputs
  const [calcRoomId, setCalcRoomId] = useState(rooms[0]?.id || 'room-presidential');
  const [calcNights, setCalcNights] = useState(2);

  // Load member from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('jinji_rewards_member');
      if (stored) {
        setMember(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  // Handle Signup
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) return;

    setIsSigningUp(true);

    // Generate VIP Member ID
    const memberId = 'JR-' + Math.floor(100000 + Math.random() * 900000);
    const newMember: LoyaltyMember = {
      memberId,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      tier: 'Silver',
      bonusPoints: 500, // instant welcome bonus
      enrolledAt: new Date().toISOString(),
      redeemedPoints: 0,
      preferredRoom,
    };

    setTimeout(() => {
      try {
        localStorage.setItem('jinji_rewards_member', JSON.stringify(newMember));
      } catch {
        // ignore
      }
      setMember(newMember);
      setIsSigningUp(false);
      setSignupSuccess(true);
    }, 600);
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  // Calculator calculations
  const selectedRoomForCalc = rooms.find((r) => r.id === calcRoomId) || rooms[0];
  const totalSpend = (selectedRoomForCalc ? selectedRoomForCalc.price : 45000) * calcNights;
  // 10 points per 1,000 spend = spend / 100
  const earnedPoints = Math.floor(totalSpend / 100);
  // Estimated reward redemption value in Naira (1 point ~ 10 Naira)
  const estimatedValueNaira = earnedPoints * 10;

  return (
    <section id="rewards" className="relative py-16 sm:py-24 bg-stone-950 border-t border-amber-900/30 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4 shadow-sm">
            <Crown className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>JINJI REWARDS LOYALTY CLUB</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100 tracking-tight">
            Earn Points With Every Stay, Enjoy VIP Privileges
          </h2>

          <p className="mt-4 text-stone-400 text-sm sm:text-base leading-relaxed">
            Welcome to Akwanga’s premier hospitality rewards program. Earn <span className="text-amber-400 font-semibold">10 points for every ₦1,000</span> spent on room bookings, private banquets, and dining. Redeem points for free suite nights, gourmet meals, and airport transfers.
          </p>
        </div>

        {/* Member Status Banner / Live Digital VIP Card OR Signup Form */}
        <div className="mb-16">
          {member ? (
            /* ENROLLED MEMBER CARD VIEW */
            <div className="bg-gradient-to-br from-stone-900 via-stone-900/90 to-stone-950 border border-amber-500/40 rounded-sm p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Virtual Luxury Gold & Obsidian Membership Card */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="w-full max-w-md aspect-[1.586] rounded-xl bg-gradient-to-tr from-stone-950 via-stone-900 to-amber-950/80 border border-amber-500/60 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden text-stone-100 transform hover:scale-[1.02] transition-transform">
                    {/* Shimmer overlay */}
                    <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />
                    
                    {/* Top Row: Hotel Crest & Chip */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Crown className="w-6 h-6 text-amber-400" />
                        <div>
                          <span className="font-crest text-xs font-bold tracking-widest text-amber-200 block">JINJI HOTELS</span>
                          <span className="text-[9px] uppercase tracking-wider text-amber-400/80 block">REWARDS VIP CLUB</span>
                        </div>
                      </div>
                      
                      {/* Gold Chip Graphic */}
                      <div className="w-9 h-7 rounded bg-gradient-to-tr from-amber-600 via-amber-300 to-amber-600 border border-amber-400/80 shadow flex items-center justify-center">
                        <div className="w-7 h-5 border border-stone-950/40 rounded-xs grid grid-cols-2 gap-0.5 opacity-60">
                          <div className="border-r border-stone-950/40" />
                          <div className="border-l border-stone-950/40" />
                        </div>
                      </div>
                    </div>

                    {/* Middle: Member ID & Tier */}
                    <div className="my-auto py-2">
                      <span className="text-[10px] text-stone-400 uppercase tracking-widest block mb-0.5">Membership Number</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-lg sm:text-xl font-bold tracking-wider text-amber-300">
                          {member.memberId}
                        </span>
                        <button
                          onClick={() => handleCopyId(member.memberId)}
                          className="p-1 rounded text-stone-400 hover:text-amber-300 hover:bg-stone-800 transition-colors cursor-pointer"
                          title="Copy Member ID"
                        >
                          {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Bottom Row: Name, Tier Badge, Points */}
                    <div className="flex items-end justify-between border-t border-amber-500/20 pt-3">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-stone-400 block">Member Name</span>
                        <p className="font-serif-luxury font-bold text-sm tracking-wide text-white truncate max-w-[160px]">
                          {member.fullName}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/50 text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                          <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                          <span>{member.tier} Tier</span>
                        </span>
                        <span className="text-[11px] font-mono text-emerald-400 block font-bold mt-1">
                          {member.bonusPoints} pts balance
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Member Quick Actions & Benefits */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-3">
                    <div>
                      <h3 className="font-serif-luxury text-xl font-bold text-stone-100">
                        Welcome Back, {member.fullName}!
                      </h3>
                      <p className="text-xs text-stone-400 mt-0.5">
                        Member since {new Date(member.enrolledAt).toLocaleDateString()} • Enrolled in Jinji Rewards
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={onOpenLoyaltyModal}
                        className="px-3 py-1.5 rounded-sm bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <Coins className="w-3.5 h-3.5" />
                        <span>View Points & Rewards</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                    <div className="p-3 bg-stone-950/70 border border-stone-800 rounded-sm">
                      <span className="text-[10px] uppercase text-stone-400 block font-semibold">Current Balance</span>
                      <span className="font-serif-luxury text-xl font-bold text-amber-400">{member.bonusPoints}</span>
                      <span className="text-[10px] text-stone-500 block">Rewards Points</span>
                    </div>

                    <div className="p-3 bg-stone-950/70 border border-stone-800 rounded-sm">
                      <span className="text-[10px] uppercase text-stone-400 block font-semibold">Reward Value</span>
                      <span className="font-serif-luxury text-xl font-bold text-emerald-400">₦{(member.bonusPoints * 10).toLocaleString()}</span>
                      <span className="text-[10px] text-stone-500 block">Redeemable Credit</span>
                    </div>

                    <div className="p-3 bg-stone-950/70 border border-stone-800 rounded-sm col-span-2 sm:col-span-1">
                      <span className="text-[10px] uppercase text-stone-400 block font-semibold">VIP Status</span>
                      <span className="font-serif-luxury text-xl font-bold text-amber-300">{member.tier}</span>
                      <span className="text-[10px] text-stone-500 block">Earn 10 pts / ₦1,000</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onOpenBooking()}
                      className="px-4 py-2.5 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg transition-transform hover:scale-[1.02]"
                    >
                      <span>Book a Suite to Earn Points</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={onOpenLoyaltyModal}
                      className="px-4 py-2.5 rounded-sm bg-stone-850 hover:bg-stone-800 text-amber-300 border border-amber-500/40 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <BookmarkCheck className="w-3.5 h-3.5" />
                      <span>Check Bookings & Vouchers</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* SIGNUP CALLOUT & FORM FOR NEW GUESTS */
            <div className="bg-gradient-to-br from-stone-900/90 via-stone-950 to-stone-900 border border-amber-500/40 rounded-sm p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left pitch */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <Gift className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Instant Welcome Gift: 500 Free Points</span>
                  </div>

                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-100">
                    Sign Up Today & Unlock <span className="text-amber-400">500 Bonus Points</span>
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    Joining Jinji Rewards takes less than 30 seconds. Your membership points begin accumulating immediately on your very first reservation, granting you access to discounted rates, complimentary dining credits, and VIP treatment at Jinji Hotels Ltd, Akwanga.
                  </p>

                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2.5 text-xs text-stone-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span><strong>Earn 10 Points</strong> per ₦1,000 spent on all rooms, banquets, and dining</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-stone-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span><strong>Complimentary Welcome Cocktail or Dessert</strong> at The Royal Palm</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-stone-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span><strong>Early Check-in & Late Check-out Priority</strong> upon request</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={onOpenLoyaltyModal}
                      className="text-xs text-amber-400 hover:text-amber-300 underline underline-offset-4 cursor-pointer inline-flex items-center gap-1"
                    >
                      <span>Already enrolled? Check your loyalty points balance</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Right Form */}
                <div className="lg:col-span-6 bg-stone-950 p-6 sm:p-8 rounded-sm border border-stone-800 shadow-xl">
                  {signupSuccess ? (
                    <div className="text-center py-8 space-y-4 animate-in fade-in">
                      <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                        <Check className="w-7 h-7" />
                      </div>
                      <h4 className="font-serif-luxury text-xl font-bold text-stone-100">
                        Welcome to Jinji Rewards!
                      </h4>
                      <p className="text-xs text-stone-300 max-w-sm mx-auto">
                        Your VIP account has been created. <strong>500 Welcome Bonus Points</strong> have been credited to your digital membership card!
                      </p>
                      <button
                        onClick={onOpenLoyaltyModal}
                        className="px-6 py-2.5 rounded-sm bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg inline-flex items-center gap-1.5"
                      >
                        <Coins className="w-3.5 h-3.5" />
                        <span>View Loyalty Dashboard</span>
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <div className="border-b border-stone-800 pb-3">
                        <h4 className="font-serif-luxury text-lg font-bold text-amber-300">
                          Create Free Member Account
                        </h4>
                        <p className="text-[11px] text-stone-400">
                          No credit card required. Receive your Member ID instantly.
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Barrister Aliyu Tanko"
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="aliyu@example.com"
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
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+234 803 000 0000"
                            className="w-full bg-stone-900 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                          Preferred Room Suite (Optional)
                        </label>
                        <select
                          value={preferredRoom}
                          onChange={(e) => setPreferredRoom(e.target.value)}
                          className="w-full bg-stone-900 border border-stone-700 focus:border-amber-500 text-stone-200 text-xs rounded-sm p-2.5 outline-none"
                        >
                          {rooms.map((r) => (
                            <option key={r.id} value={r.name}>
                              {r.name} (₦{r.price.toLocaleString()} / night)
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        type="submit"
                        disabled={isSigningUp}
                        className="w-full py-3 rounded-sm bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:brightness-110 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 mt-2"
                      >
                        {isSigningUp ? (
                          <span>Issuing Your Loyalty Card...</span>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 text-stone-950" />
                            <span>Enroll in Jinji Rewards & Claim 500 Pts</span>
                          </>
                        )}
                      </button>

                      <p className="text-[10px] text-stone-500 text-center mt-1">
                        By joining, you agree to Jinji Hotels Ltd guest loyalty terms & privacy guidelines.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3 VIP Tiers Grid */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-400 block mb-1">
              MEMBERSHIP TIERS
            </span>
            <h3 className="font-serif-luxury text-2xl font-bold text-stone-100">
              Unlock Elevating Privileges As You Stay
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Silver Tier */}
            <div className="bg-stone-900/90 border border-stone-800 hover:border-amber-500/40 rounded-sm p-6 space-y-4 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <div>
                    <h4 className="font-serif-luxury text-lg font-bold text-stone-200">Silver Member</h4>
                    <span className="text-[11px] text-stone-400">Entry Tier (0 - 4,999 pts)</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300">
                    <Star className="w-5 h-5" />
                  </div>
                </div>

                <div className="py-3">
                  <span className="text-xs font-bold text-amber-400 block font-mono">10 Points per ₦1,000 spent</span>
                  <span className="text-[11px] text-stone-500">Credited automatically after checkout</span>
                </div>

                <ul className="space-y-2.5 text-xs text-stone-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>500 Welcome bonus points on registration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>High-Speed Starlink satellite Wi-Fi priority</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>Welcome refreshment drink at Royal Palm Bar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>Early check-in priority subject to room availability</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-stone-800">
                <span className="text-[11px] text-stone-400 block font-semibold">Included on enrollment</span>
              </div>
            </div>

            {/* Gold VIP Tier */}
            <div className="bg-gradient-to-b from-stone-900 to-stone-950 border-2 border-amber-500/70 rounded-sm p-6 space-y-4 shadow-xl flex flex-col justify-between relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 text-[10px] font-black uppercase tracking-wider shadow">
                Most Popular
              </div>

              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <div>
                    <h4 className="font-serif-luxury text-lg font-bold text-amber-300">Gold VIP</h4>
                    <span className="text-[11px] text-stone-400">5,000 – 14,999 pts</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
                    <Award className="w-5 h-5" />
                  </div>
                </div>

                <div className="py-3">
                  <span className="text-xs font-bold text-amber-400 block font-mono">15 Points per ₦1,000 spent (+50% bonus)</span>
                  <span className="text-[11px] text-stone-500">Accelerated points multiplier</span>
                </div>

                <ul className="space-y-2.5 text-xs text-stone-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>All Silver Tier benefits included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>10% Discount</strong> on all restaurant & poolside dining</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Guaranteed 2:00 PM Late Check-out</strong> without fees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>Complimentary room category upgrade when available</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-stone-800">
                <span className="text-[11px] text-amber-400 block font-semibold">Reached after 2-3 visits</span>
              </div>
            </div>

            {/* Platinum Elite Tier */}
            <div className="bg-stone-900/90 border border-stone-800 hover:border-amber-500/40 rounded-sm p-6 space-y-4 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <div>
                    <h4 className="font-serif-luxury text-lg font-bold text-purple-300">Platinum Elite</h4>
                    <span className="text-[11px] text-stone-400">15,000+ pts</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center text-purple-300">
                    <Crown className="w-5 h-5" />
                  </div>
                </div>

                <div className="py-3">
                  <span className="text-xs font-bold text-amber-400 block font-mono">20 Points per ₦1,000 spent (2x points)</span>
                  <span className="text-[11px] text-stone-500">Maximum tier earning rate</span>
                </div>

                <ul className="space-y-2.5 text-xs text-stone-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>All Silver & Gold privileges included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Complimentary Executive Chauffeur Airport Transfer</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>Complimentary full presidential English breakfast daily</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>Dedicated 24/7 personal hospitality manager</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-stone-800">
                <span className="text-[11px] text-purple-300 block font-semibold">Ultimate luxury privilege</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Points Earning Calculator */}
        <div className="bg-stone-900 border border-stone-800 rounded-sm p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 border-b border-stone-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-400" />
                <h3 className="font-serif-luxury text-lg font-bold text-stone-100">
                  Interactive Loyalty Points Calculator
                </h3>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                Calculate how many points and reward Naira savings you will earn on your next reservation.
              </p>
            </div>

            <button
              onClick={() => onOpenBooking(calcRoomId)}
              className="px-4 py-2 rounded-sm bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow transition-colors"
            >
              <span>Book Selected Stay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Room selection */}
            <div className="md:col-span-5 space-y-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1.5">
                  Select Room / Suite:
                </label>
                <select
                  value={calcRoomId}
                  onChange={(e) => setCalcRoomId(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs rounded-sm p-2.5 outline-none focus:border-amber-500"
                >
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} — ₦{r.price.toLocaleString()} / night
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1.5">
                  Number of Nights: ({calcNights} {calcNights === 1 ? 'night' : 'nights'})
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 5, 7].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setCalcNights(n)}
                      className={`flex-1 py-1.5 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                        calcNights === n
                          ? 'bg-amber-500 text-stone-950 shadow-md'
                          : 'bg-stone-950 text-stone-300 border border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      {n} {n === 1 ? 'Night' : 'Nights'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Output Display */}
            <div className="md:col-span-7 bg-stone-950 p-5 rounded-sm border border-stone-800/80">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                <div className="p-2 border-r border-stone-800/80">
                  <span className="text-[10px] uppercase text-stone-400 block font-semibold">Total Stay Cost</span>
                  <span className="font-serif-luxury text-lg sm:text-xl font-bold text-stone-200">
                    ₦{totalSpend.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-stone-500 block">Standard Rate</span>
                </div>

                <div className="p-2 border-r border-stone-800/80">
                  <span className="text-[10px] uppercase text-amber-400 block font-bold">Points Earned</span>
                  <span className="font-serif-luxury text-xl sm:text-2xl font-bold text-amber-400">
                    +{earnedPoints.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-amber-500/80 block">Points to Wallet</span>
                </div>

                <div className="p-2 col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase text-emerald-400 block font-bold">Reward Value</span>
                  <span className="font-serif-luxury text-lg sm:text-xl font-bold text-emerald-400">
                    ₦{estimatedValueNaira.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-emerald-500/80 block">Hotel Credit Value</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
