import React from "react";
import { useLocation } from "react-router-dom";

const Navbar = (props) => {
  return (
    <div
      id="navbar_container_open"
      className={useLocation().pathname === "/email" ? "" : "hide"}
    >
      <div>Email options</div>
    </div>
  );
};
export default Navbar;
