import React, { createContext, useState, useEffect, useCallback } from 'react';
import { COLLEGES } from '../data/colleges';
import { HOUSING_LISTINGS } from '../data/listings';
import { FOOD_LISTINGS } from '../data/foodListings';
import { TRANSPORT_ROUTES } from '../data/transportRoutes';

export const SettleInContext = createContext();

export function SettleInProvider({ children }) {
  // Student Profile State - strictly NO default values
  const [studentProfile, setStudentProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('settlein_profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // College Selection - driven by student's choice
  const [selectedCollegeId, setSelectedCollegeId] = useState(() => {
    return localStorage.getItem('settlein_college') || null;
  });

  // Current College Object (null if no college chosen yet)
  const currentCollege = selectedCollegeId ? COLLEGES.find(c => c.id === selectedCollegeId) || COLLEGES[0] : null;

  // Shortlist - completely EMPTY by default
  const [shortlist, setShortlist] = useState(() => {
    try {
      const saved = localStorage.getItem('settlein_shortlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Comparison Tray - completely EMPTY by default
  const [compareList, setCompareList] = useState(() => {
    try {
      const saved = localStorage.getItem('settlein_compare');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Recently Viewed Properties - completely EMPTY by default
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      const saved = localStorage.getItem('settlein_recent');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Contacted Owners simulated inbox - completely EMPTY by default
  const [contactInquiries, setContactInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('settlein_inquiries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Login Modal Control
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(() => {
    // If not logged in, auto-open when app starts
    try {
      const saved = localStorage.getItem('settlein_profile');
      return !saved;
    } catch {
      return true;
    }
  });

  // Search & Global Category
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Sync state to localStorage
  useEffect(() => {
    if (selectedCollegeId) {
      localStorage.setItem('settlein_college', selectedCollegeId);
    } else {
      localStorage.removeItem('settlein_college');
    }
  }, [selectedCollegeId]);

  useEffect(() => {
    localStorage.setItem('settlein_shortlist', JSON.stringify(shortlist));
  }, [shortlist]);

  useEffect(() => {
    localStorage.setItem('settlein_compare', JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    localStorage.setItem('settlein_recent', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem('settlein_inquiries', JSON.stringify(contactInquiries));
  }, [contactInquiries]);

  useEffect(() => {
    if (studentProfile) {
      localStorage.setItem('settlein_profile', JSON.stringify(studentProfile));
    } else {
      localStorage.removeItem('settlein_profile');
    }
  }, [studentProfile]);

  // Login Student handler
  const loginStudent = useCallback((profileData) => {
    setStudentProfile(profileData);
    if (profileData.collegeId) {
      setSelectedCollegeId(profileData.collegeId);
    }
    setIsLoginModalOpen(false);
  }, []);

  // Logout / Reset Demo handler
  const logoutStudent = useCallback(() => {
    localStorage.removeItem('settlein_profile');
    localStorage.removeItem('settlein_college');
    localStorage.removeItem('settlein_shortlist');
    localStorage.removeItem('settlein_compare');
    localStorage.removeItem('settlein_recent');
    localStorage.removeItem('settlein_inquiries');
    
    setStudentProfile(null);
    setSelectedCollegeId(null);
    setShortlist([]);
    setCompareList([]);
    setRecentlyViewed([]);
    setContactInquiries([]);
    setIsLoginModalOpen(true);
  }, []);

  // College Switcher Handler
  const changeCollege = useCallback((collegeId) => {
    setSelectedCollegeId(collegeId);
    setStudentProfile(prev => prev ? ({ ...prev, collegeId }) : {
      name: "Student",
      city: "Pune",
      collegeId,
      isLoggedIn: true
    });
  }, []);

  // Shortlist Handlers
  const toggleShortlist = useCallback((id, type = "housing") => {
    setShortlist(prev => {
      const exists = prev.some(item => item.id === id);
      if (exists) {
        return prev.filter(item => item.id !== id);
      } else {
        return [{ id, type, addedAt: new Date().toISOString() }, ...prev];
      }
    });
  }, []);

  const isShortlisted = useCallback((id) => {
    return shortlist.some(item => item.id === id);
  }, [shortlist]);

  const removeFromShortlist = useCallback((id) => {
    setShortlist(prev => prev.filter(item => item !== id));
  }, []);

  // Compare Handlers (Max 3)
  const toggleCompare = useCallback((id) => {
    setCompareList(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id);
      } else {
        if (prev.length >= 3) {
          return [...prev.slice(1), id];
        }
        return [...prev, id];
      }
    });
  }, []);

  const isInCompare = useCallback((id) => {
    return compareList.includes(id);
  }, [compareList]);

  const clearCompare = useCallback(() => {
    setCompareList([]);
  }, []);

  // Record viewed property with stable reference
  const recordView = useCallback((id) => {
    setRecentlyViewed(prev => {
      if (prev[0] === id) return prev; // Avoid unnecessary state updates
      const filtered = prev.filter(item => item !== id);
      return [id, ...filtered].slice(0, 10);
    });
  }, []);

  // Add Contact Inquiry
  const submitInquiry = useCallback(({ propertyId, propertyName, ownerName, studentMessage }) => {
    const newInquiry = {
      id: "inq-" + Date.now(),
      propertyId,
      propertyName,
      ownerName,
      studentMessage,
      timestamp: "Just now",
      status: "Sent to Owner"
    };
    setContactInquiries(prev => [newInquiry, ...prev]);
  }, []);

  // Filter helper functions (fallback gracefully if college not yet chosen)
  const effectiveCollegeId = selectedCollegeId || 'vit-pune';

  const getFilteredHousing = (filters = {}) => {
    return HOUSING_LISTINGS.filter(item => {
      const targetCollege = filters.collegeId || effectiveCollegeId;
      if (targetCollege && item.collegeId !== targetCollege) return false;

      if (filters.type && filters.type !== "all" && item.type.toLowerCase() !== filters.type.toLowerCase()) {
        return false;
      }

      if (filters.gender && filters.gender !== "all") {
        if (filters.gender === "Girls" && !item.gender.includes("Girls") && !item.gender.includes("Co-ed")) return false;
        if (filters.gender === "Boys" && !item.gender.includes("Boys") && !item.gender.includes("Co-ed")) return false;
      }

      if (filters.budget && filters.budget !== "all") {
        if (filters.budget === "0-5000" && item.price > 5000) return false;
        if (filters.budget === "5000-8000" && (item.price < 5000 || item.price > 8000)) return false;
        if (filters.budget === "8000-12000" && (item.price < 8000 || item.price > 12000)) return false;
        if (filters.budget === "12000+" && item.price < 12000) return false;
      }

      if (filters.distance && filters.distance !== "all") {
        const maxDist = parseFloat(filters.distance);
        if (item.distanceKm > maxDist) return false;
      }

      if (filters.rating && filters.rating !== "all") {
        const minRating = parseFloat(filters.rating);
        if (item.rating < minRating) return false;
      }

      if (filters.verifiedOnly && !item.verified) return false;

      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const match = item.name.toLowerCase().includes(q) ||
          item.address.toLowerCase().includes(q) ||
          item.type.toLowerCase().includes(q) ||
          item.tagline.toLowerCase().includes(q);
        if (!match) return false;
      }

      return true;
    });
  };

  const getFilteredFood = (filters = {}) => {
    return FOOD_LISTINGS.filter(item => {
      const targetCollege = filters.collegeId || effectiveCollegeId;
      if (targetCollege && item.collegeId !== targetCollege) return false;

      if (filters.category && filters.category !== "all" && item.category !== filters.category) {
        return false;
      }

      if (filters.foodType && filters.foodType !== "all" && item.foodType !== filters.foodType) {
        return false;
      }

      if (filters.maxPrice && item.monthlyPrice > filters.maxPrice) return false;
      if (filters.minRating && item.rating < filters.minRating) return false;

      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const match = item.name.toLowerCase().includes(q) ||
          item.specialties.some(s => s.toLowerCase().includes(q)) ||
          item.description.toLowerCase().includes(q);
        if (!match) return false;
      }

      return true;
    });
  };

  const getFilteredTransport = (filters = {}) => {
    return TRANSPORT_ROUTES.filter(route => {
      const targetCollege = filters.collegeId || effectiveCollegeId;
      if (targetCollege && route.fromCollegeId !== targetCollege) return false;

      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const match = route.from.toLowerCase().includes(q) ||
          route.to.toLowerCase().includes(q) ||
          route.stops.some(s => s.toLowerCase().includes(q)) ||
          route.options.some(opt => opt.mode.toLowerCase().includes(q));
        if (!match) return false;
      }

      return true;
    });
  };

  return (
    <SettleInContext.Provider
      value={{
        colleges: COLLEGES,
        selectedCollegeId,
        currentCollege: currentCollege || COLLEGES[0],
        hasSelectedCollege: !!selectedCollegeId,
        changeCollege,
        shortlist,
        toggleShortlist,
        isShortlisted,
        removeFromShortlist,
        compareList,
        toggleCompare,
        isInCompare,
        clearCompare,
        recentlyViewed,
        recordView,
        contactInquiries,
        submitInquiry,
        studentProfile,
        setStudentProfile,
        loginStudent,
        logoutStudent,
        isLoginModalOpen,
        setIsLoginModalOpen,
        openLoginModal: () => setIsLoginModalOpen(true),
        closeLoginModal: () => setIsLoginModalOpen(false),
        searchQuery,
        setSearchQuery,
        activeCategory,
        setActiveCategory,
        getFilteredHousing,
        getFilteredFood,
        getFilteredTransport
      }}
    >
      {children}
    </SettleInContext.Provider>
  );
}

// Re-export useSettleIn
export { useSettleIn } from './useSettleIn';
