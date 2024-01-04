import React, { useState } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';

const Search = ({ filter, onSearch, onReset }) => {
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
  const handleSubmit = () => {
    onSearch(values);
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
      <Button variant="secondary" onClick={handleShow}>
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
                  Name
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    name="name"
                    value={values.name || ''}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleShow}>
              Close
            </Button>
            <Button variant="secondary" onClick={handleReset}>
              Reset
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Search;
