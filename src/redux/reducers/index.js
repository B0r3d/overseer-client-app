import { combineReducers } from "redux";

import { authReducer } from './auth.reducer';
import { alertReducer } from './alert.reducer';
import { projectReducer } from "./project.reducer";
import { modalReducer } from "./modal.reducer";
import { AUTH } from "../constants";
import { errorReducer } from "./error.reducer";
import { webhookIntegrationReducer } from "./webhook-integration.reducer";

const appReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  projects: projectReducer,
  modal: modalReducer,
  errors: errorReducer,
  webhookIntegrations: webhookIntegrationReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === AUTH.LOGOUT) {
    state = undefined
  }

  return appReducer(state, action)
}