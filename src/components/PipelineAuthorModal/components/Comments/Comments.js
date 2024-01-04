import React from 'react';
import groupBy from 'lodash/groupBy';
import keys from 'lodash/keys';
import { useQuery } from '@apollo/react-hooks';
import { Row, Col, Card } from 'react-bootstrap';
import setErrorMessage from 'utils/setErrorMessage';
import ALL_COMMENT from 'queries/allComment';

const Comments = ({ userId }) => {
  const { loading, error, data = {} } = useQuery(ALL_COMMENT, {
    variables: { userId },
  });
  if (error) return <div>{setErrorMessage(error)}</div>;
  if (loading) return <div>loading...</div>;
  const { allComment = {} } = data;
  const groupedData = groupBy(allComment, 'category');
  const categories = keys(groupedData);
  return (
    <div className="border-top-0 border p-3 bg-white">
      {categories.map((item, index) => (
        <Card className="mb-3" key={index}>
          <Card.Body>
            <Card.Title>{item}</Card.Title>
            {groupedData[item] ? (
              groupedData[item].map((groupItem, groupIndex) => (
                <Row className="p-1 mb-2" key={groupIndex}>
                  <Col xs="4">{groupItem.label}</Col>
                  <Col xs="8">{groupItem.value}</Col>
                </Row>
              ))
            ) : (
              <Row className="mb-3">
                <Col sm={{ offset: 2, span: 10 }}>No category yet</Col>
              </Row>
            )}
          </Card.Body>
        </Card>
      ))}
      {/* <Row className="p-1 mb-2">
        <Col xs="4">First Name: </Col>
        <Col xs="8">{profile.firstName}</Col>
      </Row>
      <Row className="p-1 mb-2">
        <Col xs="4">Last Name: </Col>
        <Col xs="8">{profile.lastName}</Col>
      </Row>
      <Row className="p-1 mb-2">
        <Col xs="4">Email address: </Col>
        <Col xs="8">{profile.emailAddress}</Col>
      </Row>
      <Row className="p-1 mb-2">
        <Col xs="4">Company: </Col>
        <Col xs="8">{profile.companyName}</Col>
      </Row>
      <Row className="p-1 mb-2">
        <Col xs="4">Phone number: </Col>
        <Col xs="8">{profile.phoneNumber}</Col>
      </Row>
      <Row className="p-1 mb-2">
        <Col xs="4">Address: </Col>
        <Col xs="8">{profile.address}</Col>
      </Row>
      <Row className="p-1 mb-2">
        <Col xs="4">City: </Col>
        <Col xs="8">{profile.city}</Col>
      </Row>
      <Row className="p-1 mb-2">
        <Col xs="4">State: </Col>
        <Col xs="8">{profile.state}</Col>
      </Row>
      <Row className="p-1 mb-2">
        <Col xs="4">Zip: </Col>
        <Col xs="8">{profile.zipCode}</Col>
      </Row>
      <div className="mb-2">
        <Form.Check
          type="checkbox"
          checked={profile.imABroker}
          id="brocker"
          label="I'm a Broker"
        />
      </div>
      <Row className="p-1 mb-2">
        <Col xs="4">Zip: </Col>
        <Col xs="8">{profile.zipCode}</Col>
      </Row>
      <Row className="p-1 mb-2">
        <Col xs="4">Broker: </Col>
        <Col xs="8">{profile.broker}</Col>
      </Row>
      <Row className="p-1 mb-2">
        <Col xs="4">Broker License: </Col>
        <Col xs="8">{profile.brokerLicense}</Col>
      </Row>
      <Row className="p-1 mb-2">
        <Col xs="4">Agent: </Col>
        <Col xs="8">{profile.agent}</Col>
      </Row>
      <Row className="p-1 mb-2">
        <Col xs="4">Agent License: </Col>
        <Col xs="8">{profile.agentLicense}</Col>
      </Row>
      <Row className="p-1 mb-2">
        <Col xs="4">License Date: </Col>
        <Col xs="8">{profile.licenseDate}</Col>
      </Row>
      <Row className="p-1 mb-2">
        <Col xs="4">License Expiration Date: </Col>
        <Col xs="8">{profile.licenseExpirationDate}</Col>
      </Row>
      <Row className="p-1 mb-2">
        <Col xs="4">Brokerage: </Col>
        <Col xs="8">{profile.brokerage}</Col>
      </Row>
      <Row className="p-1 mb-2">
        <Col xs="4">Year Of Experience: </Col>
        <Col xs="8">{profile.yearOfExperience}</Col>
      </Row> */}
    </div>
  );
};

export default Comments;
