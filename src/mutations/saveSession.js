import gql from 'graphql-tag';

const SAVE_SESSION = gql`
  mutation SaveSession($userId: ID!, $invoiceDate: String!) {
    saveSession(userId: $userId, invoiceDate: $invoiceDate)
  }
`;

export default SAVE_SESSION;
