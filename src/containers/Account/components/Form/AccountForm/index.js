import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { massageErrorForm } from 'src/global-constant';
import { updateUserInfo } from 'src/containers/Home/actions';
const { requiredMessage } = massageErrorForm;

const AccountSchema = Yup.object().shape({
  firstname: Yup.string().required(requiredMessage),
  lastname: Yup.string().required(requiredMessage)
});

const AccountForm = ({ isChangePass, setIsChangePass, dispatch }) => {
  return (
    <Formik
      initialValues={{
        firstname: '',
        lastname: ''
      }}
      validationSchema={AccountSchema}
      onSubmit={values => {
        dispatch(updateUserInfo(values));
      }}
    >
      {({ touched, errors, values, handleChange, handleSubmit }) => (
        <form className="form-1">
          <div className="form__account">
            <h2 className="heading-2">Account Information</h2>
            <div className="form-group">
              <label htmlFor="" className="form-label">
                First Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter your first name here..."
                className={`form-input ${
                  errors.firstname && touched.firstname ? 'is-invalid' : ''
                }`}
                name="firstname"
                value={values.firstname}
                onChange={handleChange('firstname')}
              />{' '}
              {errors.firstname && touched.firstname && (
                <div className="error">First name is require</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter your last name here..."
                value={values.lastname}
                className={`form-input ${
                  errors.lastname && touched.lastname ? 'is-invalid' : ''
                }`}
                name="lastname"
                onChange={handleChange('lastname')}
              />
              {errors.lastname && touched.lastname && (
                <div className="error">Last name is require</div>
              )}
            </div>
            <div className="form-check">
              <span className="rc-checkbox">
                <input
                  type="checkbox"
                  className="rc-checkbox-input"
                  checked={isChangePass}
                  onClick={() => setIsChangePass(!isChangePass)}
                />
              </span>
              Change Password
            </div>
          </div>
          <div className="btn_wrap">
            <button className="savebtn" type="submit" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default AccountForm;
