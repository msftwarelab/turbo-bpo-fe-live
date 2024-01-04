import React from 'react';
import { Formik } from 'formik';
import { shape, func, bool } from 'prop-types';
import { Form, Col, Row, Modal, Button } from 'react-bootstrap';
import recordTypes from 'constants/recordTypes';
import CompanySelect from 'components/CompanySelect';
import { useMe } from 'contexts/Me';
import validationSchema from './validationSchema';

const AccountForm = ({ initialValues, onSubmit, onClose, isLoading }) => {
  const { me } = useMe();
  const isAdmin = me.roles.includes('ADMIN');
  const isClient = me.roles.includes('CLIENT');
  return (
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
        const handleCompanyChange = e => {
          setFieldValue('company', e ? e.name : null);
          setFieldValue('webSite', e ? e.webSite : null);
        };

        const handlePremiumCompanySelect = e => {
          setFieldValue('company', e ? e.name : null);
          setFieldValue('webSite', e ? e.webSite : null);
        };

        return (
          <>
            <Form onSubmit={handleSubmit}>
              <Modal.Body>
                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    Type
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      as="select"
                      name="recordType"
                      onChange={handleChange}
                      value={values.recordType || ''}
                      isInvalid={errors.recordType && touched.recordType}
                    >
                      {recordTypes.map((item, key) => (
                        <option key={key} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.recordType}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    Company
                  </Form.Label>
                  <Col sm="8">
                    <CompanySelect
                      name="company"
                      returnValue="OBJECT"
                      isPremium={false}
                      isAdmin={isAdmin}
                      isClient={isClient}
                      onChange={e => handleCompanyChange(e)}
                      value={values.company || ''}
                      isInvalid={errors.company && touched.company}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.company}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                {values.company === 'Others' && (
                  <Form.Group as={Row}>
                    <Form.Label column sm="4">
                      Premium
                    </Form.Label>
                    <Col sm="8">
                      <CompanySelect
                        isPremium
                        name="premiumCompany"
                        returnValue="OBJECT"
                        isAdmin={isAdmin}
                        isClient={isClient}
                        onChange={e => handlePremiumCompanySelect(e)}
                        value={values.premiumCompany || ''}
                        isInvalid={
                          errors.premiumCompany && touched.premiumCompany
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.premiumCompany}
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                )}

                {values.premiumCompany === 'Custom' && (
                  <Form.Group as={Row}>
                    <Form.Label column sm="4">
                      Custom
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        name="otherCompany"
                        onChange={handleChange}
                        value={values.otherCompany || ''}
                        isInvalid={errors.otherCompany && touched.otherCompany}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.otherCompany}
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                )}

                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    Website
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
                    Username
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      name="username"
                      placeholder="Username"
                      onChange={handleChange}
                      value={values.username || ''}
                      isInvalid={errors.username && touched.username}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    Password
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
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
                    Security PIN
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      placeholder="Others"
                      name="others"
                      onChange={handleChange}
                      value={values.others || ''}
                      isInvalid={errors.others && touched.others}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.others}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <h6 className="my-4">Secret Q&A (Optional)</h6>

                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    Question1
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      placeholder="Question1"
                      name="question1"
                      onChange={handleChange}
                      value={values.question1 || ''}
                      isInvalid={errors.question1 && touched.question1}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.question1}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    Answer1
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      placeholder="Answer1"
                      name="answer1"
                      onChange={handleChange}
                      value={values.answer1 || ''}
                      isInvalid={errors.answer1 && touched.answer1}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.answer1}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    Question2
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      placeholder="Question2"
                      name="question2"
                      onChange={handleChange}
                      value={values.question2 || ''}
                      isInvalid={errors.question2 && touched.question2}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.question2}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    Answer2
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      placeholder="Answer2"
                      name="answer2"
                      onChange={handleChange}
                      value={values.answer2 || ''}
                      isInvalid={errors.answer2 && touched.answer2}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.answer2}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    Question3
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      placeholder="Question3"
                      name="question3"
                      onChange={handleChange}
                      value={values.question3 || ''}
                      isInvalid={errors.question3 && touched.question3}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.question3}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    Answer3
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      placeholder="Answer3"
                      name="answer3"
                      onChange={handleChange}
                      value={values.answer3 || ''}
                      isInvalid={errors.answer3 && touched.answer3}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.answer3}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Modal.Body>

              <Modal.Footer>
                <Button type="submit" variant="warning" disabled={isLoading}>
                  Save account
                </Button>
                <Button variant="primary" onClick={onClose}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};

AccountForm.propTypes = {
  initialValues: shape({}),
  onSubmit: func,
  onClose: func,
  isLoading: bool,
};

AccountForm.defaultProps = {
  initialValues: {},
  onSubmit: e => e,
  onClose: e => e,
  isLoading: false,
};

export default AccountForm;
