import gql from 'graphql-tag';

const ALL_PERMISSION_GROUP = gql`
  query AllPermissionGroup($filter: PermissionGroupFilterInput) {
    allPermissionGroup(filter: $filter) {
      totalCount
      results {
        id
        name
        permissions
      }
    }
  }
`;

export default ALL_PERMISSION_GROUP;
