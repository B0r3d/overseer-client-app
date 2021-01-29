import { ERROR } from "../constants"

const initialState = {
  page: 1,
  count: 0,
  items: [],
  currentError: null,
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
    default:
      return state;
  }
}