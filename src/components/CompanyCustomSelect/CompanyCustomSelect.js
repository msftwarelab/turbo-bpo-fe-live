import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Select from 'react-select';
import setErrorMessage from 'utils/setErrorMessage';
import { ALL_COMPANY } from './queries';

const CompanyCustomSelect = ({
  onChange,
  name,
  value,
  isInvalid,
  placeholder,
}) => {
  const { loading, error, data = {} } = useQuery(ALL_COMPANY, {
    variables: {
      filter: {
        limit: 100,
        offset: 0,
      },
    },
  });
  if (error) return <div>{setErrorMessage(error)}</div>;
  if (loading) return <div>loading...</div>;
  const { allCompany = {} } = data;
  const { results = [] } = allCompany;
  const options = [
    { label: 'All', value: '' },
    ...results.map(item => ({
      ...item,
      label: item.name,
      value: item.name,
    })),
  ];
  const selected = options.find(item => item.value === value);
  return (
    <Select
      as="select"
      isClearable
      name={name}
      onChange={onChange}
      value={selected || ''}
      isInvalid={isInvalid}
      options={options}
      placeholder={placeholder}
    />
  );
};

export default CompanyCustomSelect;
