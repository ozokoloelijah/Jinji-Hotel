import React, { useState, useEffect } from 'react';
import { 
  Crown, 
  LogOut, 
  Building2, 
  Calendar, 
  UtensilsCrossed, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Check, 
  X, 
  Edit3, 
  Trash2, 
  Search, 
  Plus, 
  ShieldCheck, 
  Save, 
  Clock, 
  ArrowLeft,
  Image as ImageIcon,
  Settings,
  Phone,
  Mail,
  MapPin,
  Activity,
  UserCheck,
  UserX,
  FileText,
  RotateCcw,
  Sparkles,
  Zap,
  Camera,
  Layers,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  ListTodo,
  Flame,
  Waves,
  Upload,
  ArrowUp,
  ArrowDown,
  Eye,
  Share2,
  Radio,
  Footprints
} from 'lucide-react';
import { DeviceImageUploadButton } from './LocalImagePicker';
import { AddDeviceImageModal } from './AddDeviceImageModal';
import { StaffLoginMonitor } from './StaffLoginMonitor';
import { StaffActivityTrailMap } from './StaffActivityTrailMap';
import { 
  HOTEL_INFO, 
  INITIAL_STAFF_MEMBERS, 
  INITIAL_ACTIVITY_LOGS,
  INITIAL_STAFF_TASKS,
  INITIAL_STAFF_LOGINS,
  EVENT_HALLS_DATA,
  RESTAURANT_MENU,
  FACILITIES_DATA,
  GALLERY_IMAGES
} from '../../data/hotelData';
import { 
  BookingReservation, 
  Room, 
  EventHall,
  RestaurantDish,
  Facility,
  EventProposalInquiry, 
  TableBookingInquiry, 
  GuestMessage,
  HotelInfoConfig,
  StaffMember,
  StaffActivityLog,
  StaffTask,
  StaffLoginSession,
  GalleryItem
} from '../../types/hotel';

interface AdminDashboardProps {
  onLogout: () => void;
  onViewPublicSite: () => void;
  rooms: Room[];
  onUpdateRooms: (updatedRooms: Room[]) => void;
  hotelInfo: HotelInfoConfig;
  onUpdateHotelInfo: (updatedInfo: HotelInfoConfig) => void;
  sliderImages: Array<{ id: number; title: string; tagline: string; url: string }>;
  onUpdateSliderImages: (images: Array<{ id: number; title: string; tagline: string; url: string }>) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onLogout,
  onViewPublicSite,
  rooms,
  onUpdateRooms,
  hotelInfo,
  onUpdateHotelInfo,
  sliderImages,
  onUpdateSliderImages,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'staff' | 'logins' | 'trail_map' | 'media' | 'site_info' | 'bookings' | 'events_dining' | 'activity_log'>('overview');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // 1. HOTEL INFO FORM STATE
  const [formData, setFormData] = useState<HotelInfoConfig>(hotelInfo);

  // Sync formData if hotelInfo prop changes
  useEffect(() => {
    setFormData(hotelInfo);
  }, [hotelInfo]);

  // 2. STAFF MEMBERS STATE
  const [staffList, setStaffList] = useState<StaffMember[]>(() => {
    try {
      const stored = localStorage.getItem('jinji_staff_members');
      return stored ? JSON.parse(stored) : INITIAL_STAFF_MEMBERS;
    } catch {
      return INITIAL_STAFF_MEMBERS;
    }
  });

  // 2b. STAFF LOGIN SESSIONS MONITORING STATE
  const [staffLogins, setStaffLogins] = useState<StaffLoginSession[]>(() => {
    try {
      const stored = localStorage.getItem('jinji_staff_logins');
      return stored ? JSON.parse(stored) : INITIAL_STAFF_LOGINS;
    } catch {
      return INITIAL_STAFF_LOGINS;
    }
  });

  // 3. ACTIVITY LOG STATE
  const [activityLogs, setActivityLogs] = useState<StaffActivityLog[]>(() => {
    try {
      const stored = localStorage.getItem('jinji_activity_logs');
      return stored ? JSON.parse(stored) : INITIAL_ACTIVITY_LOGS;
    } catch {
      return INITIAL_ACTIVITY_LOGS;
    }
  });

