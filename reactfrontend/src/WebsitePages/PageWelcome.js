import React from 'react';
import WelcomeLanding from '../components/WelcomeLanding';
import { SideBySide } from '../components/WelcomeServices';
import Footer from '../components/Footer';
import WelcomeNavbar from '../components/WelcomeNavbar';
import '../styles/pagewelcome.css'; // assuming your CSS is in styles.css

const PageWelcome = () => {
  return (
    <div className="page-container">
      <WelcomeNavbar />
      <WelcomeLanding />
      <SideBySide />
      <Footer />
    </div>
  );
};

export default PageWelcome;
