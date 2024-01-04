import gql from 'graphql-tag';

const UPDATE_PERMISSION_GROUP = gql`
  mutation UpdatePermissionGroup($id: ID!, $input: PermissionGroupInput!) {
    updatePermissionGroup(id: $id, input: $input)
  }
`;

export default UPDATE_PERMISSION_GROUP;
