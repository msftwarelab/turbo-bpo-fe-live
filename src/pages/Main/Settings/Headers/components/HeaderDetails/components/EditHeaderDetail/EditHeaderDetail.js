import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import { withApollo } from 'react-apollo';
import { Button, Modal } from 'react-bootstrap';
import removeNull from 'utils/removeNull';
import setErrorMessage from 'utils/setErrorMessage';
import removeTypeName from 'utils/removeTypeName';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import HeaderForm from '../HeaderDetailForm';
import { UPDATE_HEADER_DETAIL } from './mutations';
import { ALL_HEADER_DETAIL } from '../HeaderDetailList/queries';

const EditHeaderDetail = ({ header, parentId, client, filter }) => {
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleShow = () => setShow(!isShow);

  const handleSubmit = async data => {
    setLoading(true);
    const input = { ...removeNull(data) };
    delete input.id;
    try {
      const {
        data: { updateHeader },
      } = await client.mutate({
        mutation: UPDATE_HEADER_DETAIL,
        variables: {
          id: header.id,
          name: input.name,
        },
        refetchQueries: [
          {
            query: ALL_HEADER_DETAIL,
            variables: { filter, parentId },
          },
        ],
      });
      setLoading(false);
      if (updateHeader) cogoToast.success('Header updated');
      else cogoToast.error(setErrorMessage());
      handleShow();
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
      handleShow();
    }
  };

  const initialValues = { ...removeTypeName(header) };
  delete initialValues.logs;

  return (
    <>
      <Button variant="primary" size="sm" onClick={handleShow}>
        <FontAwesomeIcon icon={faEdit} />
      </Button>
      <Modal show={isShow} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Header</Modal.Title>
        </Modal.Header>
        <HeaderForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onClose={handleShow}
          isLoading={isLoading}
        />
      </Modal>
    </>
  );
};

export default withApollo(EditHeaderDetail);
