import React from 'react';
import '../styles/footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import logo from '../images/logowhite.png'; // Ensure the logo image is in the correct path

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <img src={logo} alt="Company Logo" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
          <div className="footer-col right-align">
            <h4>company</h4>
            <ul>
              <li>
                <a href="#">about us</a>
              </li>
              <li>
                <a href="#">our services</a>
              </li>
            </ul>
          </div>
          <div className="footer-col right-align">
            <h4>contact us</h4>
            <ul>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Other</a>
              </li>
            </ul>
          </div>
          <div className="footer-col right-align">
            <h4>follow us</h4>
            <div className="social-links">
              <a href="#">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
