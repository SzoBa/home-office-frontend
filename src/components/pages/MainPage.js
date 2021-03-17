import React from "react";
import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div>
      <Link to="/registration">Registration</Link>
      <Link to="/login">Login</Link>
      <Link to="/email">Emails</Link>
    </div>
  );
}
