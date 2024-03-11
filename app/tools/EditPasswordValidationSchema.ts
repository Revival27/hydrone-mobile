import * as yup from 'yup';

export const editPasswordValidationSchema = yup.object().shape({
  password: yup
    .string()
    .required('Please enter a password.')
    .min(6, 'The password must be at least 6 characters long')
    .test('UpperCaseError', 'Must contain an uppercase letter', function (value) {
      const regex = /[A-Z]/;
      if (value?.match(regex)) {
        return true;
      }
      const { path, createError } = this;

      return createError({
        path,
        message: 'Must contain an uppercase letter',
      });
    })
    .test('LowerCaseError', 'Must contain an lowercase letter', function (value) {
      const regex = /[a-z]/;
      if (value?.match(regex)) {
        return true;
      }
      const { path, createError } = this;

      return createError({
        path,
        message: 'Must contain an lowercase letter',
      });
    })
    .test('SpecialCharacter', 'Must contain an special letter', function (value) {
      const regex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
      if (value?.match(regex)) {
        return true;
      }
      const { path, createError } = this;

      return createError({
        path,
        message: 'Must contain an special letter',
      });
    })
    .test('IncludeNumber', 'Must contain a number', function (value) {
      const regex = /\d/;
      if (value?.match(regex)) {
        return true;
      }
      const { path, createError } = this;

      return createError({
        path,
        message: 'Must contain a number',
      });
    }),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'The passwords do not match')
    .required('Please enter your password again'),
});
