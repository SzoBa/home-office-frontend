import React, { useState, useEffect } from "react";
import axios from "axios";
import * as ENV from "../files/ENV.json";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../actions/index";

const LoginGithubPage = (props) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

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
      console.log(response.data);
    };
    getData().catch((error) => {
      console.log(error.response.data);
    });
  }, [props.location.search, dispatch]);

  return (
    <div>
      {data && (
        <div>
          <Link to="/">Back to main</Link>
          <p>Logged in as</p>
          <p>{data.username}</p>
        </div>
      )}
    </div>
  );
};

export default LoginGithubPage;
