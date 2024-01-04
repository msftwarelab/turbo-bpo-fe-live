import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button } from 'react-bootstrap';
import { string } from 'prop-types';
import CREATE_BILLING_EXCEL from 'mutations/createBillingExcel';

const ExportBillingEntry = ({ billingId }) => {
  const [isLoading, setLoading] = useState(false);
  const [createBillingExcel] = useMutation(CREATE_BILLING_EXCEL);
  const handleClick = async () => {
    setLoading(true);
    try {
      const { data } = await createBillingExcel({
        variables: {
          id: billingId,
        },
      });
      window.location.href = data.createBillingExcel;
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  return (
    <Button variant="warning" onClick={handleClick} disabled={isLoading}>
      Export
    </Button>
  );
};

ExportBillingEntry.propTypes = {
  billingId: string,
};

ExportBillingEntry.defaultProps = {
  billingId: null,
};

export default ExportBillingEntry;
