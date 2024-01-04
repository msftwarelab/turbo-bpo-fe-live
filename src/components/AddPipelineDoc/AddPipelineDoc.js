import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import { withApollo } from 'react-apollo';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import startCase from 'lodash/startCase';
import setErrorMessage from 'utils/setErrorMessage';
import ALL_PIPELINE from 'queries/allPipeline';
import ALL_PIPELINE_DOC from 'queries/allPipelineDoc';
import FileDrop from './components/FileDrop';
import File from './components/File';
import { SAVE_PIPELINE_DOC } from './mutations';

const types = ['Appraisal ', 'Tax Record', 'Subject MLS', 'Comps MLS', 'Other'];

const initialState = {
  isLoading: false,
  type: 'Appraisal',
  files: [],
};

const AddPipelineDoc = ({ client, pipeline, filter, pipelineFilter }) => {
  const [isShow, setShow] = useState(false);
  const [state, setState] = useState(initialState);

  const handleShowModal = () => setShow(!isShow);

  const handleSubmit = async () => {
    setState({ ...state, isLoading: true });
    const { type, files } = state;
    try {
      const promisedMutations = files.map(file => {
        return client.mutate({
          mutation: SAVE_PIPELINE_DOC,
          variables: {
            pipelineId: pipeline.id,
            input: {
              type,
              doc: file,
            },
          },
          refetchQueries: [
            {
              query: ALL_PIPELINE,
              variables: { filter: pipelineFilter },
            },
            {
              query: ALL_PIPELINE_DOC,
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

  const handleChange = e => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
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

  const { isLoading, type, files } = state;

  return (
    <>
      <Button onClick={handleShowModal} variant="warning">
        Upload
      </Button>
      <Modal show={isShow} onHide={handleShowModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add document</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group as={Row}>
            <Form.Label column sm="3">
              File Type
            </Form.Label>
            <Col sm="9">
              <Form.Control
                as="select"
                name="type"
                value={type}
                onChange={handleChange}
              >
                {types.map(item => (
                  <option key={item} value={item}>
                    {startCase(item)}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group>
            <div className="mb-3">
              <FileDrop onDrop={handFileChange} />
            </div>
            <Row>
              {files.map((item, k) => (
                <Col sm={4} md={3} key={k}>
                  <File onClose={() => handleRemove(item)} />
                </Col>
              ))}
            </Row>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="warning" disabled={isLoading} onClick={handleSubmit}>
            Save
          </Button>
          <Button onClick={handleShowModal}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default withApollo(AddPipelineDoc);
