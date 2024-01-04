import React, { useState, useEffect } from 'react';
import cogoToast from 'cogo-toast';
import { withApollo } from 'react-apollo';
import { Button, Modal } from 'react-bootstrap';

import removeTypeName from 'utils/removeTypeName';
import setErrorMessage from 'utils/setErrorMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import PriceModuleForm from 'components/PriceModuleForm';
import ALL_USER from 'queries/allUser';
import UPDATE_USER from 'mutations/updateUser';
import ADD_CREDIT_LEDGER from 'mutations/addCreditLedger';
import { shape } from 'prop-types';

const EditPriceModule = ({ user, client, filter }) => {
  const [initialValues, setInitialValues] = useState(
    removeTypeName(user.priceModule)
  );
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [addedCredit, setAddedCredit] = useState(null);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
      setInitialValues(removeTypeName(user.priceModule));
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [user]);

  const handleShow = () => {
    setInitialValues(removeTypeName(user.priceModule));
    setAddedCredit(null);
    setShow(!isShow);
  };

  const handleBlur = e => {
    const name = e.target.name;
    const value = Number(e.target.value);
    setInitialValues({ ...initialValues, [name]: value });
  };

  const handleSubmit = async priceModule => {
    setLoading(true);
    const input = { priceModule };
    try {
      const {
        data: { updateUser },
      } = await client.mutate({
        mutation: UPDATE_USER,
        variables: {
          id: user.id,
          input,
        },
        refetchQueries: [
          {
            query: ALL_USER,
            variables: { filter },
          },
        ],
      });

      let success = updateUser;

      if (addedCredit !== null) {
        const {
          data: { addCreditLedger },
        } = await client.mutate({
          mutation: ADD_CREDIT_LEDGER,
          variables: {
            input: { userID: user.id, amount: addedCredit },
          },
        });

        success = updateUser && addCreditLedger;
      }

      if (success) cogoToast.success('Complete');
      else cogoToast.error(setErrorMessage());
      handleShow();
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
      handleShow();
    }
  };

  const handleAddCredit = e => {
    const addCredit = Number(e.addedcredits);
    const newCredit = initialValues.credits + addCredit - addedCredit;
    setAddedCredit(addCredit);
    setInitialValues({ ...initialValues, credits: newCredit });
  };

  return (
    <>
      <Button variant="primary" size="sm" onClick={handleShow}>
        <FontAwesomeIcon icon={faMoneyBill} />
      </Button>
      <Modal show={isShow} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Price Module</Modal.Title>
        </Modal.Header>
        <PriceModuleForm
          initialValues={initialValues}
          onBlur={handleBlur}
          onSubmit={handleSubmit}
          onClose={handleShow}
          isLoading={isLoading}
          onAddCredit={handleAddCredit}
          addedCredit={addedCredit}
        />
      </Modal>
    </>
  );
};

EditPriceModule.propTypes = {
  client: shape({}),
  user: shape({}),
  filter: shape({}),
};

EditPriceModule.defaultProps = {
  client: {},
  user: {},
  filter: {},
};

export default withApollo(EditPriceModule);
