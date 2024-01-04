import gql from 'graphql-tag';

export const PIPELINE_NEIGHBORHOOD = gql`
  query PipelineNeighborhood($pipelineId: ID!) {
    pipelineNeighborhood(pipelineId: $pipelineId) {
      id
      isReoDriven
      marketTrend
      monthlyPercentage
      sixmonthPercentage
      annualPercentage
      totalListings
      supply
      listingsMinValue
      listingsMedValue
      listingsMaxValue
      listingsDomAve
      listingsDomRangeFrom
      listingsDomRangeTo
      fm
      ss
      reo
      distressed
      totalSales
      demand
      salesMinValue
      salesMedValue
      salesMaxValue
      salesDomRangeFrom
      salesDomRangeTo
      zntComments
      ntComments
    }
  }
`;

export default {};
