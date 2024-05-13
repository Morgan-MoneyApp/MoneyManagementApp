import React, { useRef } from 'react';
import WelcomeLanding from '../components/WelcomeLanding';
import WelcomeLoginRegister from '../components/WelcomeLoginRegister';
import Footer from '../components/Footer';
import WelcomeNavbar from '../components/WelcomeNavbar';
import '../styles/pagewelcome.css';
import PictureCollage from '../components/PictureCollage';
import ChatBox from '../components/ChatBox';
import Homereversese from '../components/HomeReverseInfo';
import News from '../components/News';
import Mission from '../components/Mission';

const PageWelcome = () => {
  const loginRef = useRef(null);

  return (
    <div className="page-container">
      <WelcomeNavbar />
      <WelcomeLanding scrollToLogin={() => loginRef.current?.scrollIntoView({ behavior: 'smooth' })} />
      <div className="main-container">
        <PictureCollage />
        <ChatBox />
        <WelcomeLoginRegister loginRef={loginRef} />
        {/* <Homereversese/>
        <News/>
        <Mission/> */}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default PageWelcome;
