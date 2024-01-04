import gql from 'graphql-tag';

const ALL_LOGIN_LOG = gql`
  query AllLoginLog($filter: LoginLogFilterInput) {
    allLoginLog(filter: $filter) {
      totalCount
      results {
        username
        datetime
        ipAddress
      }
    }
  }
`;

export default ALL_LOGIN_LOG;
