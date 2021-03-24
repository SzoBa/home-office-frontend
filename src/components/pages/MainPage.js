import React, { useEffect } from "react";
import * as ENV from "../files/ENV.json";
import { useSelector, useDispatch } from "react-redux";
import {
  setLocation,
  setBackground,
  setActualWeather,
} from "../../actions/index";
import axios from "axios";

export default function MainPage() {
  const locationData = useSelector((state) => state.location);
  const actualWeather = useSelector((state) => state.actualWeather);
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

  useEffect(() => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
      },
      url:
        ENV.actualLocalWeather +
        `?longitude=${locationData.longitude}&latitude=${locationData.latitude}`,
    };
    const getData = async () => {
      const response = await axios(options);
      dispatch(setActualWeather(response.data));
    };
    if (locationData.longitude !== 0 && locationData.longitude !== 0) {
      getData().catch((error) => {});
    }
  }, [locationData]);

  useEffect(() => {
    const actualTime = new Date();

    dispatch(setBackground({ backgroundImage: "afternoon_rain.jpg" }));
  }, [actualWeather]);

  console.log(actualWeather);

  return (
    <div id="main_page_container" style={{ color: "white" }}>
      {actualWeather.name ? (
        <div>
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
