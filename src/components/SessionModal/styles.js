import styled from 'styled-components';
import { Modal } from 'react-bootstrap';

export const StyledModal = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
`;

export const StyledModalDialog = styled(Modal.Dialog)`
  z-index: 2;
`;

export const StyledModalOverlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  background-color: #000;
  opacity: 0.8;
  transition: opacity 0.15s linear;
`;
