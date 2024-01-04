import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import { withApollo } from 'react-apollo';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import startCase from 'lodash/startCase';
import setErrorMessage from 'utils/setErrorMessage';
import { SAVE_PROFILE_DOC } from './mutations';
import { ALL_PROFILE_DOC } from '../DocList/queries';

const types = [
  'License',
  'EO insurance',
  'resume',
  'signature',
  'w9',
  'others',
];

const initialState = {
  isLoading: false,
  type: 'licence',
  file: null,
};

const AddDoc = ({ client, filter }) => {
  const [isShow, setShow] = useState(false);
  const [state, setState] = useState(initialState);

  const handleShowModal = () => setShow(!isShow);

  const handleSubmit = async () => {
    setState({ ...state, isLoading: true });
    const { type, file } = state;
    try {
      const {
        data: { saveProfileDoc },
      } = await client.mutate({
        mutation: SAVE_PROFILE_DOC,
        variables: {
          input: {
            type,
            doc: file,
          },
        },
        refetchQueries: [
          {
            query: ALL_PROFILE_DOC,
            variables: { filter },
          },
        ],
      });
      setState(initialState);
      if (saveProfileDoc) cogoToast.success('Complete');
      else cogoToast.error(setErrorMessage());
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

  const handFileChange = e => {
    const {
      files: [file],
    } = e.target;
    setState({ ...state, file });
  };

  const { isLoading, type } = state;

  return (
    <>
      <Button onClick={handleShowModal}>Upload</Button>
      <Modal show={isShow} onHide={handleShowModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Documents</Modal.Title>
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
          <Form.Group as={Row}>
            <Form.Label column sm="3">
              Document File
            </Form.Label>
            <Col sm="9">
              <Form.Control type="file" onChange={handFileChange} />
            </Col>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="warning" disabled={isLoading} onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="primary" onClick={handleShowModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default withApollo(AddDoc);
