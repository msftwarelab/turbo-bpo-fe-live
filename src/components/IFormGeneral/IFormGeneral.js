import React, { useState } from 'react';
import { Modal, Card, Col, Button, Form } from 'react-bootstrap';
import UPDATE_IFORM from 'mutations/updateIform';
import IFORM from 'queries/iform';
import cogoToast from 'cogo-toast';
import { useMutation, useQuery } from '@apollo/react-hooks';
import removeNull from 'utils/removeNull';
import setErrorMessage from 'utils/setErrorMessage';
import removeTypeName from 'utils/removeTypeName';
import PIPELINE from 'queries/pipeline';
import Order from './components/Order';
import User from './components/User';

const IFormGeneral = ({ pipelineId, iform }) => {
  const { loading, error, data = {} } = useQuery(PIPELINE, {
    variables: {
      id: pipelineId,
    },
  });
  if (error) cogoToast.error(setErrorMessage(error));
  const { pipeline = {} } = data;
  const [updateIform] = useMutation(UPDATE_IFORM);
  const [input, setInput] = useState(iform);
  const [isLoading, setLoading] = useState(false);
  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);
  const newInputs = removeNull(removeTypeName(input));
  delete newInputs.pipelineId;
  delete newInputs.id;
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await updateIform({
        variables: {
          pipelineId,
          input: newInputs,
        },
        refetchQueries: [{ query: IFORM, variables: { pipelineId } }],
      });
      setLoading(false);
      cogoToast.success('Generals successfully updated');
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };
  const handleChange = e => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  return (
    <>
      <Button onClick={handleShow}>General</Button>
      {isShow && (
        <Modal show onHide={handleShow} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>General</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="d-flex mb-3">
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={isLoading || loading}
                className="mr-2"
              >
                Save
              </Button>
              <Button onClick={handleSubmit} disabled={isLoading}>
                Search Criteria
              </Button>
            </div>
            <Form.Row>
              <Col sm="4">
                <Order
                  pipeline={pipeline}
                  input={input}
                  onChange={handleChange}
                />
                {pipeline.assignId && (
                  <User
                    userId={pipeline.assignId}
                    input={input}
                    onChange={handleChange}
                  />
                )}
              </Col>
              <Col>
                <Card>
                  <Card.Header>CLEAR CAPITAL</Card.Header>
                  <Card.Body>
                    <div className="d-flex">
                      <Button className="mr-2">Save</Button>
                      <Button className="mr-2">Clear fields</Button>
                      <Button className="mr-2">Save template</Button>
                      <Button>Load template</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Form.Row>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default IFormGeneral;
