import React, { useState, useEffect } from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';

const initialFilter = {
  dateFrom: moment()
    .subtract(30, 'days')
    .format('YYYY-MM-DD'),
  dateTo: moment().format('YYYY-MM-DD'),
};

const DateRangeFilter = ({ filter = initialFilter, disabled, onChange }) => {
  const [newFilter, setFilter] = useState(filter);
  const handleDateFilter = (name, value) => {
    setFilter({
      ...newFilter,
      [name]: value,
    });
  };

  useEffect(() => {
    if (newFilter.dateFrom && newFilter.dateTo) onChange(newFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newFilter]);

  useEffect(() => {
    if (!filter.dateFrom && !filter.dateTo) setFilter(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <div className="d-flex align-items-center">
      <div className="mr-2">From:</div>
      <Datetime
        value={
          newFilter.dateFrom
            ? moment(newFilter.dateFrom).format('YYYY-MM-DD')
            : ''
        }
        inputProps={{
          className: 'form-control',
          placeholder: 'Date from',
          disabled,
        }}
        closeOnSelect
        timeFormat={false}
        onChange={e => handleDateFilter('dateFrom', e.format('YYYY-MM-DD'))}
      />
      <div className="mx-2">To:</div>
      <Datetime
        value={
          newFilter.dateTo ? moment(newFilter.dateTo).format('YYYY-MM-DD') : ''
        }
        inputProps={{
          className: 'form-control',
          placeholder: 'Date to',
          disabled,
        }}
        closeOnSelect
        timeFormat={false}
        onChange={e => handleDateFilter('dateTo', e.format('YYYY-MM-DD'))}
      />
    </div>
  );
};

export default DateRangeFilter;
