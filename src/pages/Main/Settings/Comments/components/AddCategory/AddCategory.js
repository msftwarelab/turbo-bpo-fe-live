import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import commentSectionOptions from 'constants/commentSectionOptions';
import { Button, Modal, Row, Col, Form } from 'react-bootstrap';

const initValues = {
  category: null,
  section: commentSectionOptions[0].value,
};

const AddCategory = ({ onSubmit }) => {
  const [isSubmit, setSubmit] = useState(false);
  const [input, setInput] = useState(initValues);
  const [isAddCategory, setAddCategory] = useState(false);

  const handleAddCategory = () => {
    setSubmit(false);
    setInput(initValues);
    setAddCategory(!isAddCategory);
  };

  const handleCloseModal = () => setAddCategory(!isAddCategory);

  const handleSubmit = () => {
    setSubmit(true);
    if (input.category) {
      onSubmit(input);
      handleCloseModal();
    }
  };

  const handleChange = e => {
    const { value } = e.target;
    setInput({
      ...input,
      category: commentSectionOptions.find(item => item.value === value).label,
      section: value,
    });
  };

  return (
    <>
      <Modal show={isAddCategory} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Row}>
            <Form.Label column sm="4">
              Category
            </Form.Label>
            <Col sm="8">
              <Form.Control
                name="section"
                onChange={handleChange}
                value={input.section || ''}
                isInvalid={isSubmit && !input.section}
                as="select"
              >
                {commentSectionOptions.map(item => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Form.Control>

              <Form.Control.Feedback type="invalid">
                required
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleSubmit}>
            Save changes
          </Button>
          <Button onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Button onClick={handleAddCategory} variant="warning">
        Add Category
      </Button>
    </>
  );
};

AddCategory.propTypes = {
  onSubmit: PropTypes.func,
};

AddCategory.defaultProps = {
  onSubmit: {},
};

export default withApollo(AddCategory);
