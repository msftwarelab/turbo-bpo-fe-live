import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik } from 'formik';
import { faEdit, faTimes, faSave } from '@fortawesome/free-solid-svg-icons';
import validationSchema from './validationSchema';
import DeleteComment from '../DeleteComment';

const CommentForm = ({ initialValues, onSubmit, isLoading, onCancel }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
    enableReinitialize
  >
    {({
      handleSubmit,
      handleChange,
      setFieldValue,
      errors,
      touched,
      values,
    }) => (
      <>
        <Form>
          <Form.Group as={Row}>
            {values.isAdd ? (
              <Col sm={2}>
                <Form.Control
                  name="label"
                  value={values.label || ''}
                  onChange={handleChange}
                  placeholder="Label"
                  isInvalid={errors.label && touched.label}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.label}
                </Form.Control.Feedback>
              </Col>
            ) : (
              <Form.Label column sm={2}>
                {values.label}
              </Form.Label>
            )}
            <Col sm={8}>
              <Form.Control
                readOnly={values.isReadOnly}
                name="value"
                value={values.value || ''}
                onChange={handleChange}
                placeholder="Comment here"
                isInvalid={errors.value && touched.value}
              />
              <Form.Control.Feedback type="invalid">
                {errors.value}
              </Form.Control.Feedback>
            </Col>
            {values.isAdd ? (
              <Col sm={2}>
                <Button
                  variant="primary"
                  disabled={isLoading}
                  onClick={handleSubmit}
                >
                  <FontAwesomeIcon icon={faSave} />
                </Button>{' '}
                <Button
                  variant="primary"
                  disabled={isLoading}
                  onClick={onCancel}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </Button>
              </Col>
            ) : (
              <>
                {values.isEdit ? (
                  <Col sm={2}>
                    <Button
                      variant="primary"
                      disabled={isLoading}
                      onClick={handleSubmit}
                    >
                      <FontAwesomeIcon icon={faSave} />
                    </Button>{' '}
                    <Button
                      variant="primary"
                      disabled={isLoading}
                      onClick={() => {
                        setFieldValue('isEdit', false);
                        setFieldValue('isReadOnly', true);
                      }}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </Button>
                  </Col>
                ) : (
                  <Col sm={2}>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setFieldValue('isEdit', true);
                        setFieldValue('isReadOnly', false);
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>{' '}
                    <DeleteComment comment={values} />
                  </Col>
                )}
              </>
            )}
          </Form.Group>
        </Form>
      </>
    )}
  </Formik>
);

export default CommentForm;
