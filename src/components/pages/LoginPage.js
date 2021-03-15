import React, { useState, useEffect } from "react";
import axios from "axios";
import * as ENV from "../files/ENV.json";

export default function LoginPage() {
  const [googleLoginUrl, setGoogleLoginUrl] = useState("");
  const [githubLoginUrl, setGithubLoginUrl] = useState("");

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
    <div>
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
    </div>
  );
}
