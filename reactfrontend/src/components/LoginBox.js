import React from 'react';
import '../styles/loginbox.css';
import Logo from '../images/logo.png';

const Welcome = () => {
  return (
    <div className="login-container">
      <form action="" className="login-form">
        <img src={Logo} className="logo-image" />
        <div className="username-login">
          <input type="text" id="username" name="username" required placeholder="Username"></input>
        </div>
        <div className="password-login">
          <input type="password" id="password" name="password" required placeholder="Password"></input>
        </div>
        <button className="login-button" type="submit">
          Login
        </button>
        <br></br>
        <button className="signup-button" type="submit">
          Sign Up
        </button>
        <p>Forgot Password?</p>
      </form>
    </div>
  );
};

export default Welcome;
