import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import { withApollo } from 'react-apollo';
import { Button, Modal } from 'react-bootstrap';
import removeNull from 'utils/removeNull';
import moment from 'moment';
import setErrorMessage from 'utils/setErrorMessage';
import removeTypeName from 'utils/removeTypeName';
import SessionForm from 'components/SessionForm';
import ALL_SESSION from 'queries/allSession';
import UPDATE_SESSION from 'mutations/updateSession';
import { shape } from 'prop-types';

const EditSession = ({ session, client, filter }) => {
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleShow = () => setShow(!isShow);

  const handleSubmit = async data => {
    setLoading(true);
    const input = {
      ...removeNull(data),
      invoiceDate: moment(data.invoiceDate).format('YYYY-MM-DD'),
      start: moment(data.start).utc(),
      end: moment(data.end).utc(),
    };
    delete input.id;
    try {
      const {
        data: { updateSession },
      } = await client.mutate({
        mutation: UPDATE_SESSION,
        variables: {
          id: session.id,
          input,
        },
        refetchQueries: [
          {
            query: ALL_SESSION,
            variables: { filter },
          },
        ],
      });
      setLoading(false);
      if (updateSession) cogoToast.success('User updated');
      else cogoToast.error(setErrorMessage());
      handleShow();
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
      handleShow();
    }
  };

  const initialValues = {
    ...removeTypeName(session),
    invoiceDate: moment(session.invoiceDate).format('YYYY-MM-DD'),
    start: moment(session.start).format('YYYY-MM-DD hh:mm A'),
    end: moment(session.end).format('YYYY-MM-DD hh:mm A'),
  };

  return (
    <>
      <Button variant="primary" size="sm" onClick={handleShow}>
        Edit
      </Button>
      <Modal show={isShow} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Session</Modal.Title>
        </Modal.Header>
        <SessionForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onClose={handleShow}
          isLoading={isLoading}
        />
      </Modal>
    </>
  );
};

EditSession.propTypes = {
  client: shape({}),
  session: shape({}),
  filter: shape({}),
};

EditSession.defaultProps = {
  client: {},
  session: {},
  filter: {},
};

export default withApollo(EditSession);
