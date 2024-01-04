import React, { useState } from 'react';
import _ from 'lodash';
import { useQuery } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import OrderSubmitReportList from './components/OrderSubmitReportList';
import SelectYear from '../SelectYear';
import ALL_ORDER_SUBMIT from 'queries/allOrderSubmit';

const OrderSubmitReport = () => {
  const currentYear = new Date().getFullYear();

  const [filter, setFilter] = useState({
    year: currentYear,
  });

  const { loading, error, data = {} } = useQuery(ALL_ORDER_SUBMIT, {
    variables: {
      ...filter,
    },
  });

  const handleChange = e => {
    const { name, value } = e.target;

    setFilter({
      ...filter,
      [name]: parseInt(value),
    });
  };

  if (error) cogoToast.error(setErrorMessage(error));

  const { allOrderSubmit = {} } = data;

  const convertedData = _.chain(allOrderSubmit)
    .groupBy('coordinatorName')
    .map((value, key) => ({
      coordinatorName: key,
      months: [...Array(12)].map((_, key) => {
        const month = key + 1;
        const found = value.find(item => item.month === month);
        let count = found ? found.count : 0;
        return {
          month,
          count,
        };
      }),
      total: [...Array(12)]
        .map((_, key) => {
          const month = key + 1;
          const found = value.find(item => item.month === month);
          let count = found ? found.count : 0;
          return count;
        })
        .reduce((sum, curr) => sum + curr),
    }))
    .value();

  return (
    <>
      <div className="col-12 d-flex mb-3">
        <SelectYear
          name="year"
          handleChange={handleChange}
          currentValue={filter.year}
          className="form-control col-2"
        />
      </div>
      <OrderSubmitReportList loading={loading} results={convertedData} />
    </>
  );
};

export default OrderSubmitReport;
