import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = (props) => {
  return (
    <div id="headerContainer">
      {useLocation().pathname !== "/" ? <Link to="/">Back to main</Link> : ""}
      <Link to="/registration">Registration</Link>
      <Link to="/login">Login</Link>
    </div>
  );
};
export default Header;
