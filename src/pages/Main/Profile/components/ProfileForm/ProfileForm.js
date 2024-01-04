import React from 'react';
import { Formik } from 'formik';
import { shape, func, bool, arrayOf, string } from 'prop-types';
import { Form, Button, Col, Row } from 'react-bootstrap';
import Datetime from 'react-datetime';
import moment from 'moment';
import ImagePreview from './components/ImagePreview';
import Docs from './components/Docs';
import validationSchema from './validationSchema';

const ProfileForm = ({ initialValues, onSubmit, isLoading, roles }) => (
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
    }) => {
      const handleimABroker = () => {
        setFieldValue('imABroker', !values.imABroker);

        if (!values.imABroker) {
          setFieldValue('agent', '');
          setFieldValue('agentLicense', '');
        }
      };

      return (
        <Form onSubmit={handleSubmit}>
          <Row className="mb-4">
            <Col sm="4">
              <Button
                type="submit"
                disabled={isLoading}
                variant="warning"
                className="mb-2"
              >
                Save
              </Button>
              <ImagePreview
                url={values.profilePicture || ''}
                onChange={file => setFieldValue('profilePicture', file)}
              />
            </Col>
            <Col sm="8">
              <Docs />
            </Col>
          </Row>

          <Form.Group as={Row}>
            <Form.Label column sm="4">
              Email address
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="email"
                name="email"
                readOnly
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

          {!roles.includes('CONTRACTOR') && (
            <>
              <Form.Group as={Row}>
                <Form.Label column sm="4">
                  Im a broker?
                </Form.Label>
                <Col sm="8">
                  <div key="broker" className="mt-2">
                    <Form.Check
                      id="broker"
                      checked={values.imABroker}
                      type="checkbox"
                      label="Yes I am"
                      onChange={e => handleimABroker(e, setFieldValue, values)}
                    />
                  </div>
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm="4">
                  Broker
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    placeholder="Broker"
                    name="broker"
                    onChange={handleChange}
                    value={values.broker || ''}
                    isInvalid={errors.broker && touched.broker}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.broker}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm="4">
                  Broker License
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    placeholder="Broker License"
                    name="brokerLicense"
                    onChange={handleChange}
                    value={values.brokerLicense || ''}
                    isInvalid={errors.brokerLicense && touched.brokerLicense}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.brokerLicense}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm="4">
                  Agent
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    placeholder="Agent"
                    name="agent"
                    onChange={handleChange}
                    value={values.agent || ''}
                    isInvalid={errors.agent && touched.agent}
                    disabled={values.imABroker}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.agent}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm="4">
                  Agent License
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    placeholder="Agent License"
                    name="agentLicense"
                    onChange={handleChange}
                    value={values.agentLicense || ''}
                    isInvalid={errors.agentLicense && touched.agentLicense}
                    disabled={values.imABroker}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.agentLicense}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm="4">
                  License date
                </Form.Label>
                <Col sm="8">
                  <Datetime
                    value={
                      values.licenseDate
                        ? moment(values.licenseDate).format('MM/DD/YYYY')
                        : ''
                    }
                    onChange={e => {
                      setFieldValue('licenseDate', e.toISOString());
                      setFieldValue(
                        'yearOfExperience',
                        moment().diff(e, 'years')
                      );
                    }}
                    inputProps={{
                      className: 'form-control bg-white',
                      placeholder: 'License date',
                      readOnly: true,
                    }}
                    closeOnSelect
                    timeFormat={false}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.licenseDate}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm="4">
                  License expiration date
                </Form.Label>
                <Col sm="8">
                  <Datetime
                    value={
                      values.licenseExpirationDate
                        ? moment(values.licenseExpirationDate).format(
                            'MM/DD/YYYY'
                          )
                        : ''
                    }
                    onChange={e =>
                      setFieldValue('licenseExpirationDate', e.toISOString())
                    }
                    inputProps={{
                      className: 'form-control bg-white',
                      placeholder: 'License expiration date',
                      readOnly: true,
                    }}
                    closeOnSelect
                    timeFormat={false}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.licenseExpirationDate}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm="4">
                  Brokerage
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    placeholder="Brokerage"
                    name="brokerage"
                    onChange={handleChange}
                    value={values.brokerage || ''}
                    isInvalid={errors.brokerage && touched.brokerage}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.brokerage}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm="4">
                  Years of Experience
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    readOnly
                    type="number"
                    placeholder="Years of Experience"
                    name="yearOfExperience"
                    onChange={handleChange}
                    value={values.yearOfExperience || ''}
                    isInvalid={
                      errors.yearOfExperience && touched.yearOfExperience
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.yearOfExperience}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="4">
                  Disclaimer
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    as="textarea"
                    rows="3"
                    placeholder="Disclaimer"
                    name="disclaimer"
                    onChange={handleChange}
                    value={values.disclaimer || ''}
                    isInvalid={errors.disclaimer && touched.disclaimer}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.disclaimer}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
            </>
          )}
        </Form>
      );
    }}
  </Formik>
);

ProfileForm.propTypes = {
  initialValues: shape({}),
  onSubmit: func,
  isLoading: bool,
  roles: arrayOf(string),
};

ProfileForm.defaultProps = {
  initialValues: {},
  onSubmit: e => e,
  isLoading: false,
  roles: [],
};

export default ProfileForm;
