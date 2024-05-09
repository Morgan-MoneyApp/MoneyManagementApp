import React from 'react';
import LoginBox from '../components/LoginBox';
import WelcomeFooter from '../components/WelcomeFooter';
import JChatBox from '../components/JChatBox';
import ChatBox from '../components/ChatBox';
import WelcomeNavbar from '../components/WelcomeNavbar';

const PageWelcome = () => {
  return (
    <div>
      <WelcomeNavbar />
      <LoginBox />
      <WelcomeFooter />
      <JChatBox />
      <ChatBox />
    </div>
  );
};

export default PageWelcome;
