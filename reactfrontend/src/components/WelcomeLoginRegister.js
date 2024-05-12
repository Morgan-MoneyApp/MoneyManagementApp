import React, { useState } from 'react';
import '../styles/welcomeloginregister.css';
import Womangroup from '../images/womangrouplaughing.jpg';
import Manbuying from '../images/buying.jpg';
import Transaction from '../images/transaction.jpg';
import Savinggirl from '../images/savinggirl.jpg';
import Familyhouse from '../images/housefamily.jpg';

import { useNavigate } from 'react-router-dom';
import { login2, register } from '../utils/authUtils';

const WelcomeLoginRegister = ({ loginRef }) => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    house: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = e => {
    e.preventDefault();
    let un = e.target[0].value;
    let pw = e.target[1].value;
    // Non-dummy login function
    if (login2({ username: un, password: pw }, true)) {
      navigate('/accounts');
    } else {
      navigate('/');
    }
  };

  const handleSignUp = e => {
    register(formData);
    // console.log(formData);
    // alert('Account Created!');
    navigate('/accounts');
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <section id="RTsbs-415" className="cs-container">
      <div ref={loginRef} className="login-container">
        {isLogin ? (
          <>
            <h2 className="h2">Member Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
              <input className="input-field" type="text" id="username" name="username" required placeholder="Username" />
              <input className="input-field" type="password" id="password" name="password" required placeholder="Password" />
              <button className="cs-button-solid" type="submit">
                Login
              </button>
              <button className="cs-button-solid" onClick={toggleForm} type="button">
                Sign Up
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="h2">New User Registration</h2>
            <form className="login-form" onSubmit={handleSignUp}>
              <input
                className="input-field"
                type="text"
                name="userName"
                placeholder="Username"
                value={formData.userName}
                onChange={handleChange}
                required
              />
              <input
                className="input-field"
                type="text"
                name="firstNamepassword"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                className="input-field"
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                className="input-field"
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <input
                className="input-field"
                type="date"
                name="dob"
                placeholder="Date of Birth"
                value={formData.dob}
                onChange={handleChange}
                required
              />
              <input
                className="input-field"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                className="input-field"
                type="text"
                name="house"
                placeholder="House Number"
                value={formData.house}
                onChange={handleChange}
                required
              />
              <input
                className="input-field"
                type="text"
                name="street"
                placeholder="Street"
                value={formData.street}
                onChange={handleChange}
                required
              />
              <input
                className="input-field"
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
              />
              <input
                className="input-field"
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                required
              />
              <input
                className="input-field"
                type="text"
                name="zipcode"
                placeholder="Zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                required
              />
              <button className="cs-button-solid" type="submit">
                Create Account
              </button>
              <button className="cs-button-solid" onClick={toggleForm} type="button">
                Back to Login
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default WelcomeLoginRegister;
