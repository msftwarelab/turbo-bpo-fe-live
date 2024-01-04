import styled from 'styled-components';
import { Form } from 'react-bootstrap';

export const StyledContainer = styled.div`
  position: relative;
  .btn {
    position: absolute;
    right: 0;
    margin-right: 5px;
    margin-top: 5px;
  }
`;

export const StyledFormGroup = styled(Form.Group)`
  position: absolute;
`;

export default {};
