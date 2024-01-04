import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;

  .nav-tabs {
    border-top: 1px solid #dee2e6;
    border-bottom: 0;

    .nav-link {
      border-radius: 0;
      border-bottom-left-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
      margin-top: -1px;
      margin-bottom: 0;

      &.active {
        border-color: #fff #dee2e6 #dee2e6;
      }
    }
  }
`;

export default {};
