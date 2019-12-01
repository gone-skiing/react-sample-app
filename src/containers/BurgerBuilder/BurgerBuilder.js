import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';

import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

function canBePurchased(ingredients) {
  const sum = Object.keys(ingredients)
    .map(key => {
      return ingredients[key];
    })
    .reduce((result, el) => result + el, 0);

  return sum > 0;
}

function BurgerBuilderComponent(props) {
  const {
    error,
    history,
    ingredients,
    isAuthenticated,
    onIngredientAdded,
    onIngredientRemoved,
    onInitIngredients,
    onInitPurchase,
    onSetAuthRedirectPath,
    price,
  } = props;

  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    history.push('/checkout');
  };

  const disabledInfo = {
    ...ingredients,
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
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    );

    burger = (
      <Aux>
        <Burger ingredients={ingredients} />

        <BuildControls
          price={price}
          purchaseable={canBePurchased(ingredients)}
          disabled={disabledInfo}
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          ordered={purchaseHandler}
          isAuthenticated={isAuthenticated}
        />
      </Aux>
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>

      {burger}
    </Aux>
  );
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(BurgerBuilderComponent, axios));
