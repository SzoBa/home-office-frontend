import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  FORECAST_DATE_KEY,
  FORECAST_ONE_DAY,
} from "../../containers/ConstContainer";
import useGetData from "../../hooks/UseGet";
import * as ENV from "../files/ENV.json";
import TestImage from "../images/weatherIcons/01d.png";

const WeatherPage = (props) => {
  const locationData = useSelector((state) => state.location);
  const [filteredForecastData, setFilteredForecastData] = useState([]);

  const [loading, forecastData] = useGetData(
    ENV.weatherForecast +
      `?longitude=${locationData.longitude}&latitude=${locationData.latitude}`
  );

  useEffect(() => {
    if (!loading) {
      const filteredData = filterTimeInterval(
        forecastData.list,
        FORECAST_DATE_KEY,
        FORECAST_ONE_DAY
      );
      if (filteredData) {
        setFilteredForecastData(filteredData);
      }
    }
  }, [loading, forecastData]);

  return (
    <div className="full_width_container">
      {loading ? (
        <div>Loading....</div>
      ) : (
        <div id="content_div_weather">
          <div>Current position: {forecastData.city.name}</div>
          <div>
            <div>
              Today:
              <br />
              {0 < filteredForecastData.length
                ? getPrettyDate(
                    filteredForecastData[0][FORECAST_DATE_KEY] * 1000
                  )
                : ""}
            </div>
            <div>
              Tomorrow:
              <br />
              {0 < filteredForecastData.length
                ? getPrettyDate(
                    filteredForecastData[filteredForecastData.length - 1][
                      FORECAST_DATE_KEY
                    ] * 1000
                  )
                : ""}
            </div>
          </div>
          <div id="content_div_weather_cards">
            {filteredForecastData.map((data, index) => (
              <WeatherCard key={index} data={data} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;

const WeatherCard = (props) => {
  return (
    <div className="weather_card">
      <div>{getPrettyTime(props.data[FORECAST_DATE_KEY] * 1000)}</div>
      <p></p>
      <div>
        Weather:
        <br /> {props.data.weather[0].description}
      </div>
      <div>{props.data.weather[0].id}</div>
      <div>{props.data.weather[0].icon}</div>
      <div
        style={{
          height: "140px",
          width: "140px",
          backgroundImage: `url(${TestImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundColor: "white",
          marginLeft: "-15px",
        }}
      ></div>
      <div>
        <br /> {Math.round(props.data.main.temp, 0)}°C
      </div>
    </div>
  );
};

function filterTimeInterval(dataArray, timeKey, interval = FORECAST_ONE_DAY) {
  let endingDate = new Date((dataArray[0][timeKey] + interval) * 1000);
  return dataArray.filter(
    (data) => new Date(data[timeKey] * 1000) < endingDate
  );
}

function getPrettyTime(unixTimestamp) {
  return new Date(unixTimestamp).toLocaleTimeString(navigator.language, {
    hour: "numeric",
    minute: "2-digit",
  });
}

function getPrettyDate(unixTimestamp) {
  return new Date(unixTimestamp).toLocaleTimeString(navigator.language, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}
