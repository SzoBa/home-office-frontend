import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UsePostData from "../../hooks/UsePostData";
import * as ENV from "../files/ENV.json";

export default function LoginPage() {
  const [googleLoginUrl, setGoogleLoginUrl] = useState("");
  const [githubLoginUrl, setGithubLoginUrl] = useState("");

  const [errorMessage, setErrorMessage] = useState([]);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userObject = {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
    };
    UsePostData(ENV.simpleLogin, "token, if exists", userObject, (response) => {
      setErrorMessage([]);
      if (response.status === 201) {
        // setUser({
        //   username: response.data.username,
        //   token: response.data.token,
        // });
        return history.push("/");
      }
      console.log(response);
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
    };
    getData().catch((error) => {
      console.log(error.response.data);
    });
  }, []);

  return (
    <div id="login_container">
      <div id="content_div_login">
        <h2>Login</h2>
        <form method="post" onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="email" name="email" />
          <label>Password: </label>
          <input type="password" name="password" />
          <button type="submit">Login</button>
        </form>

        {googleLoginUrl && (
          <a className="App-link" href={googleLoginUrl}>
            Sign in with Google
          </a>
        )}
        {githubLoginUrl && (
          <a className="App-link" href={githubLoginUrl}>
            Sign in with Github
          </a>
        )}
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
