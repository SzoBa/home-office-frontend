import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUrlOptions } from "../../actions/index";

const Navbar = (props) => {
  const dispatch = useDispatch();
  //TODO: remove the unread parameter

  const handleEmailInbox = () => {
    dispatch(setUrlOptions("?q=in:inbox"));
  };
  const handleEmailSent = () => {
    dispatch(setUrlOptions("?q=in:sent"));
  };
  const handleEmailDraft = () => {
    dispatch(setUrlOptions("?q=in:sent"));
  };
  const handleEmailTrash = () => {
    dispatch(setUrlOptions("?q=in:trash"));
  };
  const handleEmailSpam = () => {
    dispatch(setUrlOptions("?q=in:spam"));
  };

  return (
    <div
      id="navbar_container_open"
      className={useLocation().pathname === "/email" ? "" : "hide"}
    >
      <div>Email options</div>
      <div>
        <button onClick={handleEmailInbox}>Incoming</button>
        <button onClick={handleEmailSent}>Sent</button>
        <button onClick={handleEmailDraft}>Draft</button>
        <button onClick={handleEmailTrash}>Trash</button>
        <button onClick={handleEmailSpam}>Spam</button>
      </div>
    </div>
  );
};
export default Navbar;
