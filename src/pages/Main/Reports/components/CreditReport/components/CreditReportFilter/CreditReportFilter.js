import React, { useState, useEffect} from 'react';
import moment from 'moment';
import Datetime from 'react-datetime';

const CreditReportFilter = ({ onChangeDateFilter }) => {
  const [dateRange, setDateRange] = useState({
    dateFrom: '',
    dateTo: '',
  })

  const handleDateFilter = (name, e) => {
    if (typeof e === 'string') return false

    setDateRange({
      ...dateRange,
      [name]: e.format('YYYY-MM-DD'),
    });
  }

  useEffect(() => {
    if (dateRange.dateFrom && dateRange.dateTo) {
      onChangeDateFilter(dateRange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange]);

  return (
    <div className="col-12 d-flex mb-3">
      <div className="d-flex align-items-center">
        <div className="mr-2">From:</div>
        <Datetime
          value={
            dateRange.dateFrom
              ? moment(dateRange.dateFrom).format('YYYY-MM-DD')
              : ''
          }
          inputProps={{
            className: 'form-control',
            placeholder: 'Date from',
          }}
          closeOnSelect
          timeFormat={false}
          onChange={e => handleDateFilter('dateFrom', e)}
        />
        <div className="mx-2">To:</div>
        <Datetime
          value={
            dateRange.dateTo
              ? moment(dateRange.dateTo).format('YYYY-MM-DD')
              : ''
          }
          inputProps={{
            className: 'form-control',
            placeholder: 'Date To',
          }}
          closeOnSelect
          timeFormat={false}
          onChange={e => handleDateFilter('dateTo', e)}
        />
      </div>
      <input type="text" name="clientName" className="form-control form-control-sm col-3 ml-auto" placeholder="Client Name"/>
    </div>
  );
};

export default CreditReportFilter;
