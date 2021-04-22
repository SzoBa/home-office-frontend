import React from "react";
import { useSelector, useDispatch } from "react-redux";
import useGetData from "../../hooks/UseGet";
import * as ENV from "../files/ENV.json";
import {
  deleteMessageDetails,
  hideMessageDetailsModal,
  setMessageDetails,
  writeEmail,
} from "../../actions/index";

const EmailDetailsModal = (props) => {
  const user = useSelector((state) => state.login);
  const message = useSelector((state) => state.messageDetails);
  const dispatch = useDispatch();

  const messageBody = useGetData(
    ENV.mailMessage + message.id,
    user.sanctum_token
  )[1].toString();

  return (
    <div className="content_modal">
      <button
        className="close_modal_button"
        onClick={emailDetailsModalCloseHandler}
      >
        X
      </button>
      <div>
        <label>Sender:&nbsp;</label>
        <div>{message.sender}</div>
      </div>
      <div>
        <label>CC:&nbsp;</label>
        <div>{message.cc}</div>
      </div>
      <div>
        <label>Subject:&nbsp;</label>
        <div>{message.subject}</div>
      </div>
      <div>
        <label>Message:&nbsp;</label>
        <div
          id="message_div"
          style={{ whiteSpace: "pre-wrap", textAlign: "left" }}
          dangerouslySetInnerHTML={{
            __html: messageBody.replace("/(<script>).+(</script>)/", ""),
          }}
        ></div>
      </div>
      <div>
        <button onClick={answerHandler}>Answer</button>
        <button>Answer all</button>
        <button>Delete</button>
      </div>
    </div>
  );

  function emailDetailsModalCloseHandler() {
    dispatch(hideMessageDetailsModal());
    dispatch(deleteMessageDetails());
  }

  function answerHandler() {
    dispatch(
      setMessageDetails({
        ...message,
        sender: getEmailsFromString(message.sender),
        cc: getEmailsFromString(message.cc),
        message: `<p></p>${messageBody}`,
      })
    );
    dispatch(writeEmail());
    dispatch(hideMessageDetailsModal());
  }
};

export default EmailDetailsModal;

function getEmailsFromString(str) {
  const result = [];
  const addresses = str.split(",");
  addresses.forEach((address) => {
    let actualResult = address.match("([<]).+([@]).+(.).{2,3}([>])");
    if (actualResult) {
      result.push(actualResult[0].substr(1, actualResult[0].length - 2));
    }
  });
  return result;
}

function convert(text) {
  let resultHtml = "";
  text = text.trim();
  if (text.length > 0) {
    resultHtml += "<p>";
    for (let i = 0; i < text.length; i++) {
      switch (text[i]) {
        case "\n":
          resultHtml += "</p><p>";
          break;

        case " ":
          if (text[i - 1] !== " " && text[i - 1] !== "\t") resultHtml += " ";
          break;

        case "\t":
          if (text[i - 1] !== "\t") resultHtml += " ";
          break;

        case "&":
          resultHtml += "&amp;";
          break;

        case '"':
          resultHtml += "&quot;";
          break;

        case ">":
          resultHtml += "&gt;";
          break;

        case "<":
          resultHtml += "&lt;";
          break;

        default:
          resultHtml += text[i];
      }
    }
    resultHtml += "</p>";
  }
  return resultHtml;
}
