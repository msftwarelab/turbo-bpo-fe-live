import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import { withApollo } from 'react-apollo';
import { Modal, Button } from 'react-bootstrap';
import setErrorMessage from 'utils/setErrorMessage';
import HeaderForm from '../HeaderForm';
import { SAVE_HEADER } from './mutations';
import { ALL_HEADER } from '../HeaderList/queries';

const AddHeader = ({ client, filter }) => {
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleShow = () => setShow(!isShow);

  const handleSubmit = async input => {
    setLoading(true);
    try {
      const {
        data: { saveHeader },
      } = await client.mutate({
        mutation: SAVE_HEADER,
        variables: {
          name: input.name,
        },
        refetchQueries: [
          {
            query: ALL_HEADER,
            variables: { filter },
          },
        ],
      });
      setLoading(false);
      if (saveHeader) cogoToast.success('Header created');
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
        Add Header
      </Button>
      <Modal show={isShow} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Add Header</Modal.Title>
        </Modal.Header>

        <HeaderForm
          form="headerForm"
          initialValues={{
            name: null,
          }}
          onSubmit={handleSubmit}
          onClose={handleShow}
          isLoading={isLoading}
        />
      </Modal>
    </>
  );
};

export default withApollo(AddHeader);
