import gql from 'graphql-tag';

const ALL_COMMENT = gql`
  query AllComment {
    allComment {
      id
      category
      section
      label
      value
      createdDateTime
    }
  }
`;

export default ALL_COMMENT;
