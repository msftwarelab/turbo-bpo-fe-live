import gql from 'graphql-tag';

const PROFILE = gql`
  query Profile {
    profile {
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
    }
  }
`;

export default PROFILE;
