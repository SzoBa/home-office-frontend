import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <div id="navbarContainer">
      <Link to="/email">Emails</Link>
    </div>
  );
};
export default Navbar;
