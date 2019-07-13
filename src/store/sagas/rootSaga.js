import { all, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  authCheckStateSaga,
  authUserSaga,
  checkAuthTimeoutSaga,
  logoutSaga
} from './auth';
import { fetchOrdersSaga, purchaseBurgerSaga } from './order';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
  ]);
}

export function* watchOrder() {
  yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}
