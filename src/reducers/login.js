import * as actionTypes from "../actions/actionTypes";

const initialState = {
  name: "",
  sanctum_token: "",
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        name: action.payload.username,
        sanctum_token: action.payload.token,
      };

    case actionTypes.LOGOUT:
      return { initialState };

    default:
      return state;
  }
};

export default loginReducer;
