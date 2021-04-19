import * as actionTypes from "../actions/actionTypes";

const initialState = { id: "", sender: "", cc: "", subject: "" };

const messageDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MESSAGE_DETAILS:
      return {
        id: action.payload.id,
        sender: action.payload.sender,
        cc: action.payload.cc,
        subject: action.payload.subject,
      };

    case actionTypes.DELETE_MESSAGE_DETAILS:
      return { initialState };

    default:
      return state;
  }
};

export default messageDetailsReducer;
