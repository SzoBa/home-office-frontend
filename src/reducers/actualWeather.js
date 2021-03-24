import * as actionTypes from "../actions/actionTypes";

const initialState = [];

const actualWeatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ACTUAL_WEATHER:
      return action.payload;

    default:
      return state;
  }
};

export default actualWeatherReducer;
