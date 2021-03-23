import React from "react";
import UseGetData from "../../hooks/UseGet";
import * as ENV from "../files/ENV.json";
import { useSelector, useDispatch } from "react-redux";
import { setLocation } from "../../actions/index";

export default function MainPage() {
  const locationData = useSelector((state) => state.location);
  const dispatch = useDispatch();

  const geo = navigator.geolocation;
  geo.getCurrentPosition((pos) => {
    dispatch(
      setLocation({
        longitude: pos.coords.longitude,
        latitude: pos.coords.latitude,
      })
    );
  });
  const weather = UseGetData(
    ENV.actualLocalWeather +
      `?longitude=${locationData.longitude}&latitude=${locationData.latitude}`,
    "token"
  )[1];

  console.log(weather);

  return (
    <div id="main_page_container">
      <p>This is the main page</p>
      {weather.name ? (
        <div>
          <h4>Weather data</h4>
          <p>Location: {weather.name}</p>
          <p>Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
          <p>Temperature: {(weather.main.temp - 272.15).toFixed(2)}</p>
          <p>Feels like: {(weather.main.feels_like - 272.15).toFixed(2)}</p>
          <p>Max temp: {(weather.main.temp_max - 272.15).toFixed(2)}</p>
          <p>Min temp: {(weather.main.temp_min - 272.15).toFixed(2)}</p>
          <p>Humidity: {weather.main.humidity}</p>
          <p>Pressure: {weather.main.pressure}</p>
          <p>Wind:</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;Degree: {weather.wind.deg}</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;Speed: {weather.wind.speed}</p>
          <p>Country code: {weather.sys.country}</p>
          {weather.weather.map((weatherData) => (
            <p>
              {weatherData.description} - {weatherData.main}
            </p>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
