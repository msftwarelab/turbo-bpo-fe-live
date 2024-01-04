import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import setErrorMessage from 'utils/setErrorMessage';
import cogoToast from 'cogo-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import ALL_QC_REQUEST from 'queries/allQcRequest';
import UPDATE_QC_REQUEST from 'mutations/updateQCRequest';
import { Button, Form } from 'react-bootstrap';
import { shape } from 'prop-types';
import notesOptions from 'constants/notesOptions';

const ChangeQCType = ({ qcRequest, filter }) => {
  const [requestType, setRequestType] = useState(qcRequest.requestType);
  const [isEdit, setEdit] = useState(false);
  const [updateQCRequest] = useMutation(UPDATE_QC_REQUEST);
  const handleChange = e => {
    const { value } = e.target;
    setRequestType(value);
  };
  const handleEdit = () => setEdit(!isEdit);
  const [isLoading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await updateQCRequest({
        variables: {
          id: qcRequest.id,
          input: {
            requestType,
          },
        },
        refetchQueries: [
          {
            query: ALL_QC_REQUEST,
            variables: { filter },
          },
        ],
      });
      cogoToast.success('QC Request updated');
      setLoading(false);
      handleEdit();
    } catch (err) {
      cogoToast.error(setErrorMessage(err));
      setLoading(false);
    }
  };

  const qcRequestValue = notesOptions.find(item => item.value === requestType);
  return (
    <div className="d-flex">
      {isEdit ? (
        <>
          <div className="mr-2" style={{ width: 130 }}>
            <Form.Control
              as="select"
              name="requestType"
              onChange={handleChange}
              value={requestType || ''}
            >
              {notesOptions.map(item => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Form.Control>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            variant="success"
            className="mr-1"
          >
            <FontAwesomeIcon icon={faCheck} />
          </Button>
          <Button onClick={handleEdit}>
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </>
      ) : (
        <>
          <div className="mr-2">
            {qcRequestValue ? qcRequestValue.label : requestType}
          </div>
          <Button
            className="p-0"
            onClick={handleEdit}
            disabled={isLoading}
            variant="link"
          >
            Edit
          </Button>
        </>
      )}
    </div>
  );
};

ChangeQCType.propTypes = {
  qcRequest: shape({}),
  filter: shape({}),
};

ChangeQCType.defaultProps = {
  qcRequest: {},
  filter: {},
};
export default ChangeQCType;
