import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

const createProject = ({ project_title, project_description }) => {
  const jwt = localStorage.getItem("access_token");
  return Axios.post("/api/v1/project", {
    project_title,
    project_description
  }, {
    headers: {
      "Authorization": `Bearer ${jwt}`,
    }
  });
}

const getProjects = () => {
  const jwt = localStorage.getItem("access_token");
  return Axios.get("/api/v1/project", {
    headers: {
      "Authorization": `Bearer ${jwt}`
    }
  })
}

const getProject = projectId => {
  const jwt = localStorage.getItem("access_token");
  return Axios.get(`/api/v1/project/${projectId}`, {
    headers: {
      "Authorization": `Bearer ${jwt}`
    }
  });
}

const updateProject = (projectId, { project_description }) => {
  const jwt = localStorage.getItem("access_token");
  return Axios.patch(`/api/v1/project/${projectId}`, {
    project_description,
  }, {
    headers: {
      "Authorization": `Bearer ${jwt}`
    }
  });
}

const inviteNewMember = (projectId, username, email) => {
  const jwt = localStorage.getItem("access_token");
  return Axios.post(`/api/v1/project/${projectId}/project-member-invitation`, {
    username,
    email,
  }, {
    headers: {
      "Authorization": `Bearer ${jwt}`
    }
  });
}

const cancelInvitation = (projectId, invitationId) => {
  const jwt = localStorage.getItem("access_token");
  return Axios.delete(`/api/v1/project/${projectId}/project-member-invitation/${invitationId}`, {
    headers: {
      "Authorization": `Bearer ${jwt}`
    }
  });
}

const acceptInvitation = (projectId, invitationId) => {
  const jwt = localStorage.getItem("access_token");
  return Axios.put(`/api/v1/project/${projectId}/project-member-invitation/${invitationId}/accept`, {}, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });
}

const declineInvitation = (projectId, invitationId) => {
  const jwt = localStorage.getItem("access_token");
  return Axios.put(`/api/v1/project/${projectId}/project-member-invitation/${invitationId}/decline`, {}, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });
}

const removeProjectMemeber = (projectId, memberId) => {
  const jwt = localStorage.getItem("access_token");
  return Axios.delete(`/api/v1/project/${projectId}/project-member/${memberId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });
}

const createApiKey = (projectId, expirationDateTimestamp) => {
  const jwt = localStorage.getItem("access_token");
  return Axios.post(`/api/v1/project/${projectId}/api-key`, {
    expiry_date: expirationDateTimestamp,
  }, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });
}

const deleteApiKey = (projectId, apiKeyId) => {
  const jwt = localStorage.getItem("access_token");
  return Axios.delete(`/api/v1/project/${projectId}/api-key/${apiKeyId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });
}

const deleteProject = projectId => {
  const jwt = localStorage.getItem("access_token");
  return Axios.delete(`/api/v1/project/${projectId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });
}

const getErrors = (projectId, {page, search, date_from, date_to}) => {
  const jwt = localStorage.getItem("access_token");
  return Axios.get(`/api/v1/project/${projectId}/errors?page=${page}&search=${search}&date_from=${date_from}&date_to=${date_to}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
}

export const ProjectApi = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  inviteNewMember,
  cancelInvitation,
  acceptInvitation,
  declineInvitation,
  removeProjectMemeber,
  createApiKey,
  deleteApiKey,
  deleteProject,
  getErrors,
}