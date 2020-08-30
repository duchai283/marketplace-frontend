import React from 'react';
import { toast } from 'react-toastify';
import './notification.styles.scss';

export const showError = message => {
  const toastOptions = {
    position: 'top-right',
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: `toast-container`
  };
  // toast.error(msg, toastOptions);
  toast.error(<ToastContainer message={message} />, toastOptions);
};

export const showSuccess = message => {
  const toastOptions = {
    position: 'top-right',
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: `toast-container`
  };
  // toast.success(msg, toastOptions);
  toast.success(<ToastContainer message={message} />, toastOptions);
};

function ToastContainer(props) {
  const { message } = props;
  return (
    <>
      <span className="message">{message}</span>
    </>
  );
}
