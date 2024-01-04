import React from 'react';
import { Formik } from 'formik';
import { shape, func, bool } from 'prop-types';
import { Form, Button, Col, Row, Modal } from 'react-bootstrap';
import Datetime from 'react-datetime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { StyledDateContainer } from './styles';
import validationSchema from './validationSchema';

const SessionForm = ({ initialValues, onSubmit, onClose, isLoading }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({ handleSubmit, setFieldValue, errors, touched, values }) => {
      return (
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group as={Row}>
              <Form.Label column sm="5">
                Invoice Date (PH)
              </Form.Label>
              <Col sm="7">
                <StyledDateContainer>
                  <Datetime
                    value={values.invoiceDate}
                    dateFormat="YYYY-MM-DD"
                    onChange={e => setFieldValue('invoiceDate', e)}
                    timeFormat={false}
                    inputProps={{
                      className: 'form-control',
                      placeholder: 'Select date',
                    }}
                  />
                  <span className="calendarIcon">
                    <FontAwesomeIcon icon={faCalendar} />
                  </span>
                </StyledDateContainer>
                {errors.invoiceDate && touched.invoiceDate && (
                  <div className="text-danger">
                    <small>{errors.invoiceDate}</small>
                  </div>
                )}
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="5">
                Start
              </Form.Label>
              <Col sm="7">
                <StyledDateContainer>
                  <Datetime
                    value={values.start}
                    dateFormat="YYYY-MM-DD"
                    onChange={e => setFieldValue('start', e)}
                    inputProps={{
                      className: 'form-control',
                      placeholder: 'Select date',
                    }}
                  />
                  <span className="calendarIcon">
                    <FontAwesomeIcon icon={faCalendar} />
                  </span>
                </StyledDateContainer>
                {errors.start && touched.start && (
                  <div className="text-danger">
                    <small>{errors.start}</small>
                  </div>
                )}
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="5">
                End
              </Form.Label>
              <Col sm="7">
                <StyledDateContainer>
                  <Datetime
                    value={values.end}
                    dateFormat="YYYY-MM-DD"
                    onChange={e => setFieldValue('end', e)}
                    inputProps={{
                      className: 'form-control',
                      placeholder: 'Select date',
                    }}
                  />
                  <span className="calendarIcon">
                    <FontAwesomeIcon icon={faCalendar} />
                  </span>
                </StyledDateContainer>
                {errors.end && touched.end && (
                  <div className="text-danger">
                    <small>{errors.end}</small>
                  </div>
                )}
              </Col>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              Save changes
            </Button>
          </Modal.Footer>
        </Form>
      );
    }}
  </Formik>
);

SessionForm.propTypes = {
  initialValues: shape({}),
  onSubmit: func,
  onClose: func,
  isLoading: bool,
};

SessionForm.defaultProps = {
  initialValues: {},
  onSubmit: e => e,
  onClose: e => e,
  isLoading: false,
};

export default SessionForm;
