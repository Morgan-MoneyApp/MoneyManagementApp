import React from 'react';
import MoneyMarketAcct from '../components/MoneyMarketAcct';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import AccountBalances from '../components/AccountBalances';
import AccountNavigator from '../components/AccountNavigator';

const PageMoneyMarketAcct = () => {
  return (
    <div>
      <Navbar />
      <AccountNavigator />
      <MoneyMarketAcct />
      {/* <Footer /> */}
    </div>
  );
};

export default PageMoneyMarketAcct;
