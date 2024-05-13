import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TransactionChecking from '../components/TransactionChecking';
import AccountNavigator from '../components/AccountNavigator';

const PageCheckingAcct = () => {
  return (
    <div>
      <Navbar />
      <AccountNavigator />
      <TransactionChecking />
      {/* <Footer /> */}
    </div>
  );
};

export default PageCheckingAcct;
