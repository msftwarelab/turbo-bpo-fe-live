import gql from 'graphql-tag';

const SAVE_ANNOUNCEMENT = gql`
  mutation SaveAnnouncement($input: AnnouncementInput!) {
    saveAnnouncement(input: $input)
  }
`;

export default SAVE_ANNOUNCEMENT;
