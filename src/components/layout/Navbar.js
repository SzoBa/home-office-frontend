import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <div id="navbar_container">
      <Link to="/email">Emails</Link>
    </div>
  );
};
export default Navbar;
