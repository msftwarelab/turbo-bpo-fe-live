import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useMutation } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import { withApollo } from 'react-apollo';
import setErrorMessage from 'utils/setErrorMessage';
import UserAssignedList from 'components/UserAssignedList';
import { UPDATE_QUALITY_CONTROL } from './mutations';
import ALL_QUALITY_CONTROL from 'queries/allQualityControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHolding } from '@fortawesome/free-solid-svg-icons';
import { useMe } from 'contexts/Me';

const AssignQualityControl = ({
  qualityControl,
  qualityControlFilter,
  client,
}) => {
  const { me } = useMe();
  const [isShow, setShow] = useState(false);
  const [user, setUser] = useState(
    qualityControl.assignId ? { id: qualityControl.assignId } : null
  );
  const [isLoading, setLoading] = useState(false);
  const [assignReason, setAssignReason] = useState(null);
  const [assignQualityControl] = useMutation(UPDATE_QUALITY_CONTROL);
  const handleChange = e => {
    const { value } = e.target;
    setAssignReason(value);
  };
  const handleShow = () => setShow(!isShow);
  const handleSelect = e => {
    if (!user) setUser(e);
    else if (user.id !== e.id) setUser(e);
    else setUser(null);
  };
  const handleSelfAssign = () => handleSubmit(me.id);
  const handleSubmit = async userId => {
    if (!userId && !user) {
      cogoToast.warn('No user selected');
      return;
    }
    try {
      await assignQualityControl({
        variables: {
          id: qualityControl.id,
          input: {
            assignId: userId ? userId : user.id,
            assignReason,
          },
        },
        refetchQueries: [
          {
            query: ALL_QUALITY_CONTROL,
            variables: { filter: qualityControlFilter },
          },
        ],
      });
      setLoading(false);
      handleShow();
      cogoToast.success('QualityControl successfully assigned');
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };
  return (
    <>
      <div>
        <Button size="sm" onClick={handleShow} variant="warning">
          <FontAwesomeIcon icon={faHandHolding} />
        </Button>
      </div>
      {isShow && (
        <Modal show size="xl" onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Assign</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <Button
                variant="warning"
                onClick={() => handleSubmit()}
                disabled={isLoading}
              >
                Save
              </Button>
              <Button
                className="ml-2"
                variant="primary"
                onClick={handleSelfAssign}
                disabled={isLoading}
              >
                Self assign
              </Button>
            </div>
            <Form.Control
              className="mb-3"
              as="textarea"
              row={3}
              value={assignReason || ''}
              onChange={handleChange}
              placeholder="Enter reason for manual assignment here"
            />
            <UserAssignedList
              onSelect={handleSelect}
              userRoles={['QUALITY_CONTROL']}
              selected={user}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default withApollo(AssignQualityControl);
