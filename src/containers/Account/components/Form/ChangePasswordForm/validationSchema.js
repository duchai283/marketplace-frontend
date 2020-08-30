export function validatePassword(values, errors) {
  // use positive look ahead to see if at least one upper case letter exists
  const haveOnUppercase = /(?=.*[A-Z])/;
  // use positive look ahead to see if at least one lower case letter exists
  const atLeastLowCase = /(?=.*[a-z])/;
  // use positive look ahead to see if at least one digit exists
  const haveOneNumber = /(?=.*?[0-9])/;
  //min 8 character
  const atLeast8Character = /.{8,}/;

  if (!values.currentPassword) {
    errors.currentPassword = 'Current password is required';
  }
  if (!values.newPassword) {
    errors.newPassword = 'New password is required';
  }
  if (!atLeast8Character.test(values.newPassword)) {
    errors.newPassword = 'The password needs at least 8 characters.';
  } else if (!haveOnUppercase.test(values.newPassword)) {
    errors.newPassword = 'The password must be have at least one upper case.';
  } else if (!atLeastLowCase.test(values.newPassword)) {
    errors.newPassword = 'The password must have at least one lower case.';
  } else if (!haveOneNumber.test(values.newPassword)) {
    errors.newPassword = 'The password must be have at least one number.';
  }

  if (values.currentPassword === values.newPassword) {
    errors.newPassword =
      'Your new password should not be the same with current one.';
  }

  if (!values.confirmNewPassword) {
    errors.confirmNewPassword = 'Confirm new password is required';
  }
  if (values.newPassword !== values.confirmNewPassword) {
    errors.confirmNewPassword = 'Confirm password is not match';
  }
  return errors;
}
