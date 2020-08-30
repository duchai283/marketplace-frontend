import React from 'react';
import './styles.scss';
import { hideLoginModal } from '../../actions';
import LoginForm from 'src/containers/Auth/components/LoginForm';

const LoginModal = ({ dispatch, showLoginModal }) => {
  const handleCloseModal = () => {
    dispatch(hideLoginModal());
  };
  return (
    <div>
      <div className="base" onClick={handleCloseModal}></div>
      <div className={`login_modal ${showLoginModal ? 'show' : ''}`}>
        <LoginForm dispatch={dispatch} />
      </div>
    </div>
  );
};

export default LoginModal;
