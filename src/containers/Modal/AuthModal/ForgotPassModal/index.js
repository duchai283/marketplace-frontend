import React, { useEffect } from 'react';
import './styles.scss';
import { hideForgotPassModal, showLoginModal } from '../../actions';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as actions from 'src/containers/Home/actions';
// import * as modalActions from 'src/containers/Modal/actions';
import { makeSelectMessageEmail } from 'src/containers/Home/selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { massageErrorForm } from 'src/global-constant';
const { requiredMessage, invalidEmailWithEx } = massageErrorForm;

const EmailSchema = Yup.object().shape({
  email: Yup.string()
    .email(invalidEmailWithEx)
    .required(requiredMessage)
});

const ForgotPassModal = ({ dispatch, messageEmail }) => {
  const handleCloseModal = () => {
    dispatch(hideForgotPassModal());
  };

  const handleBackToLogin = () => {
    dispatch(hideForgotPassModal());
    dispatch(showLoginModal());
  };

  useEffect(() => {
    if (messageEmail) {
      setTimeout(() => {
        dispatch(actions.sendEmailActionSuccess(''));
      }, 10000);
    }
  }, [messageEmail, dispatch]);

  return (
    <div>
      <div className="base" onClick={handleCloseModal}></div>
      <div className="forgot_modal">
        <div className="title">Forgot Your Password?</div>
        {messageEmail && (
          <div className="bg-block-success">
            <span className="success-wrap">
              <i className="fa fa-check-circle icon-success"></i>
            </span>
            <span className="message-succes">
              If there is an account associated with {messageEmail} you will
              receive an email with a link to reset your password.
            </span>
          </div>
        )}
        <div className="desc">
          Simply enter your email address you registered with and we will send
          the instructions to you
        </div>
        <Formik
          initialValues={{
            email: ''
          }}
          validationSchema={EmailSchema}
          onSubmit={values => {
            console.log('values', values);
            dispatch(actions.sendEmailAction(values));
          }}
        >
          {({ touched, errors, values, handleChange, handleSubmit }) => (
            <form className="loginComponent">
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
              <button className="loginbtn mt-3" onClick={handleSubmit}>
                SEND EMAIL
              </button>
              <h3 className="forgotpass" onClick={handleBackToLogin}>
                Back To Log in
              </h3>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  messageEmail: makeSelectMessageEmail()
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassModal);
