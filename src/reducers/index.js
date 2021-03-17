import { combineReducers } from "redux";
import loginReducer from "./login";

const allReducers = combineReducers({
  login: loginReducer,
});

export default allReducers;
