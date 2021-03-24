import { combineReducers } from "redux";
import actualWeatherReducer from "./actualWeather";
import backgroundReducer from "./background";
import locationReducer from "./location";
import loginReducer from "./login";

const allReducers = combineReducers({
  login: loginReducer,
  location: locationReducer,
  background: backgroundReducer,
  actualWeather: actualWeatherReducer,
});

export default allReducers;
