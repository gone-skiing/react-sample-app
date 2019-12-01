import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {initiateLogout} from '../../../store/actions/index';

function Logout(props) {
  const {onLogout} = props;
  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Redirect to="/" />;
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(initiateLogout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
