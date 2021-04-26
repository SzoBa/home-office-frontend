import axios from "axios";

const UseDeleteData = (url, token, callback) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
      Authorization: "Bearer " + token,
    },
    url: url,
    method: "delete",
  };

  const deleteData = async () => {
    const response = await axios(options);
    return response;
  };

  deleteData()
    .then((result) => {
      callback(result.data);
    })
    .catch((error) => {
      if (error.response) {
        callback(error.response.data);
      }
    });
};

export default UseDeleteData;
