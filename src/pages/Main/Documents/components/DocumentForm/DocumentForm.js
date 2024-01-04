import React from 'react';
import { Formik } from 'formik';
import { shape, func, bool } from 'prop-types';
import validationSchema from './validationSchema';
import CompanySelect from 'components/CompanySelect';
import UserSelect from 'components/UserSelect';
import { Form, Col, Row, Modal, Button } from 'react-bootstrap';
import documentTagOptions from 'constants/documentTagOptions';

const DocumentForm = ({ initialValues, onSubmit, onClose, isLoading }) => (
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
      const handFileChange = e => {
        const {
          files: [file],
        } = e.target;
        setFieldValue('file', file);
      };
      return (
        <>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  Tag
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    as="select"
                    name="tag"
                    value={values.tag || ''}
                    onChange={handleChange}
                    isInvalid={errors.tag && touched.tag}
                  >
                    <option value="">Select one</option>
                    {documentTagOptions.map(item => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.tag}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              {values.tag === 'VENDOR' && (
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    Company
                  </Form.Label>
                  <Col sm="9">
                    <CompanySelect
                      name="company"
                      returnValue="OBJECT"
                      onChange={e => setFieldValue('company', e)}
                      value={values.company ? values.company.id : ''}
                      isInvalid={errors.company && touched.company}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.company}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
              )}
              {values.tag === 'SPECIAL' && (
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    Client
                  </Form.Label>
                  <Col sm="9">
                    <UserSelect
                      returnValue="OBJECT"
                      userRoles={['CLIENT']}
                      onChange={e => setFieldValue('client', e)}
                      value={values.client ? values.client.id : ''}
                    />
                    {errors.client && touched.client && (
                      <div className="text-danger">
                        <small>{errors.client}</small>
                      </div>
                    )}
                  </Col>
                </Form.Group>
              )}
              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  File
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="file"
                    onChange={handFileChange}
                    isInvalid={errors.file && touched.file}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.file}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  Comment
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    as="textarea"
                    row={3}
                    name="comment"
                    value={values.comment || ''}
                    onChange={handleChange}
                    isInvalid={errors.comment && touched.comment}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.comment}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button type="submit" variant="warning" disabled={isLoading}>
                Save
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

DocumentForm.propTypes = {
  initialValues: shape({}),
  onSubmit: func,
  onClose: func,
  isLoading: bool,
};

DocumentForm.defaultProps = {
  initialValues: {},
  onSubmit: e => e,
  onClose: e => e,
  isLoading: false,
};

export default DocumentForm;
