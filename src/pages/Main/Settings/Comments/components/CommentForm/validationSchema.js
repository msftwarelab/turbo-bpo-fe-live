import * as yup from 'yup';

export default yup.object().shape({
  value: yup
    .string()
    .required('required')
    .nullable(),
  label: yup.string().when('isAdd', {
    is: true,
    then: yup
      .string()
      .required('required')
      .nullable(),
  }),
});
