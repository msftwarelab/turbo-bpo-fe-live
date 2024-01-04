import React from 'react';
import { Formik } from 'formik';
import { shape, func, bool } from 'prop-types';
import validationSchema from './validationSchema';
import { Form, Col, Row, Modal, Button } from 'react-bootstrap';

const HeaderForm = ({ initialValues, onSubmit, onClose, isLoading }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({
      handleSubmit,
      handleChange,
      errors,
      touched,
      values,
      setFieldValue,
    }) => (
      <>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Name
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                  value={values.name || ''}
                  isInvalid={errors.name && touched.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit" variant="warning" disabled={isLoading}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </Modal.Footer>
        </Form>
      </>
    )}
  </Formik>
);

HeaderForm.propTypes = {
  initialValues: shape({}),
  onSubmit: func,
  onClose: func,
  isLoading: bool,
};

HeaderForm.defaultProps = {
  initialValues: {},
  onSubmit: e => e,
  onClose: e => e,
  isLoading: false,
};

export default HeaderForm;
