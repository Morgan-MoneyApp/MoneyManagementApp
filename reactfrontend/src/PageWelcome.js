import React from 'react';
import Navbar from './Navbar';
import LoginBox from './LoginBox';
import Footer from './Footer';
import ChatBox from './ChatBox';

const PageWelcome = () => {
  return (
    <div>
      <Navbar />
      <LoginBox />
      <ChatBox />
      <Footer />
    </div>
  );
};

export default PageWelcome;
