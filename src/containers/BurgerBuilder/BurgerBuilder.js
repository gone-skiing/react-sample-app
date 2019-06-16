import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';

import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

export class BurgerBuilderComponent extends Component {
  static canBePurchased(ingredients) {
    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((result, el) => result + el, 0);

    return sum > 0;
  }

  state = {
    purchasing: false
  };

  componentDidMount() {
    const { onInitIngredients } = this.props;
    onInitIngredients();
  }

  purchaseHandler = () => {
    const { history, isAuthenticated, onSetAuthRedirectPath } = this.props;

    if (isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      onSetAuthRedirectPath('/checkout');
      history.push('/auth');
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const { history, onInitPurchase } = this.props;
    onInitPurchase();
    history.push('/checkout');
  };

  render() {
    const { purchasing } = this.state;
    const {
      error,
      ingredients,
      isAuthenticated,
      onIngredientAdded,
      onIngredientRemoved,
      price
    } = this.props;

    const disabledInfo = {
      ...ingredients
    };

    Object.keys(disabledInfo).forEach(key => {
      disabledInfo[key] = disabledInfo[key] <= 0;
    });

    let orderSummary = null;
    let burger = error ? <p>Ingredients can not be loaded.</p> : <Spinner />;

    if (ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={ingredients}
          price={price}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );

      burger = (
        <Aux>
          <Burger ingredients={ingredients} />

          <BuildControls
            price={price}
            purchaseable={BurgerBuilderComponent.canBePurchased(ingredients)}
            disabled={disabledInfo}
            ingredientAdded={onIngredientAdded}
            ingredientRemoved={onIngredientRemoved}
            ordered={this.purchaseHandler}
            isAuthenticated={isAuthenticated}
          />
        </Aux>
      );
    }

    return (
      <Aux>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>

        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};

// noinspection JSUnusedGlobalSymbols
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilderComponent, axios));
