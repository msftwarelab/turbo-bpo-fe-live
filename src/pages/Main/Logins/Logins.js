import React, { useState } from 'react';
import { Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import Pagination from 'components/Pagination';
import DateRangeFilter from 'components/DateRangeFilter';
import ALL_LOGIN_LOG from 'queries/allLoginLog';
import LoginsTable from './components/LoginsTable';
import UserFilter from './components/UserFilter';

const UserList = () => {
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
  });
  const { loading, error, data = {} } = useQuery(ALL_LOGIN_LOG, {
    variables: {
      filter,
    },
    fetchPolicy: 'network-only',
  });
  if (error) cogoToast.error(setErrorMessage(error));
  const handleFilter = async e => {
    setFilter({
      ...filter,
      offset: e.selected * filter.limit,
    });
  };
  const handleDateFilter = dates => {
    setFilter({
      ...filter,
      ...dates,
    });
  };
  const handleUserFilter = id => {
    setFilter({
      ...filter,
      id,
    });
  };
  const { allLoginLog = {} } = data;
  const { totalCount = 0, results = [] } = allLoginLog;
  const pageCount = Math.ceil(totalCount / filter.limit);
  return (
    <Container className="my-3" fluid>
      <Nav variant="tabs" defaultActiveKey="/logins">
        <Nav.Item>
          <NavLink className="nav-link" to="/logins">
            Logins
          </NavLink>
        </Nav.Item>
      </Nav>
      <div className="border-top-0 border p-3 bg-white">
      <div className="mb-2">
          <UserFilter onSelect={handleUserFilter} />
        </div>
        <div className="mb-3">
          <DateRangeFilter onChange={handleDateFilter} />
        </div>
        <LoginsTable loading={loading} data={results} filter={filter} />
        {results && results.length ? (
          <Pagination
            pageCount={pageCount}
            onPageChange={handleFilter}
            currentPage={filter.offset / filter.limit}
          />
        ) : null}
      </div>
    </Container>
  );
};

export default UserList;
