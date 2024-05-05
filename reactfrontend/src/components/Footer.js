import React from 'react';
import '../styles/footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section about-us">
        <h4>About Us</h4>
        <a href="#team">Meet the team</a>
      </div>
      <div className="footer-section contact-us">
        <h4>Contact Us</h4>
        <p>contact@morganbank.com</p>
        <p>(123) 456-7890</p>
        <p>123 Banking St, Finance City</p>
      </div>
      <div className="footer-section social-media">
        <h4>Follow Us</h4>
        <div className="social-media-icons">
          {' '}
          {/* New container for icons */}
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
