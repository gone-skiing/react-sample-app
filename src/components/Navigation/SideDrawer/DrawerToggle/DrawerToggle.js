import React from 'react';
import classes from './DrawerToggle.module.css';

const drawerToggle = props => {
  const { clicked } = props;
  return (
    <div
      role="link"
      tabIndex={0}
      onClick={clicked}
      onKeyPress={clicked}
      className={classes.DrawerToggle}
    >
      <div />
      <div />
      <div />
    </div>
  );
};

export default drawerToggle;
