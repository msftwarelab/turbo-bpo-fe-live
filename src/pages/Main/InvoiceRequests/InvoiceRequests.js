import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import InvoiceList from './components/InvoiceList';

const InvoiceRequests = () => {
  return (
    <Container className="my-3" fluid>
      <Nav variant="tabs" defaultActiveKey="/invoice-requests">
        <Nav.Item>
          <NavLink className="nav-link" to="/invoice-requests">
            Invoice Requests
          </NavLink>
        </Nav.Item>
      </Nav>
      <div className="border-top-0 border p-3 bg-white">
        <InvoiceList />
      </div>
    </Container>
  );
};

export default InvoiceRequests;
