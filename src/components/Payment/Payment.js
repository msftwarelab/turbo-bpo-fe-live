import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyCheck } from '@fortawesome/free-solid-svg-icons';
import { shape, string, number } from 'prop-types';
import PaymentModal from 'components/PaymentModal';

const Payment = ({ billingId, amount, filter }) => {
  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);
  return (
    <>
      <Button size="sm" variant="warning" onClick={handleShow}>
        <FontAwesomeIcon icon={faMoneyCheck} />
      </Button>
      {isShow && (
        <PaymentModal
          show
          onHide={handleShow}
          onSuccess={handleShow}
          amount={amount}
          billingId={billingId}
          filter={filter}
        />
      )}
    </>
  );
};

Payment.propTypes = {
  filter: shape({}),
  billingId: string,
  amount: number,
};

Payment.defaultProps = {
  filter: {},
  billingId: null,
  amount: null,
};

export default Payment;
