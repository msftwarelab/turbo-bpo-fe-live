import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import setErrorMessage from 'utils/setErrorMessage';
import removeTypeName from 'utils/removeTypeName';
import { useQuery } from '@apollo/react-hooks';
import ALL_COMPANY from 'queries/allCompany';

const CompanySelect = ({
  onChange,
  name,
  value,
  isInvalid,
  disabled = false,
  isPremium = false,
  isAdmin = false,
  isClient = false,
  limit = 2000000,
  returnValue = null,
  ...props
}) => {
  const filter = { limit, isPremium };
  if (isAdmin) filter.isAdmin = true;
  if (isClient) filter.isClient = true;

  const [newValue, setNewValue] = useState(value);
  const { loading, error, data = {} } = useQuery(ALL_COMPANY, {
    variables: { filter },
  });

  if (error) return <div>{setErrorMessage(error)}</div>;
  if (loading) return <div>loading...</div>;
  const { allCompany = {} } = data;
  const { results = [] } = allCompany;

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
      } else if (value === 'OTHERS') onChange(value);
      else onChange(selected.id);
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
      disabled={disabled}
      {...props}
    >
      <option value="">Select one</option>
      {results.map(item => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
      <option value="OTHERS">{isPremium ? 'Custom' : 'Others'}</option>
    </Form.Control>
  );
};

export default CompanySelect;
