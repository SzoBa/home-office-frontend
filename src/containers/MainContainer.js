import React from "react";
import { Route } from "react-router-dom";
import MainPage from "../components/pages/MainPage";
import LoginGooglePage from "../components/pages/LoginGooglePage";

export default function MainContainer() {
  return (
    <div>
      <div>
        <Route exact path="/" component={MainPage} />
        <Route path="/registration" component={MainPage} />
        <Route path="/auth/google" component={LoginGooglePage} />
        <Route path="/login" component={MainPage} />
        <Route path="/logout" component={MainPage} />
      </div>
    </div>
  );
}
