import React, { useState, useEffect } from "react";
import axios from "axios";
import * as ENV from "../files/ENV.json";

export default function MainPage() {
  const [googleLoginUrl, setGoogleLoginUrl] = useState("");

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

  return (
    <div>
      {googleLoginUrl && (
        <a className="App-link" href={googleLoginUrl}>
          Sign in with Google
        </a>
      )}
    </div>
  );
}
