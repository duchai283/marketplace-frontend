import React from 'react';
import './styles.scss';
import { hideSignUpModal } from '../../actions';
import SignUpForm from 'src/containers/Auth/components/SignUpForm';

const SignUpModal = ({ dispatch }) => {
  const handleCloseModal = () => {
    dispatch(hideSignUpModal());
  };
  return (
    <div>
      <div className="base" onClick={handleCloseModal}></div>
      <div className={`login_modal`}>
        <SignUpForm dispatch={dispatch} />
      </div>
    </div>
  );
};

export default SignUpModal;
