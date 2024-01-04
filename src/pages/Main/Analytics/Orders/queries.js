import gql from 'graphql-tag';

export const ALL_ORDER_ANALYTICS = gql`
  query AllOrderAnalytics($filter: OrderAnalyticsFilterInput!) {
    allOrderAnalytics(filter: $filter) {
      client
      month
      unpaid
      paid
    }
  }
`;

export default {};
