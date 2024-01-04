import gql from 'graphql-tag';

const USER = gql`
  query User($id: ID!) {
    user(id: $id) {
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
      disclaimer
      theme
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
      companyList
    }
  }
`;

export default USER;
