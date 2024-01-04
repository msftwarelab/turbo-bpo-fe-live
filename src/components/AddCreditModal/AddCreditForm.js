import React from 'react';
import { shape, func } from 'prop-types';
import { Form, Button, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import validationSchema from './validationSchema';

const AddCreditForm = ({
  onClose,
  onSubmit,
  addedCredit,
}) => (
  <Formik
    initialValues={{ addedcredits: addedCredit }}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({ handleSubmit, handleChange, errors, touched, values }) => {
      return (
        <>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Credits to add:</Form.Label>
              <Form.Control
                name="addedcredits"
                type="number"
                placeholder="Add Credit"
                onChange={handleChange}
                value={values.addedcredits || ''}
                isInvalid={errors.addedcredits && touched.addedcredits}
              />
              <Form.Control.Feedback type="invalid">
                {errors.addedcredits}
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="warning"
              onClick={handleSubmit}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </Modal.Footer>
        </>
      );
    }}
  </Formik>
);

AddCreditForm.propTypes = {
  initialValues: shape({}),
  onSubmit: func,
  onClose: func,
};

AddCreditForm.defaultProps = {
  initialValues: {},
  onSubmit: e => e,
  onClose: e => e,
};

export default AddCreditForm;
