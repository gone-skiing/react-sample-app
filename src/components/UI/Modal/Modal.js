import React from 'react';
import classes from './Modal.module.css';

import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

function Modal(props) {
  // eslint-disable-next-line no-unused-vars
  /*
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const { children, show } = this.props;

    return nextProps.show !== show || nextProps.children !== children;
  }
   */

  const { children, modalClosed, show } = props;
  return (
    <Aux>
      <Backdrop show={show} clicked={modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: show ? 'translateY(0)' : 'translateY(-100vh',
          opacity: show ? '1' : '0'
        }}
      >
        {children}
      </div>
    </Aux>
  );
}

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
