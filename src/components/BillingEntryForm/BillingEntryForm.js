import React from 'react';
import { Formik } from 'formik';
import { shape, func, bool } from 'prop-types';
import { Form, Button, Modal } from 'react-bootstrap';
import billingTypeOptions from 'constants/billingTypeOptions';
import validationSchema from './validationSchema';

const BillingEntryForm = ({ initialValues, onSubmit, onClose, isLoading }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, handleChange, errors, touched, values }) => {
        return (
          <>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Type</Form.Label>
                <Form.Control
                  name="type"
                  placeholder="Enter type"
                  onChange={handleChange}
                  as="select"
                  value={values.type || ''}
                  isInvalid={touched.type && errors.type}
                >
                  {billingTypeOptions.map(item => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  placeholder="Enter description"
                  rows="3"
                  onChange={handleChange}
                  value={values.description || ''}
                  isInvalid={touched.description && errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  name="amount"
                  type="number"
                  placeholder="Enter amount"
                  onChange={handleChange}
                  value={values.amount || ''}
                  isInvalid={touched.amount && errors.amount}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.amount}
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="warning"
                className="mr-2"
                disabled={isLoading}
                onClick={handleSubmit}
              >
                Add Entry
              </Button>
              <Button variant="primary" onClick={onClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </>
        );
      }}
    </Formik>
  );
};

BillingEntryForm.propTypes = {
  initialValues: shape({}),
  onSubmit: func,
  onClose: func,
  isLoading: bool,
};

BillingEntryForm.defaultProps = {
  initialValues: {},
  onSubmit: e => e,
  onClose: e => e,
  isLoading: false,
};

export default BillingEntryForm;
