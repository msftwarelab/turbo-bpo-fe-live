import gql from 'graphql-tag';

const DEFAULT = gql`
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
      useDefaults
      useIformValidations
      subjectType
      styleDesign
      exteriorFinish
      condition
      quality
      view
      pool
      porchPatioDeck
      firePlace
      basement
      condo
      multiUnit
      mobileHome
      sfd
      sfaTownhouse
      theme
      isEnableEmailNotification
    }
  }
`;

export default DEFAULT;
