import gql from 'graphql-tag';

const UPDATE_ANNOUNCEMENT = gql`
  mutation UpdateAnnouncement($id: ID!, $input: AnnouncementInput!) {
    updateAnnouncement(id: $id, input: $input)
  }
`;

export default UPDATE_ANNOUNCEMENT;
