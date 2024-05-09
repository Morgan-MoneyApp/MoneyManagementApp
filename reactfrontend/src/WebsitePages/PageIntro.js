import React from 'react';
import HeroSection from '../components/HeroSection';
import { SideBySide, SideBySideReverse, SideBySideTriplet } from '../components/Side';
import WelcomeFooter from '../components/WelcomeFooter';
import WelcomeNavbar from '../components/WelcomeNavbar';

const PageIntro = () => {
  return (
    <div>
      <WelcomeNavbar />
      <HeroSection />
      <SideBySide />
      <SideBySideReverse />
      <SideBySideTriplet />
      <WelcomeFooter />
    </div>
  );
};

export default PageIntro;
