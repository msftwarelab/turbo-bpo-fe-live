import * as yup from 'yup';

export default yup.object().shape({
  subject: yup
    .string()
    .required('required')
    .nullable(),
  startDate: yup
    .string()
    .required('required')
    .nullable(),
  endDate: yup
    .string()
    .nullable()
    .required('required'),
  message: yup
    .string()
    .nullable()
    .required('required'),
});
