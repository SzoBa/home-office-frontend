import React, { useState, useEffect } from "react";
import axios from "axios";
import * as ENV from "../files/ENV.json";
import { Link } from "react-router-dom";

const LoginGooglePage = (props) => {
  const [data, setData] = useState([]);

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
      console.log(response.data);
    };
    getData().catch((error) => {
      console.log(error.response.data);
    });
  }, [props.location.search]);

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

export default LoginGooglePage;
