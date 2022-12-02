import React, { useState } from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import phoneStoreLogo from "../assets/phoneStoreLogo.png";
import GlobalCart from "./GlobalCart";

const NavBar = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img className="logoImg" src={phoneStoreLogo} alt="logoImg" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/login">
                <i className="fa-solid fa-right-to-bracket"></i> Login
              </Nav.Link>
              <Nav.Link as={Link} to="/purchases">
                <i className="fa-solid fa-bag-shopping"></i> Purchases
              </Nav.Link>
              <Nav.Link onClick={handleShow}>
                <i className="fa-solid fa-cart-shopping"></i> Cart
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <GlobalCart show={show} handleClose={handleClose} />
    </>
  );
};

export default NavBar;
