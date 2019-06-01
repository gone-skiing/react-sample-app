import React, { Component } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from "react-redux";

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from "./containers/Auth/Logout/Logout";
import {authCheckState} from "./store/actions";

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoLogin();
    }

    render() {

        if (! this.props.isAuthenticated) {
            return (
                <Layout>
                    <Switch>
                        <Route path="/auth" component={Auth}/>
                        <Route path="/" exact component={BurgerBuilder}/>
                        <Redirect to="/"/>
                    </Switch>
                </Layout>
            );
        }

        return (
            <Layout>
                <Switch>
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/orders" component={Orders}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/auth" component={Auth}/>
                    <Route path="/" exact component={BurgerBuilder}/>
                    <Redirect to="/"/>
                </Switch>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoLogin: () => dispatch(authCheckState()),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
