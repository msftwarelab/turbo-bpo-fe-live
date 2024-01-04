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
});
