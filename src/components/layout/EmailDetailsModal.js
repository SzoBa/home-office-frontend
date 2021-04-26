import React from "react";
import { useSelector, useDispatch } from "react-redux";
import useGetData from "../../hooks/UseGet";
import UseDelete from "../../hooks/UseDelete";
import * as ENV from "../files/ENV.json";
import {
  deleteMessageDetails,
  hideMessageDetailsModal,
  setMessageDetails,
  writeEmail,
} from "../../actions/index";
import { toastr } from "react-redux-toastr";
import DOMPurify from "dompurify";

const EmailDetailsModal = (props) => {
  const user = useSelector((state) => state.login);
  const message = useSelector((state) => state.messageDetails);
  const dispatch = useDispatch();

  function deleteMessageHandler() {
    let url = ENV.mailDelete + message.id;
    UseDelete(url, user.sanctum_token, deleteAnswerHandler);
  }

  function deleteAnswerHandler(result) {
    if (result.includes("deleted")) {
      toastr.success(result);
      dispatch(hideMessageDetailsModal());
      dispatch(deleteMessageDetails());
    }
  }

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
            __html: DOMPurify.sanitize(messageBody),
          }}
        ></div>
      </div>
      <div>
        <button onClick={answerHandler}>Answer</button>
        <button onClick={answerAllHandler}>Answer all</button>
        <button onClick={deleteMessageHandler}>Delete</button>
      </div>
    </div>
  );

  function emailDetailsModalCloseHandler() {
    dispatch(hideMessageDetailsModal());
    dispatch(deleteMessageDetails());
  }

  function answerAllHandler() {
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

  function answerHandler() {
    dispatch(
      setMessageDetails({
        ...message,
        sender: getEmailsFromString(message.sender),
        cc: [],
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
