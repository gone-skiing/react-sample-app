import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { initiateLogout } from '../../../store/actions/index';

class Logout extends Component {
  componentDidMount() {
    const { onLogout } = this.props;
    onLogout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(initiateLogout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
