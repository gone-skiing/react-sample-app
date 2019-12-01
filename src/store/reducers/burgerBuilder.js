import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.3,
  meat: 1.3,
};

const addRemoveIngredient = (state, ingredientName, increment) => {
  const newCount = state.ingredients[ingredientName] + increment;
  if (newCount < 0) {
    return state;
  }

  const updatedIngredient = {[ingredientName]: newCount};
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);

  const priceChange = INGREDIENT_PRICES[ingredientName] * increment;
  const newPrice = state.totalPrice + priceChange;

  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: newPrice,
    building: true,
  };

  return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: 4,
    error: false,
    building: false,
  });
};

const burgerBuilder = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addRemoveIngredient(state, action.ingredientName, 1);
    case actionTypes.REMOVE_INGREDIENT:
      return addRemoveIngredient(state, action.ingredientName, -1);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, {error: true});
    default:
      return state;
  }
};

export default burgerBuilder;
