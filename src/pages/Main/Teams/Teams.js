import React, { useState } from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';
import TeamList from './components/TeamList';
import TopFilter from './components/TopFilter';

const Teams = () => {
  const currentDate = new Date();

  const [topFilter, setTopFilter] = useState({
    orderMonth: currentDate.getMonth() + 1,
    orderYear: currentDate.getFullYear(),
  });

  const handleTopFilter = e => {
    const { name, value } = e.target;
    setTopFilter({
      ...topFilter,
      [name]: parseInt(value, 10),
    });
  };

  return (
    <Container className="my-3" fluid>
      <TopFilter topFilter={topFilter} handleTopFilter={handleTopFilter} />
      <Tabs defaultActiveKey="clients">
        <Tab eventKey="clients" title="Clients">
          <div className="border-top-0 border p-3 bg-white">
            <TeamList
              userRoles={['CLIENT']}
              hideOrders={false}
              topFilter={topFilter}
            />
          </div>
        </Tab>
        <Tab eventKey="contractors" title="Contractors">
          <div className="border-top-0 border p-3 bg-white">
            <TeamList
              userRoles={['CONTRACTOR']}
              hideOrders
              topFilter={topFilter}
            />
          </div>
        </Tab>
        <Tab eventKey="qualityControls" title="Quality Controls">
          <div className="border-top-0 border p-3 bg-white">
            <TeamList
              userRoles={['QUALITY_CONTROL']}
              hideOrders={false}
              topFilter={topFilter}
            />
          </div>
        </Tab>
        <Tab eventKey="coordinators" title="Coordinators">
          <div className="border-top-0 border p-3 bg-white">
            <TeamList
              userRoles={['COORDINATOR']}
              hideOrders
              topFilter={topFilter}
            />
          </div>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Teams;
