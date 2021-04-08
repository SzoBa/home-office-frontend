import * as weatherIcons from "../images/weatherIconIndex";
import {
  FORECAST_DATE_KEY,
  WEATHER_ICON_PREFIX,
} from "../../containers/ConstContainer";

const WeatherCard = (props) => {
  return (
    <div className="weather_card">
      <div>{getPrettyTime(props.data[FORECAST_DATE_KEY] * 1000)}</div>
      <div>
        {props.data.weather[0].description.replace(/\b\w/g, (l) =>
          l.toUpperCase()
        )}
      </div>
      <div
        style={{
          height: "140px",
          width: "140px",
          backgroundImage: `url(${
            weatherIcons[
              WEATHER_ICON_PREFIX +
                props.data.weather[0].icon.replace(/\.[^/.]+$/, "")
            ]
          })`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundColor: "white",
          marginLeft: "-20px",
        }}
      ></div>
      <div>
        <br /> {Math.round(props.data.main.temp, 0)}°C
      </div>
    </div>
  );
};

function getPrettyTime(unixTimestamp) {
  return new Date(unixTimestamp).toLocaleTimeString(navigator.language, {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default WeatherCard;
