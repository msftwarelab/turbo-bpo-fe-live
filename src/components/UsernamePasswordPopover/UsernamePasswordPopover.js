import React, { useState, useRef } from 'react';
import { withApollo } from 'react-apollo';
import setErrorMessage from 'utils/setErrorMessage';
import cogoToast from 'cogo-toast';
import pick from 'lodash/pick';
import ALL_ACCOUNT from 'queries/allAccount';
import UPDATE_ACCOUNT from 'mutations/updateAccount';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ButtonToolbar, Overlay, Form, Button, Popover } from 'react-bootstrap';
import { shape, string } from 'prop-types';
import { StyledContainer } from './styles';

const UsernamePasswordPopover = ({ account, client, field, value, filter }) => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const handleClick = event => {
    setShow(!show);
    setTarget(event.target);
  };
  const handleClose = () => {
    setShow(!show);
  };
  const [newValue, setNewValue] = useState(value);
  const handleChange = e => {
    const { value: changedValue } = e.target;
    setNewValue(changedValue);
  };
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    if (!newValue) {
      cogoToast.warn('Required');
      return false;
    }
    const fields = {
      ...pick(account, [
        'recordType',
        'company',
        'webSite',
        'username',
        'password',
      ]),
      [field]: newValue,
    };

    try {
      await client.mutate({
        mutation: UPDATE_ACCOUNT,
        variables: {
          id: account.id,
          input: fields,
        },
        refetchQueries: [
          {
            query: ALL_ACCOUNT,
            variables: { filter },
          },
        ],
      });
      cogoToast.success(`Account's ${field} updated`);
      setLoading(false);
      setShow(!show);
    } catch (err) {
      cogoToast.error(setErrorMessage(err));
      setLoading(false);
    }
    return false;
  };
  return (
    <ButtonToolbar ref={ref}>
      <StyledContainer className="d-flex">
        <div className="mr-1">{value}</div>
        <Button onClick={handleClick} variant="link" className="p-0">
          Edit
        </Button>
      </StyledContainer>

      <Overlay
        show={show}
        target={target}
        placement="top"
        container={ref.current}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Content>
            <div className="d-flex">
              <div className="flex-grow-1 mr-2">
                <Form.Control onChange={handleChange} value={newValue || ''} />
              </div>
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="mr-2"
              >
                <FontAwesomeIcon icon={faEdit} />
              </Button>
              <Button
                onClick={handleClose}
                variant="secondary"
                disabled={isLoading}
              >
                <FontAwesomeIcon icon={faTimes} />
              </Button>
            </div>
          </Popover.Content>
        </Popover>
      </Overlay>
    </ButtonToolbar>
  );
};

UsernamePasswordPopover.propTypes = {
  account: shape({}),
  field: string,
  value: string,
  filter: shape({}),
  client: shape({}),
};

UsernamePasswordPopover.defaultProps = {
  account: {},
  field: null,
  value: null,
  filter: {},
  client: {},
};

export default withApollo(UsernamePasswordPopover);
