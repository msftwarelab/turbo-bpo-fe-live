import gql from 'graphql-tag';

export const ALL_SALE_ANALYTICS = gql`
  query AllSalesAnalytics($filter: SalesAnalyticsFilterInput!) {
    allSalesAnalytics(filter: $filter) {
      day
      completedOrder
    }
  }
`;

export default {};
