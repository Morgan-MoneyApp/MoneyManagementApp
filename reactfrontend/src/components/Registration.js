import React, { useState } from 'react';
import '../styles/registration.css'; // Ensure your CSS is set up to handle inline fields

function Registration() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    phoneNumber: '',
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

  const handleSubmit = e => {
    e.preventDefault();
    console.log(formData);
    alert('Account Created!');
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <h1>New User Registration:</h1>
      <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
      <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
      <input type="date" name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} required />
      <input
        type="tel"
        name="phoneNumber"
        placeholder="Phone Number"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        title="Enter a phone number in the format: 123-456-7890"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
      />
      <div className="inline-fields">
        <input type="text" name="house" placeholder="House Number" value={formData.house} onChange={handleChange} required />
        <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} required />
      </div>
      <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
      <div className="inline-fields">
        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
        <input type="text" name="zipcode" placeholder="Zipcode" value={formData.zipcode} onChange={handleChange} required />
      </div>
      <button type="submit">Create Account</button>
    </form>
  );
}

export default Registration;
