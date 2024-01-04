import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import setErrorMessage from 'utils/setErrorMessage';
import cogoToast from 'cogo-toast';
import removeTypeName from 'utils/removeTypeName';
import UPDATE_COMPANY from 'mutations/updateCompany';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import ALL_COMPANY from 'queries/allCompany';
import { Button, Modal } from 'react-bootstrap';
import CompanyForm from 'components/CompanyForm';
import { shape, number } from 'prop-types';

const EditCompanyForms = ({
  company,
  companyFormIndex,
  companyForm,
  filter,
}) => {
  const [isShow, setShow] = useState(false);
  const [updateCompany] = useMutation(UPDATE_COMPANY);
  const handleShow = () => setShow(!isShow);
  const [isLoading, setLoading] = useState(false);
  const handleEdit = async editedCompanyForm => {
    let companyForms = company.forms;
    if (companyFormIndex > -1) {
      companyForms.splice(companyFormIndex, 1);
    }
    companyForms = [editedCompanyForm, ...companyForms];
    setLoading(true);
    try {
      await updateCompany({
        variables: {
          id: company.id,
          input: {
            name: company.name,
            forms: companyForms.map(item => removeTypeName(item)),
          },
        },
        refetchQueries: [
          {
            query: ALL_COMPANY,
            variables: { filter },
          },
        ],
      });
      cogoToast.success('Company Form edited');
      setLoading(false);
      handleShow();
    } catch (err) {
      cogoToast.error(setErrorMessage(err));
      setLoading(false);
    }
  };
  return (
    <>
      <Button onClick={handleShow} disabled={isLoading} size="sm">
        <FontAwesomeIcon icon={faEdit} />
      </Button>
      {isShow && (
        <Modal show onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Forms</Modal.Title>
          </Modal.Header>
          <CompanyForm
            initialValues={companyForm}
            onSubmit={handleEdit}
            onClose={handleShow}
          />
        </Modal>
      )}
    </>
  );
};

EditCompanyForms.propTypes = {
  companyFormIndex: number,
  companyForm: shape({}),
  company: shape({}),
  filter: shape({}),
};

EditCompanyForms.defaultProps = {
  companyFormIndex: null,
  companyForm: {},
  company: {},
  filter: {},
};
export default EditCompanyForms;
