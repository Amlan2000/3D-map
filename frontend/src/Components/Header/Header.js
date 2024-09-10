import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import "./Header.css"

const Header = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isMapPage = location.pathname === '/map'; // Check if current path is "/map"

  return (
    <>
      <Navbar bg={token ? "success" : "dark"} variant="dark">
        <Container>
          <Nav className="ml-auto">
            {!isMapPage && token && (
              <Nav.Link as={Link} to="/">
                Dashboard
              </Nav.Link>
            )}
            {token ? (
              <Nav.Link className="nav-link" onClick={handleLogout}>
                Logout
              </Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
