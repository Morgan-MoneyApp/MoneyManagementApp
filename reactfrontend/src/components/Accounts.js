import React, { useState } from 'react';
import '../styles/accounts.css';

function Accounts() {
  const accounts = {
    checking: {
      balance: 1500, // example checking account balance
    },
    savings: {
      balance: 3000, // example savings account balance
    },
  };

  const [selectedAccount, setSelectedAccount] = useState(null); // Store the selected account

  const handleSelectAccount = accountType => {
    setSelectedAccount(accountType); // Set the selected account
  };

  return (
    <div className="outer-div">
      <h1>Account Balances</h1>
      <div className="accounts-container">
        {Object.entries(accounts).map(([key, { balance }]) => (
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
