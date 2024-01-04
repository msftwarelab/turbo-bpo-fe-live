import gql from 'graphql-tag';

const ALL_SESSION = gql`
  query AllSession($filter: SessionFilterInput) {
    allSession(filter: $filter) {
      totalCount
      results {
        id
        invoiceDate
        start
        end
      }
    }
  }
`;

export default ALL_SESSION;
