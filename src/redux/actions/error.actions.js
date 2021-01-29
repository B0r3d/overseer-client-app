import { ERROR } from '../constants';

const receiveErrors = payload => ({ type: ERROR.LIST_RECEIVED, payload});

export const errorActions = {
  receiveErrors,
}