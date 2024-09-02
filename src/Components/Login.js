import React from 'react';
import './Login.css';
import SnaptrudeLogo from "./Images/snap.svg"
import GoogleLogo from "./Images/google.jpg"

function Login() {
  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google/callback`,
      "_self"
    );
  };

  return (
    <div className="login-container">

      <img
        src={SnaptrudeLogo}
        alt="Snaptrude Logo"
        className="snaptrude-logo"
      />
      <h4 className="login-heading">Login to Your Account</h4>
      <button className="google-button" onClick={googleAuth}>
        <img
          src={GoogleLogo}
          alt="Google Sign-In"
          className="google-icon"
        />
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;
