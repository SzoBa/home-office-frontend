import React from "react";
import { Route } from "react-router-dom";
import MainPage from "../components/pages/MainPage";
import LoginGooglePage from "../components/pages/LoginGooglePage";
import LoginGithubPage from "../components/pages/LoginGithubPage";
import LoginPage from "../components/pages/LoginPage";

export default function MainContainer() {
  return (
    <div>
      <div>
        <Route exact path="/" component={MainPage} />
        <Route path="/registration" component={MainPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/auth/google" component={LoginGooglePage} />
        <Route path="/auth/github" component={LoginGithubPage} />
        <Route path="/logout" component={MainPage} />
      </div>
    </div>
  );
}
