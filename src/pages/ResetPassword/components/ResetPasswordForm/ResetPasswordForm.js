import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import validationSchema from './validationSchema';


const ResetPasswordForm = ({ handleSubmit, isLoading, isSuccess }) => (
  <Formik
    initialValues={{
      password: '',
      passwordConfirm: '',
    }}
    onSubmit={handleSubmit}
    validationSchema={validationSchema}
  >
    {({ handleSubmit, handleChange, errors, touched, values }) => (
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
            value={values.password}
            isInvalid={errors.password && touched.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="passwordConfirm"
            placeholder="Enter password"
            onChange={handleChange}
            value={values.passwordConfirm}
            isInvalid={errors.passwordConfirm && touched.passwordConfirm}
          />
          <Form.Control.Feedback type="invalid">
            {errors.passwordConfirm}
          </Form.Control.Feedback>
        </Form.Group>

        <Button block type="submit" disabled={isLoading}>
          Save Password
        </Button>
      </Form>
    )}
  </Formik>
);

export default ResetPasswordForm;
