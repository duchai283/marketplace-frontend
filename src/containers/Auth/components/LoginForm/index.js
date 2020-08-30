import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import InputTypePassword from 'src/components/InputTypePassWord';
import './styles.scss';
import * as actions from 'src/containers/Home/actions';
import * as modalActions from 'src/containers/Modal/actions';
import { massageErrorForm } from 'src/global-constant';
const { requiredMessage, invalidEmailWithEx } = massageErrorForm;

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email(invalidEmailWithEx)
    .required(requiredMessage),
  password: Yup.string().required(requiredMessage)
});

const LoginForm = ({ dispatch }) => {
  const handleForgotPass = () => {
    dispatch(modalActions.hideLoginModal());
    dispatch(modalActions.showForgotPassModal());
  };
  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={LoginSchema}
      onSubmit={(values, formik) => {
        dispatch(actions.loginAction(values));
        dispatch(modalActions.hideLoginModal());
      }}
    >
      {({ touched, dirty, errors, values, handleChange, handleSubmit }) => (
        <form className="loginComponent">
          <h1>Login </h1>
          <div className="lida">
            <input
              className="field"
              type="text"
              name="email"
              onChange={handleChange('email')}
              placeholder="Email Address"
              autoComplete="off"
              value={values.email}
            />
            {errors.email && touched.email && (
              <div className="error">{errors.email}</div>
            )}
          </div>
          <div className="lida">
            <InputTypePassword
              onChange={handleChange('password')}
              placeholder="Enter Password"
              value={values.password}
            />
            {errors.password && touched.password && (
              <div className="error">{errors.password}</div>
            )}
          </div>
          <h3 className="forgotpass" onClick={handleForgotPass}>
            FORGOT PASSWORD?
          </h3>
          <button className="loginbtn" onClick={handleSubmit}>
            Log In
          </button>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
