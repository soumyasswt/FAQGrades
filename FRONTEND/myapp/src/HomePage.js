import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './HomePage.css';
import './OTPForm.css';

function HomePage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleJoin = async () => {
    setError('');
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/users/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, mode: 'signup' }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'An error occurred.');
      } else {
        navigate('/validate-otp', { state: { email, from: 'signup' } });
      }
    } catch (err) {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <div className="top-bar-bg"></div>

      {/* Logo and Help buttons stay fixed above it */}
      <Link to="/" className="text-logo">FAQGrades</Link>
      <button className="help-btn">Help</button>

      <div className="home-content">
        <div className="content-box">
          <h1 className="main-heading">Your personalized learning hub!</h1>
          <p className="main-subheading">Ready to debug life? Join the next-gen.</p>
        </div>

        <div className="account-box">
          <h2>Create New Account</h2>
          <div className="input-button-row">
            <input
              type="email"
              placeholder="Email"
              className="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <button className="join-btn" onClick={handleJoin} disabled={loading}>
              {loading ? 'Joining...' : 'Join Us'}
            </button>
          </div>
          {error && <p className="error-text">{error}</p>}


          <p className="signin-text">
            Already have an account? <Link to="/signin">Sign in</Link>.
          </p>

          <div className="policy-buttons">
            <button className="policy-btn">Terms of Use</button>
            <span className="divider">|</span>
            <button className="policy-btn">Privacy Policy</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
