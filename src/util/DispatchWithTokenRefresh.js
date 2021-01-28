import { UserApi } from "../services"

const dispatchWithRefresh = (dispatch, next) => {
  UserApi.refreshToken()
  .then(response => response.data)
  .then(json => {
    console.log(json);
  })
  .catch(error => {
    console.log(error);
  })
}

export const DispatchWithTokenRefresh = {
  dispatchWithRefresh,
}