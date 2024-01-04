import React, { useState } from 'react';
import gql from 'graphql-tag';
import setErrorMessage from 'utils/setErrorMessage';
import { withApollo } from 'react-apollo';
import cogoToast from 'cogo-toast';
import ALL_PIPELINE_DOC from 'queries/allPipelineDoc';
import ALL_PIPELINE from 'queries/allPipeline';
import { Button } from 'react-bootstrap';
import CogoToastWarn from 'components/CogoToastWarn'

const graphqlString = ({ docId }) =>
  `doc_${docId}: deletePipelineDoc(id: "${docId}")`;

const DeleteDocs = ({
  pipelineId = null,
  selectedDocs = [],
  client = {},
  pipelineDocFilter = {},
  pipelineFilter = {},
  onDelete = e => e,
}) => {
  const [isLoading, setLoading] = useState(false);
  const handleDelete = async () => {
    if (!selectedDocs.length) {
      CogoToastWarn('No docs selected')
      return;
    }
    setLoading(true);
    try {
      let str = '';
      selectedDocs.map(doc => {
        str += graphqlString({
          docId: doc.id,
        });
        return false;
      });

      await client.mutate({
        mutation: gql(`mutation { ${str} }`),
        refetchQueries: [
          {
            query: ALL_PIPELINE_DOC,
            variables: { pipelineId, filter: pipelineDocFilter },
          },
          {
            query: ALL_PIPELINE,
            variables: { filter: pipelineFilter },
          },
        ],
      });
      cogoToast.success('Docs deleted');
      setLoading(false);
      onDelete();
    } catch (err) {
      cogoToast.error(setErrorMessage(err));
      setLoading(false);
    }
  };
  return (
    <>
      <Button onClick={handleDelete} disabled={isLoading}>
        Delete
      </Button>
    </>
  );
};

export default withApollo(DeleteDocs);
