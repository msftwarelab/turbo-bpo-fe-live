import React, { useState } from 'react';
import { shape, oneOfType, arrayOf } from 'prop-types';

export const ModalStatusContext = React.createContext(null);

const ModalStatus = ({ children, initModalStatus }) => {
  const [isModalOpen, setModalOpen] = useState(initModalStatus);
  return (
    <ModalStatusContext.Provider
      value={{
        isModalOpen,
        setModalOpen,
      }}
    >
      {children}
    </ModalStatusContext.Provider>
  );
};

export default ModalStatus;

export const useModalStatus = () => React.useContext(ModalStatusContext);

ModalStatus.propTypes = {
  children: oneOfType([shape({}).isRequired, arrayOf(shape({})).isRequired]),
  initModalStatus: shape({}).isRequired,
};

ModalStatus.defaultProps = {
  children: {},
};
