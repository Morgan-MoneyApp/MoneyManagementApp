import React from 'react';
import { Link } from 'react-router-dom';
import './styles/navbar.css';
import LogoNoBg from './images/logonobk.png';

function Navbar({ savings = 1000, checking = 500 }) {
  // example balances
  return (
    <nav className="navbar">
      <img src={LogoNoBg} alt="Logo" className="navbar-logo" />
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/accounts">Accounts</Link>
        </li>
        <li className="nav-item">
          <Link to="/tracker">Tracker</Link>
        </li>
        <li className="nav-item">
          <Link to="/team">Meet The Team</Link>
        </li>
        <li className="nav-item">
          <Link to="/register">Sign Up</Link>
        </li>
      </ul>
      <div className="account-info">
        <span>
          Savings: ${savings} | Checking: ${checking}
        </span>
      </div>
      <div className="nav-item logout-button">
        <button onClick={() => console.log('Logging out...')}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
