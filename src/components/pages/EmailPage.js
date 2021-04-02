import React, { useState } from "react";
import { useSelector } from "react-redux";
import UseGetEmailData from "../../hooks/UseGetEmailData";
import useSortedData from "../../hooks/UseSortedData";
import * as ENV from "../files/ENV.json";

const UNREAD = "UNREAD";
const DESCENDING = "desc";
// const ASCENDING = "asc";
const DATE = "Date";
const SUBJECT = "Subject";
const FROM = "From";
const SNIPPET = "snippet";
const STRING = "string";

export default function EmailPage() {
  const user = useSelector((state) => state.login);
  const urlOptions = useSelector((state) => state.urlOption);

  const [messageDetails, setMessageDetails] = useState([]);
  UseGetEmailData(
    ENV.mailsWithOptions + urlOptions,
    user.sanctum_token,
    setMessageDetails
  );

  const [sortedMessages, sortByField, sortConfig] = useSortedData(
    messageDetails,
    orderDetailsByKey,
    {
      key: DATE,
      direction: DESCENDING,
    }
  );

  const showSortedBy = (fieldName) => {
    return sortConfig.key === fieldName ? sortConfig.direction : "";
  };

  return (
    <div className="email_container">
      <table className="table_style">
        <thead>
          <tr>
            <th
              onClick={() => sortByField(SUBJECT)}
              className={showSortedBy(SUBJECT)}
            >
              {SUBJECT}
            </th>
            <th
              onClick={() => sortByField(SNIPPET)}
              className={showSortedBy(SNIPPET)}
            >
              Message
            </th>
            <th
              onClick={() => sortByField(FROM)}
              className={showSortedBy(FROM)}
            >
              Author
            </th>
            <th
              onClick={() => sortByField(DATE)}
              className={showSortedBy(DATE)}
            >
              Created at
            </th>
            <th>Delete</th>
            <th>Mark as unread</th>
          </tr>
        </thead>
        <tbody>
          {sortedMessages.map((message) => (
            <tr
              key={message.id}
              style={{
                fontWeight: message.labelIds.includes(UNREAD) ? "bold" : "",
              }}
            >
              <td>{setMaxChars(getDataFromMessage(message, SUBJECT))}</td>
              <td
                dangerouslySetInnerHTML={{
                  __html: setMaxChars(message[SNIPPET] + "..."),
                }}
              ></td>
              <td>{setMaxChars(getDataFromMessage(message, FROM))}</td>
              <td>
                {new Date(getDataFromMessage(message, DATE)).toLocaleTimeString(
                  navigator.language,
                  {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </td>
              <td>Del icon</td>
              <td>Unr icon</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  function getDataFromMessage(message, dataName) {
    return message.payload.headers.filter(function (subject) {
      return subject.name === dataName;
    })[0].value;
  }

  function setMaxChars(data, maxChars = 25) {
    data = data.split(" ");
    data = data.map((word) => {
      return maxChars < word.length
        ? word.substring(0, maxChars - 2) + "..."
        : word;
    });
    return data.join(" ");
  }

  function orderDetailsByKey(key, order = DESCENDING) {
    return function sorter(a, b) {
      if (
        key !== SNIPPET &&
        (a.payload.headers.filter((item) => item.name === key).length < 1 ||
          b.payload.headers.filter((item) => item.name === key).length < 1)
      ) {
        return 0;
      }

      const valueA =
        key === DATE
          ? new Date(
              a.payload.headers.filter((item) => item.name === key)[0].value
            )
          : key === SNIPPET
          ? a[SNIPPET]
          : typeof a.payload.headers.filter((item) => item.name === key)[0]
              .value === STRING
          ? a.payload.headers
              .filter((item) => item.name === key)[0]
              .value.toLowerCase()
          : a.payload.headers.filter((item) => item.name === key)[0].value;
      const valueB =
        key === DATE
          ? new Date(
              b.payload.headers.filter((item) => item.name === key)[0].value
            )
          : key === SNIPPET
          ? b[SNIPPET]
          : typeof b.payload.headers.filter((item) => item.name === key)[0]
              .value === STRING
          ? b.payload.headers
              .filter((item) => item.name === key)[0]
              .value.toLowerCase()
          : b.payload.headers.filter((item) => item.name === key)[0].value;

      let compare = 0;
      if (valueA > valueB) {
        compare = 1;
      } else if (valueA < valueB) {
        compare = -1;
      }
      return order === DESCENDING ? compare * -1 : compare;
    };
  }
}
