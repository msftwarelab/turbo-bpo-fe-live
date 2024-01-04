import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import { withApollo } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import setErrorMessage from 'utils/setErrorMessage';
import ALL_PIPELINE from 'queries/allPipeline';
import { shape } from 'prop-types';

import ALL_PIPELINE_PHOTO from 'queries/allPipelinePhoto';
import { SAVE_PIPELINE_PHOTO } from './mutations';
import Image from './components/Image';
import ImageDrop from './components/ImageDrop';

const initialState = {
  isLoading: false,
  files: [],
};

const AddPipelinePhoto = ({ client, pipeline, filter, pipelineFilter }) => {
  const [isShow, setShow] = useState(false);
  const [state, setState] = useState(initialState);

  const handleShowModal = () => setShow(!isShow);

  const handleSubmit = async () => {
    setState({ ...state, isLoading: true });
    try {
      const { files } = state;
      const promisedMutations = files.map(file => {
        return client.mutate({
          mutation: SAVE_PIPELINE_PHOTO,
          variables: {
            pipelineId: pipeline.id,
            input: {
              doc: file,
            },
          },
          refetchQueries: [
            {
              query: ALL_PIPELINE,
              variables: { filter: pipelineFilter },
            },
            {
              query: ALL_PIPELINE_PHOTO,
              variables: { pipelineId: pipeline.id, filter },
            },
          ],
        });
      });
      await Promise.all(promisedMutations);
      setState(initialState);
      cogoToast.success('Complete');
      handleShowModal();
    } catch (e) {
      setState({ ...state, isLoading: false });
      cogoToast.error(setErrorMessage(e));
    }
  };

  const handleRemove = file => {
    const { files } = state;
    setState({
      ...state,
      files: files.filter(item => item !== file),
    });
  };

  const handFileChange = files => {
    setState({ ...state, files });
  };

  const { isLoading, files } = state;

  return (
    <>
      <Button onClick={handleShowModal} variant="warning">
        Upload
      </Button>
      <Modal show={isShow} onHide={handleShowModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add photo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="mb-3">
            <ImageDrop onDrop={handFileChange} />
          </div>
          <Row>
            {files.map((item, k) => (
              <Col sm={4} md={3} key={k}>
                <Image
                  src={URL.createObjectURL(item)}
                  onClose={() => handleRemove(item)}
                />
              </Col>
            ))}
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="warning" disabled={isLoading} onClick={handleSubmit}>
            Save {isLoading && <FontAwesomeIcon icon={faSpinner} spin />}
          </Button>

          <Button
            variant="primary"
            disabled={isLoading}
            onClick={handleShowModal}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AddPipelinePhoto.defaultProps = {
  client: {},
  pipeline: {},
  filter: {},
  pipelineFilter: {},
};

AddPipelinePhoto.propTypes = {
  client: shape({}),
  pipeline: shape({}),
  filter: shape({}),
  pipelineFilter: shape({}),
};

export default withApollo(AddPipelinePhoto);
