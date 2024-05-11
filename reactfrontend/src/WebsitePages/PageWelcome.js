import React, { useRef } from 'react';
import WelcomeLanding from '../components/WelcomeLanding';
import WelcomeLoginRegister from '../components/WelcomeLoginRegister';
import Footer from '../components/Footer';
import WelcomeNavbar from '../components/WelcomeNavbar';
import '../styles/pagewelcome.css';
import PictureCollage from '../components/PictureCollage';

const PageWelcome = () => {
  const loginRef = useRef(null);

  return (
    <div className="page-container">
      <WelcomeNavbar />
      <WelcomeLanding scrollToLogin={() => loginRef.current?.scrollIntoView({ behavior: 'smooth' })} />
      <div className="main-container">
        <PictureCollage />
        <WelcomeLoginRegister loginRef={loginRef} />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default PageWelcome;
