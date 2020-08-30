import React from 'react';
import './styles.scss';

const Button = ({ text, onClick, style }) => {
  return (
    <button className="btn btn__primary" onClick={onClick} style={{ ...style }}>
      {text}
    </button>
  );
};

export default Button;
