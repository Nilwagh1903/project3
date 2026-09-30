import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { SettleInProvider, useSettleIn } from './context/SettleInContext';
import Navbar from './components/common/Navbar';
import MobileNav from './components/common/MobileNav';
import Footer from './components/common/Footer';
import CompareFloatingBar from './components/compare/CompareFloatingBar';
import StudentLoginModal from './components/common/StudentLoginModal';
import ScrollToTop from './components/common/ScrollToTop';

import Home from './pages/Home';
import Explore from './pages/Explore';
import Housing from './pages/Housing';
import Food from './pages/Food';
import Transport from './pages/Transport';
import PropertyDetails from './pages/PropertyDetails';
import Shortlist from './pages/Shortlist';
import Compare from './pages/Compare';
import Onboarding from './pages/Onboarding';
import Profile from './pages/Profile';

function AppContent() {
  const { isLoginModalOpen, closeLoginModal, studentProfile } = useSettleIn();

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
        <Navbar />
        
        <main className="flex-1 pb-16 md:pb-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/housing" element={<Housing />} />
            <Route path="/food" element={<Food />} />
            <Route path="/transport" element={<Transport />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/shortlist" element={<Shortlist />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>

        <CompareFloatingBar />
        <MobileNav />
        <Footer />

        {/* First-time Student Login / Setup Modal */}
        <StudentLoginModal
          isOpen={isLoginModalOpen}
          onClose={closeLoginModal}
          canDismiss={!!studentProfile?.isLoggedIn}
        />
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <SettleInProvider>
      <AppContent />
    </SettleInProvider>
  );
}
