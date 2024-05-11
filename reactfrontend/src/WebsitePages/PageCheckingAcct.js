import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TransactionChecking from '../components/TransactionChecking';
import AccountBalances from '../components/AccountBalances';

const PageCheckingAcct = () => {
  return (
    <div>
      <Navbar />
      <AccountBalances />
      <TransactionChecking />
      <Footer />
    </div>
  );
};

export default PageCheckingAcct;
