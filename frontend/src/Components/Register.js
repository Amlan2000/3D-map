// Register.js
import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({ displayName: '', email: '', password: '' });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, formData);
      alert('Registration successful!');
    } catch (err) {
      console.error(err);
      alert('Error registering user');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="displayName" onChange={handleChange} placeholder="Name" />
      <input name="email" onChange={handleChange} placeholder="Email" />
      <input name="password" onChange={handleChange} type="password" placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
