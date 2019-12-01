import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

import classes from './SideDrawer.module.css';

const sideDrawer = props => {
  const {closed, isAuthenticated, open} = props;

  const attachedClasses = [classes.SideDrawer, classes.Close];
  if (open) {
    attachedClasses[1] = [classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={open} clicked={closed} />

      <div
        className={attachedClasses.join(' ')}
        onClick={closed}
        role="button"
        tabIndex={0}
        onKeyPress={closed}
      >
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={isAuthenticated} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
