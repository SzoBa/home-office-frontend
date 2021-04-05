import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import MainPage from "../components/pages/MainPage";
import LoginGooglePage from "../components/pages/LoginGooglePage";
import LoginGithubPage from "../components/pages/LoginGithubPage";
import LoginPage from "../components/pages/LoginPage";
import EmailPage from "../components/pages/EmailPage";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
// import Sidebar from "../components/layout/Sidebar";
import PrivateRoute from "./PrivateRoute";
import RegistrationPage from "../components/pages/RegistrationPage";
import * as weatherImages from "../components/images/weatherIndex";
import WeatherPage from "../components/pages/WeatherPage";

export default function MainContainer() {
  const background = useSelector((state) => state.background);
  const backgroundImage = getBackgroundImage();

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%",
      }}
    >
      <Header />
      <Navbar />
      {/* <Sidebar /> */}
      <div id="main_content_container">
        <Route exact path="/" component={MainPage} />
        <Route path="/registration" component={RegistrationPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/auth/google" component={LoginGooglePage} />
        <Route path="/auth/github" component={LoginGithubPage} />
        <Route path="/weather" component={WeatherPage} />
        <PrivateRoute path="/logout" component={MainPage} />
        <PrivateRoute path="/email" component={EmailPage} />
        <Footer />
      </div>
    </div>
  );

  function getBackgroundImage() {
    const imageName = background.backgroundImage
      ? background.backgroundImage.replace(/\.[^/.]+$/, "")
      : null;
    return imageName ? weatherImages[imageName] : "freeze";
  }
}
