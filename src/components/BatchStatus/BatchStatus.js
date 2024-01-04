import React, { useState } from 'react';
import { Button, Modal, Form, Col } from 'react-bootstrap';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import setErrorMessage from 'utils/setErrorMessage';
import cogoToast from 'cogo-toast';
import ALL_PIPELINE from 'queries/allPipeline';

const graphqlString = ({ pipelineId = null, status = 'HOLD' }) =>
  `pipeline_${pipelineId}: updatePipeline(id: "${pipelineId}", input: {
    status: "${status}",
  })`;

const BatchStatus = ({
  selectedPipeline = [],
  client = {},
  pipelineFilter = {},
}) => {
  const [isLoading, setLoading] = useState(false);
  const [status, setStatus] = useState('HOLD');
  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);
  const handleOpenPipeline = () => {
    if (!selectedPipeline.length) {
      cogoToast.warn('No pipeline selected');
      return;
    }
    handleShow();
  };

  const handleChange = e => {
    const { value } = e.target;
    setStatus(value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!status) {
      cogoToast.warn('No status selected');
      return;
    }
    let str = '';
    selectedPipeline.map(pipeline => {
      str += graphqlString({
        pipelineId: pipeline.id,
        status,
      });
      return false;
    });
    setLoading(true);
    try {
      await client.mutate({
        mutation: gql(`mutation { ${str} }`),
        refetchQueries: [
          {
            query: ALL_PIPELINE,
            variables: { filter: pipelineFilter },
          },
        ],
      });
      cogoToast.success('Batch status done successfully');
      setLoading(false);
      setStatus('HOLD');
    } catch (err) {
      cogoToast.error(setErrorMessage(err));
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleOpenPipeline}>Batch status</Button>
      {isShow && (
        <Modal show size="sm" onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Batch Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} sm="8" controlId="formPlaintextEmail">
                  <Form.Control
                    as="select"
                    value={status}
                    onChange={handleChange}
                  >
                    <option value="HOLD">Hold</option>
                    <option value="COMPLETE">Completed</option>
                  </Form.Control>
                </Form.Group>
                <Col>
                  <Button type="submit" block disabled={isLoading}>
                    Save
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default withApollo(BatchStatus);
