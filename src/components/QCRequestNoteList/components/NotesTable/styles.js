import styled from 'styled-components';

export const StyledMessage = styled.td`
  .notes {
    h3 {
      font-size: 14px;
    }
    p {
      font-size: 12px;
    }
  }
  .exterior, .interior {
    border: 0 !important;
    tr {
      border: 0 !important;
      background: transparent !important;
      padding: 0 10px 0 0 !important;

      .category {
        font-size: 14px;
        font-weight: bold;
      }

      td, th {
        h3 {
          font-size: 14px;
          margin-bottom: .5rem;
          font-weight: 500;
          line-height: 1.2;
        }
        background: transparent;
        border: 0 !important;
        padding: 0 10px 0 0 !important;
        font-size: 12px;
      }
    }
  
  }
`;
