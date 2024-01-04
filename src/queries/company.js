import gql from 'graphql-tag';

const COMPANY = gql`
  query Company($id: ID!) {
    company(id: $id) {
      id
      name
      webSite
      isAdmin
      isClient
      isPremium
      forms {
        name
        style
      }
    }
  }
`;

export default COMPANY;
