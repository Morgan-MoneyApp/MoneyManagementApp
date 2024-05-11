import React from 'react';
import MoneyMarketAcct from '../components/MoneyMarketAcct';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import AccountBalances from '../components/AccountBalances';

const PageMoneyMarketAcct = () => {
  return (
    <div>
      <Navbar />
      <AccountBalances />
      <MoneyMarketAcct />
      <Footer />
    </div>
  );
};

export default PageMoneyMarketAcct;
