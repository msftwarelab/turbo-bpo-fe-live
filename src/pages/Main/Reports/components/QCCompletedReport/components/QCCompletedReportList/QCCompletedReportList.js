import React from 'react';
import QCCompletedReportTable from './components/QCCompletedReportTable';

const QCCompletedReportList = ({ loading, results }) => {
  return (
    <QCCompletedReportTable loading={loading} data={results} />
  )
};

export default QCCompletedReportList;
