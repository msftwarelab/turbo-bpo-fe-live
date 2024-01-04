import gql from 'graphql-tag';

export const SAVE_PROFILE_DOC = gql`
  mutation SaveProfileDoc($input: ProfileDocInput!) {
    saveProfileDoc(input: $input)
  }
`;
