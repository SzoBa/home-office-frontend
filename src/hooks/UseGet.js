import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const useGetData = (url, token = "", setErrorMessage) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
        Authorization: "Bearer " + token,
      },
      url: url,
    };
    const getData = async () => {
      const response = await axios(options);
      setFetchedData(response.data);
      setIsLoading(false);
    };
    getData().catch((error) => {
      if (error.response.status === 422) {
        return history.push("/login");
      }
    });
  }, [url, token, setErrorMessage, history]);

  return [isLoading, fetchedData];
};

export default useGetData;
