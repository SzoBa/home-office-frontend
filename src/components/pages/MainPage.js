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
    if (locationData.longitude === 0 && locationData.longitude === 0) {
      dispatch(
        setLocation({
          longitude: pos.coords.longitude,
          latitude: pos.coords.latitude,
        })
      );
    }
  });
  const weather = UseGetData(
    ENV.actualLocalWeather +
      `?longitude=${locationData.longitude}&latitude=${locationData.latitude}`,
    "token"
  )[1];

  console.log(weather);

  return (
    <div id="main_page_container">
      {weather.name ? (
        <div>
          <h4>Weather data</h4>
          <p>Location: {weather.name}</p>
          <p>Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
          <p>Temperature: {weather.main.temp} C°</p>
          <p>Feels like: {weather.main.feels_like} C°</p>
          <p>Max temp: {weather.main.temp_max} C°</p>
          <p>Min temp: {weather.main.temp_min} C°</p>
          <p>Cloudiness: {weather.clouds.all} %</p>
          <p>Humidity: {weather.main.humidity} %</p>
          {weather.rain && <p>{weather.rain["1h"]} mm / last hour</p>}
          <p>Pressure: {weather.main.pressure} hPa</p>
          <p>Wind:</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;Degree: {weather.wind.deg}°</p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;Speed:{" "}
            {(weather.wind.speed * 3.6).toFixed(0)} km/h
          </p>
          <p>Country code: {weather.sys.country}</p>
          {weather.weather.map((weatherData, index) => (
            <p key={index}>
              General: {weatherData.main} - Description:{" "}
              {weatherData.description}
            </p>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
