import React, { useEffect } from "react";
import * as ENV from "../files/ENV.json";
import { useSelector, useDispatch } from "react-redux";
import {
  setLocation,
  setBackground,
  setActualWeather,
} from "../../actions/index";
import axios from "axios";
import {
  PICTURE_TIME,
  PICTURE_WEATHER,
  WEATHER,
} from "../../containers/ConstContainer";

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
    /* eslint-disable */
  }, [locationData]);
  /* eslint-enable */

  useEffect(() => {
    if (typeof actualWeather.sys !== "undefined") {
      const timeString = compareTimes();
      const weatherString = compareWeatherParams();
      dispatch(
        setBackground({ backgroundImage: `${timeString}_${weatherString}.jpg` })
      );
    }
    /* eslint-disable */
  }, [actualWeather]);
  /* eslint-enable */
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

  function compareTimes() {
    const actualDate = new Date();
    const sunriseDate = new Date(actualWeather.sys.sunrise * 1000);
    const sunsetDate = new Date(actualWeather.sys.sunset * 1000);
    return actualDate < sunriseDate
      ? PICTURE_TIME.NIGHT
      : actualDate - sunriseDate < (sunsetDate - sunriseDate) / 4
      ? PICTURE_TIME.MORNING
      : actualDate - sunriseDate < ((sunsetDate - sunriseDate) * 3) / 4
      ? PICTURE_TIME.MIDDAY
      : actualDate - sunriseDate < sunsetDate - sunriseDate
      ? PICTURE_TIME.AFTERNOON
      : PICTURE_TIME.NIGHT;
  }

  function compareWeatherParams() {
    const weatherData = actualWeather.weather[0];
    return weatherData.main === WEATHER.THUNDERSTORM
      ? PICTURE_WEATHER.STORM
      : weatherData.main === WEATHER.RAIN
      ? PICTURE_WEATHER.RAIN
      : weatherData.main === WEATHER.CLEAR
      ? PICTURE_WEATHER.SUN
      : PICTURE_WEATHER.CLOUDS;
  }
}
