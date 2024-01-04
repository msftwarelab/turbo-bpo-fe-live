import React from 'react'
import { Tabs, Tab, Container } from 'react-bootstrap'
import BalanceReport from './components/BalanceReport'
import CheckoutReport from './components/CheckoutReport'
import CreditReport from './components/CreditReport'
import OrderSubmitReport from './components/OrderSubmitReport'
import QCRatingReport from './components/QCRatingReport'
import QCCompletedReport from './components/QCCompletedReport'
import { StyledContainer } from './styles'

const Reports = () => {
  return (
    <Container className="my-3" fluid>
      <Tabs defaultActiveKey="balances">
        <Tab eventKey="balances" title="Balances">
          <div className="border-top-0 border p-3 bg-white">
            <BalanceReport/>
          </div>
        </Tab>
        <Tab eventKey="checkout" title="Checkout">
          <div className="border-top-0 border p-3 bg-white">
            <CheckoutReport/>
          </div>
        </Tab>
        <Tab eventKey="credits" title="Credits">
          <div className="border-top-0 border p-3 bg-white">
           <CreditReport/>
          </div>
        </Tab>
        <Tab eventKey="qcRating" title="QC Rating">
          <StyledContainer className="border-top-0 border p-3 bg-white">
            <QCRatingReport/>
          </StyledContainer>
        </Tab>

        <Tab eventKey="orderSubmits" title="Order Submits">
          <div className="border-top-0 border p-3 bg-white">
            <OrderSubmitReport/>
          </div>
        </Tab>
        <Tab eventKey="qcCompleted" title="QC Completed">
           <StyledContainer className="border-top-0 border p-3 bg-white">
              <QCCompletedReport/>
          </StyledContainer>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Reports;
