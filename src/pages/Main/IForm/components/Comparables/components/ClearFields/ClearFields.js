import React, { useState } from 'react';
import { func } from 'prop-types';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import compOptions from 'constants/compOptions';

const ClearFields = ({ onClear }) => {
  const [selectedFields, setSelectedFields] = useState([]);
  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);

  const handleSelectedGrid = e => {
    let newSelectedFields = [...selectedFields, e];
    if (selectedFields.includes(e)) {
      newSelectedFields = selectedFields.filter(item => item !== e);
    }
    setSelectedFields(newSelectedFields);
  };

  const handleAllSelectedFields = () => {
    let newSelectedFields = compOptions;
    if (compOptions.some(item => selectedFields.includes(item))) {
      newSelectedFields = [];
    }
    setSelectedFields(newSelectedFields);
  };

  const handleClear = () => {
    onClear(selectedFields);
    handleShow();
  };

  return (
    <>
      <Button className="mr-2" onClick={handleShow}>
        Clear
      </Button>
      {isShow && (
        <Modal show onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Clear Fields</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table bordered striped hover size="sm">
              <thead>
                <tr>
                  <th>
                    <Form.Check
                      type="checkbox"
                      checked={compOptions.every(item =>
                        selectedFields.includes(item)
                      )}
                      onClick={handleAllSelectedFields}
                    />
                  </th>
                  <th>Columns</th>
                  <th>MLS Number</th>
                </tr>
              </thead>
              <tbody>
                {compOptions.map((item, key) => (
                  <tr key={key}>
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={selectedFields.includes(item)}
                        onChange={() => handleSelectedGrid(item)}
                      />
                    </td>
                    <td>{item}</td>
                    <td />
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
          <Button onClick={handleClear} variant="warning">Save</Button>
          <Button onClick={handleShow} variant="primary">Cancel</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

ClearFields.defaultProps = {
  onClear: e => e,
};

ClearFields.propTypes = {
  onClear: func,
};

export default ClearFields;
