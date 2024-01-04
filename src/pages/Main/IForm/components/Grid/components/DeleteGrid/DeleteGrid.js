import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import gql from 'graphql-tag';
import { shape, arrayOf, string } from 'prop-types';
import { withApollo } from 'react-apollo';
import { Button } from 'react-bootstrap';
import DeleteModal from 'components/DeleteModal';
import setErrorMessage from 'utils/setErrorMessage';
import ALL_IFORM_GRID from 'queries/allIformGrid';

const graphqlString = ({ id }) => `
  iformGrid_${id}: deleteIformGrid(id: "${id}")`;

const DeleteGrid = ({ selectedGrids, client, filter, pipelineId }) => {
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleShow = () => setShow(!isShow);

  const handleDelete = async () => {
    setLoading(true);

    let str = '';
    selectedGrids.forEach(item => {
      str += graphqlString({
        id: item.id,
      });
    });

    try {
      await client.mutate({
        mutation: gql(`mutation { ${str} }`),
        refetchQueries: [
          {
            query: ALL_IFORM_GRID,
            variables: { pipelineId, filter },
          },
        ],
      });
      setLoading(false);
      cogoToast.success('Grid successfully deleted');
      handleShow();
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
      handleShow();
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Delete
      </Button>
      <DeleteModal
        show={isShow}
        isLoading={isLoading}
        onAccept={handleDelete}
        onClose={handleShow}
      />
    </>
  );
};

DeleteGrid.propTypes = {
  client: shape({}),
  selectedGrids: arrayOf(shape({})),
  filter: shape({}),
  pipelineId: string,
};

DeleteGrid.defaultProps = {
  client: {},
  selectedGrids: [],
  filter: {},
  pipelineId: null,
};

export default withApollo(DeleteGrid);
