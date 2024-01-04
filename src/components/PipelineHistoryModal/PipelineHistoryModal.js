import React, { useState } from 'react';
import moment from 'moment';
import { Modal, Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import { arrayOf, shape } from 'prop-types';

const PipelineHistoryModal = ({ pipelineHistory = [] }) => {
  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);
  return (
    <>
      <Button onClick={handleShow} variant="warning">
        {pipelineHistory ? pipelineHistory.length : 0}{' '}
        <FontAwesomeIcon icon={faHistory} />
      </Button>
      {isShow && (
        <Modal show onHide={handleShow} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>History</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Date and Time</th>
                  <th>Action</th>
                  <th>Value</th>
                  <th>Modified By</th>
                </tr>
              </thead>
              <tbody>
                {pipelineHistory && pipelineHistory.length ? (
                  pipelineHistory.map(item => (
                    <tr key={item.id}>
                      <td>
                        {moment(item.logDateTime).format('MMM DD YYYY, hh:mmA')}
                      </td>
                      <td>{item.action}</td>
                      <td>{item.value}</td>
                      <td>{item.modifiedBy}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center">
                      No data yet...
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

PipelineHistoryModal.propTypes = {
  pipelineHistory: arrayOf(shape({})),
};

PipelineHistoryModal.defaultProps = { pipelineHistory: [] };

export default PipelineHistoryModal;
