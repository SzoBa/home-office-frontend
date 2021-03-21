import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <div id="headerContainer">
      <Link to="/registration">Registration</Link>
      <Link to="/login">Login</Link>
    </div>
  );
};
export default Header;
