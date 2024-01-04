import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Row, Col, Form, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faCalendar } from '@fortawesome/free-solid-svg-icons';
import glaCalcOptions from 'constants/glaCalcOptions';
import yearOptions from 'constants/yearOptions';
import subjectTypeOptions from 'constants/subjectTypeOptions';
import searchTypeOptions from 'constants/searchTypeOptions';
import Datetime from 'react-datetime';
import { StyledDateContainer } from './styles';

const Calculator = () => {
  const [isShow, setShow] = useState(false);
  const handleShow = e => setShow(!isShow);

  const handleOpenLinkShow = e => {
    e.preventDefault();
    handleShow();
  };

  return (
    <>
      <Link className="menu-item" to="#" onClick={handleOpenLinkShow}>
        <FontAwesomeIcon icon={faCalculator} />
        <span className="title">Calculator</span>
      </Link>
      {isShow && (
        <Modal size="xl" show onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Calculator</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Row className="mb-3">
              <Col sm="3">
                <Form.Control />
              </Col>
              <Col>
                <Button className="mr-2">Search</Button>
                <Button className="mr-2">Save</Button>
                <Button className="mr-2">Clear</Button>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Card className="mb-2">
                  <Card.Header>Variables</Card.Header>
                  <Card.Body>
                    <Form.Group as={Row}>
                      <Form.Label column sm="5">
                        GLA
                      </Form.Label>
                      <Col sm="7">
                        <Form.Control />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="5">
                        Year
                      </Form.Label>
                      <Col sm="7">
                        <Form.Control />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-0">
                      <Form.Label column sm="5">
                        Lot
                      </Form.Label>
                      <Col sm="7">
                        <Form.Control />
                      </Col>
                    </Form.Group>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Header>Variance</Card.Header>
                  <Card.Body>
                    <Form.Group as={Row}>
                      <Form.Label column sm="5">
                        GLA
                      </Form.Label>
                      <Col sm="7">
                        <Form.Control as="select">
                          {glaCalcOptions.map((item, key) => (
                            <option key={key} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="5">
                        Year
                      </Form.Label>
                      <Col sm="7">
                        <Form.Control as="select">
                          {yearOptions.map((item, key) => (
                            <option key={key} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-0">
                      <Form.Label column sm="5">
                        Lot
                      </Form.Label>
                      <Col sm="7">
                        <Form.Control as="select">
                          {glaCalcOptions.map((item, key) => (
                            <option key={key} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="mb-2">
                  <Card.Header>Variance Range</Card.Header>
                  <Card.Body>
                    <Form.Row className="mb-2">
                      <Col sm="6">
                        <Form.Control placeholder="Low" />
                      </Col>
                      <Col sm="6">
                        <Form.Control placeholder="High" />
                      </Col>
                    </Form.Row>
                    <Form.Row className="mb-2">
                      <Col sm="6">
                        <Form.Control placeholder="Low" />
                      </Col>
                      <Col sm="6">
                        <Form.Control placeholder="High" />
                      </Col>
                    </Form.Row>
                    <Form.Row>
                      <Col sm="6">
                        <Form.Control placeholder="Low" />
                      </Col>
                      <Col sm="6">
                        <Form.Control placeholder="High" />
                      </Col>
                    </Form.Row>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Header>Variance</Card.Header>
                  <Card.Body>
                    <Form.Group as={Row}>
                      <Form.Label column sm="5">
                        GLA
                      </Form.Label>
                      <Col sm="7">
                        <Form.Control as="select">
                          {glaCalcOptions.map((item, key) => (
                            <option key={key} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="5">
                        Year
                      </Form.Label>
                      <Col sm="7">
                        <Form.Control as="select">
                          {yearOptions.map((item, key) => (
                            <option key={key} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="5">
                        Lot
                      </Form.Label>
                      <Col sm="7">
                        <Form.Control as="select">
                          {glaCalcOptions.map((item, key) => (
                            <option key={key} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Header>Search Criteria</Card.Header>
                  <Card.Body>
                    <Form.Group as={Row}>
                      <Form.Label column sm="5">
                        Type
                      </Form.Label>
                      <Col sm="7">
                        <Form.Control as="select">
                          {subjectTypeOptions.map((item, key) => (
                            <option key={key} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="5">
                        Search
                      </Form.Label>
                      <Col sm="7">
                        <Form.Control as="select">
                          {searchTypeOptions.map((item, key) => (
                            <option key={key} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="5">
                        Sales Date
                      </Form.Label>
                      <Col sm="7">
                        <StyledDateContainer>
                          <Datetime
                            inputProps={{
                              className: 'form-control',
                              placeholder: 'Select date',
                            }}
                            closeOnSelect
                            timeFormat={false}
                          />
                          <span className="calendarIcon">
                            <FontAwesomeIcon icon={faCalendar} />
                          </span>
                        </StyledDateContainer>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-0">
                      <Form.Label column sm="5">
                        Proximity
                      </Form.Label>
                      <Col sm="7">
                        <Form.Control />
                      </Col>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
            </Form.Row>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default Calculator;
