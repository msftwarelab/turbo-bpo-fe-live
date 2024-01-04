import * as yup from 'yup';

export default yup.object().shape({
  invoiceDate: yup
    .string()
    .required('required')
    .nullable(),
});
