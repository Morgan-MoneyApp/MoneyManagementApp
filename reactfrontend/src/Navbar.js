import React from 'react';
import './styles/navbar.css';
import LogoNoBg from './images/logonobk.png';

function Navbar({ savings = 1000, checking = 500 }) {
  // example balances
  return (
    <nav className="navbar">
      <img src={LogoNoBg} alt="Logo" className="navbar-logo" />
      <ul className="nav-list">
        <li className="nav-item">Home</li>
        <li className="nav-item">Accounts</li>
        <li className="nav-item">Transactions</li>
        <li className="nav-item">Meet the team!</li>
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
