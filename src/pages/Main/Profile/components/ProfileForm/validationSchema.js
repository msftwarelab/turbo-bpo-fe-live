import * as yup from 'yup';

export default yup.object().shape({
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
});
