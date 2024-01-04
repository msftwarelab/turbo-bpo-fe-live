import React from 'react';
import { Form } from 'react-bootstrap';
import statusOptions from 'constants/statusOptions';

const StatusSelect = ({ name, onChange, value, isInvalid }) => (
  <Form.Control
    as="select"
    name={name}
    onChange={onChange}
    value={value || ''}
    isInvalid={isInvalid}
  >
    <option value="">Select one</option>
    {statusOptions.map(item => (
      <option key={item.value} value={item.value}>
        {item.label}
      </option>
    ))}
  </Form.Control>
);
export default StatusSelect;
