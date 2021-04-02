import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import * as ENV from "../components/files/ENV.json";

const useGetEmailData = (setFetchedData, setLoading, setErrorMessage) => {
  const user = useSelector((state) => state.login);
  const urlOptions = useSelector((state) => state.urlOption);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const writeReadEmail = useSelector((state) => state.writeReadEmail);

  useEffect(() => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
        Authorization: "Bearer " + user.sanctum_token,
      },
      url: ENV.mailsWithOptions + urlOptions,
    };
    const getData = async () => {
      const response = await axios(options);
      setFetchedData(response.data);
      setIsLoading(false);
      setLoading(false);
    };
    if (!writeReadEmail) {
      setLoading(true);
      getData().catch((error) => {
        if (error.response.status === 422) {
          return history.push("/login");
        }
      });
    }
  }, [
    urlOptions,
    isLoading,
    setErrorMessage,
    writeReadEmail,
    user.sanctum_token,
    setFetchedData,
    history,
    setLoading,
  ]);
};

export default useGetEmailData;
