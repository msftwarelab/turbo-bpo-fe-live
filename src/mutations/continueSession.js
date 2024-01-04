import gql from 'graphql-tag';

const CONTINUE_SESSION = gql`
  mutation ContinueSession($userId: ID!) {
    continueSession(userId: $userId)
  }
`;

export default CONTINUE_SESSION;
