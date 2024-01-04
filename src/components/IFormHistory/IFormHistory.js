import React, { useState } from 'react';
import moment from 'moment';
import { shape, arrayOf } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Table } from 'react-bootstrap';

const IFormHistory = ({ history }) => {
  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);
  return (
    <>
      <Button onClick={handleShow}>History</Button>
      {isShow && (
        <Modal show onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>IForm History</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Table bordered striped hover size="sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Created at</th>
                  <th>Updated at</th>
                  <th>PDF</th>
                </tr>
              </thead>
              <tbody>
                {history && history.length ? (
                  history.map((item, i) => (
                    <tr key={i}>
                      <td>{item.modifiedBy}</td>
                      <td>
                        {moment(item.createdDate).format(
                          'MMM DD YYYY HH:mm:ss A'
                        )}
                      </td>
                      <td>
                        {moment(item.updatedDate).format(
                          'MMM DD YYYY HH:mm:ss A'
                        )}
                      </td>
                      <td>
                        <a href={item.url}>
                          <FontAwesomeIcon icon={faFilePdf} />
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="text-center">
                      No data yet...
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={handleShow}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

IFormHistory.propTypes = {
  history: arrayOf(shape({})),
};

IFormHistory.defaultProps = {
  history: [],
};

export default IFormHistory;
