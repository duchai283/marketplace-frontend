import React, { Component } from 'react';
import { Formik } from 'formik';
import * as modalActions from 'src/containers/Modal/actions';
import './styles.scss';
import InputTypePassword from 'src/components/InputTypePassWord';
import CheckPassword from '../CheckPassword';
import { SignUpSchema, validateForm } from './validation.js';
import { signUpAction } from 'src/containers/Home/actions';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowInvalidMessages: false,
      isInputing: true,
      errors: {}
    };
  }

  closeAuthModal = () => {
    this.props.dispatch(modalActions.hideSignUpModal());
  };

  subscribeOnChange = () => {
    this.setState({
      isSubscribe: !this.state.isSubscribe
    });
  };

  _submitSignupHandler = (values, { setErrors }) => {
    this.setState({ isInputing: false });
    const { errors } = this.state;

    let isValidForm = true;
    Object.keys(errors).forEach(function(key) {
      if (errors[key]) {
        isValidForm = false;
      }
    });
    if (!isValidForm) {
      setErrors(errors);
    } else {
      this.props.dispatch(signUpAction(values));
      this.props.dispatch(modalActions.hideSignUpModal());
    }
  };

  render() {
    return (
      <Formik
        initialValues={{
          password: '',
          email: '',
          confirmPass: ''
        }}
        validate={validateForm}
        validationSchema={SignUpSchema}
        onSubmit={this._submitSignupHandler}
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
              <h1>Sign Up</h1>
              <div className="lida hidedesk">
                <input
                  className="field"
                  type="text"
                  name="email"
                  onChange={event => {
                    this.setState({ isInputing: true });
                    setFieldValue('email', event.target.value);
                  }}
                  placeholder="Email Address"
                  autoComplete="off"
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <div className="error">{errors.email}</div>
                )}
              </div>
              <div className="dyna">
                <div className="myleft">
                  <div className="lida">
                    <InputTypePassword
                      value={values.password}
                      onChange={event => {
                        this.setState({ isInputing: true });
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
                    <InputTypePassword
                      value={values.confirmPass}
                      onChange={event => {
                        this.setState({ isInputing: true });
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
              <button className="signbtn" onClick={handleSubmit}>
                Sign Up
              </button>
            </form>
          );
        }}
      </Formik>
    );
  }
}

export default SignUpForm;
