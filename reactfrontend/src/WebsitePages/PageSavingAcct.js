import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TransactionSaving from '../components/TransactionSaving';
import AccountBalances from '../components/AccountBalances';
import AccountNavigator from '../components/AccountNavigator';
import SavingsTracker from '../components/SavingTracker';

const PageSavingAcct = () => {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content-expand">
        <AccountNavigator />
        {/* <SavingsTracker /> */}
        <TransactionSaving />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default PageSavingAcct;
