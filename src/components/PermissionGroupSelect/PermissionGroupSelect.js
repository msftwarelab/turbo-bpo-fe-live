import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import setErrorMessage from 'utils/setErrorMessage';
import removeTypeName from 'utils/removeTypeName';
import { useQuery } from '@apollo/react-hooks';
import ALL_PERMISSION_GROUP from 'queries/allPermissionGroup';

const PermissionGroupSelect = ({
  onChange,
  name,
  value,
  isInvalid,
  returnValue = null,
  ...props
}) => {
  const [newValue, setNewValue] = useState(value);
  const { loading, error, data = {} } = useQuery(ALL_PERMISSION_GROUP, {
    variables: {
      offset: 0,
      limit: 1000,
    },
  });
  if (error) return <div>{setErrorMessage(error)}</div>;
  if (loading) return <div>loading...</div>;
  const { allPermissionGroup = {} } = data;
  const { results = [] } = allPermissionGroup;

  const handleChange = e => {
    const { value, selectedIndex } = e.target;
    const selected = results.find(item => item.id === value);
    setNewValue(value);
    if (value) {
      if (returnValue === 'NAME') {
        if (value === 'OTHERS') onChange('Others');
        else onChange(selected.name);
      } else if (returnValue === 'OBJECT') {
        if (value === 'OTHERS')
          onChange({
            id: value,
            name: e.target[selectedIndex].text,
          });
        else onChange(removeTypeName(selected));
      } else {
        if (value === 'OTHERS') onChange(value);
        else onChange(selected.id);
      }
    } else {
      onChange(null);
    }
  };
  return (
    <Form.Control
      as="select"
      name={name}
      onChange={handleChange}
      value={newValue || ''}
      isInvalid={isInvalid}
      {...props}
    >
      <option value="">Select one</option>
      {results.map(item => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </Form.Control>
  );
};

export default PermissionGroupSelect;
