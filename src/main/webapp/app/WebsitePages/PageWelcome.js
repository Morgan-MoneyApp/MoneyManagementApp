import React from 'react';
import Navbar from '../components/Navbar';
import LoginBox from '../components/LoginBox';
import Footer from '../components/Footer';
import ChatBox from '../components/ChatBox';

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
