import React, { useState } from 'react';
import { Form, Table } from 'react-bootstrap';
import { useQuery } from '@apollo/react-hooks';
import ALL_ACCOUNT from 'queries/allAccount';
import Pagination from 'components/Pagination';
import setErrorMessage from 'utils/setErrorMessage';

const UserCompanyList = ({ userId, selected = [], onSelected = e => e }) => {
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
    userId,
  });
  const { loading, error, data = {} } = useQuery(ALL_ACCOUNT, {
    variables: {
      filter,
    },
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

  const handleAllSelected = () => {
    let newSelected = [...selected];
    if (results.some(item => selected.includes(item.id))) {
      newSelected = newSelected.filter(selectedId =>
        results.includes(item => selectedId === item.id)
      );
    } else {
      newSelected = [...newSelected, ...results.map(item => item.id)];
    }
    onSelected(newSelected);
  };

  const handleSelected = e => {
    let newSelected = [...selected, e.id];
    if (selected.includes(e.id)) {
      newSelected = selected.filter(item => item !== e.id);
    }
    onSelected(newSelected);
  };
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                checked={results.every(item => selected.includes(item.id))}
                onClick={handleAllSelected}
              />
            </th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={2} className="text-center">
                loading...
              </td>
            </tr>
          ) : results.length ? (
            results.map(item => (
              <tr key={item.id}>
                <td>
                  <Form.Group>
                    <Form.Check
                      type="checkbox"
                      checked={selected.includes(item.id)}
                      onChange={() => handleSelected(item)}
                    />
                  </Form.Group>
                </td>
                <td>{item.company}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="text-center">
                No data yet...
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {results && results.length ? (
        <Pagination
          pageCount={pageCount}
          onPageChange={handleFilter}
          currentPage={filter.offset / filter.limit}
        />
      ) : null}
    </>
  );
};

export default UserCompanyList;
