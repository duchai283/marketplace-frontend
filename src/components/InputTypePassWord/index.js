import React, { useState } from 'react';
import './styles.scss';

const InputTypePassword = ({
  onChange,
  placeholder,
  value,
  name = '',
  className = ''
}) => {
  const [show, setShow] = useState(false);
  const handleOnclick = () => {
    setShow(!show);
  };
  const type = !show ? 'password' : 'text';
  return (
    <div className={'inputTypePasswordComponent ' + className}>
      <input
        className={'field '}
        type={type}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        autoComplete="off"
      />
      <span className="tap" onClick={handleOnclick}>
        {show && <i className="fa fa-eye"></i>}
        {!show && <i className="fa fa-eye-slash"></i>}
      </span>
    </div>
  );
};
export default InputTypePassword;
