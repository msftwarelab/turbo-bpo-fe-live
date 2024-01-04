import React from 'react';
import { Formik } from 'formik';
import { shape, func, bool } from 'prop-types';
import validationSchema from './validationSchema';
import PipelineSelect from 'components/PipelineSelect';
import { Form, Col, Row, Modal, Button } from 'react-bootstrap';

const ReviewForm = ({
  initialValues,
  onSubmit,
  isEdit,
  onClose,
  isLoading,
}) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({
      handleSubmit,
      setFieldValue,
      handleChange,
      errors,
      touched,
      values,
    }) => {
      const handleFileChange = e => {
        const {
          files: [file],
        } = e.target;
        setFieldValue('attachment', file);
      };
      const handlePipeline = pipelineId => {
        setFieldValue('pipelineId', pipelineId);
      };
      return (
        <>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              {!isEdit && (
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    Order Number
                  </Form.Label>
                  <Col sm="9">
                    <PipelineSelect
                      onChange={handlePipeline}
                      value={values.pipelineId || ''}
                    />
                    {errors.pipelineId && touched.pipelineId && (
                      <div className="text-danger">
                        <small>{errors.pipelineId}</small>
                      </div>
                    )}
                  </Col>
                </Form.Group>
              )}
              {isEdit && (
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    Address
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      name="address"
                      value={values.address || ''}
                      readOnly
                    />
                  </Col>
                </Form.Group>
              )}
              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  Review details
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    as="textarea"
                    row={5}
                    name="reviewDescription"
                    value={values.reviewDescription || ''}
                    onChange={handleChange}
                    isInvalid={
                      errors.reviewDescription && touched.reviewDescription
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.reviewDescription}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  Attachment
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="file"
                    multiple
                    onChange={handleFileChange}
                  />
                </Col>
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="primary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="warning" disabled={isLoading}>
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </>
      );
    }}
  </Formik>
);

ReviewForm.propTypes = {
  initialValues: shape({}),
  onSubmit: func,
  onClose: func,
  isLoading: bool,
};

ReviewForm.defaultProps = {
  initialValues: {},
  onSubmit: e => e,
  onClose: e => e,
  isLoading: false,
};

export default ReviewForm;
