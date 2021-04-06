import React from "react";
import { useSelector } from "react-redux";
import UsePostData from "../../hooks/UsePostData";
import * as ENV from "../files/ENV.json";

const EmailWriteForm = (props) => {
  const user = useSelector((state) => state.login);

  function sendHandler(event) {
    event.preventDefault();
    const emailObject = createEmailObject(event, "emailData");
    UsePostData(ENV.mails, user.sanctum_token, emailObject, (response) => {
      // setErrorMessage([]);
      if (response.status === 201) {
        console.log(response.data);
      }
      // handleErrorMessage(response, setErrorMessage);
    });
  }

  function saveHandler(event) {
    event.preventDefault();
    console.log("save to drafts, or smthg?");
  }

  return (
    <div className="email_content_container">
      <div>Compose mail</div>
      <div>
        <div>
          <label>Send to user:</label>
          <input type="email" id="address" name="address" />
        </div>
        <div>
          <label>Carbon copy to user:</label>
          <input type="email" id="carbon_copy" name="carbon_copy" />
        </div>
        <div>
          <label>Blind carbon copy to user:</label>
          <input type="email" id="blind_carbon" name="blind_carbon" />
        </div>
        <div>
          <label>Subject:</label>
          <input id="subject" type="text" name="subject" />
        </div>
        <div name="emailText">
          Here will be the mailbox module
          {/* <MDEditor value={value} onChange={setValue} /> */}
          {/* <MDEditor.Markdown source={value} /> */}
        </div>
        <div>
          <button type="button" onClick={saveHandler} name="save" id="save">
            Save email
          </button>
          <button type="button" onClick={sendHandler} name="send" id="send">
            Send mail
          </button>
        </div>
      </div>
    </div>
  );

  function createEmailObject(event) {
    return {
      name: "mailDataState.address",
      subject: "mailDataState.subject",
      message: "mailDataState.message",
    };
  }
};

export default EmailWriteForm;
