import { ALERT_CONSTANTS } from "../constants";

const initialSate = {};

export const alertReducer = (state = initialSate, {type, payload}) => {
  switch(type) {
    case ALERT_CONSTANTS.SUCCESS:
      return {
        type: ALERT_CONSTANTS.SUCCESS,
        message: payload
      }
    case ALERT_CONSTANTS.WARNING:
      return {
        type: ALERT_CONSTANTS.WARNING,
        message: payload
      }
    case ALERT_CONSTANTS.ERROR:
      return {
        type: ALERT_CONSTANTS.ERROR,
        message: payload
      }
    case ALERT_CONSTANTS.CLEAR:
      return {}
    default:
      return state;
  }
}