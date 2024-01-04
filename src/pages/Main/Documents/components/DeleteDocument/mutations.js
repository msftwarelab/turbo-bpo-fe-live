import gql from 'graphql-tag';

export const DELETE_INSTRUCTION = gql`
  mutation DeleteInstruction($id: ID!) {
    deleteInstruction(id: $id)
  }
`;
