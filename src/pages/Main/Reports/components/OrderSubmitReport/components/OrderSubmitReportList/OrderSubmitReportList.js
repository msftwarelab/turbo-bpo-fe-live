import React from 'react';
import OrderSubmitReportTable from './components/OrderSubmitReportTable';

const OrderSubmitReportList = ({ loading, results }) => {
  return (
    <OrderSubmitReportTable loading={loading} data={results} />
  );
};

export default OrderSubmitReportList;
