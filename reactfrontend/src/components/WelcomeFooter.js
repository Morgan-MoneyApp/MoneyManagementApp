import React from 'react';
import '../styles/WelcomeFooter.css'; // Ensure the CSS is updated accordingly

const WelcomeFooter = () => {
  return (
    <footer className="animated-footer">
      <div className="footer-content">
        <div className="social-links">
          <a href="http://twitter.com" target="_blank" rel="noopener noreferrer" className="twitter-icon">
            {/* Inline SVG for Twitter Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-twitter"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
            </svg>
          </a>
          <a href="http://facebook.com" target="_blank" rel="noopener noreferrer" className="facebook-icon">
            {/* Inline SVG for Facebook Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-facebook"
            >
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a2 2 0 011-1.73A2 2 0 0115 7v3h4z"></path>
            </svg>
          </a>
          <a href="http://instagram.com" target="_blank" rel="noopener noreferrer" className="instagram-icon">
            {/* Inline SVG for Instagram Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-instagram"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1012.5 8 4 4 0 0016 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
        </div>
        <div className="contact-section">
          <p>Email: contact@morganbank.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
      </div>
    </footer>
  );
};

export default WelcomeFooter;
