import React from 'react';

function Login() {
  const googleAuth = () => {
		window.open(
			`${process.env.REACT_APP_API_URL}/auth/google/callback`,
			"_self"
		);
	};

  return (
    <div style={styles.container}>
      <h2>Login to Your Account</h2>
      <button style={styles.googleButton} onClick={googleAuth}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
          alt="Google Sign-In"
          style={styles.googleIcon}
        />
        Sign in with Google
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f7f7f7',
  },
  googleButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#4285F4',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  googleIcon: {
    marginRight: '10px',
    width: '20px',
    height: '20px',
  },
};

export default Login;