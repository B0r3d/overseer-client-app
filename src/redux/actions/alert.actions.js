import { ALERT_CONSTANTS } from "../constants";

const successAlert = message => ({ type: ALERT_CONSTANTS.SUCCESS, payload: message });
const warningAlert = message => ({ type: ALERT_CONSTANTS.WARNING, payload: message });
const errorAlert = message => ({ type: ALERT_CONSTANTS.ERROR, payload: message });
const clearAlerts = () => ({ type: ALERT_CONSTANTS.CLEAR, payload: {} });

export const alertActions = {
  successAlert,
  warningAlert,
  errorAlert,
  clearAlerts,
}