import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import HelpPage from './HelpPage';
import OTPForm from './OTPForm';
import SignInPage from './SignInPage';
import SignUpForm from './SignUpForm';
import TermsOfService from './TermsOfService';
import PrivacyPolicy from './PrivacyPolicy';
import CommunityPage from './CommunityPage';
import './App.css';

function App() {
  const [showHome, setShowHome] = useState(false);

  // 👇 Check login status from localStorage
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHome(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-container">
      {/* 🚀 Splash Screen */}
      {!showHome && (
        <div className="splash-screen">
          <img src="/FAQ_logo.png" alt="App Logo" className="splash-logo" />
        </div>
      )}

      {/* 💡 Routes */}
      {showHome && (
        <div className="homepage-container fade-in">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/community" replace />
                ) : (
                  <HomePage />
                )
              }
            />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/validate-otp" element={<OTPForm />} />
            <Route path="/signup-form" element={<SignUpForm />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/community" element={<CommunityPage />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
