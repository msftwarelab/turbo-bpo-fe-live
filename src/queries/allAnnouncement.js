import gql from 'graphql-tag';

const ALL_ANNOUNCEMENT = gql`
  query AllAnnouncement($filter: AnnouncementFilterInput) {
    allAnnouncement(filter: $filter) {
      totalCount
      results {
        id
        subject
        startDate
        endDate
        message
        createdBy
        createdDateTime
      }
    }
  }
`;

export default ALL_ANNOUNCEMENT;
