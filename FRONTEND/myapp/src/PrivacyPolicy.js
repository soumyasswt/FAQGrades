import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StaticPage.css';

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  return (
    <div className="policy-page">
      <header className="policy-header">
        <div className="policy-brand">FAQGrades</div>
        <div className="auth-links">
          <span className="auth-text" onClick={() => navigate('/')}>Sign up</span>
          <span className="or-text">or</span>
          <span className="auth-text" onClick={() => navigate('/signin')}>Sign in</span>
        </div>
      </header>

      <main className="tos-container">
        <div className="tos-heading-wrapper">
          <div className="center-title">FAQGrades</div>
          <h1>Privacy Policy</h1>
        </div>

        <section>
          <p>
            FAQGrades ("we", "us", or "our") provides this Privacy Policy to inform you of our policies and procedures
            regarding the collection, use and disclosure of personal information we may receive from users of our
            website ("Site") and any other services offered by us in connection with our site (collectively, the "Services").
          </p>
        </section>

        <section>
          <h2>Information Collection: Personally Identifiable Information</h2>
          <p>
            In the course of using the Services, we collect personally identifiable information, such as IP addresses.
            This information is used solely to support the internal operations of our Services and Site.
          </p>
        </section>

        <section>
          <h2>Cookies and Other Technologies</h2>
          <p>
            FAQGrades uses cookies to collect information for session management and analytics.
            You can control cookie behavior through your browser settings.
          </p>
        </section>

        <section>
          <h2>Information Sharing and Disclosure</h2>
          <p>
            We do not sell, rent, or trade your personal information. We may share it:
          </p>
          <ul>
            <li>To comply with legal obligations or governmental requests.</li>
            <li>With third-party service providers acting on our behalf.</li>
            <li>To protect FAQGrades' rights, users, and security.</li>
          </ul>
        </section>

        <section>
          <h2>Business Transfers</h2>
          <p>
            Your personal data may be transferred if FAQGrades is involved in a merger, acquisition, or sale of assets.
          </p>
        </section>

        <section>
          <h2>Security</h2>
          <p>
            We employ appropriate physical, electronic, and managerial safeguards to protect personal information,
            though no method is 100% secure.
          </p>
        </section>

        <section>
          <h2>International Transfer</h2>
          <p>
            Your data may be transferred to and maintained on servers located outside your country. By using FAQGrades,
            you consent to this transfer.
          </p>
        </section>

        <section>
          <h2>Links to Other Sites</h2>
          <p>
            Our Services may link to third-party sites. We are not responsible for their privacy practices. Please review
            their privacy policies independently.
          </p>
        </section>

        <section>
          <h2>Account Deletion</h2>
          <p>
            You may request to delete your FAQGrades account. Deletion includes a 15-day cooling-off period and results
            in permanent data loss. Certain conditions, like active subscriptions, must be resolved before proceeding.
          </p>
        </section>

        <section>
          <h2>Changes and Updates to This Privacy Policy</h2>
          <p>
            We may revise this Privacy Policy from time to time. Updates will be reflected by a "last modified" date.
            Continued use of the Services indicates agreement to the revised policy.
          </p>
        </section>

        <section>
          <h2>Contact Information</h2>
          <p>
            For any questions regarding this Privacy Policy or data handling, contact us at:<br />
            📧 <strong>support@faqgrades.com</strong>
          </p>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
