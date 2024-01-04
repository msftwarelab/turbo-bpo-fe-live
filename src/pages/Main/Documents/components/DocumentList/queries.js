import gql from 'graphql-tag';

export const ALL_INSTRUCTION = gql`
  query AllInstruction($filter: InstructionFilterInput) {
    allInstruction(filter: $filter) {
      totalCount
      results {
        id
        tag
        client
        fileName
        url
        comment
        company
        createdDateTime
      }
    }
  }
`;

export default {};
