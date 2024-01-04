import React, { useState } from 'react';
import UserSelect from 'components/UserSelect';
import { shape, func } from 'prop-types';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';

const Search = ({ filter, onSearch, onReset }) => {
  const [values, setValues] = useState(filter);
  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);

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

  const handleUserChange = id => {
    setValues({
      ...values,
      userId: id,
    });
  };

  return (
    <div>
      <Button onClick={handleShow}>Search</Button>
      {isShow && (
        <Modal show onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Search</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  Client
                </Form.Label>
                <Col sm="9">
                  <UserSelect
                    returnValue="ID"
                    onChange={handleUserChange}
                    userRoles={['CLIENT']}
                    value={values.userId || ''}
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

Search.propTypes = { filter: shape({}), onSearch: func, onReset: func };

Search.defaultProps = { filter: {}, onSearch: e => e, onReset: e => e };

export default Search;
