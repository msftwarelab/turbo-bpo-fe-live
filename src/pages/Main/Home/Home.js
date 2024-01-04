import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useMe } from 'contexts/Me';
import AddPipeline from 'components/AddPipeline';
import EditPipeline from 'components/EditPipeline';
import PipelineList from 'components/PipelineList';
import moment from 'moment';
import QualityControlList from './components/QualityControlList';
import ALL_PIPELINE from 'queries/allPipeline';
import { useModalStatus } from 'contexts/ModalStatus';
import { useQuery } from '@apollo/react-hooks';

const Home = () => {
  const { me } = useMe();
  const { isModalOpen } = useModalStatus();

  const [filter, setFilter] = useState({
    status: ['ACTIVE'],
    dateFrom: moment()
      .subtract(30, 'days')
      .format('YYYY-MM-DD'),
    dateTo: moment().format('YYYY-MM-DD'),
    offset: 0,
    limit: 20,
  });

  const { data = {} } = useQuery(ALL_PIPELINE, {
    variables: { filter: { ...filter, limit: 1000 } },
    fetchPolicy: 'no-cache',
  });

  const { allPipeline = {} } = data;
  const { results = [] } = allPipeline;

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
  const handleShowEdit = newPipeline => {
    setEdit(true);
    setPipeline(newPipeline);
    handleCurrent('edit-pipeline');
  };

  const handleFilter = newFilter => setFilter(newFilter);

  let tabs = {
    pipelines: (
      <PipelineList
        onCreate={handleShowCreate}
        onEdit={handleShowEdit}
        filter={filter}
        exportData={results}
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

  if (me.permissionList.includes('VIEW_QUALITY_CONTROL')) {
    tabs = {
      ...tabs,
      'quality-control': <QualityControlList />,
    };
  }

  return (
    <Container className="my-3" fluid>
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link
            active={current === 'pipelines'}
            onClick={() => handleCurrent('pipelines')}
          >
            Pipeline
          </Nav.Link>
        </Nav.Item>
        {me.permissionList.includes('VIEW_QUALITY_CONTROL') && (
          <>
            <Nav.Item>
              <Nav.Link
                active={current === 'quality-control'}
                onClick={() => handleCurrent('quality-control')}
              >
                Quality control
              </Nav.Link>
            </Nav.Item>
          </>
        )}
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

export default Home;
