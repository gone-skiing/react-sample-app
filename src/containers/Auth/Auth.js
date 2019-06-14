import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

import classes from './Auth.module.css';

import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { checkValidity, updateObject } from '../../shared/utility';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: false
  };

  componentDidMount() {
    const {
      authRedirectPath,
      buildingBurger,
      onSetAuthRedirectPath
    } = this.props;

    if (!buildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, controlName) => {
    const { controls } = this.state;
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        touched: true,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation
        )
      })
    });

    this.setState({ controls: updatedControls });
  };

  submitHandler = event => {
    const { controls, isSignup } = this.state;
    const { onAuth } = this.props;

    event.preventDefault();
    onAuth(controls.email.value, controls.password.value, isSignup);
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    const { controls, isSignup } = this.state;
    const { authRedirectPath, error, isAuthenticated, loading } = this.props;

    const formElements = [];
    Object.keys(controls).forEach(key => {
      formElements.push({
        id: key,
        config: controls[key]
      });
    });

    let form = formElements.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={event => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    if (loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (error) {
      errorMessage = <p>{error.message}</p>;
    }

    let authRedirect;
    if (isAuthenticated) {
      authRedirect = <Redirect to={authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button buttonType="Success">
            {!isSignup ? 'SIGN IN' : 'SIGN UP'}
          </Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} buttonType="Danger">
          SWITCH TO {isSignup ? 'SIGN IN' : 'SIGN UP'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
};

// noinspection JSUnusedGlobalSymbols
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
