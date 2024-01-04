import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import { withApollo } from 'react-apollo';
import { Modal, Button, Form } from 'react-bootstrap';
import setErrorMessage from 'utils/setErrorMessage';
import ConfirmModal from 'components/ConfirmModal';
import ALL_PIPELINE from 'queries/allPipeline';
import Editor from 'components/Editor';
import { SAVE_PIPELINE_QUALITY_CONTROL } from './mutations';
import { ALL_PIPELINE_QUALITY_CONTROL } from '../QualityControlList/queries';

const AddQualityControl = ({ client, pipeline, filter, pipelineFilter }) => {
  const [isShow, setShow] = useState(false);
  const [isConfirm, setConfirm] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [orderNotes, setOrderNotes] = useState(null);
  const handleShowModal = () => setShow(!isShow);
  const handleConfirm = () => setConfirm(!isConfirm);

  const handleSubmit = async () => {
    handleConfirm();
    setLoading(true);
    setSubmitted(true);
    try {
      const {
        data: { savePipelineQualityControl },
      } = await client.mutate({
        mutation: SAVE_PIPELINE_QUALITY_CONTROL,
        variables: {
          pipelineId: pipeline.id,
          message: orderNotes,
        },
        refetchQueries: [
          {
            query: ALL_PIPELINE,
            variables: { filter: pipelineFilter },
          },
          {
            query: ALL_PIPELINE_QUALITY_CONTROL,
            variables: { pipelineId: pipeline.id, filter },
          },
        ],
      });
      setLoading(false);
      if (savePipelineQualityControl)
        cogoToast.success('QualityControl created');
      else cogoToast.error(setErrorMessage());
      setSubmitted(false);
      handleShowModal();
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };

  const handleChange = orderNotes => {
    setOrderNotes(orderNotes);
  };

  return (
    <>
      <Button onClick={handleShowModal} variant="warning">
        Add
      </Button>
      <Modal show={isShow} onHide={handleShowModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Quality Control</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Editor onChange={handleChange} placeholder="Enter message" />
            {isSubmitted && !orderNotes && (
              <div className="text-danger">Required</div>
            )}
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="warning"
            disabled={isLoading}
            onClick={handleConfirm}
          >
            Save
          </Button>
          <Button onClick={handleShowModal}>Cancel</Button>
        </Modal.Footer>
      </Modal>
      {isConfirm && (
        <ConfirmModal
          show
          title="Confirmation"
          description="This will set the order to Quality Control. Are you sure you want to proceed?"
          onAccept={handleSubmit}
          onClose={handleConfirm}
        />
      )}
    </>
  );
};

export default withApollo(AddQualityControl);
