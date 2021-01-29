import { combineReducers } from "redux";

import { authReducer } from './auth.reducer';
import { alertReducer } from './alert.reducer';
import { projectReducer } from "./project.reducer";
import { modalReducer } from "./modal.reducer";
import { AUTH } from "../constants";

const appReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  projects: projectReducer,
  modal: modalReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === AUTH.LOGOUT) {
    state = undefined
  }

  return appReducer(state, action)
}