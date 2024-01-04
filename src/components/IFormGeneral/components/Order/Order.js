import React from 'react';
import { Card, Row, Col, Form } from 'react-bootstrap';

const Order = ({ pipeline, input, onChange }) => (
  <Card className="mb-3">
    <Card.Header>Order</Card.Header>
    <Card.Body>
      <Form.Group as={Row}>
        <Form.Label column sm="4">
          Client
        </Form.Label>
        <Col sm="8">
          <Form.Control
            readOnly
            name="txtClient"
            value={input.txtClient || pipeline.authorName || ''}
            onChange={onChange}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="4">
          Company
        </Form.Label>
        <Col sm="8">
          <Form.Control
            readOnly
            name="txtCompany"
            value={input.txtCompany || pipeline.company || ''}
            onChange={onChange}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="4">
          Form
        </Form.Label>
        <Col sm="8">
          <Form.Control
            readOnly
            as="select"
            name="cmbForm"
            value={input.cmbForm || ''}
            onChange={onChange}
          >
            <option value="COMMON">Common</option>
          </Form.Control>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="4">
          Order Number:
        </Form.Label>
        <Col sm="8">
          <Form.Control
            readOnly
            name="txtOrderNumber"
            value={input.txtOrderNumber || pipeline.orderNumber || ''}
            onChange={onChange}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="4">
          Order Type
        </Form.Label>
        <Col sm="8">
          <Form.Control
            readOnly
            name="cmbOrderType"
            value={input.cmbOrderType || pipeline.orderType || ''}
            onChange={onChange}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="4">
          Address
        </Form.Label>
        <Col sm="8">
          <Form.Control
            readOnly
            name="txtAddress"
            as="textarea"
            rows="3"
            value={input.txtAddress || pipeline.address || ''}
            onChange={onChange}
          />
        </Col>
      </Form.Group>
    </Card.Body>
  </Card>
);

export default Order;
