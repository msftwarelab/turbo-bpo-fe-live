import React from 'react';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import { useQuery } from '@apollo/react-hooks';
import Select from 'react-select';
import { ALL_CONTRACTOR } from './queries';

const ContractorInput = ({ value, onChange }) => {
  const { loading, error } = useQuery(ALL_CONTRACTOR);
  if (error) cogoToast.error(setErrorMessage(error));
  if (loading) return <div>loading...</div>;
  return <Select value={value} onChange={onChange} />;
};

export default ContractorInput;
