import styled from 'styled-components';
import { Col } from 'react-bootstrap';

export const StyledCol = styled(Col)`
  ${props => !props.isShow && 'flex: 0 0 46px !important;'}
  overflow: hidden;

  .card-body {
    width: ${props => (!props.isShow ? '600px' : '100%')};
  }
`;
