import { JwtDecoder, TimestampParser } from "../../util";
import { AUTH } from "../constants";

const jwt = localStorage.getItem('access_token');

const initialState = {};

if(jwt) {
  const jwtPayload = JwtDecoder.decode(jwt);
  initialState.isAuthenticated = true;
  initialState.token = {
    jwt,
    expiries: TimestampParser.toDate(jwtPayload.exp),
  };
  initialState.user = {
    id: jwtPayload.payload.user_id,
    username: jwtPayload.sub,
    roles: jwtPayload.payload.roles,
  }
}
else {
  initialState.isAuthenticated = false;
}

export const authReducer = (state = initialState, {type, payload}) => {
  switch(type) {
    case AUTH.AUTHENTICATE:
      localStorage.setItem('access_token', payload.jwt);
      const jwtPayload = JwtDecoder.decode(payload.jwt);
      return {
        isAuthenticated: true,
        token: {
          jwt,
          expiries: TimestampParser.toDate(jwtPayload.exp),
        },
        user: {
          id: jwtPayload.payload.user_id,
          username: jwtPayload.sub,
          roles: jwtPayload.payload.roles,
        }
      }
    case AUTH.LOGOUT:
      localStorage.removeItem('access_token');
      return {
        isAuthenticated: false,
      };
    default:
      return state;
  }
}