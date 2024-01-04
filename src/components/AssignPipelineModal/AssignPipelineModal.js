import React, { useState } from 'react';
import { Modal, Nav, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import AssignPipelineHistory from 'components/AssignPipelineHistory';
import UserAssignedList from 'components/UserAssignedList';
import ALL_PIPELINE from 'queries/allPipeline';
import { useRightClickDisabled } from 'contexts/RightClickDisabled';
import { shape } from 'prop-types';
import { StyledContainer } from './styles';
import { ASSIGN_PIPELINE } from './mutations';

const AssignPipelineModal = ({ pipeline, pipelineFilter }) => {
  const [isShow, setShow] = useState(false);
  const [user, setUser] = useState(
    pipeline.assignId ? { id: pipeline.assignId } : null
  );
  const [isLoading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState('CONTRACTOR');
  const [assignPipeline] = useMutation(ASSIGN_PIPELINE);
  const { setRightClickDisabled } = useRightClickDisabled();
  const handleShow = () => {
    setShow(!isShow);
    setRightClickDisabled(!isShow);
  }
  const handleSelect = e => {
    if (!user) setUser(e);
    else if (user.id !== e.id) setUser(e);
    else setUser(null);
  };
  const handleSubmit = async () => {
    if (!user) {
      cogoToast.warn('No user selected');
      return;
    }
    if (user.id === pipeline.assignId) {
      handleShow();
      cogoToast.success('Complete');
      return;
    }
    try {
      await assignPipeline({
        variables: {
          id: pipeline.id,
          input: {
            assignId: user.id,
            assign: `${user.firstName} ${user.lastName}`,
          },
        },
        refetchQueries: [
          {
            query: ALL_PIPELINE,
            variables: { filter: pipelineFilter },
          },
        ],
      });
      setLoading(false);
      handleShow();
      cogoToast.success('Complete');
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };
  return (
    <>
      <div>
        <a href="#/" onClick={handleShow}>
          {pipeline.assignId ? pipeline.assign : 'Pending'}
        </a>
      </div>
      {isShow && (
        <Modal show size="lg" onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Assign</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex mb-3">
              <div className="mr-auto">
                <Button
                  variant="warning"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  Save
                </Button>
              </div>
              <div>
                <AssignPipelineHistory history={pipeline.assignedHistory} />
              </div>
            </div>
            <StyledContainer>
              <Nav variant="tabs" defaultActiveKey={currentTab}>
                <Nav.Item>
                  <Nav.Link
                    eventKey="CONTRACTOR"
                    onClick={() => setCurrentTab('CONTRACTOR')}
                  >
                    Order
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="REVIEWER"
                    onClick={() => setCurrentTab('REVIEWER')}
                  >
                    Review
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="QUALITY_CONTROL"
                    onClick={() => setCurrentTab('QUALITY_CONTROL')}
                  >
                    Quality Control
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <UserAssignedList
                onSelect={handleSelect}
                userRoles={[currentTab]}
                selected={user}
              />
            </StyledContainer>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

AssignPipelineModal.propTypes = {
  pipeline: shape({}),
  pipelineFilter: shape({}),
};

AssignPipelineModal.defaultProps = {
  pipeline: {},
  pipelineFilter: {},
};

export default AssignPipelineModal;
