import React, { useState } from 'react';
import { shape, oneOfType, arrayOf } from 'prop-types';

export const MeContext = React.createContext(null);

const MeProvider = ({ children, initMe }) => {
  const [me, setMe] = useState(initMe);
  return (
    <MeContext.Provider
      value={{
        me,
        setMe,
      }}
    >
      {children}
    </MeContext.Provider>
  );
};

export default MeProvider;

export const useMe = () => React.useContext(MeContext);

MeProvider.propTypes = {
  children: oneOfType([shape({}).isRequired, arrayOf(shape({})).isRequired]),
  initMe: shape({}).isRequired,
};

MeProvider.defaultProps = {
  children: {},
};
