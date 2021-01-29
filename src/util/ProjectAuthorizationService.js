const isProjectOwner = (user, project) => {
  return project.project_owner.username === user.username;
}

export const ProjectAuthorizationService = {
  isProjectOwner,
};