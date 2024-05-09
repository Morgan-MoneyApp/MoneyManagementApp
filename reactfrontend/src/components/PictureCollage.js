import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/picturecollage.css'; // Ensure CSS path is correct
import '../styles/loginbox.css'; // Ensure CSS path is correct

import { login } from '../utils/authUtils';

import Womangroup from '../images/womangrouplaughing.jpg';
import Manbuying from '../images/buying.jpg';
import Transaction from '../images/transaction.jpg';
import Savinggirl from '../images/savinggirl.jpg';
import Familyhouse from '../images/housefamily.jpg';

const SideBySide = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    login('admin', 'admin', true);
    navigate('/accounts');
  };

  return (
    <section id="RTsbs-415" className="cs-container">
      <div className="cs-image-group">
        <picture className="cs-picture cs-picture1">
          <img aria-hidden="true" loading="lazy" decoding="async" src={Transaction} alt="Transaction process" />
        </picture>
        <picture className="cs-picture cs-picture2">
          <img aria-hidden="true" loading="lazy" decoding="async" src={Familyhouse} alt="Family house" />
        </picture>
        <picture className="cs-picture cs-picture3">
          <img aria-hidden="true" loading="lazy" decoding="async" src={Womangroup} alt="Women group laughing" />
        </picture>
      </div>
      <div className="login-container">
        <h2>Member Login</h2>
        <form className="login-form">
          <input type="text" id="username" name="username" required placeholder="Username" />
          <input type="password" id="password" name="password" required placeholder="Password" />
          <button onClick={handleLogin} className="login-button" type="button">
            Login
          </button>
          <button onClick={handleSignUp} className="signup-button" type="button">
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
};

export default SideBySide;
