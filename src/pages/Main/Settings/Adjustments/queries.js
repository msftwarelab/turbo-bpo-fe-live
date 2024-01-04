import gql from 'graphql-tag';

export const ALL_ADJUSTMENT = gql`
  query AllAdjustment {
    allAdjustment {
      id
      category
      order
      label
      from
      to
      value
    }
  }
`;

export default {};
