import * as Yup from 'yup';
import { massageErrorForm } from 'src/global-constant';
const { requiredMessage, invalidEmailWithEx } = massageErrorForm;

export const validateForm = value => {
  let errors = {};
  const { password, confirmPass } = value;
  if (!/\d/.test(password)) {
    errors.password = 'The password must have at least one number.';
  } else if (!/[A-Z]/.test(password)) {
    errors.password = 'The password must have at least one upper case.';
  } else if (!/[a-z]/.test(password)) {
    errors.password = 'The password must have at least one lower case.';
  } else if (password.length < 8) {
    errors.password = 'The password needs at least 8 characters.';
  } else if (password !== confirmPass) {
    errors.confirmPass = 'Please make sure your passwords match.';
  }

  return errors;
};

export const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email(invalidEmailWithEx)
    .required(requiredMessage),
  password: Yup.string().required(requiredMessage),
  confirmPass: Yup.string().required(requiredMessage)
});
