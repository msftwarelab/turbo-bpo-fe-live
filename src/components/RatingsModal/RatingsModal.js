import React, { useState } from 'react';
import { withApollo } from 'react-apollo';
import { Modal } from 'react-bootstrap';
import removeNull from 'utils/removeNull';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import RatingsModalForm from './components/RatingsModalForm';
import { useRightClickDisabled } from 'contexts/RightClickDisabled';
import ALL_PIPELINE from 'queries/allPipeline';
import { UPDATE_PIPELINE } from './mutations';

const RatingsModal = ({ pipeline, client, pipelineFilter }) => {
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { setRightClickDisabled } = useRightClickDisabled();
  const handleShow = () => {
    setShow(!isShow);
    setRightClickDisabled(!isShow);
  }
  const newPipeline = {
    ratingOverAll: pipeline.ratingOverAll,
    ratingTimeliness: pipeline.ratingTimeliness,
    ratingQuality: pipeline.ratingQuality,
    ratingFeedback: pipeline.ratingFeedback,
  };

  const handleSubmit = async data => {
    setLoading(true);
    const input = { ...removeNull(data) };
    try {
      const {
        data: { updatePipeline },
      } = await client.mutate({
        mutation: UPDATE_PIPELINE,
        variables: {
          id: pipeline.id,
          input,
        },
        refetchQueries: [
          {
            query: ALL_PIPELINE,
            variables: {
              filter: { ...pipelineFilter },
            },
          },
        ],
      });
      setLoading(false);
      if (updatePipeline) cogoToast.success('Complete');
      else cogoToast.error(setErrorMessage());
      handleShow();
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };
  return (
    <>
      <a href="#/" onClick={handleShow}>
        Rating:
      </a>
      {/* : {pipeline.ratingOverAll || '-'} */}
      <Modal show={isShow} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Rate It!</Modal.Title>
        </Modal.Header>
        <RatingsModalForm
          isLoading={isLoading}
          initialValues={newPipeline}
          onClose={handleShow}
          onSubmit={handleSubmit}
        />
      </Modal>
    </>
  );
};

export default withApollo(RatingsModal);
