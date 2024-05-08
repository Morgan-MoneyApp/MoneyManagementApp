import React from 'react';
import LoginBox from '../components/LoginBox';
import WelcomeFooter from '../components/WelcomeFooter';
import ChatBox from '../components/ChatBox';
import WelcomeNavbar from '../components/WelcomeNavbar';

const PageWelcome = () => {
  return (
    <div>
      <WelcomeNavbar />
      <LoginBox />
      <WelcomeFooter />
      <ChatBox />
    </div>
  );
};

export default PageWelcome;
