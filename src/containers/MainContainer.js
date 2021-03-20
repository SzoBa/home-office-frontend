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

export default function MainContainer() {
  return (
    <div id="main">
      <Header />
      <Navbar />
      <Sidebar />
      <div id="mainContentContainer">
        <Route exact path="/" component={MainPage} />
        <Route path="/registration" component={MainPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/auth/google" component={LoginGooglePage} />
        <Route path="/auth/github" component={LoginGithubPage} />
        <Route path="/logout" component={MainPage} />
        <Route path="/email" component={EmailPage} />
      </div>
      <Footer />
    </div>
  );
}
