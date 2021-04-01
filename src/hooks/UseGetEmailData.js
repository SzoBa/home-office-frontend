import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const useGetEmailData = (url, token, setFetchedData, setErrorMessage) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
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
  }, [url, token, isLoading, setFetchedData, history, setErrorMessage]);
};

export default useGetEmailData;
