import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import removeNull from 'utils/removeNull';
import setErrorMessage from 'utils/setErrorMessage';
import cogoToast from 'cogo-toast';
import { useQuery } from '@apollo/react-hooks';
import Pagination from 'components/Pagination';
import ALL_INVOICE_REQUEST_HISTORY from 'queries/allInvoiceRequestHistory';

const InvoiceRequestHistory = () => {
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
  });
  const { loading, error, data = {} } = useQuery(ALL_INVOICE_REQUEST_HISTORY, {
    variables: {
      filter: removeNull(filter),
    },
  });
  if (error) cogoToast.error(setErrorMessage(error));
  const { allInvoiceRequestHistory = {} } = data;
  const { totalCount = 0, results = [] } = allInvoiceRequestHistory;
  const pageCount = Math.ceil(totalCount / filter.limit);

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
        <td>{moment(item.dateRequested).format('MMM DD YYYY, hh:mm A')}</td>
        <td>{item.orderNumber}</td>
        <td>{item.address}</td>
        <td>{item.company}</td>
        <td>{item.remarks}</td>
        <td>{item.status}</td>
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
      <div className="overflow-auto">
        <Table bordered hover>
          <thead>
            <tr>
              <th className="text-center">Date Requested</th>
              <th className="text-center">Order No.</th>
              <th className="text-center">Address</th>
              <th className="text-center">Company</th>
              <th className="text-center">Remarks</th>
              <th className="text-center">Status</th>
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

export default InvoiceRequestHistory;
