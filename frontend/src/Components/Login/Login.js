import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      // Check if login was successful (status code 200 or another)
      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("token", result.token);
        console.log(result);
        navigate("/map");
      } else {
        // Handle invalid credentials or other errors
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Login failed");
      }

    } catch (error) {
      console.log(error.message);
      setErrorMessage("An error occurred while logging in.");
    } finally {
      setLoading(false); // Set loading to false
      setFormData({
        email: "",
        password: ""
      });
    }
  };

  return (
    <div className="center-form">
      <Form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="dark" type="submit" className="w-100" disabled={loading}>
          {loading ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              <span className="sr-only">Loading...</span>
            </>
          ) : (
            "Login"
          )}
        </Button>
      </Form>
    </div>
  );
};

export default Login;
