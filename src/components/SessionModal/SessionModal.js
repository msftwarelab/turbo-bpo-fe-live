import React, { useState } from 'react';
import { Modal, Form, Col } from 'react-bootstrap';
import { useMe } from 'contexts/Me';
import SessionStart from 'components/SessionStart';
import SessionStop from 'components/SessionStop';
import SessionContinue from 'components/SessionContinue';
import SessionList from 'components/SessionList';
import { bool } from 'prop-types';
import moment from 'moment';
import { StyledModal, StyledModalOverlay, StyledModalDialog } from './styles';

const SessionModal = ({ hasCloseButton }) => {
  const [isStarted, setStarted] = useState(false);
  const [closeButton, setCloseButton] = useState(hasCloseButton);
  const [isLoaded, setLoaded] = useState(false);
  const { me } = useMe();
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
    userId: me.id,
  });

  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);
  const handleFilter = async e => {
    setFilter({
      ...filter,
      offset: e.selected * filter.limit,
    });
  };

  const handleSessionInitiated = () => {
    localStorage.setItem('isSessionInitiated', '1');
    handleShow();
  };

  const handleStarted = () => {
    setStarted(true);
    setCloseButton(true);
  };
  const isSessionInitiated = localStorage.getItem('isSessionInitiated');

  const handleLoaded = () => {
    setLoaded(true);
  };

  return (
    <>
      {!isSessionInitiated && (
        <StyledModal>
          <StyledModalDialog>
            <Modal.Header
              closeButton={closeButton}
              onHide={handleSessionInitiated}
            >
              <Modal.Title>Session</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Row className="mb-2">
                <Col sm="8">
                  <div className="mb-2">Todays</div>
                  <h4>{`${moment().format(
                    'MMMM DD, YYYY'
                  )} UTC${moment().format('Z')}`}</h4>
                </Col>
                {!isLoaded ? (
                  <div>loading</div>
                ) : (
                  <Col>
                    <div className="d-flex">
                      <div className="mr-2">
                        <SessionStart
                          input={{
                            userId: me.id,
                            invoiceDate: moment().format('YYYY-MM-DD'),
                          }}
                          filter={filter}
                          onStart={handleSessionInitiated}
                          disabled={isStarted}
                        />
                      </div>
                      <div className="mr-2">
                        <SessionStop
                          userId={me.id}
                          filter={filter}
                          onStop={handleSessionInitiated}
                          disabled={!isStarted}
                        />
                      </div>
                      <SessionContinue
                        userId={me.id}
                        filter={filter}
                        onContinue={handleSessionInitiated}
                        disabled={isStarted}
                      />
                    </div>
                  </Col>
                )}
              </Form.Row>
              <SessionList
                filter={filter}
                onChangeFilter={handleFilter}
                onLoaded={handleLoaded}
                onStarted={handleStarted}
              />
            </Modal.Body>
          </StyledModalDialog>
          <StyledModalOverlay />
        </StyledModal>
      )}
    </>
  );
};

SessionModal.propTypes = {
  hasCloseButton: bool,
};

SessionModal.defaultProps = {
  hasCloseButton: true,
};

export default SessionModal;
