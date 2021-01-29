import { PROJECT } from "../constants/project.constants";

const initialState = {
  count: 0,
  page: 1,
  items: [],
  currentProject: null,
}

export const projectReducer = (state = initialState, {type, payload}) => {
  switch(type) {
    case PROJECT.LIST_RECEIVED:
      return {
        ...state,
        count: payload.count,
        page: payload.page,
        items: payload.items
      };
    case PROJECT.PROJECT_RECEIVED:
      return {
        ...state,
        currentProject: payload,
      };
    case PROJECT.PROJECT_UPDATED:
      const project = state.project;
      return {
        ...state,
        currentProject: {
          ...project,
          description: payload.description
        }
      };
    case PROJECT.ERASE_PROJECTS:
      return initialState;
    default:
      return state;
  }
};