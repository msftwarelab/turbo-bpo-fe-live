import * as yup from 'yup';

export default yup.object().shape({
  orderNumber: yup
    .string()
    .required('required')
    .nullable(),
  qcType: yup
    .string()
    .nullable()
    .when('type', {
      is: 'QC',
      then: yup
        .string()
        .required('required')
        .nullable(),
    }),
});
