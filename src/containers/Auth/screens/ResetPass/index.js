import React from 'react';
import './styles.scss';
import { Formik } from 'formik';
import * as Yup from 'yup';
import InputTypePassword from 'src/components/InputTypePassWord';
import CheckPassword from '../../../Auth/components/CheckPassword';
import { validateForm } from '../../components/SignUpForm/validation';
import { massageErrorForm } from 'src/global-constant';
import { useParams } from 'react-router-dom';
import * as actions from 'src/containers/Home/actions';
import { connect } from 'react-redux';

const { requiredMessage } = massageErrorForm;

export const resetPassSchema = Yup.object().shape({
  password: Yup.string().required(requiredMessage),
  confirmPass: Yup.string().required(requiredMessage)
});

const ResetPass = ({ dispatch }) => {
  const { token } = useParams();
  return (
    <div className="CreatePasswordComponent__wrapper">
      <h1>Reset Password</h1>
      <Formik
        initialValues={{
          password: '',
          confirmPass: ''
        }}
        validate={validateForm}
        validationSchema={resetPassSchema}
        onSubmit={values => {
          const params = {
            password: values.password,
            token
          };
          dispatch(actions.resetPasswordAction(params));
        }}
        validateOnChange
      >
        {props => {
          const {
            touched,
            errors,
            values,
            handleSubmit,
            setFieldValue
          } = props;
          return (
            <form className="signupComponent">
              <div className="dyna">
                <div className="myleft">
                  <div className="lida">
                    <label htmlFor="" className="form-label">
                      New Password
                    </label>
                    <InputTypePassword
                      value={values.password}
                      onChange={event => {
                        setFieldValue('password', event.target.value);
                      }}
                      placeholder="Enter Password"
                      className="chai"
                    />
                    {errors.password && touched.password && (
                      <div className="error">{errors.password}</div>
                    )}
                  </div>
                  <div className="lida">
                    <label htmlFor="" className="form-label">
                      Confirm New Password
                    </label>
                    <InputTypePassword
                      value={values.confirmPass}
                      onChange={event => {
                        setFieldValue('confirmPass', event.target.value);
                      }}
                      placeholder="Confirm Password"
                      className="chai"
                    />
                    {errors.confirmPass && touched.confirmPass && (
                      <div className="error">{errors.confirmPass}</div>
                    )}
                  </div>
                </div>
                <div className="myright">
                  <CheckPassword
                    password={values.password}
                    passwordConfirm={values.confirmPass}
                  />
                </div>
              </div>
              <button className="newpassbtn" onClick={handleSubmit}>
                Set a New Password
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(null, mapDispatchToProps)(ResetPass);
