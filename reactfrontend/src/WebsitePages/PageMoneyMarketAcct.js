import React from 'react';
import MoneyMarketAcct from '../components/MoneyMarketAcct';
import Footer from '../components/WelcomeFooter';
import Navbar from '../components/Navbar';

const PageMoneyMarketAcct = () => {
  return (
    <div>
      <Navbar />
      <MoneyMarketAcct />
      <Footer />
    </div>
  );
};

export default PageMoneyMarketAcct;
