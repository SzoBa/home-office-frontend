import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as ENV from "../components/files/ENV.json";
import axios from "axios";
import { setLocation, setBackground, setActualWeather } from "../actions/index";
import {
  PICTURE_TIME,
  PICTURE_WEATHER,
  WEATHER,
} from "../containers/ConstContainer";

const SetWeather = (props) => {
  const locationData = useSelector((state) => state.location);
  const actualWeather = useSelector((state) => state.actualWeather);
  const dispatch = useDispatch();

  setActualLocation();
  SetActualLocalWeather();
  SetBackgroundImage();

  return "";

  function setActualLocation() {
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
  }

  function SetActualLocalWeather() {
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
  }

  function SetBackgroundImage() {
    useEffect(() => {
      if (typeof actualWeather.sys !== "undefined") {
        const timeString = compareTimes();
        const weatherString = compareWeatherParams();
        dispatch(
          setBackground({
            backgroundImage: `${timeString}_${weatherString}.jpg`,
          })
        );
      }
      /* eslint-disable */
    }, [actualWeather]);
    /* eslint-enable */
  }

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
};

export default SetWeather;
