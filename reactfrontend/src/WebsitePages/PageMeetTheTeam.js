import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Team from '../components/Team';
import IntroTeam from '../components/IntroTeam';

const PageMeetTheTeam = () => {
  return (
    <div>
      <Navbar />
      <IntroTeam />
      <Team />
      {/* <Footer /> */}
    </div>
  );
};

export default PageMeetTheTeam;
