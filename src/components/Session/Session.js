import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Form, Col } from 'react-bootstrap';
import moment from 'moment';
import { useMe } from 'contexts/Me';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import SessionStart from 'components/SessionStart';
import SessionStop from 'components/SessionStop';
import SessionContinue from 'components/SessionContinue';
import SessionList from 'components/SessionList';

const Session = () => {
  const { me } = useMe();
  const [isStarted, setStarted] = useState(false);
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
    userId: me.id,
  });
  const handleFilter = async e => {
    setFilter({
      ...filter,
      offset: e.selected * filter.limit,
    });
  };
  const [isLoaded, setLoaded] = useState(false);
  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);
  const handleSessionInitiated = () => {
    localStorage.setItem('isSessionInitiated', '1');
    handleShow();
  };
  const handleStarted = () => {
    setStarted(true);
  };
  const handleLoaded = () => {
    setLoaded(true);
  };
  return (
    <>
      <Link className="menu-item" to="#/" onClick={handleShow}>
        <FontAwesomeIcon icon={faClock} />
        <span className="title">Session</span>
      </Link>
      {isShow && (
        <Modal show onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Session</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Row className="mb-2">
              <Col sm="8">
                <div className="mb-2">Todays</div>
                <h4>{`${moment().format('MMMM DD, YYYY')} UTC${moment().format(
                  'Z'
                )}`}</h4>
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
        </Modal>
      )}
    </>
  );
};

export default Session;
