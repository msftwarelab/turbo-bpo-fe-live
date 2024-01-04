import React from 'react';
import { Form } from 'react-bootstrap';
import { useQuery } from '@apollo/react-hooks';
import setErrorMessage from 'utils/setErrorMessage';
import { string, func } from 'prop-types';
import COMPANY from 'queries/company';

const CompanyFormSelect = ({ companyId, onChange, name, value }) => {
  const { loading, error, data = {} } = useQuery(COMPANY, {
    variables: {
      id: companyId,
    },
    skip: !companyId || companyId === 'OTHERS',
  });
  if (error) return <div>{setErrorMessage(error)}</div>;
  if (loading) return <div>loading...</div>;
  const { company = {} } = data;

  return (
    <Form.Control as="select" name={name} value={value} onChange={onChange}>
      <option value="COMMON">Common</option>
      {company.forms && company.forms.length > 0
        ? company.forms.map((item, k) => (
            <option key={k} value={item.name}>
              {item.name}
            </option>
          ))
        : null}
    </Form.Control>
  );
};

CompanyFormSelect.propTypes = {
  companyId: string,
  onChange: func,
  name: string,
  value: string,
};

CompanyFormSelect.defaultProps = {
  companyId: null,
  onChange: e => e,
  name: null,
  value: null,
};

export default CompanyFormSelect;
