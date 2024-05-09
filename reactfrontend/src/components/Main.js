import React from 'react';
import '../styles/JorrisCode.css';
import Womangroup from '../images/womangrouplaughing.jpg';
import Manbuying from '../images/buying.jpg';
import Transaction from '../images/transaction.jpg';
import Savinggirl from '../images/savinggirl.jpg';
import Wallet from '../images/wallet.jpg';
import Familyhouse from '../images/housefamily.jpg';
import Bankbuildings from '../images/bankbuildings.jpg';
import Websitemarket from '../images/websitemarket.jpg';
import Marketman from '../images/marketman.jpg';

const SideBySide = () => {
  return (
    <section id="RTsbs-415">
      <div className="cs-container">
        <div className="cs-content">
          <span className="cs-topper">Open</span>
          <h2 className="cs-title">Checking Account</h2>
          <p className="cs-text">
            Ideal for everyday transactions, your checking account allows for easy deposits and withdrawals, making it perfect for managing
            daily expenses.{' '}
          </p>
          <a href="" className="cs-button-solid">
            More About Us
          </a>
        </div>
        <div className="cs-image-group">
          <picture className="cs-picture cs-picture1">
            <source media="(max-width: 600px)" srcSet={Transaction} />
            <source media="(min-width: 601px)" srcSet={Transaction} />
            <img aria-hidden="true" loading="lazy" decoding="async" src={Transaction} alt="backyard" width="229" height="352" />
          </picture>
          <picture className="cs-picture cs-picture2">
            <source media="(max-width: 600px)" srcSet={Manbuying} />
            <source media="(min-width: 601px)" srcSet={Manbuying} />
            <img aria-hidden="true" loading="lazy" decoding="async" src={Manbuying} alt="backyard" width="390" height="352" />
          </picture>
          <picture className="cs-picture cs-picture3">
            <source media="(max-width: 600px)" srcSet={Womangroup} />
            <source media="(min-width: 601px)" srcSet={Womangroup} />
            <img aria-hidden="true" loading="lazy" decoding="async" src={Womangroup} alt="backyard" width="649" height="227" />
          </picture>
        </div>
      </div>
    </section>
  );
};
const SideBySideReverse = () => {
  return (
    <section id="RTsbsr-415">
      <div className="cs-container">
        <div className="cs-content">
          <span className="cs-topper">Open</span>
          <h2 className="cs-title">Savings Account</h2>
          <p className="cs-text">
            Grow your funds safely with our Savings Account. It offers a secure way to accumulate interest on your savings, helping you
            reach your financial goals.
          </p>
          <a href="" className="cs-button-solid">
            More About Us
          </a>
        </div>
        <div className="cs-image-group">
          <picture className="cs-picture cs-picture1">
            <source media="(max-width: 600px)" srcSet={Wallet} />
            <source media="(min-width: 601px)" srcSet={Wallet} />
            <img aria-hidden="true" loading="lazy" decoding="async" src={Wallet} alt="backyard" width="229" height="352" />
          </picture>
          <picture className="cs-picture cs-picture2">
            <source media="(max-width: 600px)" srcSet={Familyhouse} />
            <source media="(min-width: 601px)" srcSet={Familyhouse} />
            <img aria-hidden="true" loading="lazy" decoding="async" src={Familyhouse} alt="backyard" width="390" height="352" />
          </picture>
          <picture className="cs-picture cs-picture3">
            <source media="(max-width: 100px)" srcSet={Savinggirl} />
            <source media="(min-width: 100px)" srcSet={Savinggirl} />
            <img aria-hidden="true" loading="lazy" decoding="async" src={Savinggirl} alt="backyard" width="100" height="100" />
          </picture>
        </div>
      </div>
    </section>
  );
};
const SideBySideTriplet = () => {
  return (
    <section id="RTsbst-415">
      <div className="cs-container">
        <div className="cs-content">
          <span className="cs-topper">Open</span>
          <h2 className="cs-title">Money Market Account</h2>
          <p className="cs-text">
            Enjoy the benefits of both checking and savings accounts. Our Money Market Account provides higher interest rates, allowing for
            both investment growth and flexible access to your funds.
          </p>
          <a href="" className="cs-button-solid">
            More About Us
          </a>
        </div>
        <div className="cs-image-group">
          <picture className="cs-picture cs-picture1">
            <source media="(max-width: 600px)" srcSet={Bankbuildings} />
            <source media="(min-width: 601px)" srcSet={Bankbuildings} />
            <img aria-hidden="true" loading="lazy" decoding="async" src={Bankbuildings} alt="backyard" width="229" height="352" />
          </picture>
          <picture className="cs-picture cs-picture2">
            <source media="(max-width: 600px)" srcSet={Websitemarket} />
            <source media="(min-width: 601px)" srcSet={Websitemarket} />
            <img aria-hidden="true" loading="lazy" decoding="async" src={Websitemarket} alt="backyard" width="390" height="352" />
          </picture>
          <picture className="cs-picture cs-picture3">
            <source media="(max-width: 600px)" srcSet={Marketman} />
            <source media="(min-width: 601px)" srcSet={Marketman} />
            <img aria-hidden="true" loading="lazy" decoding="async" src={Marketman} alt="backyard" width="649" height="227" />
          </picture>
        </div>
      </div>
    </section>
  );
};
export { SideBySide, SideBySideReverse, SideBySideTriplet };
