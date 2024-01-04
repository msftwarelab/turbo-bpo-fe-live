import React from 'react';
import { Formik } from 'formik';
import { shape, func, bool } from 'prop-types';
import validationSchema from './validationSchema';
import { Form, Button } from 'react-bootstrap';

const LoginForm = ({ initialValues, onSubmit, isLoading }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({ handleSubmit, handleChange, errors, touched, values }) => (
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleChange}
            value={values.email}
            isInvalid={errors.email && touched.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={values.password}
            isInvalid={errors.password && touched.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Button block type="submit" disabled={isLoading}>
          Login
        </Button>
      </Form>
    )}
  </Formik>
);

LoginForm.propTypes = {
  initialValues: shape({}),
  onSubmit: func,
  onClose: func,
  isLoading: bool,
};

LoginForm.defaultProps = {
  initialValues: {},
  onSubmit: e => e,
  onClose: e => e,
  isLoading: false,
};

export default LoginForm;
