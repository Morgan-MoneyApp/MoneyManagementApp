import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SideBySide from './PictureCollage';
import Footer from './Footer';
import WelcomeNavbar from './WelcomeNavbar';

function CarouselComponent() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      <WelcomeNavbar />

      <div>
        <SideBySide />
      </div>

      <Footer />
    </div>
  );
}

export default CarouselComponent;
