/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { RoomsPage } from './components/pages/RoomsPage';
import { EventsPage } from './components/pages/EventsPage';
import { RestaurantPage } from './components/pages/RestaurantPage';
import { FacilitiesPage } from './components/pages/FacilitiesPage';
import { GalleryPage } from './components/pages/GalleryPage';
import { ContactPage } from './components/pages/ContactPage';
import { OffersPage } from './components/pages/OffersPage';
import { AttractionsPage } from './components/pages/AttractionsPage';
import { PoliciesPage } from './components/pages/PoliciesPage';
import { CareersPage } from './components/pages/CareersPage';
import { RoomDetailsModal } from './components/RoomDetailsModal';
import { BookingModal } from './components/BookingModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { RoomComparisonModal } from './components/RoomComparisonModal';
import { AirportShuttleModal } from './components/AirportShuttleModal';
import { SubmitReviewModal } from './components/SubmitReviewModal';
import { PrivacyTermsModal } from './components/PrivacyTermsModal';
import { SEOHead } from './components/SEOHead';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { ROOMS_DATA, HOTEL_INFO, HOME_SLIDER_IMAGES } from './data/hotelData';
import { PageId, Room, HotelInfoConfig } from './types/hotel';

export default function App() {
  // Navigation State with URL deep linking (?page=rooms, ?page=offers, etc.)
  const [currentPage, setCurrentPage] = useState<PageId | 'admin'>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const pageParam = params.get('page') as PageId | null;
      const validPages: PageId[] = [
        'home', 'about', 'rooms', 'events', 'restaurant', 
        'facilities', 'gallery', 'contact', 'offers', 
        'attractions', 'policies', 'careers'
      ];
      if (pageParam && validPages.includes(pageParam)) {
        return pageParam;
      }
    } catch {
      // fallback
    }
    return 'home';
  });

  // Rooms State (allows live rate and image editing from Admin)
  const [rooms, setRooms] = useState<Room[]>(() => {
    try {
      const stored = localStorage.getItem('jinji_hotels_custom_rooms');
      return stored ? JSON.parse(stored) : ROOMS_DATA;
    } catch {
      return ROOMS_DATA;
    }
  });

  // Hotel Info State (allows live editing of all info, contacts, logo from Admin)
  const [hotelInfo, setHotelInfo] = useState<HotelInfoConfig>(() => {
    try {
      const stored = localStorage.getItem('jinji_hotels_custom_info');
      if (stored) {
        const parsed = JSON.parse(stored);
        let updated = false;
        if (parsed.address && parsed.address.includes('Wamba Road')) {
          parsed.address = parsed.address.replace('Wamba Road', 'Andaha-Jos Road');
          updated = true;
        }
        if (parsed.shortAddress && parsed.shortAddress.includes('Wamba Road')) {
          parsed.shortAddress = parsed.shortAddress.replace('Wamba Road', 'Andaha-Jos Road');
          updated = true;
        }
        if (!parsed.googleMapUrl) {
          parsed.googleMapUrl = 'https://maps.app.goo.gl/BVnFZfDGksT9tPCd9';
          updated = true;
        }
        if (!parsed.googleShareUrl) {
          parsed.googleShareUrl = 'https://share.google/NN3dac8IJIJL1vSF0';
          updated = true;
        }
        if (parsed.phonePrimary !== '+234 806 342 9340') {
          parsed.phonePrimary = '+234 806 342 9340';
          updated = true;
        }
        if (parsed.phoneSecondary !== '+234 806 342 9340') {
          parsed.phoneSecondary = '+234 806 342 9340';
          updated = true;
        }
        if (parsed.emergencyPhone !== '+234 806 342 9340') {
          parsed.emergencyPhone = '+234 806 342 9340';
          updated = true;
        }
        if (parsed.whatsapp !== '+2348063429340') {
          parsed.whatsapp = '+2348063429340';
          updated = true;
        }
        if (updated) {
          localStorage.setItem('jinji_hotels_custom_info', JSON.stringify(parsed));
        }

        // Clean up rewards and membership storage
        localStorage.removeItem('jinji_rewards_member');
        localStorage.removeItem('jinji_rewards_vouchers');

        return parsed;
      }
      return HOTEL_INFO;
    } catch {
      return HOTEL_INFO;
    }
  });

  // Slider Images State (allows live editing of 5 home slider images from Admin)
  const [sliderImages, setSliderImages] = useState<Array<{ id: number; title: string; tagline: string; url: string }>>(() => {
    try {
      const stored = localStorage.getItem('jinji_hotels_custom_slider');
      if (stored) {
        let parsed = JSON.parse(stored);
        let updated = false;

        // User requested: Delete slide 6 and 7 (keep exactly 5 slides)
        if (Array.isArray(parsed) && parsed.length > 5) {
          parsed = parsed.slice(0, 5);
          updated = true;
        }

        parsed.forEach((s: any) => {
          if (s.id === 1) {
            s.url = '/images/jinji_garden_bar_lounge.webp';
            s.title = 'The Garden Bar & Evening Lounge';
            s.tagline = 'Fairy-Lit Outdoor Pavilion, Poolside Billiards & Chilled Drinks in Akwanga';
            updated = true;
          }
          if (s.id === 2 && s.url.includes('unsplash.com/photo-1631049307264-da0ec9d70304')) {
            s.url = '/images/jinji_resort_pool_night.webp';
            s.title = 'Illuminated Night Pool & Lounge';
            s.tagline = 'Serene Evening Relaxation & Ambient Blue Waters';
            updated = true;
          }
        });
        if (updated) {
          localStorage.setItem('jinji_hotels_custom_slider', JSON.stringify(parsed));
        }
        return parsed;
      }
      return HOME_SLIDER_IMAGES;
    } catch {
      return HOME_SLIDER_IMAGES;
    }
  });

  // Admin Authentication State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('jinji_admin_logged_in') === 'true';
    } catch {
      return false;
    }
  });
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  // Booking Modals State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRoomIdForBooking, setSelectedRoomIdForBooking] = useState<string | undefined>(undefined);
  const [initialBookingDates, setInitialBookingDates] = useState<{ checkIn: string; checkOut: string; adults: number } | undefined>(undefined);
  const [selectedRoomDetails, setSelectedRoomDetails] = useState<Room | null>(null);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);

  // Additional Standard Hotel Modals
  const [isCompareRoomsOpen, setIsCompareRoomsOpen] = useState(false);
  const [isShuttleModalOpen, setIsShuttleModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [privacyModalType, setPrivacyModalType] = useState<'privacy' | 'terms' | null>(null);

  // Handlers
  const handleOpenBooking = (
    roomId?: string,
    initialData?: { checkIn: string; checkOut: string; adults: number }
  ) => {
    setSelectedRoomIdForBooking(roomId);
    if (initialData) {
      setInitialBookingDates(initialData);
    }
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedRoomIdForBooking(undefined);
  };

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      const url = page === 'home' ? window.location.pathname : `?page=${page}`;
      window.history.pushState({ page }, '', url);
    } catch {
      // ignore
    }
  };

  // Listen for browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.page) {
        setCurrentPage(e.state.page);
      } else {
        const params = new URLSearchParams(window.location.search);
        const p = params.get('page') as PageId | null;
        setCurrentPage(p || 'home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Admin login success
  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setIsAdminLoginOpen(false);
    setCurrentPage('admin');
    try {
      sessionStorage.setItem('jinji_admin_logged_in', 'true');
    } catch {
      // ignore
    }
  };

  // Admin logout
  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentPage('home');
    try {
      sessionStorage.removeItem('jinji_admin_logged_in');
    } catch {
      // ignore
    }
  };

  // Live Update Rooms (price, images, etc.)
  const handleUpdateRooms = (updatedRooms: Room[]) => {
    setRooms(updatedRooms);
    try {
      localStorage.setItem('jinji_hotels_custom_rooms', JSON.stringify(updatedRooms));
    } catch {
      // ignore
    }
  };

  // Live Update Hotel Info, Contacts & Logo
  const handleUpdateHotelInfo = (updatedInfo: HotelInfoConfig) => {
    setHotelInfo(updatedInfo);
    try {
      localStorage.setItem('jinji_hotels_custom_info', JSON.stringify(updatedInfo));
    } catch {
      // ignore
    }
  };

  // Live Update 5 Home Slider Images
  const handleUpdateSliderImages = (updatedSlider: Array<{ id: number; title: string; tagline: string; url: string }>) => {
    setSliderImages(updatedSlider);
    try {
      localStorage.setItem('jinji_hotels_custom_slider', JSON.stringify(updatedSlider));
    } catch {
      // ignore
    }
  };

  // Listen for keyboard shortcut (Ctrl+Shift+A) to trigger admin login easily
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (isAdminLoggedIn) {
          setCurrentPage('admin');
        } else {
          setIsAdminLoginOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminLoggedIn]);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Dynamic SEO Head with OpenGraph, Twitter, and Schema.org JSON-LD */}
      <SEOHead currentPage={currentPage} hotelInfo={hotelInfo} />

      {/* If current page is Admin Dashboard and user is authenticated */}
      {currentPage === 'admin' && isAdminLoggedIn ? (
        <AdminDashboard
          onLogout={handleAdminLogout}
          onViewPublicSite={() => setCurrentPage('home')}
          rooms={rooms}
          onUpdateRooms={handleUpdateRooms}
          hotelInfo={hotelInfo}
          onUpdateHotelInfo={handleUpdateHotelInfo}
          sliderImages={sliderImages}
          onUpdateSliderImages={handleUpdateSliderImages}
        />
      ) : (
        <>
          {/* Top sticky navbar with sections drop-down menu */}
          <Navbar
            currentPage={currentPage}
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
            onOpenMyBookings={() => setIsMyBookingsOpen(true)}
            onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
            hotelInfo={hotelInfo}
          />

          {/* Dedicated Page Router */}
          <main className="flex-1">
            {currentPage === 'home' && (
              <HomePage
                onOpenBooking={handleOpenBooking}
                onNavigate={handleNavigate}
                sliderImages={sliderImages}
                rooms={rooms}
                hotelInfo={hotelInfo}
              />
            )}

            {currentPage === 'offers' && (
              <OffersPage
                onOpenBooking={handleOpenBooking}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === 'attractions' && (
              <AttractionsPage
                onNavigate={handleNavigate}
                onOpenBooking={() => handleOpenBooking()}
                onOpenShuttleModal={() => setIsShuttleModalOpen(true)}
              />
            )}

            {currentPage === 'about' && (
              <AboutPage
                onOpenBooking={() => handleOpenBooking()}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === 'rooms' && (
              <RoomsPage
                onSelectRoomDetails={(room) => setSelectedRoomDetails(room)}
                onBookRoom={(roomId) => handleOpenBooking(roomId)}
                onNavigate={handleNavigate}
                rooms={rooms}
                hotelInfo={hotelInfo}
              />
            )}

            {currentPage === 'events' && (
              <EventsPage onNavigate={handleNavigate} />
            )}

            {currentPage === 'restaurant' && (
              <RestaurantPage onNavigate={handleNavigate} />
            )}

            {currentPage === 'facilities' && (
              <FacilitiesPage
                onOpenBooking={() => handleOpenBooking()}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === 'policies' && (
              <PoliciesPage
                onNavigate={handleNavigate}
                onOpenBooking={() => handleOpenBooking()}
              />
            )}

            {currentPage === 'careers' && (
              <CareersPage onNavigate={handleNavigate} />
            )}

            {currentPage === 'gallery' && (
              <GalleryPage onNavigate={handleNavigate} />
            )}

            {currentPage === 'contact' && (
              <ContactPage onNavigate={handleNavigate} hotelInfo={hotelInfo} />
            )}
          </main>

          {/* Footer */}
          <Footer
            onNavigate={handleNavigate}
            onOpenBooking={(roomId) => handleOpenBooking(roomId)}
            onOpenMyBookings={() => setIsMyBookingsOpen(true)}
            onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
            onOpenPrivacy={() => setPrivacyModalType('privacy')}
            onOpenTerms={() => setPrivacyModalType('terms')}
            onOpenSubmitReview={() => setIsReviewModalOpen(true)}
            onOpenShuttle={() => setIsShuttleModalOpen(true)}
            onOpenCompareRooms={() => setIsCompareRoomsOpen(true)}
            hotelInfo={hotelInfo}
          />

          {/* Floating Concierge & Scroll button */}
          <FloatingActions hotelInfo={hotelInfo} />
        </>
      )}

      {/* Room Details Modal */}
      <RoomDetailsModal
        room={selectedRoomDetails}
        onClose={() => setSelectedRoomDetails(null)}
        onBook={(roomId) => handleOpenBooking(roomId)}
      />

      {/* Booking Checkout Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preSelectedRoomId={selectedRoomIdForBooking}
        initialDates={initialBookingDates}
        rooms={rooms}
        hotelInfo={hotelInfo}
      />

      {/* Guest Reservation Lookup Modal */}
      <MyBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
      />

      {/* Interactive Suite Comparison Modal */}
      <RoomComparisonModal
        isOpen={isCompareRoomsOpen}
        onClose={() => setIsCompareRoomsOpen(false)}
        rooms={rooms}
        onBookRoom={(roomId) => handleOpenBooking(roomId)}
      />

      {/* Airport Chauffeur & Shuttle Booking Modal */}
      <AirportShuttleModal
        isOpen={isShuttleModalOpen}
        onClose={() => setIsShuttleModalOpen(false)}
      />

      {/* Guest Review & Rating Submission Modal */}
      <SubmitReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />

      {/* Guest Privacy & Terms Modal */}
      <PrivacyTermsModal
        isOpen={privacyModalType !== null}
        onClose={() => setPrivacyModalType(null)}
        type={privacyModalType || 'privacy'}
      />

      {/* Hidden Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />
    </div>
  );
}
