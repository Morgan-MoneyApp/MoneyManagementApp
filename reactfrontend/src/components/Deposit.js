import React, { useState, useEffect } from 'react';
import { getAccounts, makeTransaction } from '../utils/accUtils';
import '../styles/deposit.css'; // Make sure the path is correct

function Deposit({ onClose }) {
  const [accounts, setAccounts] = useState({
    checking: { balance: 0, id: 0 },
    savings: { balance: 0, id: 0 },
    moneyMarket: { balance: 0, id: 0 },
  });

  useEffect(() => {
    getAccounts().then(res => {
      setAccounts({
        checking: res[1],
        savings: res[2],
        moneyMarket: res[0],
      });
      setBalances({
        checking: accounts.checking.balance,
        savings: accounts.savings.balance,
        moneyMarket: accounts.moneyMarket.balance,
      });
    });
  });
  const [accountType, setAccountType] = useState('');
  const [amount, setAmount] = useState('');
  const [balances, setBalances] = useState({
    checking: 0, // Example balance for checking account
    savings: 0, // Example balance for savings account
    moneyMarket: 0, // Example balance for money market account
  });

  const handleSubmit = event => {
    event.preventDefault();
    console.log(`Deposit to ${accountType} amount ${amount}`);
    if (accountType === 'checking') {
      let account = accounts.checking;
      makeTransaction('deposit', { source: null, destination: account, amount: amount }).then(res => console.log(res));
    } else if (accountType === 'savings') {
      let account = accounts.savings;
      makeTransaction('deposit', { source: null, destination: account, amount: amount }).then(res => console.log(res));
    } else if (accountType === 'moneyMarket') {
      let account = accounts.moneyMarket;
      makeTransaction('deposit', { source: null, destination: account, amount: amount }).then(res => console.log(res));
    } else {
      console.error('Unexpected error');
    }

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
