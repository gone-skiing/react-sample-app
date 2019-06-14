import React from 'react';
import classes from './Button.module.css';

const Button = props => {
  const { buttonType, children, clicked, disabled } = props;
  return (
    <button
      type="submit"
      className={[classes.Button, classes[buttonType]].join(' ')}
      onClick={clicked}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
