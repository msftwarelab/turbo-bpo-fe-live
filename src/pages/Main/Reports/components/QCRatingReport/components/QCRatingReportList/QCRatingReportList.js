import React from 'react';
import QCRatingReportTable from './components/QCRatingReportTable';

const QCRatingReportList = ({ loading, results }) => {
  return (
    <QCRatingReportTable loading={loading} data={results} />
  );
};

export default QCRatingReportList;
