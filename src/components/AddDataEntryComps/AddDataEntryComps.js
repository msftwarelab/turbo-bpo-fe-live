import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { shape, string, arrayOf } from 'prop-types';
import DataEntryCompsForm from 'components/DataEntryCompsForm';
import ALL_PIPELINE_COMPARABLE from 'queries/allPipelineComparable';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';

const mlsInput = [
  { id: 1, value: null, status: 'ACTIVE' },
  { id: 2, value: null, status: 'ACTIVE' },
  { id: 3, value: null, status: 'ACTIVE' },
  { id: 4, value: null, status: 'SOLD' },
  { id: 5, value: null, status: 'SOLD' },
  { id: 6, value: null, status: 'SOLD' },
];

const graphqlString = ({ id, pipelineId, mls, status }) => `
  comparable_${id}: savePipelineComparable(
    pipelineId: "${pipelineId}",
    input: {
      mls: "${mls}",
      status: "${status}",
      order: ${id},
    }
  )`;

const deleteGraphqlString = id => `
  comparable_${id}: deletePipelineComparable(id:"${id}")`;

const AddDataEntryComps = ({
  pipelineComparables,
  client,
  filter,
  pipelineId,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);

  const deleteComparables = async comparables => {
    let str = '';
    comparables.forEach(item => {
      str += deleteGraphqlString(item.id);
    });

    await client.mutate({ mutation: gql(`mutation { ${str} }`) });
  };

  const handleSubmit = async ({ mls }) => {
    setLoading(true);
    try {
      if (pipelineComparables.length)
        await deleteComparables(pipelineComparables);

      let str = '';
      mls.forEach(item => {
        if (item.value) {
          str += graphqlString({
            id: item.id,
            pipelineId,
            mls: item.value,
            status: item.status,
          });
        }
      });

      await client.mutate({
        mutation: gql(`mutation { ${str} }`),
        refetchQueries: [
          {
            query: ALL_PIPELINE_COMPARABLE,
            variables: { pipelineId, filter },
          },
        ],
      });
      cogoToast.success('Complete');
      setLoading(false);
      handleShow();
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };
  return (
    <>
      <Button onClick={handleShow} variant="warning">
        Add
      </Button>
      {isShow && (
        <Modal show onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Add Comparables</Modal.Title>
          </Modal.Header>

          <DataEntryCompsForm
            initialValues={{
              mls: mlsInput,
            }}
            isLoading={isLoading}
            onSubmit={handleSubmit}
            onClose={handleShow}
          />
        </Modal>
      )}
    </>
  );
};

AddDataEntryComps.propTypes = {
  client: shape({}),
  filter: shape({}),
  pipelineId: string,
  pipelineComparables: arrayOf(shape({})),
};

AddDataEntryComps.defaultProps = {
  client: {},
  filter: {},
  pipelineId: null,
  pipelineComparables: [],
};

export default withApollo(AddDataEntryComps);
