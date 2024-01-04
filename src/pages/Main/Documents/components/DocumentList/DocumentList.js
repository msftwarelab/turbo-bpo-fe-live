import React, { useState } from 'react';
import moment from 'moment';
import { useQuery } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import Pagination from 'components/Pagination';
import { Table } from 'react-bootstrap';
import { useMe } from 'contexts/Me';
import AddDocument from '../AddDocument';
import DeleteDocument from '../DeleteDocument';
import { ALL_INSTRUCTION } from './queries';

const DocumentList = () => {
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
  });
  const { loading, error, data = {} } = useQuery(ALL_INSTRUCTION, {
    variables: {
      filter,
    },
  });
  const { me } = useMe();

  if (error) cogoToast.error(setErrorMessage(error));
  const handleFilter = e => {
    setFilter({
      ...filter,
      offset: e.selected * filter.limit,
    });
  };

  const { allInstruction = {} } = data;
  const { totalCount = 0, results = [] } = allInstruction;
  const pageCount = Math.ceil(totalCount / filter.limit);
  return (
    <>
      {me.permissionList.includes('ADD_DOCUMENT') && (
        <div className="mb-3">
          <AddDocument filter={filter} />
        </div>
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>File</th>
            <th>Client</th>
            <th>Company</th>
            <th>Document Tag</th>
            <th>Comments</th>
            <th>Created At</th>
            <th style={{ width: '10%' }} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={8} className="text-center">
                loading...
              </td>
            </tr>
          ) : results.length ? (
            results.map(item => (
              <tr key={item.id}>
                <td>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.fileName}
                  </a>
                </td>
                <td>{item.client}</td>
                <td>{item.company}</td>
                <td>{item.tag}</td>
                <td>{item.comments}</td>
                <td>
                  {moment(item.createdDateTime).format('MMM DD YYYY, hh:mm A')}
                </td>
                <td className="text-center">
                  <DeleteDocument filter={filter} instruction={item} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center">
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

export default DocumentList;
