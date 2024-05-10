import React, { useState } from 'react';

function Transfer({ onClose }) {
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');

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
              <option value="checking">Checking</option>
              <option value="savings">Savings</option>
              <option value="moneyMarket">Money Market</option>
            </select>
          </label>
          <label>
            To:
            <select value={toAccount} onChange={e => setToAccount(e.target.value)}>
              <option value="checking">Checking</option>
              <option value="savings">Savings</option>
              <option value="moneyMarket">Money Market</option>
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
