import React from 'react';
import '../styles/welcomenavbar.css';
import LogoNoBg from '../images/logoandname.png';

function WelcomeNavbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <img src={LogoNoBg} alt="Logo" className="navbar-logo" />
      </div>
    </nav>
  );
}
export default WelcomeNavbar;
