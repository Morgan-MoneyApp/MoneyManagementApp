import React from 'react';
import WelcomeLanding from '../components/WelcomeLanding';
import { SideBySide } from '../components/WelcomeServices';
import WelcomeFooter from '../components/WelcomeFooter';
import WelcomeNavbar from '../components/WelcomeNavbar';
import HomeReverseInfo from '../components/HomeReverseInfo';
import News from '../components/News';
import Mission from '../components/Mission';
import '../styles/pagewelcome.css'; // assuming your CSS is in styles.css

const PageWelcome = () => {
  return (
    <div className="page-container">
      <WelcomeNavbar />
      <WelcomeLanding />
      <SideBySide />
      <HomeReverseInfo />
      <News />
      <Mission />
      <WelcomeFooter />
    </div>
  );
};

export default PageWelcome;
