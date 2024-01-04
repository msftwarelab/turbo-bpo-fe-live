import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import setErrorMessage from 'utils/setErrorMessage';
import cogoToast from 'cogo-toast';
import removeTypeName from 'utils/removeTypeName';
import UPDATE_COMPANY from 'mutations/updateCompany';
import ALL_COMPANY from 'queries/allCompany';
import { Button, Modal } from 'react-bootstrap';
import CompanyForm from 'components/CompanyForm';
import { shape } from 'prop-types';

const AddCompanyForm = ({ company, filter }) => {
  const [isShow, setShow] = useState(false);
  const [updateCompany] = useMutation(UPDATE_COMPANY);
  const handleShow = () => setShow(!isShow);
  const [isLoading, setLoading] = useState(false);
  const handleAdd = async newForm => {
    setLoading(true);
    try {
      await updateCompany({
        variables: {
          id: company.id,
          input: {
            name: company.name,
            forms: [...company.forms, newForm].map(item =>
              removeTypeName(item)
            ),
          },
        },
        refetchQueries: [
          {
            query: ALL_COMPANY,
            variables: { filter },
          },
        ],
      });
      cogoToast.success('Company Form added');
      setLoading(false);
      handleShow();
    } catch (err) {
      cogoToast.error(setErrorMessage(err));
      setLoading(false);
    }
  };
  return (
    <>
      <Button onClick={handleShow} disabled={isLoading}>
        Add
      </Button>
      {isShow && (
        <Modal show onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Add Forms</Modal.Title>
          </Modal.Header>
          <CompanyForm
            initialValues={{
              name: null,
              style: null,
            }}
            onSubmit={handleAdd}
            onClose={handleShow}
          />
        </Modal>
      )}
    </>
  );
};

AddCompanyForm.propTypes = {
  company: shape({}),
  filter: shape({}),
};

AddCompanyForm.defaultProps = {
  company: {},
  filter: {},
};
export default AddCompanyForm;
