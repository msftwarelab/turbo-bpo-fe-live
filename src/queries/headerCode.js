import gql from 'graphql-tag';

const HEADER_CODE = gql`
  query HeaderCode($codes: [String]!) {
    headerCode(codes: $codes) {
      code
      value
    }
  }
`;

export default HEADER_CODE;
