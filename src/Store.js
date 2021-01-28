import { createStore } from "redux";
import { rootReducer } from "./redux";

export const Store = createStore(rootReducer);