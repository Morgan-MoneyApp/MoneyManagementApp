import React from 'react';
import '../styles/footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section about-us">
        <h4>About Us</h4>
        <a href="#history">Our History</a>
        <a href="#mission">Our Mission</a>
        <a href="#team">Our Team</a>
      </div>
      <div className="footer-section contact-us">
        <h4>Contact Us</h4>
        <p>Email: info@yourbank.com</p>
        <p>Phone: (123) 456-7890</p>
        <p>Address: 123 Banking St, Finance City</p>
      </div>
      <div className="footer-section social-media">
        <h4>Follow Us</h4>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebookF} /> Facebook
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} /> Twitter
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} /> Instagram
        </a>
      </div>
    </footer>
  );
}

export default Footer;
