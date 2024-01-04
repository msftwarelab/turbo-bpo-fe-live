import React, { useState } from 'react';
import { shape, oneOfType, arrayOf } from 'prop-types';

export const RightClickDisabledContext = React.createContext(null);

const RightClickDisabledProvider = ({ children, initRightClickDisabled }) => {
  const [isRightClickDisabled, setRightClickDisabled] = useState(initRightClickDisabled);
  return (
    <RightClickDisabledContext.Provider
      value={{
        isRightClickDisabled,
        setRightClickDisabled,
      }}
    >
      {children}
    </RightClickDisabledContext.Provider>
  );
};

export default RightClickDisabledProvider;

export const useRightClickDisabled = () => React.useContext(RightClickDisabledContext);

RightClickDisabledProvider.propTypes = {
  children: oneOfType([shape({}).isRequired, arrayOf(shape({})).isRequired]),
  initRightClickDisabled: shape({}).isRequired,
};

RightClickDisabledProvider.defaultProps = {
  children: {},
};
