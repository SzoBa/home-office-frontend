import * as actionTypes from "../actions/actionTypes";

const initialState = "?q=in:inbox+is:unread";

const urlOptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_URL_OPTION:
      return action.payload;

    default:
      return state;
  }
};

export default urlOptionReducer;
