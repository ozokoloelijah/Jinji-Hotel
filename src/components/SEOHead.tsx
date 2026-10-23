import React, { useEffect } from 'react';
import { PageId, HotelInfoConfig } from '../types/hotel';
import { HOTEL_INFO, FAQ_DATA } from '../data/hotelData';

interface SEOHeadProps {
  currentPage: PageId | 'admin';
  hotelInfo?: HotelInfoConfig;
  customTitle?: string;
  customDescription?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  currentPage,
  hotelInfo = HOTEL_INFO,
  customTitle,
  customDescription,
}) => {
  useEffect(() => {
    // 1. Dynamic Titles & Descriptions tailored for high search engine ranking
    const pageMetaMap: Record<PageId | 'admin', { title: string; desc: string; keywords: string }> = {
      home: {
        title: `${hotelInfo.name} | Luxury Hotel, Suites & Events | Akwanga, Nasarawa State`,
        desc: `Experience 5-star luxury at ${hotelInfo.name} in Akwanga, Nasarawa. 52+ presidential & deluxe suites, 24/7 power, fine dining, Olympic pool, and 1,200-capacity event halls.`,
        keywords: 'hotel in akwanga, jinji hotels, luxury suites akwanga, hotels in nasarawa state, farin ruwa falls hotel, event halls akwanga, wedding venue nasarawa, 24/7 power hotel akwanga',
      },
      rooms: {
        title: `Luxury Suites & Room Rates | ${hotelInfo.name} Akwanga`,
        desc: `Explore 52+ elegantly appointed suites from Standard to Presidential. King beds, marble baths, Starlink Wi-Fi, 24/7 AC, and room service in Akwanga, Nasarawa.`,
        keywords: 'hotel rooms akwanga, presidential suite nasarawa, deluxe rooms akwanga, hotel rates akwanga, best accommodation akwanga',
      },
      offers: {
        title: `Special Offers, Packages & Weekend Deals | ${hotelInfo.name}`,
        desc: `Exclusive hotel discounts, romantic weekend escapes, corporate retreat packages, and long-stay rates at ${hotelInfo.name}, Akwanga, Nasarawa State.`,
        keywords: 'jinji hotel deals, akwanga hotel discounts, weekend getaway nasarawa, honeymoon packages akwanga, corporate retreat rates',
      },
      attractions: {
        title: `Akwanga & Nasarawa Travel Guide | Farin Ruwa Falls & Local Attractions`,
        desc: `Discover top tourist sights near ${hotelInfo.name}: Farin Ruwa Waterfalls, Eggon Hills & Caves, COE Akwanga, and cultural heritage in Nasarawa State.`,
        keywords: 'things to do in akwanga, farin ruwa waterfalls, eggon hills, tourist attractions nasarawa state, coe akwanga hotel, travel guide akwanga',
      },
      events: {
        title: `Grand Event Halls, Ballrooms & Wedding Venues | ${hotelInfo.name}`,
        desc: `Host royal weddings, corporate summits & banquets for up to 1,200 guests in our Crystal Ballroom & Marquee with full catering in Akwanga.`,
        keywords: 'event halls in akwanga, wedding reception hall nasarawa, conference center akwanga, banquet hall nasarawa state',
      },
      restaurant: {
        title: `The Royal Palm Restaurant & Bar | Fine Dining in Akwanga`,
        desc: `Indulge in authentic Nigerian delicacies and continental cuisine prepared by master chefs. Room service and poolside bar available 24/7.`,
        keywords: 'best restaurant in akwanga, food in akwanga, native nigerian food nasarawa, royal palm restaurant, bar in akwanga',
      },
      facilities: {
        title: `5-Star Facilities & 24/7 Guaranteed Power | ${hotelInfo.name}`,
        desc: `Olympic swimming pool, wellness fitness gym, 24/7 twin Cummins diesel generators, Starlink satellite Wi-Fi, and 100% armed security in Akwanga.`,
        keywords: 'hotel with swimming pool akwanga, 24 hour power hotel nasarawa, gym in akwanga, safe hotel in nasarawa state',
      },
      policies: {
        title: `Hotel Policies, Check-in Guidelines & FAQs | ${hotelInfo.name}`,
        desc: `Official hotel policies: Check-in & check-out times, 24/7 power guarantee, payment methods, swimming pool rules, and safety protocol at ${hotelInfo.name}.`,
        keywords: 'jinji hotel policies, check in time akwanga hotel, cancellation policy jinji hotels, faq jinji hotels akwanga',
      },
      careers: {
        title: `Careers & Hospitality Job Openings | ${hotelInfo.name} Akwanga`,
        desc: `Join our 5-star team in Akwanga, Nasarawa State. Open positions in front desk reception, culinary arts, electrical engineering, housekeeping, and banquets.`,
        keywords: 'jobs in akwanga, hospitality jobs nasarawa, hotel vacancies akwanga, jinji hotel careers, chef jobs nasarawa',
      },
      gallery: {
        title: `Visual Photo Gallery & Virtual Tour | ${hotelInfo.name}`,
        desc: `Browse HD photos of our presidential suites, resort swimming pool, Crystal Ballroom, fine dining restaurant, and scenic grounds in Akwanga.`,
        keywords: 'jinji hotels pictures, hotel gallery akwanga, hotel photos nasarawa',
      },
      about: {
        title: `About Us & Our 5-Star Heritage | ${hotelInfo.name} Akwanga`,
        desc: `Learn about the vision, hospitality standards, and dedication to excellence that make ${hotelInfo.name} the crown jewel of Nasarawa State.`,
        keywords: 'about jinji hotels, luxury hospitality akwanga, best hotel in nasarawa state',
      },
      contact: {
        title: `Contact, Map & Directions | ${hotelInfo.name} Akwanga`,
        desc: `Find ${hotelInfo.name} along Andaha-Jos Road, Akwanga. Phone: ${hotelInfo.phonePrimary}, WhatsApp concierge, and 24/7 front desk assistance.`,
        keywords: 'jinji hotels contact number, jinji hotel address akwanga, directions to jinji hotels, andaha-jos road akwanga, jinji hotel google maps',
      },
      admin: {
        title: `Staff Management Portal | ${hotelInfo.name}`,
        desc: `Internal administration and guest reservations management portal for ${hotelInfo.name}.`,
        keywords: 'admin portal, staff management',
      },
    };

    const currentMeta = pageMetaMap[currentPage] || pageMetaMap.home;
    const finalTitle = customTitle || currentMeta.title;
    const finalDesc = customDescription || currentMeta.desc;

    // Set page title
    document.title = finalTitle;

    // Helper to update or create meta tags
    const setMetaTag = (attrName: 'name' | 'property', attrValue: string, content: string) => {
      let meta = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attrName, attrValue);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    setMetaTag('name', 'description', finalDesc);
    setMetaTag('name', 'keywords', currentMeta.keywords);
    setMetaTag('property', 'og:title', finalTitle);
    setMetaTag('property', 'og:description', finalDesc);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:site_name', hotelInfo.name);
    setMetaTag('property', 'og:locale', 'en_NG');
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', finalTitle);
    setMetaTag('name', 'twitter:description', finalDesc);

    // Canonical link
    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
    const canonicalPath = currentPage === 'home' ? '' : `?page=${currentPage}`;
    const canonicalUrl = `${currentOrigin}/${canonicalPath}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.rel = 'canonical';
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.href = canonicalUrl;
    setMetaTag('property', 'og:url', canonicalUrl);

    // 2. Inject Rich Schema.org JSON-LD Structured Data
    const hotelStructuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Hotel',
          '@id': `${currentOrigin}/#hotel`,
          'name': hotelInfo.name,
          'alternateName': ['Jinji Hotel Akwanga', 'Jinji Hotels & Suites'],
          'description': hotelInfo.description,
          'url': currentOrigin,
          'telephone': hotelInfo.phonePrimary,
          'email': hotelInfo.email,
          'priceRange': '₦45,000 - ₦180,000',
          'starRating': {
            '@type': 'Rating',
            'ratingValue': '4.9',
            'bestRating': '5',
          },
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': hotelInfo.address,
            'addressLocality': 'Akwanga',
            'addressRegion': 'Nasarawa State',
            'postalCode': '960101',
            'addressCountry': 'NG',
          },
          'hasMap': hotelInfo.googleMapUrl || 'https://maps.app.goo.gl/BVnFZfDGksT9tPCd9',
          'sameAs': [
            hotelInfo.googleMapUrl || 'https://maps.app.goo.gl/BVnFZfDGksT9tPCd9',
            hotelInfo.googleShareUrl || 'https://share.google/NN3dac8IJIJL1vSF0',
          ],
          'geo': {
            '@type': 'GeoCoordinates',
            'latitude': 8.9056,
            'longitude': 8.4069,
          },
          'checkinTime': hotelInfo.checkInTime || '14:00',
          'checkoutTime': hotelInfo.checkOutTime || '12:00',
          'openingHoursSpecification': {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            'opens': '00:00',
            'closes': '23:59',
          },
          'amenityFeature': [
            { '@type': 'LocationFeatureSpecification', 'name': '24/7 Guaranteed Power Supply', 'value': true },
            { '@type': 'LocationFeatureSpecification', 'name': 'High-Speed Starlink Satellite Wi-Fi', 'value': true },
            { '@type': 'LocationFeatureSpecification', 'name': 'Olympic Resort Swimming Pool', 'value': true },
            { '@type': 'LocationFeatureSpecification', 'name': 'Modern Fitness Gym', 'value': true },
            { '@type': 'LocationFeatureSpecification', 'name': '1,200 Capacity Event Ballroom', 'value': true },
            { '@type': 'LocationFeatureSpecification', 'name': 'Royal Palm Fine Dining Restaurant', 'value': true },
            { '@type': 'LocationFeatureSpecification', 'name': 'Armed Security & CCTV Surveillance', 'value': true },
            { '@type': 'LocationFeatureSpecification', 'name': 'Executive Airport Chauffeur Shuttle', 'value': true },
          ],
          'containsPlace': [
            {
              '@type': 'Restaurant',
              'name': 'The Royal Palm Restaurant & Bar',
              'servesCuisine': ['Nigerian', 'Continental', 'African'],
              'priceRange': '₦₦',
            },
            {
              '@type': 'MeetingRoom',
              'name': 'The Grand Crystal Ballroom',
              'maximumAttendeeCapacity': 1200,
            },
          ],
        },
        // BreadcrumbList Schema
        {
          '@type': 'BreadcrumbList',
          '@id': `${currentOrigin}/#breadcrumb`,
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': currentOrigin,
            },
            ...(currentPage !== 'home' ? [{
              '@type': 'ListItem',
              'position': 2,
              'name': currentMeta.title.split('|')[0].trim(),
              'item': canonicalUrl,
            }] : []),
          ],
        },
        // FAQ Schema for search engine rich snippet answers
        {
          '@type': 'FAQPage',
          '@id': `${currentOrigin}/#faq`,
          'mainEntity': FAQ_DATA.map((item) => ({
            '@type': 'Question',
            'name': item.q,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': item.a,
            },
          })),
        },
      ],
    };

    let scriptTag = document.querySelector('script#hotel-jsonld-schema') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'hotel-jsonld-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(hotelStructuredData);

    return () => {
      // Keep head clean
    };
  }, [currentPage, hotelInfo, customTitle, customDescription]);

  return null;
};
