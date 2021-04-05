import React from "react";

const EmailWriteForm = (props) => {
  return (
    <div>
      <div>
        <h3>Compose mail</h3>
        <div>
          <div>
            <label>Send to user:</label>
            <input type="email" id="address" name="address" />
          </div>
        </div>
        <div>
          <label>Subject:</label>
          <input id="subject" type="text" name="subject" />
        </div>
        <div name="emailText">
          {/* <MDEditor value={value} onChange={setValue} /> */}
          {/* <MDEditor.Markdown source={value} /> */}
        </div>
        <button type="submit" name="save" id="save">
          Save email
        </button>
        <button type="submit" name="send" id="send">
          Send mail
        </button>
      </div>
    </div>
  );
};

export default EmailWriteForm;
