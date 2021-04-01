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

export const setBackground = (payload) => ({
  type: actionTypes.SET_BACKGROUND,
  payload: payload,
});

export const setActualWeather = (payload) => ({
  type: actionTypes.SET_ACTUAL_WEATHER,
  payload: payload,
});

export const setUrlOptions = (payload) => ({
  type: actionTypes.SET_URL_OPTION,
  payload: payload,
});
