import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import { withApollo } from 'react-apollo';
import { Modal, Button } from 'react-bootstrap';
import setErrorMessage from 'utils/setErrorMessage';
import HeaderDetailForm from '../HeaderDetailForm';
import { SAVE_HEADER_DETAIL } from './mutations';
import { ALL_HEADER_DETAIL } from '../HeaderDetailList/queries';

const AddHeaderDetail = ({ client, headerId, filter }) => {
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleShow = () => setShow(!isShow);

  const handleSubmit = async input => {
    setLoading(true);
    try {
      const {
        data: { saveHeaderDetail },
      } = await client.mutate({
        mutation: SAVE_HEADER_DETAIL,
        variables: {
          parentId: headerId,
          name: input.name,
        },
        refetchQueries: [
          {
            query: ALL_HEADER_DETAIL,
            variables: { filter, parentId: headerId },
          },
        ],
      });
      setLoading(false);
      if (saveHeaderDetail) cogoToast.success('Header created');
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
        Add Header Detail
      </Button>
      <Modal show={isShow} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Add Header</Modal.Title>
        </Modal.Header>

        <HeaderDetailForm
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

export default withApollo(AddHeaderDetail);
