import React, { useState } from 'react';
import '../styles/deposit.css'; // Make sure the path is correct

function Deposit({ onClose }) {
  const [accountType, setAccountType] = useState('');
  const [amount, setAmount] = useState('');
  const [balances, setBalances] = useState({
    checking: 1200, // Example balance for checking account
    savings: 1500, // Example balance for savings account
    moneyMarket: 1800, // Example balance for money market account
  });

  const handleSubmit = event => {
    event.preventDefault();
    console.log(`Deposit to ${accountType} amount ${amount}`);
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
              <option value="checking">Checking Account (${balances.checking})</option>
              <option value="savings">Savings Account (${balances.savings})</option>
              <option value="moneyMarket">Money Market Account (${balances.moneyMarket})</option>
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

export default Deposit;
