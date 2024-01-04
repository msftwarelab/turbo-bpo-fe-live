import gql from 'graphql-tag';

export const SAVE_HEADER_DETAIL = gql`
  mutation SaveHeaderDetail($parentId: ID!, $name: String!) {
    saveHeaderDetail(parentId: $parentId, name: $name)
  }
`;
