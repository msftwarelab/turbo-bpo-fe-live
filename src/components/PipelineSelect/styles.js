import styled from 'styled-components';

export const StyledSelectContainer = styled.div`
  position:relative;

  > .copyIcon {
      position: absolute;
      top: 10px;
      right: 53px;
      color: hsl(0,0%,80%);
      cursor: pointer;
      &:hover{
        color: hsl(0,0%,60%);
      }
    }
  }
`;
