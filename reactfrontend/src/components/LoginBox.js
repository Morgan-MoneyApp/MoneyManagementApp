import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/loginbox.css';
import BankServicesImage from '../images/bank-services.jpeg'; // Ensure this is the correct path

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
      <div className="content-container">
        <div className="services-section">
          <img src={BankServicesImage} alt="Bank Services" className="services-image" />
          <h2>Explore Our Services</h2>
          <p>Balance inquiries, fund transfers, transaction history, savings tracking, and more—all at your fingertips.</p>
        </div>
        <div className="login-container">
          <form className="login-form">
            <input type="text" id="username" name="username" required placeholder="Username" />
            <input type="password" id="password" name="password" required placeholder="Password" />
            <button onClick={handleLogin} className="login-button" type="button">
              Login
            </button>
            <button onClick={handleSignUp} className="signup-button" type="button">
              Sign Up
            </button>
            <p>Forgot Password?</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
