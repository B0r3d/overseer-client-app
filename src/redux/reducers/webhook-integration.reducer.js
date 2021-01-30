import { WEBHOOK_INTEGRATION } from "../constants"

const initialState = {
  page: 1,
  count: 0,
  items: [],
  currentIntegration: null,
}

export const webhookIntegrationReducer = (state = initialState, {type, payload}) => {
  switch(type) {
    case WEBHOOK_INTEGRATION.LIST_RECEIVED:
      return {
        ...state,
        page: payload.page,
        count: payload.count,
        items: payload.items,
      }
    case WEBHOOK_INTEGRATION.INTEGRATION_RECEIVED:
      return {
        ...state,
        currentIntegration: payload,
      };
    default:
      return state;
  }
}