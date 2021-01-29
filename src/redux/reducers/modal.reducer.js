import { MODAL } from "../constants";

const initialState = {shown: false};

export const modalReducer = (state = initialState, {type, payload}) => {
  switch(type) {
    case MODAL.OPEN:
      return {
        shown: true,
        onConfirm: payload.onConfirm,
        onCancel: payload.onCancel,
        title: payload.title,
        description: payload.description,
      }
    case MODAL.CLOSE:
      return {
        shown: false,
      }
    default:
      return state;
  }
}