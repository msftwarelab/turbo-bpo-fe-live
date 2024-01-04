import gql from 'graphql-tag';

export const ALL_CONTRACTOR = gql`
  query Contractors {
    allUser {
      id
      firstName
      lastName
    }
  }
`;

export default {};
