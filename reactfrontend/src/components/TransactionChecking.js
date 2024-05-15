import React, { useState, useEffect } from 'react';
import '../styles/transactiontable.css'; // Ensure your CSS path is correct

import Deposit from './Deposit.js';
import Withdraw from './Withdraw.js';
import Transfer from './Transfer.js';
import { getTransactions, getAccounts } from '../utils/accUtils';

function TransactionChecking() {
  const [activeModal, setActiveModal] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const account = await getAccounts();
        const idToken = account[1].id;
        const transactionsData = await getTransactions(idToken);
        setTransactions(transactionsData);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const handleOpenModal = modalType => {
    setActiveModal(modalType);
  };

  const handleCloseModal = () => {
    setActiveModal('');
    window.location.reload(); // Rethink for better state management
  };

  return (
    <div className="transaction-container">
      <div className="button-container">
        <button onClick={() => handleOpenModal('deposit')}>Deposit</button>
        <button onClick={() => handleOpenModal('withdrawal')}>Withdrawal</button>
        <button onClick={() => handleOpenModal('transfer')}>Transfer</button>
      </div>
      <div className="transaction-table-container">
        {activeModal === 'deposit' && <Deposit onClose={handleCloseModal} />}
        {activeModal === 'withdrawal' && <Withdraw onClose={handleCloseModal} />}
        {activeModal === 'transfer' && <Transfer onClose={handleCloseModal} />}
        <table className="GeneratedTable">
          <thead>
            <tr>
              <th className="date-column">Date</th>
              <th className="description-column">Description</th>
              <th className="amount-column">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.transactionDate}</td>
                <td>{transaction.description}</td>
                <td style={{ color: transaction.transactionType === 'withdrawal' ? 'red' : 'black' }}>
                  {transaction.transactionType === 'withdrawal' ? `-${transaction.transactionValue}` : transaction.transactionValue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionChecking;
