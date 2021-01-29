import { ERROR } from '../constants';

const receiveErrors = payload => ({ type: ERROR.LIST_RECEIVED, payload});
const receiveChartData = payload=> ({ type: ERROR.CHART_DATA_RECEIVED, payload});
const receiveError = payload => ({ type: ERROR.ERROR_RECEIVED, payload});

export const errorActions = {
  receiveErrors,
  receiveChartData,
  receiveError,
}