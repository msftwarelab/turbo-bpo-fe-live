import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import { withApollo } from 'react-apollo';
import { Modal, Button } from 'react-bootstrap';
import setErrorMessage from 'utils/setErrorMessage';
import documentTagOptions from 'constants/documentTagOptions';
import DocumentForm from '../DocumentForm';
import { SAVE_INSTRUCTION } from './mutations';
import { ALL_INSTRUCTION } from '../DocumentList/queries';

const AddDocument = ({ client, filter }) => {
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const handleShowModal = () => setShow(!isShow);

  const handleSubmit = async fields => {
    setLoading(true);
    const { tag, company, file, comment } = fields;
    let input = {};

    if (tag === 'SPECIAL') {
      input = {
        tag: documentTagOptions.find(item => item.value === tag).label,
        client: fields.client.label,
        clientId: fields.client.value,
        file,
        comment,
      };
    } else if (tag === 'VENDOR') {
      input = {
        tag: documentTagOptions.find(item => item.value === tag).label,
        companyId: company.id,
        company: company.name,
        file,
        comment,
      };
    }

    try {
      const {
        data: { saveInstruction },
      } = await client.mutate({
        mutation: SAVE_INSTRUCTION,
        variables: {
          input,
        },
        refetchQueries: [
          {
            query: ALL_INSTRUCTION,
            variables: { filter },
          },
        ],
      });
      setLoading(false);
      if (saveInstruction) cogoToast.success('Complete');
      else cogoToast.error(setErrorMessage());
      handleShowModal();
    } catch (e) {
      cogoToast.error(setErrorMessage(e));
    }
  };

  return (
    <>
      <Button onClick={handleShowModal}>Add Documents</Button>
      <Modal show={isShow} onHide={handleShowModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add document</Modal.Title>
        </Modal.Header>
        <DocumentForm
          form="documentForm"
          initialValues={{
            tag: null,
            client: {},
            company: {},
            file: null,
            comment: null,
          }}
          onSubmit={handleSubmit}
          onClose={handleShowModal}
          isLoading={isLoading}
        />
      </Modal>
    </>
  );
};

export default withApollo(AddDocument);
