import { ERROR } from "../constants"

const initialState = {
  page: 1,
  count: 0,
  items: [],
  currentError: null,
  chartData: [],
}

export const errorReducer = (state = initialState, {type, payload}) => {
  switch(type) {
    case ERROR.LIST_RECEIVED:
      return {
        ...state,
        page: payload.page,
        count: payload.count,
        items: payload.items,
      };
    case ERROR.CHART_DATA_RECEIVED:
      return {
        ...state,
        chartData: payload,
      };
    case ERROR.ERROR_RECEIVED:
      return {
        ...state,
        currentError: payload,
      }
    default:
      return state;
  }
}