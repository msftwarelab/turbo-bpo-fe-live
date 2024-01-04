import React, { useState } from 'react';
import { arrayOf, shape } from 'prop-types';
import { Modal, Button, Table } from 'react-bootstrap';
import moment from 'moment';

const AssignPipelineHistory = ({ history }) => {
  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Assign History
      </Button>
      {isShow && (
        <Modal show onHide={handleShow} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>History</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table bordered hover>
              <thead>
                <tr>
                  <th className="text-center">DateTime</th>
                  <th className="text-center">Action</th>
                  <th className="text-center">Assignee</th>
                  <th className="text-center">Assigned By</th>
                  <th className="text-center">Modified By</th>
                </tr>
              </thead>
              <tbody>
                {history && history.length ? (
                  history.map((item, i) => (
                    <tr key={i}>
                      <td className="text-center">
                        {moment(item.logDateTime).format(
                          'MMMM DD, YYYY hh:mm A'
                        )}
                      </td>
                      <td className="text-center">{item.action}</td>
                      <td className="text-center">{item.assignee}</td>
                      <td className="text-center">{item.assignedBy}</td>
                      <td className="text-center">{item.modifiedBy}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="text-center" colSpan="5">
                      No data yet.
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

AssignPipelineHistory.propTypes = {
  history: arrayOf(shape({})),
};

AssignPipelineHistory.defaultProps = {
  history: [],
};

export default AssignPipelineHistory;
