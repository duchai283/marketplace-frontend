import classnames from 'classnames';
import React from 'react';
import './styles.scss';

export default class CheckPassword extends React.Component {
  static defaultProps = {
    password: '',
    passwordConfirm: '',
    className: ''
  };
  state = {
    password: '',
    passwordConfirm: '',
    match: false,
    passwordLength: false,
    containNumber: false,
    containUppercase: false,
    containLowecase: false
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.password !== this.props.password ||
      prevProps.passwordConfirm !== this.props.passwordConfirm
    ) {
      let { password, passwordConfirm } = this.props;
      this.checkPassword(password, passwordConfirm);
    }
  }
  checkPassword = (password, passwordConfirm) => {
    // /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
    this.setState({
      passwordLength: password.length >= 8,
      match: password === passwordConfirm,
      containNumber: /\d/.test(password),
      containUppercase: /[A-Z]/.test(password),
      containLowecase: /[a-z]/.test(password)
    });
  };
  render() {
    const containLowecase = classnames('fa fa-check-circle mycircle', {
      activeGreen: this.state.containLowecase
    });
    const match = classnames('fa fa-check-circle mycircle', {
      activeGreen: this.state.match
    });
    const containUppercase = classnames('fa fa-check-circle mycircle', {
      activeGreen: this.state.containUppercase
    });
    const passwordLength = classnames('fa fa-check-circle mycircle', {
      activeGreen: this.state.passwordLength
    });
    const containNumber = classnames('fa fa-check-circle mycircle', {
      activeGreen: this.state.containNumber
    });
    return (
      <div className={'checkPasswordComponent ' + this.props.className}>
        <div className="mth hidemob">Password check</div>
        <hr className="hidemob" />
        <div>
          <i className={containUppercase} />
          <span>Min. One uppercase</span>
        </div>
        <div>
          <i className={containLowecase} />
          <span>Min. One lowercase</span>
        </div>
        <div>
          <i className={containNumber} />
          <span>At least One number</span>
        </div>
        <div>
          <i className={passwordLength} />
          <span>Eight or more characters</span>
        </div>
        <div>
          <i className={match} />
          <span>Passwords match</span>
        </div>
      </div>
    );
  }
}
