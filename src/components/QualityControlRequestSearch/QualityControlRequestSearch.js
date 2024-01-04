import React, { useState } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { shape, func } from 'prop-types';
import removeEmptyString from 'utils/removeEmptyString';
import removeNull from 'utils/removeNull';
import UserSelect from 'components/UserSelect';

const QualityControlRequestSearch = ({ filter, onSearch, onReset }) => {
  const [values, setValues] = useState(filter);
  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);
  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleQcAssignee = qcAssignee => {
    setValues({
      ...values,
      qcAssignee,
    });
  };

  const handleSubmit = () => {
    let newValues = values;
    if (
      values.status &&
      values.status.length &&
      (values.status[0] === 'ALL' || values.status[0] === '')
    ) {
      newValues = {
        ...newValues,
        status: null,
      };
    }
    onSearch(removeEmptyString(removeNull(newValues)));
    handleShow();
  };
  const handleReset = () => {
    setValues({
      offset: values.offset,
      limit: values.limit,
    });
    onReset({
      offset: values.offset,
      limit: values.limit,
    });
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Search
      </Button>
      {isShow && (
        <Modal show onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Search</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  Order number
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    name="orderNumber"
                    value={values.orderNumber || ''}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  Qc Assignee
                </Form.Label>
                <Col sm="9">
                  <UserSelect
                    returnValue="ID"
                    onChange={handleQcAssignee}
                    userRoles={['QUALITY_CONTROL']}
                    value={values.qcAssignee || ''}
                  />
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="primary" onClick={handleReset}>
              Reset
            </Button>
            <Button variant="primary" onClick={handleShow}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

QualityControlRequestSearch.propTypes = {
  filter: shape({}),
  onSearch: func,
  onReset: func,
};

QualityControlRequestSearch.defaultProps = {
  filter: {},
  onSearch: e => e,
  onReset: e => e,
};

export default QualityControlRequestSearch;
