import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/WelcomeFooter';
import TransactionSaving from '../components/TransactionSaving';

const PageSavingAcct = () => {
  return (
    <div>
      <Navbar />
      <TransactionSaving />
      <Footer />
    </div>
  );
};

export default PageSavingAcct;
