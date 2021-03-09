import React from "react";

import { GoogleLogin } from "react-google-login";
import { useGoogleLogin } from "react-google-login";

export default function MainPage() {
  const responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
  };

  return (
    <div>
      <GoogleLogin
        clientId="724688854076-ou1acbgrcampkq6fcg8ljvpm02jl1s3k.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        scope="https://www.googleapis.com/auth/gmail.readonly"
      />
    </div>
  );
}
