import React from 'react'
// import {Navbar,Container,Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';


const Header = () => {
  return (
   <>
   <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/login" >Login</Nav.Link>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>

          </Nav>
        </Container>
      </Navbar>
   </>
  )
}

export default Header
