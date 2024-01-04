import * as yup from 'yup';

export default yup.object().shape({
  addedcredits: yup
    .number('Invalid input')
    .required('Required')
    .nullable(),
});
