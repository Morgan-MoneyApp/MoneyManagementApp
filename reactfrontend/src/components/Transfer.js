import React, { useState } from 'react';
import '../styles/transfer.css'; // Make sure the path is correct

function Transfer({ onClose }) {
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');

  // Example static balances for accounts
  const accountBalances = {
    checking: 2000, // balance in checking account
    savings: 5000, // balance in savings account
    moneyMarket: 1500, // balance in money market account
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(`Transfer from ${fromAccount} to ${toAccount} amount ${amount}`);
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
            From:
            <select value={fromAccount} onChange={e => setFromAccount(e.target.value)}>
              <option value="">Select Account</option>
              <option value="checking">Checking (${accountBalances.checking.toLocaleString()})</option>
              <option value="savings">Savings (${accountBalances.savings.toLocaleString()})</option>
              <option value="moneyMarket">Money Market (${accountBalances.moneyMarket.toLocaleString()})</option>
            </select>
          </label>
          <label>
            To:
            <select value={toAccount} onChange={e => setToAccount(e.target.value)}>
              <option value="">Select Account</option>
              <option value="checking">Checking (${accountBalances.checking.toLocaleString()})</option>
              <option value="savings">Savings (${accountBalances.savings.toLocaleString()})</option>
              <option value="moneyMarket">Money Market (${accountBalances.moneyMarket.toLocaleString()})</option>
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

export default Transfer;
