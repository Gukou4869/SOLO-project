import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import Food from "./Food";
import Contact from "./contact";

const Navber = () => {
  const [nav, setNav] = useState("home");

  const toggleSetting = () => {
    if (nav === "home") {
      return <Food />;
    } else {
      return <Contact />;
    }
  };

  const handleChangeToSetting = () => {
    if (nav === "home") {
      setNav("setting");
    }
  };

  const handleChangeToHome = () => {
    setNav("home");
  };

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">CCs!</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home" onClick={handleChangeToHome}>
            Home
          </Nav.Link>
          <Nav.Link href="#Setting" onClick={handleChangeToSetting}>
            Setting
          </Nav.Link>
        </Nav>
      </Navbar>
      {toggleSetting()}
    </>
  );
};

export default Navber;
