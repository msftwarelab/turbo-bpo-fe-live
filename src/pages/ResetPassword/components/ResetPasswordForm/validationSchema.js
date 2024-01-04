 import * as yup from 'yup';

export default yup.object().shape({
  password: yup
          .string()
          .required('Password is required'),
  passwordConfirm: yup
          .string()
          .oneOf([yup.ref('password'), null], 'Confirm Passwords must match on password')
 
});

