import React from "react";
import { Link } from "react-router-dom";

export default function MainPage() {
  const geo = navigator.geolocation;
  geo.getCurrentPosition((pos) => {
    console.log(
      "Lat: " + pos.coords.latitude + " - Long: " + pos.coords.longitude
    );
  });

  return (
    <div>
      <Link to="/registration">Registration</Link>
      <Link to="/login">Login</Link>
      <Link to="/email">Emails</Link>
    </div>
  );
}
