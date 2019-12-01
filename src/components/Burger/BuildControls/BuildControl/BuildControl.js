import React from 'react';
import classes from './BuildControl.module.css';

const buildControl = props => {
  const {added, disabled, label, removed} = props;
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{label}</div>
      <button
        type="submit"
        className={classes.Less}
        onClick={removed}
        disabled={disabled}
      >
        Less
      </button>
      <button type="submit" className={classes.More} onClick={added}>
        More
      </button>
    </div>
  );
};

export default buildControl;
