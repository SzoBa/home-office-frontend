import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = (props) => {
  return (
    <div
      id="footerContainer"
      className={
        useLocation().pathname === "/email" ? "footerEmail" : "footerFull"
      }
    >
      <Link to="/about/impressum">Impressum</Link>
      <Link to="/about/policy">Privacy Policy</Link>
      <Link to="/about/about">About</Link>
      <Link to="/about/contact">Contact</Link>
    </div>
  );
};
export default Footer;
