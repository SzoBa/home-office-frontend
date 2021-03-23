import * as actionTypes from "./actionTypes";

export const login = (payload) => ({
  type: actionTypes.LOGIN,
  payload: payload,
});

export const logout = (payload) => ({
  type: actionTypes.LOGOUT,
  payload: payload,
});

export const setLocation = (payload) => ({
  type: actionTypes.SET_LOCATION,
  payload: payload,
});
