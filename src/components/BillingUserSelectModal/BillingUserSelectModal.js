import React, { useState, useEffect } from 'react';
import { Button, Modal, ListGroup } from 'react-bootstrap';
import { arrayOf, shape, bool, func } from 'prop-types';
import BillingUserSelectOrders from 'components/BillingUserSelectOrders';
import { StyledModalBody } from './styles';

const BillingUserSelectModal = ({ options, isLoading, onSelect }) => {
  const [newOptions, setNewOptions] = useState(options);
  useEffect(() => {
    setNewOptions(options);
  }, [options]);
  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);
  const handleSelect = selected => {
    onSelect(selected);
    handleShow();
  };
  const handleUserPipelines = (item, pipelines) => {
    const editNewOptions = [...newOptions];
    const newUserOptions = {
      ...item,
      pipelines,
    };
    const foundIndex = newOptions.findIndex(
      user => user.id === newUserOptions.id
    );
    editNewOptions[foundIndex] = newUserOptions;
    setNewOptions(editNewOptions);
  };
  return (
    <>
      <Button onClick={handleShow} disabled={isLoading}>
        Select
      </Button>
      {isShow && (
        <Modal show onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Select User</Modal.Title>
          </Modal.Header>
          <StyledModalBody>
            {newOptions.length ? (
              <ListGroup>
                {newOptions.map(item => (
                  <ListGroup.Item key={item.id}>
                    <div className="d-flex">
                      <div className="mr-auto">
                        {item.username}{' '}
                        <BillingUserSelectOrders
                          pipelines={item.pipelines}
                          onSelectPipelines={pipelines =>
                            handleUserPipelines(item, pipelines)
                          }
                        />
                      </div>
                      <div>
                        <Button
                          className="p-0"
                          onClick={() => handleSelect(item)}
                          variant="link"
                        >
                          Select
                        </Button>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <div>No user selected</div>
            )}
          </StyledModalBody>
        </Modal>
      )}
    </>
  );
};

BillingUserSelectModal.propTypes = {
  options: arrayOf(shape({})),
  isLoading: bool,
  onSelect: func,
};

BillingUserSelectModal.defaultProps = {
  options: [],
  isLoading: false,
  onSelect: e => e,
};
export default BillingUserSelectModal;
