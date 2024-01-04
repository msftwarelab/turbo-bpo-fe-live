import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import AddPipeline from 'components/AddPipeline';
import { useMe } from 'contexts/Me';
import moment from 'moment';
import EditPipeline from 'components/EditPipeline';
import PipelineList from 'components/PipelineList';

const Manage = () => {
  const [filter, setFilter] = useState({
    dateFrom: moment()
      .subtract(30, 'days')
      .format('YYYY-MM-DD'),
    dateTo: moment().format('YYYY-MM-DD'),
    offset: 0,
    limit: 20,
  });
  const { me } = useMe();
  const [isCreate, setCreate] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [pipeline, setPipeline] = useState({});
  const [current, setCurrent] = useState('pipelines');

  const handleCurrent = e => setCurrent(e);
  const handleHideCreate = () => {
    setCreate(false);
    handleCurrent('pipelines');
  };
  const handleShowCreate = () => {
    setCreate(true);
    handleCurrent('add-pipeline');
  };
  const handleHideEdit = () => {
    setEdit(false);
    handleCurrent('pipelines');
  };
  const handleShowEdit = pipeline => {
    setEdit(true);
    setPipeline(pipeline);
    handleCurrent('edit-pipeline');
  };

  const handleFilter = filter => setFilter(filter);

  let tabs = {
    pipelines: (
      <PipelineList
        onCreate={handleShowCreate}
        onEdit={handleShowEdit}
        filter={filter}
        onChangeFilter={handleFilter}
      />
    ),
    'add-pipeline': (
      <AddPipeline
        hasAuthor={!me.roles.includes('CLIENT')}
        onCreate={handleHideCreate}
        filter={filter}
        onClose={handleHideCreate}
      />
    ),
    'edit-pipeline': (
      <EditPipeline
        hasAuthor={!me.roles.includes('CLIENT')}
        pipeline={pipeline}
        filter={filter}
        onClose={handleHideEdit}
      />
    ),
  };

  return (
    <Container className="my-3" fluid>
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link
            active={current === 'pipelines'}
            onClick={() => handleCurrent('pipelines')}
          >
            Manage
          </Nav.Link>
        </Nav.Item>
        {isCreate && (
          <Nav.Item>
            <Nav.Item>
              <div
                className={`nav-link ${
                  current === 'add-pipeline' ? 'active' : ''
                }`}
              >
                <Link
                  to="#/"
                  className="mr-3"
                  onClick={e => {
                    e.preventDefault();
                    handleCurrent('add-pipeline');
                  }}
                >
                  New order
                </Link>
                <Link to="#/" onClick={handleHideCreate}>
                  <FontAwesomeIcon icon={faTimes} />
                </Link>
              </div>
            </Nav.Item>
          </Nav.Item>
        )}
        {isEdit && (
          <Nav.Item>
            <Nav.Item>
              <div
                className={`nav-link ${
                  current === 'edit-pipeline' ? 'active' : ''
                }`}
              >
                <Link
                  to="#/"
                  className="mr-3"
                  onClick={() => handleCurrent('edit-pipeline')}
                >
                  {pipeline.orderNumber}
                </Link>
                <Link to="#/" onClick={handleHideEdit}>
                  <FontAwesomeIcon icon={faTimes} />
                </Link>
              </div>
            </Nav.Item>
          </Nav.Item>
        )}
      </Nav>
      <div className="border-top-0 border p-3 bg-white">{tabs[current]}</div>
    </Container>
  );
};

export default Manage;
