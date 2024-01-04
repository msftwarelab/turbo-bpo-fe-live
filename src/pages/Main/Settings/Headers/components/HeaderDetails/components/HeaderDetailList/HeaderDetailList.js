import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Table } from 'react-bootstrap';
import Pagination from 'components/Pagination';
import setErrorMessage from 'utils/setErrorMessage';
import EditHeaderDetail from '../EditHeaderDetail';
import DeleteHeaderDetail from '../DeleteHeaderDetail';
import AddHeaderDetail from '../AddHeaderDetail';
import { ALL_HEADER_DETAIL } from './queries';

const HeaderDetailList = ({ headerId }) => {
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
  });
  const { loading, error, data = {} } = useQuery(ALL_HEADER_DETAIL, {
    variables: {
      parentId: headerId,
      filter,
    },
  });
  if (error) return <div>{setErrorMessage(error)}</div>;
  const handleFilter = e => {
    setFilter({
      ...filter,
      offset: e.selected * filter.limit,
    });
  };
  const { allHeaderDetail = {} } = data;
  const { totalCount = 0, results = [] } = allHeaderDetail;
  const pageCount = Math.ceil(totalCount / filter.limit);

  return (
    <>
      <div className="mb-3">
        <AddHeaderDetail headerId={headerId} filter={filter} />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th style={{ width: '15%' }} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="text-center">
                loading...
              </td>
            </tr>
          ) : results.length ? (
            results.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td className="text-center">
                  <EditHeaderDetail
                    header={item}
                    parentId={headerId}
                    filter={filter}
                  />{' '}
                  <DeleteHeaderDetail
                    header={item}
                    parentId={headerId}
                    filter={filter}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No data yet...
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <Pagination
        pageCount={pageCount}
        onPageChange={handleFilter}
        currentPage={filter.offset / filter.limit}
      />
    </>
  );
};

export default HeaderDetailList;
