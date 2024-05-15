import React from 'react';
import '../styles/homereverseinfo.css';
import HisChild from '../images/hispanickid.jpg';
import Graduation from '../images/graduation.jpg';
import WomanTrain from '../images/womantrain.jpg';
import NewCar from '../images/newcar.jpg';
import Uber from '../images/ubering.jpg';
import Stocks from '../images/stocks.jpg';

function SideBySideSections() {
  return (
    <div>
      {/* Side By Side */}
      <section id="RTsbs-1594">
        <div className="cs-container">
          <div className="cs-image-group">
            {/* Top left image */}
            <picture className="cs-picture cs-picture1">
              {/* Mobile Image */}
              <source media="(max-width: 601px)" srcSet={HisChild} />
              {/* Tablet and above Image */}
              <source media="(min-width: 601px)" srcSet={HisChild} />
              <img loading="lazy" decoding="async" src={HisChild} alt="mechanic" width="413" height="500" />
            </picture>
            {/* Top Right image */}
            <picture className="cs-picture cs-picture2">
              {/* Mobile Image */}
              <source media="(max-width: 600px)" srcSet={Graduation} />
              {/* Tablet and above Image */}
              <source media="(min-width: 601px)" srcSet={Graduation} />
              <img loading="lazy" decoding="async" src={Graduation} alt="mechanic" width="413" height="280" />
            </picture>
          </div>
          <div className="cs-content">
            <span className="cs-topper">We Can Help</span>
            <h2 className="cs-title">Prepare For The Future</h2>
            <p className="cs-text">
              Investing in your child's future early on sets them up for success by providing financial stability when they graduate. By
              saving consistently, you can ensure they have the resources they need for higher education, starting a career, or pursuing
              their passions. Secure their future and watch them thrive with early financial planning.{' '}
            </p>
          </div>
        </div>
      </section>

      {/* Side By Side Reverse */}
      <section id="RTsbsr-1594">
        <div className="cs-container">
          <div className="cs-image-group">
            {/* Top left image */}
            <picture className="cs-picture cs-picture1">
              {/* Mobile Image */}
              <source media="(max-width: 600px)" srcSet={WomanTrain} />
              {/* Tablet and above Image */}
              <source media="(min-width: 601px)" srcSet={WomanTrain} />
              <img loading="lazy" decoding="async" src={WomanTrain} alt="mechanic" width="413" height="500" />
            </picture>
            {/* Top Right image */}
            <picture className="cs-picture cs-picture2">
              {/* Mobile Image */}
              <source media="(max-width: 600px)" srcSet={NewCar} />
              {/* Tablet and above Image */}
              <source media="(min-width: 601px)" srcSet={NewCar} />
              <img loading="lazy" decoding="async" src={NewCar} alt="mechanic" width="413" height="280" />
            </picture>
          </div>
          <div className="cs-content">
            <span className="cs-topper">We Can Help</span>
            <h2 className="cs-title">With That Next Purchase</h2>
            <p className="cs-text">
              Open a checking account today to streamline your next purchase and manage your finances with ease. With convenient access to
              your funds, you can make purchases confidently, whether it's for a new car, a dream vacation, or everyday essentials. Say
              goodbye to hassle and hello to convenience by opening a checking account now.{' '}
            </p>
          </div>
        </div>
      </section>
      {/* Side By Side Triplet */}
      <section id="RTsbst-1594">
        <div className="cs-container">
          <div className="cs-image-group">
            {/* Top left image */}
            <picture className="cs-picture cs-picture1">
              {/* Mobile Image */}
              <source media="(max-width: 600px)" srcSet={Uber} />
              {/* Tablet and above Image */}
              <source media="(min-width: 601px)" srcSet={Uber} />
              <img loading="lazy" decoding="async" src={Uber} alt="mechanic" width="413" height="500" />
            </picture>
            {/* Top Right image */}
            <picture className="cs-picture cs-picture2">
              {/* Mobile Image */}
              <source media="(max-width: 600px)" srcSet={Stocks} />
              {/* Tablet and above Image */}
              <source media="(min-width: 601px)" srcSet={Stocks} />
              <img loading="lazy" decoding="async" src={Stocks} alt="mechanic" width="413" height="280" />
            </picture>
          </div>
          <div className="cs-content">
            <span className="cs-topper">We Can Help</span>
            <h2 className="cs-title">You Benefit From Our Money Market</h2>
            <p className="cs-text">
              Enjoy the benefits of both checking and savings accounts. Our Market Account provides higher interest rates, allowing for both
              investment growth and flexible access to your funds.{' '}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SideBySideSections;
