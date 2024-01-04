import gql from 'graphql-tag';

export const ME = gql`
  query Me {
    me: profile {
      id
      roles
    }
  }
`;

export default {};
