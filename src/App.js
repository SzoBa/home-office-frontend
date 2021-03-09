import { BrowserRouter as Router } from "react-router-dom";
import MainContainer from "./containers/MainContainer";
import "./style/App.css";

function App() {
  return (
    <Router>
      <MainContainer />
    </Router>
  );
}

export default App;
