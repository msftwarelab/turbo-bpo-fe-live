import React from 'react';
import { Form } from 'react-bootstrap';
import moment from 'moment';

const minYear = 2001;
const curYear = parseFloat(moment().format('YYYY'));

const yearOptions = [];
for (let i = minYear; i <= curYear; i++) {
  yearOptions.push(i);
}

const YearSelect = ({ value, name, onChange, isInvalid }) => {
  return (
    <Form.Control
      as="select"
      name={name}
      onChange={onChange}
      value={value || ''}
      isInvalid={isInvalid}
    >
      {yearOptions.map(item => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </Form.Control>
  );
};

export default YearSelect;
