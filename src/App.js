import React, {useEffect, Suspense} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import {authCheckState} from './store/actions';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

function App(props) {
  const {isAuthenticated, onTryAutoLogin} = props;

  useEffect(() => {
    onTryAutoLogin();
  }, [onTryAutoLogin]);

  let routes = (
    <Switch>
      <Route path="/auth" render={() => <Auth />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route
          path="/checkout"
          render={renderProps => {
            const {history, match} = renderProps;
            return <Checkout history={history} match={match} />;
          }}
        />
        <Route
          path="/orders"
          render={renderProps => {
            const {history, match} = renderProps;
            return <Orders history={history} match={match} />;
          }}
        />
        <Route path="/logout" component={Logout} />
        <Route
          path="/auth"
          render={renderProps => {
            const {history, match} = renderProps;
            return <Auth history={history} match={match} />;
          }}
        />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Layout>
      <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
    </Layout>
  );
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onTryAutoLogin: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
