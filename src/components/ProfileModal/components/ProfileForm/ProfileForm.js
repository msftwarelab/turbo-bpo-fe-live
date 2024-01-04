import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const ProfileForm = () => {
  return (
    <form>
      <Form.Group as={Row} controlId="formFirstName">
        <Form.Label column sm="3">First Name:</Form.Label>
        <Col sm="9">
          <Form.Control type="text" name="firstName" defaultValue="Denver" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formLastName">
        <Form.Label column sm="3">
          Last Name:
        </Form.Label>
        <Col sm="9">
          <Form.Control type="text" name="lastName" defaultValue="Kemery" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formEmail">
        <Form.Label column sm="3">
          Email Address:
        </Form.Label>
        <Col sm="9">
          <Form.Control type="email" name="email" defaultValue="denver@denverkemery.com" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formCompany">
        <Form.Label column sm="3">
          Company:
        </Form.Label>
        <Col sm="9">
          <Form.Control type="text" name="company" defaultValue="Repeat Realty" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formCompany">
        <Form.Label column sm="3">
          Phone Number:
        </Form.Label>
        <Col sm="9">
          <Form.Control type="text" name="phone" defaultValue="2147322029" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formAddress">
        <Form.Label column sm="3">
          Address:
        </Form.Label>
        <Col sm="9">
          <Form.Control type="text" name="address" defaultValue="134 Willow Creek Est" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formCity">
        <Form.Label column sm="3">
          City:
        </Form.Label>
        <Col sm="9">
          <Form.Control type="text" name="city" defaultValue="Highland Village" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formStateProvinceRegion">
        <Form.Label column sm="3">
          State/Province/Region:
        </Form.Label>
        <Col sm="9">
          <Form.Control type="text" name="state" efaultValue="Texas" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formZipPostalCode">
        <Form.Label column sm="3">
          Zip/Postal Code:
        </Form.Label>
        <Col sm="9">
          <Form.Control type="text" name="zip" defaultValue="75077" />
        </Col>
      </Form.Group>
      <Row>
        <Col>
          <span>Im a broker</span>
        </Col>
      </Row>
      <Form.Group as={Row} controlId="formBrokerName">
        <Form.Label column sm="3">
          Broker
        </Form.Label>
        <Col sm="9">
          <Form.Control type="text" name="brokerName" defaultValue="Zach Moore" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formBrokerLicense">
        <Form.Label column sm="3">
          Broker License
        </Form.Label>
        <Col sm="9">
          <Form.Control type="text" defaultValue="0594913" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formBrokerAgent">
        <Form.Label column sm="3">
          Agent
        </Form.Label>
        <Col sm="9">
          <Form.Control type="text" defaultValue="Denver Kemery" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formBrokerAgentLicense">
        <Form.Label column sm="3">
          Agent License
        </Form.Label>
        <Col sm="9">
          <Form.Control type="text" defaultValue="0532893" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formBrokerLicenseDate">
        <Form.Label column sm="3">
          License Date
        </Form.Label>
        <Col sm="9">
          <Form.Control type="text" defaultValue="03/01/2005" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formBrokerLicenseExpiration">
        <Form.Label column sm="3">
          License Expiration Date:
        </Form.Label>
        <Col sm="9">
          <Form.Control type="text" defaultValue="03/31/2018" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formBrokerBrokerage">
        <Form.Label column sm="3">
          Brokerage
        </Form.Label>
        <Col sm="9">
          <Form.Control type="text" defaultValue="Repeat Realty" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formBrokerExperience">
        <Form.Label column sm="3">
          Years of Experience:
        </Form.Label>
        <Col sm="9">
          <Form.Control type="text" defaultValue="12" />
        </Col>
      </Form.Group>
    </form>
  );
};

export default ProfileForm;
