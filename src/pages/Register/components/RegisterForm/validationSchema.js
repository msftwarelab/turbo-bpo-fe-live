import * as yup from 'yup';

export default yup.object().shape({
  email: yup
    .string()
    .email()
    .required('required')
    .nullable(),
  password: yup
    .string()
    .nullable()
    .required('required'),
  firstName: yup
    .string()
    .nullable()
    .required('required'),
  lastName: yup
    .string()
    .nullable()
    .required('required'),
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
  recaptcha: yup
    .string()
    .nullable()
    .required('required'),
});
