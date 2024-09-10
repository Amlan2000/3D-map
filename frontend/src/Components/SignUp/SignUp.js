import React, {useState} from "react";
import { Button, Form } from "react-bootstrap";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

  const navigate= useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });


const handleInputChange =(event)=>{
  const {name, value}= event.target;
  setFormData({
    ...formData,
    [name]:value

  })
}

const handleSubmit= async(e)=>{

  e.preventDefault();
  console.log("email",formData.email);
  console.log("name",formData.name);
  console.log("password",formData.password);

  try{
    const response = await fetch(`${process.env.REACT_CLIENT_API_URL}/user/register`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(formData)
    })
    const result= await response.json();
      console.log(result);
      navigate("/login")

  } catch(error){
      console.log(error.message);
  } finally{
    setFormData({
      email:"",
      name:"",
      password:""
    })
  }
}

  return (
    <div className="center-form">
      <Form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
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
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
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
        <Button variant="dark" type="submit" className="w-100">
          Sign Up
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;
