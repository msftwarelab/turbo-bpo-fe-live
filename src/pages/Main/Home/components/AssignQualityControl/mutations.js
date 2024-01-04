import gql from 'graphql-tag';

export const UPDATE_QUALITY_CONTROL = gql`
  mutation UpdateQualityControl($id: ID!, $input: UpdateQualityControlInput!) {
    updateQualityControl(id: $id, input: $input)
  }
`;
