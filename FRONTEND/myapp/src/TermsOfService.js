import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StaticPage.css';

const TermsOfService = () => {
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
          <h1>Terms of Service</h1>
        </div>

        <section>
          <h2>1. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Updates will be posted on this
            page with a revised “Last Updated” date. Continued use of the Services after any changes
            constitutes your acceptance of the new Terms.
          </p>
        </section>

        <hr />

        <section>
          <h2>2. Use of Services</h2>
          <p>
            By using our Services, you agree to comply with these Terms and our Privacy Policy. You are authorized
            to use FAQGrades only for lawful and educational purposes.
          </p>
          <p><strong>Prohibited Use:</strong></p>
          <ul>
            <li>Violating laws or regulations.</li>
            <li>Abusive, harassing, or offensive behavior.</li>
            <li>Accessing another user's account.</li>
            <li>Reverse-engineering, copying, or scraping our content.</li>
            <li>Interfering with service integrity.</li>
          </ul>
          <p><strong>Content Ownership:</strong> All materials on FAQGrades—UI, code, graphics, and branding—are our intellectual
            property. You may not reproduce or distribute them without our consent.</p>
        </section>

        <hr />

        <section>
          <h2>3. Account Registration</h2>
          <p>
            You must provide accurate, updated information when registering. You are responsible for
            all activity under your account and agree to notify us immediately of unauthorized use.
          </p>
        </section>

        <hr />

        <section>
          <h2>4. Privacy and Data</h2>
          <p>
            Our collection and use of personal data is governed by our Privacy Policy. By using
            FAQGrades, you consent to our data practices.
          </p>
        </section>

        <hr />

        <section>
          <h2>5. Payment and Subscriptions</h2>
          <p>
            Some features may require payment. Subscriptions renew automatically unless canceled. All
            fees are non-refundable unless stated otherwise.
          </p>
        </section>

        <hr />

        <section>
          <h2>6. Service Availability and Limitations</h2>
          <p>
            We aim for 24/7 availability but can't guarantee uptime. We may suspend or restrict access
            at any time.
          </p>
        </section>

        <hr />

        <section>
          <h2>7. Third-Party Services</h2>
          <p>
            FAQGrades may link to or integrate third-party platforms. We are not responsible for their
            terms or practices.
          </p>
        </section>

        <hr />

        <section>
          <h2>8. Disclaimers and Limitation of Liability</h2>
          <p>
            FAQGrades is provided “as is.” We do not guarantee content accuracy, access reliability,
            or compatibility with your goals. To the fullest extent of law, our liability is limited.
          </p>
        </section>

        <hr />

        <section>
          <h2>9. Dispute Resolution</h2>
          <p>
            All disputes shall be resolved via arbitration under Indian law, seated in Bhubaneswar,
            Odisha. Class actions and jury trials are waived.
          </p>
        </section>

        <hr />

        <section>
          <h2>10. Termination</h2>
          <p>
            We may suspend or terminate your access for violating these Terms. All user data and access
            will be revoked without refund.
          </p>
        </section>

        <hr />

        <section>
          <h2>11. Miscellaneous</h2>
          <ul>
            <li><strong>Entire Agreement:</strong> These Terms and our Privacy Policy are the full agreement.</li>
            <li><strong>Severability:</strong> If a part is invalid, the rest remain enforceable.</li>
            <li><strong>Force Majeure:</strong> We're not liable for issues beyond our control.</li>
          </ul>
        </section>

        <hr />

        <section>
          <h2>Contact Us</h2>
          <p>
            For any questions or feedback, reach out to us at:<br />
            📧 <strong>support@faqgrades.com</strong>
          </p>
        </section>
      </main>
    </div>
  );
};

export default TermsOfService;
