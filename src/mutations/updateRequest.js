import gql from 'graphql-tag';

const UPDATE_REQUEST = gql`
  mutation UpdateRequest($id: ID!, $input: UpdateRequestInput!) {
    updateRequest(id: $id, input: $input)
  }
`;

export default UPDATE_REQUEST;
