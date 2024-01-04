import React, { useState } from 'react';
import moment from 'moment';
import { Table } from 'react-bootstrap';
import UserSelect from 'components/UserSelect';
import Pagination from 'components/Pagination';
import CompanySelect from 'components/CompanySelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import QualityControlHistory from 'components/QualityControlHistory';
import setCurrency from 'utils/setCurrency';

import setErrorMessage from 'utils/setErrorMessage';
import removeNull from 'utils/removeNull';
import { useQuery } from '@apollo/react-hooks';

import ALL_QC_HISTORY from 'queries/allQcHistory';
import DateRangeFilter from 'components/DateRangeFilter';

import PipelineNotesModal from 'components/PipelineNotesModal';
import ProcessPipelineModal from 'components/ProcessPipelineModal';
import PipelineQualityControlsModal from 'components/PipelineQualityControlsModal';
import PipelineDocsModal from 'components/PipelineDocsModal';
import PipelinePhotosModal from 'components/PipelinePhotosModal';

const QualityControlHistoryList = () => {
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
    dateFrom: null,
    dateTo: null,
    status: [],
    qrcId: null,
    clientId: null,
    companyId: null,
  });
  const { loading, error, data = {} } = useQuery(ALL_QC_HISTORY, {
    variables: {
      filter: {
        ...removeNull(filter),
        status: filter.status.length ? filter.status : undefined,
      },
    },
  });
  if (error) return <div>{setErrorMessage(error)}</div>;
  const { allQcHistory = {} } = data;
  const { results = [], totalCount = 0 } = allQcHistory;
  const pageCount = Math.ceil(totalCount / filter.limit);

  const handlePageFilter = e => {
    setFilter({
      ...filter,
      offset: e.selected * filter.limit,
    });
  };

  const handleDateFilter = e => {
    setFilter({
      ...filter,
      ...e,
    });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const handleUser = (name, value) => {
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  return (
    <>
      <div className="d-flex align-items-center mb-3">
        <DateRangeFilter onChange={handleDateFilter} />
        <div className="mx-2">QCR:</div>
        <div style={{ width: 150 }}>
          <UserSelect
            value={filter.qrcId}
            onChange={val => handleUser('qrcId', val)}
            userRoles={['QUALITY_CONTROL']}
          />
        </div>
        <div className="mx-2">Client:</div>
        <div style={{ width: 150 }}>
          <UserSelect
            value={filter.clientId}
            onChange={val => handleUser('clientId', val)}
          />
        </div>
        <div className="mx-2">Company:</div>
        <CompanySelect
          value={filter.companyId}
          name="companyId"
          style={{ width: 150 }}
          onChange={handleChange}
        />
      </div>
      <Table bordered hover>
        <thead>
          <tr>
            <th className="text-center">Order No.</th>
            <th className="text-center">Address</th>
            <th className="text-center">Company</th>
            <th className="text-center">Assigned/Due date</th>
            <th className="text-center">Status</th>
            <th className="text-center">Fee</th>
            <th className="text-center">QC</th>
            <th className="text-center">Process</th>
            <th className="text-center">Notes</th>
            <th className="text-center">Docs</th>
            <th className="text-center">Photos</th>
            <th className="text-center">iForm</th>
            <th className="text-center">History</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={13} className="text-center">
                loading...
              </td>
            </tr>
          ) : results.length ? (
            results.map(item => (
              <tr key={item.id}>
                <td>
                  <a href="#/">{item.orderNumber}</a>
                </td>
                <td>{item.address}</td>
                <td>{item.company}</td>
                <td>
                  {moment(item.createdDateTime).format('MMM DD YYYY, hh:mm A')}
                  <br />
                  {item.assign}
                </td>
                <td>{item.status}</td>
                <td>{setCurrency('USD', item.orderFee, 2)}</td>
                <td>
                  <PipelineQualityControlsModal pipeline={item} />
                </td>
                <td>
                  <ProcessPipelineModal pipeline={item} />
                </td>
                <td>
                  <PipelineNotesModal pipeline={item} />
                </td>
                <td>
                  <PipelineDocsModal pipeline={item} />
                </td>
                <td>
                  <PipelinePhotosModal pipeline={item} />
                </td>
                <td>
                  <a href="#/">
                    <FontAwesomeIcon icon={faFile} />
                  </a>
                </td>
                <td>
                  <QualityControlHistory data={item.qcHistory} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={13} className="text-center">
                No data yet...
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {results && results.length ? (
        <Pagination
          pageCount={pageCount}
          onPageChange={handlePageFilter}
          currentPage={filter.offset / filter.limit}
        />
      ) : null}
    </>
  );
};

export default QualityControlHistoryList;
