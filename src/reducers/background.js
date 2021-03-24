import * as actionTypes from "../actions/actionTypes";

const initialState = {
  backgroundImage: null,
};

const backgroundReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_BACKGROUND:
      return {
        backgroundImage: action.payload.backgroundImage,
      };

    default:
      return state;
  }
};

export default backgroundReducer;
