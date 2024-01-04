import React from 'react';
import { Query } from 'react-apollo';
import setErrorMessage from 'utils/setErrorMessage';
import paypal from 'img/paypal.png';
import { CREDIT_BALANCE } from './queries';

const CreditBalance = () => (
  <Query query={CREDIT_BALANCE}>
    {({ loading, error, data = {} }) => {
      if (loading) return <div>loading...</div>;
      if (error) return <div>{setErrorMessage(error)}</div>;
      const { credit } = data.creditBalance;
      return (
        <div>
          <div className="mb-3 d-flex align-items-end justify-content-center ">
            <h1 className="mb-0 mr-2">{credit}</h1>
            <div className="mb-1">credits left.</div>
          </div>
          <div className="text-center mb-3">
            Credits need to be purchased to automate the iForm only for self
            assigned orders.
          </div>
          <div className="text-center">
            <img width="200" src={paypal} alt="paypal" />
          </div>
        </div>
      );
    }}
  </Query>
);

export default CreditBalance;
