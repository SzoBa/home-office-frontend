import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore } from "redux";
import allReducers from "./reducers";
import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";

import reportWebVitals from "./reportWebVitals";

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="bottom-right"
        getState={(state) => state.toastr}
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
