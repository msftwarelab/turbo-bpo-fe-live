import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import { withApollo } from 'react-apollo';
import { Modal, Button } from 'react-bootstrap';
import setErrorMessage from 'utils/setErrorMessage';
import ALL_ACCOUNT from 'queries/allAccount';
import { shape } from 'prop-types';
import AccountForm from '../AccountForm';
import { SAVE_ACCOUNT } from './mutations';

const AddAccount = ({ client, filter }) => {
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const handleShow = () => setShow(!isShow);

  const handleSubmit = async input => {
    setLoading(true);
    try {
      const {
        data: { saveAccount },
      } = await client.mutate({
        mutation: SAVE_ACCOUNT,
        variables: {
          input,
        },
        refetchQueries: [
          {
            query: ALL_ACCOUNT,
            variables: { filter },
          },
        ],
      });
      setLoading(false);
      if (saveAccount) cogoToast.success('Complete');
      else cogoToast.error(setErrorMessage());
      handleShow();
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
      handleShow();
    }
  };

  return (
    <>
      <Button onClick={handleShow} variant="warning" className="mr-auto">
        Add Account
      </Button>
      <Modal show={isShow} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Add Account</Modal.Title>
        </Modal.Header>

        <AccountForm
          form="accountForm"
          initialValues={{
            recordType: 'COMPANY',
            company: 'custom',
            webSite: null,
            username: null,
            password: null,
            question1: null,
            answer1: null,
            question2: null,
            answer2: null,
            question3: null,
            answer3: null,
            others: null,
          }}
          onSubmit={handleSubmit}
          onClose={handleShow}
          isLoading={isLoading}
        />
      </Modal>
    </>
  );
};

AddAccount.propTypes = {
  client: shape({}),
  filter: shape({}),
};

AddAccount.defaultProps = {
  client: {},
  filter: {},
};

export default withApollo(AddAccount);
