import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/WelcomeFooter';
import TransactionChecking from '../components/TransactionChecking';

const PageCheckingAcct = () => {
  return (
    <div>
      <Navbar />
      <TransactionChecking />
      <Footer />
    </div>
  );
};

export default PageCheckingAcct;
