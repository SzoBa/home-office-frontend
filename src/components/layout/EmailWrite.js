import React, { useState } from "react";
import { useSelector } from "react-redux";
import UsePostData from "../../hooks/UsePostData";
import * as ENV from "../files/ENV.json";
import { Editor } from "@tinymce/tinymce-react";

const EmailWrite = (props) => {
  const user = useSelector((state) => state.login);
  const [error, setError] = useState(null);
  const [emailAddress, setEmailAddress] = useState({
    addresses: [],
    addressValue: "",
  });
  const [ccEmailAddress, setCcEmailAddress] = useState({
    addresses: [],
    addressValue: "",
  });
  const [bccEmailAddress, setBccEmailAddress] = useState({
    addresses: [],
    addressValue: "",
  });
  const [emailSubject, setEmailSubject] = useState({
    subject: "",
  });
  const [mailEditorText, setMailEditorText] = useState(
    "<p>Here write your mail</p>"
  );
  // implement change and load by user
  const [signature, setSignature] = useState(
    "<p>Thank you:</p><p>Balázs Szolcsánszki</p>"
  );

  function sendHandler(event) {
    const emailObject = createEmailObject();
    console.log(emailObject);
    UsePostData(ENV.mails, user.sanctum_token, emailObject, (response) => {
      setError(null);
      if (response.status === 201) {
        setError("Email sent");
      } else if (typeof response === "object") {
        setError(Object.values(response).join("\n"));
      } else {
        setError(response);
      }
    });
  }

  function saveHandler(event) {
    event.preventDefault();
    console.log("save to drafts, or something?");
  }

  return (
    <div className="email_content_container">
      <div>Compose mail</div>
      <div>
        <div className="email_inputs">
          <div>
            <div>
              <label>Send to user: </label>
              <div className="email_addresses">
                {emailAddress.addresses.map((adr) => (
                  <div key={adr} className="email_address_container">
                    {adr}
                    <button
                      className="delete_button"
                      onClick={() => addressDeleteHandler(adr, setEmailAddress)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="email"
                id="address"
                name="address"
                placeholder="Type email and press Enter"
                value={emailAddress.addressValue}
                onChange={(e) => addressChangeHandler(e, setEmailAddress)}
                onKeyDown={(e) =>
                  addressKeypressHandler(e, emailAddress, setEmailAddress)
                }
              />
            </div>
            <div>
              <label>Subject:</label>
              <input
                id="subject"
                type="text"
                name="subject"
                value={emailSubject.subject}
                onChange={emailSubjectChangeHandler}
              />
            </div>
          </div>
          <div>
            <div>
              <label>Carbon copy to user: </label>
              <div className="email_addresses">
                {ccEmailAddress.addresses.map((adr) => (
                  <div key={adr} className="email_address_container">
                    {adr}
                    <button
                      className="delete_button"
                      onClick={() =>
                        addressDeleteHandler(adr, setCcEmailAddress)
                      }
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="email"
                id="carbon_copy"
                name="carbon_copy"
                placeholder="Type email and press Enter"
                value={ccEmailAddress.addressValue}
                onChange={(e) => addressChangeHandler(e, setCcEmailAddress)}
                onKeyDown={(e) =>
                  addressKeypressHandler(e, ccEmailAddress, setCcEmailAddress)
                }
              />
            </div>
            <div>
              <label>Blind carbon copy to user: </label>
              <div className="email_addresses">
                {bccEmailAddress.addresses.map((adr) => (
                  <div key={adr} className="email_address_container">
                    {adr}
                    <button
                      className="delete_button"
                      onClick={() =>
                        addressDeleteHandler(adr, setBccEmailAddress)
                      }
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="email"
                id="blind_carbon"
                name="blind_carbon"
                placeholder="Type email and press Enter"
                value={bccEmailAddress.addressValue}
                onChange={(e) => addressChangeHandler(e, setBccEmailAddress)}
                onKeyDown={(e) =>
                  addressKeypressHandler(e, bccEmailAddress, setBccEmailAddress)
                }
              />
            </div>
          </div>
          {error && <p>{error}</p>}
        </div>
        <div>
          <button type="button" onClick={clearHandler} name="clear" id="clear">
            Clear text
          </button>
          <button type="button" onClick={signHandler} name="clear" id="clear">
            Add signature
          </button>
          <p>-------</p>
          <button type="button" onClick={saveHandler} name="save" id="save">
            Save as draft
          </button>
          <button type="button" onClick={sendHandler} name="send" id="send">
            Send
          </button>
        </div>
        <div id="email_editor">
          <Editor
            apiKey="uwgyl20ncogc7eof6res2xp6ibqs2c43kvysba0y8o1hpj27"
            initialValue={mailEditorText}
            init={{
              selector: "textarea#myTextArea",
              height: 450,
              width: "45vw",
              id: "mailContent",
              menubar: true /**min_height setup - turn off when xs? */,
              mobile: {
                menubar: true,
                plugins: ["autosave"],
                toolbar: ["undo", "bold"],
              },
              statusbar: true,
              draggable_modal: true,
              resize: false,
              skin: "oxide" /** use conditional to change light - dark */,
              content_css: ["light"],
              content_style: "body {font-size: 0.95em;}",
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help imagetools codesample wordcount",
              ],
              contextmenu: "link",
              toolbar:
                "undo redo | formatselect | bold italic underline backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
            }}
            onEditorChange={(content, editor) => {
              console.log("Content was updated:", content);
            }}
          />
        </div>
      </div>
    </div>
  );

  function createEmailObject() {
    return {
      address:
        0 < emailAddress.addresses.length
          ? emailAddress.addresses
          : "test@test.hu",
      cc: ccEmailAddress.addresses,
      bcc: bccEmailAddress.addresses,
      subject: emailSubject.subject,
      message: window.tinymce.activeEditor.getContent({ format: "raw" }),
    };
  }

  function clearHandler() {
    setMailEditorText(" ");
  }

  function signHandler() {
    window.tinymce.activeEditor.setContent(
      window.tinymce.activeEditor.getContent() + signature
    );
  }

  function addressDeleteHandler(address, setState) {
    setState((prevState) => ({
      ...prevState,
      addresses: prevState.addresses.filter((item) => item !== address),
    }));
  }

  function addressChangeHandler(event, setState) {
    setState((prevState) => ({
      ...prevState,
      addressValue: event.target.value,
    }));
  }

  function addressKeypressHandler(event, state, setState) {
    if (["Enter", ";"].includes(event.key)) {
      event.preventDefault();
      if (event.target.value && validateEmail(event.target.value)) {
        setState({
          addresses: [...state.addresses, event.target.value],
          addressValue: "",
        });
      }
    }
  }

  function emailSubjectChangeHandler(event) {
    setEmailSubject({ subject: event.target.value });
  }
  function validateEmail(newAddress) {
    let error = null;
    if (emailAddress.addresses.includes(newAddress)) {
      error = `${newAddress} already set!`;
    }
    if (!testEmailSyntax(newAddress)) {
      error = `${newAddress} is not a valid address!`;
    }
    if (error) {
      setError(error);
      return false;
    }
    return true;
  }

  function testEmailSyntax(newEmail) {
    return /[\w\d.-]+@[\w\d.-]+.[\w\d.-]{2,3}/.test(newEmail);
  }
};

export default EmailWrite;
