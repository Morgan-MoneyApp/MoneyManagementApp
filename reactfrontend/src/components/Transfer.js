import React, { useEffect, useState } from 'react';
import '../styles/transfer.css';
import { getAccounts, makeTransaction } from '../utils/accUtils'; // Make sure the path is correct

function Transfer({ onClose }) {
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
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [balances, setBalances] = useState({
    checking: 0, // Example balance for checking account
    savings: 0, // Example balance for savings account
    moneyMarket: 0, // Example balance for money market account
  });

  // Example static balances for accounts
  // const accountBalances = {
  //   checking: 2000, // balance in checking account
  //   savings: 5000, // balance in savings account
  //   moneyMarket: 1500, // balance in money market account
  // };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(`Transfer from ${fromAccount} to ${toAccount} amount ${amount}`);
    let fromAcc, toAcc;
    if (fromAccount === 'checking') {
      fromAcc = accounts.checking;
    } else if (fromAccount === 'savings') {
      fromAcc = accounts.savings;
    } else if (fromAccount === 'moneyMarket') {
      fromAcc = accounts.moneyMarket;
    } else {
      console.error('Invalid source account');
      return;
    }
    if (toAccount === 'checking') {
      toAcc = accounts.checking;
      makeTransaction('transfer', { source: fromAcc, destination: toAcc, amount: amount }).then(res => console.log(res));
    } else if (toAccount === 'savings') {
      toAcc = accounts.savings;
      makeTransaction('transfer', { source: fromAcc, destination: toAcc, amount: amount }).then(res => console.log(res));
    } else if (toAccount === 'moneyMarket') {
      toAcc = accounts.moneyMarket;
      makeTransaction('transfer', { source: fromAcc, destination: toAcc, amount: amount }).then(res => console.log(res));
    } else {
      console.error('Invalid destination account');
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
            From:
            <select value={fromAccount} onChange={e => setFromAccount(e.target.value)}>
              <option value="">Select Account</option>
              <option value="checking">Checking (${balances.checking.toLocaleString()})</option>
              <option value="savings">Savings (${balances.savings.toLocaleString()})</option>
              <option value="moneyMarket">Money Market (${balances.moneyMarket.toLocaleString()})</option>
            </select>
          </label>
          <label>
            To:
            <select value={toAccount} onChange={e => setToAccount(e.target.value)}>
              <option value="">Select Account</option>
              <option value="checking">Checking (${balances.checking.toLocaleString()})</option>
              <option value="savings">Savings (${balances.savings.toLocaleString()})</option>
              <option value="moneyMarket">Money Market (${balances.moneyMarket.toLocaleString()})</option>
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
