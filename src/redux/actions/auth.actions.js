import { AUTH } from '../constants';

const authenticate = jwt => ({ type: AUTH.AUTHENTICATE, payload: {jwt}});
const logout = () => ({ type: AUTH.LOGOUT });

export const authActions = {
  authenticate,
  logout,
};