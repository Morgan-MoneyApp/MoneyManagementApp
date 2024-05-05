import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/loginbox.css';
import BankServicesImage from '../images/bank-services.jpeg'; // Import an image representing bank services

const Welcome = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup'); // Path should match the Route path for SignUp
  };

  const handleLogin = () => {
    navigate('/accounts'); // Adjust this path to match the Route path for the Accounts page
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
          <form action="" className="login-form">
            <div className="username-login">
              <input type="text" id="username" name="username" required placeholder="Username"></input>
            </div>
            <div className="password-login">
              <input type="password" id="password" name="password" required placeholder="Password"></input>
            </div>
            <button onClick={handleLogin} className="login-button" type="submit">
              Login
            </button>
            <br></br>
            <button onClick={handleSignUp} className="signup-button" type="submit">
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
