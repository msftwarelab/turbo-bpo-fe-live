import * as yup from 'yup';

export default yup.object().shape({
  invoiceNumber: yup
    .string()
    .required('required')
    .nullable(),
  dateFrom: yup
    .string()
    .required('required')
    .nullable(),
  dateTo: yup
    .string()
    .required('required')
    .nullable(),
  date: yup
    .string()
    .required('required')
    .nullable(),
  dueDate: yup
    .string()
    .required('required')
    .nullable(),
  entries: yup
    .array()
    .required('required')
    .nullable(),
});
