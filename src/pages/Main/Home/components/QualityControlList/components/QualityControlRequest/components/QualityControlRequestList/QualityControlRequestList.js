import React, { useState } from 'react';
import setErrorMessage from 'utils/setErrorMessage';
import removeNull from 'utils/removeNull';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import Pagination from 'components/Pagination';
import ChangeQCType from 'components/ChangeQCType';
import QualityControlAccept from 'components/QualityControlAccept';
import QualityControlCancel from 'components/QualityControlCancel';
import QualityControlsRequestModal from 'components/QualityControlsRequestModal';
import { Form } from 'react-bootstrap';

import ALL_QC_REQUEST from 'queries/allQcRequest';
import DateRangeFilter from 'components/DateRangeFilter';
import QCRequestNotesModal from 'components/QCRequestNotesModal';
import QualityControlRequestSearch from 'components/QualityControlRequestSearch';

import { StyledTable } from './styles';

const QualityControlRequestList = () => {
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
    dateFrom: null,
    qcAssignee: null,
    dateTo: null,
    status: ['PENDING'],
  });

  const { loading, error, data = {}, refetch } = useQuery(ALL_QC_REQUEST, {
    variables: {
      filter: {
        ...removeNull(filter),
        status: filter.status.length ? filter.status : undefined,
      },
    },
  });

  if (error) return <div>{setErrorMessage(error)}</div>;

  const { allQcRequest = {} } = data;
  const { results = [], totalCount = 0 } = allQcRequest;
  const pageCount = Math.ceil(totalCount / filter.limit);

  const handleFilter = async e => {
    const newFilter = {
      ...filter,
      offset: e.selected * filter.limit,
    };
    setFilter(newFilter);
  };

  const handleDateFilter = e => {
    setFilter({
      ...filter,
      ...e,
    });
  };

  const handleSearch = newFilter => {
    setFilter({
      ...filter,
      ...newFilter,
    });
  };

  const handleCheckbox = async e => {
    let { status } = filter;

    if (status.includes(e)) {
      status = status.filter(item => item !== e);
    } else {
      status.push(e);
    }
    await setFilter({
      ...filter,
      status,
    });
    await refetch();
  };

  const renderLoading = (
    <tr>
      <td colSpan={12} className="text-center">
        loading...
      </td>
    </tr>
  );
  const renderRow = results.length ? (
    results.map(item => (
      <tr key={item.id}>
        <td>
          <a href="#/">{item.orderNumber}</a>
        </td>
        <td>{item.address}</td>
        <td>{item.company}</td>
        <td>{item.type}</td>
        <td>
          <QualityControlsRequestModal
            pipeline={item}
            pipelineFilter={filter}
          />
        </td>
        <td>
          <QCRequestNotesModal qcRequest={item} qcRequestFilter={filter} />
        </td>
        <td>{item.orderAssignee}</td>
        <td>{item.qcAssignee}</td>
        <td>{item.status}</td>
        <td>{moment(item.requestDate).format('MMM DD YYYY, hh:mm A')}</td>
        <td>
          <ChangeQCType qcRequest={item} filter={filter} />
        </td>
        <td>
          {item.requestType !== 'DATA_DISCREPANCY' ||
          item.status !== 'COMPLETE' ? (
            <div className="d-flex">
              <div className="mr-2">
                <QualityControlAccept
                  filter={filter}
                  qualityControl={item}
                  onAccept={() => refetch()}
                />
              </div>
              <QualityControlCancel
                filter={filter}
                qualityControl={item}
                onCancel={() => refetch()}
              />
            </div>
          ) : null}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={12} className="text-center">
        No data yet...
      </td>
    </tr>
  );

  return (
    <>
      <div className="d-flex align-items-center mb-3">
        <div className="mr-auto d-flex">
          <DateRangeFilter onChange={handleDateFilter} />
          <div className="ml-3">
            <QualityControlRequestSearch
              filter={filter}
              onSearch={handleSearch}
              onReset={handleSearch}
            />
          </div>
        </div>
        <div>
          <Form.Check
            inline
            label="Pending"
            type="checkbox"
            checked={filter.status.includes('PENDING')}
            onChange={() => handleCheckbox('PENDING')}
          />
          <Form.Check
            inline
            label="Approved"
            type="checkbox"
            checked={filter.status.includes('COMPLETE')}
            onChange={() => handleCheckbox('COMPLETE')}
          />
          <Form.Check
            inline
            label="DD"
            type="checkbox"
            checked={filter.status.includes('DD')}
            onChange={() => handleCheckbox('DD')}
          />
        </div>
      </div>
      <StyledTable bordered hover>
        <thead>
          <tr>
            <th className="text-center">Order No.</th>
            <th className="text-center">Address</th>
            <th className="text-center">Company</th>
            <th className="text-center">Type</th>
            <th className="text-center">QC</th>
            <th className="text-center">Notes</th>
            <th className="text-center">Order Assignee</th>
            <th className="text-center">QC Assignee</th>
            <th className="text-center">Status</th>
            <th className="text-center">Request Date</th>
            <th className="text-center">QC Type</th>
            <th className="text-center">Accept</th>
          </tr>
        </thead>
        <tbody>{loading ? renderLoading : renderRow}</tbody>
      </StyledTable>
      <div className="d-flex justify-content-end">
        <div className="my-2 mr-3">
          displaying {filter.offset + 1}-
          {totalCount >= filter.offset + filter.limit
            ? filter.offset + filter.limit
            : totalCount}{' '}
          of {totalCount}
        </div>
        <div>
          {results && results.length ? (
            <Pagination
              pageCount={pageCount}
              onPageChange={handleFilter}
              currentPage={filter.offset / filter.limit}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default QualityControlRequestList;
