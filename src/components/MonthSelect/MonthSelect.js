import React from 'react';
import { Form } from 'react-bootstrap';
import moment from 'moment';

const minMonth = 0;
const endMonth = 11;
const monthOptions = [];
for (let i = minMonth; i <= endMonth; i++) {
  monthOptions.push({
    label: moment()
      .month(i)
      .format('MMMM'),
    value: i + 1,
  });
}

const MonthSelect = ({ value, name, onChange, isInvalid }) => {
  return (
    <Form.Control
      as="select"
      name={name}
      onChange={onChange}
      value={value || ''}
      isInvalid={isInvalid}
    >
      {monthOptions.map(item => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </Form.Control>
  );
};

export default MonthSelect;
