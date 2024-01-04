import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

const ComparablesComments = ({ key, item, iform }) => {
  return (
    <Row key={key} className="mb-2">
      <Col sm={1}>
        <div className="my-1">{item.label}</div>
      </Col>
      <Col sm={2}>
        <Form.Control
          as="select"
          defaultValue={iform[item.commentType.label] || ''}
        >
          {item.commentType.options.map(option => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Control>
      </Col>
      <Col sm={3}>
        <Form.Control
          as="textarea"
          rows="4"
          defaultValue={iform[item.comparableComments.label] || ''}
          placeholder={item.comparableComments.placeholder}
        />
      </Col>
      <Col sm={3}>
        <Form.Control
          as="textarea"
          rows="4"
          defaultValue={iform[item.formatAdjustments.label] || ''}
          placeholder={item.formatAdjustments.placeholder}
        />
      </Col>
      <Col sm={3}>
        <Form.Control
          as="textarea"
          rows="4"
          defaultValue={iform[item.mlsComments.label] || ''}
          placeholder={item.mlsComments.placeholder}
        />
      </Col>
    </Row>
  );
};

export default ComparablesComments;
