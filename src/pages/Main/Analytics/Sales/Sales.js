import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { StyledContainer } from './styles';

import MonthlyOrders from './components/MonthlyOrders';
import ContractorOrders from './components/ContractorOrders';

const Sales = () => {
  const [tab, setTab] = useState('monthly-orders');
  return (
    <StyledContainer>
      <Tabs activeKey={tab} onSelect={k => setTab(k)}>
        <Tab eventKey="monthly-orders" title="Monthly Orders">
          <MonthlyOrders />
        </Tab>
        <Tab eventKey="contractor-orders" title="Contractor Orders">
          <ContractorOrders />
        </Tab>
      </Tabs>
    </StyledContainer>
  );
};

export default Sales;
