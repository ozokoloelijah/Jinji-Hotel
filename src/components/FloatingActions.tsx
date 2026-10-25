import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, ArrowUp, GripVertical } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';
import { HotelInfoConfig } from '../types/hotel';

interface FloatingActionsProps {
  hotelInfo?: HotelInfoConfig;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ hotelInfo = HOTEL_INFO }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Draggable / Movable Position State for WhatsApp Icon
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const dragStartInfo = useRef<{ startX: number; startY: number; initialElemX: number; initialElemY: number }>({
    startX: 0,
    startY: 0,
    initialElemX: 0,
    initialElemY: 0,
  });
  const hasMoved = useRef(false);

  // Initialize position to bottom-right of viewport on mount
  useEffect(() => {
    const handleInitialPosition = () => {
      const isMobile = window.innerWidth < 640;
      const defaultWidth = isMobile ? 60 : 190;
      const initX = Math.max(16, window.innerWidth - defaultWidth - 24);
      const initY = Math.max(16, window.innerHeight - 80);
      setPosition((prev) => prev ?? { x: initX, y: initY });
    };

    handleInitialPosition();

    // Re-clamp position inside viewport on window resize
    const handleResize = () => {
      setPosition((prev) => {
        if (!prev) return null;
        const rect = buttonRef.current?.getBoundingClientRect();
        const width = rect?.width || 180;
        const height = rect?.height || 54;
        const maxX = Math.max(16, window.innerWidth - width - 16);
        const maxY = Math.max(16, window.innerHeight - height - 16);
        return {
          x: Math.min(Math.max(16, prev.x), maxX),
          y: Math.min(Math.max(16, prev.y), maxY),
        };
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll-to-top visibility: shows when scrolling, disappears 3 seconds after stopping
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveringScrollTop = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollTop(true);

        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        // Auto-disappear 3 seconds after user stops scrolling
        scrollTimeoutRef.current = setTimeout(() => {
          if (!isHoveringScrollTop.current) {
            setShowScrollTop(false);
          }
        }, 3000);
      } else {
        setShowScrollTop(false);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMouseEnterScrollTop = () => {
    isHoveringScrollTop.current = true;
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
  };

  const handleMouseLeaveScrollTop = () => {
    isHoveringScrollTop.current = false;
    if (window.scrollY > 100) {
      scrollTimeoutRef.current = setTimeout(() => {
        setShowScrollTop(false);
      }, 3000);
    }
  };

  // Drag Handlers (supports Mouse and Touch)
  const startDrag = (clientX: number, clientY: number) => {
    if (!position) return;
    dragStartInfo.current = {
      startX: clientX,
      startY: clientY,
      initialElemX: position.x,
      initialElemY: position.y,
    };
    hasMoved.current = false;
    setIsDragging(true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Left click only
    startDrag(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      startDrag(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const onPointerMove = (clientX: number, clientY: number) => {
      const deltaX = clientX - dragStartInfo.current.startX;
      const deltaY = clientY - dragStartInfo.current.startY;

      // If user moved more than 5px, treat as intentional drag (not a click)
      if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        hasMoved.current = true;
      }

      const rect = buttonRef.current?.getBoundingClientRect();
      const width = rect?.width || 180;
      const height = rect?.height || 54;

      const rawX = dragStartInfo.current.initialElemX + deltaX;
      const rawY = dragStartInfo.current.initialElemY + deltaY;

      // Keep strictly within screen bounds
      const minX = 12;
      const maxX = Math.max(minX, window.innerWidth - width - 12);
      const minY = 12;
      const maxY = Math.max(minY, window.innerHeight - height - 12);

      const boundedX = Math.min(Math.max(minX, rawX), maxX);
      const boundedY = Math.min(Math.max(minY, rawY), maxY);

      setPosition({ x: boundedX, y: boundedY });
    };

    const handleMouseMove = (e: MouseEvent) => {
      onPointerMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [isDragging]);

  const handleChatClick = (e: React.MouseEvent) => {
    // If user dragged the icon, cancel opening WhatsApp link
    if (hasMoved.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
  };

  const whatsappPhone = hotelInfo.whatsapp.replace(/[^0-9]/g, '');
  const chatUrl = `https://wa.me/${whatsappPhone}?text=Hello%20${encodeURIComponent(hotelInfo.name)},%20I%20am%20inquiring%20about%20room%20availability%20and%20rates.`;

  return (
    <>
      {/* Scroll to Top Arrow (Shows while scrolling up or down, auto-disappears 3s after user stops scrolling) */}
      <div 
        className={`fixed bottom-6 right-6 z-40 transition-all duration-500 transform ${
          showScrollTop 
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
            : 'opacity-0 translate-y-3 scale-95 pointer-events-none'
        }`}
        onMouseEnter={handleMouseEnterScrollTop}
        onMouseLeave={handleMouseLeaveScrollTop}
      >
        <button
          onClick={scrollToTop}
          className="w-11 h-11 rounded-full bg-stone-900 border border-amber-500/50 text-amber-400 hover:bg-stone-800 hover:text-amber-300 shadow-2xl flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95 group"
          aria-label="Scroll to top of page"
          title="Back to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Movable / Draggable WhatsApp Chat Widget */}
      <div
        ref={buttonRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={
          position
            ? {
                left: `${position.x}px`,
                top: `${position.y}px`,
                position: 'fixed',
                touchAction: 'none',
              }
            : {
                right: '24px',
                bottom: '24px',
                position: 'fixed',
              }
        }
        className={`z-50 select-none group ${
          isDragging ? 'cursor-grabbing scale-105 opacity-95 shadow-2xl' : 'cursor-grab'
        } transition-shadow duration-150`}
      >
        <a
          href={chatUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleChatClick}
          className="relative flex items-center gap-2 pl-3 pr-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl border border-emerald-400/50 hover:shadow-emerald-900/60 transition-transform active:scale-95"
          title={`Chat with ${hotelInfo.shortName} Concierge on WhatsApp (+2348063429340). Hold and drag to move icon anywhere.`}
        >
          {/* Visual Move Grip Handle */}
          <span 
            className="text-emerald-200/80 hover:text-white transition-colors"
            title="Drag to move icon anywhere on screen"
          >
            <GripVertical className="w-4 h-4 opacity-75" />
          </span>

          <div className="relative flex items-center justify-center">
            <MessageCircle className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border border-stone-900 animate-pulse" />
          </div>

          <div className="hidden sm:flex flex-col text-left leading-tight">
            <span className="text-[11px] font-extrabold tracking-wide uppercase">
              Chat on WhatsApp
            </span>
            <span className="text-[9px] text-emerald-100 font-mono">
              +234 806 342 9340
            </span>
          </div>

          {/* Draggable subtle pill helper hint */}
          <span className="text-[8px] uppercase tracking-wider text-emerald-200/80 font-bold hidden md:inline ml-1 px-1.5 py-0.5 rounded-full bg-emerald-700/60 border border-emerald-500/40">
            Movable
          </span>
        </a>
      </div>
    </>
  );
};
