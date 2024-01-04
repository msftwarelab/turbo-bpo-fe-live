import gql from 'graphql-tag';

const ALL_ADJUSTMENT = gql`
  query AllAdjustment($userId: ID!) {
    allAdjustment(userId: $userId) {
       id
       category,
       order,
       label,
       from
       to,
       value
      }
  }
`;

export default ALL_ADJUSTMENT;
