import React, { useState } from 'react';
import { Button, Modal, Nav } from 'react-bootstrap';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import setErrorMessage from 'utils/setErrorMessage';
import cogoToast from 'cogo-toast';
import UserAssignedList from 'components/UserAssignedList';
import ALL_PIPELINE from 'queries/allPipeline';
import { StyledContainer } from './styles';

const graphqlString = ({ pipelineId = null, user = {} }) =>
  `pipeline_${pipelineId}: updatePipeline(id: "${pipelineId}", input: {
    assignId: "${user.id}",
    assign: "${user.firstName} ${user.lastName}"
  })`;

const BatchAssignPipeline = ({
  selectedPipeline = [],
  client = {},
  pipelineFilter = {},
}) => {
  const [isLoading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState('CLIENT');
  const [user, setUser] = useState(null);
  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);
  const handleOpenPipeline = () => {
    if (!selectedPipeline.length) {
      cogoToast.warn('No pipeline selected');
      return;
    }
    handleShow();
  };

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
    let str = '';
    selectedPipeline.map(pipeline => {
      str += graphqlString({
        pipelineId: pipeline.id,
        user,
      });
      return false;
    });
    setLoading(true);
    try {
      await client.mutate({
        mutation: gql(`mutation { ${str} }`),
        refetchQueries: [
          {
            query: ALL_PIPELINE,
            variables: { filter: pipelineFilter },
          },
        ],
      });
      cogoToast.success('Batch assignment done successfully');
      setLoading(false);
      setUser(null);
    } catch (err) {
      cogoToast.error(setErrorMessage(err));
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleOpenPipeline}>Batch assignment</Button>
      {isShow && (
        <Modal show size="lg" onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Batch Assign</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <Button
                variant="warning"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                Save
              </Button>
            </div>
            <StyledContainer>
              <Nav variant="tabs" defaultActiveKey={currentTab}>
                <Nav.Item>
                  <Nav.Link
                    eventKey="CLIENT"
                    onClick={() => setCurrentTab('CLIENT')}
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

export default withApollo(BatchAssignPipeline);
