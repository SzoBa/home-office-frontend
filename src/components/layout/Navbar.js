import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <div>
      <p>This is the navbar</p>
      <Link to="/registration">Registration</Link>
      <Link to="/login">Login</Link>
      <Link to="/email">Emails</Link>
    </div>
  );
};
export default Navbar;
