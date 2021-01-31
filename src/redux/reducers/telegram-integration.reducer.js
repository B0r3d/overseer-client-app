import { TELEGRAM_INTEGRATION } from "../constants"

const initialState = {
  page: 1,
  count: 0,
  items: [],
  currentIntegration: null,
}

export const telegramIntegrationReducer = (state = initialState, {type, payload}) => {
  switch(type) {
    case TELEGRAM_INTEGRATION.LIST_RECEIVED:
      return {
        ...state,
        page: payload.page,
        count: payload.count,
        items: payload.items,
      }
    case TELEGRAM_INTEGRATION.INTEGRATION_RECEIVED:
      return {
        ...state,
        currentIntegration: payload,
      };
    default:
      return state;
  }
}