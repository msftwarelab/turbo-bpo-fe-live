import React from 'react';
import DEFAULT from 'queries/default';
import setErrorMessage from 'utils/setErrorMessage';
import { shape, node } from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

export const Theme = ({ me, children }) => {
  const { loading, error, data = {} } = useQuery(DEFAULT, {
    variables: { userId: me.id },
  });
  const { default: defaultValue } = data;
  if (error) return <div>{setErrorMessage(error)}</div>;
  if (loading) return <div>loading...</div>;
  return (
    <div className={defaultValue ? defaultValue.theme : ''}>{children}</div>
  );
};

Theme.propTypes = {
  me: shape,
  children: node,
};

Theme.defaultProps = {
  me: {},
  children: null,
};

export default Theme;
