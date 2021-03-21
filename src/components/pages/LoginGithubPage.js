import React, { useState, useEffect } from "react";
import axios from "axios";
import * as ENV from "../files/ENV.json";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../actions/index";

const LoginGithubPage = (props) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const options = {
      headers: {
        Accept: "application/json",
      },
      url: ENV.githubLoginCallback + props.location.search,
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
    <div>
      {data.username ? (
        <div>
          Login successful!
          <p>Logged in as: {data.username}</p>
          <button onClick={() => history.push("/")}>Okay</button>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default LoginGithubPage;
