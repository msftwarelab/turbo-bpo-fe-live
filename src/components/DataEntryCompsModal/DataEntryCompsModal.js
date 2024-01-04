import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Modal, Table } from 'react-bootstrap';
import setErrorMessage from 'utils/setErrorMessage';
import { useMe } from 'contexts/Me';
import Pagination from 'components/Pagination';
import AddDataEntryComps from 'components/AddDataEntryComps';
import ALL_PIPELINE_COMPARABLE from 'queries/allPipelineComparable';

const DataEntryCompsModal = ({ show = false, pipelineId, onHide = e => e }) => {
  const { me } = useMe();
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 6,
  });
  const { loading, error, data = {} } = useQuery(ALL_PIPELINE_COMPARABLE, {
    variables: { pipelineId, filter },
  });
  const handleFilter = async e => {
    setFilter({
      ...filter,
      offset: e.selected * filter.limit,
    });
  };
  const renderError = (
    <tr>
      <td colSpan="2">{setErrorMessage(error)}</td>
    </tr>
  );
  const { allPipelineComparable = {} } = data;
  const { totalCount = 0, results = [] } = allPipelineComparable;
  const pageCount = Math.ceil(totalCount / filter.limit);
  let num = 0;
  const renderRow = loading ? (
    <tr>
      <td colSpan={6} className="text-center">
        loading...
      </td>
    </tr>
  ) : results.length ? (
    results
      .sort((a, b) => a.order - b.order)
      .map((item, indx) => {
        if (num >= 3) num = 0;
        num += 1;
        return (
          <tr key={item.id}>
            <td>{item.mls}</td>
            <td>
              {item.status} MLS{num}
            </td>
          </tr>
        );
      })
  ) : (
    <tr>
      <td colSpan={6} className="text-center">
        No data yet...
      </td>
    </tr>
  );
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Comparables</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-2">
          {!me.roles.includes('CONTRACTOR') && (
            <AddDataEntryComps
              filter={filter}
              pipelineId={pipelineId}
              pipelineComparables={results}
            />
          )}
        </div>
        <Table bordered striped hover size="sm">
          <thead>
            <tr>
              <th>MLS Number</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{error ? renderError : renderRow}</tbody>
        </Table>
        {results && results.length ? (
          <Pagination
            pageCount={pageCount}
            onPageChange={handleFilter}
            currentPage={filter.offset / filter.limit}
          />
        ) : null}
      </Modal.Body>
    </Modal>
  );
};

export default DataEntryCompsModal;
