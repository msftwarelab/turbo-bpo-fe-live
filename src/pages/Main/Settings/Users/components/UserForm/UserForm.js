import React from 'react';
import { Formik } from 'formik';
import { shape, func, bool } from 'prop-types';
import { Form, Button, Col, Row, Modal } from 'react-bootstrap';
import StatusSelect from 'components/StatusSelect';
import RolesSelect from 'components/RolesSelect';
import themeOptions from 'constants/themeOptions';
import PermissionGroupSelect from 'components/PermissionGroupSelect';
import validationSchema from './validationSchema';

const UserForm = ({ initialValues, onSubmit, onClose, isLoading }) => (
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
    }) => {
      const handleRoleChange = selectRoles => {
        if (
          selectRoles &&
          selectRoles.map(item => item.value).includes('CLIENT')
        )
          setFieldValue('roles', ['CLIENT']);
        else
          setFieldValue(
            'roles',
            selectRoles ? selectRoles.map(item => item.value) : null
          );
      };
      const handleCheckbox = name => setFieldValue(name, !values[name]);
      return (
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Roles
              </Form.Label>
              <Col sm="8">
                <RolesSelect
                  name="roles"
                  onChange={handleRoleChange}
                  value={values.roles || ''}
                  isInvalid={errors.roles && touched.roles}
                  isMulti
                />
                {errors.roles && touched.roles && (
                  <div className="text-danger">
                    <small>{errors.roles}</small>
                  </div>
                )}
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Status
              </Form.Label>
              <Col sm="8">
                <StatusSelect
                  name="status"
                  onChange={handleChange}
                  value={values.status || ''}
                  isInvalid={errors.status && touched.status}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.status}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Enable email notification
              </Form.Label>
              <Col sm="8">
                <Form.Check
                  type="checkbox"
                  name="isEnableEmailNotification"
                  onChange={() => handleCheckbox('isEnableEmailNotification')}
                  checked={Boolean(values.isEnableEmailNotification)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Email address
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={handleChange}
                  value={values.email || ''}
                  isInvalid={errors.email && touched.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Firstname
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  placeholder="Firstname"
                  name="firstName"
                  onChange={handleChange}
                  value={values.firstName || ''}
                  isInvalid={errors.firstName && touched.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Lastname
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  placeholder="Lastname"
                  name="lastName"
                  onChange={handleChange}
                  value={values.lastName || ''}
                  isInvalid={errors.lastName && touched.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Password
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={values.password || ''}
                  isInvalid={errors.password && touched.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Company
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  placeholder="Company"
                  name="company"
                  onChange={handleChange}
                  value={values.company || ''}
                  isInvalid={errors.company && touched.company}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.company}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Phone number
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  placeholder="Phone number"
                  name="phoneNumber"
                  onChange={handleChange}
                  value={values.phoneNumber || ''}
                  isInvalid={errors.phoneNumber && touched.phoneNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phoneNumber}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Address
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  placeholder="Address"
                  name="address"
                  onChange={handleChange}
                  value={values.address || ''}
                  isInvalid={errors.address && touched.address}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="4">
                City
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  placeholder="City"
                  name="city"
                  onChange={handleChange}
                  value={values.city || ''}
                  isInvalid={errors.city && touched.city}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="4">
                State
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  placeholder="State"
                  name="state"
                  onChange={handleChange}
                  value={values.state || ''}
                  isInvalid={errors.state && touched.state}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.state}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="4">
                ZIP Code
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  placeholder="ZIP Code"
                  name="zipCode"
                  onChange={handleChange}
                  value={values.zipCode || ''}
                  isInvalid={errors.zipCode && touched.zipCode}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.zipCode}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Permission group
              </Form.Label>
              <Col sm="8">
                <PermissionGroupSelect
                  name="permissionGroupId"
                  onChange={e => setFieldValue('permissionGroupId', e)}
                  value={values.permissionGroupId || ''}
                  isInvalid={
                    errors.permissionGroupId && touched.permissionGroupId
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.permissionGroupId}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Theme
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  name="theme"
                  as="select"
                  onChange={handleChange}
                  value={values.theme || ''}
                  isInvalid={errors.theme && touched.theme}
                >
                  {themeOptions.map(item => (
                    <option value={item.value} id={item.value}>
                      {item.label}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.theme}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit" variant="warning" disabled={isLoading}>
              Save changes
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </Modal.Footer>
        </Form>
      );
    }}
  </Formik>
);

UserForm.propTypes = {
  initialValues: shape({}),
  onSubmit: func,
  onClose: func,
  isLoading: bool,
};

UserForm.defaultProps = {
  initialValues: {},
  onSubmit: e => e,
  onClose: e => e,
  isLoading: false,
};

export default UserForm;
