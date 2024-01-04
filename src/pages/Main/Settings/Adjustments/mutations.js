import gql from 'graphql-tag';

export const UPDATE_ADJUSTMENT = gql`
  mutation UpdateAdjustment($id: ID!, $value: Float!) {
    updateAdjustment(id: $id, value: $value)
  }
`;
