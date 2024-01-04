import * as yup from 'yup';

export default yup.object().shape({
  description: yup
    .string()
    .required('required')
    .nullable(),
  amount: yup
    .string()
    .required('required')
    .nullable(),
});
