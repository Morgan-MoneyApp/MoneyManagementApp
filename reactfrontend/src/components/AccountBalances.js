import React from 'react';
import '../styles/accountbalances.css'; // Ensure you have corresponding styles

function AccountBalances() {
  const accounts = {
    checking: {
      balance: 1500,
    },
    savings: {
      balance: 3000,
    },
    market: {
      balance: 5000,
    },
  };

  return (
    <div className="outer-div">
      <div className="content-div">
        <p className="welcome">Welcome to your balance overview!</p>
        <p>Here you can quickly view your account balances. This overview provides a snapshot of your finances at a glance.</p>
      </div>
      <div className="accounts-container">
        {Object.entries(accounts).map(([key, { balance }]) => (
          <div key={key} className="account-card">
            <h2>{key.charAt(0).toUpperCase() + key.slice(1)} Account</h2>
            <p>Balance: ${balance.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccountBalances;
