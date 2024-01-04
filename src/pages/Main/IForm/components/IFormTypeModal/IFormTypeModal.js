import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import UPDATE_IFORM from 'mutations/updateIform';
import IFORM from 'queries/iform';
import { useMutation, useQuery } from '@apollo/react-hooks';
import setErrorMessage from 'utils/setErrorMessage';
import cogoToast from 'cogo-toast';
import PIPELINE from 'queries/pipeline';
import CompanyFormSelect from 'components/CompanyFormSelect';
import { shape, string } from 'prop-types';

const IFormTypeModal = ({ pipelineId, iform }) => {
  const { loading, error, data = {} } = useQuery(PIPELINE, {
    variables: {
      id: pipelineId,
    },
  });
  const [isLoading, setLoading] = useState(false);
  const [updateIform] = useMutation(UPDATE_IFORM);
  const [input, setInput] = useState({
    formType: iform.formType || 'COMMON',
  });
  if (error) return <div>{setErrorMessage(error)}</div>;
  if (loading) return <div>loading...</div>;
  const { pipeline = {} } = data;
  const handleChange = e => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await updateIform({
        variables: {
          pipelineId,
          input,
        },
        refetchQueries: [{ query: IFORM, variables: { pipelineId } }],
      });
      setLoading(false);
      cogoToast.success('IForm initiated');
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };
  const isShow = iform.formType === undefined;
  return (
    <Modal show={isShow}>
      <Modal.Header>
        <Modal.Title>Select Form</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group as={Row}>
          <Form.Label column sm="3">
            Select Form
          </Form.Label>
          <Col sm="9">
            <CompanyFormSelect
              companyId={pipeline.companyId}
              name="formType"
              value={input.formType}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" disabled={isLoading} onClick={handleSubmit}>
          Save form
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

IFormTypeModal.propTypes = {
  pipelineId: string,
  iform: shape({}),
};

IFormTypeModal.defaultProps = {
  pipelineId: null,
  iform: {},
};

export default IFormTypeModal;
