import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Error = () => {
  return (
    <Container className="my-3" fluid>
      <Nav variant="tabs" defaultActiveKey="/">
        <Nav.Item>
          <NavLink className="nav-link" to="/">
            Error
          </NavLink>
        </Nav.Item>
      </Nav>
      <div className="border-top-0 border p-5 bg-white text-center">
        <h1>404</h1>
        <h3>PAGE NOT FOUND</h3>
        <div>
          This page you are looking for might have been removed <br /> had its
          name changed or is temporary unavailable
        </div>
      </div>
    </Container>
  );
};

export default Error;
