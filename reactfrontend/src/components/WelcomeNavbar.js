import React from 'react';
import '../styles/welcomenavbar.css';
import Logo from '../images/logowhite.png';

function WelcomeNavbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <img src={Logo} alt="Logo" className="navbar-logo" />
      </div>
    </nav>
  );
}
export default WelcomeNavbar;
