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

export const writeEmail = (payload) => ({
  type: actionTypes.WRITE_EMAIL,
  payload: payload,
});

export const readEmail = (payload) => ({
  type: actionTypes.READ_EMAIL,
  payload: payload,
});

export const setMessageDetails = (payload) => ({
  type: actionTypes.SET_MESSAGE_DETAILS,
  payload: payload,
});
export const deleteMessageDetails = (payload) => ({
  type: actionTypes.DELETE_MESSAGE_DETAILS,
  payload: payload,
});
