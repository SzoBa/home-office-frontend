import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUrlOptions, writeEmail, readEmail } from "../../actions/index";

const Navbar = (props) => {
  const dispatch = useDispatch();
  //TODO: remove the unread parameter

  const handleEmailInbox = () => {
    dispatch(setUrlOptions("?q=in:inbox"));
    dispatch(readEmail());
  };
  const handleEmailSent = () => {
    dispatch(setUrlOptions("?q=in:sent"));
    dispatch(readEmail());
  };
  const handleEmailDraft = () => {
    dispatch(setUrlOptions("?q=in:sent"));
    dispatch(readEmail());
  };
  const handleEmailTrash = () => {
    dispatch(setUrlOptions("?q=in:trash"));
    dispatch(readEmail());
  };
  const handleEmailSpam = () => {
    dispatch(setUrlOptions("?q=in:spam"));
    dispatch(readEmail());
  };

  return (
    <div
      id="navbar_container_open"
      className={useLocation().pathname === "/email" ? "" : "hide"}
    >
      <div>Email options</div>
      <div>
        <button onClick={handleEmailInbox}>Incoming</button>
        <button
          onClick={() => {
            dispatch(writeEmail());
          }}
        >
          Write
        </button>
        <button onClick={handleEmailSent}>Sent</button>
        <button onClick={handleEmailDraft}>Draft</button>
        <button onClick={handleEmailTrash}>Trash</button>
        <button onClick={handleEmailSpam}>Spam</button>
      </div>
      <div>
        <button>All</button>
        <button>Unread</button>
      </div>
      <div>
        <button>Some labels</button>
      </div>
    </div>
  );
};
export default Navbar;
