import { combineReducers } from "redux";
import locationReducer from "./location";
import loginReducer from "./login";

const allReducers = combineReducers({
  login: loginReducer,
  location: locationReducer,
});

export default allReducers;
