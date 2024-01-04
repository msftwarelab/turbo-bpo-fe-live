import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import { withApollo } from 'react-apollo';
import { Button, Modal } from 'react-bootstrap';
import removeNull from 'utils/removeNull';
import setErrorMessage from 'utils/setErrorMessage';
import removeTypeName from 'utils/removeTypeName';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import CompanyForm from '../CompanyForm';
import { UPDATE_COMPANY } from './mutations';
import { ALL_COMPANY } from '../CompanyList/queries';

const EditCompany = ({ company, client, filter }) => {
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleShow = () => setShow(!isShow);

  const handleSubmit = async data => {
    setLoading(true);
    const input = { ...removeNull(data) };
    delete input.id;
    try {
      const {
        data: { updateCompany },
      } = await client.mutate({
        mutation: UPDATE_COMPANY,
        variables: {
          id: company.id,
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
      if (updateCompany) cogoToast.success('Company updated');
      else cogoToast.error(setErrorMessage());
      handleShow();
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
      handleShow();
    }
  };

  const initialValues = { ...removeTypeName(company) };
  delete initialValues.logs;

  return (
    <>
      <Button variant="primary" size="sm" onClick={handleShow}>
        <FontAwesomeIcon icon={faEdit} />
      </Button>
      <Modal show={isShow} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Company</Modal.Title>
        </Modal.Header>
        <CompanyForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onClose={handleShow}
          isLoading={isLoading}
        />
      </Modal>
    </>
  );
};

export default withApollo(EditCompany);
