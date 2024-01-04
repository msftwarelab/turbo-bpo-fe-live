import * as yup from 'yup';

export default yup.object().shape({
  status: yup.string().when('isEdit', {
    is: true,
    then: yup
      .string()
      .required('required')
      .nullable(),
  }),
  orderNumber: yup
    .string()
    .required('required')
    .nullable(),
  authorId: yup
    .string()
    .nullable()
    .when('hasAuthor', {
      is: true,
      then: yup
        .string()
        .required('required')
        .nullable(),
    }),
  address: yup
    .string()
    .required('required')
    .nullable(),
  country: yup
    .string()
    .required('required')
    .nullable(),
  location: yup
    .string()
    .required('required')
    .nullable(),
  companyId: yup
    .string()
    .required('required')
    .nullable(),
  orderType: yup
    .string()
    .required('required')
    .nullable(),
  assign: yup
    .string()
    .required('required')
    .nullable(),
});
