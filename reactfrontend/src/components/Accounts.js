import React from 'react';
import '../styles/accounts.css';
import { useNavigate } from 'react-router-dom';

function Accounts() {
  const navigate = useNavigate();

  // Direct navigation functions for each account type
  const goToChecking = () => {
    navigate('/checking'); // Navigate directly to the checking account route
  };

  const goToSavings = () => {
    navigate('/saving'); // Navigate directly to the savings account route
  };

  const accounts = {
    checking: {
      balance: 1500, // example checking account balance
      onClick: goToChecking, // Assign direct function for checking
    },
    savings: {
      balance: 3000, // example savings account balance
      onClick: goToSavings, // Assign direct function for savings
    },
  };

  return (
    <div className="outer-div">
      <h1>Account Balances</h1>
      <div className="accounts-container">
        {Object.entries(accounts).map(([key, { balance, onClick }]) => (
          <div key={key} className="account-card">
            <h2>{key.charAt(0).toUpperCase() + key.slice(1)} Account</h2>
            <p>Balance: ${balance}</p>
            <button className="account-button" onClick={onClick}>
              Go to {key.charAt(0).toUpperCase() + key.slice(1)} Account
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Accounts;
