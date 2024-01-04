import styled from 'styled-components';
import { Card } from 'react-bootstrap';

export const StyledCardBody = styled(Card.Body)`
  position: relative;
`;

export const StyledLabel = styled.div`
  flex: 1 1 0px;
  position: relative;
  span {
    position: absolute;
    right: -30px;
    width: 62px;
    text-align: center;
  }
`;

export const StyledLabelStart = styled.div`
  position: absolute;
  left: 17px;
  width: 62px;
  text-align: center;
`;

export default {};
