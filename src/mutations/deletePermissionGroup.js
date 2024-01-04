import gql from 'graphql-tag';

const DELETE_PERMISSION_GROUP = gql`
  mutation DeletePermissionGroup($id: ID!) {
    deletePermissionGroup(id: $id)
  }
`;

export default DELETE_PERMISSION_GROUP;
