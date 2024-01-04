import React, { useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';

const QualityControlHistory = ({ data }) => {
  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);
  return (
    <>
      <Button variant="primary" size="sm" onClick={handleShow}>
        <FontAwesomeIcon icon={faHistory} />
      </Button>
      <Modal show={isShow} onHide={handleShow} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Status</th>
                <th>Reason</th>
                <th>Date/Time</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item, k) => (
                  <tr key={k}>
                    <td>{item.status}</td>
                    <td>
                      {item.reason ? (
                        <>
                          {item.reason}
                          <br />
                        </>
                      ) : (
                        ''
                      )}
                      {item.currentAssignee ? (
                        <>
                          Original Assignee: {item.currentAssignee} <br />
                        </>
                      ) : (
                        ''
                      )}
                      {item.newAssignee
                        ? `New Assignee: ${item.newAssignee}`
                        : ''}
                    </td>
                    <td>
                      {moment(item.datetime).format('MMM M YYYY, h:mm a')}{' '}
                      {item.cratedby ? `by ${item.cratedby}` : ' '}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default QualityControlHistory;
