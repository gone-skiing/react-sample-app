import { call, delay, put } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions';

/* eslint-disable-next-line no-unused-vars */
export function* logoutSaga(action) {
  yield call([localStorage, 'removeItem'], 'token');
  yield call([localStorage, 'removeItem'], 'expirationDate');
  yield call([localStorage, 'removeItem'], 'userId');
  yield put(actions.logoutSucceeded());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime);
  yield put(actions.initiateLogout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());

  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };

  let method = 'signupNewUser';
  if (!action.isSignup) {
    method = 'verifyPassword';
  }

  const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/${method}?key=${process.env.REACT_APP_API_KEY}`;
  try {
    const response = yield axios.post(url, authData);

    localStorage.setItem('userId', response.data.localId);
    localStorage.setItem('token', response.data.idToken);
    const expirationDate = new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    localStorage.setItem('expirationDate', expirationDate.toString());

    yield put(actions.authSuccess(response.data.idToken, response.data.userId));
    yield put(actions.checkAuthTimeout(response.data.expiresIn * 1000));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* authCheckStateSaga() {
  const token = yield localStorage.getItem('token');
  if (!token) {
    yield put(actions.initiateLogout());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    const currentDate = new Date();

    if (expirationDate > currentDate) {
      const userId = localStorage.getItem('userId');
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthTimeout(
          expirationDate.getTime() - new Date().getTime()
        )
      );
    } else {
      yield put(actions.initiateLogout());
    }
  }
}
