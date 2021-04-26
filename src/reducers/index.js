import { combineReducers } from "redux";
import actualWeatherReducer from "./actualWeather";
import backgroundReducer from "./background";
import locationReducer from "./location";
import loginReducer from "./login";
import urlOptionReducer from "./urlOption";
import writeEmailReducer from "./writeEmail";
import messageDetailsReducer from "./messageDetails";
import showMessageDetailsReducer from "./showMessageDetails";
import { reducer as toastrReducer } from "react-redux-toastr";

const allReducers = combineReducers({
  login: loginReducer,
  location: locationReducer,
  background: backgroundReducer,
  actualWeather: actualWeatherReducer,
  urlOption: urlOptionReducer,
  writeReadEmail: writeEmailReducer,
  messageDetails: messageDetailsReducer,
  showMessageDetails: showMessageDetailsReducer,
  toastr: toastrReducer,
});

export default allReducers;
