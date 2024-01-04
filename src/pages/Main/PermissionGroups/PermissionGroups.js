import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Container } from 'react-bootstrap';
import NewPermissionGroup from './components/NewPermissionGroup';
import PermissionGroupList from './components/PermissionGroupList';
import Search from './components/Search';

const PermissionGroups = () => {
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
  return (
    <Container className="my-3" fluid>
      <Nav variant="tabs" defaultActiveKey="/permission-groups">
        <Nav.Item>
          <NavLink className="nav-link" to="/permission-groups">
            Permission groups
          </NavLink>
        </Nav.Item>
      </Nav>
      <div className="border-top-0 border p-3 bg-white">
        <div className="mb-3 d-flex">
          <div className="mr-2">
            <NewPermissionGroup filter={filter} />
          </div>
          <Search
            filter={filter}
            onSearch={handleFilter}
            onReset={handleFilter}
          />
        </div>
        <PermissionGroupList filter={filter} onChangeFilter={handleFilter} />
      </div>
    </Container>
  );
};

export default PermissionGroups;
