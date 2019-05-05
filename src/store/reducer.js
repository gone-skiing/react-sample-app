import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.3,
    meat: 1.3
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const priceAddition = INGREDIENT_PRICES[action.ingredientName];
            const oldPrice = state.totalPrice;
            const newPrice = oldPrice + priceAddition;
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: newPrice
            }
        case actionTypes.REMOVE_INGREDIENT: {
            const oldCount = state.ingredients[action.ingredientName];
            if (oldCount <= 0) {
                return;
            }

            const newCount = oldCount - 1;

            const priceDeduction = INGREDIENT_PRICES[action.ingredientName];
            const oldPrice = state.totalPrice;
            const newPrice = oldPrice - priceDeduction;

            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: newCount
                },
                totalPrice: newPrice
            }
        }
        default:
            return state;
    }
};

export default reducer;