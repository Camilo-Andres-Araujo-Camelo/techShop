import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import phoneStoreLogo from '../assets/phoneStoreLogo.png'

const NavBar = () => {

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img className="logoImg" src={phoneStoreLogo} alt="logoImg" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/login"><i className="fa-solid fa-right-to-bracket"></i> Login</Nav.Link>
            <Nav.Link as={Link} to="/purchases"><i className="fa-solid fa-bag-shopping"></i> My shopping</Nav.Link>
            <Nav.Link as={Link} to="/globalCart"><i className="fa-solid fa-cart-shopping"></i> Cart </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
