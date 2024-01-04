import React, { useState } from 'react';
import { Modal, Tabs, Tab } from 'react-bootstrap';
import { shape } from 'prop-types';
import Profile from './components/Profile';
import Passwords from './components/Passwords';
import Comments from './components/Comments';
import { useRightClickDisabled } from 'contexts/RightClickDisabled';
import SearchCriteria from './components/SearchCriteria';

const PipelineAuthorModal = ({ pipeline }) => {
  const [isShow, setShow] = useState(false);
  const { setRightClickDisabled } = useRightClickDisabled();
  const handleShow = () => {
    setShow(!isShow);
    setRightClickDisabled(!isShow);
  }

  return (
    <>
      <div>
        <a href="#/" onClick={handleShow}>
          {pipeline.authorName}
        </a>
      </div>
      {isShow && (
        <Modal show onHide={handleShow} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>{pipeline.authorName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs defaultActiveKey="profile">
              <Tab eventKey="profile" title="Profile">
                <Profile userId={pipeline.authorId} />
              </Tab>
              <Tab eventKey="passwords" title="Passwords">
                <Passwords
                  userId={pipeline.authorId}
                  company={pipeline.company}
                />
              </Tab>
              <Tab eventKey="comments" title="Comments">
                <Comments userId={pipeline.authorId} />
              </Tab>
              <Tab eventKey="search-criteria" title="SearchCriteria">
                <SearchCriteria userId={pipeline.authorId} />
              </Tab>
            </Tabs>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

PipelineAuthorModal.defaultProps = {
  pipeline: {},
};

PipelineAuthorModal.propTypes = {
  pipeline: shape({}),
};

export default PipelineAuthorModal;
