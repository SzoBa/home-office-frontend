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
        clientId=""
        render={(renderProps) => (
          <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
            This is my custom Google button
          </button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        scope="https://www.googleapis.com/auth/gmail.readonly"
      />
    </div>
  );
}
