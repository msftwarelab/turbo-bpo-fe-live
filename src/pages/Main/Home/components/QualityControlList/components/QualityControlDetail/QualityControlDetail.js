import React, { useState } from 'react';
import { Card, Row, Col, Tabs, Tab, Form } from 'react-bootstrap';
import UnholdQualityControl from 'components/UnholdQualityControl';
import HoldQualityControl from 'components/HoldQualityControl';
import CompleteQualityControl from 'components/CompleteQualityControl';
import notesOptions from 'constants/notesOptions';
import { shape, func } from 'prop-types';
import PipelineNotes from './components/PipelineNotes';
import PipelinePhotos from './components/PipelinePhotos';
import PipelineDocs from './components/PipelineDocs';
import { StyledContainerTabs } from './styles';
import Neighborhood from './components/Neighborhood';
const QualityControlDetail = ({
  qualityControl,
  qualityControlFilter,
  onClose,
}) => {
  const handleComplete = async () => {
    await onClose();
  };
  const [pipelineInput, setPipelineInput] = useState({
    message: null,
    requestType: 'FULL_RECOMPS',
  });
  const [qualityControlNoteFilter, setQualityControlNoteFilter] = useState({
    limit: 20,
    offset: 0,
  });
  const handleChangeQualityControlNoteFilter = e => {
    setQualityControlNoteFilter(e);
  };
  const [status, setStatus] = useState(qualityControl.status);
  const handleHold = () => setStatus('HOLD');
  const handleUnhold = () => setStatus('ACTIVE');
  const handleChange = e => {
    const { value, name } = e.target;
    setPipelineInput({
      ...pipelineInput,
      [name]: value,
    });
  };
  return (
    <div>
      <Card className="rounded-0">
        <Card.Header></Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Order Information</Card.Title>
                  <Row>
                    <Col sm="3">{qualityControl.orderNumber}</Col>
                    <Col sm="9">{qualityControl.address}</Col>
                  </Row>
                  <Row>
                    <Col sm="3">{qualityControl.clientName}</Col>
                    <Col sm="9">{qualityControl.orderType}</Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Quality Control Information</Card.Title>
                  <Row>
                    <Col sm="3">{qualityControl.id}</Col>
                    <Col sm="9">Status: {status}</Col>
                  </Row>
                  <Row>
                    <Col sm="3">
                      {qualityControl.assignId
                        ? qualityControl.assignee
                        : 'PENDING'}
                    </Col>
                    <Col sm="9">{qualityControl.orderType}</Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <StyledContainerTabs>
            <Tabs defaultActiveKey="notes">
              <Tab eventKey="notes" title="Notes">
                <div className="border p-3 bg-white">
                  <PipelineNotes
                    pipeline={{ id: qualityControl.pipelineId }}
                    filter={qualityControlNoteFilter}
                    onChangeFilter={handleChangeQualityControlNoteFilter}
                  />
                </div>
              </Tab>
              <Tab eventKey="comps" title="Comps">
                <div className=" border p-3 bg-white">coming soon</div>
              </Tab>
              <Tab eventKey="neighborhood" title="Neighborhood">
                <div className=" border p-3 bg-white">
                  <Neighborhood pipeline={{ id: qualityControl.pipelineId }} />
                </div>
              </Tab>
              <Tab eventKey="photos" title="Photos">
                <div className=" border p-3 bg-white">
                  <PipelinePhotos
                    pipeline={{ id: qualityControl.pipelineId }}
                  />
                </div>
              </Tab>
              <Tab eventKey="docs" title="Docs">
                <div className=" border p-3 bg-white">
                  <PipelineDocs pipeline={{ id: qualityControl.pipelineId }} />
                </div>
              </Tab>
            </Tabs>
          </StyledContainerTabs>
          <div className="mb-3">
            <Form.Row>
              <Col sm="9">
                <Form.Control
                  as="textarea"
                  name="message"
                  rows="1"
                  placeholder="QC Reply"
                  onChange={handleChange}
                  value={pipelineInput.message || ''}
                />
              </Col>
              <Col>
                <Form.Control
                  as="select"
                  name="requestType"
                  onChange={handleChange}
                  value={pipelineInput.requestType || ''}
                >
                  {notesOptions.map(item => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Row>
          </div>
          <div className="d-flex">
            <a
              href={`iform/${qualityControl.pipelineId}`}
              target="_blank"
              className="btn btn-primary mr-auto"
              rel="noopener noreferrer"
            >
              iForm
            </a>
            <CompleteQualityControl
              pipelineId={qualityControl.pipelineId}
              qualityControlId={qualityControl.id}
              message={pipelineInput.message}
              requestType={pipelineInput.requestType}
              className="mr-2"
              filter={qualityControlFilter}
              qualityControlAndNoteFilter={qualityControlNoteFilter}
              onComplete={handleComplete}
            />
            {status === 'HOLD' ? (
              <UnholdQualityControl
                qualityControl={qualityControl}
                filter={qualityControlFilter}
                onUnhold={handleUnhold}
              />
            ) : (
              <HoldQualityControl
                qualityControl={qualityControl}
                filter={qualityControlFilter}
                onHold={handleHold}
              />
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

QualityControlDetail.propTypes = {
  qualityControl: shape({}),
  qualityControlFilter: shape({}),
  onClose: func,
};

QualityControlDetail.defaultProps = {
  qualityControl: {},
  qualityControlFilter: {},
  onClose: e => e,
};

export default QualityControlDetail;
