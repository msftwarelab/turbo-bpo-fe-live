import gql from 'graphql-tag';

const SAVE_PERMISSION_GROUP = gql`
  mutation SavePermissionGroup($input: PermissionGroupInput!) {
    savePermissionGroup(input: $input)
  }
`;

export default SAVE_PERMISSION_GROUP;
