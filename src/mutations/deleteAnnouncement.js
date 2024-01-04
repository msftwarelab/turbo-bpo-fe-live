import gql from 'graphql-tag';

const DELETE_ANNOUNCEMENT = gql`
  mutation DeleteAnnouncement($id: ID!) {
    deleteAnnouncement(id: $id)
  }
`;

export default DELETE_ANNOUNCEMENT;
