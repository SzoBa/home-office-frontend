import * as actionTypes from "../actions/actionTypes";

const initialState = false;

const writeEmailReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.WRITE_EMAIL:
      return true;

    case actionTypes.READ_EMAIL:
      return false;

    default:
      return state;
  }
};

export default writeEmailReducer;
