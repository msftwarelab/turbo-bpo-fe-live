import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Modal } from 'react-bootstrap';
import cogoToast from 'cogo-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import setErrorMessage from 'utils/setErrorMessage';
import UserCompanyList from 'components/UserCompanyList';
import UPDATE_USER from 'mutations/updateUser';
import ALL_USER from 'queries/allUser';

const UserCompany = ({ user, filter }) => {
  const [isLoading, setLoading] = useState(false);
  const [updateUser] = useMutation(UPDATE_USER);
  const [selected, setSelected] = useState(user.companyList || []);
  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);
  const handleSelected = newSelected => {
    setSelected(newSelected);
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await updateUser({
        variables: {
          id: user.id,
          input: {
            companyList: selected,
          },
        },
        refetchQueries: [
          {
            query: ALL_USER,
            variables: {
              filter,
            },
          },
        ],
      });
      cogoToast.success('User updated');
      handleShow();
      setLoading(false);
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };
  return (
    <>
      <Button variant="primary" size="sm" onClick={handleShow}>
        <FontAwesomeIcon icon={faCog} />
      </Button>
      {isShow && (
        <Modal show onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Company List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UserCompanyList
              userId={user.id}
              selected={selected}
              onSelected={handleSelected}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={handleSubmit}
              variant="warning"
              disabled={isLoading}
            >
              Save
            </Button>
            <Button onClick={handleShow} disabled={isLoading}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default UserCompany;
