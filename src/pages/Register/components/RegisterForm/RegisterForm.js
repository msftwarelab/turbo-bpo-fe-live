import React from 'react';
import { Formik } from 'formik';
import { shape, func, bool } from 'prop-types';
import { Form, Button, Col, Row } from 'react-bootstrap';
import startCase from 'lodash/startCase';
import ReCAPTCHA from 'react-google-recaptcha';
import validationSchema from './validationSchema';

const hdyfuOptions = [
  'search engine',
  'craigslist',
  'backpage',
  'REO pro',
  'referral',
  'others',
];

const siteKey = '6LcLTtwZAAAAAPE7hLWplKge6BYv1itJ0SyXmMzG';

const RegisterForm = ({ initialValues, onSubmit, isLoading }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({
      handleSubmit,
      handleChange,
      setFieldValue,
      errors,
      touched,
      values,
    }) => (
      <Form onSubmit={handleSubmit}>
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
              value={values.email}
              isInvalid={errors.email && touched.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
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
              value={values.password}
              isInvalid={errors.password && touched.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
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
              value={values.firstName}
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
              value={values.lastName}
              isInvalid={errors.lastName && touched.lastName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.lastName}
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
              value={values.company}
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
              value={values.phoneNumber}
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
              value={values.address}
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
              value={values.city}
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
              value={values.state}
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
              value={values.zipCode}
              isInvalid={errors.zipCode && touched.zipCode}
            />
            <Form.Control.Feedback type="invalid">
              {errors.zipCode}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group>
          <Form.Label>How did you find us?</Form.Label>
          {hdyfuOptions.map(option => (
            <div key={option}>
              <Form.Check
                type="radio"
                id={option}
                name="hdyfu"
                label={startCase(option)}
                onChange={() => setFieldValue('hdyfu', option)}
              />
            </div>
          ))}
        </Form.Group>

        <Form.Group>
          <Form.Label>Would you like a phone consultation?</Form.Label>
          {['yes', 'no'].map(option => (
            <div key={option}>
              <Form.Check
                type="radio"
                id={option}
                name="phoneConsultation"
                onChange={() => {
                  return setFieldValue('phoneConsultation', option === 'yes');
                }}
                label={startCase(option)}
              />
            </div>
          ))}
        </Form.Group>

        <div className="d-flex align-items-center justify-content-center mb-2">
          <ReCAPTCHA
            sitekey={siteKey}
            name="recaptcha"
            onChange={value => {
              return setFieldValue('recaptcha', value);
            }}
          />
        </div>

        <Button block type="submit" disabled={isLoading}>
          Register
        </Button>
      </Form>
    )}
  </Formik>
);

RegisterForm.propTypes = {
  initialValues: shape({}),
  onSubmit: func,
  isLoading: bool,
};

RegisterForm.defaultProps = {
  initialValues: {},
  onSubmit: e => e,
  isLoading: false,
};

export default RegisterForm;
