import axios from "axios";

const jwt = localStorage.getItem('access_token');

const Axios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

const registerUser = ({ username, email, password}) => {
  return Axios.post("/api/v1/user", {
    username,
    email,
    password
  });
}

const authenticate = ({ login, password }) => {
  return Axios.post("/api/v1/authenticate", {
    login,
    password
  })
}

const userExists = (username, email) => {
  return Axios.head(`/api/v1/user/user-exists?username=${username}&email=${email}`);
}

const changePassword = (userId, { current_password, new_password}) => {
  return Axios.put(`/api/v1/user/${userId}/password`, {
    current_password,
    new_password
  }, {
    headers: {
      "Authorization": `Bearer ${jwt}`,
    }
  });
}

const refreshToken = () => {
  return Axios.post("/api/v1/refresh-token");
}

const requestPasswordReset = ({ login }) => {
  return Axios.post("/api/v1/user/password-reset", {
    login,
  });
}

const checkPasswordResetToken = resetTokenId => {
  return Axios.head(`/api/v1/user/password-reset-token/${resetTokenId}`);
}

const setNewPassword = (password_reset_token, {password}) => {
  return Axios.put("/api/v1/user/new-password", {
    password_reset_token,
    new_password: password
  });
}
export const UserApi = {
  registerUser,
  authenticate,
  userExists,
  changePassword,
  refreshToken,
  requestPasswordReset,
  checkPasswordResetToken,
  setNewPassword,
};