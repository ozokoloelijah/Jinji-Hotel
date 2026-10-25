export interface Room {
  id: string;
  name: string;
  tagline: string;
  category: 'standard' | 'deluxe' | 'super-deluxe' | 'executive' | 'presidential';
  price: number;
  sizeSqm: number;
  bedType: string;
  maxGuests: number;
  badge?: string;
  featuredImage: string;
  gallery: string[];
  description: string;
  amenities: string[];
  highlights: string[];
}

export interface EventHall {
  id: string;
  name: string;
  subtitle: string;
  banquetCapacity: number;
  theaterCapacity: number;
  sqm: number;
  dailyRate: number;
  image: string;
  features: string[];
  description: string;
}

export interface RestaurantDish {
  id: string;
  name: string;
  category: 'nigerian' | 'continental' | 'starters' | 'drinks' | 'desserts';
  price: number;
  description: string;
  isChefSpecial?: boolean;
  spicyLevel?: number;
  image: string;
}

export interface Facility {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  image: string;
  hours: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image?: string;
  url?: string;
  description?: string;
  caption?: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  date: string;
  roomStayed: string;
  comment: string;
  avatar: string;
}

export interface BookingAddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  perNight?: boolean;
}

export interface BookingReservation {
  id: string;
  bookingReference: string;
  roomId: string;
  roomName: string;
  roomPrice: number;
  roomImage: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  adults: number;
  children: number;
  roomTotal: number;
  addOns: BookingAddOn[];
  addOnsTotal: number;
  taxAmount: number;
  grandTotal: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
  paymentMethod: 'pay_at_hotel' | 'instant_transfer' | 'card';
  status: 'Confirmed' | 'Guaranteed' | 'Checked-In' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export type PageId = 
  | 'home' 
  | 'about' 
  | 'rooms' 
  | 'events' 
  | 'restaurant' 
  | 'facilities' 
  | 'gallery' 
  | 'contact' 
  | 'offers' 
  | 'attractions' 
  | 'policies' 
  | 'careers';

export interface SpecialOffer {
  id: string;
  title: string;
  subtitle: string;
  discountBadge: string;
  promoCode: string;
  regularPrice?: number;
  offerPrice: number;
  validity: string;
  targetRoomId?: string;
  image: string;
  highlights: string[];
  terms: string;
}

export interface LocalAttraction {
  id: string;
  name: string;
  category: 'nature' | 'culture' | 'education' | 'market' | 'government';
  distanceKm: number;
  travelTimeMinutes: number;
  image: string;
  description: string;
  highlights: string[];
  conciergeService: string;
  bestTimeToVisit: string;
}

export interface HotelPolicyItem {
  id: string;
  category: string;
  title: string;
  summary: string;
  details: string[];
  iconName: string;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  jobType: 'Full-time' | 'Part-time' | 'Contract';
  location: string;
  experienceLevel: string;
  salaryRange?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export interface EventProposalInquiry {
  id: string;
  hallId: string;
  hallName: string;
  eventType: string;
  eventDate: string;
  estimatedGuests: number;
  contactName: string;
  contactPhone: string;
  notes?: string;
  status: 'Pending' | 'Contacted' | 'Quoted' | 'Confirmed';
  createdAt: string;
}

export interface TableBookingInquiry {
  id: string;
  date: string;
  timeSlot: string;
  guestsCount: string;
  guestName: string;
  guestPhone: string;
  seatingPreference?: string;
  status: 'Reserved' | 'Seated' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface GuestMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface HotelInfoConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  logoUrl?: string; // Optional custom logo image URL
  logoText: string;
  logoSubtitle: string;
  address: string;
  shortAddress: string;
  phonePrimary: string;
  phoneSecondary: string;
  whatsapp: string;
  email: string;
  inquiriesEmail: string;
  checkInTime: string;
  checkOutTime: string;
  emergencyPhone?: string;
  banquetsEmail?: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  googleMapUrl?: string;
  googleShareUrl?: string;
}

export interface StaffMember {
  id: string;
  staffId: string;
  name: string;
  role: string;
  department: 'Front Desk' | 'Management' | 'Housekeeping' | 'Food & Beverage' | 'Security & Power' | 'Events & Banquets';
  phone: string;
  email: string;
  shiftStatus: 'On Duty' | 'Off Duty' | 'On Leave';
  assignedArea: string;
  joinedDate: string;
  avatar: string;
}

export interface StaffActivityLog {
  id: string;
  staffId?: string;
  staffName: string;
  staffRole: string;
  action: string;
  category: 'Reservations' | 'Rates' | 'Staff' | 'Content' | 'Maintenance' | 'Security' | 'Events' | 'Food & Beverage';
  timestamp: string;
  location?: string;
  stationId?: string;
  severity?: 'Info' | 'Success' | 'Warning' | 'Audit';
  details: string;
}

export interface StaffLoginSession {
  id: string;
  staffId: string;
  staffName: string;
  staffRole: string;
  department: string;
  loginTime: string;
  logoutTime?: string;
  duration?: string;
  terminal: string;
  device: string;
  ipAddress: string;
  location: string;
  status: 'Active' | 'Logged Out' | 'Terminated';
  avatar?: string;
}

export interface StaffTask {
  id: string;
  title: string;
  assignedStaffId: string;
  assignedStaffName: string;
  department: string;
  priority: 'Urgent' | 'High' | 'Normal';
  status: 'Pending' | 'In Progress' | 'Completed';
  location: string;
  dueDate: string;
  notes?: string;
  createdAt: string;
}
