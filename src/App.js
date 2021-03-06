import { BrowserRouter as Router } from "react-router-dom";
import MainContainer from "./containers/MainContainer";
import WeatherSetter from "./hooks/UseSetWeather";
import "./style/app.css";

function App() {
  return (
    <Router>
      <WeatherSetter />
      <MainContainer />
    </Router>
  );
}

export default App;
