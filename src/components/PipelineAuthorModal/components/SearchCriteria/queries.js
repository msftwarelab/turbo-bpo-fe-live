import gql from 'graphql-tag';

export const SEARCH_CRITERIA = gql`
  query Default($userId: ID) {
    default(userId: $userId) {
      listingType
      alwayssubmitOrder
      autoCompleteStandbyOrder
      initialSearchGla
      initialSearchAge
      initialSearchProximity
      secondSearchGla
      secondSearchAge
      secondSearchProximity
      secondSearchSaleDates
      thirdSearchGla
      thirdSearchAge
      thirdSearchProximity
      thirdSearchSaleDates
      thirdSearchFilterByComplexName
      thirdSearchFilterByCity
      thirdSearchFilterByZip
      thirdSearchFilterByCountry
    }
  }
`;

export default {};
