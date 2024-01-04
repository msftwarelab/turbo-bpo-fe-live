import React, { useState, useEffect } from 'react';
import { Button, Modal, ListGroup, Form } from 'react-bootstrap';
import { arrayOf, shape, func } from 'prop-types';
import { StyledModalBody } from './styles';

const BillingUserSelectOrders = ({ pipelines, onSelectPipelines }) => {
  const [newPipelines, setNewPipelines] = useState(pipelines);
  useEffect(() => {
    setNewPipelines(pipelines);
  }, [pipelines]);
  const [isItemShow, setItemShow] = useState(false);
  const handleItemShow = () => setItemShow(!isItemShow);
  const handleChange = selected => {
    const editNewPipelines = [...newPipelines];
    const foundIndex = editNewPipelines.findIndex(
      item => item.id === selected.id
    );
    if (editNewPipelines[foundIndex].isSelected) {
      editNewPipelines[foundIndex].isSelected = false;
    } else {
      editNewPipelines[foundIndex].isSelected = true;
    }
    setNewPipelines(editNewPipelines);
  };
  const handleSubmit = () => {
    handleItemShow();
    onSelectPipelines(newPipelines);
  };
  return (
    <>
      <Button variant="link" className="p-0" onClick={handleItemShow}>
        {newPipelines.filter(item => item.isSelected).length} Orders selected
      </Button>
      {isItemShow && (
        <Modal show onHide={handleItemShow}>
          <Modal.Header closeButton>
            <Modal.Title>Select Pipeline</Modal.Title>
          </Modal.Header>
          <StyledModalBody>
            {newPipelines.length ? (
              <ListGroup>
                {newPipelines.map(item => (
                  <ListGroup.Item key={item.id} className="d-flex">
                    <div className="mr-auto">
                      <Form.Check
                        type="checkbox"
                        id={item.orderNumber}
                        label={item.orderNumber}
                        checked={item.isSelected}
                        onChange={() => handleChange(item)}
                      />
                    </div>
                    <div
                      className={
                        item.status === 'PAID' ? 'text-success' : 'text-warning'
                      }
                    >
                      {item.status === 'PAID' ? 'PAID' : 'PENDING'}
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <div>No user selected</div>
            )}
          </StyledModalBody>
          <Modal.Footer>
            <Button onClick={handleSubmit} variant="warning">
              Use selected pipeline
            </Button>
            <Button onClick={handleItemShow}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

BillingUserSelectOrders.propTypes = {
  pipelines: arrayOf(shape({})),
  onSelectPipelines: func,
};

BillingUserSelectOrders.defaultProps = {
  pipelines: [],
  onSelectPipelines: e => e,
};

export default BillingUserSelectOrders;
