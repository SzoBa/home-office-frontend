import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UsePostData from "../../hooks/UsePostData";
import * as ENV from "../files/ENV.json";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/index";

export default function LoginPage() {
  const [googleLoginUrl, setGoogleLoginUrl] = useState("");
  const [githubLoginUrl, setGithubLoginUrl] = useState("");

  const [errorMessage, setErrorMessage] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const locationData = useSelector((state) => state.location);
  const actualWeather = useSelector((state) => state.actualWeather);
  const background = useSelector((state) => state.background);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userObject = {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
    };
    UsePostData(ENV.simpleLogin, "", userObject, (response) => {
      setErrorMessage([]);
      if (response.status === 201) {
        dispatch(login(response.data));
        return history.push("/");
      }
      Object.entries(response).forEach(([k, v]) => {
        v.forEach((value) => {
          setErrorMessage((old) => [...old, value]);
        });
      });
    });
  };

  useEffect(() => {
    const options = {
      headers: {
        Accept: "application/json",
      },
      url: ENV.googleLogin,
    };
    const getData = async () => {
      const response = await axios(options);
      setGoogleLoginUrl(response.data.url);
    };
    getData().catch((error) => {
      console.log(error.response.data);
    });
  }, []);

  useEffect(() => {
    const options = {
      headers: {
        Accept: "application/json",
      },
      url: ENV.githubLogin,
    };
    const getData = async () => {
      const response = await axios(options);
      setGithubLoginUrl(response.data.url);
      setCookieData(locationData, actualWeather, background);
    };
    getData().catch((error) => {
      console.log(error.response.data);
    });
    /* eslint-disable */
  }, []);
  /* eslint-enable */

  return (
    <div className="full_width_container">
      <div id="content_div_login">
        <h2>Login</h2>
        <form method="post" onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="email" name="email" />
          <label>Password: </label>
          <input type="password" name="password" />
          <button type="submit">Login</button>
        </form>
        <div>
          {googleLoginUrl && (
            <a className="button_text" href={googleLoginUrl}>
              <div className="social_button">
                <span id="google_icon"></span>
                Sign in with Google
              </div>
            </a>
          )}

          {githubLoginUrl && (
            <a className="button_text" href={githubLoginUrl}>
              <div className="social_button">
                <span id="github_icon"></span>
                Sign in with Github
              </div>
            </a>
          )}
        </div>
        {errorMessage === null
          ? ""
          : errorMessage.map((data, index) => (
              <div id="error_msg" key={index}>
                {data}
              </div>
            ))}
      </div>
    </div>
  );
}
function setCookieData(locationData, actualWeather, background) {
  document.cookie = `data={"locationData":${JSON.stringify(
    locationData
  )},"actualWeather":${JSON.stringify(
    actualWeather
  )},"background":${JSON.stringify(background)}};`;
}
