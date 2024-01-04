import React from 'react';
import { Formik } from 'formik';
import { Form, Button, Alert } from 'react-bootstrap';
import validationSchema from './validationSchema';

const ForgotPasswordForm = ({handleSubmit, isLoading, isSuccess }) => (
  <Formik
    initialValues={
      { email: ''}
    }
    onSubmit={handleSubmit}
    validationSchema={validationSchema}
  >
{ ({ handleSubmit, handleChange, errors, touched, values }) => (
    <Form onSubmit={handleSubmit}>
      {
        isSuccess && (
          <Alert  variant='primary'>
            Please check your email, for further instructions
          </Alert>
        )
      }
      
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
        
      <Button block type="submit" disabled={isLoading}>
        Reset Password
      </Button>
      </Form>
    )}

  </Formik>    
)

export default ForgotPasswordForm;
