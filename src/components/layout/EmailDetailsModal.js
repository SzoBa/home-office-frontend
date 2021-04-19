import React from "react";
import { useSelector, useDispatch } from "react-redux";
import useGetData from "../../hooks/UseGet";
import * as ENV from "../files/ENV.json";
import { deleteMessageDetails } from "../../actions/index";

const EmailDetailsModal = (props) => {
  const user = useSelector((state) => state.login);
  const message = useSelector((state) => state.messageDetails);
  const dispatch = useDispatch();

  const messageBody = useGetData(
    ENV.mailMessage + message.id,
    user.sanctum_token
  )[1];
  return (
    <div className="content_modal">
      <button
        className="close_modal_button"
        onClick={EmailDetailsModalCloseHandler}
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
          dangerouslySetInnerHTML={{ __html: messageBody }}
        ></div>
      </div>
      <div>
        <button>Answer</button>
        <button>Answer all</button>
        <button>Delete</button>
      </div>
    </div>
  );

  function EmailDetailsModalCloseHandler() {
    dispatch(deleteMessageDetails());
  }
};

export default EmailDetailsModal;
