import * as actionTypes from "../actions/actionTypes";

const initialState = { show: false };

const showMessageDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_MESSAGE_DETAILS:
      return {
        show: true,
      };

    case actionTypes.HIDE_MESSAGE_DETAILS:
      return initialState;

    default:
      return state;
  }
};

export default showMessageDetailsReducer;
