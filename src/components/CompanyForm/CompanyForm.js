import React from 'react';
import { Formik } from 'formik';
import { shape, func, bool } from 'prop-types';
import { Form, Button, Col, Row, Modal } from 'react-bootstrap';
import validationSchema from './validationSchema';

const CompanyForm = ({ initialValues, onSubmit, onClose, isLoading }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({ handleSubmit, handleChange, errors, touched, values }) => {
      return (
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Name
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  name="name"
                  placeholder="Enter name"
                  onChange={handleChange}
                  value={values.name || ''}
                  isInvalid={errors.name && touched.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Style
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  as="textarea"
                  rows="3"
                  name="style"
                  placeholder="Enter style"
                  onChange={handleChange}
                  value={values.style || ''}
                  isInvalid={errors.style && touched.style}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.style}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              Save changes
            </Button>
          </Modal.Footer>
        </Form>
      );
    }}
  </Formik>
);

CompanyForm.propTypes = {
  initialValues: shape({}),
  onSubmit: func,
  onClose: func,
  isLoading: bool,
};

CompanyForm.defaultProps = {
  initialValues: {},
  onSubmit: e => e,
  onClose: e => e,
  isLoading: false,
};

export default CompanyForm;
