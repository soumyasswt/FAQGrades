import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CommunityPage.css';

function CommunityPage() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');
  const [viewMode, setViewMode] = useState('foryou');
  const location = useLocation();
  const handleLogoClick = () => {
    if (location.pathname === '/community') {
      window.location.reload(); // refresh the page
    } else {
      navigate('/community'); // navigate to community page
    }
  };

  // ✅ Navigation items with icons
  const navItems = [
    { label: 'Community', icon: 'fa-home' },
    { label: 'Explore', icon: 'fa-magnifying-glass' },
    { label: 'Problems', icon: 'fa-pencil-alt' },
    { label: 'AI', icon: 'fa-robot' },
    { label: 'Courses', icon: 'fa-shapes' },
    { label: 'Notifications', icon: 'fa-bell' },
    { label: 'Messages', icon: 'fa-envelope' },
    { label: 'Profile', icon: 'fa-user' },
  ];

  // ✅ Route protection
  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    const signupInProgress = localStorage.getItem('signupInProgress');
    if (auth && signupInProgress) {
      navigate('/signup-form');
    }
    if (!auth) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  // ✅ Prevent browser back to SignUp/SignIn
  useEffect(() => {
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.pathname);
    };
    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    window.location.href = '/';
  };

  return (
    <div className="community-layout">
      {/* Left Navigation */}
      <aside className="left-panel">
        <img
          src="/FAQ_logo.png"
          alt="FAQGrades Logo"
          className="logo-image"
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }}
        />

        <nav>
          {navItems.map(item => (
            <button key={item.label} className="nav-button">
              <i className={`fas ${item.icon}`} style={{ marginRight: '10px' }}></i>
              {item.label}
            </button>
          ))}
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </nav>
      </aside>

      {/* Center Content */}
      <main className="center-panel">
        <div className="toggle-view">
          <button className={viewMode === 'foryou' ? 'active' : ''} onClick={() => setViewMode('foryou')}>For You</button>
          <button className={viewMode === 'following' ? 'active' : ''} onClick={() => setViewMode('following')}>Following</button>
        </div>

        <div className="post-box">
          <textarea placeholder="Ask your doubt..." />
          <button>Post</button>
        </div>

        <div className="feed">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="post">
              <p>User#{idx + 1} asked: How do I solve XYZ?</p>
              <div className="post-actions">
                <button>Mark as Doubt</button>
                <button>Save</button>
                <button>Solve</button>
                <button>Share</button>
                <button>Follow</button>
                <button>Report</button>
                <button>Mute</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Right Performance Panel */}
      <aside className="right-panel">
        <h3>Your Performance</h3>
        <p>Problems Solved: 32</p>
        <p>Streak: 5 days</p>
        <p>Rank: Top 14%</p>
        <p>XP: 4,800</p>
        {userEmail && <p className="user-email">Logged in as: {userEmail}</p>}
      </aside>
    </div>
  );
}

export default CommunityPage;
