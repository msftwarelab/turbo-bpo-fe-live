import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Table } from 'react-bootstrap';
import { string } from 'prop-types';
import Pagination from 'components/Pagination';
import setErrorMessage from 'utils/setErrorMessage';
import ALL_ACCOUNT from 'queries/allAccount';
import ExportPasswords from 'components/ExportPasswords';

const Passwords = ({ userId, company }) => {
  const [filter, setFilter] = useState({
    userId,
    offset: 0,
    limit: 20,
  });
  const { loading, error, data = {} } = useQuery(ALL_ACCOUNT, {
    variables: { filter },
  });
  const handleFilter = async e => {
    setFilter({
      ...filter,
      offset: e.selected * filter.limit,
    });
  };
  if (error) return <div>{setErrorMessage(error)}</div>;
  if (loading) return <div>loading...</div>;
  const { allAccount = {} } = data;
  const { totalCount = 0, results = [] } = allAccount;
  const pageCount = Math.ceil(totalCount / filter.limit);

  const renderLoading = (
    <tr>
      <td colSpan={6} className="text-center">
        loading...
      </td>
    </tr>
  );
  const renderRow = results.length ? (
    results.map(item => (
      <tr key={item.id}>
        <td>{item.username}</td>
        <td>{item.password}</td>
        <td>{item.company}</td>
        <td>{item.webSite}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={6} className="text-center">
        No data yet...
      </td>
    </tr>
  );
  return (
    <div className="border-top-0 border p-3 bg-white">
      <div className="mb-3">
        <ExportPasswords data={results} company={company} />
      </div>
      <div className="overflow-auto">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Username</th>
              <th>Password</th>
              <th>Company</th>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>{loading ? renderLoading : renderRow}</tbody>
        </Table>
      </div>
      {results && results.length ? (
        <Pagination
          pageCount={pageCount}
          onPageChange={handleFilter}
          currentPage={filter.offset / filter.limit}
        />
      ) : null}
    </div>
  );
};

Passwords.defaultProps = {
  userId: null,
  company: null,
};

Passwords.propTypes = {
  userId: string,
  company: string,
};

export default Passwords;
