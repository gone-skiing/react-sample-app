import reducer, { initialState } from './auth';

import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

describe('auth reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should store token on login', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.AUTH_SUCCESS,
        idToken: 'some-token',
        userId: 'some-userId'
      })
    ).toEqual(
      updateObject(initialState, {
        token: 'some-token',
        userId: 'some-userId'
      })
    );
  });
});
