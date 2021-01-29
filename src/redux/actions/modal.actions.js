import { MODAL } from "../constants";

const openModal = payload => ({type: MODAL.OPEN, payload});
const closeModal = () => ({type: MODAL.CLOSE});

export const modalActions = {
  openModal,
  closeModal,
};