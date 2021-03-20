import React from "react";

export default function MainPage() {
  const geo = navigator.geolocation;
  geo.getCurrentPosition((pos) => {
    console.log(
      "Lat: " + pos.coords.latitude + " - Long: " + pos.coords.longitude
    );
  });

  return (
    <div id="mainPageContainer">
      <p>This is the main page</p>
    </div>
  );
}