  // 4. RESERVATIONS STATE
  const [reservations, setReservations] = useState<BookingReservation[]>(() => {
    try {
      const stored = localStorage.getItem('jinji_hotels_reservations');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [searchBookingQuery, setSearchBookingQuery] = useState('');

  // 5. EVENT PROPOSALS & TABLES
  const [eventProposals, setEventProposals] = useState<EventProposalInquiry[]>([
    {
      id: 'ep-1',
      hallId: 'crystal-ballroom',
      hallName: 'The Grand Crystal Ballroom',
      eventType: 'State Executive Economic Summit',
      eventDate: '2026-11-15',
      estimatedGuests: 850,
      contactName: 'Alhaji Sanusi Umar',
      contactPhone: '+234 803 777 9900',
      notes: 'Requires VIP security protocol, simultaneous translation, and full buffet dinner for 850 guests.',
      status: 'Confirmed',
      createdAt: '2026-10-17',
    },
    {
      id: 'ep-2',
      hallId: 'garden-marquee',
      hallName: 'The Royal Poolside Garden Marquee',
      eventType: 'Traditional & White Wedding Gala',
      eventDate: '2026-12-05',
      estimatedGuests: 450,
      contactName: 'Dr. (Mrs.) Blessing Oche',
      contactPhone: '+234 812 555 4321',
      notes: 'Evening fairy lighting, poolside cocktail bar setup, DJ sound stage.',
      status: 'Quoted',
      createdAt: '2026-10-18',
    },
  ]);

  const [tableBookings, setTableBookings] = useState<TableBookingInquiry[]>([
    {
      id: 'tb-1',
      date: '2026-10-19',
      timeSlot: '7:30 PM (Dinner)',
      guestsCount: '4 Guests',
      guestName: 'Chief Emmanuel Kalu',
      guestPhone: '+234 809 111 2233',
      seatingPreference: 'VIP indoor corner table, chilled champagne on ice',
      status: 'Reserved',
      createdAt: '2026-10-18',
    },
    {
      id: 'tb-2',
      date: '2026-10-19',
      timeSlot: '1:00 PM (Lunch)',
      guestsCount: '2 Guests',
      guestName: 'Barrister Nkechi Eze',
      guestPhone: '+234 814 222 3344',
      seatingPreference: 'Poolside terrace seating',
      status: 'Reserved',
      createdAt: '2026-10-18',
    },
  ]);

  // Modal States
  const [isNewStaffModalOpen, setIsNewStaffModalOpen] = useState(false);
  const [newStaff, setNewStaff] = useState<Partial<StaffMember>>({
    name: '',
    role: '',
    department: 'Front Desk',
    phone: '',
    email: '',
    shiftStatus: 'On Duty',
    assignedArea: '',
  });

  const [isNewLogModalOpen, setIsNewLogModalOpen] = useState(false);
  const [newLogAction, setNewLogAction] = useState('');
  const [newLogCategory, setNewLogCategory] = useState<StaffActivityLog['category']>('Reservations');
  const [newLogStaff, setNewLogStaff] = useState('Duty Manager');
  const [newLogDetails, setNewLogDetails] = useState('');

  // Walk-In Reservation Modal
  const [isWalkInModalOpen, setIsWalkInModalOpen] = useState(false);
  const [walkInName, setWalkInName] = useState('');
  const [walkInPhone, setWalkInPhone] = useState('');
  const [walkInRoomId, setWalkInRoomId] = useState(rooms[0].id);
  const [walkInNights, setWalkInNights] = useState(1);
  const [walkInPaid, setWalkInPaid] = useState(true);

  // Rate Editing
  const [editingRoomId, setEditingRoomId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);

  // Image editing sub-tab
  const [mediaSubTab, setMediaSubTab] = useState<'logo' | 'slider' | 'rooms' | 'events' | 'dining' | 'facilities' | 'gallery'>('logo');
  const [tempSliderImages, setTempSliderImages] = useState(sliderImages);

  // Additional media lists
  const [eventHallsList, setEventHallsList] = useState<EventHall[]>(() => {
    try {
      const stored = localStorage.getItem('jinji_custom_event_halls');
      return stored ? JSON.parse(stored) : EVENT_HALLS_DATA;
    } catch {
      return EVENT_HALLS_DATA;
    }
  });

  const [restaurantMenuList, setRestaurantMenuList] = useState<RestaurantDish[]>(() => {
    try {
      const stored = localStorage.getItem('jinji_custom_dining');
      return stored ? JSON.parse(stored) : RESTAURANT_MENU;
    } catch {
      return RESTAURANT_MENU;
    }
  });

  const [facilitiesList, setFacilitiesList] = useState<Facility[]>(() => {
    try {
      const stored = localStorage.getItem('jinji_custom_facilities');
      return stored ? JSON.parse(stored) : FACILITIES_DATA;
    } catch {
      return FACILITIES_DATA;
    }
  });

  const [galleryList, setGalleryList] = useState<GalleryItem[]>(() => {
    try {
      const stored = localStorage.getItem('jinji_custom_gallery');
      return stored ? JSON.parse(stored) : GALLERY_IMAGES;
    } catch {
      return GALLERY_IMAGES;
    }
  });

  // Staff Tasks State
  const [staffTasks, setStaffTasks] = useState<StaffTask[]>(() => {
    try {
      const stored = localStorage.getItem('jinji_staff_tasks');
      return stored ? JSON.parse(stored) : INITIAL_STAFF_TASKS;
    } catch {
      return INITIAL_STAFF_TASKS;
    }
  });

  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [newTask, setNewTask] = useState<Partial<StaffTask>>({
    title: '',
    assignedStaffName: 'Grace Joshua',
    department: 'Front Desk',
    priority: 'Normal',
    location: '',
    dueDate: 'Today, 5:00 PM',
    notes: '',
  });

  // Staff Department filter
  const [staffDeptFilter, setStaffDeptFilter] = useState<string>('All');

  // Direct Device Image Upload Modal State
  const [isAddDeviceImageModalOpen, setIsAddDeviceImageModalOpen] = useState(false);
  const [deviceModalTarget, setDeviceModalTarget] = useState<'logo' | 'slider_replace' | 'slider_new' | 'room' | 'gallery' | 'event' | 'dining' | 'facility'>('slider_replace');
  const [deviceModalSlideIndex, setDeviceModalSlideIndex] = useState<number>(0);

  const openReplaceSlideModal = (slideIdx: number) => {
    setDeviceModalTarget('slider_replace');
    setDeviceModalSlideIndex(slideIdx);
    setIsAddDeviceImageModalOpen(true);
  };

  useEffect(() => {
    setTempSliderImages(sliderImages);
  }, [sliderImages]);

  // Toast trigger
  const triggerToast = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(''), 3500);
  };

  // Helper to append to activity log
  const logActivity = (
    action: string, 
    category: StaffActivityLog['category'], 
    details: string,
    staffName: string = 'Admin / Duty Manager',
    location: string = 'Executive Operations Office'
  ) => {
    const newEntry: StaffActivityLog = {
      id: `act-${Date.now()}`,
      staffName,
      staffRole: staffName === 'Admin / Duty Manager' ? 'Super Admin' : (staffList.find(s => s.name === staffName)?.role || 'Staff'),
      action,
      category,
      timestamp: 'Just now',
      location,
      details,
    };
    const updated = [newEntry, ...activityLogs];
    setActivityLogs(updated);
    try {
      localStorage.setItem('jinji_activity_logs', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleTerminateStaffSession = (sessionId: string, staffName: string) => {
    const updated = staffLogins.map((s) => (s.id === sessionId ? { ...s, status: 'Terminated' as const, logoutTime: 'Just now' } : s));
    setStaffLogins(updated);
    localStorage.setItem('jinji_staff_logins', JSON.stringify(updated));
    triggerToast(`Session for ${staffName} forcefully terminated.`);
    logActivity('Session Terminated', 'Security', `Super Admin terminated active login session for ${staffName}`, 'Super Admin', 'Security Command');
  };

  const handleRecordStaffLogin = (newSession: StaffLoginSession) => {
    const updated = [newSession, ...staffLogins];
    setStaffLogins(updated);
    localStorage.setItem('jinji_staff_logins', JSON.stringify(updated));
    triggerToast(`Authenticated login session registered for ${newSession.staffName}.`);
    logActivity('Staff Login Authenticated', 'Security', `Staff member ${newSession.staffName} authenticated at ${newSession.terminal}`, newSession.staffName, newSession.location);
  };

  // 1. SAVE HOTEL INFO & CONTACTS
  const handleSaveHotelInfo = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateHotelInfo(formData);
    triggerToast('Site information and contact details saved successfully!');
    logActivity('Updated Hotel Contacts & Information', 'Content', `Updated phone: ${formData.phonePrimary}, email: ${formData.email}, address: ${formData.shortAddress}`);
  };

  // RESET HOTEL INFO TO FACTORY DEFAULTS
  const handleResetHotelInfo = () => {
    if (window.confirm('Reset all hotel information, contacts, and logos to initial defaults?')) {
      onUpdateHotelInfo(HOTEL_INFO);
      setFormData(HOTEL_INFO);
      triggerToast('Hotel settings reset to initial defaults.');
      logActivity('Reset Hotel Info', 'Content', 'Restored default hotel branding and contact information.');
    }
  };

  // 2. SAVE SLIDER IMAGES
  const handleSaveSliderImages = () => {
    onUpdateSliderImages(tempSliderImages);
    triggerToast('Homepage 5-image slider updated successfully!');
    logActivity('Updated Home Slide Images', 'Content', 'Replaced slider imagery on public home page.');
  };

  // 3. UPDATE ROOM IMAGE
  const handleUpdateRoomImage = (roomId: string, newImageUrl: string) => {
    const updated = rooms.map((r) => r.id === roomId ? { ...r, featuredImage: newImageUrl } : r);
    onUpdateRooms(updated);
    triggerToast(`Room image updated successfully!`);
    logActivity('Updated Room Image', 'Content', `Changed featured image for room ID: ${roomId}`);
  };

  // UPDATE EVENT HALL IMAGE & DETAILS
  const handleUpdateEventHallImage = (hallId: string, newImageUrl: string, newRate?: number) => {
    const updated = eventHallsList.map((h) =>
      h.id === hallId ? { ...h, image: newImageUrl, dailyRate: newRate !== undefined ? newRate : h.dailyRate } : h
    );
    setEventHallsList(updated);
    try {
      localStorage.setItem('jinji_custom_event_halls', JSON.stringify(updated));
    } catch {
      // ignore
    }
    triggerToast('Event hall image & details updated!');
    logActivity('Updated Event Hall Media', 'Content', `Changed photo and rate for hall: ${hallId}`);
  };

  // UPDATE RESTAURANT DISH IMAGE & PRICE
  const handleUpdateDishImage = (dishId: string, newImageUrl: string, newPrice?: number) => {
    const updated = restaurantMenuList.map((d) =>
      d.id === dishId ? { ...d, image: newImageUrl, price: newPrice !== undefined ? newPrice : d.price } : d
    );
    setRestaurantMenuList(updated);
    try {
      localStorage.setItem('jinji_custom_dining', JSON.stringify(updated));
    } catch {
      // ignore
    }
    triggerToast('Restaurant dish media updated!');
    logActivity('Updated Dining Media', 'Content', `Updated photo for menu dish: ${dishId}`);
  };

  // UPDATE FACILITY IMAGE
  const handleUpdateFacilityImage = (facId: string, newImageUrl: string, newSubtitle?: string) => {
    const updated = facilitiesList.map((f) =>
      f.id === facId ? { ...f, image: newImageUrl, subtitle: newSubtitle || f.subtitle } : f
    );
    setFacilitiesList(updated);
    try {
      localStorage.setItem('jinji_custom_facilities', JSON.stringify(updated));
    } catch {
      // ignore
    }
    triggerToast('Facility image updated!');
    logActivity('Updated Facility Media', 'Content', `Updated photo for facility: ${facId}`);
  };

  // UPDATE GALLERY IMAGE
  const handleUpdateGalleryImage = (galId: number, newImageUrl: string, newTitle?: string) => {
    const updated = galleryList.map((g: GalleryItem) =>
      g.id === galId ? { ...g, url: newImageUrl, title: newTitle || g.title } : g
    );
    setGalleryList(updated);
    try {
      localStorage.setItem('jinji_custom_gallery', JSON.stringify(updated));
    } catch {
      // ignore
    }
    triggerToast('Photo gallery image updated!');
    logActivity('Updated Photo Gallery Image', 'Content', `Updated image in public gallery (ID: ${galId})`);
  };

  // TOGGLE STAFF TASK WORK ORDER STATUS
  const handleToggleTaskStatus = (taskId: string) => {
    const updated = staffTasks.map((t) => {
      if (t.id === taskId) {
        const nextStatus: StaffTask['status'] =
          t.status === 'Pending' ? 'In Progress' : t.status === 'In Progress' ? 'Completed' : 'Pending';
        logActivity('Task Work Order Status Changed', 'Staff', `Changed task "${t.title}" status to ${nextStatus}`);
        return { ...t, status: nextStatus };
      }
      return t;
    });
    setStaffTasks(updated);
    try {
      localStorage.setItem('jinji_staff_tasks', JSON.stringify(updated));
    } catch {
      // ignore
    }
    triggerToast('Staff task status updated.');
  };

  // CREATE NEW STAFF TASK
  const handleCreateStaffTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title) return;
    const staffObj = staffList.find((s) => s.name === newTask.assignedStaffName) || staffList[0];
    const task: StaffTask = {
      id: `tsk-${Date.now()}`,
      title: newTask.title || 'General Hotel Duty',
      assignedStaffId: staffObj.id,
      assignedStaffName: staffObj.name,
      department: staffObj.department,
      priority: (newTask.priority as any) || 'Normal',
      status: 'Pending',
      location: newTask.location || 'Hotel Grounds',
      dueDate: newTask.dueDate || 'Today',
      notes: newTask.notes,
      createdAt: new Date().toISOString(),
    };
    const updated = [task, ...staffTasks];
    setStaffTasks(updated);
    try {
      localStorage.setItem('jinji_staff_tasks', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setIsNewTaskModalOpen(false);
    setNewTask({
      title: '',
      assignedStaffName: staffList[0]?.name || 'Staff',
      department: 'Front Desk',
      priority: 'Normal',
      location: '',
      dueDate: 'Today, 5:00 PM',
      notes: '',
    });
    triggerToast(`Task assigned to ${task.assignedStaffName}.`);
    logActivity(
      'Staff Task Assigned',
      'Staff',
      `Assigned task "${task.title}" to ${task.assignedStaffName} (${task.priority} Priority).`
    );
  };

  // DELETE STAFF TASK
  const handleDeleteStaffTask = (taskId: string) => {
    const updated = staffTasks.filter((t) => t.id !== taskId);
    setStaffTasks(updated);
    try {
      localStorage.setItem('jinji_staff_tasks', JSON.stringify(updated));
    } catch {
      // ignore
    }
    triggerToast('Task deleted.');
  };

  // 4. SAVE ROOM PRICE
  const handleSavePrice = (roomId: string) => {
    if (tempPrice > 0) {
      const updated = rooms.map((r) => r.id === roomId ? { ...r, price: tempPrice } : r);
      onUpdateRooms(updated);
      setEditingRoomId(null);
      triggerToast('Room rate updated live!');
      const roomObj = rooms.find(r => r.id === roomId);
      logActivity('Modified Room Rate', 'Rates', `Updated rate for ${roomObj?.name || roomId} to ₦${tempPrice.toLocaleString()}`);
    }
  };

  // 5. TOGGLE STAFF SHIFT STATUS
  const handleToggleStaffShift = (staffId: string) => {
    const updated = staffList.map((stf) => {
      if (stf.id === staffId) {
        const nextStatus = stf.shiftStatus === 'On Duty' ? 'Off Duty' : stf.shiftStatus === 'Off Duty' ? 'On Leave' : 'On Duty';
        logActivity('Staff Shift Status Changed', 'Staff', `Changed ${stf.name} status to ${nextStatus}`);
        return { ...stf, shiftStatus: nextStatus as any };
      }
      return stf;
    });
    setStaffList(updated);
    localStorage.setItem('jinji_staff_members', JSON.stringify(updated));
    triggerToast('Staff shift status updated.');
  };

  // ADD NEW STAFF MEMBER
  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.role) return;

    const idNumber = staffList.length + 1;
    const staffMember: StaffMember = {
      id: `stf-${Date.now()}`,
      staffId: `JH-${(newStaff.department || 'STF').substring(0, 3).toUpperCase()}-00${idNumber}`,
      name: newStaff.name || '',
      role: newStaff.role || '',
      department: (newStaff.department as any) || 'Front Desk',
      phone: newStaff.phone || '+234 800 000 0000',
      email: newStaff.email || 'staff@jinjihotels.com.ng',
      shiftStatus: (newStaff.shiftStatus as any) || 'On Duty',
      assignedArea: newStaff.assignedArea || 'Main Hotel Grounds',
      joinedDate: 'Oct 2026',
      avatar: newStaff.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    };

    const updated = [staffMember, ...staffList];
    setStaffList(updated);
    localStorage.setItem('jinji_staff_members', JSON.stringify(updated));
    setIsNewStaffModalOpen(false);
    setNewStaff({ name: '', role: '', department: 'Front Desk', phone: '', email: '', shiftStatus: 'On Duty', assignedArea: '' });
    triggerToast(`Added ${staffMember.name} to staff management roster.`);
    logActivity('New Staff Enrolled', 'Staff', `Enrolled ${staffMember.name} as ${staffMember.role} (${staffMember.department})`);
  };

  // DELETE STAFF
  const handleDeleteStaff = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove ${name} from staff roster? All active sessions will be terminated.`)) {
      const updated = staffList.filter((s) => s.id !== id);
      setStaffList(updated);
      localStorage.setItem('jinji_staff_members', JSON.stringify(updated));

      // Also terminate any active logins for this staff member
      const updatedLogins = staffLogins.map(s => s.staffName === name ? { ...s, status: 'Terminated' as const, logoutTime: 'Removed' } : s);
      setStaffLogins(updatedLogins);
      localStorage.setItem('jinji_staff_logins', JSON.stringify(updatedLogins));

      triggerToast(`Removed ${name} from staff roster.`);
      logActivity('Staff Removed', 'Staff', `Super Admin removed staff member ${name} from hotel roster.`, 'Super Admin', 'Admin Suite');
    }
  };

  // ADD ACTIVITY LOG NOTE
  const handleAddActivityLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogAction || !newLogDetails) return;

    const newLog: StaffActivityLog = {
      id: `act-${Date.now()}`,
      staffName: newLogStaff,
      staffRole: 'Staff Member',
      action: newLogAction,
      category: newLogCategory,
      timestamp: 'Just now',
      details: newLogDetails,
    };

    const updated = [newLog, ...activityLogs];
    setActivityLogs(updated);
    localStorage.setItem('jinji_activity_logs', JSON.stringify(updated));
    setIsNewLogModalOpen(false);
    setNewLogAction('');
    setNewLogDetails('');
    triggerToast('Activity log recorded successfully.');
  };

  // RESERVATION ACTIONS
  const updateReservationStatus = (id: string, newStatus: BookingReservation['status']) => {
    const updated = reservations.map((r) => (r.id === id ? { ...r, status: newStatus } : r));
    setReservations(updated);
    localStorage.setItem('jinji_hotels_reservations', JSON.stringify(updated));
    const target = reservations.find(r => r.id === id);
    triggerToast(`Reservation ${target?.bookingReference || id} updated to ${newStatus}.`);
    logActivity('Reservation Status Updated', 'Reservations', `Changed ${target?.guestName} (${target?.bookingReference}) to ${newStatus}`);
  };

  const deleteReservation = (id: string) => {
    if (window.confirm('Delete this reservation?')) {
      const target = reservations.find(r => r.id === id);
      const updated = reservations.filter((r) => r.id !== id);
      setReservations(updated);
      localStorage.setItem('jinji_hotels_reservations', JSON.stringify(updated));
      triggerToast('Reservation deleted.');
      logActivity('Reservation Removed', 'Reservations', `Deleted booking ${target?.bookingReference}`);
    }
  };

  // CREATE WALK-IN GUEST
  const handleCreateWalkIn = (e: React.FormEvent) => {
    e.preventDefault();
    const selRoom = rooms.find((r) => r.id === walkInRoomId) || rooms[0];
    const total = selRoom.price * walkInNights;
    const ref = `JJH-W${Math.floor(1000 + Math.random() * 9000)}`;

    const newRes: BookingReservation = {
      id: `walkin-${Date.now()}`,
      bookingReference: ref,
      roomId: selRoom.id,
      roomName: selRoom.name,
      roomPrice: selRoom.price,
      roomImage: selRoom.featuredImage,
      checkInDate: new Date().toISOString().split('T')[0],
      checkOutDate: new Date(Date.now() + walkInNights * 86400000).toISOString().split('T')[0],
      nights: walkInNights,
      adults: 2,
      children: 0,
      roomTotal: total,
      addOns: [],
      addOnsTotal: 0,
      taxAmount: 0,
      grandTotal: total,
      guestName: walkInName,
      guestEmail: 'walkin@jinjihotels.com.ng',
      guestPhone: walkInPhone,
      paymentMethod: walkInPaid ? 'instant_transfer' : 'pay_at_hotel',
      status: walkInPaid ? 'Checked-In' : 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    const updated = [newRes, ...reservations];
    setReservations(updated);
    localStorage.setItem('jinji_hotels_reservations', JSON.stringify(updated));

    setWalkInName('');
    setWalkInPhone('');
    setIsWalkInModalOpen(false);
    triggerToast(`Walk-in guest ${walkInName} registered with Ref ${ref}!`);
    logActivity('Walk-In Guest Registered', 'Reservations', `Registered walk-in guest ${walkInName} into ${selRoom.name} for ${walkInNights} night(s).`);
  };

  // KPIs
  const totalRevenue = reservations.reduce((acc, r) => acc + r.grandTotal, 0);
  const activeBookingsCount = reservations.filter((r) => r.status !== 'Cancelled').length;
  const onDutyStaffCount = staffList.filter((s) => s.shiftStatus === 'On Duty').length;

  const filteredReservations = reservations.filter(
    (r) =>
      r.bookingReference.toLowerCase().includes(searchBookingQuery.toLowerCase()) ||
      r.guestName.toLowerCase().includes(searchBookingQuery.toLowerCase()) ||
      r.roomName.toLowerCase().includes(searchBookingQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col pt-16">
      {/* Toast Notification */}
      {saveSuccessMsg && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-950 border border-emerald-500/50 text-emerald-300 px-4 py-3 rounded-sm shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{saveSuccessMsg}</span>
        </div>
      )}

      {/* Top Admin Bar */}
      <header className="bg-stone-900 border-b border-amber-900/40 px-4 sm:px-8 py-3.5 sticky top-0 z-30 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {hotelInfo.logoUrl ? (
              <img src={hotelInfo.logoUrl} alt={hotelInfo.name} className="w-10 h-10 object-contain rounded-sm border border-amber-500/40" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Crown className="w-5 h-5" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="font-crest text-base sm:text-lg font-bold text-amber-300">
                  {hotelInfo.name}
                </span>
                <span className="px-2 py-0.5 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 text-[10px] font-bold uppercase tracking-wider">
                  SUPER ADMIN PORTAL
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Full Management Operations, Media Control, Staff Monitoring & CMS
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsAddDeviceImageModalOpen(true)}
              className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              title="Upload pictures from your phone, laptop, or computer directly"
            >
              <Upload className="w-3.5 h-3.5 text-stone-950" />
              <span>Add Images from Device</span>
            </button>

            <button
              onClick={onViewPublicSite}
              className="px-3.5 py-2 bg-stone-800 hover:bg-stone-750 text-stone-200 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer border border-stone-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>View Live Website</span>
            </button>

            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-950/80 hover:bg-red-900 border border-red-500/40 text-red-200 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 sm:p-5 bg-stone-900 border border-stone-800 rounded-sm">
            <div className="flex items-center justify-between text-stone-400 text-xs uppercase mb-1">
              <span>Active Bookings</span>
              <Building2 className="w-4 h-4 text-amber-400" />
            </div>
            <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-100">
              {activeBookingsCount}
            </div>
            <span className="text-[11px] text-emerald-400 block mt-0.5">52 Rooms Total Roster</span>
          </div>

          <div className="p-4 sm:p-5 bg-stone-900 border border-stone-800 rounded-sm">
            <div className="flex items-center justify-between text-stone-400 text-xs uppercase mb-1">
              <span>Gross Revenue (₦)</span>
              <TrendingUp className="w-4 h-4 text-amber-400" />
            </div>
            <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-amber-400">
              ₦{totalRevenue.toLocaleString()}
            </div>
            <span className="text-[11px] text-stone-400 block mt-0.5">Calculated Volume</span>
          </div>

          <div className="p-4 sm:p-5 bg-stone-900 border border-stone-800 rounded-sm">
            <div className="flex items-center justify-between text-stone-400 text-xs uppercase mb-1">
              <span>Staff on Active Duty</span>
              <UserCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-emerald-400">
              {onDutyStaffCount} / {staffList.length}
            </div>
            <span className="text-[11px] text-stone-400 block mt-0.5">Live Shift Attendance</span>
          </div>

          <div className="p-4 sm:p-5 bg-stone-900 border border-stone-800 rounded-sm">
            <div className="flex items-center justify-between text-stone-400 text-xs uppercase mb-1">
              <span>Power Status</span>
              <Zap className="w-4 h-4 text-amber-400" />
            </div>
            <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-100 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <span>100% Online</span>
            </div>
            <span className="text-[11px] text-amber-400 block mt-0.5">Dual Sync Cummins + Solar</span>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-stone-800 pb-3">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'bg-stone-900 text-stone-300 hover:text-white border border-stone-800'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Operations Monitor</span>
          </button>

          <button
            onClick={() => setActiveTab('staff')}
            className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'staff'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'bg-stone-900 text-stone-300 hover:text-white border border-stone-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Staff Directory ({staffList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('logins')}
            className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'logins'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'bg-stone-900 text-stone-300 hover:text-white border border-stone-800'
            }`}
          >
            <Radio className="w-4 h-4 text-emerald-400" />
            <span>Staff Logins ({staffLogins.filter(s => s.status === 'Active').length} Active)</span>
          </button>

