import React from 'react';
import classes from './Toolbar.module.css';

import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = props => {
  const { drawerToggleClicked, isAuthenticated } = props;

  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={drawerToggleClicked} />

      <div className={classes.Logo}>
        <Logo />
      </div>

      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={isAuthenticated} />
      </nav>
    </header>
  );
};

export default toolbar;
