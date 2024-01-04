import React from 'react';
import { Formik } from 'formik';
import { shape, func, bool } from 'prop-types';
import Datetime from 'react-datetime';
import moment from 'moment';
import { Form, Button, Col, Row, Modal } from 'react-bootstrap';
import Editor from 'components/Editor';
import validationSchema from './validationSchema';

const AnnouncementForm = ({
  initialValues,
  onSubmit,
  onClose,
  isLoading,
  isEdit,
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
    }) => {
      const handleEditorChange = message => {
        setFieldValue('message', message);
      };
      return (
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Subject
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="subject"
                  name="subject"
                  placeholder="Enter subject"
                  onChange={handleChange}
                  value={values.subject || ''}
                  isInvalid={errors.subject && touched.subject}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.subject}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Message
              </Form.Label>
              <Col sm="8">
                <Editor
                  onChange={handleEditorChange}
                  placeholder="Enter message"
                  value={values.message || ''}
                  isEdit={isEdit}
                />
                {errors.message && touched.message && (
                  <Form.Control.Feedback type="invalid">
                    {errors.message}
                  </Form.Control.Feedback>
                )}
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Start date
              </Form.Label>
              <Col sm="8">
                <Datetime
                  value={
                    values.startDate
                      ? moment(values.startDate).format('YYYY-MM-DD hh:mm A')
                      : ''
                  }
                  inputProps={{
                    className: 'form-control',
                    placeholder: 'Start date',
                  }}
                  closeOnSelect
                  onChange={e => setFieldValue('startDate', e.toISOString())}
                />
                {errors.startDate && touched.startDate && (
                  <div className="text-danger">
                    <small>{errors.startDate}</small>
                  </div>
                )}
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="4">
                End date
              </Form.Label>
              <Col sm="8">
                <Datetime
                  value={
                    values.endDate
                      ? moment(values.endDate).format('YYYY-MM-DD hh:mm A')
                      : ''
                  }
                  inputProps={{
                    className: 'form-control',
                    placeholder: 'End date',
                  }}
                  closeOnSelect
                  onChange={e => setFieldValue('endDate', e.toISOString())}
                />
                {errors.endDate && touched.endDate && (
                  <div className="text-danger">
                    <small>{errors.endDate}</small>
                  </div>
                )}
              </Col>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" type="submit" disabled={isLoading}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </Modal.Footer>
        </Form>
      );
    }}
  </Formik>
);

AnnouncementForm.propTypes = {
  initialValues: shape({}),
  onSubmit: func,
  onClose: func,
  isEdit: bool,
  isLoading: bool,
};

AnnouncementForm.defaultProps = {
  initialValues: {},
  onSubmit: e => e,
  onClose: e => e,
  isLoading: false,
  isEdit: false,
};

export default AnnouncementForm;
