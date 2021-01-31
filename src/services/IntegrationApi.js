import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

const getWebhookIntegrations = (projectId, page) => {
  const jwt = localStorage.getItem("access_token");
  return Axios.get(`/api/v1/webhook-integration?project_id=${projectId}&page=${page}`, {
    headers: {
      "Authorization": `Bearer ${jwt}`
    }
  });
}

const createWebhookIntegration = (data) => {
  const jwt = localStorage.getItem("access_token");
  return Axios.post("/api/v1/webhook-integration", data, {
    headers: {
      "Authorization": `Bearer ${jwt}`
    }
  });
}

const getWebhookIntegration = (integrationId) => {
  const jwt = localStorage.getItem("access_token");
  return Axios.get(`/api/v1/webhook-integration/${integrationId}`, {
    headers: {
      "Authorization": `Bearer ${jwt}`
    }
  });
}

const editWebhookIntegration = (integrationId, data) => {
  const jwt = localStorage.getItem("access_token");
  return Axios.patch(`/api/v1/webhook-integration/${integrationId}`, data, {
    headers: {
      "Authorization": `Bearer ${jwt}`
    }
  });
}

const deleteWebhookIntegration = (integrationId) => {
  const jwt = localStorage.getItem("access_token");
  return Axios.delete(`/api/v1/webhook-integration/${integrationId}`, {
    headers: {
      "Authorization": `Bearer ${jwt}`
    }
  });
}

const getWebhookIntegrationMessages = (integrationId, page) => {
  const jwt = localStorage.getItem("access_token");
  return Axios.get(`/api/v1/webhook-integration/${integrationId}/webhook-integration_message?page=${page}`, {
    headers: {
      "Authorization": `Bearer ${jwt}`
    }
  })
}

const getTelegramIntegrations = (projectId, page) => {
  const jwt = localStorage.getItem("access_token");
  return Axios.get(`/api/v1/telegram-integration?project_id=${projectId}&page=${page}`, {
    headers: {
      "Authorization": `Bearer ${jwt}`
    }
  });
}

const createTelegramIntegration = (data) => {
  const jwt = localStorage.getItem("access_token");
  return Axios.post("/api/v1/telegram-integration", data, {
    headers: {
      "Authorization": `Bearer ${jwt}`
    }
  });
}

const getTelegramIntegration = (integrationId) => {
  const jwt = localStorage.getItem("access_token");
  return Axios.get(`/api/v1/telegram-integration/${integrationId}`, {
    headers: {
      "Authorization": `Bearer ${jwt}`
    }
  });
}

const editTelegramIntegration = (integrationId, data) => {
  const jwt = localStorage.getItem("access_token");
  return Axios.patch(`/api/v1/telegram-integration/${integrationId}`, data, {
    headers: {
      "Authorization": `Bearer ${jwt}`
    }
  });
}

const deleteTelegramIntegration = (integrationId) => {
  const jwt = localStorage.getItem("access_token");
  return Axios.delete(`/api/v1/telegram-integration/${integrationId}`, {
    headers: {
      "Authorization": `Bearer ${jwt}`
    }
  });
}

const getTelegramIntegrationMessages = (integrationId, page) => {
  const jwt = localStorage.getItem("access_token");
  return Axios.get(`/api/v1/telegram-integration/${integrationId}/telegram-integration_message?page=${page}`, {
    headers: {
      "Authorization": `Bearer ${jwt}`
    }
  })
}

export const IntegrationApi = {
  getWebhookIntegrations,
  createWebhookIntegration,
  getWebhookIntegration,
  editWebhookIntegration,
  deleteWebhookIntegration,
  getWebhookIntegrationMessages,
  getTelegramIntegrations,
  createTelegramIntegration,
  getTelegramIntegration,
  editTelegramIntegration,
  deleteTelegramIntegration,
  getTelegramIntegrationMessages,
};
