import React from 'react';
import Pagination from 'components/Pagination';
import removeNull from 'utils/removeNull';
import { Table } from 'react-bootstrap';
import ALL_CREDIT_LEDGER from 'queries/allCreditLedger';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import setErrorMessage from 'utils/setErrorMessage';
import cogoToast from 'cogo-toast';
import { shape, func } from 'prop-types';

const CreditList = ({ filter, onChangeFilter }) => {
  const { loading, error, data = {} } = useQuery(ALL_CREDIT_LEDGER, {
    variables: {
      filter: removeNull(filter),
    },
  });

  if (error) cogoToast.error(setErrorMessage(error));
  const { allCreditLedger = {} } = data;
  const { totalCount = 0, results = [] } = allCreditLedger;
  const pageCount = Math.ceil(totalCount / filter.limit);

  const renderLoading = (
    <tr>
      <td colSpan={16} className="text-center">
        loading...
      </td>
    </tr>
  );

  const renderRow = results.length ? (
    results.map(item => (
      <tr key={item.id}>
        <td>{item.type}</td>
        <td>{item.orderNumber}</td>
        <td>{item.orderAddress}</td>
        <td>{moment(item.createdDateTime).format('MMM DD YYYY, hh:mm A')}</td>
        <td className="text-right">{item.amount}</td>
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Type</th>
            <th>Order No.</th>
            <th style={{ width: '50%' }}>Address</th>
            <th>Date</th>
            <th className="text-right">Total</th>
          </tr>
        </thead>
        <tbody>{loading ? renderLoading : renderRow}</tbody>
      </Table>
      {results && results.length ? (
        <Pagination
          pageCount={pageCount}
          onPageChange={onChangeFilter}
          currentPage={filter.offset / filter.limit}
        />
      ) : null}
    </>
  );
};

CreditList.propTypes = {
  filter: shape({}),
  onChangeFilter: func,
};

CreditList.defaultProps = {
  filter: {},
  onChangeFilter: e => e,
};

export default CreditList;
