import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import removeNull from 'utils/removeNull';
import { Modal, Button, Form, Nav, Row, Col } from 'react-bootstrap';
import setErrorMessage from 'utils/setErrorMessage';
import setCurrency from 'utils/setCurrency';
import SAVE_PIPELINE_NOTE from 'mutations/savePipelineNote';
import ALL_PIPELINE_NOTE from 'queries/allPipelineNote';
import ALL_QC_REQUEST from 'queries/allQcRequest';
import { StyledContainer } from './styles';

const AddQCRequestNote = ({ qcRequest, filter, qcRequestFilter }) => {
  const [savePipelineNote] = useMutation(SAVE_PIPELINE_NOTE);
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [orderNotes, setOrderNotes] = useState('');
  const [inspectionNotes, setInspectionNotes] = useState('');
  const [isSubmit, setSubmit] = useState(false);
  const [exterior, setExterior] = useState(
    [...Array(12).keys()].map(item => ({
      description: '',
      price: 0,
    }))
  );
  const [interior, setInterior] = useState(
    [...Array(12).keys()].map(item => ({
      description: '',
      price: 0,
    }))
  );
  const [currentTab, setCurrentTab] = useState('exterior');
  const handleShowModal = () => setShow(!isShow);

  const handleReset = () => {
    setOrderNotes(null);
    setInspectionNotes(null);
    setExterior(
      [...Array(12).keys()].map(item => ({
        description: '',
        price: 0,
      }))
    );
    setInterior(
      [...Array(12).keys()].map(item => ({
        description: '',
        price: 0,
      }))
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    setSubmit(true);
    const newExterior = {};
    exterior.map((item, key) => {
      if (item.description && item.price) {
        newExterior[`exteriorRepairDescription${key + 1}`] = item.description;
        newExterior[`exteriorRepairPrice${key + 1}`] = item.price;
      }
      return false;
    });

    const newInterior = {};
    interior.map((item, key) => {
      if (item.description && item.price) {
        newInterior[`interiorRepairDescription${key + 1}`] = item.description;
        newInterior[`interiorRepairPrice${key + 1}`] = item.price;
      }
      return false;
    });

    const input = removeNull({
      orderNotes,
      inspectionNotes,
      ...newExterior,
      ...newInterior,
    });

    const qcFilter = { ...qcRequestFilter };

    qcFilter.status !== undefined &&
      qcFilter.status.length === 0 &&
      delete qcFilter.status;

    try {
      if (orderNotes && inspectionNotes) {
        await savePipelineNote({
          variables: {
            pipelineId: qcRequest.pipelineId,
            input,
          },
          refetchQueries: [
            {
              query: ALL_PIPELINE_NOTE,
              variables: {
                pipelineId: qcRequest.pipelineId,
                filter,
              },
            },
            {
              query: ALL_QC_REQUEST,
              variables: {
                pipelineId: qcRequest.pipelineId,
                filter: qcFilter,
              },
            },
          ],
        });

        cogoToast.success('Complete');
        handleReset();
        handleShowModal();
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };

  const handlePrice = (k, e) => {
    const { value } = e.target;
    if (currentTab === 'exterior') {
      const newExterior = exterior.map((item, key) => {
        if (key === k)
          return {
            ...item,
            price: value,
          };
        return item;
      });
      setExterior(newExterior);
    } else {
      const newInterior = interior.map((item, key) => {
        if (key === k)
          return {
            ...item,
            price: value,
          };
        return item;
      });
      setInterior(newInterior);
    }
  };

  const handleDescription = (k, e) => {
    const { value } = e.target;
    if (currentTab === 'exterior') {
      const newExterior = exterior.map((item, key) => {
        if (key === k)
          return {
            ...item,
            description: value,
          };
        return item;
      });
      setExterior(newExterior);
    } else {
      const newInterior = interior.map((item, key) => {
        if (key === k)
          return {
            ...item,
            description: value,
          };
        return item;
      });
      setInterior(newInterior);
    }
  };

  return (
    <>
      <Button onClick={handleShowModal}>Add note</Button>
      <Modal show={isShow} onHide={handleShowModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add notes</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Control
              as="textarea"
              name="orderNotes"
              placeholder="Enter order notes"
              onChange={e => {
                setOrderNotes(e.target.value);
                setSubmit(false);
              }}
              value={orderNotes || ''}
              isInvalid={isSubmit && !orderNotes}
            />
            <Form.Control.Feedback type="invalid">
              Required
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Control
              as="textarea"
              name="inspectionNotes"
              placeholder="Enter inspection notes"
              onChange={e => {
                setInspectionNotes(e.target.value);
                setSubmit(false);
              }}
              value={inspectionNotes || ''}
              isInvalid={isSubmit && !inspectionNotes}
            />
            <Form.Control.Feedback type="invalid">
              Required
            </Form.Control.Feedback>
          </Form.Group>

          <Nav variant="tabs" defaultActiveKey={currentTab}>
            <Nav.Item>
              <Nav.Link
                eventKey="exterior"
                onClick={() => setCurrentTab('exterior')}
              >
                Exterior
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="interior"
                onClick={() => setCurrentTab('interior')}
              >
                Interior
              </Nav.Link>
            </Nav.Item>
          </Nav>
          {currentTab === 'exterior' && (
            <StyledContainer className="p-2">
              <Row noGutters>
                <Col sm={2}>Item #</Col>
                <Col sm={8}>Description</Col>
                <Col sm={2}>Price</Col>
              </Row>
              {exterior.map((item, k) => (
                <Row key={k} noGutters>
                  <Col sm={2}>{k}</Col>
                  <Col sm={8}>
                    <Form.Control
                      onChange={e => handleDescription(k, e)}
                      value={item.description}
                    />
                  </Col>
                  <Col sm={2}>
                    <Form.Control
                      onChange={e => handlePrice(k, e)}
                      value={item.price || ''}
                    />
                  </Col>
                </Row>
              ))}
              <Row noGutters>
                <Col sm={{ offset: 8, span: 2 }} className="text-right">
                  Price
                </Col>
                <Col sm={2}>
                  {setCurrency(
                    'USD',
                    exterior
                      .map(item => (item.price ? parseFloat(item.price) : 0))
                      .reduce((a, b) => a + b),
                    2
                  )}
                </Col>
              </Row>
            </StyledContainer>
          )}
          {currentTab === 'interior' && (
            <StyledContainer className="p-2">
              <Row noGutters>
                <Col sm={2}>Item #</Col>
                <Col sm={8}>Description</Col>
                <Col sm={2}>Price</Col>
              </Row>
              {interior.map((item, k) => (
                <Row key={k} noGutters>
                  <Col sm={2}>{k}</Col>
                  <Col sm={8}>
                    <Form.Control
                      onChange={e => handleDescription(k, e)}
                      value={item.description}
                    />
                  </Col>
                  <Col sm={2}>
                    <Form.Control
                      onChange={e => handlePrice(k, e)}
                      value={item.price || ''}
                    />
                  </Col>
                </Row>
              ))}
              <Row noGutters>
                <Col sm={{ offset: 8, span: 2 }} className="text-right">
                  Price
                </Col>
                <Col sm={2}>
                  {setCurrency(
                    'USD',
                    interior
                      .map(item => (item.price ? parseFloat(item.price) : 0))
                      .reduce((a, b) => a + b),
                    2
                  )}
                </Col>
              </Row>
            </StyledContainer>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" disabled={isLoading} onClick={handleSubmit}>
            Save message
          </Button>
          <Button variant="secondary" onClick={handleShowModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddQCRequestNote;
