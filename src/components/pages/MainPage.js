import React from "react";
import UseGetData from "../../hooks/UseGet";
import * as ENV from "../files/ENV.json";

export default function MainPage() {
  const geo = navigator.geolocation;
  geo.getCurrentPosition((pos) => {
    console.log(
      "Lat: " + pos.coords.latitude + " - Long: " + pos.coords.longitude
    );
  });
  const weather = UseGetData(ENV.actualLocalWeather, "token")[1];

  //`?longitude=${}&latitude=${}`
  console.log(weather);

  return (
    <div id="main_page_container">
      <p>This is the main page</p>
    </div>
  );
}
