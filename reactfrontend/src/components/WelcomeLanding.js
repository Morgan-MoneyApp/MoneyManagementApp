import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/welcomelanding.css';
import Grouplaptop from '../images/grouplaptop1.png';
import PiggyIcon from '../images/piggyicon.png';
import Checking from '../images/checking.png';
import Market from '../images/market.png';

const WelcomeLanding = ({ scrollToLogin }) => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/welcome');
  };

  return (
    <section id="hero-1618">
      <div className="cs-container">
        <div className="cs-content">
          <span className="cs-topper">
            <p className="welcometo">Welcome to</p>
          </span>
          <h1 className="cs-title">Morgan Bank</h1>
          <button onClick={scrollToLogin} className="cs-button-solid">
            LOGIN
          </button>
        </div>
        <ul className="cs-card-group">
          <li className="cs-item">
            <img className="cs-icon" loading="lazy" decoding="async" src={Checking} alt="icon" width="48" height="48" />
            <h3 className="cs-h3">Checking Account</h3>
            <p className="cs-item-text">
              Ideal for everyday transactions, your checking account allows for easy deposits and withdrawals, making it perfect for
              managing daily expenses.
            </p>
          </li>
          <li className="cs-item">
            <img className="cs-icon" loading="lazy" decoding="async" src={PiggyIcon} alt="icon" width="48" height="48" />
            <h3 className="cs-h3">Savings Account</h3>
            <p className="cs-item-text">
              Grow your funds safely with our Savings Account. It offers a secure way to accumulate interest on your savings, helping you
              reach your financial goals.
            </p>
          </li>
          <li className="cs-item">
            <img className="cs-icon" loading="lazy" decoding="async" src={Market} alt="icon" width="48" height="48" />
            <h3 className="cs-h3">Market Account</h3>
            <p className="cs-item-text">
              Enjoy the benefits of both checking and savings accounts. Our Market Account provides higher interest rates, allowing for both
              investment growth and flexible access to your funds.
            </p>
          </li>
        </ul>
      </div>
      {/* Background Image */}
      <picture className="cs-background">
        <source media="(max-width: 600px)" srcSet={Grouplaptop} />
        <source media="(min-width: 601px)" srcSet={Grouplaptop} />
        <img decoding="async" src={Grouplaptop} alt="meeting" width="2250" height="1500" aria-hidden="true" />
      </picture>
    </section>
  );
};
export default WelcomeLanding;
