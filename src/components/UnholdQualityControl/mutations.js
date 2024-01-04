import gql from 'graphql-tag';

export const UNHOLD_QUALITY_CONTROL = gql`
  mutation UnHoldQualityControl($id: ID!, $input: UpdateQualityControlInput!) {
    updateQualityControl(id: $id, input: $input)
  }
`;
