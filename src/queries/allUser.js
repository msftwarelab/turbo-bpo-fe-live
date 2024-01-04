import gql from 'graphql-tag';

const ALL_USER = gql`
  query AllUser($filter: UserFilterInput) {
    allUser(filter: $filter) {
      totalCount
      results {
        id
        email
        firstName
        lastName
        company
        phoneNumber
        address
        city
        state
        zipCode
        imABroker
        broker
        brokerLicense
        agent
        agentLicense
        licenseDate
        licenseExpirationDate
        brokerage
        yearOfExperience
        profilePicture
        companyList
        status
        roles
        permissionGroupId
        priceModule {
          credits
          orderinterior
          orderexterior
          orderdataEntry
          orderrush
          ordersuperRush
          orderconditionReport
          orderrentalAddendum
          photoExterior
          photoInteriorVacantLB
          photoInteriorAppointment
        }
        assignDate
        assignActive
        assignHold
        assignRush
        assignStandby
        isEnableEmailNotification
        createdDateTime
      }
    }
  }
`;

export default ALL_USER;
