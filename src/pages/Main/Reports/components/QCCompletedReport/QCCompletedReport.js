import React, { useState } from 'react';
import _ from 'lodash';
import { useQuery } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import QCCompletedReportList from './components/QCCompletedReportList';
import ALL_QCCOMPLETED from 'queries/allQcCompleted';
import SelectYear from '../SelectYear';

const QCCompletedReport = () => {
  const currentYear = new Date().getFullYear();

  const [filter, setFilter] = useState({
    year: currentYear,
  });

  const { loading, error, data = {} } = useQuery(ALL_QCCOMPLETED, {
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

  const { allQcCompleted = {} } = data;

  const convertedData = _.chain(allQcCompleted)
    .groupBy('qualityControlName')
    .map((value, key) => ({
      qualityControlName: key,
      months: [...Array(12)].map((_, key) => {
        const month = key + 1;
        const found = value.find(item => item.month === month);

        let normal = found ? found.normal : 0;
        let fullRec = found ? found.fullRec : 0;
        let dd = found ? found.dd : 0;
        let total = found ? found.total : 0;

        return {
          month,
          normal,
          fullRec,
          dd,
          total,
        };
      }),
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
      <QCCompletedReportList loading={loading} results={convertedData} />
    </>
  );
};

export default QCCompletedReport;
