import gql from 'graphql-tag';

const FORGOT_PASSWORD = gql`
  mutation ForgetPassword($email: String!) {
    forgetPassword(email: $email)
  }
`;

export default FORGOT_PASSWORD;
