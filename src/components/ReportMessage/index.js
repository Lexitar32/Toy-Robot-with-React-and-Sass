import './index.scss';
import React from 'react';

const Alert = ({
  text
}) => {
  return (
    <div className="alert__text" role="alert">
      {text}
    </div>
  );
};


export default Alert;