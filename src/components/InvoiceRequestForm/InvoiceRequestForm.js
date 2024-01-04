import React from 'react';
import { Formik } from 'formik';
import { shape, func, bool } from 'prop-types';
import qcTypeOptions from 'constants/qcTypeOptions';
import { Form, Col, Row, Button, Modal } from 'react-bootstrap';
import { useMe } from 'contexts/Me';
import validationSchema from './validationSchema';

const InvoiceRequestForm = ({
  initialValues,
  onSubmit,
  onClose,
  isLoading,
}) => {
  const { me } = useMe();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {({ handleSubmit, handleChange, errors, touched, values }) => (
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Type
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  onChange={handleChange}
                  as="select"
                  name="type"
                  value={values.type}
                  isInvalid={errors.type && touched.type}
                >
                  <option value="SUBMIT">Submit</option>
                  <option value="ORDER">Order</option>
                  {['ADMIN', 'QUALITY_CONTROL'].some(item =>
                    me.roles.includes(item)
                  ) && <option value="QC">QC</option>}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.type}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            {values.type === 'QC' && (
              <Form.Group as={Row}>
                <Form.Label column sm="4">
                  QC Type
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    onChange={handleChange}
                    as="select"
                    name="qcType"
                    value={values.qcType}
                    isInvalid={errors.qcType && touched.qcType}
                  >
                    <option value="">Select</option>
                    {qcTypeOptions.map(item => (
                      <option value={item.value}>{item.label}</option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.qcType}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
            )}
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Order Number
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  onChange={handleChange}
                  name="orderNumber"
                  value={values.orderNumber}
                  isInvalid={errors.orderNumber && touched.orderNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.orderNumber}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Remarks
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  onChange={handleChange}
                  as="textarea"
                  name="remarks"
                  value={values.remarks}
                  isInvalid={errors.remarks && touched.remarks}
                  rows="3"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.remarks}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit" variant="warning" disabled={isLoading}>
              Add
            </Button>
            <Button variant="primary" onClick={onClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </Formik>
  );
};

InvoiceRequestForm.propTypes = {
  initialValues: shape({}),
  onSubmit: func,
  onClose: func,
  isLoading: bool,
};

InvoiceRequestForm.defaultProps = {
  initialValues: {},
  onSubmit: e => e,
  onClose: e => e,
  isLoading: false,
};

export default InvoiceRequestForm;
