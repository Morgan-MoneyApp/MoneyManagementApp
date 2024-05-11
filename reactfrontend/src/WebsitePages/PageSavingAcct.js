import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TransactionSaving from '../components/TransactionSaving';
import AccountBalances from '../components/AccountBalances';

const PageSavingAcct = () => {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content-expand">
        <AccountBalances />
        <TransactionSaving />
      </div>
      <Footer />
    </div>
  );
};

export default PageSavingAcct;
