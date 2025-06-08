import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import OTPForm from './OTPForm';
import SignInPage from './SignInPage';
import SignUpForm from './SignUpForm'; // New component after OTP if from signup
import CommunityPage from './CommunityPage'; // New component after OTP if from signin
import './App.css';

function App() {
  const [showHome, setShowHome] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHome(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-container">
      {/* Splash Screen */}
      {!showHome && (
        <div className="splash-screen">
          <img src="/FAQ_logo.png" alt="App Logo" className="splash-logo" />
        </div>
      )}

      {/* App Routes */}
      {showHome && (
        <div className="homepage-container fade-in">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/validate-otp" element={<OTPForm />} />
            <Route path="/signup-form" element={<SignUpForm />} />
            <Route path="/community" element={<CommunityPage />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
