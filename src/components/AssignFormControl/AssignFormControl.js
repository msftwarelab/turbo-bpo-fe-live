import React from 'react';
import { Form } from 'react-bootstrap';
import { useMe } from 'contexts/Me';
import { func, string, shape, bool } from 'prop-types';

const AssignFormControl = ({
  onChange,
  value,
  errors = {},
  touched = {},
  disabled = false,
}) => {
  const { me } = useMe();
  const { firstName, lastName } = me;
  console.log(me)
  return (
    <>
      <Form.Control
        as="select"
        name="assign"
        onChange={onChange}
        value={value || ''}
        isInvalid={errors.assign && touched.assign}
        disabled={disabled}
      >
        <option value="">Select one</option>
        {!me.roles.includes('ADMIN') && (
          <option value={`${firstName} ${lastName}`}>
            {firstName} {lastName}
          </option>
        )}
        {value &&
          !['', 'Turbo BPO', `${firstName} ${lastName}`].includes(value) && (
            <option value={value}>{value}</option>
          )}
        {me.status === 'ACTIVE-TURBO' && <option>Turbo BPO</option>}
      </Form.Control>
      <Form.Control.Feedback type="invalid">
        {errors.assign}
      </Form.Control.Feedback>
    </>
  );
};

AssignFormControl.propTypes = {
  onChange: func,
  value: string,
  errors: shape({}),
  touched: shape({}),
  disabled: bool,
};

AssignFormControl.defaultProps = {
  onChange: e => e,
  value: null,
  errors: {},
  touched: {},
  disabled: false,
};

export default AssignFormControl;
