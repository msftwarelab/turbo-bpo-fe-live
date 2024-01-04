import * as yup from 'yup';

export default yup.object().shape({
  permissions: yup
    .array()
    .required('required')
    .nullable(),
  name: yup
    .string()
    .required('required')
    .nullable(),
});
