import React from 'react';
import classes from './Backdrop.module.css';

const backdrop = props => {
  const {clicked, show} = props;

  return show ? (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className={classes.Backdrop} onClick={clicked} onKeyPress={clicked} />
  ) : null;
};

export default backdrop;
