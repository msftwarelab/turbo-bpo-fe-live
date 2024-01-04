import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import { withApollo } from 'react-apollo';
import { Modal, Button } from 'react-bootstrap';
import setErrorMessage from 'utils/setErrorMessage';
import CompanyForm from '../CompanyForm';
import { SAVE_COMPANY } from './mutations';
import { ALL_COMPANY } from '../CompanyList/queries';

const AddCompany = ({ client, filter }) => {
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleShow = () => setShow(!isShow);

  const handleSubmit = async input => {
    setLoading(true);
    try {
      const {
        data: { saveCompany },
      } = await client.mutate({
        mutation: SAVE_COMPANY,
        variables: {
          input,
        },
        refetchQueries: [
          {
            query: ALL_COMPANY,
            variables: { filter },
          },
        ],
      });
      setLoading(false);
      if (saveCompany) cogoToast.success('Company created');
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
        Add Company
      </Button>
      <Modal show={isShow} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Add Company</Modal.Title>
        </Modal.Header>

        <CompanyForm
          form="companyForm"
          initialValues={{
            name: null,
            webSite: null,
            isAdmin: null,
            isClient: null,
            isPremium: null,
          }}
          onSubmit={handleSubmit}
          onClose={handleShow}
          isLoading={isLoading}
        />
      </Modal>
    </>
  );
};

export default withApollo(AddCompany);
