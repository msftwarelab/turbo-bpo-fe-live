import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import ReviewList from './components/ReviewList';

const Reviewers = () => {
  return (
    <Container className="my-3" fluid>
      <Nav variant="tabs" defaultActiveKey="/reviews">
        <Nav.Item>
          <NavLink className="nav-link" to="/reviews">
            Reviews
          </NavLink>
        </Nav.Item>
      </Nav>
      <div className="border-top-0 border p-3 bg-white">
        <ReviewList />
      </div>
    </Container>
  );
};

export default Reviewers;
