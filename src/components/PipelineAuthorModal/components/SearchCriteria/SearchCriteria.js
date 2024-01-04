import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Row, Col, Card } from 'react-bootstrap';
import setErrorMessage from 'utils/setErrorMessage';
import { SEARCH_CRITERIA } from './queries';

const Comments = ({ userId }) => {
  const { loading, error, data = {} } = useQuery(SEARCH_CRITERIA, {
    variables: { userId },
  });
  if (error) return <div>{setErrorMessage(error)}</div>;
  if (loading) return <div>loading...</div>;
  const { default: defaultData = {} } = data;
  return (
    <div className="border-top-0 border p-3 bg-white">
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>General</Card.Title>
          <Row className="p-1 mb-2">
            <Col xs="4">Types of Listings to use: </Col>
            <Col xs="8">{defaultData.listingType}</Col>
          </Row>
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Initial Search</Card.Title>
          <Row className="p-1 mb-2">
            <Col xs="4">GLA: </Col>
            <Col xs="8">{defaultData.initialSearchGla}</Col>
          </Row>
          <Row className="p-1 mb-2">
            <Col xs="4">Age: </Col>
            <Col xs="8">{defaultData.initialSearchAge}</Col>
          </Row>
          <Row className="p-1 mb-2">
            <Col xs="4">Proximity: </Col>
            <Col xs="8">{defaultData.initialSearchProximity}</Col>
          </Row>
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Second Search (Expanded Criteria)</Card.Title>
          <Row className="p-1 mb-2">
            <Col xs="4">GLA: </Col>
            <Col xs="8">{defaultData.secondSearchGla}</Col>
          </Row>
          <Row className="p-1 mb-2">
            <Col xs="4">Age: </Col>
            <Col xs="8">{defaultData.secondSearchAge}</Col>
          </Row>
          <Row className="p-1 mb-2">
            <Col xs="4">Proximity: </Col>
            <Col xs="8">{defaultData.secondSearchProximity}</Col>
          </Row>
          <Row className="p-1 mb-2">
            <Col xs="4">Proximity: </Col>
            <Col xs="8">{defaultData.secondSearchSaleDates}</Col>
          </Row>
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Third Search (Further Expanded Criteria)</Card.Title>
          <Row className="p-1 mb-2">
            <Col xs="4">GLA: </Col>
            <Col xs="8">{defaultData.thirdSearchGla}</Col>
          </Row>
          <Row className="p-1 mb-2">
            <Col xs="4">Age: </Col>
            <Col xs="8">{defaultData.thirdSearchAge}</Col>
          </Row>
          <Row className="p-1 mb-2">
            <Col xs="4">Proximity: </Col>
            <Col xs="8">{defaultData.thirdSearchProximity}</Col>
          </Row>
          <Row className="p-1 mb-2">
            <Col xs="4">Proximity: </Col>
            <Col xs="8">{defaultData.thirdSearchSaleDates}</Col>
          </Row>
          <Row className="p-1 mb-2">
            <Col xs="4">Filter by complex name?: </Col>
            <Col xs="8">
              {defaultData.thirdSearchFilterByComplexName ? 'Yes' : 'No'}
            </Col>
          </Row>
          <Row className="p-1 mb-2">
            <Col xs="4">Filter by city?: </Col>
            <Col xs="8">
              {defaultData.thirdSearchFilterByCity ? 'Yes' : 'No'}
            </Col>
          </Row>
          <Row className="p-1 mb-2">
            <Col xs="4">Filter by zip?: </Col>
            <Col xs="8">
              {defaultData.thirdSearchFilterByZip ? 'Yes' : 'No'}
            </Col>
          </Row>
          <Row className="p-1 mb-2">
            <Col xs="4">Filter by county??: </Col>
            <Col xs="8">
              {defaultData.thirdSearchFilterByCountry ? 'Yes' : 'No'}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Comments;
