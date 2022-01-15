import './index.scss';
import React from 'react';

const Button = ({
  value,
  label,
  onClick
}) => {
  return (
    <button
      className="button"
      value={value}
      aria-label={label}
      onClick={(e) => onClick(e)}>
      {label}
    </button>
  );
};


export default Button;