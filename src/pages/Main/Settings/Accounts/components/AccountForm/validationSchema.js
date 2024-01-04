import * as yup from 'yup';

export default yup.object().shape({
  username: yup
    .string()
    .required('required')
    .nullable(),
  password: yup
    .string()
    .nullable()
    .required('required'),
});
