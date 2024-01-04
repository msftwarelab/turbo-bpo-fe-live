import React from 'react';
import rolesOptions from 'constants/rolesOptions';
import Select from 'react-select';

const RolesSelect = ({
  value,
  name = 'roles',
  onChange = e => e,
  isMulti = false,
}) => {
  let newValue = rolesOptions.find(item => item.value === value);
  if (Array.isArray(value)) {
    newValue = value.map(role => {
      const selectedValue = rolesOptions.find(item => item.value === role);
      return selectedValue;
    });
  }
  return (
    <Select
      value={newValue}
      options={rolesOptions}
      isMulti={isMulti}
      name={name}
      onChange={value => onChange(value)}
    />
  );
};

export default RolesSelect;
