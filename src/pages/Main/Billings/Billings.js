import React, { useState } from 'react';
import { useMe } from 'contexts/Me';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import BillingsList from './components/BillingsList';
import AddBilling from './components/AddBilling';
import Search from './components/Search';
import { StyledContainer } from './styles';

const Billings = () => {
  const { me } = useMe();
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
  });
  const handleFilter = newFilter => setFilter(newFilter);
  return (
    <StyledContainer className="my-3" fluid>
      <Nav variant="tabs" defaultActiveKey="/billing">
        <Nav.Item>
          <NavLink className="nav-link" to="/billing">
            Billing
          </NavLink>
        </Nav.Item>
      </Nav>
      <div className="border-top-0 border p-3 bg-white content-wrapper">
        <div className="mb-3 d-flex">
          {me.permissionList.includes('ADD_BILLING') && (
            <div className="mr-2">
              <AddBilling filter={filter} />
            </div>
          )}
          {me.permissionList.includes('SEARCH_BILLING') && (
            <Search
              filter={filter}
              onSearch={handleFilter}
              onReset={handleFilter}
            />
          )}
        </div>
        <BillingsList filter={filter} onChangeFilter={handleFilter} />
      </div>
    </StyledContainer>
  );
};

export default Billings;
