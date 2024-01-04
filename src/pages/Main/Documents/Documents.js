import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Nav } from 'react-bootstrap';
import DocumentList from './components/DocumentList';

const Documents = () => {
  return (
    <Container className="my-3" fluid>
      <Nav variant="tabs" defaultActiveKey="/documents">
        <Nav.Item>
          <NavLink className="nav-link text-dark" to="/documents">
            Documents
          </NavLink>
        </Nav.Item>
      </Nav>
      <div className="border-top-0 border p-3 bg-white">
        <DocumentList />
      </div>
    </Container>
  );
};

export default Documents;
