import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import InvoiceList from './components/InvoiceList';

const Invoices = () => {
  return (
    <Container className="my-3" fluid>
      <Nav variant="tabs" defaultActiveKey="/invoices">
        <Nav.Item>
          <NavLink className="nav-link" to="/invoices">
            Invoices
          </NavLink>
        </Nav.Item>
      </Nav>
      <div className="border-top-0 border p-3 bg-white">
        <InvoiceList />
      </div>
    </Container>
  );
};

export default Invoices;
