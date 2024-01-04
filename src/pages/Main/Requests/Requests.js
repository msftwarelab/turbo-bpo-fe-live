import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import RequestList from './components/RequestList';

const Requests = () => {
  return (
    <Container className="my-3" fluid>
      <Nav variant="tabs" defaultActiveKey="/requests">
        <Nav.Item>
          <NavLink className="nav-link" to="/requests">
            Request
          </NavLink>
        </Nav.Item>
      </Nav>
      <div className="border-top-0 border p-3 bg-white">
        <RequestList />
      </div>
    </Container>
  );
};

export default Requests;
