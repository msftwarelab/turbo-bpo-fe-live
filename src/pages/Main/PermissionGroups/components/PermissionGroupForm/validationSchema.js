import * as yup from 'yup';

export default yup.object().shape({
  permissions: yup
    .array()
    .required('Need to have at least 1 permission selected')
    .nullable(),
  name: yup
    .string()
    .required('required')
    .nullable(),
});
