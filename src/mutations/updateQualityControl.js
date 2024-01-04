import gql from 'graphql-tag';

const UPDATE_QUALITY_CONTROL = gql`
  mutation UpdateQualityControl($id: ID!, $input: UpdateQualityControlInput!) {
    updateQualityControl(id: $id, input: $input)
  }
`;

export default UPDATE_QUALITY_CONTROL;
