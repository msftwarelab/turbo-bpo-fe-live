import gql from 'graphql-tag';

export const SAVE_INSTRUCTION = gql`
  mutation SaveInstruction($input: SaveInstructionInput!) {
    saveInstruction(input: $input)
  }
`;
