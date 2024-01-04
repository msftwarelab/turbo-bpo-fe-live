import gql from 'graphql-tag';

const STOP_SESSION = gql`
  mutation StopSession($userId: ID!) {
    stopSession(userId: $userId)
  }
`;

export default STOP_SESSION;
