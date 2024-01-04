import gql from 'graphql-tag';

export const HOLD_QUALITY_CONTROL = gql`
  mutation HoldQualityControl($id: ID!, $input: UpdateQualityControlInput!) {
    updateQualityControl(id: $id, input: $input)
  }
`;
