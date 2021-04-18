import React from "react";
import { useSelector } from "react-redux";
import useGetData from "../../hooks/UseGet";
import * as ENV from "../files/ENV.json";

const EmailDetailsModal = (props) => {
  const user = useSelector((state) => state.login);
  const message = useGetData(
    ENV.mailMessage + props.message.id,
    user.sanctum_token
  )[1];
  return (
    <div className="content_modal">
      <div>
        <label>Sender:</label>
        <div>{props.message.sender}</div>
      </div>
      <div>
        <label>CC:</label>
        <div>{props.message.cc}</div>
      </div>
      <div>
        <label>Subject:</label>
        <div>{props.message.subject}</div>
      </div>
      <div>
        <label>Message:</label>
        <div
          id="message_div"
          style={{ whiteSpace: "pre-wrap", textAlign: "left" }}
          dangerouslySetInnerHTML={{ __html: message }}
        ></div>
      </div>
      <div>
        <button>Answer</button>
        <button>Answer all</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default EmailDetailsModal;
