import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SettleInProvider, useSettleIn } from './context/SettleInContext';
import Navbar from './components/common/Navbar';
import MobileNav from './components/common/MobileNav';
import Footer from './components/common/Footer';
import CompareFloatingBar from './components/compare/CompareFloatingBar';
import StudentLoginModal from './components/common/StudentLoginModal';
import Welcome from './pages/Welcome';

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
  const {
    isLoginModalOpen, openLoginModal, closeLoginModal,
    studentProfile, showWelcome, enterAsGuest
  } = useSettleIn();

  // Show the landing / welcome page when no session
  if (showWelcome) {
    return (
      <>
        <Welcome
          onLogin={openLoginModal}
          onSignUp={openLoginModal}
          onGuest={enterAsGuest}
        />
        {/* Login / Sign Up modal - floats over the Welcome page */}
        <StudentLoginModal
          isOpen={isLoginModalOpen}
          onClose={closeLoginModal}
          canDismiss={true}
        />
      </>
    );
  }

  return (
    <Router>
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

        {/* Edit Info Modal (shown from Profile / Navbar when already logged in) */}
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
