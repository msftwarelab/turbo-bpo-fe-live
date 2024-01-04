import React from 'react';
import { Formik } from 'formik';
import { shape, func, bool } from 'prop-types';
import { Form, Button, Col, Row, Modal, Card } from 'react-bootstrap';
import validationSchema from './validationSchema';

const DataEntryCompsForm = ({
  initialValues,
  onSubmit,
  onClose,
  isLoading,
}) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
    enableReinitialize
  >
    {({ handleSubmit, values, setFieldValue }) => {
      const handleChange = (e, old) => {
        const { value } = e.target;
        const found = values.mls.find(item => item.id === old.id);
        if (found) {
          found.value = value;
          setFieldValue('mls', values.mls);
        }
      };
      return (
        <>
          <Modal.Body>
            <Card className="mb-3">
              <Card.Header>Active</Card.Header>
              <Card.Body>
                {values.mls
                  .filter(item => item.status === 'ACTIVE')
                  .map(item => (
                    <Form.Group as={Row} key={item.id}>
                      <Form.Label column sm="4">
                        MLS{item.id}
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          name="mls"
                          onChange={e => handleChange(e, item)}
                          value={item.value || ''}
                        />
                      </Col>
                    </Form.Group>
                  ))}
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>Sold</Card.Header>
              <Card.Body>
                {values.mls
                  .filter(item => item.status === 'SOLD')
                  .map(item => (
                    <Form.Group as={Row} key={item.id}>
                      <Form.Label column sm="4">
                        MLS{item.id}
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          name="mls"
                          onChange={e => handleChange(e, item)}
                          value={item.value || ''}
                        />
                      </Col>
                    </Form.Group>
                  ))}
              </Card.Body>
            </Card>
          </Modal.Body>

          <Modal.Footer>
          
            <Button disabled={isLoading} onClick={handleSubmit} variant="warning">
              Save
            </Button>

            <Button variant="primary" onClick={onClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </>
      );
    }}
  </Formik>
);

DataEntryCompsForm.propTypes = {
  initialValues: shape({}),
  onSubmit: func,
  onClose: func,
  isLoading: bool,
};

DataEntryCompsForm.defaultProps = {
  initialValues: {},
  onSubmit: e => e,
  onClose: e => e,
  isLoading: false,
};

export default DataEntryCompsForm;
