import React, { useState } from 'react';
import '../styles/accounts.css';
import { useNavigate } from 'react-router-dom';

function Accounts() {
  const navigate = useNavigate();

  const accounts = {
    checking: {
      balance: 1500, // example checking account balance
      onClick: () => navigate('/checking'), // Example route for signup
    },
    savings: {
      balance: 3000, // example savings account balance
      onClick: () => navigate('/saving'), // Example route for accounts management
    },
  };

  const [selectedAccount, setSelectedAccount] = useState(null); // Store the selected account

  const handleSelectAccount = accountType => {
    setSelectedAccount(accountType); // Set the selected account
    accounts[accountType].onClick(); // Invoke the click handler specific to the account
  };

  return (
    <div className="outer-div">
      <h1>Account Balances</h1>
      <div className="accounts-container">
        {Object.entries(accounts).map(([key, { balance, onClick }]) => (
          <div key={key} className="account-card">
            <h2>{key.charAt(0).toUpperCase() + key.slice(1)} Account</h2>
            <p>Balance: ${balance}</p>
            <button className="account-button" onClick={() => handleSelectAccount(key)}>
              Select {key.charAt(0).toUpperCase() + key.slice(1)} Account
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Accounts;
