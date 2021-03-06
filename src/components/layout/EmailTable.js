import React, { useState } from "react";
import UseGetEmailData from "../../hooks/UseGetEmailData";
import useSortedData from "../../hooks/UseSortedData";

import {
  CC,
  DATE,
  DESCENDING,
  FROM,
  SNIPPET,
  STRING,
  SUBJECT,
  UNREAD,
} from "../../containers/ConstContainer";
import EmailLoadingModal from "./EmailLoadingModal";
import EmailDetailsModal from "./EmailDetailsModal";
import { useSelector, useDispatch } from "react-redux";
import {
  setMessageDetails as setMessageInfo,
  showMessageDetailsModal,
} from "../../actions/index";

const EmailTable = (props) => {
  const showMessageDetails = useSelector((state) => state.showMessageDetails);
  const dispatch = useDispatch();
  const [messageDetails, setMessageDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortedMessages, setSortedMessages] = useState([]);
  UseGetEmailData(setMessageDetails, setLoading);

  const [sortByField, sortConfig] = useSortedData(
    messageDetails,
    orderDetailsByKey,
    {
      key: DATE,
      direction: DESCENDING,
    },
    setSortedMessages
  );

  const showSortedBy = (fieldName) => {
    return sortConfig.key === fieldName ? sortConfig.direction : "";
  };

  return (
    <React.Fragment>
      {showMessageDetails.show && <EmailDetailsModal />}
      {loading ? (
        <EmailLoadingModal />
      ) : (
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
            {sortedMessages.map((mail) => (
              <tr
                key={mail.id}
                style={{
                  fontWeight: mail.labelIds.includes(UNREAD) ? "bold" : "",
                }}
                onClick={(e) => {
                  showMessageHandler(e, mail);
                }}
              >
                <td>{setMaxChars(getDataFromMessage(mail, SUBJECT))}</td>
                <td
                  dangerouslySetInnerHTML={{
                    __html: setMaxChars(mail[SNIPPET] + "..."),
                  }}
                ></td>
                <td>{setMaxChars(getDataFromMessage(mail, FROM))}</td>
                <td>
                  {new Date(getDataFromMessage(mail, DATE)).toLocaleTimeString(
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
      )}
    </React.Fragment>
  );

  function deleteMessageFromDetails(id) {
    setSortedMessages(
      sortedMessages.filter((item) => {
        return item.id !== id;
      })
    );
  }

  function showMessageHandler(event, message) {
    dispatch(
      setMessageInfo({
        id: message.id,
        sender: getDataFromMessage(message, FROM),
        cc: getDataFromMessage(message, CC),
        subject: getDataFromMessage(message, SUBJECT),
        deleteFunction: deleteMessageFromDetails,
      })
    );
    dispatch(showMessageDetailsModal());
  }

  function getDataFromMessage(message, dataName) {
    const data = message.payload.headers.filter(function (subject) {
      return subject.name === dataName;
    });
    return 0 < data.length ? data[0].value : "";
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
};

export default EmailTable;
