import React, { useState } from 'react';
import '../styles/transactionchecking.css';
import Deposit from './Deposit.js';
import Withdraw from './Withdraw.js';
import Transfer from './Transfer.js';
import { getTransactions } from '../utils/accUtils';

function MoneyMarketAcct() {
  const [activeModal, setActiveModal] = useState('');

  const handleOpenModal = modalType => {
    setActiveModal(modalType);
  };

  const handleCloseModal = () => {
    setActiveModal('');
  };

  return (
    <div>
      <div className="button-container">
        <button onClick={() => handleOpenModal('deposit')}>Deposit</button>
        <button onClick={() => handleOpenModal('withdrawal')}>Withdrawal</button>
        <button onClick={() => handleOpenModal('transfer')}>Transfer</button>
      </div>
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
          <tr>
            <td>5/12/2024</td>
            <td>Money Market Account Transaction</td>
            <td>$20.00</td>
          </tr>
          {/* More rows */}
        </tbody>
      </table>
    </div>
  );
}

export default MoneyMarketAcct;
