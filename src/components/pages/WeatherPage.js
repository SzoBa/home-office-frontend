import React from "react";
import { useSelector } from "react-redux";
import {
  FORECAST_DATE_KEY,
  FORECAST_ONE_DAY,
} from "../../containers/ConstContainer";
import useGetData from "../../hooks/UseGet";
import * as ENV from "../files/ENV.json";

const WeatherPage = (props) => {
  const locationData = useSelector((state) => state.location);
  const [loading, forecastData] = useGetData(
    ENV.weatherForecast +
      `?longitude=${locationData.longitude}&latitude=${locationData.latitude}`
  );

  return (
    <div className="full_width_container">
      {loading ? (
        <div>Loading....</div>
      ) : (
        <div id="content_div_weather">
          <div>Location: {forecastData.city.name}</div>
          <div>
            <div>Today</div>
            <div>Tomorrow</div>
          </div>
          <div id="content_div_weather_cards">
            {filterTimeInterval(
              forecastData.list,
              FORECAST_DATE_KEY,
              FORECAST_ONE_DAY
            ).map((data, index) => (
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
      <div>
        {new Date(props.data[FORECAST_DATE_KEY] * 1000).toLocaleTimeString(
          navigator.language,
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        )}
      </div>
      <div>{props.data.weather[0].description}</div>
      <div>{props.data.main.temp}</div>
    </div>
  );
};

function filterTimeInterval(dataArray, timeKey, interval = FORECAST_ONE_DAY) {
  let endingDate = new Date((dataArray[0][timeKey] + interval) * 1000);
  return dataArray.filter(
    (data) => new Date(data[timeKey] * 1000) < endingDate
  );
}
