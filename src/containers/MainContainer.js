import React from "react";
import { Route } from "react-router-dom";
import MainPage from "../components/pages/MainPage";
import LoginGooglePage from "../components/pages/LoginGooglePage";
import LoginGithubPage from "../components/pages/LoginGithubPage";
import LoginPage from "../components/pages/LoginPage";
import EmailPage from "../components/pages/EmailPage";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import PrivateRoute from "./PrivateRoute";
import RegistrationPage from "../components/pages/RegistrationPage";

export default function MainContainer() {
  return (
    <div>
      <Header />
      <Navbar />
      {/* <Sidebar /> */}
      <div id="main_content_container">
        <Route path="/" component={MainPage} exact />
        <Route path="/registration" component={RegistrationPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/auth/google" component={LoginGooglePage} />
        <Route path="/auth/github" component={LoginGithubPage} />
        <PrivateRoute path="/logout" component={MainPage} />
        <PrivateRoute path="/email" component={EmailPage} />
        <Footer />
      </div>
    </div>
  );
}
