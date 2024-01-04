import React, { useState } from 'react';
import { string, shape } from 'prop-types';
import { Modal, Row, Col } from 'react-bootstrap';

const PipelineStatus = ({ pipeline, status }) => {
  const [isShow, setShow] = useState(false);
  const handleShow = () => {
    setShow(!isShow);
  };
  return (
    <>
      {status === 'COMPLETE' ? (
        <a href="#/" onClick={handleShow} style={{ color: 'green' }}>
          {status}
        </a>
      ) : (
        <span>{status}</span>
      )}
      {isShow && (
        <Modal size="md" show onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Order Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="mb-1">
              <Col md="5">Status:</Col>
              <Col>{pipeline.status}</Col>
            </Row>
            <Row className="mb-1">
              <Col md="5">Completed on:</Col>
              <Col>{pipeline.lastUpdateTime}</Col>
            </Row>
            <Row className="mb-1">
              <Col md="5">Completed by:</Col>
              <Col>{pipeline.assign}</Col>
            </Row>
            <Row className="mb-1">
              <Col md="5">Submitted by:</Col>
              <Col>{pipeline.authorName}</Col>
            </Row>
            <Row className="mb-1">
              <Col md="5">Quality Control on:</Col>
              <Col />
            </Row>
            <Row className="mb-1">
              <Col md="5">Quality Control by:</Col>
              <Col />
            </Row>
            <Row className="mb-1">
              <Col md="5">Order TAT:</Col>
              <Col />
            </Row>
            <Row className="mb-1">
              <Col md="5">Photo TAT:</Col>
              <Col />
            </Row>
            <Row className="mb-1">
              <Col md="5">QC TAT:</Col>
              <Col />
            </Row>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

PipelineStatus.propTypes = {
  status: string,
  pipeline: shape({}),
};

PipelineStatus.defaultProps = {
  status: '',
  pipeline: {},
};

export default PipelineStatus;
