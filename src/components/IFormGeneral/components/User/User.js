import React from 'react';
import { Card, Row, Col, Form } from 'react-bootstrap';
import cogoToast from 'cogo-toast';
import { useQuery } from '@apollo/react-hooks';
import setErrorMessage from 'utils/setErrorMessage';
import USER from 'queries/user';

const User = ({ userId, input, onChange }) => {
  const { loading, error, data = {} } = useQuery(USER, {
    variables: {
      id: userId,
    },
  });
  if (error) cogoToast.error(setErrorMessage(error));
  if (loading) return <div>Loading...</div>;
  const { user = {} } = data;
  return (
    <Card>
      <Card.Header>Preparer</Card.Header>
      <Card.Body>
        <Form.Group as={Row}>
          <Form.Label column sm="4">
            Agent
          </Form.Label>
          <Col sm="8">
            <Form.Control
              name="txtPreparerInfoAgent"
              value={
                input.txtPreparerInfoAgent ||
                `${user.firstName} ${user.lastName}` ||
                ''
              }
              onChange={onChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="4">
            Agent License
          </Form.Label>
          <Col sm="8">
            <Form.Control
              name="txtPreparerInfoAgentLicense"
              value={
                input.txtPreparerInfoAgentLicense || user.agentLicense || ''
              }
              onChange={onChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="4">
            Broker
          </Form.Label>
          <Col sm="8">
            <Form.Control
              name="txtPreparerInfoBroker"
              value={input.txtPreparerInfoBroker || user.broker || ''}
              onChange={onChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="4">
            Broker License
          </Form.Label>
          <Col sm="8">
            <Form.Control
              name="txtPreparerInfoBrokerLicense"
              value={
                input.txtPreparerInfoBrokerLicense || user.brokerLicense || ''
              }
              onChange={onChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="4">
            Email
          </Form.Label>
          <Col sm="8">
            <Form.Control
              name="txtPreparerInfoEmail"
              value={input.txtPreparerInfoEmail || user.email || ''}
              onChange={onChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="4">
            Phone Number
          </Form.Label>
          <Col sm="8">
            <Form.Control
              name="txtPreparerInfoPhone"
              value={input.txtPreparerInfoPhone || user.phoneNumber || ''}
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
              as="textarea"
              rows="3"
              name="txtPreparerInfoAddress"
              value={input.txtPreparerInfoAddress || user.address || ''}
              onChange={onChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="4">
            Brokerage
          </Form.Label>
          <Col sm="8">
            <Form.Control
              name="txtPreparerInfoBrokerage"
              value={input.txtPreparerInfoBrokerage || user.brokerage || ''}
              onChange={onChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="4">
            Licensure Date
          </Form.Label>
          <Col sm="8">
            <Form.Control
              value={user.licenseDate || ''}
              // name="txtPreparerInfoLicensureDate"
              // value={input.txtPreparerInfoLicensureDate || ''}
              // onChange={onChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="4">
            Licensure Examination
          </Form.Label>
          <Col sm="8">
            <Form.Control
              value={user.licenseExpirationDate || ''}
              // name="txtPreparerInfoLicensureExamination"
              // value={
              //   input.txtPreparerInfoLicensureExamination || ''
              // }
              // onChange={onChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="4">
            Years of Experience
          </Form.Label>
          <Col sm="8">
            <Form.Control
              name="txtPreparerInfoYearsOfExperience"
              value={
                input.txtPreparerInfoYearsOfExperience ||
                user.yearOfExperience ||
                ''
              }
              onChange={onChange}
            />
          </Col>
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default User;
