import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import UsePostData from "../../hooks/UsePostData";
import * as ENV from "../files/ENV.json";

const RegistrationPage = (props) => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState([]);
  //   const user = useContext(UserContext)[0];

  const handleSubmit = (event) => {
    event.preventDefault();
    const userObject = {
      name: event.target.elements.username.value,
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
      password_confirmation: event.target.elements.password_confirmation.value,
    };
    UsePostData(
      ENV.simpleRegistration,
      "token, if exists",
      userObject,
      (response) => {
        setErrorMessage([]);
        if (response.status === 201) {
          return history.push("/login");
        }
        Object.entries(response).forEach(([k, v]) => {
          v.forEach((value) => {
            setErrorMessage((old) => [...old, value]);
          });
        });
      }
    );
  };

  return (
    <div className="full_width_container">
      <div id="content_div_login">
        <form method="post" onSubmit={handleSubmit}>
          <h2>Registration</h2>
          <label>Username:</label>
          <input type="text" name="username" />
          <label>Email:</label>
          <input type="email" name="email" />
          <label>Password:</label>
          <input type="password" name="password" />
          <label>Confirm password:</label>
          <input type="password" name="password_confirmation" />
          <button type="submit">Register</button>
        </form>
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
};

export default RegistrationPage;
