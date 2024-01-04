import gql from 'graphql-tag';

export const USER = gql`
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
    }
  }
`;

export default {};
