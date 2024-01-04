import * as yup from 'yup';
import isEmpty from 'lodash/isEmpty';

export default yup.object().shape({
  roles: yup
    .array()
    .required('required')
    .nullable(),
  status: yup
    .string()
    .required('required')
    .nullable(),
  email: yup
    .string()
    .email()
    .required('required')
    .nullable(),
  firstName: yup
    .string()
    .nullable()
    .required('required'),
  lastName: yup
    .string()
    .nullable()
    .required('required'),
  password: yup
    .string()
    .nullable()
    .when('id', {
      is: val => isEmpty(val),
      then: yup
        .string()
        .required('required')
        .nullable(),
    }),
  company: yup
    .string()
    .nullable()
    .required('required'),
  phoneNumber: yup
    .string()
    .nullable()
    .required('required'),
  address: yup
    .string()
    .nullable()
    .required('required'),
  city: yup
    .string()
    .nullable()
    .required('required'),
  state: yup
    .string()
    .nullable()
    .required('required'),
  zipCode: yup
    .string()
    .nullable()
    .required('required'),
  permissionGroupId: yup
    .string()
    .nullable()
    .required('required'),
});
