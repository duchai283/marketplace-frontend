import React from 'react';
import { Formik } from 'formik';
import { massageErrorForm } from 'src/global-constant';
import InputTypePassword from 'src/components/InputTypePassWord';
import { validatePassword } from './validationSchema';
import { updateUserInfo } from 'src/containers/Home/actions';
const { requiredMessage } = massageErrorForm;

const ChangePasswordForm = ({ dispatch }) => {
  return (
    <Formik
      initialValues={{
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      }}
      onSubmit={values => {
        values.isChangePassword = true;
        dispatch(updateUserInfo(values));
      }}
      validateOnChange={false}
      validateOnBlur={false}
      validate={values => {
        let errors = {};
        errors = validatePassword(values, errors);
        if (
          !values.currentPassword &&
          (values.hasChangeEmail || values.hasChangePassword)
        ) {
          errors.currentPassword = requiredMessage;
        }
        return errors;
      }}
    >
      {({ errors, values, handleChange, handleSubmit }) => (
        <div className="form__password">
          <h2 className="heading-2">Change Password</h2>
          <div className="form-group">
            <label htmlFor="" className="form-label">
              Current Password
            </label>
            <InputTypePassword
              onChange={handleChange('currentPassword')}
              placeholder="Enter your current password here..."
              value={values.currentPassword}
            />
            {errors.currentPassword && (
              <div className="error">{errors.currentPassword}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="" className="form-label">
              New Password
            </label>
            <InputTypePassword
              onChange={handleChange('newPassword')}
              placeholder="Enter your new password here..."
              value={values.newPassword}
            />
            {errors.newPassword && (
              <div className="error">{errors.newPassword}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="" className="form-label">
              Confirm New Password
            </label>
            <InputTypePassword
              onChange={handleChange('confirmNewPassword')}
              placeholder="Enter your confirm new password here..."
              value={values.confirmNewPassword}
            />
            {errors.confirmNewPassword && (
              <div className="error">{errors.confirmNewPassword}</div>
            )}
          </div>
          <div className="btn_wrap">
            <button
              className="savebtn"
              onClick={handleSubmit}
              style={{ width: '160px' }}
            >
              Change Password
            </button>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;
