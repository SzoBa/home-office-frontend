import React from "react";
import { useSelector } from "react-redux";

export default function MainPage() {
  const actualWeather = useSelector((state) => state.actualWeather);

  return (
    <div className="full_width_container">
      {actualWeather.name ? (
        <div id="content_div_main">
          <h4>Weather data</h4>
          <p>Location: {actualWeather.name}</p>
          <p>Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
          <p>
            Current time:{" "}
            {new Date().toLocaleTimeString(navigator.language, {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          <p>
            Sunrise:{" "}
            {new Date(actualWeather.sys.sunrise * 1000).toLocaleTimeString(
              navigator.language,
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            )}
          </p>
          <p>
            Sunset:{" "}
            {new Date(actualWeather.sys.sunset * 1000).toLocaleTimeString(
              navigator.language,
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            )}
          </p>

          <p>Temperature: {actualWeather.main.temp} C°</p>
          <p>Feels like: {actualWeather.main.feels_like} C°</p>
          <p>Max temp: {actualWeather.main.temp_max} C°</p>
          <p>Min temp: {actualWeather.main.temp_min} C°</p>
          <p>Cloudiness: {actualWeather.clouds.all} %</p>
          <p>Humidity: {actualWeather.main.humidity} %</p>
          {actualWeather.rain && (
            <p>{actualWeather.rain["1h"]} mm / last hour</p>
          )}
          <p>Visibility: {actualWeather.visibility / 1000} km</p>
          <p>Pressure: {actualWeather.main.pressure} hPa</p>
          <p>Wind:</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;Degree: {actualWeather.wind.deg}°</p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;Speed:{" "}
            {(actualWeather.wind.speed * 3.6).toFixed(0)} km/h
          </p>
          <p>Country code: {actualWeather.sys.country}</p>
          {actualWeather.weather.map((weatherData, index) => (
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
