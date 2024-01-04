import gql from 'graphql-tag';

const UPDATE_QC_REQUEST = gql`
  mutation UpdateQCRequest($id: ID!, $input: UpdateQcRequestInput!) {
    updateQcRequest(id: $id, input: $input)
  }
`;

export default UPDATE_QC_REQUEST;
