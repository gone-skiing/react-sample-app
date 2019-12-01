/* eslint-disable */
const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const initialState = {
  counter: 0,
};

// Reducer
const rootReducer = (state = initialState, action) => {
  if (action.type === 'INC_COUNTER') {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }

  if (action.type === 'ADD_COUNTER') {
    return {
      ...state,
      counter: state.counter + action.value,
    };
  }
  return state;
};

const logger = store => {
  return next => {
    return action => {
      console.log('Middleware Dispatching', action);
      const result = next(action);
      console.log('Middleware next state', store.getState());
      return result;
    };
  };
};

// Store
const store = createStore(rootReducer, applyMiddleware(logger));

console.log(store.getState());

// Subscription
store.subscribe(() => {
  console.log('Subscription: ', store.getState());
});

// Dispatching
store.dispatch({type: 'INC_COUNTER'});
store.dispatch({type: 'ADD_COUNTER', value: 10});

console.log(store.getState());
