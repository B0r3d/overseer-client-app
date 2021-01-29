import { PROJECT } from "../constants";

const receiveProjects = payload => ({type: PROJECT.LIST_RECEIVED, payload});
const receiveProject = payload => ({type: PROJECT.PROJECT_RECEIVED, payload});
const projectUpdated = payload => ({type: PROJECT.PROJECT_UPDATED, payload});
const eraseProjects = () => ({type: PROJECT.ERASE_PROJECTS});

export const projectActions = {
  receiveProjects,
  receiveProject,
  projectUpdated,
  eraseProjects,
}