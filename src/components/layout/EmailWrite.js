import React from "react";
import { useSelector } from "react-redux";
import UsePostData from "../../hooks/UsePostData";
import * as ENV from "../files/ENV.json";
import { Editor } from "@tinymce/tinymce-react";

const EmailWrite = (props) => {
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
              <input type="email" id="address" name="address" />
            </div>
            <div>
              <label>Subject:</label>
              <input id="subject" type="text" name="subject" />
            </div>
          </div>
          <div>
            <div>
              <label>Carbon copy to user: </label>
              <input type="email" id="carbon_copy" name="carbon_copy" />
            </div>
            <div>
              <label>Blind carbon copy to user: </label>
              <input type="email" id="blind_carbon" name="blind_carbon" />
            </div>
          </div>
        </div>
        <div>
          <button type="button" onClick={saveHandler} name="save" id="save">
            Save email
          </button>
          <button type="button" onClick={sendHandler} name="send" id="send">
            Send mail
          </button>
        </div>
        <div id="email_editor">
          <Editor
            apiKey="uwgyl20ncogc7eof6res2xp6ibqs2c43kvysba0y8o1hpj27"
            initialValue="<p>This is the initial content of the editor</p>"
            init={{
              height: 450,
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
                "insertdatetime media table paste code help imagetools codesample powerpaste wordcount",
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

  function createEmailObject(event) {
    return {
      name: "mailDataState.address",
      subject: "mailDataState.subject",
      message: "mailDataState.message",
    };
  }
};

export default EmailWrite;
