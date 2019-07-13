import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { checkValidity, updateObject } from '../../../shared/utility';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: 'fastest',
        validation: {},
        valid: false,
        touched: false
      }
    },
    formIsValid: false
  };

  orderHandler = event => {
    const { orderForm } = this.state;
    const { ingredients, onOrderBurger, price, token, userId } = this.props;

    event.preventDefault();

    const formData = {};
    Object.keys(orderForm).forEach(formElementIdentifier => {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    });

    const order = {
      ingredients,
      price,
      orderData: formData,
      userId
    };

    onOrderBurger(order, token);
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const { orderForm } = this.state;
    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      touched: true,
      valid: checkValidity(
        event.target.value,
        orderForm[inputIdentifier].validation
      )
    });

    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;

    Object.keys(updatedOrderForm).forEach(inputId => {
      formIsValid = updatedOrderForm[inputId].valid && formIsValid;
    });

    this.setState({ orderForm: updatedOrderForm, formIsValid });
  };

  render() {
    const formElements = [];
    const { formIsValid, orderForm } = this.state;
    const { loading } = this.props;

    Object.keys(orderForm).forEach(key => {
      formElements.push({
        id: key,
        config: orderForm[key]
      });
    });

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements.map(formElement => (
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
        ))}
        <Button buttonType="Success" disabled={!formIsValid}>
          ORDER
        </Button>
      </form>
    );

    if (loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
