import React from "react";
import { Route } from "react-router-dom";

import MainPage from "../pages/MainPage";

export default function MainContainer() {
  return (
    <div>
      <div>
        <Route exact path="/" component={MainPage} />
        <Route path="/registration" component={MainPage} />
        <Route path="/login" component={MainPage} />
        <Route path="/logout" component={MainPage} />
      </div>
    </div>
  );
}
