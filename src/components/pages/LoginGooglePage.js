import React, { useState, useEffect } from "react";
import axios from "axios";
import * as ENV from "../files/ENV.json";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../actions/index";

const LoginGooglePage = (props) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const options = {
      headers: {
        Accept: "application/json",
      },
      url: ENV.googleLoginCallback + props.location.search,
    };
    const getData = async () => {
      const response = await axios(options);
      setData(response.data);
      dispatch(login(response.data));
    };
    getData().catch((error) => {
      console.log(error.response.data);
    });
  }, [props.location.search, dispatch]);

  return (
    <div className="login_container">
      {data.username ? (
        <div className="content_div_social">
          <form>
            <h2>Login successful!</h2>
            <h4>Logged in as:</h4>
            <label>{data.username}</label>
            <button onClick={() => history.push("/")}>Okay</button>
          </form>
        </div>
      ) : (
        <div className="content_div_social">
          <form>
            <h2>Loading...</h2>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginGooglePage;
