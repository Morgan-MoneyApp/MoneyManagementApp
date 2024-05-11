import React, { useState } from 'react';
import '../styles/withdraw.css'; // Ensure you have corresponding styles for Withdraw

function Withdraw({ onClose }) {
  const [accountType, setAccountType] = useState('');
  const [amount, setAmount] = useState('');

  // Example balances for accounts
  const accountBalances = {
    checking: 1000, // balance in checking account
    savings: 500, // balance in savings account
    moneyMarket: 1500, // balance in money market account
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(`Withdraw from ${accountType} amount ${amount}`);
    onClose(); // Close the modal after submitting
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          <label>
            Account Type:
            <select value={accountType} onChange={e => setAccountType(e.target.value)}>
              <option value="">Select Account</option>
              <option value="checking">Checking (${accountBalances.checking})</option>
              <option value="savings">Savings (${accountBalances.savings})</option>
              <option value="moneyMarket">Money Market (${accountBalances.moneyMarket})</option>
            </select>
          </label>
          <label>
            Amount:
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
          </label>
          <button type="submit">Submit Transaction</button>
        </form>
      </div>
    </div>
  );
}

export default Withdraw;
