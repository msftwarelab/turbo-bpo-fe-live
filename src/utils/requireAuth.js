import React from 'react';
import { Redirect } from 'react-router-dom';

export default ComposedComponent => {
  const Authenticate = props => {
    if (!localStorage.accessToken) return <Redirect to="/login" />;
    return <ComposedComponent {...props} />;
  };
  return Authenticate;
};
