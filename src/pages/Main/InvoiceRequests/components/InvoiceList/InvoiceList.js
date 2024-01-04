import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import moment from 'moment';
import removeNull from 'utils/removeNull';
import setErrorMessage from 'utils/setErrorMessage';
import cogoToast from 'cogo-toast';
import { useQuery } from '@apollo/react-hooks';
import Pagination from 'components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import DateRangeFilter from 'components/DateRangeFilter';
import ALL_INVOICE_REQUEST from 'queries/allInvoiceRequest';
import AddInvoiceRequest from 'components/AddInvoiceRequest';
import getBiWeek from 'utils/getBiWeek';
import EditInvoice from 'components/EditInvoice';
import InvoiceRequestHistory from 'components/InvoiceRequestHistory';
import qcTypeOptions from 'constants/qcTypeOptions';

const InvoiceList = () => {
  const getQCTypeOption = qcType => {
    return qcTypeOptions.find(option => option.value === qcType) || {};
  };

  const [filter, setFilter] = useState({
    dateFrom: getBiWeek().startDate,
    dateTo: getBiWeek().endDate,
    offset: 0,
    limit: 20,
  });
  const { loading, error, data = {} } = useQuery(ALL_INVOICE_REQUEST, {
    variables: {
      filter: removeNull(filter),
    },
  });
  if (error) cogoToast.error(setErrorMessage(error));
  const { allInvoiceRequest = {} } = data;
  const { totalCount = 0, results = [] } = allInvoiceRequest;
  const pageCount = Math.ceil(totalCount / filter.limit);

  const handleDateFilter = e => {
    setFilter({
      ...filter,
      ...e,
    });
  };

  const handleClearFilter = () => {
    setFilter({
      dateFrom: null,
      dateTo: null,
      employeeId: null,
    });
  };

  const renderLoading = (
    <tr>
      <td colSpan={16} className="text-center">
        loading...
      </td>
    </tr>
  );

  const handleFilter = async e => {
    setFilter({
      ...filter,
      offset: e.selected * filter.limit,
    });
  };

  const renderRow = results.length ? (
    results.map(item => (
      <tr key={item.id}>
        <td>{item.type}</td>
        <td>{moment(item.date).format('MMM DD YYYY, hh:mm A')}</td>
        <td>{item.orderNumber}</td>
        <td>{item.address}</td>
        <td>{item.company}</td>
        <td>{item.client}</td>
        <td>
          {item.type === 'QC'
            ? getQCTypeOption(item.qcType).label
            : item.orderType}
        </td>
        <td className="text-center">
          {item.isSuperRush ? (
            <FontAwesomeIcon icon={faCheck} className="text-success" />
          ) : (
            <FontAwesomeIcon icon={faTimes} className="text-danger" />
          )}
        </td>
        <td className="text-center">
          {item.isRush ? (
            <FontAwesomeIcon icon={faCheck} className="text-success" />
          ) : (
            <FontAwesomeIcon icon={faTimes} className="text-danger" />
          )}
        </td>
        <td className="text-center">
          {item.isInterior ? (
            <FontAwesomeIcon icon={faCheck} className="text-success" />
          ) : (
            <FontAwesomeIcon icon={faTimes} className="text-danger" />
          )}
        </td>
        <td className="text-center">
          {item.isRentalAddendum ? (
            <FontAwesomeIcon icon={faCheck} className="text-success" />
          ) : (
            <FontAwesomeIcon icon={faTimes} className="text-danger" />
          )}
        </td>
        <td className="text-center">
          {item.isInitialBpo ? (
            <FontAwesomeIcon icon={faCheck} className="text-success" />
          ) : (
            <FontAwesomeIcon icon={faTimes} className="text-danger" />
          )}
        </td>
        <td className="text-center">
          {item.isInspection ? (
            <FontAwesomeIcon icon={faCheck} className="text-success" />
          ) : (
            <FontAwesomeIcon icon={faTimes} className="text-danger" />
          )}
        </td>
        <td className="text-center">
          {item.isNoCsv ? (
            <FontAwesomeIcon icon={faCheck} className="text-success" />
          ) : (
            <FontAwesomeIcon icon={faTimes} className="text-danger" />
          )}
        </td>
        <td className="text-center">
          {item.isNoIFill ? (
            <FontAwesomeIcon icon={faCheck} className="text-success" />
          ) : (
            <FontAwesomeIcon icon={faTimes} className="text-danger" />
          )}
        </td>
        <td className="text-center">
          {item.isOtherPremium ? (
            <FontAwesomeIcon icon={faCheck} className="text-success" />
          ) : (
            <FontAwesomeIcon icon={faTimes} className="text-danger" />
          )}
        </td>
        <td>
          {item.type !== 'SUBMIT' && (
            <EditInvoice invoice={item} filter={removeNull(filter)} isRequest />
          )}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={16} className="text-center">
        No data yet...
      </td>
    </tr>
  );

  return (
    <>
      <div className="d-flex align-items-center mb-3">
        <div className="mr-2">
          <DateRangeFilter
            filter={{
              dateFrom: filter.dateFrom,
              dateTo: filter.dateTo,
            }}
            onChange={handleDateFilter}
          />
        </div>
        <div className="mr-auto">
          <Button onClick={handleClearFilter}>Clear</Button>
        </div>
        <div className="mr-2">
          <AddInvoiceRequest filter={filter} />
        </div>
        <div>
          <InvoiceRequestHistory />
        </div>
      </div>
      <div className="overflow-auto">
        <Table bordered hover>
          <thead>
            <tr>
              <th className="text-center">Type</th>
              <th className="text-center">Date</th>
              <th className="text-center">Order No.</th>
              <th className="text-center">Address</th>
              <th className="text-center">Company</th>
              <th className="text-center">Client</th>
              <th className="text-center">Order type</th>
              <th className="text-center">Super rush</th>
              <th className="text-center">Rush</th>
              <th className="text-center">Interior</th>
              <th className="text-center">Rental Addendum</th>
              <th className="text-center">Initial BPO</th>
              <th className="text-center">Inspection</th>
              <th className="text-center">No CSV</th>
              <th className="text-center">No iFill</th>
              <th className="text-center">Other Premium</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>{loading ? renderLoading : renderRow}</tbody>
        </Table>
        {results && results.length ? (
          <Pagination
            pageCount={pageCount}
            onPageChange={handleFilter}
            currentPage={filter.offset / filter.limit}
          />
        ) : null}
      </div>
    </>
  );
};

export default InvoiceList;