          <button
            onClick={() => setActiveTab('trail_map')}
            className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'trail_map'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'bg-stone-900 text-stone-300 hover:text-white border border-stone-800'
            }`}
          >
            <Footprints className="w-4 h-4 text-amber-400" />
            <span>Activity Trail Map</span>
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'media'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'bg-stone-900 text-stone-300 hover:text-white border border-stone-800'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Images & Logo (Upload from Device)</span>
          </button>

          <button
            onClick={() => setActiveTab('site_info')}
            className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'site_info'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'bg-stone-900 text-stone-300 hover:text-white border border-stone-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Edit Info & Contacts</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'bookings'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'bg-stone-900 text-stone-300 hover:text-white border border-stone-800'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Bookings & Room Rates</span>
          </button>

          <button
            onClick={() => setActiveTab('events_dining')}
            className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'events_dining'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'bg-stone-900 text-stone-300 hover:text-white border border-stone-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Events & Dining</span>
          </button>

          <button
            onClick={() => setActiveTab('activity_log')}
            className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'activity_log'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'bg-stone-900 text-stone-300 hover:text-white border border-stone-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Staff Activity Log ({activityLogs.length})</span>
          </button>
        </div>

        {/* 1. OPERATIONS MONITOR / OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Live Operations Status (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-stone-900 border border-stone-800 rounded-sm p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                    <h3 className="font-serif-luxury text-lg font-bold text-stone-100 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-amber-400" />
                      Live Hotel Operational Status
                    </h3>
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      All Systems Optimal
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-stone-950 rounded-sm border border-stone-800/80">
                      <span className="text-stone-500 block text-[10px] uppercase font-semibold">Duty Manager</span>
                      <strong className="text-stone-200 text-sm block mt-0.5">Alhaji Aliyu Tanko</strong>
                      <span className="text-emerald-400 text-[11px]">On Duty (Shift: 07:00 – 19:00)</span>
                    </div>

                    <div className="p-3 bg-stone-950 rounded-sm border border-stone-800/80">
                      <span className="text-stone-500 block text-[10px] uppercase font-semibold">Front Desk Head</span>
                      <strong className="text-stone-200 text-sm block mt-0.5">Grace Joshua</strong>
                      <span className="text-emerald-400 text-[11px]">Reception & Concierge Active</span>
                    </div>

                    <div className="p-3 bg-stone-950 rounded-sm border border-stone-800/80">
                      <span className="text-stone-500 block text-[10px] uppercase font-semibold">Power Plant Backup</span>
                      <strong className="text-amber-400 text-sm block mt-0.5">Cummins Gen #1 (Primary)</strong>
                      <span className="text-stone-400 text-[11px]">Fuel: 94% • Solar Storage: 98%</span>
                    </div>

                    <div className="p-3 bg-stone-950 rounded-sm border border-stone-800/80">
                      <span className="text-stone-500 block text-[10px] uppercase font-semibold">Physical Security</span>
                      <strong className="text-stone-200 text-sm block mt-0.5">128 HD CCTV Cameras Active</strong>
                      <span className="text-emerald-400 text-[11px]">Perimeter Gate Patrol Engaged</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-2">
                    <button
                      onClick={() => setActiveTab('bookings')}
                      className="px-4 py-2 bg-amber-500 text-stone-950 text-xs font-bold uppercase rounded-sm hover:bg-amber-400 transition-colors"
                    >
                      Manage Reservations
                    </button>
                    <button
                      onClick={() => setIsWalkInModalOpen(true)}
                      className="px-4 py-2 bg-stone-800 text-stone-200 text-xs font-semibold uppercase rounded-sm hover:bg-stone-700 transition-colors"
                    >
                      + Register Walk-In
                    </button>
                    <button
                      onClick={() => setIsAddDeviceImageModalOpen(true)}
                      className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-bold uppercase rounded-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Add Images from Device</span>
                    </button>
                  </div>
                </div>

                {/* Staff Roster Snapshot */}
                <div className="bg-stone-900 border border-stone-800 rounded-sm p-6 shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-4">
                    <h4 className="font-serif-luxury text-base font-bold text-stone-100 flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-400" />
                      Active Staff On Duty
                    </h4>
                    <button
                      onClick={() => setActiveTab('staff')}
                      className="text-xs text-amber-400 hover:underline cursor-pointer"
                    >
                      View All ({staffList.length}) →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {staffList.filter(s => s.shiftStatus === 'On Duty').map((stf) => (
                      <div key={stf.id} className="p-3 bg-stone-950 border border-stone-800/80 rounded-sm flex items-center gap-3">
                        <img src={stf.avatar} alt={stf.name} className="w-10 h-10 rounded-full object-cover border border-amber-500/30" />
                        <div className="min-w-0 flex-1">
                          <h5 className="text-xs font-bold text-stone-100 truncate">{stf.name}</h5>
                          <p className="text-[11px] text-amber-400/90">{stf.role}</p>
                          <span className="text-[10px] text-stone-500">{stf.assignedArea}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Live Activity Audit Feed (5 cols) */}
              <div className="lg:col-span-5 bg-stone-900 border border-stone-800 rounded-sm p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-4">
                    <h4 className="font-serif-luxury text-base font-bold text-stone-100 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-400" />
                      Recent Staff & Hotel Logs
                    </h4>
                    <button
                      onClick={() => setIsNewLogModalOpen(true)}
                      className="px-2.5 py-1 bg-amber-500/20 text-amber-300 text-[11px] font-semibold rounded-sm hover:bg-amber-500/30 transition-colors"
                    >
                      + Add Note
                    </button>
                  </div>

                  <div className="space-y-3">
                    {activityLogs.slice(0, 5).map((log) => (
                      <div key={log.id} className="p-3 bg-stone-950 rounded-sm border border-stone-800/80 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <strong className="text-amber-300">{log.action}</strong>
                          <span className="text-[10px] text-stone-500">{log.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-stone-300">{log.details}</p>
                        <span className="text-[10px] text-stone-500 block">Logged by: {log.staffName} ({log.staffRole})</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-800 mt-4">
                  <button
                    onClick={() => setActiveTab('activity_log')}
                    className="w-full py-2 bg-stone-950 hover:bg-stone-850 text-stone-300 text-xs font-semibold rounded-sm text-center border border-stone-800 transition-colors"
                  >
                    View Complete Audit Log History ({activityLogs.length} Records) →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. STAFF MANAGEMENT & MONITORING TAB */}
        {activeTab === 'staff' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-stone-100">
                  Staff Directory & Shift Management
                </h3>
                <p className="text-xs text-stone-400">
                  Monitor all active staff, toggle on-duty shifts, assign operational zones, and add new personnel.
                </p>
              </div>

              <button
                onClick={() => setIsNewStaffModalOpen(true)}
                className="px-4 py-2.5 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Enroll New Staff Member</span>
              </button>
            </div>

            {/* Department Filter Bar */}
            <div className="flex flex-wrap items-center gap-1.5 border-b border-stone-800 pb-3">
              <span className="text-[11px] font-semibold uppercase text-stone-400 mr-2 flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-amber-500" />
                Filter Department:
              </span>
              {['All', 'Management', 'Front Desk', 'Housekeeping', 'Food & Beverage', 'Security & Power', 'Events & Banquets'].map((dept) => (
                <button
                  key={dept}
                  onClick={() => setStaffDeptFilter(dept)}
                  className={`px-3 py-1 rounded-sm text-xs transition-all cursor-pointer ${
                    staffDeptFilter === dept 
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-md' 
                      : 'bg-stone-900 text-stone-300 hover:text-white border border-stone-800'
                  }`}
                >
                  {dept} {dept === 'All' ? `(${staffList.length})` : `(${staffList.filter(s => s.department === dept).length})`}
                </button>
              ))}
            </div>

            {/* Staff Roster Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {staffList
                .filter((stf) => staffDeptFilter === 'All' || stf.department === staffDeptFilter)
                .map((stf) => (
                <div key={stf.id} className="bg-stone-900 border border-stone-800 hover:border-amber-500/40 rounded-sm p-5 space-y-4 shadow-xl transition-all">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={stf.avatar} alt={stf.name} className="w-14 h-14 rounded-full object-cover border-2 border-amber-500/40 shrink-0" />
                      <div>
                        <span className="text-[10px] font-mono font-bold text-amber-400">{stf.staffId}</span>
                        <h4 className="font-serif-luxury text-base font-bold text-stone-100">{stf.name}</h4>
                        <p className="text-xs text-stone-400">{stf.role}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteStaff(stf.id, stf.name)}
                      className="p-1.5 text-stone-500 hover:text-red-400 hover:bg-stone-800 rounded-sm transition-colors cursor-pointer"
                      title="Remove Staff Member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-3 bg-stone-950 rounded-sm border border-stone-800/80 space-y-1.5 text-xs text-stone-300">
                    <div className="flex justify-between">
                      <span className="text-stone-500">Department:</span>
                      <strong className="text-stone-200">{stf.department}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Assigned Area:</span>
                      <span className="text-amber-300">{stf.assignedArea}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Contact:</span>
                      <a href={`tel:${stf.phone}`} className="text-stone-300 hover:underline">{stf.phone}</a>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-stone-400">Shift Status:</span>
                    <button
                      onClick={() => handleToggleStaffShift(stf.id)}
                      className={`px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all ${
                        stf.shiftStatus === 'On Duty'
                          ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-300'
                          : stf.shiftStatus === 'Off Duty'
                          ? 'bg-stone-800 border border-stone-700 text-stone-400'
                          : 'bg-amber-950 border border-amber-500/40 text-amber-300'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${stf.shiftStatus === 'On Duty' ? 'bg-emerald-400 animate-ping' : 'bg-stone-500'}`} />
                      <span>{stf.shiftStatus}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* OPERATIONAL WORK ORDERS & ACTIVE STAFF TASKS */}
            <div className="pt-8 border-t border-stone-800 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <ListTodo className="w-5 h-5 text-amber-400" />
                    <h4 className="font-serif-luxury text-lg font-bold text-stone-100">
                      Active Staff Duties & Operational Work Orders
                    </h4>
                  </div>
                  <p className="text-xs text-stone-400">
                    Assign and monitor guest requests, VIP turn-downs, technical inspections, and banquet setups in real time.
                  </p>
                </div>

                <button
                  onClick={() => setIsNewTaskModalOpen(true)}
                  className="px-4 py-2 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Assign New Task</span>
                </button>
              </div>

              {/* Tasks List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {staffTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-4 bg-stone-900 border rounded-sm space-y-3 transition-all ${
                      task.status === 'Completed'
                        ? 'border-emerald-500/30 opacity-75'
                        : task.priority === 'Urgent'
                        ? 'border-red-500/50 shadow-lg shadow-red-950/20'
                        : 'border-stone-800 hover:border-amber-500/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm ${
                              task.priority === 'Urgent'
                                ? 'bg-red-950 border border-red-500/50 text-red-300'
                                : task.priority === 'High'
                                ? 'bg-amber-950 border border-amber-500/40 text-amber-300'
                                : 'bg-stone-800 text-stone-300'
                            }`}
                          >
                            {task.priority} Priority
                          </span>
                          <span className="text-[10px] text-stone-500">{task.department}</span>
                        </div>
                        <h5 className="font-bold text-stone-100 text-sm leading-snug">{task.title}</h5>
                      </div>

                      <button
                        onClick={() => handleDeleteStaffTask(task.id)}
                        className="p-1 text-stone-500 hover:text-red-400 rounded transition-colors"
                        title="Delete task"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {task.notes && (
                      <p className="text-xs text-stone-300 bg-stone-950 p-2.5 rounded-sm border border-stone-850">
                        {task.notes}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center justify-between pt-1 gap-2 text-xs">
                      <div className="text-[11px] text-stone-400">
                        <span>Assigned to: <strong className="text-stone-200">{task.assignedStaffName}</strong></span>
                        <span className="block text-stone-500">{task.location} • Due: {task.dueDate}</span>
                      </div>

                      <button
                        onClick={() => handleToggleTaskStatus(task.id)}
                        className={`px-3 py-1 rounded-sm text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all ${
                          task.status === 'Completed'
                            ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-300'
                            : task.status === 'In Progress'
                            ? 'bg-amber-950 border border-amber-500/40 text-amber-300 animate-pulse'
                            : 'bg-stone-800 border border-stone-700 text-stone-300'
                        }`}
                      >
                        {task.status === 'Completed' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                        <span>Status: {task.status}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2b. STAFF LOGIN MONITORING TAB */}
        {activeTab === 'logins' && (
          <StaffLoginMonitor
            logins={staffLogins}
            onTerminateSession={handleTerminateStaffSession}
            onRecordLogin={handleRecordStaffLogin}
            staffList={staffList}
          />
        )}

        {/* 2c. STAFF ACTIVITY TRAIL MAP TAB */}
        {activeTab === 'trail_map' && (
          <StaffActivityTrailMap
            activityLogs={activityLogs}
            staffList={staffList}
            onLogActivity={logActivity}
          />
        )}

        {/* 3. CHANGE IMAGES & LOGO TAB */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-stone-100">
                  Media Library, Branding & Device Image Asset Manager
                </h3>
                <p className="text-xs text-stone-400">
                  Upload pictures saved on your local device (phone, laptop, or computer) directly without needing image links.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddDeviceImageModalOpen(true)}
                className="px-4 py-2.5 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md shrink-0"
              >
                <Upload className="w-4 h-4" />
                <span>+ Upload Image from Device</span>
              </button>
            </div>

            {/* Direct Local Device Photo Upload Hub Banner */}
            <div className="bg-gradient-to-r from-stone-900 via-stone-900 to-amber-950/40 border border-amber-500/40 rounded-sm p-5 sm:p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-sm bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                    Direct Device Photo Hub
                  </span>
                  <span className="text-xs text-stone-400">No Image URLs Required</span>
                </div>
                <h4 className="font-serif-luxury text-lg font-bold text-stone-100">
                  Upload Photos from Your Phone, Tablet, or Computer
                </h4>
                <p className="text-xs text-stone-300 max-w-xl">
                  Easily add picture files saved on your local device directly into the Homepage Slider, Room Suites, Official Logo, Public Gallery, Dining Menu, or Event Halls.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddDeviceImageModalOpen(true)}
                  className="px-5 py-3 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shrink-0"
                >
                  <Upload className="w-4 h-4" />
                  <span>Choose Picture from Device</span>
                </button>
              </div>
            </div>

            {/* Sub-tabs */}
            <div className="flex flex-wrap gap-2 border-b border-stone-800 pb-2 text-xs">
              <button
                onClick={() => setMediaSubTab('logo')}
                className={`px-3 py-1.5 rounded-sm font-semibold transition-all cursor-pointer ${
                  mediaSubTab === 'logo' ? 'bg-amber-500 text-stone-950 shadow-md font-bold' : 'bg-stone-900 text-stone-300 hover:text-white'
                }`}
              >
                1. Logo & Crest
              </button>
              <button
                onClick={() => setMediaSubTab('slider')}
                className={`px-3 py-1.5 rounded-sm font-semibold transition-all cursor-pointer ${
                  mediaSubTab === 'slider' ? 'bg-amber-500 text-stone-950 shadow-md font-bold' : 'bg-stone-900 text-stone-300 hover:text-white'
                }`}
              >
                2. 5 Home Slides
              </button>
              <button
                onClick={() => setMediaSubTab('rooms')}
                className={`px-3 py-1.5 rounded-sm font-semibold transition-all cursor-pointer ${
                  mediaSubTab === 'rooms' ? 'bg-amber-500 text-stone-950 shadow-md font-bold' : 'bg-stone-900 text-stone-300 hover:text-white'
                }`}
              >
                3. Rooms & Suites
              </button>
              <button
                onClick={() => setMediaSubTab('events')}
                className={`px-3 py-1.5 rounded-sm font-semibold transition-all cursor-pointer ${
                  mediaSubTab === 'events' ? 'bg-amber-500 text-stone-950 shadow-md font-bold' : 'bg-stone-900 text-stone-300 hover:text-white'
                }`}
              >
                4. Event Halls
              </button>
              <button
                onClick={() => setMediaSubTab('dining')}
                className={`px-3 py-1.5 rounded-sm font-semibold transition-all cursor-pointer ${
                  mediaSubTab === 'dining' ? 'bg-amber-500 text-stone-950 shadow-md font-bold' : 'bg-stone-900 text-stone-300 hover:text-white'
                }`}
              >
                5. Restaurant & Dining
              </button>
              <button
                onClick={() => setMediaSubTab('facilities')}
                className={`px-3 py-1.5 rounded-sm font-semibold transition-all cursor-pointer ${
                  mediaSubTab === 'facilities' ? 'bg-amber-500 text-stone-950 shadow-md font-bold' : 'bg-stone-900 text-stone-300 hover:text-white'
                }`}
              >
                6. Facilities & Power
              </button>
              <button
                onClick={() => setMediaSubTab('gallery')}
                className={`px-3 py-1.5 rounded-sm font-semibold transition-all cursor-pointer ${
                  mediaSubTab === 'gallery' ? 'bg-amber-500 text-stone-950 shadow-md font-bold' : 'bg-stone-900 text-stone-300 hover:text-white'
                }`}
              >
                7. Photo Gallery
              </button>
            </div>

            {/* SUB-TAB 1: LOGO */}
            {mediaSubTab === 'logo' && (
              <div className="bg-stone-900 border border-stone-800 rounded-sm p-6 max-w-2xl space-y-6 shadow-xl">
                <h4 className="font-serif-luxury text-base font-bold text-stone-100 pb-3 border-b border-stone-800">
                  Branding Logo Configuration
                </h4>

                <div className="flex items-center gap-6 p-4 bg-stone-950 rounded-sm border border-stone-800">
                  <div className="text-center shrink-0">
                    <span className="text-[10px] uppercase text-stone-500 block mb-2">Live Logo Preview</span>
                    {formData.logoUrl ? (
                      <img src={formData.logoUrl} alt="Logo Preview" className="w-16 h-16 object-contain rounded-sm border border-amber-500/40 mx-auto" />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 p-0.5 shadow-xl mx-auto flex items-center justify-center">
                        <div className="w-full h-full rounded-full bg-stone-950 flex items-center justify-center">
                          <Crown className="w-8 h-8 text-amber-400" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <h5 className="font-crest text-lg font-bold text-amber-100">{formData.logoText || 'JINJI HOTELS'}</h5>
                    <p className="text-xs text-amber-400/80">{formData.logoSubtitle || 'Luxury Hotel & Suites • Akwanga'}</p>
                    <span className="text-[11px] text-stone-500 mt-1 block">Renders on the navigation bar, footer, and confirmation vouchers.</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Local Device Logo Uploader */}
                  <div className="p-4 bg-stone-950 rounded-sm border border-stone-800 space-y-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-xs uppercase font-bold text-amber-400 block">
                          Upload Logo from Your Device
                        </span>
                        <p className="text-[11px] text-stone-400">
                          Select a PNG, JPG, or SVG image file saved on your computer or phone.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <DeviceImageUploadButton
                          onImageSelected={(base64, filename) => {
                            setFormData({ ...formData, logoUrl: base64 });
                            triggerToast(`Logo "${filename}" loaded from device! Click "Save Logo Changes" below to apply.`);
                          }}
                          label="Choose Logo from Device"
                          icon={<Upload className="w-3.5 h-3.5 text-stone-950" />}
                        />
                        {formData.logoUrl && (
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, logoUrl: '' });
                              triggerToast('Restored 3D Gold Crest logo.');
                            }}
                            className="px-2.5 py-2 bg-stone-800 hover:bg-stone-750 text-stone-300 text-xs rounded-sm border border-stone-700 cursor-pointer"
                          >
                            Reset to 3D Crest
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase text-stone-300 mb-1">
                        Logo Title Text
                      </label>
                      <input
                        type="text"
                        value={formData.logoText}
                        onChange={(e) => setFormData({ ...formData, logoText: e.target.value })}
                        className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs rounded-sm p-2.5 outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-stone-300 mb-1">
                        Logo Subtitle Tagline
                      </label>
                      <input
                        type="text"
                        value={formData.logoSubtitle}
                        onChange={(e) => setFormData({ ...formData, logoSubtitle: e.target.value })}
                        className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs rounded-sm p-2.5 outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onUpdateHotelInfo(formData);
                      triggerToast('Logo settings updated live on the website!');
                      logActivity('Logo Updated', 'Content', `Updated logo branding text: ${formData.logoText}`);
                    }}
                    className="px-6 py-2.5 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md"
                  >
                    Save Logo Changes
                  </button>
                </div>
              </div>
            )}

            {/* SUB-TAB 2: SLIDER IMAGES (SLIDE 1, 2, UP TO 5) */}
            {mediaSubTab === 'slider' && (
              <div className="space-y-6">
                {/* Header & Global Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-stone-900/60 p-4 rounded-sm border border-stone-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-400" />
                      <h4 className="font-serif-luxury text-base font-bold text-stone-100">
                        Home Page Hero Slides (Slide 1 to Slide {tempSliderImages.length})
                      </h4>
                    </div>
                    <p className="text-xs text-stone-400 mt-1 max-w-2xl">
                      3-second auto-transition carousel on the public homepage. Pick pictures directly from your computer or phone — every picture automatically fits into the 16:9 widescreen frame without stretching or distortion.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setDeviceModalTarget('slider_new');
                        setIsAddDeviceImageModalOpen(true);
                      }}
                      className="px-4 py-2 rounded-sm bg-stone-850 hover:bg-stone-800 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Plus className="w-4 h-4 text-amber-400" />
                      <span>+ Add New Slide from Device</span>
                    </button>
                    <button
                      onClick={handleSaveSliderImages}
                      className="px-5 py-2 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md"
                    >
                      Save All Slider Changes
                    </button>
                  </div>
                </div>

                {/* SLIDE 1 TO 5 IDENTIFICATION & QUICK SWITCHER BAR */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                      Slide Identification & Fast Replacement (Slide 1 – Slide {tempSliderImages.length})
                    </span>
                    <span className="text-[11px] text-stone-400">
                      Click any slide below to replace with picture from your device
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {tempSliderImages.map((img, idx) => (
                      <div
                        key={img.id || idx}
                        className="bg-stone-900 border border-stone-800 hover:border-amber-500/60 rounded-sm p-2.5 transition-all flex flex-col justify-between group shadow-sm"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-2">
                            <span className="px-2 py-0.5 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 text-[10px] font-extrabold uppercase tracking-wider">
                              Slide {idx + 1}
                            </span>
                            <span className="text-[9px] font-mono text-stone-400">
                              {idx * 3}s - {(idx + 1) * 3}s
                            </span>
                          </div>

                          {/* 16:9 Thumbnail Frame with Ambient Glow */}
                          <div className="w-full aspect-[16/9] rounded-sm overflow-hidden bg-black border border-stone-700/80 relative mb-2">
                            <img
                              src={img.url}
                              alt=""
                              aria-hidden="true"
                              className="absolute inset-0 w-full h-full object-cover filter blur-md scale-110 opacity-30 pointer-events-none"
                            />
                            <img
                              src={img.url}
                              alt={img.title}
                              className="relative z-10 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 z-10 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />
                            <span className="absolute bottom-1 right-1.5 z-20 text-[8px] uppercase tracking-wider bg-emerald-500/90 text-stone-950 font-bold px-1 rounded-sm">
                              Top-Fitted 16:9
                            </span>
                          </div>

                          <p className="text-[11px] font-bold text-stone-200 truncate" title={img.title}>
                            {img.title}
                          </p>
                        </div>

                        <div className="mt-2.5 pt-2 border-t border-stone-800">
                          <DeviceImageUploadButton
                            onImageSelected={(base64, filename) => {
                              const updated = [...tempSliderImages];
                              updated[idx].url = base64;
                              setTempSliderImages(updated);
                              onUpdateSliderImages(updated);
                              triggerToast(`Slide #${idx + 1} replaced with local picture "${filename}" and auto-fitted into frame!`);
                              logActivity('Slide Image Replaced', 'Content', `Replaced slide #${idx + 1} with local device picture (${filename})`);
                            }}
                            label={`Replace Slide ${idx + 1}`}
                            variant="compact"
                            icon={<Upload className="w-3 h-3 text-stone-950" />}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* DETAILED SLIDE EDITORS WITH 16:9 AUTOMATIC FRAME FITTING CONTAINER */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                    <span className="text-xs uppercase font-bold text-stone-300 tracking-wider">
                      Detailed Slide Frames & Content Editor
                    </span>
                    <span className="text-[11px] text-amber-400">
                      All photos fit automatically into the 16:9 cinematic frame
                    </span>
                  </div>

                  {tempSliderImages.map((img, idx) => (
                    <div
                      key={img.id || idx}
                      className="p-5 bg-stone-900 border border-stone-800 rounded-sm space-y-4 hover:border-amber-500/40 transition-colors shadow-lg"
                    >
                      {/* Top Bar for this Slide */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 text-xs font-extrabold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-stone-950" />
                            SLIDE {idx + 1} OF {tempSliderImages.length}
                          </span>
                          <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                            {idx === 0
                              ? 'Homepage Opener • Entrance & Facade'
                              : idx === 1
                              ? 'Suites & Luxury Living'
                              : idx === 2
                              ? 'Resort & Swimming Pool'
                              : idx === 3
                              ? 'Grand Ballrooms & Events'
                              : idx === 4
                              ? 'Fine Dining & Culinary'
                              : `Custom Carousel Slot #${idx + 1}`}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-stone-950 border border-stone-800 text-[10px] text-stone-400 font-mono">
                            Transitions at {idx * 3}s
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {idx > 0 && (
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...tempSliderImages];
                                const current = updated[idx];
                                updated[idx] = updated[idx - 1];
                                updated[idx - 1] = current;
                                setTempSliderImages(updated);
                                onUpdateSliderImages(updated);
                                triggerToast(`Moved Slide #${idx + 1} up to Slide #${idx}`);
                              }}
                              className="p-1.5 bg-stone-800 hover:bg-stone-750 text-stone-300 rounded text-xs transition-colors"
                              title="Move Slide Up in sequence"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {idx < tempSliderImages.length - 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...tempSliderImages];
                                const current = updated[idx];
                                updated[idx] = updated[idx + 1];
                                updated[idx + 1] = current;
                                setTempSliderImages(updated);
                                onUpdateSliderImages(updated);
                                triggerToast(`Moved Slide #${idx + 1} down to Slide #${idx + 2}`);
                              }}
                              className="p-1.5 bg-stone-800 hover:bg-stone-750 text-stone-300 rounded text-xs transition-colors"
                              title="Move Slide Down in sequence"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {tempSliderImages.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`Delete Slide #${idx + 1} (${img.title}) from homepage?`)) {
                                  const updated = tempSliderImages.filter((_, i) => i !== idx);
                                  setTempSliderImages(updated);
                                  onUpdateSliderImages(updated);
                                  triggerToast(`Slide #${idx + 1} removed.`);
                                }
                              }}
                              className="p-1.5 text-stone-500 hover:text-red-400 transition-colors"
                              title="Delete slide"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Main Slide Editor Body: 16:9 Frame Viewport + Inputs */}
                      <div className="flex flex-col lg:flex-row items-start gap-5">
                        {/* 16:9 Widescreen Automatic Frame Fitting Container */}
                        <div className="w-full lg:w-96 shrink-0 space-y-1.5">
                          <div className="relative w-full aspect-[16/9] rounded-sm overflow-hidden bg-black border-2 border-amber-500/50 shadow-2xl group">
                            {/* Ambient blurred backdrop that automatically fills widescreen margins for photos of any aspect ratio */}
                            <img
                              src={img.url}
                              alt=""
                              aria-hidden="true"
                              className="absolute inset-0 w-full h-full object-cover filter blur-2xl scale-125 opacity-40 brightness-50 pointer-events-none"
                            />

                            {/* Main slide picture automatically fitted into frame with upper top part showing */}
                            <img
                              src={img.url}
                              alt={img.title}
                              className="relative z-10 w-full h-full object-cover object-top filter brightness-[0.95] contrast-[1.02] transition-all duration-300"
                            />

                            {/* Luxury Corner & Auto-Fit Badges */}
                            <div className="absolute top-2 left-2 z-20 px-2 py-0.5 rounded-sm bg-stone-950/85 border border-amber-500/40 text-[10px] font-extrabold text-amber-300 uppercase tracking-wider">
                              Slide #{idx + 1} Frame
                            </div>

                            <div className="absolute bottom-2 left-2 z-20 px-2 py-0.5 rounded-sm bg-stone-950/85 border border-emerald-500/40 text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Upper Top Part Displayed (Auto-Fitted)</span>
                            </div>
                          </div>
                          <span className="text-[10px] text-stone-400 block text-center">
                            Widescreen 16:9 Cinema Frame • Fits any device picture automatically
                          </span>
                        </div>

                        {/* Text fields & Local Device Replace actions */}
                        <div className="flex-1 w-full space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] uppercase font-bold text-stone-300 mb-1">
                                Slide #{idx + 1} Headline Title
                              </label>
                              <input
                                type="text"
                                placeholder="Headline text shown over slide"
                                value={img.title}
                                onChange={(e) => {
                                  const updated = [...tempSliderImages];
                                  updated[idx].title = e.target.value;
                                  setTempSliderImages(updated);
                                }}
                                className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs p-2.5 rounded-sm outline-none focus:border-amber-500"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] uppercase font-bold text-stone-300 mb-1">
                                Slide #{idx + 1} Subtitle Tagline
                              </label>
                              <input
                                type="text"
                                placeholder="Tagline or description"
                                value={img.tagline}
                                onChange={(e) => {
                                  const updated = [...tempSliderImages];
                                  updated[idx].tagline = e.target.value;
                                  setTempSliderImages(updated);
                                }}
                                className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs p-2.5 rounded-sm outline-none focus:border-amber-500"
                              />
                            </div>
                          </div>

                          {/* Local Device Photo Replacement Action Area */}
                          <div className="p-3 bg-stone-950 rounded-sm border border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div className="space-y-0.5">
                              <span className="text-xs uppercase font-bold text-amber-400 block">
                                Replace Slide #{idx + 1} Picture from Device
                              </span>
                              <p className="text-[11px] text-stone-400">
                                Select any image from your phone or computer. It will automatically fit into the 16:9 frame and publish live.
                              </p>
                              <span className="text-[10px] text-emerald-400/90 font-mono block">
                                {img.url.startsWith('data:') ? '✓ Saved from your local device' : 'Default hotel picture active'}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                              <DeviceImageUploadButton
                                onImageSelected={(base64, filename) => {
                                  const updated = [...tempSliderImages];
                                  updated[idx].url = base64;
                                  setTempSliderImages(updated);
                                  onUpdateSliderImages(updated);
                                  triggerToast(`Slide #${idx + 1} replaced with local picture "${filename}" and auto-fitted into frame!`);
                                  logActivity('Slide Image Replaced', 'Content', `Replaced slide #${idx + 1} with local device picture (${filename})`);
                                }}
                                label={`Choose Picture for Slide ${idx + 1}`}
                                icon={<Upload className="w-3.5 h-3.5 text-stone-950" />}
                              />

                              <button
                                type="button"
                                onClick={() => openReplaceSlideModal(idx)}
                                className="px-3 py-2 bg-stone-850 hover:bg-stone-800 text-amber-300 border border-stone-700 hover:border-amber-500/50 rounded-sm text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors"
                              >
                                Advanced Frame Assistant
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-TAB 3: ROOM PHOTOS */}
            {mediaSubTab === 'rooms' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-serif-luxury text-base font-bold text-stone-100">
                      Rooms & Luxury Suites Imagery ({rooms.length} Suites)
                    </h4>
                    <p className="text-xs text-stone-400">
                      Upload photos directly from your phone or computer to showcase each accommodation.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAddDeviceImageModalOpen(true)}
                    className="px-4 py-2 rounded-sm bg-stone-850 hover:bg-stone-800 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Plus className="w-4 h-4 text-amber-400" />
                    <span>Upload Room Picture</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {rooms.map((room) => (
                    <div key={room.id} className="p-4 bg-stone-900 border border-stone-800 rounded-sm space-y-3">
                      <img src={room.featuredImage} alt={room.name} className="w-full h-44 object-cover object-top rounded-sm border border-stone-700" />
                      <div>
                        <h5 className="font-serif-luxury font-bold text-stone-100 text-sm">{room.name}</h5>
                        <p className="text-xs text-amber-400">Current Rate: ₦{room.price.toLocaleString()} / night</p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-stone-800">
                        <span className="text-[10px] uppercase font-semibold text-amber-400 block">
                          Upload Room Photo from Local Device:
                        </span>
                        <DeviceImageUploadButton
                          onImageSelected={(base64, filename) => {
                            handleUpdateRoomImage(room.id, base64);
                            triggerToast(`Room "${room.name}" photo updated with "${filename}" from device!`);
                          }}
                          label="Choose Room Photo from Device"
                          className="w-full"
                          icon={<Upload className="w-3.5 h-3.5 text-stone-950" />}
                        />
                        <span className="text-[10px] text-stone-500 block text-center">
                          {room.featuredImage.startsWith('data:') ? '✓ Currently using local device picture' : 'Default stock imagery'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-TAB 4: EVENT HALLS PHOTOS */}
            {mediaSubTab === 'events' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-serif-luxury text-base font-bold text-stone-100">
                      Grand Event Halls & Venues Imagery
                    </h4>
                    <p className="text-xs text-stone-400">
                      Upload venue pictures from your phone or computer to display on the Event Halls page and proposal forms.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAddDeviceImageModalOpen(true)}
                    className="px-4 py-2 rounded-sm bg-stone-850 hover:bg-stone-800 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Plus className="w-4 h-4 text-amber-400" />
                    <span>Upload Hall Picture</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {eventHallsList.map((hall) => (
                    <div key={hall.id} className="p-4 bg-stone-900 border border-stone-800 rounded-sm space-y-3">
                      <img src={hall.image} alt={hall.name} className="w-full h-44 object-cover object-top rounded-sm border border-stone-700" />
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-amber-400">{hall.sqm} sqm • Up to {hall.theaterCapacity} Guests</span>
                        <h5 className="font-serif-luxury font-bold text-stone-100 text-sm">{hall.name}</h5>
                        <p className="text-xs text-stone-300">Daily Rate: ₦{hall.dailyRate.toLocaleString()}</p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-stone-800">
                        <div>
                          <label className="text-[10px] uppercase text-stone-400 block mb-1">Daily Booking Rate (₦)</label>
                          <input
                            type="number"
                            defaultValue={hall.dailyRate}
                            id={`hall-rate-${hall.id}`}
                            className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs p-2 rounded-sm font-mono text-[11px]"
                          />
                        </div>

                        <DeviceImageUploadButton
                          onImageSelected={(base64, filename) => {
                            const rateInput = document.getElementById(`hall-rate-${hall.id}`) as HTMLInputElement;
                            handleUpdateEventHallImage(
                              hall.id, 
                              base64, 
                              rateInput ? Number(rateInput.value) : undefined
                            );
                            triggerToast(`Hall "${hall.name}" photo updated with "${filename}" from device!`);
                          }}
                          label="Choose Hall Photo from Device"
                          className="w-full"
                          icon={<Upload className="w-3.5 h-3.5 text-stone-950" />}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-TAB 5: RESTAURANT & DINING PHOTOS */}
            {mediaSubTab === 'dining' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-serif-luxury text-base font-bold text-stone-100">
                      Royal Palm Restaurant & Cuisine Photos
                    </h4>
                    <p className="text-xs text-stone-400">
                      Upload food, drinks, and chef dish photos directly from your device.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAddDeviceImageModalOpen(true)}
                    className="px-4 py-2 rounded-sm bg-stone-850 hover:bg-stone-800 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Plus className="w-4 h-4 text-amber-400" />
                    <span>Upload Dish Picture</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {restaurantMenuList.map((dish) => (
                    <div key={dish.id} className="p-4 bg-stone-900 border border-stone-800 rounded-sm space-y-3">
                      <img src={dish.image} alt={dish.name} className="w-full h-40 object-cover object-top rounded-sm border border-stone-700" />
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-amber-400 capitalize">{dish.category}</span>
                        <h5 className="font-serif-luxury font-bold text-stone-100 text-sm">{dish.name}</h5>
                        <p className="text-xs text-stone-300">Price: ₦{dish.price.toLocaleString()}</p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-stone-800">
                        <div>
                          <label className="text-[10px] uppercase text-stone-400 block mb-1">Menu Price (₦)</label>
                          <input
                            type="number"
                            defaultValue={dish.price}
                            id={`dish-price-${dish.id}`}
                            className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs p-2 rounded-sm font-mono text-[11px]"
                          />
                        </div>

                        <DeviceImageUploadButton
                          onImageSelected={(base64, filename) => {
                            const priceInput = document.getElementById(`dish-price-${dish.id}`) as HTMLInputElement;
                            handleUpdateDishImage(
                              dish.id, 
                              base64, 
                              priceInput ? Number(priceInput.value) : undefined
                            );
                            triggerToast(`Menu dish "${dish.name}" photo updated with "${filename}" from device!`);
                          }}
                          label="Choose Dish Photo from Device"
                          className="w-full"
                          icon={<Upload className="w-3.5 h-3.5 text-stone-950" />}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-TAB 6: FACILITIES & POWER PHOTOS */}
            {mediaSubTab === 'facilities' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-serif-luxury text-base font-bold text-stone-100">
                      Facilities, Power Plant & Amenities Imagery
                    </h4>
                    <p className="text-xs text-stone-400">
                      Upload local photos for 24/7 Power, Pool, CCTV Security, Starlink & Fitness from your device.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAddDeviceImageModalOpen(true)}
                    className="px-4 py-2 rounded-sm bg-stone-850 hover:bg-stone-800 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Plus className="w-4 h-4 text-amber-400" />
                    <span>Upload Facility Picture</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {facilitiesList.map((fac) => (
                    <div key={fac.id} className="p-4 bg-stone-900 border border-stone-800 rounded-sm space-y-3">
                      <img src={fac.image} alt={fac.title} className="w-full h-40 object-cover object-top rounded-sm border border-stone-700" />
                      <div>
                        <h5 className="font-serif-luxury font-bold text-stone-100 text-sm">{fac.title}</h5>
                        <p className="text-xs text-amber-400">{fac.subtitle}</p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-stone-800">
                        <div>
                          <label className="text-[10px] uppercase text-stone-400 block mb-1">Subtitle / Status</label>
                          <input
                            type="text"
                            defaultValue={fac.subtitle}
                            id={`fac-sub-${fac.id}`}
                            className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs p-2 rounded-sm text-[11px]"
                          />
                        </div>

                        <DeviceImageUploadButton
                          onImageSelected={(base64, filename) => {
                            const subInput = document.getElementById(`fac-sub-${fac.id}`) as HTMLInputElement;
                            handleUpdateFacilityImage(
                              fac.id, 
                              base64, 
                              subInput ? subInput.value : undefined
                            );
                            triggerToast(`Facility "${fac.title}" photo updated with "${filename}" from device!`);
                          }}
                          label="Choose Facility Photo from Device"
                          className="w-full"
                          icon={<Upload className="w-3.5 h-3.5 text-stone-950" />}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-TAB 7: PHOTO GALLERY */}
            {mediaSubTab === 'gallery' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-serif-luxury text-base font-bold text-stone-100">
                      Public Photo Gallery Imagery ({galleryList.length} Photos)
                    </h4>
                    <p className="text-xs text-stone-400">
                      Photos displayed in the interactive lightbox gallery on the public website.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAddDeviceImageModalOpen(true)}
                    className="px-4 py-2.5 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Add New Photo from Device</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {galleryList.map((gal: GalleryItem) => (
                    <div key={gal.id} className="p-3 bg-stone-900 border border-stone-800 rounded-sm space-y-2.5">
                      <img src={gal.url || gal.image} alt={gal.title} className="w-full h-32 object-cover object-top rounded-sm border border-stone-700" />
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-amber-400 capitalize">{gal.category}</span>
                        <h6 className="font-bold text-stone-100 text-xs truncate">{gal.title}</h6>
                      </div>

                      <div className="pt-1">
                        <DeviceImageUploadButton
                          onImageSelected={(base64, filename) => {
                            handleUpdateGalleryImage(gal.id, base64);
                            triggerToast(`Gallery photo #${gal.id} updated with "${filename}" from device!`);
                          }}
                          label="Replace from Device"
                          className="w-full"
                          variant="secondary"
                          icon={<Upload className="w-3 h-3 text-amber-400" />}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. EDIT HOTEL INFO & CONTACTS TAB */}
        {activeTab === 'site_info' && (
          <div className="bg-stone-900 border border-stone-800 rounded-sm p-6 sm:p-8 shadow-xl max-w-4xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-800 gap-2">
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-stone-100">
                  Global Hotel Information & Contact CMS
                </h3>
                <p className="text-xs text-stone-400">
                  Edit every contact phone, address, email, and description rendered across the website.
                </p>
              </div>

              <button
                type="button"
                onClick={handleResetHotelInfo}
                className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs rounded-sm border border-stone-700 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Factory Defaults</span>
              </button>
            </div>

            <form onSubmit={handleSaveHotelInfo} className="space-y-6">
              {/* Hotel Names & Taglines */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                    Official Hotel Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                    Short Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.shortName}
                    onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                  Brand Tagline *
                </label>
                <input
                  type="text"
                  required
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                  Full Hotel Description (About & Footers) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm p-2.5 outline-none resize-none leading-relaxed"
                />
              </div>

              {/* Contact Phones & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-amber-500" />
                    Primary Reservations Phone *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.phonePrimary}
                    onChange={(e) => setFormData({ ...formData, phonePrimary: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm p-2.5 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-amber-500" />
                    Secondary Helpline Phone
                  </label>
                  <input
                    type="text"
                    value={formData.phoneSecondary}
                    onChange={(e) => setFormData({ ...formData, phoneSecondary: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm p-2.5 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5 flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    WhatsApp Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm p-2.5 outline-none font-mono"
                  />
                </div>
              </div>

              {/* Email Addresses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-amber-500" />
                    Reservations Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-amber-500" />
                    General Inquiries Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.inquiriesEmail}
                    onChange={(e) => setFormData({ ...formData, inquiriesEmail: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-amber-500" />
                    Banquets & State Events Email
                  </label>
                  <input
                    type="email"
                    value={formData.banquetsEmail || ''}
                    placeholder="banquets@jinjihotels.com.ng"
                    onChange={(e) => setFormData({ ...formData, banquetsEmail: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-red-400" />
                    24/7 Security & Power Emergency Hotline
                  </label>
                  <input
                    type="text"
                    value={formData.emergencyPhone || ''}
                    placeholder="+234 802 999 1100"
                    onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm p-2.5 outline-none font-mono"
                  />
                </div>
              </div>

              {/* Physical Addresses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    Full Physical Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    Short Address (Topbar/Footers) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.shortAddress}
                    onChange={(e) => setFormData({ ...formData, shortAddress: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                  />
                </div>
              </div>

              {/* Google Maps & Navigation Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" />
                      Google Maps URL (Directions)
                    </span>
                    {formData.googleMapUrl && (
                      <a
                        href={formData.googleMapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-amber-400 hover:underline flex items-center gap-0.5 normal-case"
                      >
                        Test Link ↗
                      </a>
                    )}
                  </label>
                  <input
                    type="url"
                    value={formData.googleMapUrl || ''}
                    placeholder="https://maps.app.goo.gl/BVnFZfDGksT9tPCd9"
                    onChange={(e) => setFormData({ ...formData, googleMapUrl: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm p-2.5 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Share2 className="w-3.5 h-3.5 text-blue-400" />
                      Google Location Share Link
                    </span>
                    {formData.googleShareUrl && (
                      <a
                        href={formData.googleShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-blue-400 hover:underline flex items-center gap-0.5 normal-case"
                      >
                        Test Link ↗
                      </a>
                    )}
                  </label>
                  <input
                    type="url"
                    value={formData.googleShareUrl || ''}
                    placeholder="https://share.google/NN3dac8IJIJL1vSF0"
                    onChange={(e) => setFormData({ ...formData, googleShareUrl: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm p-2.5 outline-none font-mono"
                  />
                </div>
              </div>

              {/* Check-in and Check-out Times */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    Standard Check-in Time *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.checkInTime}
                    onChange={(e) => setFormData({ ...formData, checkInTime: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    Standard Check-out Time *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.checkOutTime}
                    onChange={(e) => setFormData({ ...formData, checkOutTime: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                  />
                </div>
              </div>

              {/* Corporate Banking Account Details */}
              <div className="p-4 bg-stone-950 rounded-sm border border-amber-900/40 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    Official Corporate Settlement Bank Details (Printed on Invoices & Vouchers)
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-stone-400 mb-1">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      value={formData.bankName || ''}
                      placeholder="e.g. Zenith Bank Plc"
                      onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm p-2 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-stone-400 mb-1">
                      Corporate Account Name
                    </label>
                    <input
                      type="text"
                      value={formData.accountName || ''}
                      placeholder="e.g. Jinji Hotels Ltd Operations"
                      onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm p-2 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-stone-400 mb-1">
                      Account Number (NUBAN)
                    </label>
                    <input
                      type="text"
                      value={formData.accountNumber || ''}
                      placeholder="e.g. 1018892044"
                      onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-700 focus:border-amber-500 text-stone-100 text-xs rounded-sm p-2 outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-stone-800">
                <span className="text-xs text-stone-400">
                  Changes save directly to client browsers and apply instantly.
                </span>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Information</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 5. BOOKINGS & ROOM RATES TAB */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by ref (JJH-...), guest, or room..."
                  value={searchBookingQuery}
                  onChange={(e) => setSearchBookingQuery(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 text-stone-100 text-xs rounded-sm pl-9 pr-3 py-2 outline-none focus:border-amber-500"
                />
              </div>

              <button
                onClick={() => setIsWalkInModalOpen(true)}
                className="w-full sm:w-auto px-4 py-2 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>+ Register Walk-In Guest</span>
              </button>
            </div>

            {/* Bookings Table */}
            <div className="bg-stone-900 border border-stone-800 rounded-sm overflow-x-auto shadow-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-950 text-stone-400 uppercase tracking-wider border-b border-stone-800">
                  <tr>
                    <th className="p-3.5">Reference</th>
                    <th className="p-3.5">Guest Info</th>
                    <th className="p-3.5">Room & Dates</th>
                    <th className="p-3.5">Total (₦)</th>
                    <th className="p-3.5">Payment</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800">
                  {filteredReservations.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-stone-500">
                        No reservations found matching your query.
                      </td>
                    </tr>
                  ) : (
                    filteredReservations.map((res) => (
                      <tr key={res.id} className="hover:bg-stone-850/50 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-amber-400">
                          {res.bookingReference}
                        </td>
                        <td className="p-3.5">
                          <strong className="text-stone-100 block">{res.guestName}</strong>
                          <span className="text-[11px] text-stone-400">{res.guestPhone}</span>
                        </td>
                        <td className="p-3.5">
                          <span className="text-stone-200 block font-medium">{res.roomName}</span>
                          <span className="text-[11px] text-stone-400">
                            {res.checkInDate} → {res.checkOutDate} ({res.nights}n)
                          </span>
                        </td>
                        <td className="p-3.5 font-bold font-serif-luxury text-amber-300">
                          ₦{res.grandTotal.toLocaleString()}
                        </td>
                        <td className="p-3.5 text-[11px] text-stone-300 capitalize">
                          {res.paymentMethod.replace(/_/g, ' ')}
                        </td>
                        <td className="p-3.5">
                          <select
                            value={res.status}
                            onChange={(e) => updateReservationStatus(res.id, e.target.value as any)}
                            className="bg-stone-950 border border-stone-700 text-stone-200 text-xs rounded-sm p-1 outline-none font-semibold"
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Guaranteed">Guaranteed</option>
                            <option value="Checked-In">Checked-In</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => deleteReservation(res.id)}
                            className="p-1.5 text-stone-400 hover:text-red-400 hover:bg-stone-800 rounded-sm transition-colors cursor-pointer"
                            title="Delete record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Room Rates Live Manager */}
            <div className="pt-6 border-t border-stone-800">
              <h4 className="font-serif-luxury text-lg font-bold text-stone-100 mb-3">
                Live Room Inventory & Nightly Rates
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rooms.map((room) => (
                  <div key={room.id} className="p-4 bg-stone-900 border border-stone-800 rounded-sm flex items-center justify-between gap-3">
                    <div>
                      <h5 className="font-bold text-xs text-stone-100">{room.name}</h5>
                      <span className="text-[10px] text-stone-400">{room.sizeSqm} sqm • {room.bedType}</span>
                    </div>

                    <div className="text-right">
                      {editingRoomId === room.id ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            value={tempPrice}
                            onChange={(e) => setTempPrice(Number(e.target.value))}
                            className="w-24 bg-stone-950 border border-amber-500 text-amber-300 font-mono text-xs p-1 rounded-sm"
                          />
                          <button onClick={() => handleSavePrice(room.id)} className="p-1 bg-emerald-600 rounded text-white">
                            <Save className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => setEditingRoomId(null)} className="p-1 bg-stone-800 rounded text-stone-400">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="font-serif-luxury font-bold text-amber-400 text-sm">
                            ₦{room.price.toLocaleString()}
                          </span>
                          <button
                            onClick={() => {
                              setEditingRoomId(room.id);
                              setTempPrice(room.price);
                            }}
                            className="p-1 text-stone-400 hover:text-amber-400 rounded cursor-pointer"
                            title="Edit Rate"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 6. EVENTS & DINING TAB */}
        {activeTab === 'events_dining' && (
          <div className="space-y-6">
            <h3 className="font-serif-luxury text-xl font-bold text-stone-100">
              Event Proposals & Dining Table Reservations
            </h3>

            {/* Event Proposals */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-400">
                1. Event Hall & Banquet Inquiries
              </h4>
              <div className="bg-stone-900 border border-stone-800 rounded-sm overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-950 text-stone-400 uppercase tracking-wider border-b border-stone-800">
                    <tr>
                      <th className="p-3">Venue</th>
                      <th className="p-3">Event Type</th>
                      <th className="p-3">Date & Guests</th>
                      <th className="p-3">Contact Person</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800">
                    {eventProposals.map((ep) => (
                      <tr key={ep.id} className="hover:bg-stone-850/50">
                        <td className="p-3 font-bold text-amber-300">{ep.hallName}</td>
                        <td className="p-3 text-stone-200">{ep.eventType}</td>
                        <td className="p-3">
                          <strong className="block text-stone-100">{ep.eventDate}</strong>
                          <span className="text-[11px] text-stone-400">{ep.estimatedGuests} Attendees</span>
                        </td>
                        <td className="p-3">
                          <strong className="block text-stone-100">{ep.contactName}</strong>
                          <a href={`tel:${ep.contactPhone}`} className="text-amber-400 hover:underline">{ep.contactPhone}</a>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-sm bg-amber-950 border border-amber-500/30 text-amber-300 text-[10px] uppercase font-bold">
                            {ep.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table Reservations */}
            <div className="space-y-3 pt-4 border-t border-stone-800">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-400">
                2. Royal Palm Restaurant Table Reservations
              </h4>
              <div className="bg-stone-900 border border-stone-800 rounded-sm overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-950 text-stone-400 uppercase tracking-wider border-b border-stone-800">
                    <tr>
                      <th className="p-3">Guest Name</th>
                      <th className="p-3">Date & Time</th>
                      <th className="p-3">Party Size</th>
                      <th className="p-3">Preferences</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800">
                    {tableBookings.map((tb) => (
                      <tr key={tb.id} className="hover:bg-stone-850/50">
                        <td className="p-3">
                          <strong className="block text-stone-100">{tb.guestName}</strong>
                          <span className="text-[11px] text-amber-400">{tb.guestPhone}</span>
                        </td>
                        <td className="p-3">
                          <strong className="block text-stone-100">{tb.date}</strong>
                          <span className="text-[11px] text-stone-400">{tb.timeSlot}</span>
                        </td>
                        <td className="p-3 font-semibold text-stone-200">{tb.guestsCount}</td>
                        <td className="p-3 text-stone-400 max-w-xs">{tb.seatingPreference}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-sm bg-emerald-950 text-emerald-300 text-[10px] uppercase font-bold">
                            {tb.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 7. COMPLETE STAFF ACTIVITY LOG TAB */}
        {activeTab === 'activity_log' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-stone-100">
                  Comprehensive Hotel & Staff Audit Trail
                </h3>
                <p className="text-xs text-stone-400">
                  Full chronological log of management actions, check-ins, security inspections, and updates.
                </p>
              </div>

              <button
                onClick={() => setIsNewLogModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 text-xs font-bold uppercase rounded-sm hover:from-amber-400 hover:to-amber-500 flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Log Shift Note / Event</span>
              </button>
            </div>

            <div className="space-y-3">
              {activityLogs.map((log) => (
                <div key={log.id} className="p-4 bg-stone-900 border border-stone-800 rounded-sm space-y-1.5 shadow-md">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-semibold uppercase rounded-sm">
                        {log.category}
                      </span>
                      <h4 className="font-bold text-stone-100 text-sm">{log.action}</h4>
                    </div>
                    <span className="text-[11px] text-stone-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-500" />
                      {log.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-stone-300 leading-relaxed bg-stone-950 p-2.5 rounded-sm border border-stone-850">
                    {log.details}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                    <span>Officer in charge: <strong className="text-stone-300">{log.staffName}</strong> ({log.staffRole})</span>
                    <span>System Record Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ENROLL NEW STAFF MODAL */}
      {isNewStaffModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-stone-900 border border-amber-500/40 rounded-sm p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-4">
              <h3 className="font-serif-luxury text-lg font-bold text-stone-100">
                Enroll New Hotel Staff Member
              </h3>
              <button onClick={() => setIsNewStaffModalOpen(false)} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStaff} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase text-stone-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fatima Kabir"
                    value={newStaff.name}
                    onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs p-2.5 rounded-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-stone-300 mb-1">Job Role / Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Night Auditor"
                    value={newStaff.role}
                    onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs p-2.5 rounded-sm outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase text-stone-300 mb-1">Department</label>
                  <select
                    value={newStaff.department}
                    onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value as any })}
                    className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs p-2.5 rounded-sm outline-none"
                  >
                    <option>Front Desk</option>
                    <option>Management</option>
                    <option>Housekeeping</option>
                    <option>Food & Beverage</option>
                    <option>Security & Power</option>
                    <option>Events & Banquets</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase text-stone-300 mb-1">Initial Shift Status</label>
                  <select
                    value={newStaff.shiftStatus}
                    onChange={(e) => setNewStaff({ ...newStaff, shiftStatus: e.target.value as any })}
                    className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs p-2.5 rounded-sm outline-none"
                  >
                    <option>On Duty</option>
                    <option>Off Duty</option>
                    <option>On Leave</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase text-stone-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+234 800 111 2222"
                    value={newStaff.phone}
                    onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs p-2.5 rounded-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-stone-300 mb-1">Assigned Work Area</label>
                  <input
                    type="text"
                    placeholder="e.g. Executive Floor 3"
                    value={newStaff.assignedArea}
                    onChange={(e) => setNewStaff({ ...newStaff, assignedArea: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs p-2.5 rounded-sm outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-sm mt-2 cursor-pointer shadow-md"
              >
                Enroll Staff Member
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADD ACTIVITY LOG MODAL */}
      {isNewLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-stone-900 border border-amber-500/40 rounded-sm p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-4">
              <h3 className="font-serif-luxury text-base font-bold text-stone-100">
                Record Staff Operational Note / Log
              </h3>
              <button onClick={() => setIsNewLogModalOpen(false)} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddActivityLog} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-stone-300 mb-1">Action / Event Headline *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Generator #2 Fuel Refill & Inspection"
                  value={newLogAction}
                  onChange={(e) => setNewLogAction(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs p-2.5 rounded-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase text-stone-300 mb-1">Category</label>
                  <select
                    value={newLogCategory}
                    onChange={(e) => setNewLogCategory(e.target.value as any)}
                    className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs p-2.5 rounded-sm outline-none"
                  >
                    <option value="Reservations">Reservations</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Security">Security & Power</option>
                    <option value="Staff">Staff</option>
                    <option value="Rates">Rates</option>
                    <option value="Content">Content</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase text-stone-300 mb-1">Officer Logging</label>
                  <input
                    type="text"
                    value={newLogStaff}
                    onChange={(e) => setNewLogStaff(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs p-2.5 rounded-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase text-stone-300 mb-1">Details & Shift Observation *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter specific observation, readings, or guest notes..."
                  value={newLogDetails}
                  onChange={(e) => setNewLogDetails(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs p-2.5 rounded-sm outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-sm mt-2"
              >
                Save to Official Activity Log
              </button>
            </form>
          </div>
        </div>
      )}

      {/* WALK-IN RESERVATION MODAL */}
      {isWalkInModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-stone-900 border border-amber-500/40 rounded-sm shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-4">
              <h3 className="font-serif-luxury text-lg font-bold text-stone-100">
                Register Walk-In Guest Reservation
              </h3>
              <button onClick={() => setIsWalkInModalOpen(false)} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateWalkIn} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-stone-300 mb-1">Guest Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Barrister Yusuf Haruna"
                  value={walkInName}
                  onChange={(e) => setWalkInName(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-stone-300 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+234 800 000 0000"
                  value={walkInPhone}
                  onChange={(e) => setWalkInPhone(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase text-stone-300 mb-1">Room Type</label>
                  <select
                    value={walkInRoomId}
                    onChange={(e) => setWalkInRoomId(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                  >
                    {rooms.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name} (₦{r.price.toLocaleString()})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase text-stone-300 mb-1">Nights</label>
                  <input
                    type="number"
                    min={1}
                    value={walkInNights}
                    onChange={(e) => setWalkInNights(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs rounded-sm p-2.5 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="paid"
                  checked={walkInPaid}
                  onChange={(e) => setWalkInPaid(e.target.checked)}
                  className="w-4 h-4 text-amber-500 rounded"
                />
                <label htmlFor="paid" className="text-xs text-stone-300">
                  Payment already received at Front Desk POS / Cash
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider mt-4"
              >
                Register & Issue Key Card
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Master Add Device Image Modal */}
      <AddDeviceImageModal
        isOpen={isAddDeviceImageModalOpen}
        onClose={() => setIsAddDeviceImageModalOpen(false)}
        initialTargetSection={deviceModalTarget}
        initialSlideIndex={deviceModalSlideIndex}
        rooms={rooms}
        onUpdateRooms={onUpdateRooms}
        hotelInfo={hotelInfo}
        onUpdateHotelInfo={onUpdateHotelInfo}
        sliderImages={tempSliderImages}
        onUpdateSliderImages={(updated) => {
          setTempSliderImages(updated);
          onUpdateSliderImages(updated);
        }}
        eventHalls={eventHallsList}
        onUpdateEventHalls={setEventHallsList}
        restaurantMenu={restaurantMenuList}
        onUpdateRestaurantMenu={setRestaurantMenuList}
        facilities={facilitiesList}
        onUpdateFacilities={setFacilitiesList}
        galleryImages={galleryList}
        onUpdateGalleryImages={setGalleryList}
        onSuccessToast={triggerToast}
        onLogActivity={logActivity}
      />
    </div>
  );
};
