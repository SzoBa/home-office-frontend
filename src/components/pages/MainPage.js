import React from "react";

export default function MainPage() {
  const geo = navigator.geolocation;
  geo.getCurrentPosition((pos) => {
    console.log(
      "Lat: " + pos.coords.latitude + " - Long: " + pos.coords.longitude
    );
  });

  return (
    <div id="main_page_container">
      <p>This is the main page</p>
    </div>
  );
}
