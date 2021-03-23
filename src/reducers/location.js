import * as actionTypes from "../actions/actionTypes";

const initialState = {
  longitude: 0,
  latitude: 0,
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOCATION:
      return {
        longitude: action.payload.longitude,
        latitude: action.payload.latitude,
      };

    default:
      return state;
  }
};

export default locationReducer;
