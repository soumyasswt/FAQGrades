import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './OTPForm.css';
import otpImage from './OTP_pic.gif';
import { FaArrowLeft } from 'react-icons/fa';

function OTPForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || '';
  const from = location.state?.from || '';

  useEffect(() => {
    if (!email || !from) {
      navigate('/');
    }
  }, [email, from, navigate]);

  const [otpDigits, setOtpDigits] = useState(Array(6).fill(''));
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [verified, setVerified] = useState(false);

  const inputsRef = useRef([]);

  useEffect(() => {
    if (resendTimer === 0) {
      setCanResend(true);
      return;
    }

    const timerId = setTimeout(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [resendTimer]);

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const updated = [...otpDigits];
    updated[index] = value;
    setOtpDigits(updated);
    setOtp(updated.join(''));

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otpDigits[index]) {
        const updated = [...otpDigits];
        updated[index] = '';
        setOtpDigits(updated);
        setOtp(updated.join(''));
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').trim().slice(0, 6);
    if (!/^\d{6}$/.test(paste)) return;

    const digits = paste.split('');
    setOtpDigits(digits);
    setOtp(paste);
    digits.forEach((digit, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = digit;
      }
    });
    inputsRef.current[5]?.focus();
  };

  const handleValidateOtp = async () => {
    setError('');
    setSuccess('');

    if (otp.length !== 6) {
      setError('Please enter a 6-digit OTP.');
      return;
    }

    try {
      const response = await fetch('/api/users/validate-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to validate OTP.');
      } else {
        setSuccess('OTP validated successfully! You can now proceed.');
        setVerified(true);
      }
    } catch {
      setError('Server error. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setSuccess('');
    setCanResend(false);
    setResendTimer(30);

    try {
      const response = await fetch('/api/users/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, mode: from }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to resend OTP.');
      } else {
        setSuccess('OTP resent! Check your email.');
      }
    } catch {
      setError('Server error. Please try again.');
    }
  };

  const handleProceed = () => {
    if (from === 'signup') {
      navigate('/signup-form', { state: { email } });
    } else if (from === 'signin') {
      navigate('/community', { state: { email } });
    } else {
      navigate('/');
    }
  };

  if (!email || !from) return null;

  return (
    <div className="otp-background">
      {/* Top black bar */}
      <div className="top-bar-bg"></div>

      {/* Logo and help button */}
      <Link to="/" className="text-logo">FAQGrades</Link>
      <button className="help-btn">Help</button>

      {/* Main glass box container */}
      <div className="otp-glass-box">
        {/* Left image side */}
        <div className="otp-image-box">
          <img src={otpImage} alt="Illustration" className="otp-side-image" />
        </div>

        {/* Right OTP form side */}
        <div className="otp-box">
          <button className="otp-back-button" onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </button>
          <h2>Validate OTP</h2>
          <p>OTP sent to: <b>{email}</b></p>

          {/* OTP digit boxes */}
          <div className="otp-input-group" onPaste={handlePaste}>
            {otpDigits.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="otp-digit-box"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputsRef.current[index] = el)}
                disabled={verified}
              />
            ))}
          </div>

          {!verified ? (
            <div className="otp-button-row">
              <button className="verify-btn" onClick={handleValidateOtp}>
                Validate OTP
              </button>
              <button
                className={`resend-btn ${!canResend ? 'disabled' : ''}`}
                onClick={handleResendOtp}
                disabled={!canResend}
              >
                Resend OTP {!canResend && `(${resendTimer}s)`}
              </button>
            </div>
          ) : (
            <button className="verify-btn" onClick={handleProceed}>
              Proceed
            </button>
          )}

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

export default OTPForm;
