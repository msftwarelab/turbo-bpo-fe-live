import React from 'react';
import { withApollo } from 'react-apollo';
import { string, func, shape, arrayOf, bool } from 'prop-types';
import Select from 'react-select';

const BillingUserSelect = ({ value, options, isLoading, onChange }) => {
  const newValue = options.find(item => item.value === value);
  const handleChange = e => {
    onChange(e.value);
  };

  return (
    <Select
      onChange={handleChange}
      value={newValue}
      options={options}
      isLoading={isLoading}
    />
  );
};

BillingUserSelect.propTypes = {
  value: string,
  options: arrayOf(shape({})),
  onChange: func,
  isLoading: bool,
};

BillingUserSelect.defaultProps = {
  value: null,
  options: [],
  onChange: e => e,
  isLoading: false,
};

export default withApollo(BillingUserSelect);
