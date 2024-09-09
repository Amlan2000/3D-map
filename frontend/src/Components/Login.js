// import React from 'react';
// import './Login.css';
// import SnaptrudeLogo from "./Images/snap.svg"
// import GoogleLogo from "./Images/google.jpg"

// function Login() {
//   const googleAuth = () => {
//     window.open(
//       `${process.env.REACT_APP_API_URL}/auth/google/callback`,
//       "_self"
//     );
//   };

//   return (
//     <div className="login-container">

//       <img
//         src={SnaptrudeLogo}
//         alt="Snaptrude Logo"
//         className="snaptrude-logo"
//       />
//       <h4 className="login-heading">Login to Your Account</h4>
//       <button className="google-button" onClick={googleAuth}>
//         <img
//           src={GoogleLogo}
//           alt="Google Sign-In"
//           className="google-icon"
//         />
//         Sign in with Google
//       </button>
//     </div>
//   );
// }

// export default Login;

// Login.js
import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, formData);
      localStorage.setItem('token', data.token);
      alert('Login successful');
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" onChange={handleChange} placeholder="Email" />
      <input name="password" onChange={handleChange} type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
