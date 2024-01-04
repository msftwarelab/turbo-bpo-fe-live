import gql from 'graphql-tag';

const ME = gql`
  query Me {
    me: profile {
      id
      roles
      status
      permissionList
      theme
      firstName
      lastName
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
    }
  }
`;

export default ME;
