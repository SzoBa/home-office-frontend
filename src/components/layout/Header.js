import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = (props) => {
  const login = useSelector((state) => state.login);

  return (
    <div id="headerContainer">
      {useLocation().pathname !== "/" ? <Link to="/">Back to main</Link> : ""}
      <Link to="/weather">Weather forecast</Link>
      <Link
        onClick={(e) => {
          e.preventDefault();
        }}
        style={{ cursor: "default" }}
        to="/"
      >
        News
      </Link>
      <Link
        onClick={(e) => {
          e.preventDefault();
        }}
        style={{ cursor: "default" }}
        to="/"
      >
        Traffic info
      </Link>
      <Link to="/currency">Currency info</Link>
      <Link to="/email">Emails</Link>
      <Link to="/registration">Registration</Link>
      <Link to="/login">Login</Link>
      {login.name ? (
        <div>
          <span>Logged in as: </span>
          <span>{login.name}</span>
        </div>
      ) : (
        <div>
          <span>Not Logged in</span>
        </div>
      )}
    </div>
  );
};
export default Header;
