import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Select from 'react-select';
import './SignUpForm.css';
import placeholderImage from './signup_image.gif';
import { FaArrowLeft } from 'react-icons/fa';

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'black',
    borderRadius: '16px',
    border: state.isFocused ? '2px solid rgba(0, 120, 67)' : '2px solid transparent',
    boxShadow: state.isFocused
      ? '0 0 12px rgba(0, 255, 170, 0.5), 0 8px 16px rgba(0, 0, 0, 0.3)'
      : 'none',
    padding: '6px 12px',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
    outline: 'none',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'white',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'black',
    borderRadius: '16px',
    outline: 'none',
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isFocused ? 'black' : 'white',
    backgroundColor: state.isFocused ? 'rgb(0, 120, 67)' : 'black',
    borderRadius: '10px',
    outline: 'none',
  }),
};


function SignUpForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const [formData, setFormData] = useState({
    name: '',
    role: 'Student',
    grade: 'Undergraduate',
    institute: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const roleOptions = [
    { value: 'Student', label: 'Student' },
    { value: 'Educator', label: 'Educator' },
    { value: 'Guardian', label: 'Guardian' },
  ];

  const gradeOptions = [
    { value: 'High School', label: 'High School' },
    { value: 'Diploma', label: 'Diploma' },
    { value: 'Undergraduate', label: 'Undergraduate' },
    { value: 'Graduate', label: 'Graduate' },
    { value: 'Post Graduate', label: 'Post Graduate' },
    { value: 'Doctorate/PhD', label: 'Doctorate/PhD' },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setFormData({ ...formData, [name]: selectedOption.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    localStorage.removeItem('signupInProgress');

    try {
      const response = await fetch('/api/users/signup-finalize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, email }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Something went wrong.');
      } else {
        setSuccess('Registration successful!');
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', email); // ✅ Store email
        setTimeout(() => navigate('/community', { replace: true }), 1000);
      }
    } catch {
      setError('Server error. Try again later.');
    }
  };

  useEffect(() => {
    const signupInProgress = localStorage.getItem('signupInProgress');
    if (!email || !signupInProgress) {
      navigate('/', { replace: true });
    }
  }, [email, navigate]);

  return (
    <div className="signup-background">
      {/* Top black bar */}
      <div className="top-bar-bg"></div>

      {/* Logo and help button */}
      <Link to="/" className="text-logo">FAQGrades</Link>
      <Link to="/help" className="help-btn">Help</Link>


      <div className="otp-glass-box">
        <div className="otp-image-box">
          <img src={placeholderImage} alt="SignUp Illustration" className="otp-side-image" />
        </div>

        <div className="otp-box">
          <button className="otp-back-button" onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </button>
          <h2>Complete Your Profile</h2>

          <form onSubmit={handleSubmit} className="signup-form">

            <input
              className="signup-input faded"
              type="email"
              value={email}
              disabled
              readOnly
            />

            <input
              className="signup-input"
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

              <input
                className="signup-input"
                type="text"
                name="institute"
                placeholder="Institute Name"
                value={formData.institute}
                onChange={handleChange}
                required
              />

            {/* Grade Select */}
            <Select
              name="grade"
              className="custom-select"
              classNamePrefix="signup"
              options={gradeOptions}
              styles={customSelectStyles}
              value={gradeOptions.find(opt => opt.value === formData.grade)}
              onChange={handleSelectChange}
              isSearchable={false}
            />


            {/* Role Select */}
            <Select
              name="role"
              className="custom-select"
              classNamePrefix="signup"
              options={roleOptions}
              styles={customSelectStyles}
              value={roleOptions.find(opt => opt.value === formData.role)}
              onChange={handleSelectChange}
              isSearchable={false}
            />

            <div className="signup-disclaimer">
              By continuing, you agree to our{' '}
              <Link to="/terms" className="policy-link">Terms of Service</Link>{' '}
              and{' '}
              <Link to="/privacy" className="policy-link">Privacy Policy</Link>.
            </div>

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

export default SignUpForm;
