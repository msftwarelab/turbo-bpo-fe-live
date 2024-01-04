import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Nav } from 'react-bootstrap';
import { useMe } from 'contexts/Me';
import CreditList from './components/CreditList';
import CreditBalance from './components/CreditBalance';
import CreditCheckout from './components/CreditCheckout';
import { StyledContainer } from './styles';

const Credits = () => {
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
  });
  const handleFilter = e => {
    setFilter({
      ...filter,
      offset: e.selected * filter.limit,
    });
  };
  const { me } = useMe();
  return (
    <StyledContainer className="my-3" fluid>
      <Nav variant="tabs" defaultActiveKey="/credits">
        <Nav.Item>
          <NavLink className="nav-link" to="/credits">
            Credits
          </NavLink>
        </Nav.Item>
      </Nav>
      <div className="border-top-0 border p-3 bg-white content-wrapper">
        <Row>
          <Col>
            <CreditList filter={filter} onChangeFilter={handleFilter} />
          </Col>
          {!me.roles.includes('ADMIN') && (
            <Col>
              <CreditBalance />
              <CreditCheckout filter={filter} onChangeFilter={handleFilter} />
            </Col>
          )}
        </Row>
      </div>
    </StyledContainer>
  );
};

export default Credits;
