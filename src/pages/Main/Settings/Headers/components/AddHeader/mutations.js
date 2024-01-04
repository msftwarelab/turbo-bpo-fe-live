import gql from 'graphql-tag';

export const SAVE_HEADER = gql`
  mutation SaveHeader($name: String!) {
    saveHeader(name: $name)
  }
`;
