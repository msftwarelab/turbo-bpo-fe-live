import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import _ from 'lodash';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import QCRatingReportList from './components/QCRatingReportList';
import ALL_QCRATING from 'queries/allQcRating';
import SelectYear from '../SelectYear';

const QCRatingReport = () => {
  const currentYear = new Date().getFullYear();

  const [filter, setFilter] = useState({
    year: currentYear,
  });

  const { loading, error, data = {} } = useQuery(ALL_QCRATING, {
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

  const { allQcRating = {} } = data;
  const convertedData = _.chain(allQcRating)
    .groupBy('contractorName')
    .map((value, key) => ({
      contractorName: key === 'null' ? '' : key,
      months: [...Array(12)].map((_, key) => {
        const month = key + 1;
        const found = value.find(item => item.month === month);

        let noOfOders = found ? found.noOfOders : 0;
        let noOfQcL = found ? found.noOfQcL : 0;
        let percentOfQc = found ? found.percentOfQc : 0;

        return {
          month,
          noOfOders,
          noOfQcL,
          percentOfQc,
        };
      }),
      total: [...Array(12)]
        .map((_, key) => {
          const month = key + 1;
          const found = value.find(item => item.month === month);

          let noOfOders = found ? found.noOfOders : 0;
          let noOfQcL = found ? found.noOfQcL : 0;
          let percentOfQc = found ? found.percentOfQc : 0;

          return {
            month,
            noOfOders,
            noOfQcL,
            percentOfQc,
          };
        })
        .reduce(
          (acc, row) => {
            return {
              noOfOders: acc.noOfOders + row.noOfOders,
              noOfQcL: acc.noOfQcL + row.noOfQcL,
              percentOfQc: acc.percentOfQc + row.percentOfQc,
            };
          },
          { noOfOders: 0, noOfQcL: 0, percentOfQc: 0 }
        ),
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
      <QCRatingReportList loading={loading} results={convertedData} />
    </>
  );
};

export default QCRatingReport;
