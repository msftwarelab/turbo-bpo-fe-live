import React from 'react';
import { Formik } from 'formik';
import { shape, func, bool } from 'prop-types';
import { Form, Button, Col, Row, Modal } from 'react-bootstrap';
import PermissionList from 'components/PermissionList';
import validationSchema from './validationSchema';

const PermissionGroupForm = ({
  initialValues,
  onSubmit,
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
      handleChange,
      errors,
      touched,
      values,
      setFieldValue,
    }) => (
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Row className="mb-3">
            <Col sm="5">
              <Form.Group as={Row}>
                <Form.Label column sm="4">
                  Permission Name
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
            </Col>
          </Form.Row>
          {errors.permissions && touched.permissions && (
            <div className="text-danger mb-2">{errors.permissions}</div>
          )}
          <PermissionList
            selectedPermissions={values.permissions}
            onSelectPermission={e => setFieldValue('permissions', e)}
          />
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
    )}
  </Formik>
);

PermissionGroupForm.propTypes = {
  initialValues: shape({}),
  onSubmit: func,
  onClose: func,
  isLoading: bool,
};

PermissionGroupForm.defaultProps = {
  initialValues: {},
  onSubmit: e => e,
  onClose: e => e,
  isLoading: false,
};

export default PermissionGroupForm;
