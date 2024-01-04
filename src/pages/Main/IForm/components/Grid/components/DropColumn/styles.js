import styled from 'styled-components';
import { Col } from 'react-bootstrap';

export const StyledOverlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

export const StyledCol = styled(Col)`
  position: relative;
`;

export default {};
