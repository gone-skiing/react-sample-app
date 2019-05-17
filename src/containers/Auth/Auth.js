import React, {Component} from 'react';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

import classes from './Auth.module.css';

import * as actions from '../../store/actions/index';
import {connect} from "react-redux";

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
        isSignup: true
    };

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls
        };

        const updatedFormElement = {
            ...updatedControls[controlName]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = Auth.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedControls[controlName] = updatedFormElement;

        this.setState({controls: updatedControls});
    };

    static checkValidity(value, rules) {
        if (! rules) {
            return true;
        }

        let isValid = true;
        if (rules.required && isValid) {
            isValid = value.trim() !== '';
        }

        if (rules.minLength && isValid) {
            isValid = value.trim().length >= rules.minLength;
        }

        if (rules.maxLength && isValid) {
            isValid = value.trim().length <= rules.maxLength;
        }

        if (rules.isEmail && isValid) {
            isValid = /\S+@\S+\.\S+/.test(value);
        }

        return isValid;
    }

    submitHandler = event => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    };

    switchAuthModeHander = () => {
        this.setState(prevState => {
            return {isSignup: ! prevState.isSignup}
        });
    };

    render() {
        let formElements = [];
        for (let key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElements.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                )
        );

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button buttonType="Success">{! this.state.isSignup ? "SIGN IN" : "SIGN UP" }</Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHander}
                    buttonType="Danger">
                    SWITCH TO {this.state.isSignup ? "SIGN IN" : "SIGN UP" }</Button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
};

export default connect(null, mapDispatchToProps)(Auth);