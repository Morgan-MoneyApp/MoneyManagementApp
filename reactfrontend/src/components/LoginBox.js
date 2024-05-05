import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/loginbox.css'; // Ensure this path is correct
import BankServicesImage from '../images/bank-services.jpeg';

const Welcome = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/accounts');
  };

  return (
    <div className="welcome-container">
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <div className="content-container">
        <div className="services-section">
          <img src={BankServicesImage} alt="Bank Services" className="services-image" />
          <h2>Explore Our Services</h2>
          <p>Balance inquiries, fund transfers, transaction history, savings tracking, and more—all at your fingertips.</p>
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
      </div>
    </div>
  );
};

export default Welcome;
