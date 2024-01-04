import React from 'react';
import { Formik } from 'formik';
import { shape, func, bool } from 'prop-types';
import validationSchema from './validationSchema';
import Rating from 'react-rating';
import { Form, Col, Row, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const RatingsModalForm = ({ initialValues, onSubmit, onClose, isLoading }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({ handleSubmit, handleChange, setFieldValue, values }) => (
      <>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group as={Row} className="mb-0">
              <Form.Label column sm="4">
                Overall:
              </Form.Label>
              <Col sm="8">
                <Rating
                  className="mt-2"
                  initialRating={values.ratingOverAll || 0}
                  emptySymbol={
                    <FontAwesomeIcon icon={faStar} color="#ccc" size="lg" />
                  }
                  fullSymbol={
                    <FontAwesomeIcon icon={faStar} color="#ffa500" size="lg" />
                  }
                  onChange={e => setFieldValue('ratingOverAll', e)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-0">
              <Form.Label column sm="4">
                Feeback:
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  name="ratingFeedback"
                  value={values.ratingFeedback || ''}
                  className="mt-2"
                  as="textarea"
                  rows="3"
                  onChange={handleChange}
                />
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
    )}
  </Formik>
);

RatingsModalForm.propTypes = {
  initialValues: shape({}),
  onSubmit: func,
  onClose: func,
  isLoading: bool,
};

RatingsModalForm.defaultProps = {
  initialValues: {},
  onSubmit: e => e,
  onClose: e => e,
  isLoading: false,
};

export default RatingsModalForm;
