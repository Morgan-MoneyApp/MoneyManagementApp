import React from 'react';
import LoginBox from '../components/LoginBox';
import WelcomeFooter from '../components/WelcomeFooter';
import JChatBox from '../components/JChatBox';
import WelcomeNavbar from '../components/WelcomeNavbar';

const PageWelcome = () => {
  return (
    <div>
      <WelcomeNavbar />
      <LoginBox />
      <WelcomeFooter />
      <JChatBox />
    </div>
  );
};

export default PageWelcome;
