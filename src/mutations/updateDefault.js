import gql from 'graphql-tag';

const UPDATE_DEFAULT = gql`
  mutation UpdateDefault($input: DefaultInput!) {
    updateDefault(input: $input)
  }
`;

export default UPDATE_DEFAULT;
