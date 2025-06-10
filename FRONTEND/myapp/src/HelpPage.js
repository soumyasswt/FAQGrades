import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import HelpPageImage from './HelpPage_pic.png';
import { FaArrowLeft } from 'react-icons/fa';
import './HelpPage.css';

function HelpPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({ email: '', number: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Something went wrong.');
      } else {
        setSuccess('We will get back to you soon!');
      }
    } catch {
      setError('Server error. Try again later.');
    }
  };

  return (
    <div className="helppage-background">
      {/* Top black bar */}
      <div className="top-bar-bg"></div>

      {/* Logo and help button */}
      <Link to="/" className="text-logo">FAQGrades</Link>
      <Link to="/signin" className="help-btn">Sign in</Link>


      <div className="otp-glass-box">
        <div className="otp-image-box">
          <img src={HelpPageImage} alt="HelpPage Illustration" className="otp-side-image" />
        </div>

        <div className="otp-box">
          <button className="otp-back-button" onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </button>
          <h2>Customer service</h2>

          <form onSubmit={handleSubmit} className="helppage-form">
            <input
              className="helppage-input"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

              <input
                className="helppage-input"
                type="tel"
                inputMode="numeric"
                name="number"
                placeholder="Mobile Number"
                value={formData.number}
                onChange={handleChange}
                required
              />

            <button className="verify-btn" type="submit">Submit</button>
          </form>

          <div className="otp-message-area">
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
          </div>

          <div className="bottom-spacer"></div>
        </div>
      </div>
    </div>
  );
}

export default HelpPage;