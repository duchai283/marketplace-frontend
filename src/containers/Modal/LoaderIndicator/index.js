import React from 'react';
import './styles.scss';

const LoaderIndicator = () => {
  return (
    <div className="wrapper">
      <div className="spinner">
        <i className="fa fa-spinner fa-pulse" />
      </div>
    </div>
  );
};

export default LoaderIndicator;
