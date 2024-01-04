import React from 'react';
import { Formik } from 'formik';
import { shape, func, bool } from 'prop-types';
import { Form, Col, Row, Modal, Button } from 'react-bootstrap';
import validationSchema from './validationSchema';

const CompanyForm = ({ initialValues, onSubmit, onClose, isLoading }) => (
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
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Web site
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  name="webSite"
                  placeholder="Web site"
                  onChange={handleChange}
                  value={values.webSite || ''}
                  isInvalid={errors.webSite && touched.webSite}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.webSite}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Standard
              </Form.Label>
              <Col sm="8">
                <div className="mt-2">
                  <Form.Check
                    inline
                    label="Admin"
                    type="checkbox"
                    id="isAdmin"
                    checked={values.isAdmin || false}
                    onChange={() => setFieldValue('isAdmin', !values.isAdmin)}
                  />
                  <Form.Check
                    inline
                    label="Client"
                    type="checkbox"
                    id="isClient"
                    checked={values.isClient || false}
                    onChange={() => setFieldValue('isClient', !values.isClient)}
                  />
                </div>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Premium
              </Form.Label>
              <Col sm="8">
                <Form.Check
                  aria-label="Premium"
                  checked={values.isPremium || false}
                  onChange={() => setFieldValue('isPremium', !values.isPremium)}
                />
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
