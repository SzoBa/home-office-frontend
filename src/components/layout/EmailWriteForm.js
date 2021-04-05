import React from "react";

const EmailWriteForm = (props) => {
  return (
    <div className="email_content_container">
      <div>Compose mail</div>
      <div>
        <div>
          <label>Send to user:</label>
          <input type="email" id="address" name="address" />
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
          <button type="submit" name="save" id="save">
            Save email
          </button>
          <button type="submit" name="send" id="send">
            Send mail
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailWriteForm;
